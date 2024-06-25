import React from "react";
import { atom, useAtom } from "jotai";
import { Link } from "react-router-dom";

export const selectedAtom = atom("dashboard");
export default function AccountSettings() {
  const [selectedOption, setSelectedOption] = useAtom(selectedAtom);

  const onClickSet = (option) => {
    setSelectedOption(option);
  };
  return (
    <div>
      <div className="bg-white">
        <img
          src="/public/Images/logos/logo1.png"
          className="h-20 ml-4"
          alt="HeartLink Logo"
        />
        <ul className="w-screen ">
          <li>
            <Link to="/changeusername">
              <span
                onClick={() => onClickSet("changeusername")}
                className="flex items-center py-4 px-4 text-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="mr-2 w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"></path>
                </svg>{" "}
                Change UserName
              </span>
            </Link>
          </li>
          <li>
            <Link to="/changepassword">
              <span
                onClick={() => onClickSet("changepassword")}
                className="flex items-center py-4 px-4 text-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="mr-2 w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M8 7a5 5 0 113.61 4.804l-1.903 1.903A1 1 0 019 14H8v1a1 1 0 01-1 1H6v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8.196 8.39A5.002 5.002 0 018 7zm5-3a.75.75 0 000 1.5A1.5 1.5 0 0114.5 7 .75.75 0 0016 7a3 3 0 00-3-3z"
                  ></path>
                </svg>{" "}
                Change Password
              </span>
            </Link>
          </li>
          <li>
            <Link to="/changeemail">
              <span
                onClick={() => onClickSet("changeemail")}
                className="flex items-center py-4 px-4 text-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="mr-2 w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
                  <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
                </svg>
                Change Email Address
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
