import { baseUrl } from "../App";
import axios from "axios";
import { SearchCheck, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
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

interface Code {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  code: string;
  likes: string[];
  language: string;
  status: string;
  visivility: string;
  createdAt: string;
}

const Codes = () => {
  const [codes, setCodes] = useState<Code[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const { user } = useSelector((state: RootState) => state.auth); // Get auth state
  const loggedInUserId = user ? user._id : null;

  // Get the Public Codes
  const getAllPublicCodes = async (page: number) => {
    try {
      const url = `${baseUrl}/code/all/public?page=${page}&limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      console.log("Response of all Codes ", response);
      setCodes(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error while fetching codes:", error);
    }
  };

  useEffect(() => {
    getAllPublicCodes(currentPage);
  }, [currentPage]);

  // Language Selection
  const getLanguageExtension = (language) => {
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
      getAllPublicCodes(currentPage);
    } catch (error) {
      console.log("Error while Liking codes:", error);
      toast.error(error.response.data.message);
    }
  };

  // If the User liked any code then highlight the like icon
  // if loggedIn userId is equal to the userId present in the like model
  // then make it blue

  return (
    <div>
      <h1 className="font-medium text-2xl mb-5 mt-5">Public Codes</h1>

      {/* Title and Button  */}
      <div className="flex justify-end mb-10">
        <button className="bg-black text-white font-medium p-2 rounded-lg text-sm">
          <NavLink to="/submit-code">Add Codes</NavLink>
        </button>
      </div>

      {/* show all codes for Review here  */}
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
                className="border border-gray-300 rounded-lg h-72 overflow-hidden overflow-x-auto"
              />

              {/* Like Count and Like Logo  */}
              <div className="flex justify-between mt-5">
                <button
                  onClick={() => addLikes(item._id)}
                  className="flex items-center gap-2"
                >
                  {item.likes.some((like) => like.userId === loggedInUserId) ? (
                    // <ThumbsUp size={18} color="#690df2" />
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
                </button>
                <button className="bg-black text-white font-medium rounded-lg text-sm p-2">
                  <NavLink to={`/full-code/public/${item._id}`}>
                    View Full
                  </NavLink>
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
              No public code found, click on add codes button to add some code
              for review and make it public.
            </p>
          </div>
        )}
      </div>

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

      {/* Toast Message or Alert  */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Codes;
