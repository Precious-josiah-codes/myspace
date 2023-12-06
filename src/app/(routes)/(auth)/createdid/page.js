import { Button } from "@/components/ui/button";
import Link from "next/link";

const CreateDid = () => {
  return (
    <section className="w-full h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-[2rem] font-bold mb-9">SPACESYNC</h1>
        <h1 className="animate-pulse text-base">
          Creating your Decentralized identity...
        </h1>
        <h1>Your Decentralized identity has been successfully created</h1>
        <Link href="/createprofile">
          <Button className="w-[494px] mt-[1.5rem] bg-teal-500 text-white rounded-none">
            Continue to Create Profile
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CreateDid;
