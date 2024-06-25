import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";

const apiUrl = "http://localhost:8000/postads/";

export const adsIDAtom = atom();

export default function AddAds() {
  const [ads, setAds] = useAtom(adsIDAtom);
  const navigate = useNavigate();
  const brandnameRef = useRef("");
  const descriptionRef = useRef("");
  const hashtagRef = useRef("");
  const linkRef = useRef("");
  const [content, setContent] = useState();
  const [selected, setSelected] = useState("text");
  const [contenttype, setContentType] = useState("text");
  const [isPosted, setIsPosted] = useState(false);

  const handleClick = (option) => {
    console.log(option);
    setSelected(option);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log(event.target.files[0]);
    setContent(file);
    setContentType("image");
  };

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
    console.log(event.target.files[0]);
    setContent(file);
    setContentType("video");
  };

  const [selectedAudio, setSelectedAudio] = useState(null);

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setSelectedAudio(URL.createObjectURL(file));
    console.log(event.target.files[0]);
    setContent(file);
    setContentType("audio");
  };

  let upload;
  if (selected === "text") {
    upload = (
      <textarea
        id="comment"
        rows="4"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        placeholder="Write Your Text here..."
        required
      ></textarea>
    );
  } else if (selected === "image") {
    upload = (
      <div>
        <div className="flex justify-center">
          <div className="rounded-3xl shadow-2xl bg-gray-50 lg:w-1/2">
            <div>
              <label className="inline-block text-gray-500">
                Upload Image (jpg, png, svg, jpeg)
              </label>
              <div className="flex items-center justify-center">
                <label className="flex flex-col w-full  border-4 border-dashed">
                  <div className="flex flex-col h-fit items-center justify-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="w-full object-cover object-center"
                      />
                    ) : (
                      <div className="mt-5 flex flex-col items-center justify-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="text-gray-400 group-hover:text-gray-600">
                          Click Here To Upload Image
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selected === "video") {
    upload = (
      <div>
        <div className="flex justify-center">
          <div className="rounded-3xl shadow-2xl bg-gray-50 lg:w-1/2">
            <div>
              <label className="inline-block text-gray-500">
                Upload Video (mp4, mov, avi)
              </label>
              <div className="flex items-center justify-center">
                <label className="flex flex-col w-full  border-4 border-dashed">
                  <div className="flex flex-col h-fit items-center justify-center">
                    {selectedVideo ? (
                      <video
                        src={selectedVideo}
                        alt="Selected"
                        className="w-full object-cover object-center"
                        controls
                      />
                    ) : (
                      <div className="mt-5 flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            d="M1 4.75C1 3.784 1.784 3 2.75 3h14.5c.966 0 1.75.784 1.75 1.75v10.515a1.75 1.75 0 01-1.75 1.75h-1.5c-.078 0-.155-.005-.23-.015H4.48c-.075.01-.152.015-.23.015h-1.5A1.75 1.75 0 011 15.265V4.75zm16.5 7.385V11.01a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zm0 2.005a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .108.069.2.165.235h1.585a.25.25 0 00.25-.25v-1.11zm-15 1.11v-1.11a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.164.235H2.75a.25.25 0 01-.25-.25zm2-4.24v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V11.01a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25zm13-2.005V7.88a.25.25 0 00-.25-.25h-1.5a.25.25 0 00-.25.25v1.125c0 .138.112.25.25.25h1.5a.25.25 0 00.25-.25zM4.25 7.63a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V7.88a.25.25 0 01.25-.25h1.5zm0-3.13a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5zm11.5 1.625a.25.25 0 01-.25-.25V4.75a.25.25 0 01.25-.25h1.5a.25.25 0 01.25.25v1.125a.25.25 0 01-.25.25h-1.5zm-9 3.125a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                          ></path>
                        </svg>
                        <p className="text-gray-400 group-hover:text-gray-600">
                          Click Here To Upload Video
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    accept="video/mp4, video/mov, video/avi"
                    onChange={handleVideoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (selected === "audio") {
    upload = (
      <div>
        <div className="flex justify-center">
          <div className="rounded-3xl shadow-2xl bg-gray-50 lg:w-1/2">
            <div>
              <label className="inline-block text-gray-500">
                Upload Audio (mp3, wav, ogg)
              </label>
              <div className="flex items-center justify-center">
                <label className="flex flex-col w-full  border-4 border-dashed">
                  <div className="flex flex-col h-fit items-center justify-center">
                    {selectedAudio ? (
                      <audio src={selectedAudio} className="w-full" controls />
                    ) : (
                      <div className="mt-5 flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path>
                          <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path>
                        </svg>
                        <p className="text-gray-400 group-hover:text-gray-600">
                          Click Here To Upload Audio
                        </p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    className="opacity-0"
                    accept="audio/mp3, audio/wav, audio/ogg"
                    onChange={handleAudioUpload}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosted(true);
    const formData = new FormData();
    formData.append("brandname", brandnameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("hashtag", hashtagRef.current.value);
    formData.append("link", linkRef.current.value);
    formData.append("content", content);
    formData.append("content_type", contenttype);
    console.log(contenttype);
    console.log(formData);
    try {
      const response = await axios.post(apiUrl, formData, {
        withCredentials: true,
      });
      setAds(response.data.id);
      setIsPosted(false);
      navigate("/adspricing", { replace: true });
    } catch (error) {
      setIsPosted(false);
      console.error("Error setting cookie:", error);
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
      }
    }
  };
  console.log("re-render");

  return (
    <div className="flex items-center">
      <form
        onSubmit={handleSubmit}
        className="mt-4 pt-4 w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl"
      >
        <p className="mt-4 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
          Brand Name
        </p>
        <input
          id="brandname"
          rows="3"
          ref={brandnameRef}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write Your Brand Name here..."
        ></input>

        <p className="mt-4 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
          Description
        </p>
        <textarea
          id="description"
          rows="3"
          ref={descriptionRef}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write Your Description here..."
        ></textarea>
        <p className="mt-4 flex justify-center mx-auto text-base font-mono text-gray-500 lg:text-xl">
          Tag
        </p>
        <input
          id="hashtag"
          rows="1"
          ref={hashtagRef}
          className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add Tag To Target Audience"
        ></input>
        <p className="flex justify-center mx-auto text-b font-mono text-gray-500 lg:text-xl">
          Link
        </p>
        <input
          id="hashtag"
          rows="1"
          ref={linkRef}
          className="block p-2.5 w-full text-sm text-blue-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Your Web Link Here"
        ></input>

        <p className="mt-8 flex justify-center mx-auto text-lg font-semibold text-gray-500 lg:text-xl">
          Content
        </p>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            {upload}
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                onClick={() => handleClick("text")}
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7.75 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.545 19.381 19.381 0 017 9.56a19.418 19.418 0 01-1.002-2.05.75.75 0 00-1.384.577 20.935 20.935 0 001.492 2.91 19.613 19.613 0 01-3.828 4.154.75.75 0 10.945 1.164A21.116 21.116 0 007 12.331c.095.132.192.262.29.391a.75.75 0 001.194-.91c-.204-.266-.4-.538-.59-.815a20.888 20.888 0 002.333-5.332c.31.031.618.068.924.108a.75.75 0 00.198-1.487 32.832 32.832 0 00-3.599-.278V2.75z"></path>
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M13 8a.75.75 0 01.671.415l4.25 8.5a.75.75 0 11-1.342.67L15.787 16h-5.573l-.793 1.585a.75.75 0 11-1.342-.67l4.25-8.5A.75.75 0 0113 8zm2.037 6.5L13 10.427 10.964 14.5h4.073z"
                  ></path>
                </svg>
                Text
              </button>
              <button
                type="button"
                onClick={() => handleClick("image")}
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Image
              </button>
              <button
                type="button"
                onClick={() => handleClick("video")}
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z"
                  ></path>
                </svg>
                Video
              </button>
              <button
                type="button"
                onClick={() => handleClick("audio")}
                className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z"></path>
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"></path>
                </svg>
                Audio
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pb-8 flex justify-center">
          {isPosted ? (
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
              className="text-lg text-white w-24 py-2 bg-teal-500 font-medium rounded-3xl"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
