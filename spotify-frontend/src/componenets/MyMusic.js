import React, { useContext, useEffect, useState } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import { Howl, Howler } from "howler";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import SingleSongCard from "./shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useSongContext } from "../contexts/songContext";

const MyMusic = () => {
  const { songData, setSongData, isSongDataLoading } =
    useContext(useSongContext);

  return (
    <LoggedInContainer currentActiveScreen={"mymusic"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        {" "}
        My Songs{" "}
      </div>
      {isSongDataLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : songData.length === 0 ? (
        <div className="text-gray-400 text-lg">
          No songs made by the artist yet.
        </div>
      ) : (
        <div className="space-y-3 overflow-auto">
          {songData.map((item) => {
            return (
              <SingleSongCard
                key={item._id}
                info={item}
                duration={item.duration}
                playSound={() => {}}
              ></SingleSongCard>
            );
          })}
        </div>
      )}
    </LoggedInContainer>
  );
};

export default MyMusic;
