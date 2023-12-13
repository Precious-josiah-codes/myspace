"use client";

import SpaceCard from "@/components/custom/SpaceCard";
import {
  createProfile,
  createPublicRecord,
  createSpace,
  deleteRecord,
  getUserSpace,
  readLocalUserProfile,
  initWeb5,
  readExplorePublicSpace,
  readOneRecord,
  readProfile,
  readPublicRecord,
  useStore,
  writeDidsToDb,
  readNotification,
} from "@/store/Store";
import { useEffect, useState } from "react";

export default function Home() {
  const [spaces, did, profile] = useStore((state) => [
    state.spaces,
    state.myDid,
    state.profile,
  ]);

  useEffect(() => {
    console.log(profile, "the profile");
    async function handleWeb5() {
      if (!did) {
        const { success } = await initWeb5();
        if (success) {
          const [notification, explorePublicSpace] = await Promise.all([
            readNotification(),
            readExplorePublicSpace(),
          ]);
          console.log(explorePublicSpace, "public space");
          console.log(notification, "notification");
        }
      } else {
        const [notification, explorePublicSpace] = await Promise.all([
          readNotification(),
          readExplorePublicSpace(),
        ]);
        console.log(explorePublicSpace, "public space");
        console.log(notification, "notification");
      }
    }

    readLocalUserProfile();
    handleWeb5();
  }, []);

  return (
    <section>
      <main className="space-y-6 pt-6">
        <h1 className="text-black font-bold">Welcome {profile}</h1>

        <div>
          <h1 className="mb-5">
            Featured Spaces{"   "}
            <span className="bg-teal-500 rounded-full px-3 text-white text-sm">
              {
                spaces?.filter((space) => space.spacePrivacy !== "private")
                  .length
              }
            </span>
          </h1>

          <section className="grid grid-cols-3 gap-6">
            {spaces
              ?.filter((space) => space.spacePrivacy !== "private")
              .map((space, index) => (
                <div key={index}>
                  <SpaceCard path="space" space={space} />
                </div>
              ))}
          </section>
        </div>
      </main>
      {!spaces && (
        <div className="fixed top-0 left-0 z-[100] w-full h-screen bg-black text-white flex justify-center items-center">
          <h1 className="animate-pulse">Loading Spaces....</h1>
        </div>
      )}
    </section>
  );
}
