import React, { useEffect, useState, useReducer, useMemo } from "react";
import {
  ChatDots,
  Person,
  Postcard,
  PostcardFill,
  XLg,
} from "react-bootstrap-icons";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavLog from "../utils/signednav";
import { Signout } from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";
import TopNav from "../utils/pagenav";
import PostfoundCard from "./postmissingcard";
import ReportForm from "./reportmissingForm";
import VerifyCard from "./verifycardpage";
import Createroom from "./waitload";
import { CreateChat } from "../../store/actions/datacollection";
import ProfileNav from "../utils/profileNav";
import { IconButton } from "@mui/material";

const ReportMissingCard = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");

    return formattedDate;
  }

  const [showverify, setverify] = useState(false);
  const [createChat, setchat] = useState(false);
  const [card_id, setcard_id] = useState("");
  const [showmennu, setmenu] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);

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
            <div className="content-nav">
              <p onClick={() => navigateTo("/user/dashboard")}>
                {" "}
                <Person size={25} />
                <span> Over View</span>
              </p>
              <p onClick={() => navigateTo("/user/postcard")}>
                {" "}
                <PostcardFill size={20} />
                <span> Found a missing Card </span>
              </p>
              <p
                style={{
                  backgroundColor: "#E5EFF9",
                }}
                onClick={() => navigateTo("/user/reportmymissincard")}
              >
                <Postcard size={20} /> <span> Report my Missing card</span>
              </p>

              <p onClick={() => navigateTo("/conversation/chatroom")}>
                <ChatDots size={20} /> <span> Chat rooms</span>
              </p>
            </div>
            <p className="btn-signout"
               onClick={()=>{
      
                 dispatch(Signout())
                 setTimeout(()=>{
                  navigateTo("/")
                },500)
               

               }}>Sign Out</p>
          </div>
          <div
            className="menu_right"
            onClick={() => {
              setTimeout(() => {
                setmenu(false);
              }, 500);
            }}
            style={{ minHeight: `${window.innerHeight}px` }}
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
      {Checkuser && Checkuser.account ? (
        <div
          className="mainLayoutb"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          {showverify ? (
            <VerifyCard
              setverify={setverify}
              card_id={card_id}
              setchat={setchat}
            />
          ) : null}

          {createChat ? <Createroom /> : null}

          <div
            className="dashfront"
            style={{
              minHeight: `${window.innerHeight}px`,
            }}
          >
            <ProfileNav setmenu={setmenu} />

            <div
              className="dashlayout"
              style={{
                minHeight: `${window.innerHeight}px`,
              }}
            >
              <div className="dashleft">
                <div className="content-nav">
                  <p onClick={() => navigateTo("/user/dashboard")}>
                    {" "}
                    <Person size={25} />
                    <span> Over View</span>
                  </p>
                  <p onClick={() => navigateTo("/user/postcard")}>
                    {" "}
                    <PostcardFill size={20} />
                    <span> Found a missing Card </span>
                  </p>
                  <p
                    style={{
                      backgroundColor: "#E5EFF9",
                    }}
                    onClick={() => navigateTo("/user/reportmymissincard")}
                  >
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
                <ReportForm setverify={setverify} setcard_id={setcard_id} />
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
      ) : (
        <LoaderView />
      )}
    </>
  );
};

export default ReportMissingCard;
