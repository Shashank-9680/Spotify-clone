import React from "react";

const PasswordInput = ({ label, placeholder, value, setValue }) => {
  return (
    <div className="textInputDiv flex flex-col space-y-2 w-full ">
      <label for={label} className="font-semibold">
        {label}
      </label>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="p-2 border  border-gray-400 border-solid rounded placeholder-gray-500"
        id={label}
      />
    </div>
  );
};

export default PasswordInput;
