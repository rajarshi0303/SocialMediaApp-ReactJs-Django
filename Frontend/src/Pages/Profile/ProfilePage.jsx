import React, { lazy, Suspense } from "react";
import BottomNavbar from "../../Components/Navbar/BottomNavbar";
import Profile from "./Profile";
import UserPost from "../../Components/Posts/UserPost";

export default function ProfilePage() {
  return (
    <div>
      <Profile></Profile>
      <UserPost></UserPost>
      <BottomNavbar></BottomNavbar>
    </div>
  );
}
