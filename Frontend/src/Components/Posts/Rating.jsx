import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { friendAtom } from "../../Pages/Search/SearchBar";
import FeedbackLoading from "../Status/FeedbackLoading";

export default function Rating(props) {
  console.log("rating-rerender");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const ratings = [1, 2, 3, 4, 5];
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    console.log("Hey Fetch() here");
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/viewrating/?page=${currentPage}`,
        {
          withCredentials: true,
          params: {
            post_id: props.id,
          },
        }
      );
      setLoading(false);
      console.log(response.data);
      setSelectedRating(response.data.user);
      const newUsers = response.data.list.results; // Update the variable name to match the response structure
      const hasMorePages = response.data.list.has_next;

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

  const handleRatingClick = async (rating, post_id) => {
    setSelectedRating(rating);
    console.log(rating, post_id);
    try {
      const response = await axios.post(
        "http://localhost:8000/addrating/",
        { rating: rating, post_id: post_id },
        {
          withCredentials: true,
        }
      );
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
    <div class="w-full max-w-full bg-white rounded-2xl">
      <a className="flex items-center px-3 text-base font-bold text-gray-900 rounded-lg">
        <p className="w-full py-2 text-center text-gray-600 border-2 truncate bg-white rounded-2xl shadow-sm shadow-gray-300">
          <div className="flex items-center justify-center space-x-3">
            {ratings.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingClick(rating, props.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={rating <= selectedRating ? "orange" : "currentColor"}
                  className="w-7 h-7 dark:text-orange-600"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </button>
            ))}
          </div>
        </p>
      </a>
      <a class="block mt-4 bg-white  rounded-2xl shadow overflow-y-auto">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <FeedbackLoading></FeedbackLoading>
        ) : (
          <ul>
            {users.map((rating) => (
              <li key={rating.id}>
                <div class="flex items-center px-4 pb-2">
                  <div
                    onClick={() => handleUserClick(rating.user_id)}
                    class="flex-shrink-0"
                  >
                    <img
                      class="w-10 h-10 rounded-full"
                      src={rating.profile_image}
                      alt="Neil image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      onClick={() => handleUserClick(rating.user_id)}
                      class="px-3 text-lg font-medium text-gray-900 truncate dark:text-white"
                    >
                      {rating.username}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-2 text-orange-600">
                      {Array.from({ length: rating.rating }, (_, index) => (
                        <svg
                          key={index}
                          className="mx-auto mb-1 w-6 h-6 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          ></path>
                        </svg>
                      ))}
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
                    className="bg-slate-200 text-black font-medium rounded-lg text-base px-5 py-2.5 text-center mt-3"
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
