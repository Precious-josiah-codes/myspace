import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const SpaceCard = () => {
  const image =
    "https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg?auto=compress&cs=tinysrgb&w=600";
  return (
    <div className="flex-1 text-sm  relative">
      <div className="w-full rounded-lg overflow-hidden relative">
        <Image
          src={image}
          height={1000}
          width={600}
          className="relative object-cover transition-all hover:scale-105"
        />
      </div>

      {/* other options */}
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

      <div className="flex justify-between items-center px-4 py-4 relative">
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
        <h1>Free</h1>
      </div>
    </div>
  );
};

export default SpaceCard;
