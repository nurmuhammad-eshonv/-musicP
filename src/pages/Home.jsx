import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import axios from "../axios/axios"

function Home() {
  
  const [token, setToken] = useState(localStorage.getItem("access_token") || "");

  const CLIENT_ID = "7283734ed5d546859a182f94dfce18a8";
  const CLIENT_SECRET = "a3e9674182bd4c77843b524ad072f35a";

  const getToken = async () => {
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        },
        body: "grant_type=client_credentials",
      });

      const auth = await response.json();
      const newToken = `${auth.token_type} ${auth.access_token}`;
      localStorage.setItem("access_token", newToken);
      setToken(newToken);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      getToken();
    }
  }, [token]);

  
  // axios.get("/v1/browse/categories/toplists/playlists")
  // .then(res => console.log(res)
  // )

  return (
    <div className="bg-gradient-to-b from-blue-950 to-gray-950 text-white p-8">
      {/* Navigation Controls */}
      <div className="flex items-center space-x-4 mb-8">
        <ChevronLeft
          className="hover:bg-slate-500 transition-all p-1 rounded-full cursor-pointer"
          size={24}
        />
        <ChevronRight
          className="hover:bg-slate-500 transition-all p-1 rounded-full cursor-pointer"
          size={24}
        />
      </div>

      {/* Good Afternoon Section */}
      <div>
        <h1 className="text-3xl font-bold">Good afternoon</h1>
        <div className="flex flex-wrap gap-4 mt-6">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="bg-[#1c3772] w-[479px] rounded-[10px] flex items-center space-x-4"
            >
              <div className="w-[74px] h-full">
                <img
                  className="rounded-[10px]"
                  src="https://picsum.photos/400"
                  alt="title"
                />
              </div>
              <div className="font-semibold">title</div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Top Mixes Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your top mixes</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
            >
              <div className="w-full h-[182px] bg-black rounded-md mb-4"></div>
              <div className="font-semibold mb-1">title</div>
              <div className="text-sm text-gray-400">
                Hey Violet, Khalid, more
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Made for You Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Made for you</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {["Folk Mix", "Daily Mix 1", "Daily Mix 5", "Pop Mix", "Indie Mix"].map(
            (title, index) => (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg"
              >
                <div className="w-full h-32 bg-black rounded-md mb-4"></div>
                <div className="font-semibold mb-1">{title}</div>
                <div className="text-sm text-gray-400">Curated for you</div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;



