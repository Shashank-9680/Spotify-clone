import React, { useEffect, useState } from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import { Howl, Howler } from "howler";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import SingleSongCard from "./shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
const songData = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1682685796444-acc2f5c1b7b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",

    name: "Curtains",
    artist: "Ed Sherran",
  },
];
const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [soundPlayed, setsoundPlayed] = useState(null);
  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setsoundPlayed(sound);
    sound.play();
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      setSongData(response.data);
    };

    getData();
  }, []);
  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div className="py-5">
            <IconText iconName={"material-symbols:home"} displayText={"Home"} />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
            <IconText
              iconName={"icomoon-free:books"}
              displayText={"My music"}
              active
            />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"mdi:cards-heart"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
            <Icon icon="carbon:earth-europe-africa" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>

      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-2/3 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-1/3 flex justify-around h-full items-center">
              <TextWithHover displayText={"Upload Song"} />
              <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                SA
              </div>
            </div>
          </div>
        </div>
        <div
          className="content p-8 
         overflow-auto"
        >
          <div className="text-white text-xl font-semibold pb-4 pl-2">
            My Songs
          </div>
          <div className="space-y-3 overflow-auto">
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  playSound={playSound}
                ></SingleSongCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMusic;
