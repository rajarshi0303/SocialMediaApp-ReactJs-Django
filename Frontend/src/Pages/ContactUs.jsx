import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import Success from "../Components/Status/Success";

const apiUrl = "http://localhost:8000/contactus/";

export default function ContactUs() {
  const username = useRef("");
  const email = useRef("");
  const message = useRef("");
  const [status, setStatus] = useState(false);
  const send = async () => {
    try {
      const response = await axios.post(apiUrl, {
        username: username.current.value,
        email: email.current.value,
        message: message.current.value,
      });
      setStatus(true);
      username.current.value = "";
      email.current.value = "";
      message.current.value = "";
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    send();
  };

  return (
    <div class="flex flex-col w-full items-center justify-center h-screen">
      <div class="w-full px-8 py-10 mx-auto overflow-hidden bg-white rounded-xl shadow-2xl dark:bg-gray-800 lg:max-w-xl">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-20" src="/public/Images/logos/logo1.png" />
        </div>

        <div className="flex justify-center">
          <h1 className="text-2xl font-base text-gray-700">Contact Us</h1>
        </div>

        <form onSubmit={handleSubmit} class="mt-6">
          <div class="flex-1">
            <label class="block mb-2 font-semibold text-base text-gray-500 dark:text-gray-200">
              UserName
            </label>
            <input
              ref={username}
              type="text"
              placeholder="John"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-md "
            />
          </div>

          <div class="flex-1 mt-6">
            <label class="block mb-2 font-semibold text-base text-gray-500 dark:text-gray-200">
              Email address
            </label>
            <input
              ref={email}
              type="email"
              placeholder="john@example.com"
              class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-md "
            />
          </div>

          <div class="w-full mt-6">
            <label class="block mb-2 font-semibold text-base text-gray-500 dark:text-gray-200">
              Message
            </label>
            <textarea
              ref={message}
              class="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-gray-100 border border-gray-200 rounded-md"
              placeholder="Message"
            ></textarea>
          </div>

          <button class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white bg-gray-700 rounded-md">
            Send
          </button>
        </form>
      </div>
      {status && (
        <Success message="Your message has been sent successfully. We will contact you soon!" />
      )}
    </div>
  );
}
