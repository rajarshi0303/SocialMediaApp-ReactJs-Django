import React, { useEffect, useState } from "react";
import axios from "axios";
import { atom, useAtom } from "jotai";

import Error from "../Status/Error";
export const emailAtom = atom("");
export const otpAtom = atom(false);

export default function ForgetPassword() {
  const [email, setEmail] = useAtom(emailAtom);
  const [otp, setOTP] = useAtom(otpAtom);
  const [status, setStatus] = useState(false);
  console.log("forgot-password");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setOTP(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/forgetpassword/",
        { email: email }
      );
      // Code to execute after successful submitting
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setStatus(true);
      }
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-20" src="/public/Images/logos/logo1.png" />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-wide text-center text-gray-800 capitalize md:text-3xl dark:text-white">
            Your Email
          </h1>

          <div className="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your Email"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <br></br>

              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-base font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg"
              >
                Continue
              </button>
            </form>
            {status && <Error message="Given Email Does not Exists" />}
          </div>
        </div>
      </section>
    </div>
  );
}
