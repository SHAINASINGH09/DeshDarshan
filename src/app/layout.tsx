import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "DeshDarshan — From Dreams to Destinations | India on Your Budget",
  description: "Plan unforgettable journeys across India without overspending. Discover destinations, select flights, trains, buses, or car travel, book rooms, and save complete trip itineraries.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col font-sans transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
