import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart, Play } from "lucide-react";
import axios from "../axios/axios";
import { useParams } from "react-router-dom";
import BottomBar from "../components/BottomBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function Playlist() {
  const success = () => toast.success("added successfully");
  const error = () => toast.error("already added to likes page");

  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [counter, setCounter] = useState(0);
  const [likedStorage, setLikedStorage] = useState([])

  
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`/playlists/${id}`);
      setPlaylist(response.data);
      setSongs(response.data.tracks.items);
      if (response.status === 401) {
        throw new Error("401");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        getToken();
        setCounter(counter + 1)
      } else {
        console.log("Xato yuz berdi:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, counter]);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  const playTrack = (track) => {
    if (currentTrack === track) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      audio.src = track.preview_url;
      audio.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    if (currentTrack) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };


const toggleLike = (song,) => {
  const newLikedSongs = new Set(likedSongs);

  const likedSongsArray = [...newLikedSongs]; // Convert Set to an array
  localStorage.setItem('likedSongs', JSON.stringify(likedSongsArray)); // Store in localStorage
  
  


  
  
  if (newLikedSongs.has(song.track.id)) {
    newLikedSongs.delete(song.track.id);
    error()

    dispatch({ type: "DELETE", payload: index }); 
  } else {
    console.log(`Adding ${song.track.name} to liked songs`);
    newLikedSongs.add(song.track.id);
    dispatch({ type: "ADD", payload: song });

    success()
  }

  setLikedSongs(newLikedSongs);
};

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

  if (!playlist)
    return (
      <div className="flex justify-center items-center h-screen bg-green-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-green-900 to-black p-8">
      <style>{loaderCSS}</style>
      <ToastContainer />

      <header className="flex justify-between items-center mb-8">
        <div className="flex space-x-4">
          <ChevronLeft className="hover:bg-slate-500 transition-all rounded-[50%] cursor-pointer" size={24} />
          <ChevronRight className="hover:bg-slate-500 transition-all rounded-[50%] cursor-pointer" size={24} />
        </div>
        <div className="flex items-center space-x-2">
          <img src="/api/placeholder/32/32" alt="User" className="w-8 h-8 rounded-full" />
          <span>{playlist.owner.display_name}</span>
        </div>
      </header>

      <div className="flex items-center space-x-6 mb-8">
        <div className="w-60 h-60 bg-purple-700 flex items-center justify-center">
          {playlist.images[0] ? (
            <img src={playlist.images[0].url} alt="Playlist Cover" className="w-60 h-60" />
          ) : (
            <Heart className="cursor-pointer" size={80} color="white" />
          )}
        </div>
        <div>
          <p className="text-sm">PUBLIC PLAYLIST</p>
          <h1 className="text-7xl font-bold mb-6">{playlist.name}</h1>
          <p className="text-sm">
            {playlist.owner.display_name} • {songs.length} songs
          </p>
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
          <div
            key={song.track.id}
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
              <img src={song.track.album.images[0]?.url} alt={song.track.name} className="w-10 h-10 mr-4" />
              <div>
                <p className="text-white">{song.track.name}</p>
                <p className="text-sm">{song.track.artists.map((artist) => artist.name).join(", ")}</p>
              </div>
            </div>
            <span>{song.track.album.name}</span>
            <div className="flex items-center justify-between">
              <Heart
                onClick={() => toggleLike(song)}
                size={16}
                className={`cursor-pointer ${likedSongs.has(song.track.id) ? "text-red-600" : ""}`}
              />
              <span>{new Date(song.added_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* BottomBar component */}
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

export default Playlist;
