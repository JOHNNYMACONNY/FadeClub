// app/page.tsx
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BrandHeader } from "@/components/layout/BrandHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen animate-fade-in" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <BrandHeader />
      <div className="container mx-auto pb-16">
        <BookingWizard />
      </div>
    </main>
  );
}