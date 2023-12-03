"use client";
import {
  createProfile,
  createPublicSpace,
  createRecord,
  createSpace,
  getProfile,
  initWeb5,
  readPublicSpace,
  readSpace,
  tryFetch,
} from "@/store/Store";
import { useEffect, useState } from "react";

export default function Home() {
  const [profileImage, setProfileImage] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setProfileImage(file);
    }
  };

  // useEffect(() => {
  //   const handleInitWeb5 = async () => {
  //     await initWeb5();
  //   };

  //   handleInitWeb5();
  // }, []);

  return (
    <main>
      <h1>My Space APP</h1>
      <p>Building a decentralized cloud storage infastructure</p>

      {/* create profile */}
    </main>
  );

  async function handleFetch() {
    const data = await getProfile();
    setImage(data.profileImage);
    console.log(data, "the data");
  }
  async function handleReadSpace() {
    const data = await readSpace();
    console.log(data, "the data");
  }
}
