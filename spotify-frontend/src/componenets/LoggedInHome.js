import React, { useState, useContext, useEffect } from "react";

import LoggedInContainer from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

const LoggedInHome = () => {
  const [songData, setSongData] = useState([]);
  const { userinfo, setUserInfo } = useContext(songContext);

  const { isCurrentSongLiked, setIsCurrentSongLiked } = useContext(songContext);
  const { currentSong, setCurrentSong, likedSongs, setLikedSongs } =
    useContext(songContext);

  // get the LikedSong
  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        if (userinfo && userinfo._id) {
          const userId = userinfo._id;
          const response = await fetch(`/likedsongs/liked/${userId}`);
          const data = await response.json();

          setLikedSongs(data);

          // Check if the current song is liked
          const isLiked = data.some(
            (likedSong) => likedSong?.song?._id === currentSong?._id
          );
          setIsCurrentSongLiked(isLiked);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedSongs();
  }, [userinfo, currentSong]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/allsongs");

      setSongData(response.data);
    };

    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"home"} songData={songData}>
      <PlaylistView titleText="Focus" cardsData={songData} />
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <>
      <div className="text-white text-xl py-8 font-semibold">{titleText}</div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {
          // cardsData will be an array
          cardsData.map((item) => {
            return (
              <Card
                title={item.name}
                description={item.artist.firstName}
                imgUrl={item.thumbnail}
                item={item}
              />
            );
          })
        }
      </div>
    </>
  );
};

const Card = ({ title, description, imgUrl, item }) => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  return (
    <div
      className="bg-black bg-opacity-40 p-4  rounded-lg cursor-pointer"
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
