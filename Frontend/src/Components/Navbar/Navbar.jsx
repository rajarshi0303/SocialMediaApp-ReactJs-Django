import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="/public/Images/logos/logo1.png"
              className="h-16 ml-3"
              alt="HeartLink Logo"
            />
          </div>
          <div className="flex items-center">
            <Link to="/chatroom">
              <span className="block px-4 py-2 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-1 w-9 h-9 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10c0-3.967 3.69-7 8-7 4.31 0 8 3.033 8 7s-3.69 7-8 7a9.165 9.165 0 01-1.504-.123 5.976 5.976 0 01-3.935 1.107.75.75 0 01-.584-1.143 3.478 3.478 0 00.522-1.756C2.979 13.825 2 12.025 2 10z"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
