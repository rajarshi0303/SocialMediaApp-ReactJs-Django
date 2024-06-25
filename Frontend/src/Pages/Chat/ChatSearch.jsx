import React, { useState, useEffect } from "react";
import axios from "axios";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { useNavigate } from "react-router-dom";
import { chatAtom } from "./ChatRoom";
import { useAtom } from "jotai";

const apiUrl = "http://localhost:8000/user_search";

export default function ChatSearch() {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useAtom(chatAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);

  console.log("Chat-search-rerender");

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

  const handleUserClick = async (receiver_id, profile_image) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/createroom/",
        { receiver_id: receiver_id },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      let sender_id = response.data.user_id;
      let room_id = response.data.room_id;
      setSelectedUser({ sender_id, receiver_id, room_id, profile_image });
      navigate("/messageroom", { replace: true });
    } catch (error) {
      console.error("Error setting cookie:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <div>
      <BottomNavbar></BottomNavbar>
      <div className="mt-4 max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-sm focus-within:shadow-lg bg-white overflow-hidden">
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
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          />
        </div>
        {users.map((user) => (
          <ul key={user.id}>
            <li>
              <div className=" bg-white divide-y divide-gray-100">
                <a
                  className="flex px-4 py-3"
                  onClick={() => handleUserClick(user.id, user.profile_image)}
                >
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full w-11 h-11"
                      src={user.profile_image}
                      alt="image"
                    />
                  </div>
                  <div className="w-full pl-3 flex items-center">
                    <div className="font-semibold text-gray-900 dark:text-white text-lg mb-1.5">
                      {user.username}
                    </div>
                  </div>
                </a>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
