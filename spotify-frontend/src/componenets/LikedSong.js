import React, { useState, useEffect, useContext } from "react";
import songContext from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

import { Icon } from "@iconify/react";

const LikedSong = () => {
  const { isCurrentSongLiked, setIsCurrentSongLiked } = useContext(songContext);
  const { currentSong, setCurrentSong, userinfo, likedSongs, setLikedSongs } =
    useContext(songContext);

  // useEffect(() => {
  //   const fetchLikedSongs = async () => {
  //     try {
  //       if (userinfo && userinfo._id) {
  //         const userId = userinfo._id;
  //         const response = await fetch(`/likedsongs/liked/${userId}`);
  //         const data = await response.json();
  //         console.log(data);
  //         setLikedSongs(data);

  //         // Check if the current song is liked
  //         const isLiked = data.some(
  //           (likedSong) => likedSong?.song?._id === currentSong?._id
  //         );
  //         setIsCurrentSongLiked(isLiked);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchLikedSongs();
  // }, [userinfo, currentSong]);

  return (
    <LoggedInContainer currentActiveScreen={"likedsongs"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        My Liked Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {Array.isArray(likedSongs) && likedSongs.length > 0 ? (
          likedSongs.map((item, index) => (
            <div
              key={likedSongs._id}
              className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
              onClick={() => setCurrentSong(item.song)}
            >
              <div className="flex w-full">
                <div
                  className="w-12 h-12 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.song.thumbnail})` }}
                ></div>
                <div className="flex w-full">
                  <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                    <div className="cursor-pointer hover:underline">
                      {item.song.name}
                    </div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                      {item.song.artist.firstName +
                        " " +
                        item.song.artist.lastName}
                    </div>
                  </div>
                  <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
                    <div>
                      <Icon
                        icon="basil:heart-solid"
                        color="red"
                        fontSize={25}
                        className="text-gray-400 cursor-pointer hover:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No liked songs found.</div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default LikedSong;
