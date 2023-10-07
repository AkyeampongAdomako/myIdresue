import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Search, Person, List } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CheckProfile } from "./responsehover";
import { CheckTopAds } from "./reuseable";

const ProfileNav = (props) => {
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
    <div className="navbar">
      <div className="navcontainer">
        <div className="sitename">
          <div className="companyn">
            {" "}
            <img
              onClick={() => {
                navigate("/");
              }}
              alt=""
              src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694980078/AdobeStock-GeSskIDF7W_udlkux.jpg"
            />{" "}
            <p
              onClick={() => {
                navigate("/");
              }}
              style={{ marginLeft: "10px" }}
            >
              IDRescue
            </p>
          </div>
        </div>
      </div>
      <div className="navcontainerlog">
        {Checkuser && Checkuser.auth ? (
          <>
            <div className="uavatar"
             onClick={() => {
                      props.setmenu(true);
                     
                    }}>

            
              {Checkuser && Checkuser.account ? <>
                <p className="presshoverAv">
                  {Checkuser.account.fullname.toUpperCase()}
                </p>
                <p className="presshoverAvmobile">
                <List size={22} />
                </p>
              </> : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileNav;
