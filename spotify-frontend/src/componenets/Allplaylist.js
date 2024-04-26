import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useNavigate } from "react-router-dom";

const Allplaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/playlist/allplaylists"
      );

      setPlaylist(response.data);
    };

    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"allplaylist"}>
      <div className="text-white text-xl pt-8 font-semibold">My Playlists</div>
      <div className="py-8 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {playlist.map((item) => {
          return (
            <Card
              key={JSON.stringify(item)}
              title={item.name}
              description=""
              imgUrl={item.thumbnail}
              ownerfirstname={item.owner.firstName}
              ownerlastname={item.owner.lastName}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};
const Card = ({
  title,
  description,
  imgUrl,
  ownerfirstname,
  ownerlastname,
  playlistId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
    >
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md h-40" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">
        {ownerfirstname} {ownerlastname}
      </div>
    </div>
  );
};

export default Allplaylist;
