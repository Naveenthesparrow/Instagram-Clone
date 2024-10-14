import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaPlusSquare,
  FaSignOutAlt
} from "react-icons/fa";

const LargeNav = ({ openLogoutModal, openModal }) => {

  const SidebarItems = [
    {
      name: "Following",
      link: "/following",
      icons: <FaUserPlus className="text-2xl" />,
    },

    {
      name: "Profile",
      link: `/profile/${localStorage.getItem('username')}`,
      icons: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          alt="Profile"
          className="h-6 w-6"
        />
      ),
    },
  ];
  return (
    <>
      <div className="w-full h-full relative">
        <Link to="/" className="mb-10 px-2 lg:block sm:hidden md:hidden hidden">
          <img
            src="https://kq-storage.s3.ap-south-1.amazonaws.com/logo.png"
            className="w-28 h-auto"
            alt="Instagram Logo"
          />
        </Link>

        <div className="w-full h-auto flex items-center flex-col gap-y-2">
          <Link
            to="/"
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group "
          >
            <FaHome className="text-2xl" />
            <p className="text-lg lg:block md:hidden sm:hidden hidden ">Home</p>
          </Link>
          <div
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group cursor-pointer"
            onClick={openModal}
          >
            <FaPlusSquare className="text-2xl" />
            <p className="text-lg lg:block md:hidden sm:hidden hidden ">
              Create Post
            </p>
          </div>
          {SidebarItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group "
            >
              {item.icons}
              <p className="text-lg lg:block md:hidden sm:hidden hidden ">
                {item.name}
              </p>
            </Link>
          ))}
          <div
            className="w-full h-auto flex items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group cursor-pointer"
            onClick={openLogoutModal}
          >
            <FaSignOutAlt className="text-2xl" />
            <p className="text-lg lg:block md:hidden sm:hidden hidden ">
              Log Out
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LargeNav;
