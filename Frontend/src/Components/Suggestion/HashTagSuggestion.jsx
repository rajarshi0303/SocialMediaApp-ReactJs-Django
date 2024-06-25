import React from "react";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAtom } from "jotai";
import { HashTagDataAtom } from "../Posts/Post";
import SearchSkull from "../../Components/Skeleton/SearchSkull";

export default function HashTagSuggestion() {
  const navigate = useNavigate();
  const [data, setData] = useAtom(HashTagDataAtom);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/hashtagsuggestion/?page=${currentPage}`,
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

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handleHashtag = (hashtag) => {
    setData(hashtag);
    navigate("/hashtag", { replace: true });
  };
  return (
    <div>
      <BottomNavbar></BottomNavbar>

      <div className="max-w-md mx-auto mb-16">
        <div className="mt-20 rounded-t-2xl bg-white py-6 px-6 text-xl font-semibold">
          Top Tags's Suggested
        </div>

        {loading ? (
          // Show the loading spinner while data is being fetched
          <SearchSkull></SearchSkull>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.hashtag}>
                <div className="bg-white ">
                  <div
                    className="flex px-4 py-3 "
                    onClick={() => handleHashtag(user.hashtag)}
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="rounded-full w-11 h-11"
                        src="public/images/post/Hashtag.jpg"
                        alt="image"
                      />
                    </div>
                    <div className="w-full pl-3 flex items-center">
                      <div className="font-semibold text-gray-700 dark:text-white text-lg mb-1.5">
                        {user.hashtag}
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
