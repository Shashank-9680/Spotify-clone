import { createContext } from "react";

const songContext = createContext({
  currentSong: null,
  progress: null,
  setProgress: () => {},
  setCurrentSong: (currentSong) => {},
  soundPlayed: null,
  setSoundPlayed: () => {},
  userinfo: null,
  setUserInfo: () => {},
  isPaused: null,
  setIsPaused: () => {},
  color: null,
  setColor: () => {},
});

export default songContext;
