import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { atom, useAtom } from "jotai";
import FormatCount from "../../Components/Status/FormatCount";

const apiUrl = "http://localhost:8000/userprofile/";

export const userDataAtom = atom([]);

export default function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useAtom(userDataAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error retrieving cookie:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login", { replace: true });
        }
        if (error.response && error.response.status === 404) {
          navigate("/login", { replace: true });
        }
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl bg-white">
        <div className="flex items-center">
          <img
            src="/public/Images/logos/logo1.png"
            className="h-16 ml-3"
            alt="HeartLink Logo"
          />
        </div>
        <div className="flex items-center">
          <Link to="/settings">
            <button className="px-4 py-4 inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5">
              <svg
                className="w-7 h-7"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center mx-auto max-w-screen-xl bg-white">
        <img
          className="w-28 h-28 mb-3 rounded-full shadow-xl"
          src={data.profile_image}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {data.username}
        </h5>
        <span className="text-base font-medium whitespace-pre-line text-gray-500 dark:text-gray-400">
          {data.bio}
        </span>
        <div className="flex mt-2 space-x-3 md:mt-2">
          <Link to="/editprofile">
            <span className="inline-flex text-base items-center px-4 py-2 font-medium text-center text-gray-500 rounded-lg bg-gray-100 ">
              Edit Profile
            </span>
          </Link>
        </div>

        {data.link && (
          <a href={data.link}>
            <img
              class="mt-2 h-auto w-10 rounded-lg"
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
              <FormatCount count={parseInt(data.post_count)}></FormatCount>
            </dt>
            <dd className="font-semibold text-gray-500 dark:text-gray-400">
              Posts
            </dd>
          </div>
          <div className="mx-auto my-auto ">
            <Link to="/followings">
              <dt className="text-xl text-center font-semibold">
                <FormatCount
                  count={parseInt(data.following_count)}
                ></FormatCount>
              </dt>
              <dd className="font-semibold text-gray-500 dark:text-gray-400">
                Following
              </dd>
            </Link>
          </div>
          <div className="mx-auto my-auto">
            <Link to="/followers">
              <dt className="text-xl text-center font-semibold">
                <FormatCount
                  count={parseInt(data.follower_count)}
                ></FormatCount>
              </dt>
              <dd className="font-semibold text-gray-500 dark:text-gray-400">
                Followers
              </dd>
            </Link>
          </div>
        </div>
      </div>

      <BottomNavbar></BottomNavbar>
    </>
  );
}
