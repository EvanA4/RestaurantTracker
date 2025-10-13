import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Tracker",
  description: "Review and find restaurants anywhere!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("This is a test");
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
