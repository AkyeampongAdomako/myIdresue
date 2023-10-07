import React, { useEffect, useState, useReducer } from "react";
import {
  ChatDots,
  
  Person,
  Postcard,
  PostcardFill,
  XLg
} from "react-bootstrap-icons";


import { useNavigate } from "react-router-dom";

import PostfoundCard from "./postmissingcard";
import { IconButton } from "@mui/material";
import ProfileNav from "../utils/profileNav";
import { useDispatch } from "react-redux";
import { Signout } from "../../store/actions/adminActions";


const FoundACard = () => {  
  
  const dispatch=useDispatch()
  const [showmennu, setmenu] = useState(false);

  const navigateTo=useNavigate();


  return (
    <>
            {
      showmennu ?
      <div
        className="mainmenu"
        style={{ minHeight: `${window.innerHeight + 100}px` ,width:`${window.innerWidth}px`}}
      >
        <div
          className="menu_left"
          style={{ minHeight: `${window.innerHeight }px` }}
        >
                <div className="content-nav">
                <p
               
                  onClick={()=>navigateTo("/user/dashboard")}
                >
                  {" "}
                  <Person size={25} />
                  <span> Over View</span>
                </p>
                <p

onClick={()=>navigateTo("/user/postcard")}
style={{
                    backgroundColor: "#E5EFF9",
                  }}
                
                >
                  {" "}
                  <PostcardFill size={20} />
                  <span> Found a missing Card </span>
                </p>
                <p 
                onClick={()=>navigateTo("/user/reportmymissincard")}>
                  <Postcard size={20} /> <span> Report my Missing card</span>
                </p>
                <p     onClick={()=>navigateTo("/conversation/chatroom")}>
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
          style={{ minHeight: `${window.innerHeight }px` }}
        >
     
            <span  className="menu_right_span"><IconButton
            onClick={()=>{
              setmenu(false)
            
            }}><XLg color="white" size={25}/> </IconButton></span>
        </div>
      </div> 
      :null
    }
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
         
         <ProfileNav setmenu={setmenu}/>
     

         
          <div
            className="dashlayout"
            style={{
              minHeight: `${window.innerHeight}px`,
            }}
          >
            <div className="dashleft">
            <div className="content-nav">
                <p
               
                  onClick={()=>navigateTo("/user/dashboard")}
                >
                  {" "}
                  <Person size={25} />
                  <span> Over View</span>
                </p>
                <p

onClick={()=>navigateTo("/user/postcard")}
style={{
                    backgroundColor: "#E5EFF9",
                  }}
                
                >
                  {" "}
                  <PostcardFill size={20} />
                  <span> Found a missing Card </span>
                </p>
                <p 
                onClick={()=>navigateTo("/user/reportmymissincard")}>
                  <Postcard size={20} /> <span> Report my Missing card</span>
                </p>
                <p     onClick={()=>navigateTo("/conversation/chatroom")}>
                  <ChatDots size={20} /> <span> Chat rooms</span>
                </p>
              </div>
              <p className="btn-signout"
               onClick={()=>{
      
                 dispatch(Signout());

                 setTimeout(()=>{
                  navigateTo("/")
                },500)
               

               }}>Sign Out</p>
            </div>
            <div className="dashright">
                <PostfoundCard/>
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

export default FoundACard;
