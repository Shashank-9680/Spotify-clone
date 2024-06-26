import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";

const Library = () => {
  const [myPlaylists, setMyPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylists(response.data);
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <LoggedInContainer currentActiveScreen={"library"}>
      <div className="text-white text-xl pt-8 font-semibold">My Playlists</div>
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="py-5 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {myPlaylists.map((item) => {
            return (
              <Card
                key={JSON.stringify(item)}
                title={item.name}
                description=""
                imgUrl={item.thumbnail}
                playlistId={item._id}
                myPlaylists={myPlaylists}
              />
            );
          })}
        </div>
      )}
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId, myPlaylists }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
      onClick={() => {
        myPlaylists.forEach((item) => {
          if (item.songs.length > 0) {
            navigate("/playlist/" + playlistId);
          }
        });
      }}
    >
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;
