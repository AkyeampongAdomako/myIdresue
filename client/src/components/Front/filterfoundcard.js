import React, { useEffect, useState, useMemo } from "react";


import { useDispatch, useSelector } from "react-redux";
import { useNavigate,useSearchParams } from "react-router-dom";
import TopNav from "../utils/pagenav";

import {Filtercards} from "../../store/actions/datacollection";
import LoaderView from "../utils/loaderView";
import { loaderAnim, showToastify } from "../utils/reuseable";
import VerifyCard from "./verifycardpage";
import Createroom from "./waitload";

const FilterPage = () => {
  
  const [showverify, setverify] = useState(false);
  const [createChat, setchat] = useState(false);
  const [card_id, setcard_id] = useState("");
  const navigate = useNavigate();
  const [SearchParams]=useSearchParams()


  const [loading, setloading] = useState(false);

  const searchresult=useSelector((item) =>item.filtercard
  )
  const keyword=SearchParams.get("token")


const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(Filtercards(keyword))
  },[dispatch,keyword])
  const Allresults = useMemo(()=>{
    if(searchresult && searchresult.data)
    {
    
     return searchresult.data
    }else {
      return []
    }

  },[searchresult])

  useEffect(()=>{
    if(searchresult && searchresult.data){
      loaderAnim("idresult");
    }
   
  })

  const Checkuser = useSelector((item) => item.authuser);
  return (
   <> {
      searchresult && searchresult.data ?
    
      <div
      className="mainLayoutb"
      style={{
        minHeight: `${window.innerHeight}px`,
      }}
    >
     <TopNav />
     {showverify ? (
          <VerifyCard setverify={setverify} card_id={card_id}  setchat={setchat}/>
        ) : null}

        {createChat ? 

        <Createroom/> : null}
      <div
        className="searccover"
      >
        <h1 className="searckey">Possible matches</h1>
      <>
        {

          searchresult && searchresult.data ?
          <div    className="missingreportedmi">
          
          
             {
        Allresults.length >0 ?
        Allresults.map((result,index)=>{
          return(
            <>
            <div className="body-tboxfi idresult" key={index}>
                            <div className="body-columnbox">
                              <p>{result.type}</p>
                            </div>
                            <div className="body-columnbox">
                              {" "}
                              <p>
                                {result.firstname} {result.middlename}{" "}
                                {result.lastname}
                              </p>
                            </div>
                            
                            <div className="body-columnbox">
                              {" "}
                              <p className="searcresult_h">
                                ID <span> {result.id_number}</span>{" "}
                              </p>
                            </div>
                         
                            <div className="body-columnbox">
                            <p>Possible match <span style={{color:" #110090",marginLeft:"10px"}} >{result.matchrate  || result.matchrate !==0 ? result.matchrate : "0"}%</span></p>
                            </div>
                            <div className="body-columnboxspa">
                              <span
                               className="verifybtn"
                                onClick={() => {
                                  if (Checkuser && Checkuser.account) {
                                    setverify(true);
                                    setcard_id(result._id);
                                  } else {
                                    showToastify(
                                      "SUCCESS",
                                      "Please Register and continue..."
                                    );
                                    navigate("/user/Signup");
                                  }
                                }}
                              >
                                Verify
                              </span>
                            </div>
                          </div>

     
        </>
          )

        })
        : <p className="searcresult_h"> No card Found for search {keyword}</p>
       }


       </div>
          :null
        }
      </> 
    
     
        
      
      
      </div>
      


 
      <div className="footer">
        <div className="frontitemhover">
          <p>
            Handcrafted by Akyeampong Adomako. All rights reserved
            <span style={{ color: "green" }}> @ </span> 2023
          </p>
        </div>
      </div>
    </div>  :

      <LoaderView/>
    }
   
    </>
  );
};

export default FilterPage;
