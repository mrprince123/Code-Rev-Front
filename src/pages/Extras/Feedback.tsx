import axios from "axios";
import { Github, Link, Linkedin, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { baseUrl } from "../../App";
import ContactImage from "../../assets/contact team.webp";

const Contact = () => {
  const [purpose, setPurpose] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/feedback/create`;
      const response = await axios.post(
        url,
        { purpose, message },
        { withCredentials: true }
      );
      console.log("Response while Feedback", response);
      toast.success(response.data.message);

      // Clear the form after successful submission
      setPurpose("");
      setMessage("");
    } catch (error: any) {
      console.log("Error while Sending Feedback", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-20 mb-20 px-4 sm:px-0">
      {/* Profile Update Section */}
      <section className="bg-white rounded-lg w-full sm:w-2/3">
        <div className="max-w-4xl p-6 mx-auto">
          <div className="rounded-lg max-w-3xl mx-auto">
            {/* About Code Rev. Header */}
            <h2 className="text-3xl font-semibold text-black mb-4 border-gray-300 pb-2">
              Contact Us.
            </h2>

            <div className="border border-gray-300 bg-gray-50 p-5 rounded-lg mb-10">
              <img
                src={ContactImage}
                alt="Contact Image Team"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Make a Form with these input purpose and feedback input  and submit button */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg max-w-3xl mx-auto mt-10"
          >
            <h2 className="text-2xl font-semibold text-black mb-2 border-gray-500 pb-2">
              Share Your Feedback
            </h2>

            <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg">
              <p className="mb-4 text-gray-700">
                Share your experience using the{" "}
                <span className="font-medium">Code Rev.</span> code-sharing
                platform with us. We'd love to hear your feedback!
              </p>

              {/* Purpose Dropdown */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="purpose"
                >
                  Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  required
                >
                  <option value="" disabled selected>
                    Select a purpose
                  </option>
                  <option value="bug_report">Report a Bug</option>
                  <option value="feature_request">Request a Feature</option>
                  <option value="general_feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Feedback Input */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="feedback"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your feedback here..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Here Add Contact Information */}
      <div className="w-full sm:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">Contact Info.</h2>
        <div className="flex flex-col gap-4 mt-5">
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-2 items-center mb-2">
              <Link className="text-purple-500" />
              Website
            </div>
            <NavLink to="https://www.princesahni.com" target="_blank">
              <p className="text-gray-600 text-sm leading-relaxed">
                https://www.princesahni.com
              </p>
            </NavLink>
          </div>
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-2 items-center mb-2">
              <Mail className="text-purple-500" />
              Email
            </div>
            <NavLink to="princekrdss2018@gmail.com" target="_blank">
              <p className="text-gray-600 text-sm leading-relaxed">
                princekrdss2018@gmail.com
              </p>
            </NavLink>
          </div>
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-2 items-center mb-2">
              <Github className="text-purple-500" />
              Github
            </div>
            <NavLink to="https://github.com/mrprince123" target="_blank">
              <p className="text-gray-600 text-sm leading-relaxed">
                https://github.com/mrprince123
              </p>
            </NavLink>
          </div>
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-2 items-center mb-2">
              <Linkedin className="text-purple-500" />
              LinkedIn
            </div>

            <NavLink
              to="https://www.linkedin.com/in/mrprince123/"
              target="_blank"
            >
              <p className="text-gray-600 text-sm leading-relaxed">
                https://www.linkedin.com/in/mrprince123/
              </p>
            </NavLink>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Contact;
