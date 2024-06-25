import React from "react";
import { useAtom } from "jotai";
import { adsIDAtom } from "./AddAds";
export default function AdsPricing() {
  const [adsID] = useAtom(adsIDAtom);
  console.log(adsID);
  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Pick Your Plan
          </h2>
          <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div class="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Card start*/}
          <div class="flex flex-col p-6 mx-auto max-w-lg h-fit text-center text-gray-900 bg-white rounded-3xl border border-gray-300 shadow-2xl dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
            <h3 class="text-2xl font-semibold">Standard</h3>
            <div class="flex justify-center items-baseline my-8">
              <span class="text-4xl font-bold text-gray-800">$2</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Validity: <span class="font-semibold">15 days</span>
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Ad Performance Tracking</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Standard Priority</span>
              </li>

              <li class="flex h-5 items-center space-x-3"></li>
              <li class="flex h-5 items-center space-x-3"></li>
            </ul>
            <a
              href="#"
              class="text-white bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
          {/* Card end*/}

          {/* Card start*/}

          <div class="relative flex flex-col mx-auto max-w-lg h-fit text-center rounded-3xl border-2 border-teal-600 p-6 xl:p-8 shadow-2xl">
            <div class="absolute inset-x-0 -top-3 flex justify-center">
              <span class="flex h-6 items-center justify-center rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                most popular
              </span>
            </div>
            <h3 class="text-2xl font-semibold">Premium</h3>

            <div class="flex justify-center items-baseline my-8">
              <span class="text-4xl font-bold text-gray-800">$3</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Validity: <span class="font-semibold">30 days</span>
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Ad Performance Tracking</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>High Priority</span>
              </li>
              <li class="flex h-5 items-center space-x-3"></li>
              <li class="flex h-5 items-center space-x-3"></li>
            </ul>
            <a
              href="#"
              class="text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
          {/* Card end*/}

          {/* Card start*/}

          <div class="relative flex flex-col mx-auto max-w-lg h-fit text-center rounded-3xl border-2 border-yellow-600 p-6 xl:p-8 shadow-2xl">
            <div class="absolute inset-x-0 -top-3 flex justify-center">
              <span class="flex h-6 items-center justify-center rounded-full bg-yellow-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                Best Offer
              </span>
            </div>
            <h3 class="text-2xl font-semibold">Gold</h3>

            <div class="flex justify-center items-baseline my-8">
              <span class="text-4xl font-bold text-gray-800">$5</span>
            </div>

            <ul role="list" class="mb-8 space-y-4 text-left">
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>
                  Validity: <span class="font-semibold">60 days</span>
                </span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>Ad Performance Tracking</span>
              </li>
              <li class="flex items-center space-x-3">
                <svg
                  class="flex-shrink-0 w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>High Priority</span>
              </li>

              <li class="flex h-5 items-center space-x-3"></li>
              <li class="flex h-5 items-center space-x-3"></li>
            </ul>
            <a
              href="#"
              class="text-white bg-yellow-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
            >
              Get started
            </a>
          </div>
          {/* Card end*/}
        </div>
      </div>
    </section>
  );
}
