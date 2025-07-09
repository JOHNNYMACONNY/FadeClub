// app/page.tsx
import { BookingWizard } from "@/components/booking/BookingWizard";
import { BrandHeader } from "@/components/layout/BrandHeader";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 animate-fade-in">
      <BrandHeader />
      <div className="container mx-auto pb-16">
        <BookingWizard />
      </div>
    </main>
  );
}