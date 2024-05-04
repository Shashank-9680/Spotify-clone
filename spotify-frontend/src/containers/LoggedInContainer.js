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
import { useSongContext } from "../contexts/songContext";
import AddToPlaylistModal from "../modals/AddtoPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serviceHelpers";
import { makeAuthenticatedGETRequest } from "../utils/serviceHelpers";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import MyMusic from "../componenets/MyMusic";
const LoggedInContainer = ({ children, currentActiveScreen, setIsLoading }) => {
  const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
  const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

  const { userinfo, setUserInfo } = useContext(useSongContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const [artistlikedsongs, setartistlikedsongs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [initialSongIndex, setInitialSongIndex] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isCurrentSongLiked,
    setLikedSongs,
    likedSongs,
    setIsCurrentSongLiked,
    isPaused,
    setIsPaused,
    // setIsLikedLoading,
    // isLikedLoading,
    songData,
  } = useContext(useSongContext);
  const firstUpdate = useRef(true);
  console.log(songData);
  console.log(isCurrentSongLiked);
  //liked songs
  // useEffect(() => {
  //   const fetchLikedSongs = async () => {
  //     try {
  //       setIsLikedLoading(true);
  //       if (userinfo && userinfo._id) {
  //         const userId = userinfo._id;
  //         const response = await fetch(`/likedsongs/liked/${userId}`);
  //         const data = await response.json();

  //         setLikedSongs(data);

  //         // Check if the current song is liked
  //         const isLiked = data.some(
  //           (likedSong) => likedSong?.song?._id === currentSong?._id
  //         );
  //         setIsCurrentSongLiked(isLiked);
  //       }
  //       setIsLikedLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setIsLikedLoading(false);
  //     }
  //   };

  //   fetchLikedSongs();
  // }, [userinfo]);
  // console.log(soundPlayed);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (!currentSong) {
      return;
    } else {
      const currentSongIndex = songData.findIndex(
        (song) => song.track === currentSong.track
      );

      if (currentSongIndex !== -1) {
        changeSong(currentSong.track, currentSongIndex);

        setInitialSongIndex(currentSongIndex);
        console.log(initialSongIndex);
      }
    }
  }, [currentSong && currentSong.track]);

  const playSound = () => {
    console.log(soundPlayed);
    if (!soundPlayed) {
      return;
    } else {
      soundPlayed.play();
    }
  };

  const changeSong = (songSrc, initialIndex) => {
    if (soundPlayed) {
      soundPlayed.stop();
      setProgress(0); // Reset progress when changing song
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    const selectedSong = songData[initialIndex];
    setCurrentSong(selectedSong);
    setCurrentSongIndex(initialIndex);
    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    console.log("first");
    if (isPaused) {
      playSound();
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  // State to track progress of the song
  const progressBar = useRef(null);
  const isSeeking = useRef(false);
  const isPlaying = useRef(false);

  useEffect(() => {
    let animationId;

    const updateProgress = () => {
      if (soundPlayed) {
        if (!isSeeking.current && isPlaying.current) {
          const newPosition =
            (soundPlayed.seek() / soundPlayed.duration()) * 100;
          setProgress(newPosition);
        }
        animationId = requestAnimationFrame(updateProgress);
      }
    };

    isPlaying.current = !isPaused; // Update isPlaying flag based on isPaused state
    animationId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [soundPlayed, isPaused, setProgress]);

  if (soundPlayed) {
    soundPlayed.on("end", () => {
      // setProgress(0);
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
  const handlePrevSong = () => {
    let newIndex = currentSongIndex - 1;
    if (newIndex < 0) {
      newIndex = songData.length - 1; // Loop back to the last song
    }
    changeSong(songData[newIndex].track, newIndex);
  };
  const handleNextSong = () => {
    let newIndex = currentSongIndex + 1;
    if (newIndex >= songData.length) {
      newIndex = 0; // Loop back to the initial song
    }
    changeSong(songData[newIndex].track, newIndex);
  };

  // ... (rest of the code remains the same)
  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const payload = { playlistId, songId };
    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      payload
    );
    if (response._id) {
      alert("succesfully added");
      setAddToPlaylistModalOpen(false);
    } else {
      alert("failed");
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/auth/current-artist"
      );
      setUserInfo(response.data);
    };

    getData();
  }, []);

  const handleLikeSong = async () => {
    try {
      const userId = userinfo._id; // Replace with the actual user ID
      const songId = currentSong._id;
      const payload = { userId, songId };

      if (isCurrentSongLiked) {
        // Unlike the song
        const response = await makeAuthenticatedPOSTRequest(
          "/likedsongs/unlike",
          payload
        );

        if (response.error) {
          if (response.error === "Internal server error") {
            alert("failed to like songs");
          } else {
            alert("Error: " + response.error);
          }
        } else {
          const updatedLikedSongs = likedSongs.filter(
            (likedSong) => likedSong.song._id !== songId
          );
          setIsCurrentSongLiked(false);
          setLikedSongs(updatedLikedSongs);
          alert("Unlike the song");
        }
      } else {
        const response = await makeAuthenticatedPOSTRequest(
          "/likedsongs/like",
          payload
        );

        if (response.error) {
          if (response.error === "Internal server error") {
            alert("failed");
          } else {
            alert("Error: " + response.error);
          }
        } else {
          setIsCurrentSongLiked(true);
          const updatedLikedSongs = [...likedSongs, { song: currentSong }];
          setLikedSongs(updatedLikedSongs);
          alert("liked song succesful");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  // const handleSidbar = () => {
  //   setShow();
  // };

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

      <div className={`${currentSong ? "h-7/8" : "h-full"} w-full flex `}>
        {/* {window.innerWidth > 768?} */}
        <div
          className={
            windowWidth > 768
              ? "h-full w-[15rem] bg-black flex flex-col justify-between pb-10"
              : `h-full bg-black overflow-hidden fixed inset-y-0 left-0 z-50 w-[15rem] transition-transform duration-300 transform ${
                  sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`
          }
        >
          <div>
            <div className="flex justify-end p-4 cursor-pointer">
              {windowWidth < 768 ? (
                sidebarOpen ? (
                  <RxCross2 onClick={toggleSidebar} color="white " />
                ) : null
              ) : null}
            </div>
            <div className="logoDiv p-6">
              <Link to="/">
                {" "}
                <img src={spotify_logo} alt="spotify logo" width={125} />
              </Link>
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
            <div className="py-5">
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
                targetLink={`/likedsongs/${userinfo?._id}`}
                active={currentActiveScreen === "likedsongs"}
              />
            </div>
          </div>
          <div className="px-5 mb-4">
            <div className="border border-gray-100 text-white px-4 py-2 rounded-full  flex  items-center justify-center hover:border-white">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold ">English</div>
            </div>
          </div>
        </div>

        <div
          className={
            windowWidth > 768
              ? "h-full w-5/6 bg-app-black overflow-auto"
              : `h-full w-full bg-app-black overflow-auto  ${
                  sidebarOpen ? "ml-1/3 md:ml-1/6" : ""
                }`
          }
        >
          <div className="navbar w-full  bg-black bg-opacity-30 flex items-center p-4">
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2">
                <div
                  onClick={toggleSidebar}
                  className="flex justify-center items-center cursor-pointer"
                >
                  {windowWidth < 768 ? (
                    sidebarOpen ? null : (
                      <RxHamburgerMenu onClick={toggleSidebar} color="white" />
                    )
                  ) : null}
                </div>
                <TextWithHover
                  displayText={"All Playlist"}
                  live={true}
                  targetLink={"/allplaylist"}
                  active={currentActiveScreen === "playlist"}
                />
                {/* <div className="border-r border-white"></div> */}
              </div>
              <div className="flex gap-3">
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
          <div className="content p-8 pt-0 overflow-auto ">{children}</div>
        </div>
      </div>
      {currentSong && (
        <div className="w-full h-1/8 bg-black  bg-opacity-30 static text-white flex overflow-x-hidden">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentSongThumbnail"
              className="h-14 w-14 rounded ml-4"
            />
            <div className="pl-4">
              {" "}
              <div className="text-[0.5rem] sm:text-sm hover:underline cursor-pointer ">
                {currentSong.name}
              </div>
              <div className=" text-[0.5rem] sm:text-xs text-gray-500 hover:underline cursor-pointer">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-center h-full flex-col items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="ph:shuffle-fill"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <div onClick={handlePrevSong}>
                <Icon
                  icon="mdi:skip-previous-outline"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
              </div>
              <div className="" onClick={togglePlayPause}>
                <Icon
                  icon={
                    isPaused
                      ? "ic:baseline-play-circle"
                      : "ic:baseline-pause-circle"
                  }
                  fontSize={50}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
              </div>
              <div onClick={handleNextSong}>
                <Icon
                  icon="mdi:skip-next-outline"
                  fontSize={30}
                  className="cursor-pointer text-gray-500 hover:text-white"
                />
              </div>
              <Icon
                icon="ic:twotone-repeat"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            <div className="w-1/3 flex justify-center pb-2 ">
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
            <div
              onClick={() => {
                setAddToPlaylistModalOpen(true);
              }}
            >
              <Icon
                icon="ic:round-playlist-add"
                fontSize={30}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            <div onClick={handleLikeSong}>
              <Icon
                icon={"basil:heart-solid"}
                color={isCurrentSongLiked ? "red" : "gray"}
                fontSize={25}
                className="cursor-pointer"
              />
            </div>
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
