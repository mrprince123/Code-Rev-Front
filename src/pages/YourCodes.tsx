import { baseUrl } from "../App";
import axios from "axios";
import { useEffect, useState } from "react";
import { SearchCheck, ThumbsUp } from "lucide-react";
import { NavLink } from "react-router-dom";
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
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import CodeMirror, { EditorState, EditorView } from "@uiw/react-codemirror";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "../Redux/Store";

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

const YourCodes = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 6;

  // Get User ID
  const { user } = useSelector((state: RootState) => state.auth); // Get auth state
  const loggedInUserId = user ? user._id : null;

  // To get all the Codes of the User
  const getAllCodes = async (page: number) => {
    try {
      const url = `${baseUrl}/code/all?page=${page}&limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response ", response);
      setCodes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error while Fetching all the codes  of User ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCodes(currentPage);
  }, [currentPage]);

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

  // Submit Like on the Code
  const addLikes = async (id: string) => {
    try {
      const url = `${baseUrl}/like/add/${id}`;
      const response = await axios.post(url, {}, { withCredentials: true });
      console.log("Response while Liking ", response);
      toast.success(response.data.message);
      getAllCodes(currentPage);
    } catch (error: any) {
      console.log("Error while Liking codes:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      {/* Heading and Button  */}
      <h1 className="font-medium text-2xl mb-5 mt-5">Your Codes</h1>
      <div className="flex justify-end mb-10">
        <button className="bg-black text-white font-medium p-2 rounded-lg text-sm">
          <NavLink to="/submit-code">Add Codes</NavLink>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="shadow-sm rounded-lg p-4 bg-white animate-pulse"
            >
              {/* Title Placeholder */}
              <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2"></div>

              {/* Description Placeholder */}
              <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>

              {/* Language and Tags Placeholder */}
              <div className="flex flex-wrap gap-2 mt-3 mb-3">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                <div className="h-6 bg-gray-200 rounded-full w-14"></div>
              </div>

              {/* CodeMirror Placeholder */}
              <div className="border bg-gray-200 text-sm border-gray-300 rounded-lg h-72 overflow-hidden"></div>

              {/* Like and View Full Button Placeholder */}
              <div className="flex justify-between mt-5">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-8"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Show All the Codes  */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {codes.length > 0 ? (
            codes.map((item, id) => (
              <div key={id} className="shadow-sm rounded-lg p-4 bg-white">
                <div className="">
                  <h2 className="font-medium text-lg">{item.title}</h2>
                  <p className="text-gray-500 mb-2 text-sm">
                    {item.description.substring(0, 50)}...
                  </p>
                  {/* Language and Tags */}
                  <div className="flex flex-wrap gap-2 mt-3 mb-3">
                    <span className="text-xs font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
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

                {/* Instaed of showing the Image Show Code here  */}
                <CodeMirror
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
                  className="border text-sm border-gray-300 rounded-lg h-72 overflow-hidden overflow-x-auto"
                />

                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => addLikes(item._id)}
                    className="flex items-center gap-2"
                  >
                    {" "}
                    {item.likes.some(
                      (like) => like.userId === loggedInUserId
                    ) ? (
                      <ThumbsUp size={18} className="text-purple-600" />
                    ) : (
                      <ThumbsUp size={18} />
                    )}
                    <p className="text-lg">{item.likes.length}</p>
                  </button>
                  <button className="bg-black text-white font-medium rounded-lg text-sm p-2">
                    <NavLink to={`/full-code/${item.slug}`}>View Full</NavLink>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-lg bg-white p-4">
              <div className="flex gap-2 items-center mb-2">
                <SearchCheck size={18} />
                <h3 className="font-medium text-md">No Code Found</h3>
              </div>
              <p className="text-gray-600">
                No Code found with your profile, click on add code button to add
                some code for review
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="flex justify-center space-x-2">
          <li>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>

      {/* Code for Alert  */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default YourCodes;
