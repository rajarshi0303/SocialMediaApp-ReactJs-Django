import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../Posts/Post";
import PostSkull from "../Skeleton/PostSkull";
import PostAds from "../Posts/PostAds";

export default function VideoExploreComponent() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/videoexplore/?page=${currentPage}`,
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
      fetchAds();
    } catch (error) {
      console.error("Error retrieving cookie:", error);
      setLoading(false); // Set loading to false after receiving the error
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
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

  return (
    <div>
      {loading ? (
        // Show the loading spinner while data is being fetched
        <PostSkull></PostSkull>
      ) : (
        <ul className="mt-6 mb-24">
          {users.map((post) => (
            <li key={post.id}>
              <Post
                id={post.id}
                profile_image={post.profile_image}
                username={post.username}
                user_id={post.user_id}
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
  );
}
