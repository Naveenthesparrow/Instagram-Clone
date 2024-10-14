import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserPlus,
  FaPlusSquare,
} from "react-icons/fa";

const MobileNav = ({openModal}) => {

  const SidebarItems = [
    {
      name: "Following",
      link: "/following",
      icons: <FaUserPlus className="text-xl" data-testid="FaUserPlus" />,
    },

    {
      name: "Profile",
      link: `/profile/${localStorage.getItem('username')}`,
      icons: (
        <img
          src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
          alt="Profile"
          className="h-5 w-5"
        />
      ),
    },
  ];
  return (
    <>
      <div>
        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-center gap-px-2">
            <Link
              to="/"
              className="w-full h-auto flex justify-center items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group "
            >
              <FaHome className="text-xl" data-testid="FaHome" />
            </Link>
            <div
              className="w-full h-auto flex justify-center items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group "
              onClick={openModal}
            >
              <FaPlusSquare className="text-xl" data-testid="FaPlusSquare" />
            </div>

            {SidebarItems.map((item) => (
              <Link
                to={item.link}
                key={item.name}
                className="w-full h-auto flex justify-center items-center gap-x-4 p-3 bg-transparent hover:bg-gray-300 rounded-md ease-out duration-500 group "
              >
                {item.icons}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
