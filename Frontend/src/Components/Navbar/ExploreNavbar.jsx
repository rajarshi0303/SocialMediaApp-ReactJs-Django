import React from "react";
import { Link } from "react-router-dom";
export default function ExploreNavbar() {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="/public/Images/logos/logo1.png"
              className="h-16 mr-3"
              alt="HeartLink Logo"
            />
          </div>
          <div className="flex items-center">
            <Link to="/login">
              <span className="text-lg px-4 font-semibold text-teal-600">
                Login
              </span>
            </Link>
            <Link to="/signup">
              <span className="text-lg pr-3 font-semibold  text-gray-500 hover:text-teal-600">
                SignUp
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
