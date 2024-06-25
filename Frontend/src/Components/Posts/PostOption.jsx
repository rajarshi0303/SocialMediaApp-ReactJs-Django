import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { atom, useAtom } from "jotai";

export const PostDataAtom = atom();

export default function PostOption(props) {
  const [data, setData] = useAtom(PostDataAtom);

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getPostData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8000/postdata/", {
        withCredentials: true,
        params: {
          post_id: props.id,
        },
      });
      console.log(response.data);
      setData(response.data);
      navigate("/editpost", { replace: true });
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/deleteposts/",
        { post_id: props.id },
        { withCredentials: true }
      );
      navigate("/postdeleted", { replace: true });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white w-96 relative flex justify-end lg:w-[32rem]">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="mt-10 w-32 absolute right-0 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
            <ul className="py-2">
              <li>
                <button
                  onClick={getPostData}
                  className="block px-6 py-2 text-base font-bold text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </button>
              </li>
              <li>
                <button
                  onClick={handleClick}
                  className="mt-3 block px-6 py-2 text-base font-bold text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
