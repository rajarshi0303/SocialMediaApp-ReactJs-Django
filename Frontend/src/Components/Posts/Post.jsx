import React, { lazy, Suspense } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import FeedbackLoading from "../Status/FeedbackLoading";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { friendAtom } from "../../Pages/Search/SearchBar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Rating = lazy(() => import("./Rating"));
const Feedback = lazy(() => import("./Feedback"));

function Content(props) {
  if (props.content_type === "text") {
    return (
      <div className="block max-w-sm pl-5 pr-4 py-2  lg:max-w-lg">
        <p className="text-xl font-semibold bg-stone-50 px-4 py-2 rounded-xl whitespace-pre-line text-gray-700 dark:text-gray-400">
          {props.content}
        </p>
      </div>
    );
  } else if (props.content_type === "image") {
    return (
      <LazyLoadImage
        className="rounded-2xl px-2 py-2"
        src="/public/images/Signup/post.png"
        alt="Example"
        effect="blur"
      />
    );
  } else if (props.content_type === "video") {
    return (
      <div className="block max-w-sm pt-2 px-2 bg-white lg:max-w-lg">
        <video
          className="rounded-2xl"
          src="/public/Videos/video.mp4"
          muted
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else if (props.content_type === "audio") {
    return (
      <div className="block max-w-sm px-5 py-2 bg-white">
        <audio src="/public/Videos/music.mp3" controls></audio>
      </div>
    );
  }
}

export const HashTagDataAtom = atom();

export default function Post(props) {
  const [selectedUser, setSelectedUser] = useAtom(friendAtom);
  console.log("post-rerender");
  const [data, setData] = useAtom(HashTagDataAtom);
  const navigate = useNavigate();
  const [popUpOpen, setPopUpOpen] = useState(false);

  const propRating = () => {
    setIsDropdownOpen(false);
    setShowTooltip(false);
    setPopUpOpen(!popUpOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setPopUpOpen(false);
    setShowTooltip(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHashtag = (hashtag) => {
    setData(hashtag);
    navigate("/hashtag", { replace: true });
  };

  const [expanded, setExpanded] = useState(false);
  const content = props.description || "";
  const maxChars = 130;

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setIsDropdownOpen(false);
    setPopUpOpen(false);
    setShowTooltip(!showTooltip);
  };

  const [isCopied, setIsCopied] = useState(false);

  const onCopyText = () => {
    setIsCopied(true);
  };

  const handleUserClick = (friend_id) => {
    setSelectedUser(friend_id);
    navigate("/user", { replace: true });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mb-6 w-full max-w-sm bg-white border-2 border-gray-200 rounded-2xl lg:max-w-lg">
        <div className="flex items-center px-4 pt-3 pb-1">
          <div
            onClick={() => handleUserClick(props.user_id)}
            className="flex-shrink-0"
          >
            <img
              className="w-10 h-10 rounded-full"
              src={props.profile_image}
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="px-3 text-lg font-medium text-gray-900 truncate dark:text-white">
              <span onClick={() => handleUserClick(props.user_id)}>
                {props.username}
              </span>
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <div className="flex items-center space-x-2 text-orange-600">
              <svg
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
              <span className="text-xl font-bold">{props.rating}</span>
            </div>
          </div>
        </div>

        {props.description || props.hashtag || props.link ? (
          <div className="block max-w-sm px-4 bg-white lg:max-w-lg">
            <p className="text-base font-medium whitespace-pre-line text-gray-700 dark:text-gray-400">
              {expanded ? content : content.slice(0, maxChars)}
              {content.length > maxChars && !expanded && <span>... </span>}
              {content.length > maxChars && (
                <button onClick={toggleExpanded}>
                  {expanded ? "_Show Less" : "Load More"}
                </button>
              )}
              {props.hashtag && (
                <span
                  onClick={() => handleHashtag(props.hashtag)}
                  className="ml-2 font-medium text-orange-700"
                >
                  {"#" + props.hashtag}
                </span>
              )}
              {props.link && (
                <a href={props.link} className="ml-3 font-medium text-blue-600">
                  visit
                </a>
              )}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col items-center">
          <Content
            content_type={props.content_type}
            content={props.content}
          ></Content>

          <div className="flex ">
            <button
              onClick={propRating}
              className="flex items-center px-4 py-3 text-base font-medium text-gray-600 gap-x-2 lg:px-10 lg:text-lg"
            >
              <svg
                className="mx-auto mb-1 w-6 h-6 text-gray-400"
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

              <span>Rate</span>
            </button>

            <button
              onClick={toggleDropdown}
              className="flex items-center px-4 py-3 text-base font-medium text-gray-600 gap-x-2 lg:px-10 lg:text-lg"
            >
              <svg
                className="mx-auto mb-1 w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                ></path>
              </svg>

              <span>Feedback</span>
            </button>

            <button
              onClick={toggleTooltip}
              className="flex items-center px-4 py-3 text-base font-medium text-gray-600 gap-x-2 lg:px-10 lg:text-lg"
            >
              <svg
                className="mx-auto mb-1 w-6 h-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
              </svg>

              <span>Share</span>
            </button>
          </div>
          {/* Dropdown menu */}
          {popUpOpen && (
            <Suspense fallback={<FeedbackLoading></FeedbackLoading>}>
              <Rating id={props.id} />
            </Suspense>
          )}

          {isDropdownOpen && (
            <Suspense fallback={<FeedbackLoading></FeedbackLoading>}>
              <Feedback id={props.id} />
            </Suspense>
          )}
          {showTooltip && (
            <CopyToClipboard
              text={`http://localhost:5173/sharedpost/${props.id}`}
              onCopy={onCopyText}
            >
              <div>
                <a className="flex items-center py-2 px-4 text-base font-semibold">
                  <svg
                    className="mr-2 w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z"></path>
                    <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z"></path>
                  </svg>{" "}
                  Copy Link
                </a>
                <span className=" flex justify-center">
                  {isCopied ? "Copied!" : ""}
                </span>
              </div>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </div>
  );
}
