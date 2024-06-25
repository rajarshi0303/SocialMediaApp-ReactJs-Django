import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import UserSuggestion from "../../Components/Suggestion/UserSuggestion";

const apiUrl = "http://localhost:8000/user_search";

export const friendAtom = atom(null);

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            withCredentials: true,
            params: {
              search: searchQuery,
            },
          });
          setUsers(response.data);
          console.log(response.data);
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

      fetchData();
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (friend_id) => {
    setSelectedUser(friend_id);
    navigate("/user", { replace: true });
  };
  return (
    <div>
      <BottomNavbar></BottomNavbar>

      <div className="mt-4 max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 px-4 rounded-lg shadow-md bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search users"
            className="peer h-full w-full outline-none text-lg font-semibold text-gray-600 pr-2"
          />
        </div>

        <div className="max-w-md mx-auto bg-white">
          <div className="flex gap-4 md:gap-6">
            <div className="mx-auto my-auto ">
              <a
                class="inline-block text-lg font-bold py-3 px-6 text-gray-500 border-b-2 border-gray-500"
                aria-current="page"
              >
                Accounts
              </a>
            </div>
            <div className="mx-auto my-auto ">
              <Link to="/tagsearch">
                <span class="inline-block text-lg font-bold py-3 px-6  text-gray-400">
                  Tags
                </span>
              </Link>
            </div>
          </div>
        </div>

        {users.map((user) => (
          <ul key={user.id}>
            <li>
              <div className="bg-white divide-y divide-gray-100 ">
                <a
                  className="flex px-4 py-3 "
                  onClick={() => handleUserClick(user.id)}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src={user.profile_image}
                      alt="image"
                    />
                  </div>
                  <div className="w-full pl-3 flex items-center">
                    <div className="font-semibold text-gray-700 dark:text-white text-lg mb-1.5">
                      {user.username}
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        ))}
      </div>
      <UserSuggestion></UserSuggestion>
    </div>
  );
}
