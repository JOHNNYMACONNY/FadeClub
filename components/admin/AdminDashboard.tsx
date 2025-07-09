// components/admin/AdminDashboard.tsx
import { getBookings } from '@/lib/data';
import { ScheduleView } from './ScheduleView';

export const AdminDashboard = async () => {
  // Fetch bookings on the server
  const bookings = await getBookings();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <span className="text-sm font-medium text-gray-500">{bookings.length} total appointments</span>
      </div>
      <ScheduleView bookings={bookings} />
    </div>
  );
};
