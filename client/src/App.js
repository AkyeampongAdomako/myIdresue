import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyForm from "./components/Front/RegistrationForm";
import Home from "./components/Front/home";
import { showToastify } from "./components/utils/reuseable";
import { ClearNotify } from "./store/actions/notification";
import "./components/style/custome.css";
import "./components/style/design.css";
import Resetpasspage from "./components/Front/resetpassword";
import ConfirmAccount from "./components/Front/confirmAccount";
import {
  AutoLogin,
  CheckLogin,
  getAllUsers,
} from "./store/actions/adminActions";

import SignInUser from "./components/Front/signin";
import HomeDashbord from "./components/Front/dashboard";
import UserDashbord from "./components/Front/userprofile";
import Authcontainer from "./components/utils/authuser";
import Forgotpass from "./components/Front/forgotpassword";
import FoundACard from "./components/Front/postfundcard";
import ReportMissingCard from "./components/Front/reportmissingcard";
import Chatroom from "./components/Front/chatroom";
import SearchPage from "./components/Front/Searchpage";
import FilterPage from "./components/Front/filterfoundcard";
import LoginReset from "./components/Front/resetpass";

function App() {
  const notifications = useSelector((value) => value.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    dispatch(CheckLogin());
  }, []);

  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);

  useEffect(() => {
    if (notifications && notifications.notice) {
      if (notifications.success) {
        showToastify("SUCCESS", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      if (notifications.success === false) {
        showToastify("ERROR", notifications.notice.msg);
        dispatch(ClearNotify());
      }
      window.scrollTo(0, 0);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/account/verification" element={<ConfirmAccount />} />
        <Route path="/account/passwordreset" element={<Resetpasspage />} />
        <Route
          path="/user/reportmymissincard"
          element={
            <Authcontainer>
              <ReportMissingCard />
            </Authcontainer>
          }
        ></Route>
        <Route
          path="/user/postcard"
          element={
            <Authcontainer>
              <FoundACard />
            </Authcontainer>
          }
        ></Route>
        <Route path="/dashbord/login" element={<LoginReset />}></Route>
        <Route path="/user/login" element={<SignInUser />}></Route>
        <Route path="/user/Signup" element={<MyForm />}></Route>
        <Route
          path="/user/login/forgottenpassword"
          element={<Forgotpass />}
        ></Route>
        <Route
          path="/home/dashboard"
          element={
            <Authcontainer>
              <HomeDashbord />
            </Authcontainer>
          }
        ></Route>
        <Route
          path="/user/dashboard"
          element={
            <Authcontainer>
              <UserDashbord />
            </Authcontainer>
          }
        ></Route>
        <Route path="/findmycard/" element={<SearchPage />}></Route>
        <Route
          path="/mycards/possiblematch/"
          element={
            <Authcontainer>
              <FilterPage />
            </Authcontainer>
          }
        ></Route>
        <Route path="/conversation/chatroom" element={<Authcontainer><Chatroom /></Authcontainer>}></Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
