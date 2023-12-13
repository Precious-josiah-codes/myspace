"use client";

import Sidebar from "@/components/custom/DesktopSidebar";
import Navbar from "@/components/custom/Navbar";
// import Navbar from "@/sections/Navbar";
import { Inter, Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function DashboardLayout({ children }) {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem("profile");
    if (!profile) {
      window.location.href = "/createdid";
      return;
    }
    setProfile(true);
  }, []);
  return (
    <main className={`${poppins.className}`}>
      {/* desktop side bar */}
      <Sidebar />

      <main className="sm:ml-64 relative h-auto">
        {/* navbar */}
        <Navbar />

        <main className="sm:px-6 px-3 pb-9 h-auto">{children}</main>
      </main>

      {!profile && (
        <div className="bg-[#000000fb] w-full h-screen fixed top-0 z-[999999] flex justify-center items-center">
          <h1 className="animate-pulse text-white">Loading spaces...</h1>
        </div>
      )}
    </main>
  );
}
