import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useState } from "react";
import Login from "./componenets/Login";
import SignUp from "./componenets/SignUp";
import Home from "./componenets/Home";
import { Cookies, useCookies } from "react-cookie";
import LoggedInHome from "./componenets/LoggedInHome";
import UploadSong from "./componenets/UploadSong";
import MyMusic from "./componenets/MyMusic";
import songContext, { SongProvider } from "./contexts/songContext";
import Search from "./componenets/Search";
import Library from "./componenets/Library";
import SinglePlaylistView from "./componenets/SinglePlaylistView";
import LikedSong from "./componenets/LikedSong";
import Allplaylist from "./componenets/Allplaylist";
import Profile from "./componenets/Profile";
const router1 = createBrowserRouter([
  {
    path: "/",
    element: <LoggedInHome></LoggedInHome>,
  },
  {
    path: "/uploadsong",
    element: <UploadSong></UploadSong>,
  },
  {
    path: "/mymusic",
    element: <MyMusic />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/playlist/:playlistId",
    element: <SinglePlaylistView />,
  },
  {
    path: "/likedsongs/:id",
    element: <LikedSong />,
  },
  {
    path: "/allplaylist",
    element: <Allplaylist />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "*",
    element: <Navigate to="/"></Navigate>,
  },
]);
const router2 = createBrowserRouter([
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },

  {
    path: "*",
    element: <Navigate to="/home"></Navigate>,
  },
]);
function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins ">
      {cookie.token ? (
        <SongProvider>
          <RouterProvider router={router1} />
        </SongProvider>
      ) : (
        <RouterProvider router={router2} />
      )}
    </div>
  );
}

export default App;
