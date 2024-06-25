import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Explore = lazy(() => import("./Pages/Explore/Explore"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Trending = lazy(() => import("./Pages/Home/Trending"));

const Register = lazy(() => import("./Pages/SignUp/Register"));
const CreateAccount = lazy(() => import("./Pages/SignUp/CreateAccount"));
const Login = lazy(() => import("./Pages/SignUp/Login"));
const Logout = lazy(() => import("./Pages/SignUp/Logout"));
const ResetPassword = lazy(() => import("./Pages/SignUp/ResetPassword"));

const ProfilePage = lazy(() => import("./Pages/Profile/ProfilePage"));
const EditProfile = lazy(() => import("./Pages/Profile/EditProfile"));

const Settings = lazy(() => import("./Pages/Settings/Settings"));
const AccountSettings = lazy(() => import("./Pages/Settings/AccountSettings"));
const ChangeEmail = lazy(() => import("./Pages/Settings/ChangeEmail"));
const ChangePassword = lazy(() => import("./Pages/Settings/ChangePassword"));
const ChangeUserName = lazy(() => import("./Pages/Settings/ChangeUserName"));

const SearchBar = lazy(() => import("./Pages/Search/SearchBar"));
const SearchTag = lazy(() => import("./Pages/Search/SearchTag"));

const User = lazy(() => import("./Pages/User/User"));
const Followers = lazy(() => import("./Pages/Friends/Followers"));
const Followings = lazy(() => import("./Pages/Friends/Followings"));

const AddPost = lazy(() => import("./Pages/Posts/AddPost"));
const EditPost = lazy(() => import("./Pages/Posts/EditPost"));
const PostDeleted = lazy(() => import("./Pages/Posts/PostDeleted"));
const SharedPost = lazy(() => import("./Pages/Posts/SharedPost"));

const HashTag = lazy(() => import("./Pages/Posts/HashTag"));

const ChatRoom = lazy(() => import("./Pages/Chat/ChatRoom"));
const MessageRoom = lazy(() => import("./Pages/Chat/MessageRoom"));

const ContactUs = lazy(() => import("./Pages/ContactUs"));
const AboutUs = lazy(() => import("./Pages/AboutUs"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Dummy = lazy(() => import("./Pages/Dummy"));

const MyAds = lazy(() => import("./Pages/Ads/MyAds"));
const AddAds = lazy(() => import("./Pages/Ads/AddAds"));
const EditAds = lazy(() => import("./Pages/Ads/EditAds"));
const AdsPricing = lazy(() => import("./Pages/Ads/AdsPricing"));

const Donate = lazy(() => import("./Pages/Donate/Donate"));

import PageLoading from "./Components/Status/PageLoading";
function App() {
  return (
    <div>
      <Suspense fallback={<PageLoading></PageLoading>}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Explore />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trending" element={<Trending />} />

            <Route path="/signup" element={<Register />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgetpassword" element={<ResetPassword />} />

            <Route path="/editprofile" element={<EditProfile />} />

            <Route path="/settings" element={<Settings />} />
            <Route path="/accountsettings" element={<AccountSettings />} />
            <Route path="/changeusername" element={<ChangeUserName />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/changeemail" element={<ChangeEmail />} />

            <Route path="/usersearch" element={<SearchBar />} />
            <Route path="/tagsearch" element={<SearchTag />} />

            <Route path="/user" element={<User />} />
            <Route path="/followers" element={<Followers />} />
            <Route path="/followings" element={<Followings />} />

            <Route path="/profilepage" element={<ProfilePage />} />

            <Route path="/addpost" element={<AddPost />} />
            <Route path="/postdeleted" element={<PostDeleted />} />
            <Route path="/editpost" element={<EditPost />} />
            <Route path="/sharedpost/:postId" element={<SharedPost />} />

            <Route path="/hashtag" element={<HashTag />} />

            <Route path="/chatroom" element={<ChatRoom />} />
            <Route path="/messageroom" element={<MessageRoom />} />

            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/pagenotfound" element={<PageNotFound />} />

            <Route path="/myads" element={<MyAds />} />
            <Route path="/postads" element={<AddAds />} />
            <Route path="/editads" element={<EditAds />} />
            <Route path="/adspricing" element={<AdsPricing />} />

            <Route path="/donate" element={<Donate />} />

            <Route path="/dummy" element={<Dummy />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
