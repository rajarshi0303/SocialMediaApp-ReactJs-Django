import React from "react";

export default function PostLoading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      role="status"
    >
      <div className="px-3 py-1 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
        Loading...
      </div>
    </div>
  );
}
