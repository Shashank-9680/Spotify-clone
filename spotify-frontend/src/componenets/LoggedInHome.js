import React, { useState, useContext, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useSongContext } from "../contexts/songContext";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

const LoggedInHome = () => {
  // const { userinfo, setUserInfo } = useContext(songContext);
  // const { isCurrentSongLiked, setIsCurrentSongLiked } = useContext(songContext);
  const {
    currentSong,
    setCurrentSong,
    likedSongs,
    setLikedSongs,
    songData,
    setSongData,
    isSongDataLoading,
  } = useContext(useSongContext);
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <LoggedInContainer currentActiveScreen={"home"}>
      {isSongDataLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <PlaylistView titleText="Focus" songData={songData} />
      )}
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, songData }) => {
  return (
    <>
      <div className="text-white text-xl py-8 font-semibold">{titleText}</div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {songData.map((item) => {
          return (
            <Card
              key={item._id}
              title={item.name}
              description={item.artist.firstName}
              imgUrl={item.thumbnail}
              item={item}
            />
          );
        })}
      </div>
    </>
  );
};

const Card = ({ title, description, imgUrl, item }) => {
  const { currentSong, setCurrentSong } = useContext(useSongContext);
  return (
    <div
      className="bg-black bg-opacity-40 p-4 rounded-lg cursor-pointer"
      onClick={() => {
        setCurrentSong(item);
      }}
    >
      <div className="pb-4 pt-2 ">
        <img className="w-full h-40 rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInHome;
