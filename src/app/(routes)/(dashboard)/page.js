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
import { useEffect } from "react";

export default function Home() {
  const [spaces, profile] = useStore((state) => [state.spaces, state.profile]);

  useEffect(() => {
    initWeb5();
  }, []);

  return (
    <main className="space-y-6 pt-6">
      <h1 className="text-black font-bold">Welcome Lily</h1>
      <button onClick={createPublicRecord}>create public record</button> <br />
      <button onClick={readPublicRecord}>read public record</button> <br />
      <button onClick={deleteRecord}>delt public record</button> <br />
      <button onClick={() => createProfile("precious josiah")}>
        create profile
      </button>{" "}
      <br />
      <button onClick={readProfile}>get profile</button>
      <div onClick={createSpace}>create space</div>
      <div onClick={getUserSpace}>read space</div>
      <div>{profile.fullName}</div>
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
    </main>
  );
}
