import React from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import TextInput from "./shared/TextInput";
import CloudinaryUpload from "./shared/CloudinaryUpload";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serviceHelpers";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import songContext from "../contexts/songContext";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();
  const { userinfo, setUserInfo } = useState(songContext);
  const navigate = useNavigate();
  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl, description };
    const response = await makeAuthenticatedPOSTRequest("/song/create", data);
    if (response.err) {
      alert("Could not create song");
      return;
    } else {
      alert("Success");
      navigate("/loggedinhome");
    }
  };
  return (
    <LoggedInContainer currentActiveScreen={"uploadsong"}>
      <div className="text-2xl font-semibold mb-5 text-white mt-8">
        Upload your Music
      </div>
      <div className="w-full flex space-x-3">
        <div className="w-1/3">
          {" "}
          <TextInput
            label="Name"
            labelClassName="text-white"
            placeholder="Name"
            value={name}
            setValue={setName}
          ></TextInput>
        </div>

        <div className="w-1/3">
          {" "}
          <TextInput
            label="Thumbnail"
            labelClassName="text-white"
            placeholder="Thumbnail"
            value={thumbnail}
            setValue={setThumbnail}
          ></TextInput>
        </div>
        <div className="w-1/3">
          <TextInput
            label="Description"
            labelClassName="text-white"
            placeholder="Description"
            value={description}
            setValue={setDescription}
          ></TextInput>
        </div>
      </div>
      <div className="py-5 ">
        {uploadedSongFileName ? (
          <div className="bg-white rounded-full p-3 w-1/3">
            {uploadedSongFileName.substring(0, 35)}...
          </div>
        ) : (
          <CloudinaryUpload
            setUrl={setPlaylistUrl}
            setName={setUploadedSongFileName}
          ></CloudinaryUpload>
        )}
      </div>
      {/* <TextInput></TextInput> */}
      <div className="w-full flex justify-center items-center">
        {" "}
        <div
          className="bg-white w-40 flex items-center justify-center p-4 rounded-full cursor-pointer font-semibold"
          onClick={submitSong}
        >
          Submit Song
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
