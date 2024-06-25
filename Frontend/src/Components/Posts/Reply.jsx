import React from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { friendAtom } from "../../Pages/Search/SearchBar";
import FeedbackLoading from "../Status/FeedbackLoading";

export default function Reply(props) {
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);
  const navigate = useNavigate();
  console.log(props.feedbackId);
  const replyRef = useRef("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/viewreply/?page=${currentPage}`,
        {
          withCredentials: true,
          params: {
            feedback_id: props.feedbackId,
          },
        }
      );
      setLoading(false);
      console.log(response.data);
      const newUsers = response.data.results; // Update the variable name to match the response structure
      const hasMorePages = response.data.has_next;

      if (!hasMorePages) {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setHasNextPage(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      }
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      setLoading(false); // Set loading to false in case of an error
      if (error.response && error.response.status === 400) {
        setHasNextPage(false);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/addreply/",
        { reply: replyRef.current.value, feedback_id: props.feedbackId },
        {
          withCredentials: true,
        }
      );
      replyRef.current.value = " ";
      setHasNextPage(true);
      setCurrentPage(1);
      setUsers([]);
      fetchData();
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

  const handleUserClick = (friend_id) => {
    setSelectedUser(friend_id);
    navigate("/user", { replace: true });
  };

  return (
    <div>
      <a class="block max-w-80  bg-white rounded-lg shadow overflow-y-auto">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <FeedbackLoading></FeedbackLoading>
        ) : (
          <ul>
            {users.map((reply) => (
              <li key={reply.id}>
                <div>
                  <div className="font-normal text-gray-700 dark:text-gray-400">
                    <div className="flex px-3 py-2">
                      <div
                        onClick={() => handleUserClick(reply.user_id)}
                        className="flex-shrink-0"
                      >
                        <img
                          className="rounded-full w-11 h-11"
                          src={reply.profile_image}
                          alt="Joseph image"
                        />
                      </div>
                      <div className="w-full pl-3">
                        <div className="text-gray-500 text-base mb-1.5 dark:text-gray-400 whitespace-normal">
                          <span
                            onClick={() => handleUserClick(reply.user_id)}
                            className="font-bold"
                          >
                            {reply.username}
                          </span>{" "}
                          <br></br>
                          <div className="p-2 bg-zinc-50 rounded-lg">
                            {" "}
                            {reply.reply}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            <div>
              {hasNextPage && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-slate-200 text-black font-medium rounded-lg text-base px-5 py-2.5 text-center mt-3 mb-3"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </ul>
        )}
      </a>
      <form onSubmit={handleSubmit} className="flex items-center ">
        <input
          type="text"
          id="simple-search"
          ref={replyRef}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-sm shadow-gray-300 block p-3"
          placeholder="Give Your Reply"
          required
        />
        <button
          type="submit"
          className="p-3 text-sm font-medium text-white bg-teal-600 rounded-lg "
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
