import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { AiFillDollarCircle, AiOutlineSchedule } from "react-icons/ai";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiBearSmileLine, RiChatSmileAiLine } from "react-icons/ri";
import { GiBookCover } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa";
import { IoDocuments, IoSettings } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  {
    key: "General",
    links: [
      {
        name: "Dashboard",
        icon: <RxDashboard />,
        path: "/",
      },
      {
        name: "Schedule",
        icon: <AiOutlineSchedule />,
        path: "/schedule",
      },
      {
        name: "Patients",
        icon: <HiMiniUserGroup />,
        path: "/patients",
      },
      {
        name: "Statistics and reports",
        icon: <RiBearSmileLine />,
        path: "/statistics",
      },
      {
        name: "Education",
        icon: <GiBookCover />,
        path: "/education",
      },
      {
        name: "My articles",
        icon: <FaBookmark />,
        path: "/my-articles",
      },
    ],
  },
  {
    key: "Tools",
    links: [
      {
        name: "Chats & call",
        icon: <RiChatSmileAiLine />,
        path: "/chats",
      },
      {
        name: "Billing",
        icon: <AiFillDollarCircle />,
        path: "/billing",
      },
      {
        name: "Documents",
        icon: <IoDocuments />,
        path: "/documents",
      },
      {
        name: "Settings",
        icon: <IoSettings />,
        path: "/settings",
      },
    ],
  },
];

const SideBar = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  return (
    <div className="bg-black border-8 h-[calc(100vh-30px)] rounded-2xl relative">
      {/* Headering  */}
      <div
        onClick={toggleSidebar}
        className="cursor-pointer w-[30px] h-[30px] rounded-full bg-black z-2 flex items-center justify-center absolute top-10 -right-[15px]"
      >
        <div className="w-[20px] h-[20px] rounded-full flex justify-center items-center bg-red-300">
          {isSidebarOpen ? (
            <FaAngleLeft className="text-white text-sm" />
          ) : (
            <FaAngleRight className="text-white text-sm" />
          )}
        </div>
      </div>
      <h1 className="text-white font-bold text-[34px] text-center transition-all duration-300 ">
        {isSidebarOpen ? "Medico" : "M"}
      </h1>
      <div className="mt-10 px-[15px]">
        <ul>
          {sidebarLinks.map((item) => (
            <div key={item.key} className="mb-4">
              <p
                className={`text-gray-400 text-[12px] font-body font-semibold mb-2 text-base transition-all duration-300 whitespace-nowrap uppercase ${isSidebarOpen ? "opacity-100 max-w-50 block" : "opacity-0 max-w-0 overflow-hidden hidden"}`}
              >
                {item.key}
              </p>
              {item.links.map((link) => (
                <li key={link.name} className="w-full">
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center text-sm gap-2 text-gray-300 text-[14px]
     py-2.5 cursor-pointer rounded-md px-2.5 relative
     font-body
     hover:bg-gray-700 transition-all duration-300 overflow-hidden
     ${isActive ? "after:content-[''] after:top-0 after:left-0 after:w-1 after:h-full after:bg-red-300 after:absolute" : ""}`
                    }
                  >
                    <span
                      className={`
                transition-all duration-300
                ${isSidebarOpen ? "text-[14px]" : "text-[18px] mx-auto"}
              `}
                    >
                      {link.icon}
                    </span>

                    {/* Label */}
                    <span
                      className={`
                whitespace-nowrap overflow-hidden
                transition-all duration-300
                ${
                  isSidebarOpen
                    ? "opacity-100 max-w-[200px]"
                    : "opacity-0 max-w-0"
                }
              `}
                    >
                      {link.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </div>
          ))}
        </ul>
        <div className="flex items-center center transition-all duration-300  gap-2 text-gray-300  py-[10px] cursor-pointer hover:bg-gray-700 rounded-md px-[10px]">
          <span className={`${isSidebarOpen ? "text-[14px]" : "text-[22px]"}`}>
            <MdLogout />
          </span>

          <span className={`${isSidebarOpen ? "opacity-100 text-[14px]" : "opacity-0 text-[14px] max-w-0 overflow-hidden"}`}>
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
