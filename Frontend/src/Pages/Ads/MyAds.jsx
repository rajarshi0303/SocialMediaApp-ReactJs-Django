import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import FormatCount from "../../Components/Status/FormatCount";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const AdsEditAtom = atom(0);

const DateDifference = ({ datetime, plan }) => {
  console.log(plan);
  const calculateDateDifference = (postDatetime) => {
    const currentDate = new Date();
    if (postDatetime) {
      const postDate = new Date(postDatetime);
      const timeDifference = currentDate - postDate;
      const differenceInDays = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
      );
      if (plan === "standard") {
        const activeDays = Math.max(15 - differenceInDays, 0);
        return "Expire In " + activeDays + " days";
      } else if (plan === "premium") {
        const activeDays = Math.max(30 - differenceInDays, 0);
        return "Expire In " + activeDays + " days";
      } else if (plan === "gold") {
        const activeDays = Math.max(60 - differenceInDays, 0);
        return "Expire In " + activeDays + " days";
      }
    } else {
      return "Date not available";
    }
  };

  const daysDifference = calculateDateDifference(datetime);

  return (
    <span className="ml-2 font-bold text-gray-500">
      {" "}
      {typeof daysDifference === "number"
        ? `${daysDifference} Days`
        : daysDifference}
    </span>
  );
};

function Content(props) {
  if (props.content_type === "text") {
    return (
      <div className="block">
        <p className="text-sm font-semibold bg-stone-50 whitespace-pre-line text-gray-700 dark:text-gray-400">
          {props.content}
        </p>
      </div>
    );
  } else if (props.content_type === "image") {
    return (
      <LazyLoadImage
        src="/public/images/Signup/post.png"
        alt="Example"
        effect="blur"
      />
    );
  } else if (props.content_type === "video") {
    return (
      <div className="block">
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

export default function MyAds() {
  const navigate = useNavigate();
  const [ads, setAds] = useAtom(AdsEditAtom);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track the loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchData = async () => {
    try {
      if (!hasNextPage) return; // Stop fetching if there are no more pages
      const response = await axios.get(
        `http://localhost:8000/myads/?page=${currentPage}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setLoading(false); // Set loading to false after receiving the data
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
      setLoading(false); // Set loading to false after receiving the error
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
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

  const handleEdit = (adsID) => {
    setAds(adsID);
    navigate("/editads", { replace: true });
  };

  const handleDelete = async (adsID) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/deleteads/",
        { ads_id: adsID },
        { withCredentials: true }
      );
      navigate("/postdeleted", { replace: true });
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl space-y-4 bg-gray-50 mx-auto">
      <div className="flex items-center">
        <img
          src="/public/Images/logos/logo1.png"
          className="h-16 ml-3"
          alt="HeartLink Logo"
        />
      </div>
      <ul className="flex flex-col divide-y divide-gray-700">
        {users.map((ads) => (
          <li key={ads.id}>
            <h2 className="text-xl flex justify-end font-semibold">
              <button className="mt-2 text-sm font-medium text-gray-600 lg:text-lg flex items-center">
                <svg
                  className="mx-auto w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
                  ></path>
                </svg>

                <DateDifference datetime={ads.post_datetime} plan={ads.plan} />
              </button>
            </h2>
            <div className="flex flex-col py-2 sm:flex-row sm:justify-between ">
              <div className="flex w-full space-x-2 sm:space-x-4">
                <span className="flex-shrink-0 object-cover w-32 h-32 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500 overflow-hidden">
                  <Content
                    content_type={ads.content_type}
                    content={ads.content}
                  ></Content>
                </span>

                <div className="flex flex-col justify-between w-full pl-2">
                  <div className="flex justify-between w-full pb-2 space-x-2">
                    <div className="space-y-1">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-500 ">
                          <FormatCount
                            count={parseInt(ads.views)}
                          ></FormatCount>
                        </p>
                        <p className="text-base font-semibold leadi  text-gray-500">
                          Views
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-500 ">
                          <FormatCount
                            count={parseInt(ads.clicks)}
                          ></FormatCount>
                        </p>
                        <p className="text-base font-semibold leadi   text-gray-500">
                          Clicks
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-center">
                        <p className="text-lg font-medium text-gray-500 ">
                          {ads.status === "active" ? ads.plan : "Expired"}
                        </p>
                        <p className="text-base font-semibold leadi  text-gray-500">
                          Plan
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-lg divide-x">
                    <button
                      onClick={() => handleDelete(ads.id)}
                      type="button"
                      className="flex items-center px-2 py-1 pl-0 space-x-1 text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                        <rect width="32" height="200" x="168" y="216"></rect>
                        <rect width="32" height="200" x="240" y="216"></rect>
                        <rect width="32" height="200" x="312" y="216"></rect>
                        <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => handleEdit(ads.id)}
                      type="button"
                      className="flex items-center px-2 py-1 space-x-1"
                    >
                      <svg
                        className="mx-auto w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"></path>
                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>
                    {ads.status === "active" ? (
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 space-x-1 text-green-600"
                      >
                        <svg
                          className="mx-auto w-6 h-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                          <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          ></path>
                        </svg>
                        <span>Active</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center px-2 py-1 space-x-1 text-red-700"
                      >
                        <svg
                          className="mx-auto w-6 h-6 text-red-700"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                          ></path>
                          <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z"></path>
                        </svg>
                        <span>Recharge</span>
                      </button>
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
                className="bg-slate-200 text-black font-medium rounded-lg text-base px-5 py-2.5 text-center mt-3"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}
