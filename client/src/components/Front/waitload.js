import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AutoLogin } from "../../store/actions/adminActions";
import { CircleSpinner } from "react-spinners-kit";

const Createroom = (props) => {
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  setTimeout(()=>{
navigate("/conversation/chatroom")
  },3000)
  
  return (
    <div className="createchatlayout"
        style={{
          minHeight: `${window.innerHeight}px`,
        }}>
  
        <p>Just a Minute</p>
        <p>Creating a chat room</p>
        <CircleSpinner size={13}

/>
      
       
  
    </div>
  );
};
export default Createroom;
