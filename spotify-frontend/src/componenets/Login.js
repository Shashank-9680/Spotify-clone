import React from "react";
import { useState, useContext } from "react";
import { Icon } from "@iconify/react";
import TextInput from "./shared/TextInput";
import PasswordInput from "./shared/PasswordInput";

import { Link, useNavigate } from "react-router-dom";
import { makeUnauthenticatedPOSTRequest } from "../utils/serviceHelpers";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const Logindata = async () => {
    const data = { email, password };
    const response = await makeUnauthenticatedPOSTRequest("/auth/login", data);

    if (response && !response.err) {
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("Success");
      navigate("/loggedinhome");
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden ">
      <div className="logo py-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width={150} />
      </div>
      <div className=" sm:w-1/3 py-10 sm:flex sm:flex-col sm:items-center sm:justify-center  px-4 sm:px-0">
        <div className="font-bold mb-2">To continue,log in to Spotify</div>
        <TextInput
          label="Email address or username"
          placeholder="Email address or Username"
          className="my-6"
          value={email}
          setValue={setEmail}
        ></TextInput>
        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        ></PasswordInput>
        <div className=" w-full flex item-centre justify-end my-8">
          <button
            className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              Logindata();
            }}
          >
            Login
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">Don't have an account?</div>
        <div className="border border-gray-500 text-gray-400 font-bold  py-2 md:py-3 w-full rounded-full text-center px-2 ">
          <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
