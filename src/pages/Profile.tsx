import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { baseUrl, planeBackUrl } from "../App";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { logout } from "../Redux/AuthSlice";
import ReactCodeMirror, {
  EditorState,
  EditorView,
} from "@uiw/react-codemirror";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { cpp } from "@codemirror/lang-cpp";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";

interface Like {
  userId: string;
}

interface Code {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  code: string;
  likes: Like[];
  language: string;
  status: string;
  visivility: string;
}

interface Review {
  _id: string;
  // submissionId: string[];
  submissionId: { _id: string; title: string };
  comment: string;
  rating: string;
}

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth); // Get auth state
  const loggedInUserId = user?._id;

  // Fetch all the codes of Mine
  const [codes, setCodes] = useState<Code[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [modelOpen, setModelOpen] = useState(false);

  const handleDeleteToggle = () => {
    setModelOpen((prev) => !prev);
  };

  // Get all the Code Submited by user
  const getAllCodes = async () => {
    try {
      const url = `${baseUrl}/code/all`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response ", response);
      setCodes(response.data.data);
    } catch (error) {
      console.log("Error while Fetching all the codes  of User ", error);
    }
  };

  // Get all the Reviews by this user
  const getAllReviews = async () => {
    try {
      const url = `${baseUrl}/review/all/`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("Code Reviews ", response);
      setReviews(response.data.data);
    } catch (error: any) {
      console.log("Error while getting all review ", error);
    }
  };

  useEffect(() => {
    getAllCodes();
    getAllReviews();
  }, []);

  // Delete the Profile is Working
  const deleteProfile = async () => {
    try {
      const url = `${baseUrl}/user/delete`;
      const response = await axios.delete(url, { withCredentials: true });
      dispatch(logout()); // Logout out User when the Profile is deleted
      console.log("Response ", response);
    } catch (error) {
      console.log("Error while Deleting User Profile", error);
    }
  };

  // Language Selection
  const getLanguageExtension = (language: string) => {
    switch (language) {
      case "JavaScript":
        return [javascript()];
      case "Python":
        return [python()];
      case "Java":
        return [java()];
      case "HTML":
        return [html()];
      case "CSS":
        return [css()];
      case "C":
      case "C++":
        return [cpp()];
      case "PHP":
        return [php()];
      case "SQL":
        return [sql()];
      case "Markdown":
        return [markdown()];
      case "XML":
        return [xml()];
      case "JSON":
        return [json()];
      case "Rust":
        return [rust()];
      case "Go":
        return [go()];
      default:
        return [];
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        {/* Profile Section */}
        <div className="col-span-1 sm:col-span-3">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src={`${planeBackUrl}${user?.profilePicture}`}
                className="w-32 h-32 bg-gray-300 rounded-full object-cover mb-4 shrink-0"
                alt="Profile"
              />
              <h1 className="text-xl font-bold text-center">{user?.name}</h1>
              <p className="text-gray-700 text-center">{user?.role}</p>
            </div>

            <div className="flex items-center flex-col justify-center gap-2">
              <p className="text-center">{user?.email}</p>
            </div>
            <hr className="my-2 border-t border-gray-300" />

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex justify-center gap-2 mt-2 w-full">
                <button className="bg-gray-200 text-black font-medium px-2 py-1 rounded-lg text-sm">
                  <NavLink to="/profile/update">Update</NavLink>
                </button>
                <button
                  onClick={handleDeleteToggle}
                  className="bg-black text-white font-medium px-2 py-1 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="bg-gray-200 rounded-md text-center text-sm px-2 py-1 text-gray-600">
                Joined :{" "}
                <span>
                  {new Date(user?.joinedAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Submissions Section */}
        <div className="col-span-1 sm:col-span-9">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Code Submit</h2>
              <NavLink
                to="/your-code"
                className="bg-black text-sm text-white rounded-lg font-medium px-2 py-1"
              >
                View All
              </NavLink>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codes.slice(0, 3).map((item, id) => (
                <div key={id} className="border border-gray-300 rounded-lg p-4">
                  <div className="">
                    <h2 className="font-medium text-lg">{item.title}</h2>
                    <p className="text-gray-500 mb-2 text-sm">
                      {item.description.substring(0, 50)}...
                    </p>
                    {/* Language and Tags */}
                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {item.language}
                      </span>
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ReactCodeMirror
                    value={item.code}
                    theme={vscodeLight}
                    height="auto"
                    extensions={[
                      EditorState.readOnly.of(true),
                      getLanguageExtension(item.language),
                      EditorView.lineWrapping,
                    ]}
                    basicSetup={{
                      lineNumbers: false, // Disable line numbers
                      foldGutter: false, // Disable code folding
                    }}
                    className="border border-gray-300 rounded-lg h-72 overflow-hidden overflow-x-auto"
                  />

                  <div className="flex justify-between mt-5">
                    {/* Like Count show  */}
                    <div className="flex items-center gap-2">
                      {" "}
                      {item.likes.some(
                        (like) => like.userId === loggedInUserId
                      ) ? (
                        <svg
                          className="w-6 h-6 text-purple-500 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <ThumbsUp size={18} />
                      )}
                      <p className="text-lg">{item.likes.length}</p>
                    </div>

                    <button className="bg-black text-white font-medium rounded-lg text-sm p-2">
                      <NavLink to={`/full-code/${item._id}`}>View Full</NavLink>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4 mt-10">
              <h2 className="text-xl font-bold">Recent Code Reviews</h2>
              {/* <NavLink
                to="/your-code"
                className="bg-black text-sm text-white rounded-lg font-medium px-2 py-1"
              >
                View All
              </NavLink> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((item, id) => (
                <div
                  key={id}
                  className="border border-gray-300 rounded-lg p-5 shadow-sm hover:shadow-md transition duration-200"
                >
                  {/* Title */}
                  <h2 className="font-semibold text-lg text-gray-800 mb-2">
                    {item.submissionId.title}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-500 font-medium">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm">{item.rating}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-600 mt-2 text-sm">{item.comment}</p>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">About Me</h2>
            <p className="text-gray-700">{user?.about}</p>

            <h2 className="text-xl font-medium mt-6 mb-4">Connect here</h2>

            <div className="flex items-center gap-6">
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit TrendyMinds LinkedIn"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-5"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  ></path>
                </svg>
              </a>
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit TrendyMinds YouTube"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-5"
                >
                  <path
                    fill="currentColor"
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                  ></path>
                </svg>
              </a>
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit TrendyMinds Facebook"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                  className="h-5"
                >
                  <path
                    fill="currentColor"
                    d="m279.14 288 14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                  ></path>
                </svg>
              </a>
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit TrendyMinds Instagram"
                href=""
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-5"
                >
                  <path
                    fill="currentColor"
                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  ></path>
                </svg>
              </a>
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit TrendyMinds Twitter"
                href=""
                target="_blank"
              >
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Delete Modal */}
      {modelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700">
              <div className="flex items-center p-2 justify-between rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Delete Sure ?
                </h3>
                <button
                  onClick={handleDeleteToggle}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="space-y-4 p-2">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your profile? Please click on
                  yes if you want to delete. Otherwise, click no.
                </p>
              </div>

              <div className="flex items-center justify-end p-2 border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={deleteProfile}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Yes
                </button>
                <button
                  onClick={handleDeleteToggle}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
