import React, { useState } from "react";
import SideBar from "../components/SideBar";
import BottomBar from "../components/BottomBar";
import RightBar from "../components/RightBar";

function MainLayout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="">
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="w-[230px] fixed top-0 left-0 h-full z-10">
          <SideBar />
        </div>

        {/* Content Area */}
        <div className={`flex-grow ml-[230px] mb-10 ${open ? "mr-[230px]" : ""}`}> {/* Changed to margin-bottom */}
          <main className="pb-14">{children}</main>
        </div>

        {/* Fixed RightBar */}
        <div className="w-[250px] fixed top-0 right-0 h-full z-10">
          <RightBar open={open} setOpen={setOpen} />
        </div>

        {/* Fixed BottomBar */}
        <div className="fixed bottom-0 left-0 w-full z-20 mt-10">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
