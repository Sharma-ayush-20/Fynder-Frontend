import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import Layout from "./Layout";
import Feed from "./Feed";
import Connections from "./Connections";
import Request from "./Request";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import LandingPage from "./LandingPage";
import Premium from "./Premium";
import Chat from "./Chat";
import AboutUs from "./AboutUs";
import Careers from "./Careers";
import Blog from "./Blog";
import Contact from "./Contact";
import HelpCenter from "./HelpCenter"
import FAQs from "./FAQs"
import Terms from "./Terms"
import PrivacyPolicy from "./PrivacyPolicy"
import UserDetails from "./UserDetails";
import Settings from './Settings'

function AppContent() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/profile/view`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUser(res.data.user));
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        // toast.error("Session expired! Please login again.");
        navigate("/landingpage");
      }
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, [user]);

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* Dashboard Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Request />} />
            <Route path="premium" element={<Premium />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
            <Route path="/profile/:id" element={<UserDetails />} />
            <Route path="/settings" element={<Settings />}/>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default AppContent;
