import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [userloggedIn, setUserLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/users/getuser",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserLoggedIn(true);
        setIsLoggedIn(true);
        setUser(response.data.user);
      }
    };
    const checkAdmin = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/users/getadmin",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
        setAdminLoggedIn(true);
        setAdmin(response.data.user);
      }
    };
    checkAdmin();
    checkLoggedIn();
  }, []);

  const handleSignOut = async () => {
    const response = await axios.get("http://localhost:5000/api/users/logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      setIsLoggedIn(false);
      navigate("/");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className=" z-30 p-2 rounded-lg  text-black hover:text-[#bf0000] transition-colors duration-200 focus:outline-none "
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-20 transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="bg-[#dddddd] px-4 py-6 text-white">
          <div className="font-semibold text-lg text-black">{user.firstName ? `${user.firstName +" "+  user.lastName}`: "Admin"}</div>
          <div className="text-sm text-black/90 truncate">
            {user.email}
          </div>
        </div>

        {/* Sidebar Menu */}
        <ul className="py-4">
          {/* <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-3 text-[#bf0000]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Profile
            </a>
          </li> */}
          {/* <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-3 text-[#bf0000]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 3.586L15.414 7A2 2 0 0116 8.586V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Create Ad
            </a>
          </li> */}
          {/* <li>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              <svg
                className="w-5 h-5 mr-3 text-[#bf0000]"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Settings
            </a>
          </li> */}

          {/* Conditional Rendering for Sign Up and Sign In */}
          {!isLoggedIn && (
            <>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <svg
                    className="w-5 h-5 mr-3 text-[#bf0000]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <svg
                    className="w-5 h-5 mr-3 text-[#bf0000]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Sign In
                </a>
              </li>
            </>
          )}

          {/* Conditional Rendering for Sign Out */}
          {isLoggedIn && (
            <li>
              <a
                href="#"
                onClick={handleSignOut}
                className="flex items-center px-4 py-2 text-sm text-[#bf0000] hover:bg-[#6f48e5]/5 font-medium transition-colors duration-150"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Sign Out
              </a>
            </li>
          )}
        </ul>
      </div>

      {/* Overlay to close sidebar when clicking outside */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};


export default UserSidebar;

