import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FadeClub - Premium Barber Booking",
  description: "The finest cuts, crafted with precision. Book your appointment at FadeClub today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased transition-colors duration-300">
        <div className="min-h-screen" style={{ 
          backgroundColor: 'var(--bg-primary)', 
          color: 'var(--text-primary)' 
        }}>
          {children}
        </div>
      </body>
    </html>
  );
}