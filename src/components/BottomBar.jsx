
import React, { useState, useEffect } from "react";
import { Play, Pause, Shuffle, SkipBack, SkipForward, Repeat, List, Monitor, Volume, Maximize2, Heart } from "lucide-react";

function BottomBar({ currentTrack, isPlaying, handlePlayPause, setIsPlaying, audio }) {
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    setProgress(newProgress);
    audio.currentTime = (audio.duration * newProgress) / 100; // Set audio current time based on progress
  };

  useEffect(() => {
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    if (isPlaying) {
      audio.addEventListener('timeupdate', updateProgress);
    }

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [isPlaying, audio]);

  return (
    <div className="fixed z-50 bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-neutral-900 to-black border-t border-neutral-800">
      <div className="flex px-4 justify-between items-center h-full">
        {/* Left section - Now Playing */}
        <div className="min-w-[11.25rem] w-[30%]">
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <div className="w-14 h-14 mr-3 relative group flex-shrink-0">
                <img
                  src={currentTrack?.album?.images[0]?.url || "https://picsum.photos/50"}
                  alt="Album cover"
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div>
                <h6 className="text-sm text-white font-medium hover:underline cursor-pointer">
                  {currentTrack?.name || "No song playing"}
                </h6>
                <p className="text-[0.688rem] text-white text-opacity-70 hover:underline cursor-pointer">
                  {currentTrack?.artists.map((artist) => artist.name).join(", ") || "Unknown artist"}
                </p>
              </div>
            </div>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Heart size={16} />
            </button>
          </div>
        </div>

        {/* Center section - Player Controls */}
        <div className="max-w-[45.125rem] w-[40%] flex flex-col items-center">
          <div className="flex items-center gap-x-4 mb-1">
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Shuffle size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <SkipBack size={16} />
            </button>
            <button
              className="w-8 h-8 bg-white flex items-center justify-center text-black rounded-full hover:scale-105 transition"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <SkipForward size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Repeat size={16} />
            </button>
          </div>

          <div className="w-full flex items-center gap-x-2">
            <span className="text-xs text-white text-opacity-70">0:00</span>
            <div className="w-full h-1 bg-white bg-opacity-0 rounded-full">
              <input
                type="range"
                className="w-full h-1 bg-white bg-opacity-10 rounded-full"
                value={progress}
                onChange={handleProgressChange}
              />
            </div>
            <span className="text-xs text-white text-opacity-70">0:29</span>
          </div>
        </div>

        {/* Right section - Volume and Queue */}
        <div className="min-w-[11.25rem] w-[30%] flex justify-end items-center">
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <List size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Monitor size={16} />
          </button>
          <div className="flex items-center gap-x-2">
            <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
              <Volume size={16} />
            </button>
            <div className="w-24 h-1 bg-white bg-opacity-10 rounded-full">
              <input
                type="range"
                className="w-full h-1 bg-white bg-opacity-10 rounded-full"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-white text-opacity-70 hover:text-opacity-100">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
