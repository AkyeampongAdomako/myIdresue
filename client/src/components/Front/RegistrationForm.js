import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils/loaderView";
import { preRegister } from "../../store/actions/adminActions";
import { useNavigate } from "react-router-dom";
import { Justify } from "react-bootstrap-icons";

const MyForm = () => {
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
      if (notifications.success) {
        navigate("/");
      }
    }
  });

  const dispatch = useDispatch();
  const Formik = useFormik({
    initialValues: {
      fullname: "",

      username: "",
      email: "",
      password: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      fullname: Yup.string().required("field required"),

      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {
      if (value.password !== value.comfirmpass) {
        document.getElementById("errorspan").classList.add("showerror");
      } else {
        setload(true);
        dispatch(preRegister(value));
      }
    },
  });

  useEffect(() => {
    if (Formik.values.password === Formik.values.comfirmpass) {
      document.getElementById("errorspan").classList.remove("showerror");
    }
  });

  return (
    <div
      className="mainLayout"
      style={{ minHeight: `${window.innerHeight}px` }}
    >
      <h1>Join Us</h1>

      <div className="formsp">
        <form onSubmit={Formik.handleSubmit} className="myform">
          <p>
            <span style={{ color: "red", marginTop: "20px" }}>*</span> Fullname
          </p>
          <TextField
            style={{ backgroundColor: "rgb(208, 223, 247)", borderRadius:"5px" }}
            name="fullname"
            {...Formik.getFieldHelpers("fullname")}
            value={Formik.values.fullname}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.fullname && Boolean(Formik.errors.fullname)}
          ></TextField>

          <p>
            <span style={{ color: "red" }}>*</span> Email
          </p>
          <TextField
            style={{ backgroundColor: "rgb(208, 223, 247)",borderRadius:"5px" }}
            name="email"
            value={Formik.values.email}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.email && Boolean(Formik.errors.email)}
          ></TextField>
          <p>
            <span style={{ color: "red" }}>*</span> Password
          </p>
          <TextField
            name="password"
            style={{ backgroundColor: "rgb(208, 223, 247)" ,borderRadius:"5px"}}
            type="password"
            value={Formik.values.password}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={Formik.touched.password && Boolean(Formik.errors.password)}
          ></TextField>

          <p>
            <span style={{ color: "red" }}>*</span> Comfirm Password
          </p>
          <TextField
            style={{ backgroundColor: "rgb(208, 223, 247)",borderRadius:"5px" }}
            name="comfirmpass"
            type="password"
            value={Formik.values.comfirmpass}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            error={
              Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)
            }
          ></TextField>
          <span id="errorspan" className="errorspan">
            password must be the same.
          </span>

          <div></div>
          {loading ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircleSpinner color="aqua" />
            </div>
          ) : (
            <Button type="submit" className="btnlength">
              Register
            </Button>
          )}

          <div className="signin">
            <p>
              Already a member ?{" "}
              <span onClick={() => navigate("/user/login")}>Sign In</span>
            </p>
          </div>
        </form>
      </div>

      <div className="footer">
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

export default MyForm;
