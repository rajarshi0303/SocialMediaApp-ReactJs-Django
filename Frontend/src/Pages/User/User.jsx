import React, { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { friendAtom } from "../Search/SearchBar";
import { chatAtom } from "../Chat/ChatRoom";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import FeedbackLoading from "../../Components/Status/FeedbackLoading";
import FormatCount from "../../Components/Status/FormatCount";

const FriendPost = lazy(() => import("../../Components/Posts/FriendPost"));

export default function User() {
  const navigate = useNavigate();
  const [friend_id] = useAtom(friendAtom);
  const [selectedUser, setSelectedUser] = useAtom(chatAtom);
  console.log(friend_id);
  const [friend, setFriend] = useState({});

  useEffect(() => {
    if (friend_id == null) {
      navigate("/usersearch", { replace: true });
    }
  }, [friend_id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/friend/", {
          withCredentials: true,
          params: {
            follower_id: friend_id,
          },
        });
        console.log(response.data);
        setFriend(response.data);
      } catch (error) {
        console.error("Error retrieving cookie:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        }
      }
    };

    fetchData();
  }, []);

  // Update the status property
  const updateStatus = (newStatus) => {
    setFriend((prevFriend) => ({
      ...prevFriend,
      status: newStatus,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    updateStatus("following");
    try {
      const response = await axios.post(
        "http://localhost:8000/follow/",
        { follower_id: friend_id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  let button;
  if (friend.status === "follow") {
    button = (
      <a
        onClick={handleClick}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none bg-blue-700 text-white"
      >
        Follow
      </a>
    );
  } else if (friend.status === "following") {
    button = (
      <a class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
        Following
      </a>
    );
  } else if (friend.status === "followback") {
    button = (
      <a
        onClick={handleClick}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none bg-blue-700 text-white"
      >
        Follow Back
      </a>
    );
  }

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
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl bg-white">
        <div className="flex items-center">
          <img
            src="/public/Images/logos/logo1.png"
            className="h-16 ml-3"
            alt="HeartLink Logo"
          />
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto max-w-screen-xl bg-white">
        <img
          className="w-28 h-28 mb-3 rounded-full shadow-xl"
          src={friend.image}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {friend.username}
        </h5>
        <span className="text-base font-medium whitespace-pre-line text-gray-500 dark:text-gray-400">
          {friend.bio}
        </span>
        <div class="flex mt-4 space-x-3 md:mt-6">
          {button}

          <a
            onClick={() => handleUserClick(friend_id, friend.image)}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a>
        </div>

        {friend.status !== "follow" && friend.link && (
          <a href={friend.link}>
            <img
              className="mt-2 h-auto w-10 rounded-lg"
              src="/public/Images/logos/discord.jpg"
              alt="Discord"
            />
          </a>
        )}
      </div>

      <div className="max-w-screen-xl mx-auto  pt-4 px-3 mb-4 pb-4 bg-white">
        <div className="flex gap-4 md:gap-6">
          <div className="mx-auto my-auto">
            <dt className=" text-xl text-center font-semibold">
              <FormatCount count={parseInt(friend.post_count)}></FormatCount>
            </dt>
            <dd className="font-semibold text-gray-500 dark:text-gray-400">
              Posts
            </dd>
          </div>
          <div className="mx-auto my-auto ">
            <dt className="text-xl text-center font-semibold">
              <FormatCount
                count={parseInt(friend.followings_count)}
              ></FormatCount>
            </dt>
            <dd className="font-semibold text-gray-500 dark:text-gray-400">
              Following
            </dd>
          </div>
          <div className="mx-auto my-auto">
            <dt className="text-xl text-center font-semibold">
              <FormatCount
                count={parseInt(friend.followers_count)}
              ></FormatCount>
            </dt>
            <dd className="font-semibold text-gray-500 dark:text-gray-400">
              Followers
            </dd>
          </div>
        </div>
      </div>

      <Suspense fallback={<FeedbackLoading></FeedbackLoading>}>
        <FriendPost friend_id={friend_id}></FriendPost>
      </Suspense>

      <BottomNavbar></BottomNavbar>
    </div>
  );
}
