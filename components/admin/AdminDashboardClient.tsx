// components/admin/AdminDashboardClient.tsx
"use client";

import { useState } from "react";
import { Booking } from "@/lib/types";
import { ScheduleView } from "./ScheduleView";

interface AdminDashboardClientProps {
  bookings: Booking[];
}

export const AdminDashboardClient = ({ bookings }: AdminDashboardClientProps) => {
  const [activeTab, setActiveTab] = useState<"schedule" | "leads">("schedule");

  // Count bookings by status
  const scheduledCount = bookings.filter((b) => b.dateTime).length;
  const leadsCount = bookings.filter((b) => !b.dateTime).length;

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Mobile Tab Navigation */}
      <div className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex-1 py-4 px-4 text-center transition-colors ${
              activeTab === "schedule"
                ? "text-blue-400 border-b-2 border-blue-400 bg-blue-500/10"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <div className="text-sm font-semibold">Schedule</div>
            <div className="text-xs mt-1">{scheduledCount} appointments</div>
          </button>

          <button
            onClick={() => setActiveTab("leads")}
            className={`flex-1 py-4 px-4 text-center transition-colors ${
              activeTab === "leads"
                ? "text-red-400 border-b-2 border-red-400 bg-red-500/10"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <div className="text-sm font-semibold">Leads</div>
            <div className="text-xs mt-1">{leadsCount} pending</div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative">
        {activeTab === "schedule" && (
          <div className="animate-slide-up">
            <ScheduleView bookings={bookings} />
          </div>
        )}

        {activeTab === "leads" && (
          <div className="animate-slide-up px-4 py-6">
            <h2 className="heading-lg mb-4">Client Leads</h2>
            <div className="space-y-4">
              {bookings
                .filter((b) => !b.dateTime)
                .map((booking) => (
                  <div key={booking.id} className="card-dark">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="heading-md">{booking.client.name}</h3>
                        <p className="text-body">{booking.service.name}</p>
                        <p className="text-small">{booking.client.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-caption">
                          Submitted: {new Date(booking.submissionDate).toLocaleDateString()}
                        </p>
                        <p className="text-caption text-green-400 font-semibold">
                          ${booking.service.price}
                        </p>
                      </div>
                    </div>
                    {booking.client.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-small">
                          <strong>Notes:</strong> {booking.client.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
