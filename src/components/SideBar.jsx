import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navigate = useNavigate("")
  return (
    <div className="w-[230px] bg-black text-gray-300 pl-[30px] pt-[70px] flex flex-col h-screen">
      <div className="space-y-4">
        <div className="flex items-center space-x-4 ">
          <Home  className="w-6 h-6 " />
          <span onClick={() => navigate("/")} className="text-[15px] font-semibold hover:opacity-70  transition-all cursor-pointer ">Home</span>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-6 h-6" />
          <span className="text-[15px] font-semibold hover:opacity-70  transition-all cursor-pointer">Search</span>
        </div>
        <div className="flex items-center space-x-4">
          <Library className="w-6 h-6" />
          <span className="text-[15px] font-semibold hover:opacity-70  transition-all cursor-pointer">Your Library</span>
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <div className="flex items-center space-x-4">
          <PlusSquare className="w-6 h-6" />
          <span className="text-[15px] font-semibold hover:opacity-70  transition-all cursor-pointer">Create Playlist</span>
        </div>
        <div className="flex items-center space-x-4">
          <Heart  className="w-6 h-6 text-red-500" />
          <span onClick={() => navigate("/likes")} className="hover:opacity-70  transition-all cursor-pointer text-[15px] font-semibold ">Liked Songs</span>
        </div>
      </div>
      
     
    </div>
  );
}

export default SideBar;