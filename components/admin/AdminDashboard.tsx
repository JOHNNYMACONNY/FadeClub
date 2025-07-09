// components/admin/AdminDashboard.tsx
import { getBookings } from '@/lib/data';
import { AdminDashboardClient } from './AdminDashboardClient';

export const AdminDashboard = async () => {
  // Fetch bookings on the server
  const bookings = await getBookings();

  return <AdminDashboardClient bookings={bookings} />;
};
