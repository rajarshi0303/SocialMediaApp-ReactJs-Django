import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";

function Content(props) {
  if (props.content_type === "text") {
    return (
      <div className="block max-w-sm pl-5 pr-4 py-2  lg:max-w-lg">
        <p className="text-xl font-semibold bg-slate-50 px-4 py-2 rounded-xl whitespace-pre-line text-gray-700 dark:text-gray-400">
          {props.content}
        </p>
      </div>
    );
  } else if (props.content_type === "image") {
    return (
      <LazyLoadImage
        className="rounded-2xl px-2 pt-2 pb-3"
        src="/public/images/Signup/post.png"
        alt="Example"
        effect="blur"
      />
    );
  } else if (props.content_type === "video") {
    return (
      <div className="block max-w-sm py-2 px-2 bg-white lg:max-w-lg">
        <video
          className="rounded-2xl"
          src="/public/Videos/video.mp4"
          autoPlay
          muted
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  } else if (props.content_type === "audio") {
    return (
      <div className="block max-w-sm px-5 pt-2 pb-4 bg-white">
        <audio src="/public/Videos/music.mp3" controls></audio>
      </div>
    );
  }
}

export default function PostAds(props) {
  console.log("post-rerender");
  const [expanded, setExpanded] = useState(false);
  const content = props.description || "";
  const maxChars = 130;

  // Function to toggle the expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleRatingClick = async (ads_id) => {
    console.log(ads_id);
    try {
      const response = await axios.post("http://localhost:8000/adsclick/", {
        ads_id: ads_id,
      });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mb-6 w-full max-w-sm bg-white border-2 border-gray-200 rounded-2xl lg:max-w-lg">
        <div className="flex items-center px-4 pt-3 pb-1">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src="/public/Images/logos/sponsor.jpg"
              alt="Neil image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="px-3 text-lg font-medium text-gray-900 truncate dark:text-white">
              {props.brandname}
            </p>
          </div>
          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
            <button
              onClick={() => handleRatingClick(props.id)}
              className="font-semibold text-blue-600 py-1 px-5 border border-blue-500 rounded-full shadow-lg shadow-slate-300"
            >
              Visit
            </button>
          </div>
        </div>

        {props.description ? (
          <div className="block max-w-sm px-4 bg-white lg:max-w-lg">
            <p className="text-base font-medium whitespace-pre-line text-gray-700 dark:text-gray-400">
              {expanded ? content : content.slice(0, maxChars)}
              {content.length > maxChars && !expanded && <span>... </span>}
              {content.length > maxChars && (
                <button onClick={toggleExpanded}>
                  {expanded ? "_Show Less" : "Load More"}
                </button>
              )}
            </p>
          </div>
        ) : null}

        <div className="flex flex-col items-center">
          <Content
            content_type={props.content_type}
            content={props.content}
          ></Content>
        </div>
      </div>
    </div>
  );
}
