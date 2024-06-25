import React from "react";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { friendAtom } from "../Search/SearchBar";
import SearchSkull from "../../Components/Skeleton/SearchSkull";
export default function Followings() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/followings/?page=${currentPage}`,
        { withCredentials: true }
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, hasNextPage]);

  const handleUserClick = (friend_id) => {
    setSelectedUser(friend_id);
    navigate("/user", { replace: true });
  };

  const handleUnfollow = async (friend_id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.following_id !== friend_id)
    );

    try {
      const response = await axios.post(
        "http://localhost:8000/unfollow/",
        { follower_id: friend_id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="bg-white py-6 text-xl font-semibold flex justify-center">
        Followings
      </div>
      <BottomNavbar></BottomNavbar>
      <div className="max-w-md mx-auto mb-16">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <div>
            <SearchSkull></SearchSkull>
          </div>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.following_id}>
                <div className="bg-white">
                  <a className="flex px-4 py-3 ">
                    <div
                      onClick={() => handleUserClick(user.following_id)}
                      className="flex-shrink-0"
                    >
                      <img
                        className="rounded-full w-11 h-11"
                        src={
                          user.image
                            ? user.image
                            : "/public/images/ProfilePicture/defaultprofile.png"
                        }
                        alt="image"
                      />
                    </div>
                    <div className="w-full pl-3 flex items-center">
                      <div className="font-semibold text-gray-900 dark:text-white text-lg mb-1.5">
                        {user.username}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleUnfollow(user.following_id)}
                        className="inline-flex items-center px-3 text-lg font-medium text-blue-700 "
                      >
                        UnFollow
                      </button>
                    </div>
                  </a>
                </div>
              </li>
            ))}
            <div>
              {hasNextPage && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="bg-slate-200 text-black font-medium rounded-lg text-base px-5 py-2.5 text-center mt-3 mb-24"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
