import React from "react";

const Dropdown = ({ logoutHandler }) => {
  return (
    <div className="absolute bg-black font-semibold right-0 mt-4 w-40 rounded-md shadow-lg z-10">
      <div className="py-1">
        <div
          className="px-4 py-2 text-sm text-white hover:bg-app-black cursor-pointer"
          // Replace with appropriate action
        >
          Profile
        </div>
        <div
          className="px-4 py-2 text-sm text-white hover:bg-app-black cursor-pointer"
          onClick={logoutHandler} // Logout action
        >
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
