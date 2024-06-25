import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userDataAtom } from "./Profile";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:8000/editprofile/";

export default function EditProfile() {
  const navigate = useNavigate();
  const [data] = useAtom(userDataAtom);
  const bioRef = useRef(data.bio);
  const linkRef = useRef(data.link);
  const [status, setStatus] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  console.log("edit post re-render");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.profile_image);

  const images = [
    "/public/images/ProfilePicture/p1.jpg",
    "/public/images/ProfilePicture/p2.jpg",
    "/public/images/ProfilePicture/p3.jpg",
    "/public/images/ProfilePicture/p4.jpg",
    "/public/images/ProfilePicture/p5.jpg",
    "/public/images/ProfilePicture/p6.jpg",
    "/public/images/ProfilePicture/p7.jpg",
    "/public/images/ProfilePicture/p8.jpg",
    "/public/images/ProfilePicture/p9.jpg",
    "/public/images/ProfilePicture/p10.jpg",
    "/public/images/ProfilePicture/p11.jpg",
    "/public/images/ProfilePicture/p12.jpg",
    "/public/images/ProfilePicture/p13.jpg",
    "/public/images/ProfilePicture/p14.jpg",
    "/public/images/ProfilePicture/p15.jpg",
    "/public/images/ProfilePicture/p16.jpg",
    "/public/images/ProfilePicture/p17.jpg",
    "/public/images/ProfilePicture/p18.jpg",
    "/public/images/ProfilePicture/p19.jpg",
    "/public/images/ProfilePicture/p20.jpg",
    "/public/images/ProfilePicture/p21.jpg",
    "/public/images/ProfilePicture/p22.jpg",
    "/public/images/ProfilePicture/p23.jpg",
    "/public/images/ProfilePicture/p24.jpg",
    "/public/images/ProfilePicture/p25.jpg",
    "/public/images/ProfilePicture/p26.jpg",
    "/public/images/ProfilePicture/p27.jpg",
    "/public/images/ProfilePicture/p28.jpg",
    "/public/images/ProfilePicture/p29.jpg",
    "/public/images/ProfilePicture/p30.jpg",
    "/public/images/ProfilePicture/p31.jpg",
    "/public/images/ProfilePicture/p32.jpg",
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(false); // Close the modal after selecting an image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const response = await axios.post(
        apiUrl,
        {
          profile_image: selectedImage,
          bio: bioRef.current.value,
          link: linkRef.current.value,
        },
        {
          withCredentials: true,
        }
      );
      setIsCreating(false);
      navigate("/profilepage", { replace: true });
    } catch (error) {
      console.error("Error setting cookie:", error);
      setIsCreating(false);
      setStatus(true);
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
      }
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-3xl shadow-2xl dark:bg-gray-800">
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mt-2 flex flex-col items-center pb-10">
                <img
                  className="w-28 h-28 mb-2 rounded-full shadow-lg"
                  src={
                    selectedImage
                      ? selectedImage
                      : "/public/images/ProfilePicture/defaultprofile.png"
                  }
                  alt=" "
                />
                <div className="flex mt-2 space-x-3 md:mt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600"
                  >
                    Choose Your Avatar
                  </button>
                </div>
              </div>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className="w-96 mx-auto bg-white rounded-lg shadow-lg">
                    <div className="p-4 h-[32rem] overflow-auto">
                      <div className="grid grid-cols-3  gap-3">
                        {images.map((image, index) => (
                          <img
                            key={index}
                            className="w-24 h-24 rounded-full shadow-lg"
                            src={image}
                            alt="Bonnie image"
                            onClick={() => handleImageClick(image)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative z-0 w-full mb-4 group">
              <textarea
                name="floating_bio"
                id="floating_bio"
                ref={bioRef}
                defaultValue={bioRef.current ? bioRef.current : " "}
                className="block py-2.5 px-0 h-24 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              ></textarea>
              <label
                htmlFor="floating_bio"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Bio
              </label>
            </div>

            <div className="relative z-0 w-full group">
              <p className="flex justify-center mx-auto text-b font-mono text-gray-500 lg:text-xl">
                Discord Server Link
              </p>
              <input
                name="server_link"
                id="server_link"
                ref={linkRef}
                defaultValue={linkRef.current ? linkRef.current : " "}
                className="block p-2.5 w-full text-sm text-blue-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Discord Server Link "
              ></input>
              <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                <span className="text-sm px-3 text-gray-600 dark:text-gray-200">
                  "Note: Only people who are following you will be able to
                  access the link to your Discord server."
                </span>
              </div>
            </div>

            {isCreating ? (
              <button
                disabled
                type="button"
                className="ml-48 px-8 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                <div className="flex items-center">
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 mr-3 text-white animate-spin"
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
                className="ml-60 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
