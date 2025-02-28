import { useState } from "react";
import CodeRevTeam from "../../assets/contact team.webp";
import Video from "../../assets/CodeRevVideo.mp4";
import toast, { Toaster } from "react-hot-toast";

const About = () => {
  const [email, setEmail] = useState<string>("");

  const handleUpcomingFeature = () => {
    try {
      toast.success("Thanks for Registering Code Rev Updates");
      setEmail("");
    } catch (error) {
      toast.error("Error whilte Registering Code Rev Updates");
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="py-14 lg:py-24 relative z-0  dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          <h1 className="max-w-2xl mx-auto text-center font-manrope font-bold text-4xl text-gray-900 dark:text-white mb-5 md:text-5xl md:leading-normal">
            Elevate Your Code Quality with{" "}
            <span className="text-indigo-600">Code Rev</span>
          </h1>
          <p className="max-w-sm mx-auto text-center text-base font-normal leading-7 text-gray-700 dark:text-gray-400 mb-9">
            Code Rev empowers developers to write cleaner, more efficient, and
            maintainable code through AI-powered analysis and expert feedback.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
            <div className="img-box">
              <video
                src={Video}
                autoPlay
                loop
                muted
                className="max-lg:mx-auto object-cover rounded-lg "
              />
            </div>
            <div className="lg:pl-[100px] flex items-center">
              <div className="data w-full">
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black dark:text-white mb-9 max-lg:text-center relative">
                  About Code Rev
                </h2>
                <p className="font-normal text-lg leading-8 text-gray-700 dark:text-gray-400 max-lg:text-center max-w-2xl mx-auto">
                  At Code Rev, we believe that great code is the foundation of
                  every successful project. Our platform combines cutting-edge
                  AI technology with expert human reviews to help developers
                  write better code, faster. Whether you're a beginner or a
                  seasoned professional, Code Rev is here to elevate your coding
                  skills and ensure your projects are of the highest quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-14 lg:py-24 relative  dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-9">
            <div className="lg:pr-24 flex items-center">
              <div className="data w-full">
                <img
                  src={CodeRevTeam}
                  alt="Code Rev Mission"
                  className="block lg:hidden mb-9 mx-auto object-cover rounded-lg"
                />
                <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black dark:text-white mb-9 max-lg:text-center">
                  Our Mission
                </h2>
                <p className="font-normal text-lg leading-8 text-gray-700 dark:text-gray-400 max-lg:text-center max-w-2xl mx-auto">
                  Our mission is to make high-quality code accessible to
                  everyone. We aim to bridge the gap between developers and best
                  practices by providing actionable feedback, educational
                  resources, and a supportive community. With Code Rev, you can
                  confidently tackle complex projects and deliver exceptional
                  results.
                </p>
              </div>
            </div>
            <div className="img-box">
              <img
                src={CodeRevTeam}
                alt="Code Rev Mission"
                className="hidden lg:block object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results in Numbers Section */}
      <section className="py-20  dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-manrope text-4xl text-center text-gray-900 dark:text-white font-bold mb-14">
            Our Impact in Numbers
          </h2>
          <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md shadow-gray-100 dark:shadow-gray-700">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  10,000+
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 dark:text-white font-semibold mb-2">
                    Code Reviews
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                    We've conducted over 10,000 code reviews, helping developers
                    improve their skills and projects.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md shadow-gray-100 dark:shadow-gray-700">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  95%
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 dark:text-white font-semibold mb-2">
                    Satisfaction Rate
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                    Our users report a 95% satisfaction rate with the feedback
                    and improvements they receive.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md shadow-gray-100 dark:shadow-gray-700">
              <div className="flex gap-5">
                <div className="font-manrope text-2xl font-bold text-indigo-600">
                  500+
                </div>
                <div className="flex-1">
                  <h4 className="text-xl text-gray-900 dark:text-white font-semibold mb-2">
                    Active Developers
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-5">
                    Join a growing community of 500+ developers who trust Code
                    Rev for their coding needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20  dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-600 rounded-2xl p-8 xl:p-11">
            <h2 className="font-manrope text-4xl text-white text-center font-bold mb-4">
              Stay Updated with Code Rev
            </h2>
            <p className="text-indigo-200 text-center mb-11 max-lg:max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest tips, updates, and
              exclusive offers. Elevate your coding game with Code Rev!
            </p>
            <div className="max-w-md mx-auto lg:bg-transparent lg:border border-gray-300 rounded-3xl max-lg:py-3 lg:rounded-full lg:h-12 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 px-6 bg-transparent rounded-full max-lg:border border-white text-gray-200 max-lg:text-center placeholder:text-gray-100 focus:outline-none flex-1 w-full lg:w-auto lg:py-2 lg:px-6 lg:bg-transparent"
                placeholder="Enter your email.."
              />
              <button
                onClick={handleUpcomingFeature}
                type="submit"
                className="py-2 px-5 text-sm bg-indigo-500 shadow-md rounded-full text-white font-semibold hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default About;
