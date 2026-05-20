import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TBS° — We shape what people remember",
  description: "Editorial black and white creative studio website concept for TBS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
