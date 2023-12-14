import React from "react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "./shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "./shared/Textwithhover";
import TextInput from "./shared/TextInput";
import CloudinaryUpload from "./shared/CloudinaryUpload";

const LoggedInHome = () => {
  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div className="py-5">
            <IconText
              iconName={"material-symbols:home"}
              displayText={"Home"}
              active
            />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
            <IconText
              iconName={"icomoon-free:books"}
              displayText={"My music"}
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
        <div className="content p-8 pt-0 overflow-auto">
          <div className="text-2xl font-semibold mb-5 text-white mt-8">
            Upload your Music
          </div>
          <div className="w-2/3 flex space-x-3">
            <div className="w-1/2">
              {" "}
              <TextInput
                label="Name"
                labelClassName="text-white"
                placeholder="Name"
              ></TextInput>
            </div>

            <div className="w-1/2">
              {" "}
              <TextInput
                label="Thumbnail"
                labelClassName="text-white"
                placeholder="Thumbnail"
              ></TextInput>
            </div>
          </div>
          <div className="pt-5 ">
            <CloudinaryUpload></CloudinaryUpload>
          </div>
          {/* <TextInput></TextInput> */}
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
