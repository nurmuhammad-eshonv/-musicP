// import React from "react";
// import SideBar from "../components/SideBar";
// import BottomBar from "../components/BottomBar";
// import RightBar from "../components/RightBar";
// function MainLoyaut({ children }) {
//   return (
//     <div className="flex h-screen">
//       {/* Fixed Sidebar */}
//       <div className="w-[230px] fixed top-0 left-0 h-full z-10">
//         <SideBar />
//       </div>
//       <div className="w-[230px] fixed top-0 left-100 h-full z-10">
//         <RightBar />
//       </div>
//       <></>

//       {/* Content Area */}
//       <div className="flex-grow ml-[250px] mb-[80px]">
//         <main className="">{children}</main>
//       </div>

//       {/* Fixed BottomBar */}
//       <div className="fixed bottom-0 left-0 w-full z-20">
//         <BottomBar />
//       </div>
//     </div>
//   );
// }

// export default MainLoyaut;

import React from "react";
import SideBar from "../components/SideBar";
import BottomBar from "../components/BottomBar";
import RightBar from "../components/RightBar";

function MainLayout({ children }) {
  return (
    <div className="">
      <div className="flex h-screen">
        {/* Fixed Sidebar */}
        <div className="w-[230px] fixed top-0 left-0 h-full z-10">
          <SideBar />
        </div>

        {/* Content Area */}
        <div className="flex-grow ml-[230px] mr-[223px] mb-[70px] overflow-y-auto">
          <main>{children}</main>
        </div>

        {/* Fixed RightBar */}
        <div className="w-[250px] fixed top-0 right-0 h-full z-10">
          <RightBar />
        </div>

        {/* Fixed BottomBar */}
        <div className="fixed bottom-0 left-0 w-full z-20">
          <BottomBar />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
