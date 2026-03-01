import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { profileUpdate } from "../Redux/AuthSlice";
import toast, { Toaster } from "react-hot-toast";
import { Briefcase, Camera, Heart, Mail, User } from "lucide-react";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Go Back
  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  // Fetch the Profile Details
  const [name, setName] = useState<string>("");
  // const [profilePicture, setProfilePicture] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<any>(null);
  const [profilePicturePreview, setProfilePicturePreview] =
    useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  useEffect(() => {
    const getProfileDetails = async () => {
      const url = `${baseUrl}/user/get`;

      const response = await axios.get(url, { withCredentials: true });
      setName(response.data.data.name);
      setProfilePicture(response.data.data.profilePicture);
      setEmail(response.data.data.email);
      setRole(response.data.data.role);
      setAbout(response.data.data.about);
      setGender(response.data.data.gender);
    };

    getProfileDetails();
  }, []);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      setProfilePicturePreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  // Send the Updated Value to the Backend
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Append all data to the form
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("about", about);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture); // Only append if a file is selected
    }

    try {
      const url = `${baseUrl}/user/update`;
      const response = await axios.put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // Dispatch profile update to Redux store
      dispatch(profileUpdate({ user: response.data.data }));

      toast.success(response.data.message);
      navigate("/profile");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-20 mb-20 px-4 sm:px-0">
      {/* Profile Update Section */}
      <section className="bg-white rounded-lg w-full sm:w-2/3 max-h-max">
        <div className="max-w-4xl p-2 mx-auto">
          <div className="bg-white rounded-xl p-4 sm:p-7">
            <div className="mb-8">
              <h2 className="text-2xl mb-2 font-bold text-gray-800">Profile</h2>
              <p className="text-sm text-gray-600">
                Manage your name, password and account settings.
              </p>
            </div>

            <form onSubmit={updateProfile}>
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                {/* Profile Photo */}
                <div className="sm:col-span-3">
                  <label className="inline-block text-sm text-gray-800 mt-2.5">
                    Profile photo
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <div className="flex items-center gap-5">
                    <img
                      className="inline-block size-16 object-cover rounded-full ring-2 ring-white"
                      src={profilePicturePreview || `${profilePicture}`}
                      alt="User Profile Image"
                    />
                    <div className="flex w-full">
                      <input
                        id="af-account-email"
                        type="file"
                        onChange={handleFileChange}
                        className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="profilepic/url"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    Full Name
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <input
                    id="af-account-email"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="John Paul"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    Email
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <input
                    id="af-account-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="maria@site.com"
                  />
                </div>

                {/* Role */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    Role
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <input
                    id="af-account-email"
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Marketing Head"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-gender-checkbox"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    Gender
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <label
                      htmlFor="gender-male"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        id="gender-male"
                        checked={gender === "male"}
                      />
                      <span className="text-sm text-gray-500 ms-3">Male</span>
                    </label>

                    <label
                      htmlFor="gender-female"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        id="gender-female"
                        checked={gender === "female"}
                      />
                      <span className="text-sm text-gray-500 ms-3">Female</span>
                    </label>

                    <label
                      htmlFor="gender-other"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                        id="gender-other"
                        checked={gender === "other"}
                      />
                      <span className="text-sm text-gray-500 ms-3">Other</span>
                    </label>
                  </div>
                </div>

                {/* BIO */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-bio"
                    className="inline-block text-sm text-gray-800 mt-2.5"
                  >
                    BIO
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <textarea
                    id="af-account-bio"
                    className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                    rows={8}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Type your message..."
                  ></textarea>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-5 flex justify-end gap-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-black text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Profile Update Guideline Section */}
      <div className="w-full sm:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Information Guidelines
        </h2>

        <div className="flex flex-col gap-4 mt-5">
          {/* Profile Picture */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Camera className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Profile Picture
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Upload a clear, recognizable photo of yourself. Recommended size:
              500x500px. Supported formats: JPG, PNG.
            </p>
          </div>

          {/* Profile Bio */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <User className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Profile Bio
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Write a concise bio (max 150 characters) highlighting your
              expertise, interests, or current focus in development.
            </p>
          </div>

          {/* Email */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Email Address
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Maintain an active, verified email for account security and
              notifications. We never share your email publicly.
            </p>
          </div>

          {/* Role */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Development Role
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Select your primary role (e.g., Frontend Developer, Student, Tech
              Lead) to help personalize your experience.
            </p>
          </div>

          {/* Gender */}
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-700">
                Gender Identity
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Optional field to help us create an inclusive community. Select
              "Prefer not to say" if you'd rather not share.
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UserUpdate;
