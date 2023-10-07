import React, { useState } from "react";
import {
  ChatDots,
  Person,
  Postcard,
  PostcardFill,
  XLg,
} from "react-bootstrap-icons";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavLog from "../utils/signednav";
import { Signout } from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";
import TopNav from "../utils/pagenav";
import UserProFile from "./userOverview";

import { IconButton } from "@mui/material";
import ProfileNav from "../utils/profileNav";

const UserDashbord = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [showmennu, setmenu] = useState(true);

  return (
    <>
      {showmennu ? (
        <div
          className="mainmenu"
          style={{
            minHeight: `${window.innerHeight + 100}px`,
            width: `${window.innerWidth}px`,
          }}
        >
          <div
            className="menu_left"
            style={{ minHeight: `${window.innerHeight}px` }}
          >
            <div className="menu_leftc"
              style={{ minHeight: `${window.innerHeight-150}px` }}>
              <div className="content-nav">
                <p
                  style={{
                    backgroundColor: "#E5EFF9",
                  }}
                  onClick={() => navigateTo("/user/dashboard")}
                >
                  {" "}
                  <Person size={25} />
                  <span> Over View</span>
                </p>
                <p onClick={() => navigateTo("/user/postcard")}>
                  {" "}
                  <PostcardFill size={20} />
                  <span> Found a missing Card </span>
                </p>
                <p onClick={() => navigateTo("/user/reportmymissincard")}>
                  <Postcard size={20} /> <span> Report my Missing card</span>
                </p>
                <p onClick={() => navigateTo("/conversation/chatroom")}>
                  <ChatDots size={20} /> <span> Chat rooms</span>
                </p>
              </div>
              <p
                className="btn-signout"
                onClick={() => {
                  dispatch(Signout());
                  setTimeout(() => {
                    navigateTo("/");
                  }, 500);
                }}
              >
                Sign Out
              </p>
            </div>
          </div>
          <div
            className="menu_right"
            onClick={() => {
                  setTimeout(() =>{
 setmenu(false);
                  },500)
                 
                }}
              >
      
            <span className="menu_right_span">
              <IconButton
              
                onClick={() => {
                
 setmenu(false);
                 
                 
                }}
              >
                <XLg color="white" size={25} />{" "}
              </IconButton>
            </span>
          </div>
        </div>
      ) : null}
      <div
        className="mainLayoutb"
        style={{
          minHeight: `${window.innerHeight}px`,
        }}
      >
        <div
          className="dashfront"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <ProfileNav setmenu={setmenu} />{" "}
          <div
            className="dashlayout"
            style={{
              minHeight: `${window.innerHeight}px`,
            }}
          >
            <div className="dashleft">
              <div className="content-nav">
                <p
                  style={{
                    backgroundColor: "#E5EFF9",
                  }}
                  onClick={() => navigateTo("/user/dashboard")}
                >
                  {" "}
                  <Person size={25} />
                  <span> Over View</span>
                </p>
                <p onClick={() => navigateTo("/user/postcard")}>
                  {" "}
                  <PostcardFill size={20} />
                  <span> Found a missing Card </span>
                </p>
                <p onClick={() => navigateTo("/user/reportmymissincard")}>
                  <Postcard size={20} /> <span> Report my Missing card</span>
                </p>
                <p onClick={() => navigateTo("/conversation/chatroom")}>
                  <ChatDots size={20} /> <span> Chat rooms</span>
                </p>
              </div>

              <p
                className="btn-signout"
                onClick={() => {
                  dispatch(Signout());
                  setTimeout(() => {
                    navigateTo("/");
                  }, 500);
                }}
              >
                Sign Out
              </p>
            </div>
            <div className="dashright">
              <UserProFile />
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="frontitemhover">
            <p>
              Powered by BaduTech All rights reserved
              <span style={{ color: "green" }}> @ </span> 2023
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashbord;
