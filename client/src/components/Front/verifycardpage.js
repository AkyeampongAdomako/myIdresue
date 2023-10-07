import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CircleSquare, X } from "react-bootstrap-icons";
import { AutoLogin } from "../../store/actions/adminActions";
import { isValid, parse } from 'date-fns';
import { CreateChat, Verifycard,Clear_CreateChat } from "../../store/actions/datacollection";

import { CircleSpinner } from "react-spinners-kit";
const VerifyCard = (props) => {
const dispatch = useDispatch();


  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);

  const navigate = useNavigate();
  const Checkuser = useSelector((item) => item.authuser);
const connected=useSelector((item) => item.connection_c)

  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
      
     
      if (notifications.success) {
if(!connected){
  dispatch(CreateChat(Checkuser && Checkuser.account ? Checkuser.account._id :"",props.card_id ));
  dispatch(Clear_CreateChat())
}
props.setchat(true);
        props.setverify(false);
        dispatch(AutoLogin());

      }
    }
  },[notifications]);

  

const [date,setdate]=useState()

const checkValidDate = (dateString) => {
  const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date());
  return isValid(parsedDate);
};
  return (
    <div
      className="verifylayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
      <div className="verifypagep">
        <div className="closeverify_p">
          <div className="closex">
            {" "}
           <IconButton onClick={()=>{
            props.setverify(false)
           }}>   <X color="black" size={20} /></IconButton>
        
          </div>
        </div>
        <div className="verify_main">
        <div
        className="verify_image"
        style={{backgroundImage:`url('https://res.cloudinary.com/dewkx66gl/image/upload/v1694980105/pngwing.com_8_zyshlt.png')`}}>
        </div>
          <div className="verify_message">
            <p>
              Please verify your birth of birth on the card before contacting founder.
            </p>

            <div className="verifybox">
              <input
                className="searchbox_field"
                placeholder="MM/DD/YYYY"
                onChange={(data)=>{
                  setdate(data.target.value)
                }}
              ></input>
            </div>
            {
              checkValidDate(date) ?
              <>
                {
                  loading ?
                  <div className="verifybtn-s">

                    <CircleSpinner size={13}

                    />
                  </div>
                  :
                  <div className="verifybtn-s"
              onClick={()=>{
                setload(true)
                dispatch(Verifycard({cardId:props.card_id,date:date}))
              }}><span>Verify card</span></div>
                }
              </>
           :
              <p>Enter valid date</p>
            }
           

          
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyCard;
