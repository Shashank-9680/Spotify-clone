import React, { createContext, useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

const useSongContext = createContext();

const SongProvider = ({ children }) => {
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [userinfo, setUserInfo] = useState(null);
  const [isCurrentSongLiked, setIsCurrentSongLiked] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [songData, setSongData] = useState([]);
  const [isSongDataLoading, setIsSongDataLoading] = useState(true);
  const [isLikedSongDataLoading, setIsLikedSongDataLoading] = useState(true);

  //
  useEffect(() => {
    const getData = async () => {
      try {
        setIsSongDataLoading(true);
        const response = await makeAuthenticatedGETRequest(
          "/song/get/allsongs"
        );
        setSongData(response.data);
        setIsSongDataLoading(false);
      } catch (error) {
        console.error("Error fetching song data:", error);
        setIsSongDataLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        setIsLikedSongDataLoading(true);
        if (userinfo && userinfo._id) {
          const userId = userinfo._id;
          const response = await fetch(`/likedsongs/liked/${userId}`);
          const data = await response.json();
          setLikedSongs(data);
          const isLiked =
            data &&
            data.some((likedSong) => likedSong?.song?._id === currentSong?._id);
          setIsCurrentSongLiked(isLiked);
        }
        setIsLikedSongDataLoading(false);
      } catch (error) {
        console.error(error);
        setIsLikedSongDataLoading(false);
      }
    };

    fetchLikedSongs();
  }, [userinfo]);
  console.log(userinfo);
  console.log(isCurrentSongLiked);

  return (
    <useSongContext.Provider
      value={{
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
        currentSong,
        setCurrentSong,
        userinfo,
        setUserInfo,
        isCurrentSongLiked,
        setIsCurrentSongLiked,
        likedSongs,
        setLikedSongs,
        setIsLikedSongDataLoading,
        isLikedSongDataLoading,
        songData,
        setSongData,
        isSongDataLoading,
        setIsSongDataLoading,
      }}
    >
      {children}
    </useSongContext.Provider>
  );
};

export { useSongContext, SongProvider };
