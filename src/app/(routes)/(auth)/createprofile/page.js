"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProfile } from "@/store/Store";
import LottieAnimation from "@/components/lotties";
import Loader from "@/Assets/loading.json"

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setmessage] = useState({})
  const router = useRouter();
  const handleProfileCreation = async (e) => {
    e.preventDefault();
    try{
        const success = await createProfile(name)
        console.log(success)
        setmessage(success)
        setLoading(true)
        if (success.success) {
          setLoading(false)
          setError(false)
          localStorage.setItem("profile", "team pere");
          // Profile creation was successful
          console.log("Profile created successfully");
          // Redirect or perform any other actions here
          router.push("/");
        } else {
          setLoading(false)
          setError(true)
          // Profile creation failed
          console.log("Profile creation failed");
          // Handle the failure case if needed
        }
      }
      catch(error)  {
        setLoading(false)
        // An error occurred while creating the profile
        console.error("Error creating profile:", error);
        // Handle the error case if needed
      };
  }

  const handleName = (e)=>{
    const value = e.target.value
    setName(value)
  }
  return (
    <section className="overflow-hidden h-screen relative">
      {/* shape */}
      <div className="w-[2000px] h-[300px] -ml-[10rem] rotate-[-19.90deg] opacity-75 bg-teal-500" />

      <section className="h-full w-full absolute top-0 flex items-center justify-center">
        <div className="w-[650px] h-[500px] bg-white shadow-xl flex flex-col items-center justify-center">
          <h1 className="text-black text-[32px] font-bold font-['Montserrat Subrayada']">
            SPACESYNC
          </h1>
          <h1 className="text-teal-500 text-[32px] font-normal font-['calibri']">
            Create Profile
          </h1>
          <h1 className="text-zinc-600 text-base font-normal font-['calibri']">
            to create your account
          </h1>
          <form onSubmit={handleProfileCreation}>
            <div className="mt-[3rem]">
              <Input
                className="w-[494px] rounded-none"
                placeholder="Enter full name here..."
                name={handleName}
              />
              <p className="text-red-700 mt-2 text-sm">{message.data}</p>
              <Button
                className="w-[494px] mt-[1.5rem] bg-teal-500 text-white rounded-none"
              >
                {loading ? (
                  <LottieAnimation data={Loader}/>
                ) : "Create Profile"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
};

export default CreateProfile;
