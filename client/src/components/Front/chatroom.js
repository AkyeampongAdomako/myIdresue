import React, { useEffect, useState, useReducer, useMemo } from "react";
import {
  ChevronBarDown,
  ChevronCompactDown,
  ChevronCompactUp,
  Dot,
  Postcard,
  PostcardFill,
  XLg,
} from "react-bootstrap-icons";

import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNavLog from "../utils/signednav";
import {
  AutoLogin,
  Signout,
  getAllUsers,
} from "../../store/actions/adminActions";
import LoaderView from "../utils/loaderView";
import TopNav from "../utils/pagenav";
import PostfoundCard from "./postmissingcard";
import ChatConversation from "./chatroomform";
import {
  Clear_CreateChat,
  Clear_ChatBox,
} from "../../store/actions/datacollection";
import VerifyCard from "./verifycardpage";
import ProfileNav from "../utils/profileNav";
import { IconButton } from "@mui/material";

const Chatroom = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = format(date, "EE LLL dd yyyy");
    return formattedDate;
  }
  const [showsub, setsub] = useState(false);
  const [singleid, setsingleid] = useState("");
  const [currentchat, setchat] = useState([]);
  const [rommid, setchatroomid] = useState("");
  const [receiver, setreceiver] = useState("");

  useEffect(() => {
    dispatch(Clear_CreateChat());
  }, []);
  const Checkuser = useSelector((item) => item.authuser);

  const chatroom = useMemo(() => {
    if (Checkuser && Checkuser.account) {
      return Checkuser.account.chatroom;
    } else {
      return [];
    }
  }, [Checkuser]);
  const chatowners = useMemo(() => {
    if (Checkuser && Checkuser.account) {
      return Checkuser.account.myfoundcards;
    } else {
      return [];
    }
  }, [Checkuser]);
  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);

  const [showmennu, setmenu] = useState(true);

  return (
    <>
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
             
            >
              <div className="content-nav">
                <div className="dashlefth" style={{ marginTop: "20px" }}>
                  <p>Chats with possible owner</p>
                </div>
                <div>
                  {chatowners.length > 0
                    ? chatowners.map((details, index) => {
                        return (
                          <>
                            <div
                              className="displayroomcards"
                              onClick={() => {
                                if (showsub && singleid === details._id) {
                                  setsingleid("");
                                } else {
                                  setsingleid(details._id);
                                }
                              }}
                            >
                              <p
                                onClick={() => {
                                  setsub(true);
                                }}
                                key={index}
                                className="dashleftp"
                              >
                                Card
                                <span>
                                  {" "}
                                  {details.firstname + " " + details.lastname} [
                                  ID :{details.id_number} ]{" "}
                                </span>
                              </p>
                              {showsub && singleid === details._id ? (
                                <ChevronCompactUp />
                              ) : (
                                <ChevronCompactDown />
                              )}
                            </div>

                            {showsub && singleid === details._id ? (
                              <div className="group_chats">
                                {details.conversation.length > 0 ? (
                                  details.conversation.map(
                                    (conversation, index) => {
                                      return (
                                        <p
                                          style={{
                                            backgroundColor: `${
                                              rommid === conversation._id
                                                ? "rgb(0, 72, 127)"
                                                : ""
                                            }`,
                                          }}
                                          onClick={() => {
                                            setmenu(false);
                                            dispatch(Clear_ChatBox());
                                            setTimeout(() => {
                                              setchatroomid(conversation._id);
                                            }, 100);
                                            setchat(conversation.messsages);
                                            setreceiver(
                                              conversation.sender?._id
                                            );
                                            setchatroomid(conversation._id);
                                          }}
                                          key={index}
                                          className="group_chatsp"
                                        >
                                          <span>
                                            <Dot color="yellow" size={14} />
                                          </span>
                                          Card
                                          <span>
                                            {" "}
                                            {conversation.sender?.fullname + ""}
                                          </span>
                                        </p>
                                      );
                                    }
                                  )
                                ) : (
                                  <p className="group_chatsp">
                                    no conversation yet
                                  </p>
                                )}
                              </div>
                            ) : null}
                          </>
                        );
                      })
                    : null}
                </div>

                <div className="dashlefth" style={{ marginTop: "20px" }}>
                  <p> Chats with my card founders</p>
                </div>
                {chatroom.length > 0
                  ? chatroom.map((chats, index) => {
                      return (
                        <p
                          onClick={() => {
                            dispatch(Clear_ChatBox());
                            setchat(chats.messsages);
                            setreceiver(chats.reciever?._id);
                            setmenu(false);
                            setTimeout(() => {
                              setchatroomid(chats._id);
                            }, 100);
                          }}
                          key={index}
                          style={{
                            backgroundColor: `${
                              rommid === chats._id ? "rgb(0, 72, 127)" : ""
                            }`,
                            color: `${rommid === chats._id ? "white" : ""}`,
                          }}
                          className="dashleftp"
                        >
                          <span>
                            {" "}
                            Chat with{" "}
                            {chats.reciever ? chats.reciever.fullname : ""} [ ID
                            :{chats.card ? chats.card.id_number : ""} ]{" "}
                          </span>
                        </p>
                      );
                    })
                  : null}
              </div>
            

              <p
                className="btn-signout"
                onClick={() => navigateTo("/user/dashboard")}
              >
                Profile
              </p>
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

        <>
          {Checkuser && Checkuser.account ? (
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
                <ProfileNav setmenu={setmenu} />

                <div
                  className="dashlayout"
                  style={{
                    minHeight: `${window.innerHeight}px`,
                  }}
                >
                  <div className="dashleft">
                    <div className="content-nav">
                      <div className="dashlefth" style={{ marginTop: "20px" }}>
                        <p>Chats with possible owner</p>
                      </div>
                      <div>
                        {chatowners.length > 0
                          ? chatowners.map((details, index) => {
                              return (
                                <>
                                  <div
                                    className="displayroomcards"
                                    onClick={() => {
                                      if (showsub && singleid === details._id) {
                                        setsingleid("");
                                      } else {
                                        setsingleid(details._id);
                                      }
                                    }}
                                  >
                                    <p
                                      onClick={() => {
                                        setsub(true);
                                      }}
                                      key={index}
                                      className="dashleftp"
                                    >
                                      Card
                                      <span>
                                        {" "}
                                        {details.firstname +
                                          " " +
                                          details.lastname}{" "}
                                        [ ID :{details.id_number} ]{" "}
                                      </span>
                                    </p>
                                    {showsub && singleid === details._id ? (
                                      <ChevronCompactUp />
                                    ) : (
                                      <ChevronCompactDown />
                                    )}
                                  </div>

                                  {showsub && singleid === details._id ? (
                                    <div className="group_chats">
                                      {details.conversation.length > 0 ? (
                                        details.conversation.map(
                                          (conversation, index) => {
                                            return (
                                              <p
                                                style={{
                                                  backgroundColor: `${
                                                    rommid === conversation._id
                                                      ? "rgb(0, 72, 127)"
                                                      : ""
                                                  }`,
                                                }}
                                                onClick={() => {
                                                  dispatch(Clear_ChatBox());
                                                  setTimeout(() => {
                                                    setchatroomid(
                                                      conversation._id
                                                    );
                                                  }, 100);
                                                  setchat(
                                                    conversation.messsages
                                                  );
                                                  setreceiver(
                                                    conversation.sender?._id
                                                  );
                                                  setchatroomid(
                                                    conversation._id
                                                  );
                                                }}
                                                key={index}
                                                className="group_chatsp"
                                              >
                                                <span>
                                                  <Dot
                                                    color="yellow"
                                                    size={14}
                                                  />
                                                </span>
                                                Card
                                                <span>
                                                  {" "}
                                                  {conversation.sender
                                                    ?.fullname + ""}
                                                </span>
                                              </p>
                                            );
                                          }
                                        )
                                      ) : (
                                        <p className="group_chatsp">
                                          no conversation yet
                                        </p>
                                      )}
                                    </div>
                                  ) : null}
                                </>
                              );
                            })
                          : null}
                      </div>

                      <div className="dashlefth" style={{ marginTop: "20px" }}>
                        <p> Chats with my card founders</p>
                      </div>
                      {chatroom.length > 0
                        ? chatroom.map((chats, index) => {
                            return (
                              <p
                                onClick={() => {
                                  dispatch(Clear_ChatBox());
                                  setchat(chats.messsages);
                                  setreceiver(chats.reciever?._id);

                                  setTimeout(() => {
                                    setchatroomid(chats._id);
                                  }, 100);
                                }}
                                key={index}
                                style={{
                                  backgroundColor: `${
                                    rommid === chats._id
                                      ? "rgb(0, 72, 127)"
                                      : ""
                                  }`,
                                  color: `${
                                    rommid === chats._id ? "white" : ""
                                  }`,
                                }}
                                className="dashleftp"
                              >
                                <span>
                                  {" "}
                                  Chat with{" "}
                                  {chats.reciever
                                    ? chats.reciever.fullname
                                    : ""}{" "}
                                  [ ID :{chats.card ? chats.card.id_number : ""}{" "}
                                  ]{" "}
                                </span>
                              </p>
                            );
                          })
                        : null}
                    </div>

                    <p
                      className="btn-signout"
                      onClick={() => navigateTo("/user/dashboard")}
                    >
                      Back to Profile
                    </p>
                  </div>
                  <div className="dashright">
                    <ChatConversation
                      receiver={receiver}
                      currentchat={currentchat}
                      rommid={rommid}
                      sender={
                        Checkuser && Checkuser.account
                          ? Checkuser.account._id
                          : ""
                      }
                    />
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
      </>
    </>
  );
};

export default Chatroom;
