import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { space } from "postcss/lib/list";

const FileCard = ({ file, isMoreOption }) => {
  return (
    <div className="flex-1 text-sm  relative cursor-pointer">
      <div className="w-full h-[200px] rounded-lg overflow-hidden relative group">
        <Image
          src={file.fileThumbNail}
          height={1000}
          width={600}
          className="relative object-cover transition-all group-hover:scale-105"
        />

        {/* file type icon */}
        <div className="absolute top-0 z-50 flex items-center justify-center w-full h-full">
          {file.fileType === "video" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[3rem] h-[3rem] text-[#ffffffcb]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          )}
          {file.fileType === "audio" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[3rem] h-[3rem] text-[#ffffffcb] "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              />
            </svg>
          )}
          {file.fileType === "image" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[3rem] h-[3rem] text-[#ffffffcb]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          )}
          {file.fileType === "document" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-[3rem] h-[3rem] text-[#ffffffcb]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          )}
        </div>

        {/* overlay */}
        <div className="absolute top-0 z-20 flex items-center justify-center w-full h-full bg-[#00000042]" />
      </div>

      {/* other options */}
      {isMoreOption && (
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
              <div className="cursor-pointer">Delete File</div>
              <div className="cursor-pointer">Update File</div>
            </PopoverContent>
          </Popover>
        </div>
      )}

      <div className="flex justify-between items-center px-4 py-4 relative">
        <div>
          <h1 className="font-semibold">{file.fileName}</h1>
        </div>
        <h1 className="bg-teal-500 rounded-full px-2 text-white">
          {file.fileType}
        </h1>
      </div>
    </div>
  );
};

export default FileCard;
