"use client";
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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const Space = () => {
  const [spaceFile, setSpaceFileUpload] = useState(null);

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

  const image =
    "https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg?auto=compress&cs=tinysrgb&w=600";

  return (
    <main className="relative">
      <section>
        {/* banner image */}
        <div className="relative">
          <div className="w-full h-[300px] rounded-lg overflow-hidden">
            <Image
              src={image}
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "cover",
              }}
              className="relative"
            />
          </div>
          <div className="bg-[#00000027] text-white absolute h-[300px] w-full z-50 top-0 flex items-end">
            <div className="flex justify-between items-end px-6 mb-[2rem] relative w-full">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=400" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                  <h1 className="font-semibold">Grace Owen</h1>
                  <p>Books by Grace</p>
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

                  <div>20</div>
                </div>

                {/* total users subcribed */}
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
                  <div>20</div>
                </div>

                {/* moentization type */}
                <h1 className="color1 text-white px-2 rounded-md text-bold">
                  Free
                </h1>
                {/* <h1 className="  px-3 rounded-md text-bold cursor-pointer color1 text-white">
                    Subscribe
                </h1> */}
              </div>
            </div>
          </div>
        </div>

        {/* space */}
        <section className="grid grid-cols-3 gap-6 mt-9">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((space, index) => (
            <div key={index}>
              <SpaceCard />
            </div>
          ))}
        </section>
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
