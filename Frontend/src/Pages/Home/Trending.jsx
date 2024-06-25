import React from "react";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import Filter from "../../Components/Filter/Filter";
export default function Trending() {
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <img
              src="/public/Images/logos/logo1.png"
              className="h-16 ml-3"
              alt="HeartLink Logo"
            />
          </div>
          <div className="flex items-center">
            <img
              src="/public/Images/logos/new.png"
              className="h-16"
              alt="HeartLink Logo"
            />
          </div>
        </div>
      </nav>
      <Filter></Filter>

      <BottomNavbar></BottomNavbar>
    </div>
  );
}
