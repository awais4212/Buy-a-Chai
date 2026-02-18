import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SessionWrapper from "./Components/SessionWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a Chai - Fund Your Project",
  description: "An App for supporting you favorite coder and creator and a programmer where you can make payment to your favorite Programmer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>

        <Navbar />
        <div className="min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
          {children}
        </div>
        <Footer />

        </SessionWrapper>
      </body>
    </html>
  );
}
