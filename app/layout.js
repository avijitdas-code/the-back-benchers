import "./globals.css";
import Navbar from "../components/Navbar";
import SessionWrapper from "../components/SessionWrapper";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  title: "The Back Benchers",
  description: "A comprehensive study platform for students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
  <SessionWrapper>
    <Navbar />
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {children}
    </div>
  </SessionWrapper>
</body>
    </html>
  );
}