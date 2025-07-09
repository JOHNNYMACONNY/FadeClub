// lib/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { Service } from './types';
import { promises as fs } from 'fs';
import path from 'path';
import { Resend } from 'resend';

// Instantiate Resend with the API key from your .env.local file
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to get the bookings.json file path
const getBookingsFilePath = () => path.join(process.cwd(), 'data', 'bookings.json');

export async function createBookingAction(bookingData: {
  service: Service;
  client: {
    name: string;
    email: string;
    phone: string;
    isFirstTime: boolean;
    notes: string;
  };
  preferredTimes?: {
    date: string;
    time: string;
    displayDate: string;
    displayTime: string;
  }[];
}) {
  const submissionDate = new Date();
  const newSubmission = {
    ...bookingData,
    id: submissionDate.toISOString() + '-' + Math.random().toString(36).substr(2, 9),
    submissionDate: submissionDate,
  };

  // 1. Send email notification to admin using Resend
  try {
    const isOneTime = newSubmission.service.type === 'one-time';
    const serviceTypeText = isOneTime ? 'One-Time Booking' : 'Monthly Subscription';
    const priceText = isOneTime ? `$${newSubmission.service.price}` : `$${newSubmission.service.price}/mo`;
    
    // Format preferred times for email
    const preferredTimesHtml = newSubmission.preferredTimes?.length 
      ? `
        <h2>Preferred Appointment Times:</h2>
        <ol>
          ${newSubmission.preferredTimes.map(time => 
            `<li><strong>${time.displayDate} at ${time.displayTime}</strong></li>`
          ).join('')}
        </ol>
        <p><em>Please confirm one of these times or suggest an alternative.</em></p>
      `
      : '<p><em>No specific time preferences provided.</em></p>';
    
    const { data, error } = await resend.emails.send({
      from: 'FadeClub <onboarding@resend.dev>', // Resend's default sending address
      to: ['legacybarber12@gmail.com'], // <--- Admin's email address
      subject: `New ${serviceTypeText}: ${newSubmission.client.name}`,
      html: `
        <h1>New FadeClub ${isOneTime ? 'Booking' : 'Member'}!</h1>
        <p>A new client has ${isOneTime ? 'booked a service' : 'signed up for a tier'}.</p>
        <h2>Client Details:</h2>
        <ul>
          <li><strong>Name:</strong> ${newSubmission.client.name}</li>
          <li><strong>Email:</strong> ${newSubmission.client.email}</li>
          <li><strong>Phone:</strong> ${newSubmission.client.phone}</li>
          <li><strong>First Time?:</strong> ${newSubmission.client.isFirstTime ? 'Yes' : 'No'}</li>
          <li><strong>Notes:</strong> ${newSubmission.client.notes || 'None'}</li>
        </ul>
        <h2>${isOneTime ? 'Service Booked' : 'Subscription Tier'}:</h2>
        <ul>
          <li><strong>Service:</strong> ${newSubmission.service.name}</li>
          <li><strong>Price:</strong> ${priceText}</li>
          <li><strong>Duration:</strong> ${newSubmission.service.duration} minutes</li>
        </ul>
        ${preferredTimesHtml}
        <p><strong>Next Step:</strong> Please contact the client to ${isOneTime ? 'confirm their appointment time' : 'schedule their first appointment'}.</p>
      `,
    });

    if (error) {
      throw error;
    }

    console.log('Email sent successfully:', data);

  } catch (error) {
    console.error('Error sending email:', error);
    // In a real app, you might want to return an error to the user here
  }

  // 2. Save submission to bookings.json (this part remains the same)
  try {
    const filePath = getBookingsFilePath();
    let submissions = [];
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      submissions = JSON.parse(fileContents);
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code !== 'ENOENT') throw error;
    }

    submissions.push(newSubmission);
    await fs.writeFile(filePath, JSON.stringify(submissions, null, 2));
    revalidatePath('/admin');

    return {
      success: true,
      data: newSubmission,
    };

  } catch (error) {
    console.error('Error saving submission:', error);
    return {
      success: false,
      error: 'Failed to save submission.',
    };
  }
}
