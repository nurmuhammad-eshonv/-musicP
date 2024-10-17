import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Play } from 'lucide-react';
import axios from "../axios/axios";
import { useParams, useNavigate } from 'react-router-dom';

function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null); // Will hold the entire playlist object
  const [songs, setSongs] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/playlists/${id}`);
      setPlaylist(response.data); // Full playlist object
      setSongs(response.data.tracks.items); // Songs are in tracks.items array
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!playlist) return   <div className="flex justify-center items-center h-screen bg-gray-100">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
</div> // Loading state while data is being fetched

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-green-900 to-black p-8">
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
            <Heart className='cursor-pointer' size={80} color="white" />
          )}
        </div>
        <div>
          <p className="text-sm">PUBLIC PLAYLIST</p>
          <h1 className="text-7xl font-bold mb-6">{playlist.name}</h1>
          <p className="text-sm">{playlist.owner.display_name} • {songs.length} songs</p>
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
          <div key={song.track.id} className="grid grid-cols-[auto,2fr,2fr,1fr] items-center text-gray-300 hover:bg-gray-800/50 p-2 rounded group">
            <span className="w-8">{index + 1}</span>
            <div className="flex items-center">
              <img src={song.track.album.images[0]?.url} alt={song.track.name} className="w-10 h-10 mr-4" />
              <div>
                <p className="text-white">{song.track.name}</p>
                <p className="text-sm">{song.track.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
            <span>{song.track.album.name}</span>
            <div className="flex items-center justify-between">
              <Heart size={16} className="cursor-pointer opacity-0 group-hover:opacity-100" />
              <span>{new Date(song.added_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
