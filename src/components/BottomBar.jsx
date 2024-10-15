import React from "react";
import { ArrowLeft, Heart, PictureInPicture, Shuffle, SkipBack, Play, SkipForward, Repeat, Music, List, Monitor, Volume, Maximize2 } from "lucide-react"; // Import Lucide icons

function BottomBar() {
  return (
    <div className="flex px-4 justify-between items-center h-full bg-black">
      <div className="min-w-[11.25rem] w-[30%]">
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <div className="w-14 h-14 mr-3 relative group flex-shrink-0">
              <img src="#" alt="" />
              <button className="w-6 h-6 bg-black opacity-0 group-hover:opacity-60 hover:!opacity-100 hover:scale-[1.06] rotate-90 rounded-full absolute top-1 right-1 flex items-center justify-center">
                <ArrowLeft size={16} />
              </button>
            </div>
            <div>
              <h6 className="text-sm line-clamp-1">Title</h6>
              <p className="text-[0.688rem] text-white text-opacity-70">
                Artist
              </p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Heart size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <PictureInPicture size={16} />
          </button>
        </div>
      </div>
      <div className="max-w-[45.125rem] w-[40%] pt-2 flex flex-col px-4 items-center">
        <div className="flex items-center gap-x-2">
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Shuffle size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <SkipBack size={16} />
          </button>
          <button className="w-8 h-8 bg-white flex items-center justify-center text-black rounded-full hover:scale-[1.06]">
            <Play size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <SkipForward size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Repeat size={16} />
          </button>
        </div>
        <div className="w-full flex items-center mt-1.5 gap-x-2">
          <div className="text-[0.688rem] text-white text-opacity-70">0:00</div>
          <div className="w-full">
            <input
              type="range"
              min="0"
              max="100"
              value="50"
              className="w-full"
            />
          </div>
          <div className="text-[0.688rem] text-white text-opacity-70">4:00</div>
        </div>
      </div>
      <div className="min-w-[11.25rem] w-[30%] flex items-center justify-end">
        <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
          <Music size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
          <List size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
          <Monitor size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
          <Volume size={16} />
        </button>
        <div className="w-[5.813rem] max-w-full">
          <input type="range" min="0" max="1" step="0.01" className="w-full" />
        </div>
        <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}

export default BottomBar;
