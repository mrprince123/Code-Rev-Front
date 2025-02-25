import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { baseUrl } from "../App";
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
  slug: string;
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
                src={user?.profilePicture}
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
                      <NavLink to={`/full-code/${item.slug}`}>
                        View Full
                      </NavLink>
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
