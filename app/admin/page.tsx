// app/admin/page.tsx
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <AdminDashboard />
    </main>
  );
}
