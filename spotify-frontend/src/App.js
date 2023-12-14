import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./componenets/Login";
import SignUp from "./componenets/SignUp";
import Home from "./componenets/Home";
import { Cookies, useCookies } from "react-cookie";
import LoggedInHome from "./componenets/LoggedInHome";
import UploadSong from "./componenets/UploadSong";
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
  return (
    <div className="w-screen h-screen font-poppins">
      {cookie.token ? (
        <RouterProvider router={router1} />
      ) : (
        <RouterProvider router={router2} />
      )}
    </div>
  );
}

export default App;
