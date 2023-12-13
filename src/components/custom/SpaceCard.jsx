import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useRouter } from "next/navigation";

const SpaceCard = ({ path, space }) => {
  const router = useRouter();

  const handleRoute = (id) => {
    console.log(space, "the space");
    router.push(`${path}/${id}`);
  };
  return (
    <div className="flex-1 text-sm  relative cursor-pointer">
      <div
        className="w-full h-[200px] rounded-lg overflow-hidden relative"
        onClick={() => handleRoute(space.id)}
      >
        <Image
          src={`data:image/png;base64,${space.spaceImage}`}
          height={1000}
          width={600}
          className="relative object-cover transition-all hover:scale-105"
        />
      </div>

      {/* other options */}
      {path !== "space" && (
        <div className="absolute top-4 right-3">
          <Popover>
            <PopoverTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </PopoverTrigger>

            <PopoverContent className="w-auto space-y-5">
              <div className="cursor-pointer">Delete Space</div>
              <div className="cursor-pointer">Update Space</div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="flex justify-between items-center px-4 py-4 relative">
        <div className="flex items-center space-x-3">
          <div className="h-[2.7rem] w-[2.7rem] rounded-full overflow-hidden relative bg-black text-white inline-flex justify-center items-center">
            <div>{space.spaceAuthorProfile}</div>
          </div>

          <div>
            <h1 className="font-semibold">{space.spaceAuthor}</h1>
            <p>{space.spaceName}</p>
          </div>
        </div>
        <h1>{space.spaceMonetization === "yes" ? "Paid" : "Free"}</h1>
      </div>
    </div>
  );
};

export default SpaceCard;
