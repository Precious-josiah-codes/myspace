"use client";

import SpaceCard from "@/components/custom/SpaceCard";
import { useStore } from "@/store/Store";
import { usePathname } from "next/navigation";

export default function Home() {
  const [spaces] = useStore((state) => [state.spaces]);

  return (
    <main className="space-y-6 pt-6">
      <h1 className="text-black font-bold">Welcome Lily</h1>

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
