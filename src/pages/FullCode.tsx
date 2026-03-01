import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import {
  ThumbsUp,
  Trash,
  Edit,
  MessageCircle,
  Calendar,
  Pencil,
  Trash2,
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
import AIReviewCard from "../components/AIReviewCard";
import type { AIReviewResponse } from "../types/AIReview";

interface Code {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  likes: string[];
  reviews: {
    _id: string;
    reviewerId: {
      _id: string | null;
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
  aiResponse: string | AIReviewResponse;
}

interface RecentCode {
  _id: string;
  slug: string;
  title: string;
  description: string;
  language: string;
}

const FullCode = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [codeDetails, setCodeDetails] = useState<Code | null>(null);
  const [comment, setComments] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [toggleComment, setToggleComment] = useState(false);
  const [modelOpenCode, setModelOpenCode] = useState(false);
  const [modelOpenComment, setModelOpenComment] = useState(false);
  const [recentCode, setRecentCode] = useState<RecentCode[]>([]);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null); // Track the selected review ID

  const { user } = useSelector((state: RootState) => state.auth); // Get auth state
  const loggedInUserId = user ? user._id : null;

  const handleDeleteToggle = () => {
    setModelOpenCode((prev) => !prev);
  };

  const handleCommentUpdateToggle = () => {
    setModelOpenComment((prev) => !prev);
  };

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
        { withCredentials: true },
      );

      toast.success(response.data.message);
      // Refresh the code details to show the updated comment
      fetchFullCode();
      setToggleComment(false);
      setComments(""); // Clear the comment field
      setRating(""); // Clear the rating field
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  // Get Full Details of the Code
  const fetchFullCode = async () => {
    try {
      const response = await axios.get(`${baseUrl}/code/get/${slug}`, {
        withCredentials: true,
      });
      setCodeDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching full code details:", error);
    }
  };

  // Fetch 5 Codes of User to show in the Recent
  const limit = 6;
  const getAllProfileCodes = async () => {
    try {
      const url = `${baseUrl}/code/all/?limit=${limit}`;
      const response = await axios.get(url, { withCredentials: true });
      setRecentCode(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllProfileCodes();
    fetchFullCode();
  }, [slug]);

  if (!codeDetails) {
    return (
      <div className="flex flex-col sm:flex-row  md:flex-row lg:flex-row gap-6 mt-20 mb-20">
        {/* Full Code Shimmer  */}

        <div className="w-full sm:w-2/3 lg:w-2/3 p-4 md:p-4 lg:p-6 rounded-lg shadow-sm bg-white animate-pulse">
          {/* User Information */}
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              <div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
              </div>
            </div>
            <div className="h-6 w-6 bg-gray-300 rounded"></div>
          </div>

          {/* Title and Description */}
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded mt-2"></div>

          {/* Created Date */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
            <div className="h-4 w-4 bg-gray-300 rounded"></div>
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* Language and Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
          </div>

          {/* Code Block */}
          <div className="mt-6 h-40 bg-gray-300 rounded-lg"></div>

          {/* Like & Comments Count */}
          <div className="flex items-center justify-between mt-6 bg-gray-100 p-4 rounded-lg">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>

          {/* AI Reviews */}
          <div className="mt-8">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="mt-4 h-20 bg-gray-300 rounded"></div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <div className="h-6 w-32 bg-gray-300 rounded"></div>
            <div className="mt-4 h-24 bg-gray-300 rounded"></div>
          </div>

          {/* Edit & Delete Buttons */}
          <div className="mt-8 flex justify-end gap-4">
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
            <div className="h-10 w-24 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Recent Code Shimmer  */}
        <div className="w-full sm:w-1/3 lg:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
          <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>

          <div className="flex flex-col gap-4 mt-5">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-5 rounded-lg bg-gray-50 animate-pulse"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-5 bg-purple-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Handle Delete Code
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/code/delete/${slug}`, {
        withCredentials: true,
      });
      // Redirect to codes list
      navigate("/your-code", {
        state: { message: response.data.message, type: response.data.success },
      });
    } catch (error) {
      console.error("Error deleting code:", error);
    }
  };

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

  // Delete the Comment
  const deleteComment = async (id: string) => {
    try {
      const url = `${baseUrl}/review/delete/${id}`;
      const response = await axios.delete(url, { withCredentials: true });
      toast.success(response.data.message);
      fetchFullCode();
    } catch (error) {}
  };

  // Comment Update
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
        { withCredentials: true },
      );

      // Refresh the code details to show the updated comment
      fetchFullCode();
      setModelOpenComment(false); // Close the modal
      setComments(""); // Clear the comment field
      setRating(""); // Clear the rating field
      toast.success(response.data.message);
    } catch (error: any) {
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
      setModelOpenComment(true); // Open the modal
    }
  };

  return (
    <div className="flex flex-col sm:flex-row  md:flex-row lg:flex-row gap-6 mt-20 mb-20">
      {/* Here Show the Full Details of the Codes */}
      <div className="w-full sm:w-2/3 lg:w-2/3 p-4 md:p-4 lg:p-6 rounded-lg shadow-sm bg-white">
        {/* User Information  */}
        <div className="flex justify-between items-center mb-5">
          {/* User Details */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <div className="flex gap-4 items-center">
              <img
                src={codeDetails.authorId?.profilePicture}
                alt="Profile Pic"
                className="h-12 w-12 rounded-full object-cover border border-gray-300"
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
          </div>
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

        <div className="mt-6 bg-gray-100 rounded-lg border border-gray-300 overflow-x-auto">
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
        <AIReviewCard
          aiResponse={codeDetails.aiResponse}
          slug={slug || ""}
          onReviewUpdated={fetchFullCode}
          isAuthor={codeDetails.authorId._id === loggedInUserId}
        />

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
            {codeDetails.reviews.length > 0 ? (
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
                          onClick={() => handleEditClick(review._id)}
                          className="bg-gray-200 rounded-md p-2"
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

                  <p className="mt-3 text-gray-700">{review.comment}</p>
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

        {/* Edit & Delete Code Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            className="flex items-center bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            onClick={() => navigate(`/code-update/${slug}`)}
          >
            <Edit size={18} className="mr-2" />
            Edit Code
          </button>
          <button
            className="flex items-center bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={handleDeleteToggle}
          >
            <Trash size={18} className="mr-2" />
            Delete Code
          </button>
        </div>
      </div>

      {/* Here Show Some Recent Public Codes  */}
      <div className="w-full sm:w-1/3 lg:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">Your Recent Codes</h2>

        <div className="flex flex-col gap-4 mt-5">
          {recentCode.map((item, id) => (
            <NavLink to={`/full-code/${item.slug}`} key={id}>
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

      {/* Delete Code Model  */}
      {modelOpenCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-white rounded-lg p-4 shadow-sm ">
              <div className="flex items-center p-2 justify-between  rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Are you absolutely sure?
                </h3>
                <button
                  onClick={handleDeleteToggle}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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

              <div className=" space-y-4 p-2">
                <p className="text-base leading-relaxed text-gray-500 ">
                  This action cannot be undone. This will permanently delete
                  your code and remove your code data from our servers.
                </p>
              </div>

              <div className="flex items-center  justify-end  p-2 border-gray-200 rounded-b ">
                <button
                  onClick={handleDelete}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Yes
                </button>
                <button
                  onClick={handleDeleteToggle}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Update Modal */}
      {modelOpenComment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-white rounded-lg p-4 shadow-sm ">
              <div className="flex items-center p-2 justify-between rounded-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  Update You Comment
                </h3>
                <button
                  onClick={handleCommentUpdateToggle}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
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

              <div className="flex items-center justify-end p-2 border-gray-200 rounded-b ">
                <button
                  onClick={updateComment}
                  className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Update
                </button>
                <button
                  onClick={handleCommentUpdateToggle}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
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

export default FullCode;
