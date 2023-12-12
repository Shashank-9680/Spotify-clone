import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./componenets/Login";
import SignUp from "./componenets/SignUp";
import Home from "./componenets/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Shashank</div>,
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
    path: "/home",
    element: <Home></Home>,
  },
]);
function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
