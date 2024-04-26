import { createContext } from "react";

const songContext = createContext({
  currentSong: null,
  progress: 0,
  setProgress: () => {},
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  userinfo: null,
  setUserInfo: () => {},
  color: false,
  setColor:()=>{},
  isPaused: null,
  setIsPaused: () => {},
  isCurrentSongLiked: null,
  setIsCurrentSongLiked: () => {},
  likedSongs: [],
  setLikedSongs: () => {},
});

export default songContext;
