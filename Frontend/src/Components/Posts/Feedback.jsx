import React from "react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { friendAtom } from "../../Pages/Search/SearchBar";
import FeedbackLoading from "../Status/FeedbackLoading";
import Reply from "./Reply";

export default function Feedback(props) {
  console.log("feedback-rerender");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const feedbackRef = useRef("");
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/viewfeedback/?page=${currentPage}`,
        {
          withCredentials: true,
          params: {
            post_id: props.id,
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
        "http://localhost:8000/addfeedback/",
        { feedback: feedbackRef.current.value, post_id: props.id },
        {
          withCredentials: true,
        }
      );
      feedbackRef.current.value = " ";
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

  const handleClick = async (like, post_id, feedback_id) => {
    const updatedFeedbackList = users.map((feedback) => {
      if (feedback.id === feedback_id) {
        if (like === "like") {
          return {
            ...feedback,
            like_count: feedback.like_count + 1,
          };
        } else if (like === "dislike") {
          return {
            ...feedback,
            dislike_count: feedback.dislike_count + 1,
          };
        }
      }
      return feedback;
    });
    setUsers(updatedFeedbackList);

    try {
      const response = await axios.post(
        "http://localhost:8000/addlike/",
        { like: like, post_id: post_id, feedback_id: feedback_id },
        {
          withCredentials: true,
        }
      );
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

  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (feedbackId) => {
    if (expandedItems.includes(feedbackId)) {
      setExpandedItems(expandedItems.filter((id) => id !== feedbackId));
    } else {
      setExpandedItems([...expandedItems, feedbackId]);
    }
  };

  return (
    <div class="w-full max-w-full bg-white rounded-2xl">
      <form onSubmit={handleSubmit} class="flex px-2">
        <input
          type="text"
          id="simple-search"
          ref={feedbackRef}
          class="rounded-2xl shadow-sm bg-gray-50 border-2 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Give Your Feedback"
          required
        />
        <span class="inline-flex items-center text-sm">
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
        </span>
      </form>

      <a class="block mt-2  bg-white  rounded-2xl shadow overflow-y-auto">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <FeedbackLoading></FeedbackLoading>
        ) : (
          <ul>
            {users.map((feedback) => (
              <li key={feedback.id}>
                <div className="block bg-white">
                  <div className="font-normal text-gray-700 dark:text-gray-400">
                    <div className="flex px-3 py-2">
                      <div
                        onClick={() => handleUserClick(feedback.user_id)}
                        className="flex-shrink-0"
                      >
                        <img
                          className="rounded-full w-11 h-11"
                          src={feedback.profile_image}
                          alt="Joseph image"
                        />
                      </div>
                      <div className="w-full pl-3">
                        <div className=" text-gray-500 text-base mb-1.5 dark:text-gray-400 whitespace-normal ">
                          <span
                            onClick={() => handleUserClick(feedback.user_id)}
                            className="font-bold"
                          >
                            {feedback.username}
                          </span>{" "}
                          <br></br>{" "}
                          <div className="p-2 bg-zinc-50 rounded-lg">
                            {feedback.feedback}
                          </div>
                        </div>
                        <div className="flex">
                          <a className="flex items-center">
                            <span className="text-xs font-thin text-blue-500">
                              {feedback.like_count} Likes
                            </span>
                            <svg
                              onClick={() =>
                                handleClick("like", props.id, feedback.id)
                              }
                              aria-hidden="true"
                              className="ml-3 w-5 h-6 text-gray-500 hover:text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"></path>
                            </svg>
                          </a>
                          <a className="flex items-center ml-4">
                            <span className="text-xs font-thin text-blue-500">
                              {feedback.dislike_count} DisLikes
                            </span>
                            <svg
                              onClick={() =>
                                handleClick("dislike", props.id, feedback.id)
                              }
                              aria-hidden="true"
                              className="ml-3 w-5 h-6 text-gray-500 hover:text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z"></path>
                            </svg>
                          </a>
                          <span
                            onClick={() => toggleExpanded(feedback.id)}
                            className="ml-3 font-semibold text-sm"
                          >
                            Reply
                          </span>
                        </div>
                        {expandedItems.includes(feedback.id) && (
                          <Reply feedbackId={feedback.id} />
                        )}
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
    </div>
  );
}
