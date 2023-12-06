"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const createProfile = () => {
  const router = useRouter();
  function handleProfileCreation() {
    localStorage.setItem("profile", "team pere");
    router.push("/");
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

          <div className="mt-[3rem]">
            <Input
              className="w-[494px] rounded-none"
              placeholder="Enter full name here..."
            />
            <Button
              className="w-[494px] mt-[1.5rem] bg-teal-500 text-white rounded-none"
              onClick={handleProfileCreation}
            >
              Create Profile
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default createProfile;
