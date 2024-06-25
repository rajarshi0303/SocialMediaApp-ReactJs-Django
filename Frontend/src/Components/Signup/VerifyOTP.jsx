import React, { useRef, useState } from "react";
import axios from "axios";
import { emailAtom } from "./ForgetPassword";
import { atom, useAtom } from "jotai";
import Error from "../Status/Error";
export const resetAtom = atom(false);

export default function VerifyOTP() {
  const [email] = useAtom(emailAtom);
  const [reset, setReset] = useAtom(resetAtom);
  const OtpRef = useRef("");
  const [status, setStatus] = useState(false);

  console.log("Verify Otp");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/verifyotp/", {
        email: email,
        otp: OtpRef.current.value,
      });
      // reset data after submitting
      OtpRef.current.value = "";
      setReset(true);
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
            Verification Code
          </h1>

          <div className="w-full max-w-md mx-auto mt-6">
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  ref={OtpRef}
                  placeholder="Enter your OTP"
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
            {status && <Error message="Invalid OTP" />}
          </div>
        </div>
      </section>
    </div>
  );
}
