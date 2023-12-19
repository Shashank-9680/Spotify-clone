import React, {
  Children,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import { Howl, Howler } from "howler";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../componenets/shared/Icontext";
import { Icon } from "@iconify/react";
import TextWithHover from "../componenets/shared/Textwithhover";
import songContext from "../contexts/songContext";
import AddToPlaylistModal from "../modals/AddtoPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serviceHelpers";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import { Navigate, useNavigate } from "react-router-dom";
const LoggedInContainer = ({ children, currentActiveScreen }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
  const [color, setColor] = useState(songContext);
  const { userinfo, setUserInfo } = useContext(songContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [likedsongs, setlikedSongs] = useState([]);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
  } = useContext(songContext);
  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    } else {
      changeSong(currentSong.track);
    }
  }, [currentSong && currentSong.track]);
  const playSound = () => {
    if (!soundPlayed) {
      return;
    } else {
      soundPlayed.play();
    }
  };
  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };
  const pauseSound = () => {
    soundPlayed.pause();
  };
  const togglePlayPause = () => {
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };
  const { progress, setProgress } = useContext(songContext); // State to track progress of the song

  const progressBar = useRef(null);
  const isSeeking = useRef(false);
  const isPlaying = useRef(false);

  useEffect(() => {
    if (soundPlayed) {
      const updateProgress = () => {
        if (!isSeeking.current && isPlaying.current) {
          const newPosition =
            (soundPlayed.seek() / soundPlayed.duration()) * 100;
          setProgress(newPosition);
        }
        requestAnimationFrame(updateProgress);
      };
      const animationId = requestAnimationFrame(updateProgress);

      return () => cancelAnimationFrame(animationId);
    }
  }, [soundPlayed, isPlaying]);

  useEffect(() => {
    if (!currentSong) {
      // Reset progress when a new song starts playing
      setProgress(0);
    }
  }, [currentSong, soundPlayed]);
  if (soundPlayed) {
    soundPlayed.on("end", () => {
      setProgress(0);
      setIsPaused(true);
    });
  }
  const handleProgressChange = (e) => {
    const newPosition = e.target.value;
    setProgress(newPosition);
    const newTime = (newPosition * soundPlayed.duration()) / 100;
    soundPlayed.seek(newTime);
  };

  const handleSeekMouseDown = () => {
    isSeeking.current = true;
  };

  const handleSeekMouseUp = () => {
    isSeeking.current = false;
  };

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      setAddToPlaylistModalOpen(false);
    }
  };
  const addSongToLikedSongs = async () => {
    const songId = currentSong._id;

    const payload = { songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/likedsongs/create",
      payload
    );
    setlikedSongs(response.songs);
    if (response && response.error === "Song already exists in liked songs") {
      alert("Song already exists in liked songs");
    } else if (response.err) {
      alert("Song is Not Added to Liked Songs");
    } else {
      alert("Song is Added to Liked Songs");
    }
  };
  console.log(likedsongs);
  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/auth/current-artist"
      );
      setUserInfo(response.data);
    };

    getData();
  }, []);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const closetoggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    }
  };
  function deleteCookie(cookieName) {
    const date = new Date();
    date.setTime(date.getTime() - 1);
    document.cookie = `${cookieName}=; expires=${date.toUTCString()}; path=/;`;
  }
  const logoutHandler = async () => {
    const response = await makeAuthenticatedPOSTRequest("/auth/logout");
    if (response && !response.err) {
      deleteCookie("token");
    }
  };

  return (
    <div className="h-full w-full bg-app-black " onClick={closetoggleDropdown}>
      {createPlaylistModalOpen && (
        <CreatePlaylistModal
          closeModal={() => {
            setCreatePlaylistModalOpen(false);
          }}
        />
      )}
      {addToPlaylistModalOpen && (
        <AddToPlaylistModal
          closeModal={() => {
            setAddToPlaylistModalOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      <div className={`${currentSong ? "h-7/8" : "h-full"} w-full flex`}>
        <div className="h-full w-1/6 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify logo" width={125} />
            </div>
            <div className="py-5">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                active={currentActiveScreen === "home"}
                targetLink={"/home"}
              />
              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
                targetLink={"/search"}
                active={currentActiveScreen === "search"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
                targetLink={"/library"}
                active={currentActiveScreen === "library"}
              />
              <IconText
                iconName={"icomoon-free:books"}
                displayText={"My music"}
                targetLink={"/mymusic"}
                active={currentActiveScreen === "mymusic"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setCreatePlaylistModalOpen(true);
                }}
              />
              <IconText
                iconName={"mdi:cards-heart"}
                displayText={"Liked Songs"}
                targetLink={"/likedsongs"}
                active={currentActiveScreen === "likedsongs"}
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

        <div className="h-full w-5/6 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-2/3 flex justify-around items-center">
                <TextWithHover
                  displayText={"All Playlist"}
                  live={true}
                  targetLink={"/allplaylist"}
                  active={currentActiveScreen === "playlist"}
                />
                <TextWithHover displayText={"Support"} />
                <TextWithHover displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-1/3 flex justify-around h-full items-center">
                <TextWithHover
                  displayText={"Upload Song"}
                  active={currentActiveScreen === "uploadsong"}
                  live={true}
                  targetLink={"/uploadsong"}
                />
                <div className="relative">
                  <div
                    className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    {userinfo &&
                      `${userinfo.firstName
                        .charAt(0)
                        .toUpperCase()}${userinfo.lastName
                        .charAt(0)
                        .toUpperCase()}`}
                  </div>
                  {showDropdown && <Dropdown logoutHandler={logoutHandler} />}
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0   overflow-auto">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full  bg-black  bg-opacity-30 text-white flex overflow-hidden">
          <div className="w-1/4 flex items-center ">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbnail"
              className="h-14 w-14 rounded"
            />
            <div className="pl-4">
              {" "}
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center py-1">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mdi:skip-previous-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused
                    ? "ic:baseline-play-circle"
                    : "ic:baseline-pause-circle"
                }
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mdi:skip-next-outline"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            <div className="w-1/3 flex justify-center ">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                onTouchStart={handleSeekMouseDown}
                onTouchEnd={handleSeekMouseUp}
                ref={progressBar}
              />
            </div>
            {/* <div className="w-1/2 flex justify-center items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleProgressChange}
                ref={progressBar}
              />
            </div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            />

            {likedsongs && likedsongs.includes(currentSong.name) ? (
              <Icon
                icon="basil:heart-solid"
                color="red"
                fontSize={25}
                className="text-gray-400 cursor-pointer hover:text-white"
                onClick={() => {
                  addSongToLikedSongs();
                }}
              />
            ) : (
              <Icon
                icon="basil:heart-solid"
                fontSize={25}
                className="text-gray-400 cursor-pointer hover:text-white"
                onClick={() => {
                  addSongToLikedSongs();
                }}
              ></Icon>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;

const Dropdown = ({ logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <div className="absolute bg-black font-semibold right-0 mt-4 w-40 rounded-md shadow-lg z-10">
      <div className="py-1">
        <div
          className="px-4 py-2 text-sm text-white hover:bg-app-black cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          Profile
        </div>
        <div
          className="px-4 py-2 text-sm text-white hover:bg-app-black cursor-pointer"
          onClick={logoutHandler}
        >
          Log Out
        </div>
      </div>
    </div>
  );
};
