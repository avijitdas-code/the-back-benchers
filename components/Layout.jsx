import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "The Back Benchers",
  description: "MAKAUT Student Resource Hub",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 'bg-[#0B0F1A]' provides the solid dark background you requested */}
      <body className="bg-[#0B0F1A] min-h-screen text-white">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}