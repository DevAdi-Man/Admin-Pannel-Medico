import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div>
      <div className="flex p-[15px] bg-[#faf4e6]">
        <div
          className={`flex-[0_0_auto] transition-all duration-300 ${isSidebarOpen ? "w-[18%]" : "w-[80px]"}`}
        >
          <SideBar
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "w-[82%]" : "w-[calc(100%-80px)]"}`}
        >
          <div className="h-[60px] mb-[15px] pl-[28px]">
            <Header />
          </div>
          <div className="content-area h-[calc(100vh-120px)] pl-[28px] overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
