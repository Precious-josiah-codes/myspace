"use client";

import Sidebar from "@/components/custom/DesktopSidebar";
import Navbar from "@/components/custom/Navbar";
// import Navbar from "@/sections/Navbar";
import { Inter, Poppins } from "next/font/google";

const poppins = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  return (
    <main className={`${poppins.className}`}>
      {/* desktop side bar */}
      <Sidebar />

      <main className="sm:ml-64 relative h-auto bg-[#e6e6e636]">
        {/* navbar */}
        <Navbar />

        <main className="sm:px-6 px-3 pb-9 h-auto">{children}</main>
      </main>
    </main>
  );
}
