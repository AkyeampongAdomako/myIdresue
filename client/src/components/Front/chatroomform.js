import React, { useEffect, useMemo, useState } from "react";
import { Chat, ChatDots, Send } from "react-bootstrap-icons";

import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { Clear_ChatBox, Getmeassge, Sendmeassge } from "../../store/actions/datacollection";
import { AutoLogin } from "../../store/actions/adminActions";
import { CircleSpinner, CubeSpinner } from "react-spinners-kit";
import { Mtime } from "../utils/reuseable";

const ChatConversation = (props) => {
  const dispatch = useDispatch();
  const [loading, setload] = useState(false);

  useEffect(() => {

    if (props.rommid) {
      dispatch(Getmeassge(props.rommid));
    }
  },[dispatch,props.rommid]);

  const Allmesssage = useSelector((data) => data.Messages);
  const[ CurrentMessages,setMessages]=useState([])
   useEffect(() => {

    if (Allmesssage && Allmesssage.data) {
    
      setMessages(Allmesssage.data.messsages);
    } 
  }, [Allmesssage]);
  const notifications = useSelector((value) => value.notification);


  useEffect(()=>{
const scrollableDiv = document.getElementById("chatroom");
if(scrollableDiv){
  scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
}

  })
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
   const scrollableDiv = document.getElementById("chatroom");


   const inputField = document.getElementById("myInput");

   // Clear the value of the input field
   inputField.value = "";

  // Set the scrollTop property to the maximum value to scroll to the bottom
  scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }
  }, [notifications]);

  const [message, setmessage] = useState("");

  return (
    <div className="mainroom">
    <>

  
    {
      props.rommid ?
      <div className="chatlayout">
      <div className="chatroom" id="chatroom">
        {CurrentMessages.length > 0 ? (
          CurrentMessages.map((data, index) => {
            return (
              <div className="messages" key={index}>
                {data.sender === props.sender ? (
                  <div className="me-sender">
                    <p className="me-senderp">{data.messsages}</p>
                    <p className="timesent">{Mtime(data.createdAt)}</p>
                  </div>
                ) : (
                  <div className="other-user">
                    <p className="me-senderp">{data.messsages}</p>
                    <p className="timesent">{Mtime(data.createdAt)}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="mycbox">No conversation Yet</p>
        )}
      </div>

      <div className="chatbtn">
        <div className="chatbox">
          <input id="myInput"
            className="chatbox_field"
            placeholder="Type a message "
            onChange={(data) => {
              setmessage(data.target.value);
            }}
          ></input>
        </div>
        <>
          {message === "" || message === " " ? (
            <div
              className="chatsubmit"
              onClick={() => {
                alert("type a message");
              }}
            >
              <span>Send </span>{" "}
            </div>
          ) : (
            <>
              {loading ? (
                <div
                  className="chatsubmit"
                  style={{ backgroundColor: "yellow" }}
                >
                  <CircleSpinner size={13} />
                </div>
              ) : (
                <div
                  className="chatsubmit"
                  onClick={() => {
                    dispatch(
                      Sendmeassge(props.sender, props.receiver, props.rommid, {
                        message: message,
                      })
                    );
                    setload(true);
                  }}
                >
                  <span>Send </span> <Send />{" "}
                </div>
              )}
            </>
          )}
        </>
      </div>
    </div>

      :<div className="chatlayout">
      <p className="mycbox"><span style={{marginRight:"10px"}}>My Chat Box</span>   <ChatDots size={25}/></p>
      <CubeSpinner/>

      </div>
    }
    </>

    <>

  
{
  props.rommid ?
  <div className="chatlayoutmobile"
  style={{minHeight:`${window.innerHeight-80}px`}}>
  <div className="chatroom" id="chatroom"
  style={{minHeight:`${window.innerHeight-140}px`}}>
    {CurrentMessages.length > 0 ? (
      CurrentMessages.map((data, index) => {
        return (
          <div className="messages" key={index}>
            {data.sender === props.sender ? (
              <div className="me-sender">
                <p className="me-senderp">{data.messsages}</p>
                <p className="timesent">{Mtime(data.createdAt)}</p>
              </div>
            ) : (
              <div className="other-user">
                <p className="me-senderp">{data.messsages}</p>
                <p className="timesent">{Mtime(data.createdAt)}</p>
              </div>
            )}
          </div>
        );
      })
    ) : (
      <p className="mycbox">No conversation Yet</p>
    )}
  </div>
  <div className="chatbtn">
    <div className="chatbox">
      <input id="myInput"
        className="chatbox_field"
        placeholder="Type a message "
        onChange={(data) => {
          setmessage(data.target.value);
        }}
      ></input>
    </div>
    <>
      {message === "" || message === " " ? (
        <div
          className="chatsubmit"
          onClick={() => {
            alert("type a message");
          }}
        >
          <span>Send </span>{" "}
        </div>
      ) : (
        <>
          {loading ? (
            <div
              className="chatsubmit"
              style={{ backgroundColor: "yellow" }}
            >
              <CircleSpinner size={13} />
            </div>
          ) : (
            <div
              className="chatsubmit"
              onClick={() => {
                dispatch(
                  Sendmeassge(props.sender, props.receiver, props.rommid, {
                    message: message,
                  })
                );
                setload(true);
              }}
            >
              <span>Send </span> <Send />{" "}
            </div>
          )}
        </>
      )}
    </>

  </div>
</div>
  :<div className="chatlayoutmobile"
   style={{minHeight:`${window.innerHeight-80}px`}}>
  <p className="mycbox"><span style={{marginRight:"10px"}}>My Chat Box</span>   <ChatDots size={25}/></p>
  <CubeSpinner/>

  </div>
}
</>
    </div>
   
  );
};

export default ChatConversation;
