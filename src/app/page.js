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

  useEffect(() => {
    const handleInitWeb5 = async () => {
      await initWeb5();
    };

    handleInitWeb5();
  }, []);

  return (
    <main>
      <h1 className="text-red-900">My Space APP</h1>
      <p>Building a decentralized cloud storage infastructure</p>

      {/* create profile */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createProfile({ name, profileImage, gender });
        }}
      >
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button>Create profile</button>
      </form>

      <button onClick={handleFetch}>Query all data</button>
      <button onClick={createRecord}>create data</button>
      <button onClick={createSpace}>create space</button>
      <button onClick={handleReadSpace}>read space</button>
      <button onClick={createPublicSpace}>create public space</button>
      <button onClick={readPublicSpace}>read public space</button>

      <img
        src={`data:image/jpg;base64,${image}`} // Include the appropriate MIME type
        alt="Profile Image" // Alt text for accessibility
        width={300} // Set the width of the image
        height={300} // Set the height of the image
      />
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
