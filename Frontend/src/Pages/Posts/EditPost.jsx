import React from "react";
import axios from "axios";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { PostDataAtom } from "../../Components/Posts/PostOption";

export default function EditPost() {
  const [data] = useAtom(PostDataAtom);
  const navigate = useNavigate();
  const descriptionRef = useRef(data.description);
  const hashtagRef = useRef(data.hashtag);
  const [selectedOption, setSelectedOption] = useState(data.privacy);
  const [isCreating, setIsCreating] = useState(false);

  console.log("edit-post-rerender");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/editpost/",
        {
          post_id: data.post_id,
          description: descriptionRef.current.value,
          hashtag: hashtagRef.current.value,
          privacy: selectedOption,
        },
        { withCredentials: true }
      );
      setIsCreating(false);
      navigate("/profilepage", { replace: true });
    } catch (error) {
      setIsCreating(false);
      console.error("Error setting cookie:", error);
    }
  };
  function handleInvalidInput() {
    hashtagRef.current.setCustomValidity("You can Enter Only One Category");
  }

  function resetCustomValidity() {
    hashtagRef.current.setCustomValidity("");
  }
  return (
    <>
      <div class="flex flex-col w-full items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="mt-4 pt-4 mb-24 w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl"
        >
          <p class="mt-4 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
            Description
          </p>
          <textarea
            id="message"
            rows="4"
            ref={descriptionRef}
            defaultValue={descriptionRef.current}
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write Your Description here..."
          ></textarea>

          <p class="mt-4 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
            Tag
          </p>
          <input
            id="message"
            rows="1"
            ref={hashtagRef}
            defaultValue={hashtagRef.current}
            class="block p-2.5 w-full text-sm text-blue-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Post Category"
            pattern="^\S+$"
            onInvalid={handleInvalidInput}
            onInput={resetCustomValidity}
          ></input>

          <p class="mt-6 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
            Video Privacy
          </p>
          <div class="bg-white flex flex-wrap justify-center">
            <div className="mr-16 flex items-center pl-3">
              <input
                id="list-radio-license1"
                type="radio"
                value="public"
                name="list-radio"
                className="w-8 h-8 text-teal-600 border-gray-300 bg-gray-600"
                onChange={handleOptionChange}
                checked={selectedOption === "public"}
                required
              />
              <label
                htmlFor="list-radio-license1"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Public
              </label>
            </div>

            <div className="flex items-center pl-3">
              <input
                id="list-radio-license2"
                type="radio"
                value="following"
                name="list-radio"
                className="w-7 h-7 text-teal-600 border-gray-300 bg-gray-600"
                onChange={handleOptionChange}
                checked={selectedOption === "following"}
              />
              <label
                htmlFor="list-radio-license2"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                People You Follow
              </label>
            </div>
          </div>

          <div class="mt-8 pb-8 flex justify-center">
            {isCreating ? (
              <button
                disabled
                type="button"
                className="w-48 px-8 py-2.5 text-lg font-medium  tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-3xl hover:bg-teal-500 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-5 h-5 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Saving...
                </div>
              </button>
            ) : (
              <button
                type="submit"
                class="text-lg text-white w-24 py-2 bg-teal-500 font-medium rounded-3xl"
              >
                save
              </button>
            )}
          </div>
        </form>
      </div>
      <BottomNavbar></BottomNavbar>
    </>
  );
}
