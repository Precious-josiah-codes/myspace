"use client";

import SpaceCard from "@/components/custom/SpaceCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { createSpace, useStore } from "@/store/Store";
import { DollarSignIcon, MessageSquarePlusIcon } from "lucide-react";

import { useState } from "react";

const Spaces = () => {
  const [$mySpaces] = useStore((state) => [state.mySpaces]);

  // grouping spaces
  const { privateSpace, publicSpace, sharedSpace } = {
    privateSpace: $mySpaces.filter(
      (mySpace) => mySpace.spacePrivacy === "private"
    ),
    publicSpace: $mySpaces.filter(
      (mySpace) => mySpace.spacePrivacy === "private"
    ),
    sharedSpace: $mySpaces.filter(
      (mySpace) => mySpace.spacePrivacy === "private"
    ),
  };

  // console.log(privateSpace, publicSpace, sharedSpace);
  const [toggleSpaceFileCreation, setToggleSpaceFileCreation] = useState(false);

  // space data
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [spacePrivacy, setSpacePrivacy] = useState("private");
  const [spaceMonetization, setSpaceMonetization] = useState("no");
  const [spacePrice, setSpacePrice] = useState("");
  const [spaceTags, setSpaceTags] = useState("");
  const [spaceImage, setSpaceImage] = useState("");

  // space error data
  const [spaceNameError, setSpaceNameError] = useState("");
  const [spacePriceError, setSpacePriceError] = useState("");

  // file data
  const [fileSpace, setFileSpace] = useState("");
  const [fileUpload, setFileUpload] = useState("");

  // handle image upload for space cover
  async function handleSpaceImageUpload(event) {
    const file = await event.target.files[0];

    if (file) {
      setSpaceImage(file);
    }
  }

  // handle space file upload
  async function handleSpaceFileUpload(event) {
    const file = await event.target.files[0];

    if (file) {
      setFileUpload(file);
    }
  }

  //   handle space creation
  function handleSpaceCreation() {
    // reset error message on function call
    setSpaceNameError("");
    setSpacePriceError("");

    // validate the form submission
    if (spaceName.trim().length === 0) {
      console.log("space name error");
      setSpaceNameError("Please provide a name for your space");
    } else if (spaceMonetization === "yes" && spacePrice.length === 0) {
      console.log("space price error");
      setSpacePriceError("Please provide a price for your space");
    } else {
      // call the space creation function here
      console.log(
        {
          spaceName,
          spaceDescription,
          spacePrivacy,
          spaceMonetization,
          spacePrice,
          spaceTags,
          spaceImage,
        },
        "hello"
      );

      createSpace({
        spaceName,
        spaceDescription,
        spacePrivacy,
        spaceMonetization,
        spacePrice,
        spaceTags,
        spaceImage,
      });
    }
  }

  //   handle adding file to space
  function handleCreateSpaceFile() {
    console.log({ fileSpace, fileUpload });
  }

  return (
    <section className="relative">
      <main className="">
        <Tabs defaultValue="privateSpace" className="w-full ">
          <div className="my-6 sticky top-[5rem] z-[10]">
            <TabsList className="grid w-full grid-cols-3 bg-white text-base rounded-none">
              <TabsTrigger value="privateSpace" className="bg-[#e6e6e667]">
                Private Space
              </TabsTrigger>
              <TabsTrigger value="publicSpace" className="bg-[#e6e6e667]">
                Public Space
              </TabsTrigger>
              <TabsTrigger value="sharedSpace" className="bg-[#e6e6e667]">
                Shared Space
              </TabsTrigger>
            </TabsList>
          </div>

          {/* private space */}
          <TabsContent value="privateSpace">
            <section className="grid grid-cols-3 gap-6">
              {privateSpace.map((space, index) => (
                <div key={index}>
                  <SpaceCard path="myspace" space={space} />
                </div>
              ))}
            </section>
          </TabsContent>

          {/* public space */}
          <TabsContent value="publicSpace">
            <section className="grid grid-cols-3 gap-6">
              {publicSpace.map((space, index) => (
                <div key={index}>
                  <SpaceCard path="myspace" space={space} />
                </div>
              ))}
            </section>
          </TabsContent>

          {/* shared space */}
          <TabsContent value="sharedSpace">
            <section className="grid grid-cols-3 gap-6">
              {sharedSpace.map((space, index) => (
                <div key={index}>
                  <SpaceCard path="myspace" space={space} />
                </div>
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </main>

      {/* start create devices modal */}
      {toggleSpaceFileCreation && (
        <>
          {/* create space */}
          <Dialog className="bg-black/80">
            <DialogTrigger asChild>
              <div className="fixed bottom-[11.5rem] right-6 cursor-pointer">
                <span className="relative flex h-[3.5rem] w-[10rem] ">
                  <span className="animate-ping absolute inline-flex   h-full w-full rounded-full opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-[3.5rem] w-[10rem] items-center justify-center text-black bg-white shadow-lg">
                    Create Space
                  </span>
                </span>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] h-[25rem] overflow-y-auto sidebar">
              <h1 className="text-lg text-center font-bold">
                Create your space
              </h1>
              {/* create space form fields */}
              <div className="grid gap-4 py-4">
                {/* space name */}
                <div>
                  <Label htmlFor="spaceName">Give your space a name</Label>
                  <Input
                    className="mt-3"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    placeholder="e.g Lily's Movie Space"
                  />
                  {spaceNameError.length > 0 && (
                    <p className="text-red-700 mt-2 text-sm">
                      {spaceNameError}
                    </p>
                  )}
                </div>

                {/* space Description */}
                <div>
                  <Label htmlFor="spaceDescription">
                    In few words describe your space
                  </Label>
                  <Textarea
                    id="spaceDescription"
                    className="mt-3"
                    value={spaceDescription}
                    onChange={(e) => setSpaceDescription(e.target.value)}
                  />
                </div>

                {/* space privacy */}
                <div className="w-full space-y-3">
                  <Label htmlFor="spacePrivacy">Pick your space privacy</Label>
                  <Select
                    id="spacePrivacy"
                    onValueChange={(value) => setSpacePrivacy(value)}
                    className="mt-3"
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* space monetization */}
                {spacePrivacy === "public" && (
                  <div className="w-full space-y-3">
                    <Label htmlFor="spaceMonetization">
                      Would you like to monetize your space
                    </Label>
                    <Select
                      id="spaceMonetization"
                      onValueChange={(value) => setSpaceMonetization(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="YES/NO" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* space Price */}
                {spaceMonetization === "yes" && (
                  <div>
                    <Label htmlFor="spacePrice">
                      Set a price for your space ($ dollar)
                    </Label>

                    <div className="relative">
                      <Input
                        type="number"
                        id="spacePrice"
                        className="mt-3 pl-9"
                        value={spacePrice}
                        onChange={(e) => setSpacePrice(e.target.value)}
                      />
                      <DollarSignIcon
                        className="absolute inset-y-[0.8rem] left-3"
                        style={{ height: "1rem" }}
                      />
                    </div>
                    {spacePriceError.length > 0 && (
                      <p className="text-red-700 mt-2 text-sm">
                        {spacePriceError}
                      </p>
                    )}
                  </div>
                )}

                {/* space Tags */}
                <div>
                  <Label htmlFor="spaceTags">
                    Enter tags to help index your space during search
                  </Label>
                  <Input
                    id="spaceTags"
                    className="mt-3"
                    value={spaceTags}
                    onChange={(e) => setSpaceTags(e.target.value)}
                    placeholder="Dance, Books, Movies, Coding"
                  />
                </div>

                {/* space image */}
                <div className="space-y-3">
                  <Label htmlFor="spaceCoverImage">
                    Pick a cover image for your space
                  </Label>
                  <Input
                    id="spaceCoverImage"
                    type="file"
                    onChange={handleSpaceImageUpload}
                  />
                </div>
              </div>

              {/* create space submit button */}
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full color1"
                  onClick={handleSpaceCreation}
                >
                  Create Space
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* add file */}
          <Dialog className="bg-black/80">
            <DialogTrigger asChild>
              <div className="fixed bottom-[7rem] right-6 cursor-pointer">
                <span className="relative flex h-[3.5rem] w-[7rem] ">
                  <span className="animate-ping absolute inline-flex   h-full w-full rounded-full opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-[3.5rem] w-[7rem] items-center justify-center text-black bg-white shadow-lg ">
                    Add File
                  </span>
                </span>
              </div>
            </DialogTrigger>

            {/* form for adding file */}
            <DialogContent className="sm:max-w-[425px] h-[25rem] overflow-y-auto sidebar">
              <h1 className="text-lg text-center font-bold">
                Add a file to a space
              </h1>
              <div className="grid gap-4 py-4">
                {/* file space*/}
                <div className="w-full space-y-3">
                  <Label htmlFor="spaceMonetization">
                    Which space would you like to add your file.
                  </Label>
                  <Select
                    id="spaceMonetization"
                    onValueChange={(value) => setFileSpace(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick a space" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Precious Movie space">
                        Precious Movie space
                      </SelectItem>
                      <SelectItem value="James Docs">James Docs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* file upload */}
                <div className="space-y-3">
                  <Label htmlFor="spaceFileUpload">Upload your file</Label>
                  <Input
                    id="spaceFileUpload"
                    type="file"
                    onChange={handleSpaceFileUpload}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full color1"
                  onClick={handleCreateSpaceFile}
                >
                  Add file to space
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}

      {/* create space/file button */}
      <div
        className="fixed bottom-10 right-6 cursor-pointer"
        onClick={() => setToggleSpaceFileCreation(!toggleSpaceFileCreation)}
      >
        <span className="relative flex h-[3.5rem] w-[3.5rem] ">
          {!toggleSpaceFileCreation && (
            <span className="animate-ping absolute inline-flex   h-full w-full rounded-full color1 opacity-75"></span>
          )}
          <span className="relative inline-flex rounded-full h-[3.5rem] w-[3.5rem] color1 items-center justify-center text-white">
            {!toggleSpaceFileCreation ? (
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </span>
        </span>
      </div>

      {/* end create devices modal */}
    </section>
  );
};

export default Spaces;
