import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  Code,
  Eye,
  GalleryVerticalEnd,
  Highlighter,
  LayoutGrid,
  Text,
} from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
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
import toast, { Toaster } from "react-hot-toast";

interface Code {
  _id: string;
  title: string;
  description: string;
  tags: string;
  code: string;
  language: string;
  status: string;
  visibility: string;
}

const CodeUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [codeData, setCodeData] = useState<Code>({
    _id: "",
    title: "",
    description: "",
    tags: "",
    language: "",
    status: "",
    visibility: "",
    code: "",
  });

  useEffect(() => {
    const fetchFullCode = async () => {
      try {
        const response = await axios.get(`${baseUrl}/code/get/${id}`, {
          withCredentials: true,
        });
        setCodeData(response.data.data);
      } catch (error) {
        console.error("Error fetching full code details:", error);
      }
    };
    fetchFullCode();
  }, [id]);

  // Generic handler for input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setCodeData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Function to Update the Code
  const handleCodeUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/code/update/${id}`;
      const response = await axios.put(url, codeData, {
        withCredentials: true,
      });
      console.log("Response while Update code ", response);
      toast.success(response.data.message);
      navigate("/your-code");
    } catch (error) {
      console.log("Error while Submitting the Code ", error);
      toast.error(error.response.data.message);
    }
  };

  // Reset function
  const handleReset = () => {
    setCodeData({
      _id: "",
      title: "",
      description: "",
      tags: "",
      language: "",
      status: "",
      visibility: "",
      code: "",
    });
  };

  // Language Selection
  const getLanguageExtension = () => {
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
    <div className="flex flex-col lg:flex-row min-h-screen gap-6 mt-20 mb-20">
      {/* Update Code Section */}
      <div className="w-full lg:w-2/3 mx-auto bg-white border border-gray-200 rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col items-start space-y-2">
          <NavLink
            to="/"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-200">
              <GalleryVerticalEnd className="size-6 text-gray-700" />
            </div>
            <span className="sr-only">Code Rev</span>
          </NavLink>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome to Code Rev
          </h1>
          <p className="text-center text-gray-600">
            Update your code for review
          </p>
        </div>

        <form onSubmit={handleCodeUpdate} className="space-y-6">
          {/* Title */}
          <div className="grid gap-2">
            <label htmlFor="title" className="font-medium text-gray-700">
              Title
            </label>
            <input
              value={codeData.title}
              onChange={handleChange}
              id="title"
              type="text"
              placeholder="Enter code title"
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* Tags */}
          <div className="grid gap-2">
            <label htmlFor="tags" className="font-medium text-gray-700">
              Tags
            </label>
            <select
              value={codeData.tags}
              onChange={handleChange}
              id="tags"
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Tag</option>
              <option value="bugfix">Bug Fix</option>
              <option value="sorting">Sorting</option>
              <option value="algorithm">Algorithm</option>
              <option value="optimization">Optimization</option>
            </select>
          </div>

          {/* Language */}
          <div className="grid gap-2">
            <label htmlFor="language" className="font-medium text-gray-700">
              Programming Language
            </label>
            <select
              value={codeData.language}
              onChange={handleChange}
              id="language"
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Code Language</option>
              <option value="Javascript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="React.js">React.js</option>
              <option value="C Language">C</option>
            </select>
          </div>

          {/* Status */}
          <div className="grid gap-2">
            <label htmlFor="status" className="font-medium text-gray-700">
              Status
            </label>
            <select
              value={codeData.status}
              onChange={handleChange}
              id="status"
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Visibility */}
          <div className="grid gap-2">
            <label htmlFor="visibility" className="font-medium text-gray-700">
              Visibility
            </label>
            <select
              value={codeData.visibility}
              onChange={handleChange}
              id="visibility"
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Select Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="description" className="font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={codeData.description}
              onChange={handleChange}
              id="description"
              placeholder="Briefly describe your code..."
              rows={4}
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
          </div>

          {/* Code Editor */}
          <div className="grid gap-2">
            <label htmlFor="code" className="font-medium text-gray-700">
              Code
            </label>
            <CodeMirror
              value={codeData.code}
              minHeight="400px"
              theme={vscodeLight}
              extensions={[getLanguageExtension()]}
              onChange={(newContent) =>
                setCodeData((prev) => ({ ...prev, code: newContent }))
              }
              className="border border-gray-300 rounded-lg overflow-hidden"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="reset"
              className="bg-gray-200 hover:bg-gray-500 text-black p-2 rounded-lg font-medium"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white p-2 rounded-lg font-medium"
            >
              Update Code
            </button>
          </div>
        </form>
      </div>

      {/* Code Submit: Notes Section */}
      <div className="w-full lg:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">
          Before Code Submit:
        </h2>

        <div className="flex flex-col gap-4 mt-5">
          {/* Note 1 */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Code />
              <h3 className="text-lg font-semibold text-gray-700">
                Code Formatting
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Ensure your code is properly formatted and follows best coding
              practices before submission.
            </p>
          </div>

          {/* Note 2 */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Text />
              <h3 className="text-lg font-semibold text-gray-700">
                Title & Description
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Provide a clear and concise title and description to help
              reviewers understand your submission.
            </p>
          </div>

          {/* Note 3 */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Highlighter />
              <h3 className="text-lg font-semibold text-gray-700">
                Syntax Highlighting
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Select the correct programming language to enable syntax
              highlighting for better readability.
            </p>
          </div>

          {/* Note 4 */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <LayoutGrid />
              <h3 className="text-lg font-semibold text-gray-700">
                Categorization
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Use meaningful tags to categorize your code, making it easier for
              others to find and review.
            </p>
          </div>

          {/* Note 5 */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Eye />
              <h3 className="text-lg font-semibold text-gray-700">
                Visibility Settings
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Set the appropriate visibility option—Public for community
              feedback or Private for personal use.
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CodeUpdate;

// Do two things to Update Code
// 1. Fetch the data of specic code and show in the input box
// 2. Then Run the Update Function

// Get Full Details of the Code
