import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TBS° — We shape what people remember",
  description: "Editorial black and white creative studio website concept for TBS.",
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
