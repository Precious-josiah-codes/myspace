"use client";

// modules
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "../ui/progress";

// styles
const link = `flex items-center p-2 text-gray-700 rounded-lg  hover:bg-white group cursor-pointer transition-all duration-300`;
const linkText = `ml-6  whitespace-nowrap `;
const desktopSideBar =
  "fixed top-0 left-0 z-40 w-64 text-base h-screen bg-white border-r border-[#5b58662d] text-red-900 font-normal hidden sm:block";

const Sidebar = () => {
  //   const { toggleSideMenu, links } = useContext(StoreContext);
  const [activeLink, setActiveLink] = useState("");
  const [activeSubLink, setSubActiveLink] = useState("");
  const [toggleCaret, setToggleCaret] = useState(false);

  const [sideBarLinks, setSideBarLinks] = useState([
    {
      link: "/",
      text: "Explore Spaces",
    },
    {
      link: "/spaces",
      text: "My Spaces",
    },
    {
      link: "/recent",
      text: "Recent",
    },
    {
      link: "/favourites",
      text: "Favourites",
    },
    {
      link: "/trash",
      text: "Trash",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, [true]);

  const handleRoute = (path) => {
    router.push(path);
    setActiveLink(path);
    setSubActiveLink(" ");
    setToggleCaret(!toggleCaret);
    console.log(path, "hello");
  };

  const handleSubLink = (path) => {
    router.push(path);
    setSubActiveLink(path);
    console.log(activeSubLink, "hdjh");
  };

  return (
    <div
      id="cta-button-sidebar"
      className={desktopSideBar}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col justify-between py-4 overflow-y-auto 2xl:py-[3.3rem] ">
        {/* start logo/brand name */}
        <div className="px-3">
          <div className="w-full">
            <span className="ml-6 text-black font-bold text-lg">
              SPACESYNC.
            </span>
          </div>
        </div>
        {/* start logo/brand name */}

        {/* start page links */}
        <div
          className="space-y-9
          h-[23rem]  2xl:h-auto 2xl:space-y-6 px-3  flex flex-col justify-center cursor-pointer"
        >
          {/* other links */}
          {sideBarLinks.map((sideBarLink, index) => (
            <div key={index}>
              <div
                onClick={() => handleRoute(sideBarLink.link)}
                className={`w-full ${
                  activeLink === sideBarLink.link ? "bg-secondaryColor" : null
                }`}
              >
                {/* text */}
                <span
                  className={` ${linkText} hover:font-bold ${
                    activeLink === sideBarLink.link
                      ? "text-[#19BFBF] font-semibold"
                      : "text-black"
                  }`}
                >
                  {sideBarLink.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* end page links */}

        {/* profile section */}
        <div className="px-3 text-base text-black">
          <div className="ml-6 space-y-3">
            <h1 className="font-bold">Storage</h1>

            <div className="space-y-[2px]">
              <p className="mb-[0.6rem] text-sm">20GB remaining</p>
              <Progress value={33} className="w-full rounded-[0.2375rem]" />
              <p className="text-sm">0GB of 20 used</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
