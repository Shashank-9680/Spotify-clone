import React, { useContext } from "react";
import { useSongContext } from "../../contexts/songContext";

const SingleSongCard = ({ info, playSound, duration }) => {
  console.log(info);
  const { currentSong, setCurrentSong } = useContext(useSongContext);
  function formatBSONDate(bsonDate) {
    // Convert the BSON date to a JavaScript Date object
    const date = new Date(bsonDate);

    // Extract the hours and minutes from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the hours and minutes with leading zeros if necessary
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Return the formatted time in HH:MM format
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div
      className="flex  hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm"
      onClick={() => {
        setCurrentSong(info);
      }}
    >
      <div
        className="w-12 h-12 bg-cover bg-center "
        style={{
          backgroundImage: `url(${info.thumbnail})`,
        }}
      ></div>
      <div className="flex w-full">
        <div className="text-white flex justify-center flex-col pl-4 w-5/6">
          <div className="cursor-pointer  "> {info.name}</div>
          <div className="text-xs text-gray-400 cursor-pointer ">
            {info.artist.firstName + " " + info.artist.lastName}
          </div>
        </div>
        <div className="w-1/6 flex items-center justify-center text-gray-400 text-sm">
          <div>{duration ? formatBSONDate(duration) : "03:44"}</div>
          {/* <div className="text-gray-400 text-lg flex items-center justify-center pl-3">
            ...
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
