import React, { useState, useContext, useEffect } from "react";
import { Howl, Howler } from "howler";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import LoggedInContainer from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];

const spotifyPlaylistsCardData = [
  {
    title: "This is one",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
];
const LoggedInHome = () => {
  const [songData, setSongData] = useState([]);
  const { userinfo, setUserInfo } = useContext(songContext);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/allsongs");
     
      setSongData(response.data);
    };

    getData();
  }, []);
  return (
    <LoggedInContainer currentActiveScreen={"home"}>
      <PlaylistView titleText="Focus" cardsData={songData} />
    </LoggedInContainer>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <>
      <div className="text-white text-xl pt-8 font-semibold">{titleText}</div>
      <div className="py-5 grid gap-5 grid-cols-5">
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
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
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
