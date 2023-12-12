"use client";

import SpaceCard from "@/components/custom/SpaceCard";
import {
  createProfile,
  createPublicRecord,
  createSpace,
  deleteRecord,
  getUserSpace,
  initWeb5,
  readProfile,
  readPublicRecord,
  useStore,
} from "@/store/Store";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [spaces, profile] = useStore((state) => [state.spaces, state.profile]);
  console.log(profile)
  console.log(loading)
  const getProfile = async () =>{
    const result = await readProfile()
    console.log(result)
    setLoading2(true)
    if(result.success){
      setLoading2(false)
    }else{
      setLoading2(false)
    }
  }
  
  useEffect(() => {
    const initializeWeb5 = async () => {
      const result = await initWeb5();
      console.log(result)
      setLoading(true)
      if (result.success) {
        setLoading(false)
        getProfile()
        // Set the result in the component state
        // setInitResult(result);
      } else {
        setLoading(false)
        // Handle the error as needed
      }
    };

    initializeWeb5();
  }, []);

  return (
    <main className="space-y-6 pt-6">
      {(loading) ? (
        <h1 className="animate-pulse text-base">
          Creating your Decentralized identity...
        </h1>
      ) : (
        
        <>
          {loading2 ? (
            <h1 className="animate-pulse text-base">
              Reading and Fetching your Profile...
            </h1>
          ) : (
            <>
              <h1 className="text-black font-bold">Welcome {profile.fullName}</h1>
              <div>
                <h1 className="mb-5">
                  Featured Spaces{"   "}
                  <span className="bg-teal-500 rounded-full px-3 text-white text-sm">
                    {spaces.filter((space) => space.spacePrivacy !== "private").length}
                  </span>
                </h1>

                <section className="grid grid-cols-3 gap-6">
                  {spaces
                    .filter((space) => space.spacePrivacy !== "private")
                    .map((space, index) => (
                      <div key={index}>
                        <SpaceCard path="space" space={space} />
                      </div>
                    ))}
                </section>
              </div>
            </>
          )}
        </>
      )}
  
    </main>
  );
}
