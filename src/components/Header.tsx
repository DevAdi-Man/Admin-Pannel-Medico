import { FaUser } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { RiNotification3Fill } from "react-icons/ri";

const headerLinks = [
  {
    name: "User",
    icon: <FaUser />,
  },
  {
    name: "Notifications",
    icon: <RiNotification3Fill />,
  },
  {
    name: "Settings",
    icon: <IoSettings />,
  },
];

const Header = () => {
  return (
    <div className="h-full flex justify-between items-center">
      <div className="flex  w-[70%]">
        <div className="h-[40px] w-[40px] mr-4 rounded-full bg-red-300 flex items-center justify-center">
          <IoIosSearch className="text-white text-2xl " />
        </div>
        <div className="border-[1px] border-black flex items-center gap-3 px-4 py-2 w-[calc(100%-64px)] rounded-4xl">
          <input placeholder="Search" className="focus:outline-none w-full" />
          <div className="border border-dashed px-3 w-fit h-full rounded-full">
            Patients 
          </div>
          <div className="border border-dashed px-3 w-fit h-full rounded-full">
            Education
          </div>
          <div className="border border-dashed px-3 w-fit h-full rounded-full">
            Prescriptions
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {headerLinks.map((link, index) => (
          <div
            key={link.name}
            className={`
        h-[42px] w-[42px]
        rounded-full
        bg-black
        text-white
        flex items-center justify-center
        cursor-pointer
        ${index !== 0 ? "-ml-1" : ""}
      `}
          >
            {link.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
