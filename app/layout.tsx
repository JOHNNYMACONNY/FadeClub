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
      <body>
        {children}
      </body>
    </html>
  );
}