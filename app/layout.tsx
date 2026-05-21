import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TBS° — We shape what people remember",
  description: "Premium digital systems for websites, wallet loyalty, bookings, and client follow-up.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
