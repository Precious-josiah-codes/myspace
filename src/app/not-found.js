import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center text-center space-y-6">
      <h2>Not Found</h2>
      <p className="w-[30rem]">
        Ooopppsss.... this page is currently not available, the SPACESYNC team
        is currently working to make this feature available
      </p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
