import React from "react";

export default function Error(props) {
  return (
    <>
      <div className="m-5 flex justify-center">
        <div className="flex w-full mx-auto max-w-sm overflow-hidden bg-white rounded-2xl shadow-2xl dark:bg-gray-800">
          <div className="flex items-center justify-center w-16 bg-red-500">
            <svg
              className="w-10 h-10 text-white fill-current"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
            </svg>
          </div>

          <div className="px-4 py-5 -mx-3">
            <div className="mx-3">
              <span className="font-bold text-red-500 dark:text-red-400">
                Error
              </span>
              <p className="text-base text-gray-600 dark:text-gray-200">
                {props.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
