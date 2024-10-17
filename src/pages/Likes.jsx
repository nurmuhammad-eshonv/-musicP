import React from 'react'
import { ChevronLeft, ChevronRight, Heart, Play } from 'lucide-react';
import axios from "../axios/axios"
import { useNavigate } from 'react-router-dom';
function Likes() {
 
  const songs = [
    { title: "Play It Safe", artist: "Julia Wolf", album: "Play It Safe", duration: "2:12" },
    { title: "Ocean Front Apt.", artist: "Sydney", album: "In the Shape of a Dream", duration: "2:12" },
    { title: "Free Spirit", artist: "Khalid", album: "Free Spirit", duration: "3:02" },
    { title: "Remind You", artist: "FRIENDSHIP", album: "Vacation", duration: "4:25" },
    { title: "Same Old", artist: "SHY Martin", album: "Same Old", duration: "2:56" },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-purple-900 to-black p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <ChevronLeft className="hover:bg-slate-500 transition-all  rounded-[50%] cursor-pointer" size={24} />
          <ChevronRight className="hover:bg-slate-500 transition-all   rounded-[50%] cursor-pointer" size={24} />
        </div>
        <div className="flex items-center space-x-2">
          <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
          <span>daveddirect3</span>
        </div>
      </header>

      <div className="flex items-center space-x-6 mb-8">
        <div className="w-60 h-60 bg-purple-700 flex items-center justify-center">
          <Heart size={80} color="white" />
        </div>
        <div>
          <p className="text-sm">PUBLIC PLAYLIST</p>
          <h1 className="text-7xl font-bold mb-6">Liked Songs</h1>
          <p className="text-sm">daveddirect3 • 34 songs</p>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <button className="bg-green-500 text-black rounded-full p-3">
          <Play size={24} fill="black" />
        </button>
        <button className="border border-white rounded-full p-2">
          <Heart size={24} />
        </button>
        <button className="text-3xl">•••</button>
      </div>

      <div className="grid grid-cols-[auto,2fr,2fr,1fr] gap-4 text-sm text-gray-400 border-b border-gray-700 pb-2 mb-4">
        <span>#</span>
        <span>TITLE</span>
        <span>ALBUM</span>
        <span>DATE ADDED</span>
      </div>

      <div className="space-y-4">
        {songs.map((song, index) => (
          <div key={index} className="grid grid-cols-[auto,2fr,2fr,1fr] items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded group">
            <span className="w-8">{index + 1}</span>
            <div className="flex items-center">
              <img src={`/api/placeholder/40/40`} alt={song.title} className="w-10 h-10 mr-4" />
              <div>
                <p className="text-white">{song.title}</p>
                <p className="text-sm">{song.artist}</p>
              </div>
            </div>
            <span>{song.album}</span>
            <div className="flex items-center justify-between">
              <Heart size={16} className="opacity-0 group-hover:opacity-100" />
              <span>{song.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Likes