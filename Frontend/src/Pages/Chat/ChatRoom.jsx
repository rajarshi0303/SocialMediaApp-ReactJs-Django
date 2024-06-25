import React from "react";
import axios from "axios";
import ChatSearch from "./ChatSearch";
import { useState, useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import SearchSkull from "../../Components/Skeleton/SearchSkull";
export const chatAtom = atom();

export default function ChatRoom() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useAtom(chatAtom);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/chatroom/?page=${currentPage}`,
        { withCredentials: true }
      );
      console.log(response.data[0]);
      setLoading(false); // Set loading to false after receiving the data
      console.log(response.data);
      const newUsers = response.data.results; // Update the variable name to match the response structure
      const hasMorePages = response.data.has_next;

      if (!hasMorePages) {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setHasNextPage(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      }
      if (users.length === 0) {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      setLoading(false); // Set loading to false after receiving the error
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, hasNextPage]);
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClick = (sender, receiver, room_id, profile_image) => {
    let sender_id = receiver;
    let receiver_id = sender;
    setSelectedUser({ sender_id, receiver_id, room_id, profile_image });
    navigate("/messageroom", { replace: true });
  };

  return (
    <div>
      <ChatSearch></ChatSearch>
      {loading ? (
        // Show the loading spinner while data is being fetched
        <div className="max-w-md mx-auto mb-16">
          <SearchSkull></SearchSkull>
        </div>
      ) : (
        <div className="flex justify-center">
          <a className="w-96 mt-4 block p-3 bg-white rounded-lg shadow ">
            <ul>
              {users.map((friend) => (
                <li key={friend.sender_id}>
                  <div
                    onClick={() =>
                      handleClick(
                        friend.sender_id,
                        friend.receiver_id,
                        friend.room_id,
                        friend.profile_image
                      )
                    }
                    className="flex items-center px-3 pt-2"
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={friend.profile_image}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="px-3 text-lg font-medium text-gray-900 truncate dark:text-white">
                        {friend.username}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              <div>
                {hasNextPage && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      className="bg-slate-200 text-black font-medium rounded-lg text-base px-5 py-2.5 text-center mt-3"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </div>
            </ul>
          </a>
        </div>
      )}
    </div>
  );
}
