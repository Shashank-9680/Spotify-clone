import React, { useState, useEffect, useContext } from "react";
import songContext from "../contexts/songContext";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

import { Icon } from "@iconify/react";
const LikedSong = () => {
  const { currentSong, setCurrentSong } = useContext(songContext);
  const [songLikedData, setSongLikedData] = useState([]);

  const { color, setColor } = useContext(songContext);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/likedsongs/get/mylikedsongs"
      );

      setSongLikedData(response.data);

      // console.log(songLikedData);
      setColor(response.data);
    };

    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"likedsongs"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        My Liked Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songLikedData &&
          songLikedData.map((item, index) => (
            <div key={index}>
              {item.songs &&
                item.songs.map((song, index) => (
                  <div
                    key={song._id} // Make sure each child element has a unique key
                    className="flex hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
                    onClick={() => {
                      setCurrentSong(song);
                    }}
                  >
                    <div className="flex w-full ">
                      <div
                        className="w-12 h-12 bg-cover bg-center"
                        style={{
                          backgroundImage: `url(${song.thumbnail})`,
                        }}
                      ></div>
                      <div className="flex w-full">
                        <div className="text-white flex justify-center flex-col pl-4 w-5/6">
                          <div className="cursor-pointer hover:underline">
                            {song.name}
                          </div>
                          <div className="text-xs text-gray-400 cursor-pointer hover:underline">
                            {item.artist.firstName + " " + item.artist.lastName}
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
                ))}
            </div>
          ))}
      </div>
    </LoggedInContainer>
  );
};

export default LikedSong;
