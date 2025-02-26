import { GalleryVerticalEnd } from "lucide-react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-6 md:p-8 lg:p-10 dark:bg-gray-800 mt-20 border-t border-gray-300">
      <div className="mx-auto max-w-screen-xl text-center flex flex-col items-center">
        {/* Logo and Brand Name */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-medium text-lg md:text-xl hover:text-purple-600"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-5 md:size-6" />
          </div>
          <span>Code Rev.</span>
        </NavLink>

        {/* Description */}
        <p className="mt-3 mb-5 text-gray-500 dark:text-gray-400 text-sm md:text-base max-w-md">
          Code Rev. A platform where you can submit your code and get reviews.
        </p>

        {/* Links Section */}
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm md:text-base text-gray-900 dark:text-white">
          <li>
            <NavLink to="/" className=" hover:text-purple-600">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className=" hover:text-purple-600">
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/privacy" className=" hover:text-purple-600">
              Privacy Policy
            </NavLink>
          </li>
          <li>
            <NavLink to="/feedback" className=" hover:text-purple-600">
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Copyright Text */}
        <span className="mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
          © 2024-2025{" "}
          <a href="#" className="hover:underline">
            Prince Kumar Sahni™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
