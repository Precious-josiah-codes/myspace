"use client";
import { initWeb5 } from "@/store/Store";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleInitWeb5 = async () => {
      await initWeb5();
    };

    handleInitWeb5();
  }, []);

  return (
    <main>
      <h1>My Space APP</h1>
      <p>Building a decentralized cloud storage infastructure</p>
    </main>
  );
}
