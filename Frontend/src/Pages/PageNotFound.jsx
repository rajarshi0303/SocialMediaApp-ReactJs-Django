import React from "react";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
        <div class="w-full ">
          <div class="flex flex-col items-center max-w-lg mx-auto text-center">
            <p class="text-xl font-medium text-blue-500 dark:text-blue-400">
              404 error
            </p>
            <h1 class="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              We lost this page
            </h1>
            <p class="mt-4 text-gray-500 dark:text-gray-400">
              We searched high and low, but couldn’t find what you’re looking
              for.Let’s find a better place for you to go.
            </p>
            <Link to="/home">
              <button class="mt-5 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                Take me home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
