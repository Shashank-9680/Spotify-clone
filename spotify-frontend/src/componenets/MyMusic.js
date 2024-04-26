import React, { useContext, useEffect, useState } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import { Howl, Howler } from "howler";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import SingleSongCard from "./shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const { userinfo, setUserInfo } = useContext(songContext);
  const { color, setColor } = useContext(songContext);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");

      setSongData(response.data);
    };

    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"mymusic"}>
      <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
        {" "}
        My Songs
      </div>
      <div className="space-y-3 overflow-auto">
        {songData.map((item) => {
          return (
            <SingleSongCard info={item} playSound={() => {}}></SingleSongCard>
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
