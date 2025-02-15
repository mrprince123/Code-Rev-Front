import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { profileUpdate } from "../Redux/AuthSlice";
import toast, { Toaster } from "react-hot-toast";

const UserUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Fetch the Profile Details
  const [name, setName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
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

      console.log("Profile Data ", response);
      try {
      } catch (error) {
        console.log("Error while Getting Profile Details ", error);
      }
    };

    getProfileDetails();
  }, []);

  // Send the Updated Value to the Backend
  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = `${baseUrl}/user/update`;
      const response = await axios.put(
        url,
        { name, email, gender, profilePicture, role, about },
        { withCredentials: true }
      );

      // Dispatch profile update to Redux store
      dispatch(profileUpdate({ user: response.data.data }));
      console.log("Response while Updating ", response);
      toast.success(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.log("Error while Profile Update ", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-20 mb-20 px-4 sm:px-0">
      {/* Profile Update Section */}
      <section className="bg-white rounded-lg w-full sm:w-2/3">
        <div className="max-w-4xl px-4 py-4 sm:px-6 lg:px-8 mx-auto">
          <div className="bg-white rounded-xl p-4 sm:p-7 dark:bg-neutral-800">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                Profile
              </h2>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                Manage your name, password and account settings.
              </p>
            </div>

            <form onSubmit={updateProfile}>
              <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                {/* Profile Photo */}
                <div className="sm:col-span-3">
                  <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                    Profile photo
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <div className="flex items-center gap-5">
                    <img
                      className="inline-block size-16 object-cover rounded-full ring-2 ring-white dark:ring-neutral-900"
                      src={profilePicture}
                      alt="Avatar"
                    />
                    <div className="flex w-full">
                      <input
                        id="af-account-email"
                        type="url"
                        value={profilePicture}
                        onChange={(e) => setProfilePicture(e.target.value)}
                        className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="profilepic/url"
                      />
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
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
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="John Paul"
                  />
                </div>

                {/* Email */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
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
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="maria@site.com"
                  />
                </div>

                {/* Role */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-email"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
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
                    className="py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Marketing Head"
                  />
                </div>

                {/* Gender */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-gender-checkbox"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    Gender
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <div className="sm:flex">
                    <label
                      htmlFor="gender-male"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-gray-500 dark:checked:border-gray-500 dark:focus:ring-offset-gray-800"
                        id="gender-male"
                        checked={gender === "male"}
                      />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                        Male
                      </span>
                    </label>

                    <label
                      htmlFor="gender-female"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-gray-500 dark:checked:border-gray-500 dark:focus:ring-offset-gray-800"
                        id="gender-female"
                        checked={gender === "female"}
                      />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                        Female
                      </span>
                    </label>

                    <label
                      htmlFor="gender-other"
                      className="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        onChange={(e) => setGender(e.target.value)}
                        className="shrink-0 mt-0.5 border-gray-300 rounded-full text-gray-600 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-gray-500 dark:checked:border-gray-500 dark:focus:ring-offset-gray-800"
                        id="gender-other"
                        checked={gender === "other"}
                      />
                      <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">
                        Other
                      </span>
                    </label>
                  </div>
                </div>

                {/* BIO */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="af-account-bio"
                    className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                  >
                    BIO
                  </label>
                </div>
                <div className="sm:col-span-9">
                  <textarea
                    id="af-account-bio"
                    className="py-2 px-3 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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

      {/* Profile Info Section */}
      <div className="w-full sm:w-1/3 p-6 shadow-sm rounded-lg bg-white max-h-max">
        <h2 className="text-2xl font-bold text-gray-800">Profile Info.</h2>
        <div className="flex flex-col gap-4 mt-5">
          <div className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:shadow-md transition-shadow duration-200">
            <p className="text-gray-600 text-sm leading-relaxed">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
              sequi repellendus sint a quos laudantium, rerum necessitatibus
              nulla maxime velit!
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UserUpdate;
