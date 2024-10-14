import React from "react";
import UserSearch from "../../UserSearch/UserSearch";

const TopNav = ({ openLogoutModal }) => {
  return (
    <div className="w-full h-auto flex items-center justify-center bg-ligh">
      <div className="relative w-full py-2">
        <UserSearch></UserSearch>
      </div>
      <button
        className="bg-red-500 ml-2 px-4 py-2 text-white rounded cursor-pointer hover:bg-red-600"
        onClick={openLogoutModal}
      >
        Logout
      </button>
    </div>
  );
};
export default TopNav;
