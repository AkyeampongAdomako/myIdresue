import React, { useEffect, useState, useReducer } from "react";
import {
  ArrowLeftShort,
  ArrowRightShort,
  HandIndexFill,
  Person,
  Quote,
} from "react-bootstrap-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';  
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TopNav from "../utils/pagenav";
import Typed from "typed.js";
import { IconButton } from "@mui/material";

import { Clear_SearchBox } from "../../store/actions/datacollection";

const Home = () => {
  useEffect(()=>{
    AOS.init();
  },[])
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);
  const [imagec, setimage] = useState(
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197981/Ghana-Card-Sample-1536x560_vrqyid.png"
  );

  const navigate = useNavigate();

  const howItWorks = [
    {
      header: "Be a Hero, Help Others",
      msg: " If you've found an ID card, report the details in our app. We'll cross-check it with our database and alert the owner if it's a match,  Your good deed could save someone's day!",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281972/losttem1_jejhwv.jpg",
    },
    {
      header: "Find your lost card",
      msg: "If you've lost your ID card, simply post the details on our platform. We'll help spread the word and notify you if a match is found",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281951/driverlost_afm1u8.jpg",
    },
    {
      header: "Secure Verification Process",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694281784/found1_rdaypj.jpg",
      msg: "For security, we'll perform a quick verification to ensure the ID card goes to its rightful owner. Once verified, you can chat with the finder and arrange the return",
    },
    {
      header: "Direct Chat with the Finder",
      msg: "Once verified, you can chat directly with the finder of your lost ID card. Arrange a safe and convenient way to get it back",
      image:
        "https://res.cloudinary.com/dewkx66gl/image/upload/v1694283758/exchanges_zcra5k.jpg",
    },
  ];
  const [instructions, setinstruction] = useState(howItWorks[0]);
  const Asset = [
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197707/spaces_-Ma8gvgl1y7j-M_RfiTg_uploads_OKOunCJyNRVtdr1LYPvS_image_qdbihh.webp",
    "https://res.cloudinary.com/dewkx66gl/image/upload/v1694197695/spaces_-Ma8gvgl1y7j-M_RfiTg_uploads_EiIYtfrIyLMwgkgLhKGo_image_wlnglf.webp",
  ];
  const TestimonyArray = [
    "I lost my ID card and was really worried, but then I found the IDRescue app, and it saved the day! It was super easy to use. I just added my ID card info and reported it as lost",
    `The best part was the IDRescue ,It helped me find my lost ID card by connecting me with someone who found it nearby. So grateful for that!`,

    "Thank you, IDRescue, for simplifying a once-dreaded process and giving people like me peace of mind in times of distress.",
  ];

  const TestimonyName = ["James Mensah", "Godfred Nyame", "Kofi Adams"];

  const [rates, set_rate] = useState(TestimonyArray[0]);
  const [rateN, setratename] = useState(TestimonyName[0]);
  const [counts, setcount] = useState(0);
  const changeRateF = () => {
    if (counts === TestimonyArray.length - 1) {
      setcount(0);
    } else {
      setcount(counts + 1);
    }

    setTimeout(() => {
      set_rate(TestimonyArray[counts]);
      setratename(TestimonyName[counts]);
    }, 100);
  };

  const changeRateP = () => {
    if (counts === 0) {
      setcount(TestimonyArray.length - 1);
    } else {
      setcount(counts - 1);
    }

    setTimeout(() => {
      set_rate(TestimonyArray[counts]);
      setratename(TestimonyName[counts]);
    }, 100);
  };
  useEffect(() => {
    let countnum = 0;
    setInterval(() => {
      setinstruction(howItWorks[countnum]);
      countnum = countnum + 1;
      if (countnum === howItWorks.length) {
        countnum = 0;
      }
    }, 8000);
  }, []);

  useEffect(() => {
    let countnum = 0;
    setInterval(() => {
      setimage(Asset[countnum]);
      countnum = countnum + 1;
      if (countnum === 2) {
        countnum = 0;
      }
    }, 5000);
  }, []);

  useEffect(() => {
    const typed = new Typed("#welcom_p", {
      strings: [
        "Welcome to IDRescue, the ultimate solution for lost ID card recovery! Have you lost your ID card? Or perhaps you've found one? We're here to help you reunite with your lost ID card or connect with its rightful owner",
      ],
      typeSpeed: 10,
      showCursor: false,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const [searchkey, setsearchkey] = useState("");

  return (
    <div className="mainLayoutb">
      <div className="mainLayoutcover"
        style={{ minHeight: `${window.innerHeight}px` }}>
        <TopNav />
        <div className="landingpage">
          <div className="leftland">
            <h1>
              Find, Post, Reunite with Real Owner - Let's Save the Stress .
            </h1>
            <div
              style={{
                width: "100%",
                justifyContent: "left",
                alignItems: "start",
                height: "100px",
              }}
            >
              <p id="welcom_p"></p>
            </div>
            <div className="searchbox">
              <input
                className="searchbox_field"
                placeholder="find lost Id card .eg Type card holder name and Id number"
                onChange={(data) => {
                  setsearchkey(data.target.value);
                }}
              ></input>
              <span
                onClick={() => {
                  if (searchkey.trim().length > 1) {
                    dispatch(Clear_SearchBox());
                    setTimeout(() => {
                      navigate(`findmycard/?keyword=${searchkey}`);
                    }, 100);
                  }
                }}
                className="searchbtn"
                style={{
                  backgroundColor: `${
                    searchkey.trim().length > 1 ? "" : "rgb(105, 117, 117)"
                  }`,
                }}
              >
                Find ID
              </span>
            </div>
          </div>
          <div className="rightland">
            <div className="image_hover" 
            data-aos="zoom-out"
            
            >
              <div
                className="homeimage"
                style={{ backgroundImage: `url(${imagec})` }}
              ></div>
            </div>
            {Checkuser && Checkuser.account ? null : (
              <div className="join-us" data-aos="zoom-in-up">
                <p>
                  Join a Community of Responsible Citizens{" "}
                  <span className="hand-index">
                    <HandIndexFill className="index" />
                  </span>{" "}
                  <span
                    className="register-btn"
                    onClick={() => {
                      navigate("/user/Signup");
                    }}
                  >
                    Register
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="how-it-works"
        style={{
          minHeight: `${window.innerHeight}px`,
          backgroundImage: `url(${instructions.image})`,
        }}
      >
        <div
          className="h_left"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <h1>{instructions.header}</h1>
          <p>{instructions.msg}</p>
        </div>
        <div className="h_right"
           style={{
            minHeight: `${window.innerHeight}px`,
          }}>
          <span> </span>
          <img
            className="ghanaimg"
            alt=""
            src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694368079/Pngtree_ghana_flag_png_free_vector_6848830_wz6f2m.png"
          ></img>
        </div>
      </div>

      <div
        className="how-it-worksm"
        style={{
          minHeight: `${window.innerHeight}px`,
          backgroundImage: `url("https://res.cloudinary.com/dewkx66gl/image/upload/v1694283758/exchanges_zcra5k.jpg")`,
        }}
      >
        <div
          className="h_left"
          style={{
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <h1 >{instructions.header}</h1>
          <p>{instructions.msg}</p>
        </div>
   
      </div>

      <div
        className="testimoniesmobile"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="review-header" data-aos="fade-up"
     data-aos-duration="3000">
          <div>
            {" "}
            <p>User Reviews</p>
          </div>

          <div className="actionbtn">
            <span>
              <IconButton
                onClick={() => {
                  changeRateP();
                }}
              >
                <ArrowLeftShort />{" "}
              </IconButton>
            </span>
            <span>
              <IconButton
                onClick={() => {
                  changeRateF();
                }}
              >
                <ArrowRightShort />
              </IconButton>
            </span>
          </div>
        </div>
        <div className="testimony_box" data-aos="fade-up"
     data-aos-duration="3000">
          <div className="show-review">
            <p>
              <span className="quote-css">
                <Quote />
              </span>
              {rates}
              <span className="quote-css">
                <Quote />
              </span>
            </p>
            <div className="postedby">
              <Person />
              <span>{rateN}</span>
            </div>
          </div>
        </div>

        <div className="partnersmobile">
          <h1 data-aos="fade-up"
     data-aos-duration="3000">Partners</h1>
          <div className="layout-partners">
            <img
            data-aos="fade-up"
     data-aos-duration="3000"
              className="partner-img"
              alt=""
              src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694365414/pngwing.com_5_wyt6ua.png"
            ></img>
          </div>
        </div>
      </div>

      <div
        className="testimonies"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <div className="review-header" data-aos="fade-up"
     data-aos-duration="2000">
          <div>
            {" "}
            <p>User Reviews</p>
          </div>
        </div>

        <div className="testimony_box" data-aos="fade-up"
     data-aos-duration="3000">
          <div className="show-review">
            <p>
              <span className="quote-css">
                <Quote />
              </span>
              I lost my ID card and was really worried, but then I found the
              IDRescue app, and it saved the day! It was super easy to use. I
              just added my ID card info and reported it as lost.
              <span className="quote-css">
                <Quote />
              </span>
            </p>
            <div className="postedby">
              <Person />
              <span>James mensah</span>
            </div>
          </div>
          <div className="show-review">
            <p>
              <span className="quote-css">
                <Quote />
              </span>
              The best part was the "IDRescue." It helped me find my lost ID
              card by connecting me with someone who found it nearby. So
              grateful for that!
              <span className="quote-css">
                <Quote />
              </span>
            </p>
            <div className="postedby">
              <Person />
              <span>Godfred Nyame</span>
            </div>
          </div>
          <div className="show-review">
            <p>
              <span className="quote-css">
                <Quote />
              </span>
              Thank you, IDRescue, for simplifying a once-dreaded process and
              giving people like me peace of mind in times of distress.
              <span className="quote-css">
                <Quote />
              </span>
            </p>
            <div className="postedby">
              <Person />
              <span>Kofi Adams</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="partners"
        style={{ minHeight: `${window.innerHeight}px` }}
      >
        <h1 
        data-aos="fade-up"
     data-aos-duration="3000">Partners</h1>
        <div className="layout-partners">
          <img
          data-aos="fade-up"
     data-aos-duration="3000"
            className="partner-img"
            alt=""
            src="https://res.cloudinary.com/dewkx66gl/image/upload/v1694365414/pngwing.com_5_wyt6ua.png"
          ></img>
        </div>
      </div>

      <div className="footer"
     >
        <div className="frontitemhover">
          <p>
            Handcrafted by Akyeampong Adomako. All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
