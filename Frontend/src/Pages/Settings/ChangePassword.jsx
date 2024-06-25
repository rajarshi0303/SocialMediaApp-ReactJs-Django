import React, { useRef, useState } from "react";
import axios from "axios";
import Error from "../../Components/Status/Error";
import Success from "../../Components/Status/Success";

const apiUrl = "http://localhost:8000/changepassword/";

export default function ChangePassword() {
  const currentRef = useRef();
  const newRef = useRef();
  const [status, setStatus] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        apiUrl,
        {
          oldpassword: currentRef.current.value,
          newpassword: newRef.current.value,
        },
        { withCredentials: true }
      );
      setSuccess(true);
      setStatus(false);
    } catch (error) {
      console.error("Error setting cookie:", error);
      setStatus(true);
      setSuccess(false);
      if (error.response && error.response.status === 404) {
        navigate("/login", { replace: true });
      }
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-24" src="/public/Images/logos/logo1.png" />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
            Change Password
          </h1>

          <div className="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="password"
                  placeholder="Enter Your Current Password"
                  ref={currentRef}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter Your New Password"
                  ref={newRef}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <br></br>

              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg "
              >
                Continue
              </button>
              {status && <Error message="Invalid Current Password" />}
              {success && (
                <Success message="Password Changed Successfully"></Success>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
