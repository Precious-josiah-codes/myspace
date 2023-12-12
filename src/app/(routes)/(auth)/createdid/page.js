"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { initWeb5 } from "@/store/Store";
import { useEffect, useState } from "react";

const CreateDid = () => {
  const [initResult, setInitResult] = useState(null);
  useEffect(() => {
    const initializeWeb5 = async () => {
      const result = await initWeb5();
      console.log(result)
      if (result.success) {
        console.log("Initialization successful:", result.data);
        // Set the result in the component state
        setInitResult(result);
      } else {
        console.error("Initialization failed:", result.error);
        // Handle the error as needed
      }
    };

    initializeWeb5();
  }, []);
  return (
    <section className="w-full h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-[2rem] font-bold mb-9">SPACESYNC</h1>
        {(!initResult?.success) &&  <h1 className="animate-pulse text-base">
          Creating your Decentralized identity...
        </h1>}
        {(initResult?.success) &&  <h1>Your Decentralized identity has been successfully created</h1>}
        {(initResult?.success) &&  
          <Link href="/createprofile">
            <Button className="w-[494px] mt-[1.5rem] bg-teal-500 text-white rounded-none">
              Continue to Create Profile
            </Button>
          </Link>
        }
        
      </div>
    </section>
  );
};

export default CreateDid;
