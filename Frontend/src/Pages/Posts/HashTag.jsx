import React from "react";
import { useAtom } from "jotai";
import { HashTagDataAtom } from "../../Components/Posts/Post";
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../Components/Posts/Post";
import { useNavigate } from "react-router-dom";
import FeedbackLoading from "../../Components/Status/FeedbackLoading";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import PostSkull from "../../Components/Skeleton/PostSkull";
import PostAds from "../../Components/Posts/PostAds";

export default function HashTag() {
  const [hashtag] = useAtom(HashTagDataAtom);
  console.log(hashtag);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [status, setStatus] = useState();
  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/hashtag/?page=${currentPage}`,
        {
          withCredentials: true,
          params: {
            hashtag: hashtag,
          },
        }
      );
      console.log(response.data[0]);
      setLoading(false); // Set loading to false after receiving the data
      console.log(response.data);
      const newUsers = response.data.results; // Update the variable name to match the response structure
      const hasMorePages = response.data.has_next;
      setStatus(response.data.status);

      if (!hasMorePages) {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setHasNextPage(false);
      } else {
        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      }
      fetchAds();
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      setLoading(false); // Set loading to false after receiving the error
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 400) {
        navigate("/profilepage", { replace: true });
      }
    }
  };

  const fetchAds = async () => {
    try {
      const response = await axios.get("http://localhost:8000/ads/");
      console.log(response.data);
      setAds(response.data);
    } catch (error) {
      console.error("Error retrieving cookie:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, hasNextPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setStatus("unfollow");
    try {
      const response = await axios.post(
        "http://localhost:8000/followhashtag/",
        { hashtag: hashtag },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    setStatus("follow");
    try {
      const response = await axios.post(
        "http://localhost:8000/unfollowhashtag/",
        { hashtag: hashtag },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  let button;
  if (status === "follow") {
    button = (
      <a
        onClick={handleClick}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none bg-blue-700 text-white"
      >
        Follow
      </a>
    );
  } else if (status === "unfollow") {
    button = (
      <a
        onClick={handleUnfollow}
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
      >
        Unfollow
      </a>
    );
  }

  return (
    <div className="mb-24">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl bg-white">
        <div className="flex items-center px-2">
          <img
            src="/public/Images/logos/logo1.png"
            className="h-20 mr-3"
            alt="HeartLink Logo"
          />
        </div>
        <div className="flex items-center"></div>
      </div>

      <div className="flex flex-col items-center mx-auto max-w-screen-xl bg-white">
        <img
          className="mt-5 w-24 h-24 mb-2 rounded-full shadow-xl"
          src="/public/images/Post/Hashtag.jpg"
          alt="Bonnie image"
        />
        <h3 className=" text-3xl font-bold text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {hashtag}
          </span>
        </h3>
        <div class="m-4 flex space-x-3">
          {button}
          <a class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
            Message
          </a>
        </div>
      </div>
      <div class="mt-3">
        {loading ? (
          // Show the loading spinner while data is being fetched
          <PostSkull></PostSkull>
        ) : (
          <ul>
            {users.map((post) => (
              <li key={post.id}>
                <Post
                  id={post.id}
                  profile_image={post.profile_image}
                  username={post.username}
                  description={post.description}
                  hashtag={post.hashtag}
                  link={post.link}
                  content_type={post.content_type}
                  content={post.content}
                  rating={post.rating}
                ></Post>
              </li>
            ))}
            {Object.keys(ads).length > 0 && ( // Check if 'ads' is not empty
              <li>
                <PostAds
                  id={ads.id}
                  brandname={ads.brandname}
                  description={ads.description}
                  link={ads.link}
                  content_type={ads.content_type}
                  content={ads.content}
                />
              </li>
            )}
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
      </div>
      <BottomNavbar></BottomNavbar>
    </div>
  );
}
