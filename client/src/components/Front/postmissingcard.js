import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HandIndex, Image } from "react-bootstrap-icons";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Addcards } from "../../store/actions/datacollection";
import { AutoLogin } from "../../store/actions/adminActions";
import { FormatDate, loaderAnim } from "../utils/reuseable";

const PostFoundCard = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const Checkuser = useSelector((item) => item.authuser);


  const mycards = useMemo(() => {
    if (Checkuser && Checkuser.account) {
      return Checkuser.account.myfoundcards;
    }
    return [];
  }, [Checkuser]);

  useEffect(() => {
    if (mycards && mycards.length > 0) {
      loaderAnim("idresult");
    }
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);

      dispatch(AutoLogin());
    }
  });

  useEffect(() => {
    dispatch(AutoLogin());
  }, [dispatch]);

  const Formik = useFormik({
    initialValues: {
      type: "",
      firstname: "",
      lastname: "",
      middlename: "",
      id_number: "",
      date: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstname: Yup.string().required("field required"),
      type: Yup.string().required("required"),
      id_number: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {
      setload(true);
      dispatch(
        Addcards(
          value,
          Checkuser && Checkuser.account ? Checkuser.account._id : ""
        )
      );
    },
  });

  const datnow = new Date();
  const handleChange = () => {};
  return (
    <div className="userdetail">
      <p className="header">
        Found someone missing Card ? Post details here{" "}
        <span>
          <HandIndex />
        </span>
      </p>
      <form onSubmit={Formik.handleSubmit} className="myform-report">
        <div className="formlayout">
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Card Type
            </p>
            <Select
              style={{ width: "90%" }}
              name="type"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Formik.values.type}
              label="Card Type"
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.type && Boolean(Formik.errors.type)}
              {...Formik.getFieldHelpers("type")}
            >
              <MenuItem value="Ghana Card">Ghana Card</MenuItem>
              <MenuItem value="National Health Insurance Card">
                National Health Insurance Card
              </MenuItem>
              <MenuItem value="Credit/ Debit cards">
                Credit/ Debit cards
              </MenuItem>
              <MenuItem value="Drivers license Card">
                {" "}
                Drivers license Card
              </MenuItem>
            </Select>
          </div>
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Firstname
            </p>
            <TextField
              style={{ width: "90%" }}
              name="firstname"
              value={Formik.values.firstname}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.firstname && Boolean(Formik.errors.firstname)
              }
            ></TextField>
          </div>
        </div>

        <div className="formlayout">
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Middlenam
            </p>
            <TextField
              style={{ width: "90%" }}
              name="middlename"
              value={Formik.values.middlename}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.middlename && Boolean(Formik.errors.middlename)
              }
            ></TextField>
          </div>
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Surname
            </p>
            <TextField
              style={{ width: "90%" }}
              name="lastname"
              value={Formik.values.lastname}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={Formik.touched.lastname && Boolean(Formik.errors.lastname)}
            ></TextField>
          </div>
        </div>

        <div className="formlayout">
          <div className="formlayout-p">
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> ID number
            </p>
            <TextField
              style={{ width: "90%" }}
              name="id_number"
              value={Formik.values.id_number}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              error={
                Formik.touched.id_number && Boolean(Formik.errors.id_number)
              }
            ></TextField>
          </div>
          <div className="formlayout-p">
            <p>
              <span style={{ color: "red" }}>*</span> Date of birth
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="date"
                onBlur={Formik.handleBlur}
                error={Formik.touched.date && Boolean(Formik.errors.date)}
                onChange={(item) => {
                  Formik.setFieldValue("date", new Date(item));
                }}
              />
            </LocalizationProvider>
          </div>
        </div>

        <div className="sub-btn">
          {loading ? (
            <CircleSpinner color="aqua" />
          ) : (
            <>
              <Button type="submit">Post Card</Button>
             
            </>
          )}
        </div>
      </form>

      <p className="headerm"> Individuals Missing cards Found</p>
      {mycards && mycards.length > 0 ? (
        <>
        <div className="missingreported">
          <div className="headert">
            <div className="header-column">Card Type</div>
            <div className="header-column">Firstname</div>

            <div className="header-column">Middlename</div>
            <div className="header-column">Surname</div>
            <div className="header-column">Date of Birth</div>
            <div className="header-column">Status</div>
            <div className="header-column">Action</div>
          </div>

          {mycards.map((item, index) => {
            return (
              <div className="body-t" key={index}>
                <div className="body-column">{item.type}</div>
                <div className="body-column">{item.firstname}</div>
                <div className="body-column">{item.middlename}</div>
                <div className="body-column">{item.lastname}</div>
                <div className="body-column">{FormatDate(item.date)}</div>
                <div className="body-column">
                  {item.possibleowner ? "In conversation" : "Owner not found"}
                </div>
                <div className="body-column">
                  <span>Not Yet</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="missingreportedm">
         

          {mycards.map((item, index) => {
            return (
              <div className="body-tbox idresult" key={index}>
                <div className="body-columnbox " style={{fontWeight:"bold"}}>{item.type}</div>
              
                <div className="body-columnbox">{item.firstname} {" "} {item.middlename} { " "} {item.lastname}</div>
               
                <div className="body-columnbox">{FormatDate(item.date)}</div>
                <div className="body-columnbox">{item.id_number}</div>
                <div className="body-columnbox">
                  {item.possibleowner ? "In conversation" : "Owner not found"}
                </div>
                <div className="body-columnboxspan">
                  <span>Not Yet</span>
                </div>
              </div>
            );
          })}
        </div>
        </>
      
      ) : (
        <div>No found cards yet</div>
      )}

      <p className="headerm">
        Found someone missing Card ? Post details here{" "}
        <span>
          <HandIndex />
        </span>
      </p>

      <form onSubmit={Formik.handleSubmit} className="myform-reportm">
        <p>
          <span style={{ color: "red" }}>*</span> Card Type
        </p>
        <Select
          style={{ width: "90%" }}
          name="type"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Formik.values.type}
          label="Card Type"
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.type && Boolean(Formik.errors.type)}
          {...Formik.getFieldHelpers("type")}
        >
          <MenuItem value="Ghana Card">Ghana Card</MenuItem>
          <MenuItem value="National Health Insurance Card">
            National Health Insurance Card
          </MenuItem>
          <MenuItem value="Credit/ Debit cards">Credit/ Debit cards</MenuItem>
          <MenuItem value="Drivers license Card">
            {" "}
            Drivers license Card
          </MenuItem>
        </Select>

        <p>
          <span style={{ color: "red" }}>*</span> Firstname
        </p>
        <TextField
          style={{ width: "90%" }}
          name="firstname"
          value={Formik.values.firstname}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.firstname && Boolean(Formik.errors.firstname)}
        ></TextField>

        <p>
          <span style={{ color: "red" }}>*</span> Middlenam
        </p>
        <TextField
          style={{ width: "90%" }}
          name="middlename"
          value={Formik.values.middlename}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.middlename && Boolean(Formik.errors.middlename)}
        ></TextField>

        <p>
          <span style={{ color: "red" }}>*</span> Surname
        </p>
        <TextField
          style={{ width: "90%" }}
          name="lastname"
          value={Formik.values.lastname}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.lastname && Boolean(Formik.errors.lastname)}
        ></TextField>

        <p>
          <span style={{ color: "red" }}>*</span> ID number
        </p>
        <TextField
          style={{ width: "90%" }}
          name="id_number"
          value={Formik.values.id_number}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.id_number && Boolean(Formik.errors.id_number)}
        ></TextField>
        <p>
          <span style={{ color: "red" }}>*</span> Date of birth
        </p>
        <div className="sub-btn">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            name="date"
            onBlur={Formik.handleBlur}
            error={Formik.touched.date && Boolean(Formik.errors.date)}
            onChange={(item) => {
              Formik.setFieldValue("date", new Date(item));
            }}
          />
        </LocalizationProvider>
        </div>

        

        <div className="sub-btn">
          {loading ? (
            <CircleSpinner color="aqua" />
          ) : (
            <>
              <Button type="submit">Post Card</Button>
           
            </>
          )}
        </div>
      </form>
    </div>
  );
};
export default PostFoundCard;
