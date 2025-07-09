// app/admin/page.tsx
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <AdminDashboard />
    </main>
  );
}
