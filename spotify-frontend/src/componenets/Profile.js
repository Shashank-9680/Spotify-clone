import React, { useContext } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useSongContext } from "../contexts/songContext";

const Profile = () => {
  const { userinfo, setUserInfo } = useContext(useSongContext);

  return (
    <LoggedInContainer>
      <div className="text-white text-xl pt-8 font-semibold">My Profile</div>
      <div className="h-[60vh] flex justify-center items-center">
        <div className="text-white text-6xl font-semibold">
          {userinfo && userinfo.firstName} {userinfo && userinfo.lastName}
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default Profile;
