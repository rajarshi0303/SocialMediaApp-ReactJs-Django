import React from "react";
import { useState } from "react";
import NewExploreComponent from "../Explore/NewExploreComponent";
import TopExploreComponent from "../Explore/TopExploreComponent";
import VideoExploreComponent from "../Explore/VideoExploreComponent";
import ImageExploreComponent from "../Explore/ImageExploreComponent";
import TextExploreComponent from "../Explore/TextExploreComponent";
import AudioExploreComponent from "../Explore/AudioExploreComponent";

export default function Filter() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [selectedOption, setSelectedOption] = useState("new");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  let explore;
  if (selectedOption === "new") {
    explore = <NewExploreComponent></NewExploreComponent>;
  } else if (selectedOption === "top") {
    explore = <TopExploreComponent></TopExploreComponent>;
  } else if (selectedOption === "video") {
    explore = <VideoExploreComponent></VideoExploreComponent>;
  } else if (selectedOption === "image") {
    explore = <ImageExploreComponent></ImageExploreComponent>;
  } else if (selectedOption === "text") {
    explore = <TextExploreComponent></TextExploreComponent>;
  } else if (selectedOption === "audio") {
    explore = <AudioExploreComponent></AudioExploreComponent>;
  }
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl lg:max-w-lg">
          <div className="flex items-center px-4 pt-3">
            <div className="flex-1 min-w-0"></div>
            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-sm font-medium text-gray-600 gap-x-1 lg:px-10 lg:text-lg"
              >
                <svg
                  className="mx-auto mb-1 w-6 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z"></path>
                </svg>
                <span className="text-xl font-semibold">Filter-Posts</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm bg-white border-2 border-gray-200 rounded-2xl lg:max-w-lg">
            <a class="max-w-sm max-h-96 rounded-2xl  block bg-white overflow-y-auto lg:max-w-lg">
              <div class="flex flex-wrap py-4 px-4">
                <div class="flex items-center mr-4 py-2">
                  <input
                    id="list-radio-license1"
                    type="radio"
                    value="new"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "new"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license1"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    New
                  </label>
                </div>

                <div class="flex items-center mr-4">
                  <input
                    id="list-radio-license2"
                    type="radio"
                    value="top"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "top"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license2"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    Top
                  </label>
                </div>

                <div class="flex items-center mr-4">
                  <input
                    id="list-radio-license3"
                    type="radio"
                    value="video"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "video"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license3"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    Video
                  </label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="list-radio-license4"
                    type="radio"
                    value="image"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "image"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license4"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    Image
                  </label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="list-radio-license5"
                    type="radio"
                    value="text"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "text"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license5"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    Text
                  </label>
                </div>
                <div class="flex items-center mr-4">
                  <input
                    id="list-radio-license6"
                    type="radio"
                    value="audio"
                    name="list-radio"
                    onChange={handleOptionChange}
                    checked={selectedOption === "audio"}
                    className="w-4 h-4 text-teal-600 border-gray-300 bg-gray-600"
                  />
                  <label
                    htmlFor="list-radio-license6"
                    class="ml-2 text-base font-medium text-gray-900 "
                  >
                    Audio
                  </label>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
      {explore}
    </div>
  );
}
