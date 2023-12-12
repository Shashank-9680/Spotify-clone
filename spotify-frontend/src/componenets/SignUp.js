import React from "react";
import { Icon } from "@iconify/react";
import TextInput from "./shared/TextInput";
import PasswordInput from "./shared/PasswordInput";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="w-full h-full flex flex-col items-center ">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width={150} />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col">
        <div className="font-bold mb-2 text-2xl">
          Sign Up for free to start Listening
        </div>
        <TextInput
          label="Email address"
          placeholder="Enter your email"
          className="my-6"
        ></TextInput>
        <TextInput
          label="Confirm Email Address "
          placeholder="Enter your email again"
          className="mb-6"
        ></TextInput>
        <PasswordInput
          label="Create Password"
          placeholder="Enter your strong password here"
        ></PasswordInput>
        <TextInput
          label="What should be call you?"
          placeholder="Enter a profile name"
          className="my-6"
        ></TextInput>
        <div className=" w-full flex item-centre justify-center my-8">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full">
            Sign Up
          </button>
        </div>
        <div className="w-full border border-solid border-gray-300"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <div className="border border-gray-500 text-gray-400 font-bold w-full flex items-center justify-center py-4 rounded-full ">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
