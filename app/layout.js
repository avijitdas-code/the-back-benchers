// app/layout.js
import './globals.css';
import Navbar from '../components/Navbar'; // Import the Navbar component

// These are the Geist font imports. Make sure you have 'geist' installed.
// If you get an error related to 'geist/font/sans', you might need to run:
// npm install geist
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// These constants are set up as per your previous layout structure
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  title: 'The Back Benchers', // Your project's title
  description: 'A comprehensive study platform for students.', // Your project's description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* This is your Navbar component */}
        {/*
          This div wraps the children (your page content) and applies
          the Geist font styles, as HTML does not allow nested <body> tags.
        */}
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </div>
      </body>
    </html>
  );
}