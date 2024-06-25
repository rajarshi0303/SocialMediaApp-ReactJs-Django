import { Link } from "react-router-dom";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../Components/Status/Error";

const apiUrl = "http://localhost:8000/api/token/";
// Function to obtain access token using provided credentials

export default function Login() {
  const navigate = useNavigate();

  const username = useRef("");
  const password = useRef("");
  const [status, setStatus] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("rerender");
  const obtainToken = async () => {
    try {
      const response = await axios.post(
        apiUrl,
        {
          username: username.current.value,
          password: password.current.value,
        },
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      console.log(response.data);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Error setting cookie:", error);
      setIsLoggedIn(false);
      setStatus(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
    obtainToken();
  };

  return (
    <div>
      <div class="flex flex-col w-full items-center justify-center h-screen">
        <div className="py-4 flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-3xl shadow-2xl dark:bg-gray-800 lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/public/Images/Signup/login.png')",
            }}
          ></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-20"
                src="/public/Images/logos/logo1.png"
              />
            </div>

            <p className="mt-3 text-xl font-semibold text-center text-gray-600 dark:text-gray-200">
              Login!
            </p>
            <br></br>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                  User Name
                </label>
                <input
                  ref={username}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  required
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="loggingPassword"
                  >
                    Password
                  </label>
                  <Link to="/forgetpassword">
                    <span className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                      Forget Password?
                    </span>
                  </Link>
                </div>

                <input
                  id="loggingPassword"
                  ref={password}
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="password"
                  required
                />
              </div>

              <div className="mt-6">
                {isLoggedIn ? (
                  <button
                    disabled
                    type="button"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  >
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
                    Logging In...
                  </button>
                ) : (
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Login In
                  </button>
                )}
              </div>
            </form>

            <p className="mt-3 text-base text-center text-gray-600 dark:text-gray-200">
              Don't have an account?
              <Link to="/signup">
                <span className="text-blue-700"> Register </span>
              </Link>
            </p>
          </div>
        </div>
        {status && <Error message="Invalid UserName OR Password!" />}
      </div>
    </div>
  );
}
