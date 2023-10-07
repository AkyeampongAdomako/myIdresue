import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";
import { CircleSpinner } from "react-spinners-kit";
import { TextField, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import { HandIndex } from "react-bootstrap-icons";
import { ReportCards, Matchcards } from "../../store/actions/datacollection";
import { FormatDate, loaderAnim, searchIfFound } from "../utils/reuseable";
import { AutoLogin } from "../../store/actions/adminActions";

const ReportForm = (props) => {
  const notifications = useSelector((value) => value.notification);
  const [loading, setload] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (notifications && notifications.notice) {
      setload(false);
      if (notifications.success) {
        dispatch(AutoLogin());
      }
    }
  });

  const dispatch = useDispatch();

  const Checkuser = useSelector((item) => item.authuser);

  useEffect(() => {
    if (Checkuser?.account) {
      dispatch(Matchcards(Checkuser.account._id));
    }
  }, [dispatch]);

  const Allmatchcards = useSelector((item) => item.matchcards);

  const getAllmatch = useMemo(() => {
    if (Allmatchcards?.data) {
      return Allmatchcards.data;
    }
  }, [Allmatchcards]);
  const mycards = useMemo(() => {
    if (Checkuser && Checkuser.account) {
      return Checkuser.account.myreportedcards;
    }
    return [];
  }, [Checkuser]);

  useEffect(() => {
    if (mycards && mycards.length > 0) {
      loaderAnim("idresult");
    }
  });
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
      id_number: Yup.string().required("comfirm id numer"),
      date: Yup.string().required("field required"),
    }),
    onSubmit: (value) => {
      setload(true);
      dispatch(
        ReportCards(
          value,
          Checkuser && Checkuser.account ? Checkuser.account._id : ""
        )
      );
    },
  });

  return (
   
    <div className="userdetail">
  <p className="header"> My Lost cards </p>
      <>
        {mycards && mycards.length > 0 ? (
          <>
          <div className="missingreported">
            <div className="headert">
              <div className="header-column">Card Type</div>
              <div className="header-column">Firstname</div>

              <div className="header-column">Middlename</div>
              <div className="header-column">Surname</div>
              <div className="header-column">Date of Birth</div>
              <div className="header-column">Number of found Cards</div>
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
                    {searchIfFound(getAllmatch,item).length}
                  </div>
                  <div className="body-column">
              <>
              {
                    item.cardfound ?
                    <span>Card found</span>
                    :
                    <>
                      {
                        searchIfFound(getAllmatch,item).length > 0 ?
                        <>


                        {
                          searchIfFound(getAllmatch,item).length === 1 ?

                          <span onClick={()=>{
                          props.setverify(true)
                          props.setcard_id(searchIfFound(getAllmatch,item).data[0]._id)
                        }}>Verify now</span>  
                        :
                        <span onClick={()=>{
                          navigate(`/mycards/possiblematch/?token=${item._id}`)
                          props.setverify(true)
                        }}>Verify now</span>  
                        }
                    
                        </>
:
<span>No Action</span>

                      }
                    </>
                  }
              </>  
                   
                  </div>
                </div>
              );
            })}
          </div>
          <div className="missingreportedm">
         

         {mycards.map((item, index) => {
           return (
            <div className="body-tbox idresult" key={index}>
                  <div className="body-columnbox">{item.type}</div>
                  <div className="body-columnbox">{item.firstname}</div>
                  <div className="body-columnbox">{item.middlename}</div>
                  <div className="body-columnbox">{item.lastname}</div>
                  <div className="body-columnbox">{FormatDate(item.date)}</div>
                  <div className="body-columnboxspan" style={{color:"green"}}>
                 Possible match   {searchIfFound(getAllmatch,item).length}
                  </div>  
                  <div className="body-columnboxspan">
              <>
              {
                    item.cardfound ?
                    <span>Card found</span>
                    :
                    <>
                      {
                        searchIfFound(getAllmatch,item).length > 0 ?
                        <>


                        {
                          searchIfFound(getAllmatch,item).length === 1 ?

                          <span onClick={()=>{
                          props.setverify(true)
                          props.setcard_id(searchIfFound(getAllmatch,item).data[0]._id)
                        }}>Verify now</span>  
                        :
                        <span onClick={()=>{
                          navigate(`/mycards/possiblematch/?token=${item._id}`)
                          props.setverify(true)
                        }}>Verify now</span>  
                        }
                    
                        </>
:
<span>No Action</span>

                      }
                    </>
                  }
              </>  
                   
                  </div>
                </div>
           );
         })}
       </div>
          </>
        ) : (
          <div style={{ marginBottom: "25px" }}>
            <p>
              Report your lost card now , use will find a match and notify you
            </p>
          </div>
        )}
      </>




















    <p className="header">
      Found someone missing Card ? Post details here{" "}
      <span>
        <HandIndex />
      </span>
    </p>
    <form onSubmit={Formik.handleSubmit} className="myform-report">
        
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
     
            {" "}
            <p>
              <span style={{ color: "red" }}>*</span> Middlename
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
        
            <p>
              <span style={{ color: "red" }}>*</span> Date of birth
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                style={{ width: "90%" }}
                name="date"
                onBlur={Formik.handleBlur}
                error={Formik.touched.date && Boolean(Formik.errors.date)}
                onChange={(item) => {
                  Formik.setFieldValue("date", new Date(item));
                }}
              />
            </LocalizationProvider>
      

        <div className="sub-btn">
          {loading ? (
            <CircleSpinner color="aqua" />
          ) : (
            <Button type="submit">Post Card</Button>
          )}
        </div>
      </form>


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
export default ReportForm;
