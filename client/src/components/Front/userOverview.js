import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormatDate } from "../utils/reuseable";
import LoaderView from "../utils/loaderView";
import { IconButton } from "@mui/material";
import { XLg } from "react-bootstrap-icons";

const UserProFile = () => {
  const Checkuser = useSelector((item) => item.authuser);

  return (
    <>
      <div>
        <div className="my-details">
          <>
            {Checkuser && Checkuser.account ? (
              <h1>{Checkuser.account.fullname}</h1>
            ) : null}
          </>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {Checkuser && Checkuser.account ? (
              <p className="mobilev">{Checkuser.account.email}</p>
            ) : null}

            <p>
              {" "}
              Join since{" "}
              <>
                {Checkuser &&
                Checkuser.account &&
                Checkuser.account.createdAt ? (
                  <span>{FormatDate(Checkuser.account.createdAt)}</span>
                ) : null}
              </>
            </p>
          </div>
          <p>
            Number of Items found :{" "}
            {Checkuser &&
            Checkuser.account &&
            Checkuser.account.myfoundcards ? (
              <span>{Checkuser.account.myfoundcards.length}</span>
            ) : null}
          </p>
          <p>
            {" "}
            Active conversations :{" "}
            <>
              {Checkuser && Checkuser.account && Checkuser.account.chatroom ? (
                <span>{Checkuser.account.chatroom.length}</span>
              ) : null}
            </>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserProFile;
