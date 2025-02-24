import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  ThumbsUp,
  MessageCircle,
  Calendar,
  Share2,
  Pencil,
  Trash2,
  MessageCircleCode,
  Sparkle,
} from "lucide-react";
import { baseUrl } from "../App";
import CodeMirror, { EditorState } from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
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
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "../Redux/Store";
import ReactMarkdown from "react-markdown";

interface Code {
  _id: string;
  title: string;
  slug: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  likes: string[];
  reviews: {
    _id: string;
    reviewerId: {
      _id: string;
      name: string;
      email: string;
      profilePicture: string;
    };
    comment: string;
    rating: string;
    createdAt: string;
  }[];
  createdAt: string;
  authorId: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
  aiResponse: string;
}

interface RecentCode {
  _id: any;
  title: string;
  description: string;
  language: string;
}

const FullPublicCode = () => {
  const { slug } = useParams();
  const [codeDetails, setCodeDetails] = useState<Code | null>(null);
  const [comment, setComments] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [toggleComment, setToggleComment] = useState(false);
  const [recentCode, setRecentCode] = useState<RecentCode[]>([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null); // Track the selected review ID

  const handleToggleModel = () => {
    setModelOpen((prev) => !prev);
  };

  // Getting the User Id when the user is logged in
  const { user } = useSelector((state: RootState) => state.auth); // Get auth state
  const loggedInUserId = user ? user._id : null;

  // Toggel Comment Button
  const openCommentBox = () => {
    setToggleComment((prev) => !prev);
  };

  // Add Comment
  const handleCommentSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/review/submit/${id}`;
      const response = await axios.post(
        url,
        {
          comment,
          rating,
        },
        { withCredentials: true }
      );

      console.log("Response while Adding Comment ", response);

      toast.success(response.data.message);
      // Refresh the code details to show the updated comment
      fetchFullCode();
      setToggleComment(false);
      setComments(""); // Clear the comment field
      setRating(""); // Clear the rating field
    } catch (error: any) {
      console.log("Error while Added Comment ", error);
      toast.error(error.response.data.message);
    }
  };

  // Get Full Details of the Code
  const fetchFullCode = async () => {
    try {
      const response = await axios.get(`${baseUrl}/code/get/public/${slug}`, {
        withCredentials: true,
      });
      setCodeDetails(response.data.data);
      console.log("Full Code Details ", response);
    } catch (error) {
      console.error("Error fetching full code details:", error);
    }
  };

  // Fetch 5 Codes to show in the Recent
  const limit = 5;
  const getAllPublicCodes = async () => {
    try {
      const url = `${baseUrl}/code/all/public?limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      setRecentCode(response.data.data);
    } catch (error) {
      console.log("Error while fetching codes:", error);
    }
  };

  useEffect(() => {
    fetchFullCode();
    getAllPublicCodes();
  }, [slug]);

  if (!codeDetails) {
    return <div className="text-center text-gray-600 mt-10">Loading...</div>;
  }

  // Language Selection
  const getLanguageExtension = () => {
    switch (codeDetails.language) {
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

  // Share Functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Check out this code snippet: ${codeDetails.title}`,
          text: `View the code snippet here:`,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported on this device.");
    }
  };

  // Delete the Comment
  const deleteComment = async (id: string) => {
    try {
      const url = `${baseUrl}/review/delete/${id}`;
      const response = await axios.delete(url, { withCredentials: true });
      console.log("Response while deleting Comment ", response);
      toast.success(response.data.message);
      fetchFullCode();
    } catch (error: any) {
      console.log("Error while deleting the Comment ", error);
      toast.error(error.response.data.message);
    }
  };

  const updateComment = async () => {
    // Workflow of Comment update
    // 1. When button clicked - open a model
    // 2. show the input to edit in the model
    // 3. click update button hide the model and update the comment

    if (!selectedReviewId) return; // Ensure a review ID is selected

    try {
      const url = `${baseUrl}/review/update/${selectedReviewId}`;
      const response = await axios.put(
        url,
        { comment, rating },
        { withCredentials: true }
      );
      console.log("Response while deleting Comment ", response);

      // Refresh the code details to show the updated comment
      fetchFullCode();
      setModelOpen(false); // Close the modal
      setComments(""); // Clear the comment field
      setRating(""); // Clear the rating field
      toast.success(response.data.message);
      setModelOpen(false);
    } catch (error: any) {
      console.log("Error while deleting the Comment ", error);
      toast.error(error.response.data.message);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (reviewId: string) => {
    const review = codeDetails.reviews.find((r) => r._id === reviewId);
    if (review) {
      setComments(review.comment); // Pre-fill the comment
      setRating(review.rating); // Pre-fill the rating
      setSelectedReviewId(reviewId); // Set the selected review ID
      setModelOpen(true); // Open the modal
    }
  };

  return (
    <div className="flex flex-col sm:flex-row  md:flex-row lg:flex-row gap-6 mt-20 mb-20">
      {/* Here Show the Full Details of the Codes */}
      <div className="w-full sm:w-2/3 lg:w-2/3  p-4 lg:p-6 rounded-lg shadow-sm bg-white max-h-max">
        {/* User Information  */}
        <div className="flex justify-between items-center mb-5">
          {/* User Details */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <img
              className="h-12 w-12 rounded-full object-cover border border-gray-300"
              src={
                codeDetails.authorId?.profilePicture ||
                "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              }
              alt="Author"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {codeDetails.authorId.name}
              </p>
              <p className="text-sm text-gray-600">
                {codeDetails.authorId.email}
              </p>
            </div>
          </div>

          {/* Add Share Functionaility  */}
          <button onClick={handleShare}>
            <Share2 className="text-purple-700" />
          </button>
        </div>

        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-gray-900">
          {codeDetails.title}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">{codeDetails.description}</p>

        {/* Created Date */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
          <Calendar size={18} />
          <span>
            {new Date(codeDetails.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Language and Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs font-medium px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
            {codeDetails.language}
          </span>
          {codeDetails.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-medium px-3 py-1 bg-gray-200 text-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Code Block */}
        <div className="mt-6 bg-gray-100 rounded-lg border border-gray-300 overflow-x-auto min-w-0">
          <CodeMirror
            value={codeDetails.code}
            theme={vscodeDark}
            extensions={[EditorState.readOnly.of(true), getLanguageExtension()]}
            className="border border-gray-300 rounded-lg overflow-hidden overflow-x-auto"
          />
        </div>

        {/* Like & Comments Count */}
        <div className="flex items-center justify-between mt-6 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600">
            <ThumbsUp size={20} />
            <span className="text-lg font-medium">
              {codeDetails.likes.length} Likes
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MessageCircle size={20} />
            <span className="text-lg font-medium">
              {codeDetails.reviews.length} Comments
            </span>
          </div>
        </div>

        {/* AI Reviews  */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-5 text-purple-500">
            <Sparkle />
            <h1 className="text-xl font-medium">AI Reviews</h1>
          </div>

          <div className="flex gap-4 bg-gray-50 rounded-lg p-4 border ">
            <div className="bg-gray-200 p-2 rounded-full max-h-max">
              <MessageCircleCode />
            </div>
            <div className="px-2 overflow-hidden text-gray-600">
              <ReactMarkdown>{codeDetails.aiResponse}</ReactMarkdown>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <button
            onClick={openCommentBox}
            className="bg-black text-white p-2 rounded-lg font-medium"
          >
            Add Comments
          </button>
        </div>

        {toggleComment && (
          <div className="border p-2 rounded-lg mt-5" id="comment">
            <form
              onSubmit={(e) => handleCommentSubmit(e, codeDetails._id)}
              className="space-y-6"
            >
              <div className="grid gap-2">
                <label htmlFor="title" className="font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Add a Comments"
                  required
                  className="p-2 bg-gray-100 border border-gray-300 rounded-lg w-full"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="tags" className="font-medium text-gray-700">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  id="tags"
                  className="p-2 bg-gray-100 border border-gray-300 rounded-lg w-full"
                >
                  <option value="">Select Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-700 text-white p-2 rounded-lg font-medium"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Comments Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="mt-4 space-y-6">
            {codeDetails.reviews?.length > 0 ? (
              codeDetails.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <img
                        src={`${review.reviewerId.profilePicture}`}
                        alt="Profile Pic"
                        className="h-12 w-12 rounded-full object-cover border border-gray-300"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {review.reviewerId.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {review.reviewerId.email}
                        </p>
                      </div>
                    </div>

                    {/* Here show two option edit and delete only on your comment */}
                    {review.reviewerId._id === loggedInUserId && (
                      <div className="flex gap-2">
                        <button
                          className="bg-gray-200 rounded-md p-2"
                          onClick={() => handleEditClick(review._id)}
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          className="bg-gray-200 rounded-md p-2"
                          onClick={() => deleteComment(review._id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-yellow-500 font-medium mt-4">
                    <span className="text-sm">⭐</span>
                    <span className="text-sm">{review.rating}</span>
                  </div>
                  {/* Comment  */}
                  <p className="mt-1 text-gray-700">{review.comment}</p>
                  <span className="text-sm text-gray-500 block mt-2">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Here Show Some Recent Public Codes  */}
      <div className="w-full sm:w-1/3 lg:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">Recent Codes</h2>

        <div className="flex flex-col gap-4 mt-5">
          {recentCode.map((item, id) => (
            <NavLink to={`/full-code/public/${item._id}`} key={id}>
              <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {item.language}
                  </span>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Comment Update Modal */}
      {modelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-white rounded-lg p-4 shadow-sm dark:bg-gray-700">
              <div className="flex items-center p-2 justify-between rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update You Comment
                </h3>
                <button
                  onClick={handleToggleModel}
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
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <label htmlFor="tags" className="font-medium text-gray-700">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      id="tags"
                      className="p-2 bg-gray-100 border border-gray-300 rounded-lg w-full"
                    >
                      <option value="">Select Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>

                  <div className="grid gap-2">
                    <label
                      htmlFor="title"
                      className="font-medium text-gray-700"
                    >
                      Comment
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Add a Comments"
                      required
                      className="p-2 bg-gray-100 border border-gray-300 rounded-lg w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-2 border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={updateComment}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
                <button
                  onClick={handleToggleModel}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default FullPublicCode;
