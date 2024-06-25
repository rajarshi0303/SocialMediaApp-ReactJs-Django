import React from "react";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import { Link } from "react-router-dom";
export default function PostDeleted() {
  return (
    <div>
      <div class="flex items-center justify-center h-screen">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow-2xl dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              class="rounded-t-lg"
              src="/public/images/Post/Deletedpost.jpg"
              alt="product image"
            />
          </a>
          <div class="items-center px-5 pb-5">
            <h5 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Your Post Has Being Deleted Successfully
            </h5>

            <Link to="/profilepage">
              <div class="mt-3 flex items-center justify-between">
                <a class="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Done
                </a>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <BottomNavbar></BottomNavbar>
    </div>
  );
}
