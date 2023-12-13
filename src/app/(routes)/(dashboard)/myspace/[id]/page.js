"use client";
import FileCard from "@/components/custom/FileCard";
import SpaceCard from "@/components/custom/SpaceCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/Store";
import Image from "next/image";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

const Space = () => {
  const [mySpaces] = useStore((state) => [state.mySpaces]);
  const [spaceFile, setSpaceFileUpload] = useState(null);
  const pathName = usePathname();
  const params = useParams();
  console.log(params.id, "params");

  console.log(mySpaces, "the space");
  const [space] = useState(mySpaces.filter((space) => space.id === params.id));
  console.log(space, "the space");
  const {
    spaceName,
    spaceAuthorProfile,
    spaceAuthor,
    spaceDescription,
    spaceImage,
    spaceFiles,
    spaceSubscribers,
    spaceMonetization,
    spacePrivacy,
  } = space[0];

  //   handle file upload
  async function handleFileUpload(event) {
    const file = await event.target.files[0];

    if (file) {
      setSpaceFileUpload(file);
    }
  }

  //   handle uploading file to space
  async function handleSpaceFileUpload() {
    console.log(spaceFile);
  }

  return (
    <main className="relative">
      <section>
        {/* banner image */}
        <div className="relative">
          <div className="w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={`data:image/png;base64,${spaceImage}`}
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
              className="relative"
            />
          </div>
          <div className="bg-[#00000027] text-white absolute h-[300px] w-full z-[9] top-0 flex items-end">
            <div className="flex justify-between items-end px-6 mb-[2rem] relative w-full">
              <div className="flex space-x-3">
                <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative bg-black text-white inline-flex justify-center items-center">
                  <div>{spaceAuthorProfile}</div>
                </div>

                <div>
                  <h1 className="font-semibold">{spaceAuthor}</h1>
                  <p>{spaceName}</p>
                  <p className="text-gray-300">{spaceDescription}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                {/* total file */}
                <div className="bg-white text-black px-2 rounded-md text-bold flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                    />
                  </svg>

                  <div>{spaceFiles.length}</div>
                </div>
                {/* total users subcribed */}
                {spacePrivacy !== "private" && (
                  <div className="bg-white text-black px-2 rounded-md text-bold flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    <div>{spaceSubscribers}</div>
                  </div>
                )}
                {/* moentization type */}
                {spacePrivacy !== "private" && (
                  <h1 className="color1 text-white px-2 rounded-md text-bold">
                    {spaceMonetization === "yes" ? "Paid" : "Free"}
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* space */}
        {spaceFiles?.length === 0 ? (
          <div className="w-full mt-11 text-center">
            <h1 className="w-[30rem] mx-auto">
              {spacePrivacy === "shared"
                ? `${spaceAuthor} has not not`
                : "You haven't "}{" "}
              published any file to this space
            </h1>
          </div>
        ) : (
          <section className="grid grid-cols-3 gap-6 mt-9">
            {spaceFiles.map((file, index) => (
              <div key={index}>
                <FileCard file={file} isMoreOption={false} />
              </div>
            ))}
          </section>
        )}
      </section>
      {/* add file */}
      <Dialog className="bg-black/80">
        <DialogTrigger asChild>
          <div className="fixed bottom-10 right-6 cursor-pointer">
            <span className="relative flex h-[3.5rem] w-[3.5rem] rounded-full">
              <span className="animate-ping absolute inline-flex   h-full w-full rounded-full color1 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-[3.5rem] w-[3.5rem] color1 items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </span>
            </span>
          </div>
        </DialogTrigger>

        {/* form for adding file */}
        <DialogContent className="sm:max-w-[425px] h-[17rem] overflow-y-auto sidebar">
          <h1 className="text-lg text-center">Add a file to your space</h1>
          <div className="grid gap-4 py-4">
            {/* file upload */}
            <div className="space-y-3">
              <Label htmlFor="spaceFileUpload">Upload your file</Label>
              <Input
                id="spaceFileUpload"
                type="file"
                onChange={handleFileUpload}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full color1"
              onClick={handleSpaceFileUpload}
            >
              Add file to space
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Space;
