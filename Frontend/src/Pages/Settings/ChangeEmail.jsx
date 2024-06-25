import React, { useRef, useState } from "react";
import Error from "../../Components/Status/Error";
import Success from "../../Components/Status/Success";
import axios from "axios";
const apiUrl = "http://localhost:8000/changeemail/";

export default function ChangeEmail() {
  const emailRef = useRef();
  const [success, setSuccess] = useState(false);
  const [emailstatus, setEmailStatus] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        apiUrl,
        { email: emailRef.current.value },
        { withCredentials: true }
      );
      setEmailStatus(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error setting cookie:", error);
      if (error.response && error.response.status === 402) {
        //email already exists
        setEmailStatus(true);
      }
      if (error.response && error.response.status === 401) {
        navigate("/login", { replace: true });
      }
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
            Change Email
          </h1>

          <div className="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="Enter Your New Email"
                  ref={emailRef}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <br></br>

              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg"
              >
                Continue
              </button>
              {emailstatus && <Error message="Email Already Exists" />}
              {success && <Success message="Email CHanged SuccessFully" />}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
