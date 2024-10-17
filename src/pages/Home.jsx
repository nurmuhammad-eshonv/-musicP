import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import axios from "../axios/axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [mixesData, setMixesData] = useState([]);
  const [madeData, setMadeData] = useState([]);
  const [playedData, setPlayedData] = useState([]);
  const [jumpData, setJumpData] = useState([]);
  const [yoursData, setYoursData] = useState([]);

  console.log(data);

  const fetchDataOne = async () => {
    try {
      const response = await axios.get("/browse/featured-playlists");
      setData(response.data.playlists.items);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  const fetchDataTwo = async () => {
    try {
      const response = await axios.get("/browse/categories/toplists/playlists");
      setMixesData(response.data.playlists.items);
      // console.log(response.data.playlists.items);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  const fetchDataThree = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFHOzuVTgTizF/playlists"
      );
      setMadeData(response.data.playlists.items);
      console.log(response);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  const fetchDataFour = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFQ00XGBls6ym/playlists"
      );
      setPlayedData(response.data.playlists.items);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  const fetchDataFive = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFLVaM30PMBm4/playlists"
      );
      setJumpData(response.data.playlists.items);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  const fetchDataSix = async () => {
    try {
      const response = await axios.get(
        "/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists"
      );
      setYoursData(response.data.playlists.items);
    } catch (error) {
      console.log("Xato yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchDataOne();
    fetchDataTwo();
    fetchDataThree();
    fetchDataFour();
    fetchDataFive();
    fetchDataSix();
  }, []);

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

      <div>
        <h1 className="text-3xl font-bold">Good afternoon</h1>
        <div className="flex flex-wrap gap-4 mt-6">
          {data?.slice(0, 6).map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className="bg-[#1c3772] w-[479px] rounded-[10px] flex items-center space-x-4"
              >
                <div className="w-[74px] h-full">
                  <img
                    className="rounded-[10px]"
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt="title"
                  />
                </div>
                <div className="font-semibold">{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Top Mixes Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your top mixes</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {mixesData?.slice(0, 4).map((item, index) => {
            const maxLength = 20; // Masalan, 50 ta harf bilan cheklash
            const truncatedDescription =
              item.description.length > maxLength
                ? item.description.slice(0, maxLength) + "... and more"
                : item.description;
            return (
              <div
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
              >
                <div className="w-full h-[182px] bg-black rounded-md mb-4">
                  <img
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt=""
                  />
                </div>
                <div className="font-semibold mb-1">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {truncatedDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Made for you</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {madeData?.slice(0, 4).map((item, index) => {
            const maxLength = 20; // Masalan, 50 ta harf bilan cheklash
            const truncatedDescription =
              item.description.length > maxLength
                ? item.description.slice(0, maxLength) + "... and more"
                : item.description;
            return (
              <div
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
              >
                <div className="w-full h-[182px] bg-black rounded-md mb-4">
                  <img
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt=""
                  />
                </div>
                <div className="font-semibold mb-1">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {truncatedDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Recently played</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {playedData?.slice(0, 4).map((item, index) => {
            const maxLength = 20; // Masalan, 50 ta harf bilan cheklash
            const truncatedDescription =
              item.description.length > maxLength
                ? item.description.slice(0, maxLength) + "... and more"
                : item.description;
            return (
              <div
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
              >
                <div className="w-full h-[182px] bg-black rounded-md mb-4">
                  <img
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt=""
                  />
                </div>
                <div className="font-semibold mb-1">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {truncatedDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Jump back in</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {jumpData?.slice(0, 4).map((item, index) => {
            const maxLength = 20;
            const truncatedDescription =
              item.description.length > maxLength
                ? item.description.slice(0, maxLength) + "... and more"
                : item.description;
            return (
              <div
              onClick={() => navigate(`/playlist/${item.id}`)}

                key={index}
                className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
              >
                <div className="w-full h-[182px] bg-black rounded-md mb-4">
                  <img
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt=""
                  />
                </div>
                <div className="font-semibold mb-1">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {truncatedDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">UNIQUELY YOURS:</h2>
          <span className="cursor-pointer hover:underline">See All</span>
        </div>
        <div className="flex flex-wrap gap-8 mt-4">
          {yoursData?.slice(0, 4).map((item, index) => {
            const maxLength = 20;
            const truncatedDescription =
              item.description.length > maxLength
                ? item.description.slice(0, maxLength) + "... and more"
                : item.description;
            return (
              <div
                onClick={() => navigate(`/playlist/${item.id}`)}
                key={index}
                className="bg-[#161838] w-[224px] h-[324px] p-4 rounded-lg"
              >
                <div className="w-full h-[182px] bg-black rounded-md mb-4">
                  <img
                    src={item.images[0]?.url || "https://picsum.photos/400"}
                    alt=""
                  />
                </div>
                <div className="font-semibold mb-1">{item.name}</div>
                <div className="text-sm text-gray-400">
                  {truncatedDescription}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
