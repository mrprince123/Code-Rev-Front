import axios from "axios";
import { Github, Link, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [purpose, setPurpose] = useState<string>("");
  const [feedback, setFeedBack] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const url = "";
      const response = await axios.post(
        url,
        { purpose, feedback },
        { withCredentials: true }
      );
      console.log("Response while Feedback", response);
      toast.success(response.data.message);
    } catch (error) {
      console.log("Error while Sending Feedback", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-20 mb-20 px-4 sm:px-0">
      {/* Profile Update Section */}
      <section className="bg-white rounded-lg w-full sm:w-2/3">
        <div className="max-w-4xl p-6 mx-auto">
          <div className="bg-white rounded-lg max-w-3xl mx-auto">
            {/* About Me Header */}
            <h2 className="text-3xl font-semibold text-black mb-2 border-gray-500 pb-2">
              About Me
            </h2>

            <div className="border border-gray-300 bg-gray-50 p-4 rounded-lg">
              {/* About Me Description */}
              <p className="text-gray-600 leading-relaxed">
                Hello! I’m{" "}
                <span className="font-bold text-gray-800">
                  Prince Kumar Sahni
                </span>
                , a passionate full-stack developer and tech enthusiast with
                expertise in
                <span className="font-medium text-gray-600">
                  {" "}
                  PHP, JavaScript, React, Next.js,
                </span>{" "}
                and
                <span className="font-medium text-gray-600">
                  {" "}
                  Android development
                </span>
                . I love building innovative digital solutions that enhance user
                experiences and solve real-world problems.
              </p>

              {/* What I Do Section */}
              <div className="mt-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  What I Do
                </h3>

                {/* Web Development */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Web Development –</span> I
                    specialize in building scalable and dynamic web applications
                    using modern technologies like{" "}
                    <span className="text-gray-600 font-medium">
                      React, Next.js, and PHP
                    </span>
                    .
                  </p>
                </div>

                {/* Android Development */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Android Development –</span>{" "}
                    I create feature-rich Android applications, including my
                    cooking recipe app and chat application with video calling
                    using
                    <span className="text-gray-600 font-medium">
                      {" "}
                      Java & Firebase
                    </span>
                    .
                  </p>
                </div>

                {/* Project Management */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Project Management –</span>{" "}
                    I built
                    <span className="text-gray-600 font-medium"> Projex</span>,
                    a project management system that helps users organize and
                    track their projects effectively.
                  </p>
                </div>

                {/* Content Creation */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✍️</span>
                  <p className="text-gray-700">
                    <span className="font-semibold">Content Creator –</span> I
                    actively share my knowledge on
                    <span className="text-gray-600 font-medium">
                      {" "}
                      Sahni Dev Resources
                    </span>
                    , my LinkedIn page dedicated to programming, development
                    resources, and tech insights.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Make a Form with these input purpose and feedback input  and submit button */}
          <form
            onSubmit={handleSubmit}
            method="post"
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
              <Link />
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
              <Mail />
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
              <Github />
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
              <Linkedin />
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
