import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { NavLink, useNavigate } from "react-router-dom";
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
import toast, { Toaster } from "react-hot-toast";

const CodeSubmit = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [code, setCodes] = useState<string>("");

  // Lanuage Selection
  const getLanguageExtension = () => {
    switch (language) {
      case "Javascript":
        return [javascript()];
      case "Python":
        return [python()];
      case "Java":
        return [java()];
      case "HTML":
        return [html()];
      case "CSS":
        return css();
      case "C Language":
        return [cpp()];
      default:
        return [];
    }
  };

  // Submit the code
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/code/create`;
      const response = await axios.post(
        url,
        { title, description, tags, status, language, visibility, code },
        { withCredentials: true }
      );

      console.log("Response while Added new code ", response);
      toast.success(response.data.message);
      navigate("/your-code");
    } catch (error) {
      console.log("Error while Submitting the Code ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-6 mt-20 mb-20">
      {/* Submit Code Section */}
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
            Submit your code for review
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="grid gap-2">
            <label htmlFor="title" className="font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={tags}
              onChange={(e) => setTags(e.target.value)}
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
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
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
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={code}
              minHeight="400px"
              theme={vscodeLight}
              extensions={[getLanguageExtension()]}
              onChange={(code) => setCodes(code)}
              className="border border-gray-300 rounded-lg overflow-hidden"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="reset"
              className="bg-gray-200 hover:bg-gray-500 text-black p-2 rounded-lg font-medium"
              onClick={() => {
                setTitle("");
                setDescription("");
                setTags("");
                setLanguage("");
                setStatus("");
                setVisibility("");
                setCodes("");
                setCodes("");
              }}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white p-2 rounded-lg font-medium"
            >
              Submit Code
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

export default CodeSubmit;
