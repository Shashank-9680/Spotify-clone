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
import songContext from "./contexts/songContext";
const router1 = createBrowserRouter([
  {
    path: "/",
    element: <div>Shashank</div>,
  },

  {
    path: "/loggedinhome",
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
    path: "*",
    element: <Navigate to="/loggedinhome"></Navigate>,
  },
]);
const router2 = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "*",
    element: <Navigate to="/login"></Navigate>,
  },
]);
function App() {
  const [cookie, setCookie] = useCookies(["token"]);
  const [currentSong, setCurrentSong] = useState(null);
  return (
    <div className="w-screen h-screen font-poppins">
      {cookie.token ? (
        <songContext.Provider value={{ currentSong, setCurrentSong }}>
          <RouterProvider router={router1} />
        </songContext.Provider>
      ) : (
        <RouterProvider router={router2} />
      )}
    </div>
  );
}

export default App;
