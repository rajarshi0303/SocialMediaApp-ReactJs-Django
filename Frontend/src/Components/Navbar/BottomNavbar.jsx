import React from "react";
import { Link } from "react-router-dom";

export default function BottomNavbar() {
  return (
    <div>
      <nav className="bg-gray-50 dark:bg-gray-700 fixed bottom-0 w-full">
        <div className="max-w-screen-xl px-4 mx-auto">
          <div className="flex justify-center">
            <div className="flex items-center lg:order-2">
              <Link to="/home">
                <span className="block px-5 py-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group lg:px-28">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-1 w-8 h-8 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"></path>
                  </svg>
                </span>
              </Link>

              <Link to="/trending">
                <span className="block px-5 py-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group lg:px-28">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-1 w-8 h-8 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </Link>

              <Link to="/addpost">
                <span className="block px-5 py-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group lg:px-28">
                  <svg
                    className="mx-auto mb-1 w-10 h-10 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
                    ></path>
                  </svg>
                </span>
              </Link>

              <Link to="/usersearch">
                <span className="block px-5 py-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group lg:px-28">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-1 w-8 h-8 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    ></path>
                  </svg>
                </span>
              </Link>

              <Link to="/profilepage">
                <span className="block px-5 py-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group lg:px-28">
                  <svg
                    aria-hidden="true"
                    className="mx-auto mb-1 w-9 h-9 text-gray-500 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
