import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useSelector } from "react-redux";
import BottomBar from "../components/BottomBar"; // Import BottomBar

function Likes() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const likedSongs = useSelector((state) => state.users); // Assuming this contains the liked songs
  const [audio] = useState(new Audio());
  const [storedSongs, setStoredSongs] = useState([]);

  useEffect(() => {
    if (likedSongs?.users?.length) {
      localStorage.setItem('likedSongs', JSON.stringify(likedSongs.users));
    }
  }, [likedSongs]);

  useEffect(() => {
    const savedSongs = JSON.parse(localStorage.getItem('likedSongs'));
    if (savedSongs) {
      setStoredSongs(savedSongs);
    }
  }, []);

  const playTrack = (track) => {
    if (currentTrack === track) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      audio.src = track.preview_url;
      audio.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const loaderCSS = `
    .loader {
      width: 20px;
      aspect-ratio: 1;
      display: flex;
      justify-content: space-between;
      animation: l4-0 .2s infinite alternate;
    }
    .loader::before,
    .loader::after {
      content: "";
      width: 25%;
      background: #1DB954;
      animation: l4-1 .9s infinite alternate;
    }
    @keyframes l4-0 {
      0%    {transform: scaleY(1)}
      100%  {transform: scaleY(.4)}
    }
    @keyframes l4-1 {
      0%    {transform: scaleY(.4)}
      100%  {transform: scaleY(1)}
    }
  `;

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-purple-900 to-black p-8">
      <header className="flex justify-between items-center mb-8">
        <style>{loaderCSS}</style>
        <div className="flex space-x-4">
          <ChevronLeft
            className="hover:bg-slate-500 transition-all rounded-[50%] cursor-pointer"
            size={24}
          />
          <ChevronRight
            className="hover:bg-slate-500 transition-all rounded-[50%] cursor-pointer"
            size={24}
          />
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="/api/placeholder/32/32"
            alt="User"
            className="w-8 h-8 rounded-full"
          />
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
          <p className="text-sm">{storedSongs.length} liked songs</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto,2fr,2fr,1fr] gap-4 text-sm text-gray-400 border-b border-gray-700 pb-2 mb-4">
        <span>#</span>
        <span>TITLE</span>
        <span>ALBUM</span>
        <span>DATE ADDED</span>
      </div>

      <div className="space-y-4">
        {storedSongs.map((song, index) => (
          <div
            key={index}
            className="grid grid-cols-[auto,2fr,2fr,1fr] items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded group"
            onClick={() => playTrack(song.track)}
          >
            <span className="w-8">
              {currentTrack === song.track && isPlaying ? (
                <div className="loader"></div>
              ) : (
                index + 1
              )}
            </span>
            <div className="flex items-center">
              <img
                src={song.track.album.images[0]?.url}
                alt={song.track.name}
                className="w-10 h-10 mr-4"
              />
              <div>
                <p className="text-white">{song.track.name}</p>
                <p className="text-sm">
                  {song.track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
            <span>{song.track.album.name}</span>
            <div className="flex items-center gap-16 justify-end">
              <Heart className="text-red-600" size={16}></Heart>
              <span>{new Date(song.added_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* BottomBar component for controls */}
      <BottomBar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
        setIsPlaying={setIsPlaying}
        audio={audio}
      />
    </div>
  );
}

export default Likes;


