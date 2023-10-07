import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search,Person } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckProfile } from "./responsehover";
import { CheckTopAds } from "./reuseable";

const TopNav = (props) => {
  const navigate = useNavigate();
  const [searchvalue, setSearchValue] = useState("");
  const Checkuser = useSelector((item) => item.authuser);
  useEffect(() => {
   // CheckProfile(props.setprofile);
  });
  useEffect(() => {
    CheckTopAds(props.topads);
  });
 
  const handlesearchbox = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="navbar" >
      <div className="navcontainer">
        <div className="sitename">
        <div className="companyn">
            {" "}
            <img
                   onClick={()=>{
          navigate("/")
        }}
              alt=""
              src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694980078/AdobeStock-GeSskIDF7W_udlkux.jpg"
            />{" "}
            <p 
                  onClick={()=>{
          navigate("/")
        }}

            style={{ marginLeft: "10px" }}>IDRescue</p>
          </div>
        </div>
      </div>
      <div className="navcontainerlog">
      {Checkuser && Checkuser.auth ? (
          <> 
            <div className="uavatar" onClick={() => navigate("/user/dashboard")}>
   <p> <span><Person size={22}/> </span> </p>   
            {
              Checkuser && Checkuser.account ?   
              <p className="presshoverAv">
             { (Checkuser.account.fullname).toUpperCase()}
              </p>
              :null 
             }   
            </div>
          </>
        ) : (
          <div className="userlog">

            <div className="signup">
              {" "}
              <span onClick={() => navigate("/user/Signup")}>Join Now</span>
            </div>
            <div className="logincss">
              {" "}
              <span style={{marginLeft:"15px"}} onClick={() => navigate("/user/login")}>Login</span>
            </div>
          </div>
        )}
            
      </div>
    </div>
  );
};

export default TopNav;
