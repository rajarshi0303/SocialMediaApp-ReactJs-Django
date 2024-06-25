import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "../../Components/Status/Error";
import { atom, useAtom } from "jotai";
import { dataAtom } from "./Register";

export const statusAtom = atom(false);

export default function CreateAccount() {
  const navigate = useNavigate();
  const [data] = useAtom(dataAtom);
  const [status, setStatus] = useAtom(statusAtom);
  const [isCreating, setIsCreating] = useState(false);

  console.log(data);
  const username = useRef("");
  const password = useRef("");

  useEffect(() => {
    setStatus(false);
    if (data === "") {
      navigate("/signup", { replace: true });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/register/", {
        email: data,
        username: username.current.value,
        password: password.current.value,
      });
      setIsCreating(false);
      navigate("/login", { replace: true });
    } catch (error) {
      setIsCreating(false);
      if (error.response && error.response.status === 401) {
        setStatus(true);
        navigate("/signup", { replace: true });
      }
      if (error.response && error.response.status === 403) {
        setStatus(true);
        navigate("/signup", { replace: true });
      }
      if (error.response && error.response.status === 402) {
        setStatus(true);
      }
    }
  };

  return (
    <div>
      <div class="flex flex-col w-full items-center justify-center h-screen">
        <div className=" flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-3xl shadow-2xl dark:bg-gray-800 lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage: "url('/public/Images/Signup/createaccount.png')",
            }}
          ></div>

          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="px-6 py-4">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-20"
                  src="/public/Images/logos/logo1.png"
                  alt=""
                />
              </div>

              <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
                Create Account
              </h3>
              <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                Don't Use Your Real Name!
              </p>
              <form onSubmit={handleSubmit} className="mt-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    required
                    type="text"
                    ref={username}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    ref={password}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div>
                    {isCreating ? (
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
                        Creating...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                      >
                        Create
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
              <span className="text-sm px-3 text-gray-600 dark:text-gray-200">
                We Suggest not using your real name instead use fricational or
                arials name
              </span>
            </div>
          </div>
        </div>
        {status && <Error message="Username Already Registered!" />}
      </div>
    </div>
  );
}
