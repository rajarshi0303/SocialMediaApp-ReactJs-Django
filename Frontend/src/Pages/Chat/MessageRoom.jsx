import React, { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { chatAtom } from "./ChatRoom";

export default function MessageRoom() {
  const [friend] = useAtom(chatAtom);
  const usermessage = useRef("");
  const [messages, setMessages] = useState([]);
  const chatSocket = useRef(null);
  const boxName = friend.room_id.toString();
  useEffect(() => {
    chatSocket.current = new WebSocket(
      "ws://localhost:8000/ws/chat/" + boxName + "/"
    );

    chatSocket.current.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Data:", data);
      if (data.type === "chat" && Array.isArray(data.message)) {
        setMessages((prevMessages) => [...prevMessages, ...data.message]);
      }

      if (data.type === "new_chat") {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      chatSocket.current.close();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(friend.sender_id, friend.receiver_id);
    chatSocket.current.send(
      JSON.stringify({
        sender_id: friend.sender_id,
        receiver_id: friend.receiver_id,
        room_id: friend.room_id,
        message: usermessage.current.value,
      })
    );
    e.target.reset();
  };

  return (
    <div>
      <div>
        <div className="mb-6 fixed bottom-0 left-0 w-full">
          <div className="flex flex-col items-center">
            <div className="h-screen max-h-screen flex flex-col-reverse overflow-x-hidden overflow-y-auto">
              <a className="block w-96 pt-20 p-6 ">
                <ul>
                  {messages.map((message, index) => (
                    <li key={message.id}>
                      {message.sender_id === friend.sender_id ? (
                        <h5 className="w-fit mb-4 px-4 py-2 text-xl font-semibold rounded-xl tracking-tight bg-slate-200 text-right ml-auto">
                          {message.message}
                        </h5>
                      ) : (
                        <a className="flex items-center">
                          <img
                            className="w-8 h-8 mr-2 rounded-full"
                            src={friend.profile_image}
                            alt="User Profile"
                          />
                          <h5 className="w-fit mb-4 px-4 py-2 text-xl font-semibold rounded-xl tracking-tight bg-white text-right">
                            {message.message.includes("http://") ||
                            message.message.includes("https://") ? (
                              <a
                                className="w-fit text-blue-500 underline"
                                href={message.message}
                                rel="noopener noreferrer"
                              >
                                {message.message}
                              </a>
                            ) : (
                              message.message
                            )}
                          </h5>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </a>
            </div>

            <div className="flex ">
              <form onSubmit={handleSubmit} class="flex justify-center">
                <div class="relative w-80">
                  <input
                    type="text"
                    id="simple-search"
                    ref={usermessage}
                    class="w-full h-12 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-3xl shadow-lg shadow-gray-300 block p-2.5"
                    placeholder="Give Your Feedback"
                    required
                  />
                </div>
                <button
                  type="submit"
                  class="p-3 text-lg font-medium text-white bg-teal-600 rounded-lg"
                >
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"></path>
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
