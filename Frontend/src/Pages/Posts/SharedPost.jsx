import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "../../Components/Posts/Post";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";

function PrivatePost(props) {
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div class="w-full ">
          <div class="flex flex-col items-center max-w-lg mx-auto text-center">
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              This Post Is Private
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              "You are unauthorized to view this post. Only users followed by
              <span className="font-semibold px-1">{props.username}</span> have
              access to this post. If you want to see this post, please submit a
              request to{" "}
              <span className="font-semibold px-1">{props.username}</span>."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SharedPost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/sharedpost/${postId}`,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Error retrieving post:", error);
        if (error.response && error.response.status === 401) {
          navigate("/pagenotfound", { replace: true });
        }
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div>
      <div className="bg-white ">
        <img
          src="/public/Images/logos/logo1.png"
          className="h-20"
          alt="HeartLink Logo"
        />
      </div>
      {post && post.status === "private" ? (
        <PrivatePost username={post.username}></PrivatePost>
      ) : (
        <div className="mt-10 mb-20">
          <Post
            id={post?.id}
            profile_image={post?.profile_image}
            username={post?.username}
            description={post?.description}
            hashtag={post?.hashtag}
            link={post?.link}
            content_type={post?.content_type}
            content={post?.content}
            rating={post?.rating}
          />
        </div>
      )}
      <BottomNavbar></BottomNavbar>
    </div>
  );
};

export default SharedPost;
