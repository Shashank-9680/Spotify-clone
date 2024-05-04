import React, { useState, useEffect, useContext } from "react";
import { useSongContext } from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import { Icon } from "@iconify/react";

const LikedSong = () => {
  // const { isCurrentSongLiked, setIsCurrentSongLiked } = useContext(songContext);
  // const [isLoading, setIsLoading] = useState(true);
  const {
    currentSong,
    setCurrentSong,
    userinfo,
    likedSongs,
    setLikedSongs,
    isLikedSongDataLoading,
    // isLikedLoading,
  } = useContext(useSongContext);

  return (
    <LoggedInContainer currentActiveScreen={"likedsongs"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        My Liked Songs
      </div>
      {isLikedSongDataLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="space-y-3 overflow-auto">
          {console.log(likedSongs)}
          {Array.isArray(likedSongs) && likedSongs.length > 0 ? (
            likedSongs
              .flatMap((likedSong) => likedSong.song)
              .map((song, index) => (
                <div
                  key={song._id}
                  className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
                  onClick={() => {
                    setCurrentSong(song);
                  }}
                >
                  {console.log(currentSong)}
                  <div className="flex w-full">
                    <div
                      className="w-12 h-12 bg-cover bg-center"
                      style={{ backgroundImage: `url(${song.thumbnail})` }}
                    >
                      {" "}
                      {console.log(song)}
                    </div>
                    <div className="flex w-full">
                      <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                        <div className="cursor-pointer ">{song.name}</div>
                        <div className="text-xs text-gray-400 cursor-pointer ">
                          {song.artist.firstName + " " + song.artist.lastName}
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
            <div className="text-gray-400">No liked songs found.</div>
          )}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default LikedSong;
