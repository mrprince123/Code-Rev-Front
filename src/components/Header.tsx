import { GalleryVerticalEnd } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";
import { RootState } from "../Redux/store"; // Ensure correct store import
import { useState } from "react";
import { baseUrl } from "../App";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  const { user, isAuthenticated } =
    useSelector((state: RootState) => state.auth) || {}; // Prevent null errors

  const userProfilePic: string =
    user?.profilePicture ||
    "https://wallpapers.com/images/hd/placeholder-profile-icon-20tehfawxt5eihco.jpg";

  const handleLogout = async () => {
    try {
      const url = `${baseUrl}/auth/logout`;
      const response = await axios.get(url, {}, { withCredentials: true });
      console.log("Reponse while logout ", response);
      navigate("/");
      toast.success(response.data.message);
      dispatch(logout());
    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error while logout ", error);
    }
  };

  return (
    <header className="p-2 sm:py-2">
      <nav className="bg-white w-full sm:w-2/3 mx-auto rounded-lg border border-gray-200 shadow-sm px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Code Rev.
          </NavLink>
          <div className="flex items-center lg:order-2">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/register"
                  className="text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Get started
                </NavLink>
              </>
            ) : (
              <div className="flex gap-4">
                <NavLink to="/profile">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={userProfilePic}
                    alt="Profile"
                  />
                </NavLink>

                <button
                  onClick={handleLogout}
                  className=" bg-black text-white dark:text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log out
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setMobile(!mobile)}
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              {mobile ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>
          </div>
          <div
            className={`${
              mobile ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 pr-4 pl-3 text-indigo-600 font-semibold border-b-2 border-indigo-600 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-indigo-400 lg:dark:hover:text-indigo-300 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/codes"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 pr-4 pl-3 text-indigo-600 font-semibold border-b-2 border-indigo-600 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-indigo-400 lg:dark:hover:text-indigo-300 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }
                >
                  Codes
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink
                    to="/your-code"
                    className={({ isActive }) =>
                      isActive
                        ? "block py-2 pr-4 pl-3 text-indigo-600 font-semibold border-b-2 border-indigo-600 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-indigo-400 lg:dark:hover:text-indigo-300 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                        : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                    }
                  >
                    Your Codes
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/feedback"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 pr-4 pl-3 text-indigo-600 font-semibold border-b-2 border-indigo-600 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-indigo-700 lg:p-0 dark:text-indigo-400 lg:dark:hover:text-indigo-300 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                      : "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-gray-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 transition-all duration-300"
                  }
                >
                  Feedback
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Toaster position="top-right" reverseOrder={false} />
    </header>
  );
};

export default Header;
