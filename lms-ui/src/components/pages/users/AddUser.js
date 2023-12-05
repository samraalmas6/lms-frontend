import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "../../styles/AddUser.module.css";
import UploadPicture from "../../content/UploadPicture";
import Select from "react-select";
import countryList from "react-select-country-list";
import emailjs from "@emailjs/browser";
import * as XLSX from "xlsx";
import ExcelExportData from "../../hooks/ExcelExportData";
import ExportExcel from "../../content/Excelexport";
import Swal from "sweetalert2";
import { element } from "prop-types";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

function AddUser() {
  const excelFile = useRef();
  const [showNameEditBtn, setShowNameEditBtn] = useState(false);
  const [nameEdit, setNameEdit] = useState("");
  const [showErrorCol, setShowErrorCol] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [userType, setUserType] = useState("");
  const [team, setTeam] = useState("");
  const [teamData, setTeamData] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);

  const [country, setCountry] = useState([{ value: "PK", label: "Pakistan" }]);
  const options = useMemo(() => countryList().getData(), []);
  const [errors, setErros] = useState({});
  const [registeredErrors, setRegisteredErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [excelUsers, setExcelUsers] = useState([]);
  const [excelObj, setExcelObj] = useState([]);
  useEffect(() => emailjs.init("739xGz6oDs9E1tq_w"), [0]);

  useEffect(() => {
    if (team.length === 0) {
      document.getElementById("react-select-3-placeholder").innerHTML =
        "Select Team (optional)";
    }
  }, [team]);

  useEffect(() => {
    const getAllTeams = () => {
      fetch("http://127.0.0.1:8000/teams_list_data/", {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log(result);
            setTeamData(result);
            setTeamOptions(
              result.map((team) => {
                return { value: team.name, label: team.name };
              })
            );
          });
        } else {
          console.log(response);
        }
      });
    };
    getAllTeams();
  }, [0]);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChnage = (e) => {
    setLastName(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTeam = (selectedOption) => {
    setTeam(selectedOption);
  };
  console.log("select team", team);
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const changeHandler = (value) => {
    setCountry(value);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else if (/^\d/.test(values.email)) {
      errors.email = "Email should not contain number in start";
    }
    if (!values.firstName) {
      errors.firstName = "First Name is required";
    } else if (
      /[!@#$%&?]/g.test(values.firstName) ||
      /\d/.test(values.firstName)
    ) {
      errors.firstName =
        "First Name should not contain numbers or any special character";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    } else if (
      /[!@#$%&?]/g.test(values.lastName) ||
      /\d/.test(values.lastName)
    ) {
      errors.lastName =
        "Last Name should not contain numbers or any special character";
    }
    if (/[!@#$%&?]/g.test(values.city) || /\d/.test(values.city)) {
      errors.city =
        "city Name should not contain numbers or any special character";
    }
    if (/[!@#$%&?]/g.test(values.country) || /\d/.test(values.country)) {
      errors.country =
        "Country Name should not contain numbers or any special character";
    }

    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validate({ firstName, lastName, email, city, country });
    setErros(errors);
    if (Object.keys(errors).length === 0) {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        password,
        email,
        city,
        gender,
        country: country.label,
        phone_number: phoneNumber,
        is_active: isActive,
        role: userType,
      };

      fetch(`${"http://127.0.0.1:8000/register/"}`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {
            console.log(result);
            if (result.role !== "instructor") {
              addToTeamApiRequest(result.id);
            }

            fetch(`${"http://127.0.0.1:8000/request_password_reset/"}`, {
              method: "POST",
              body: JSON.stringify({ email: result.email }),
              headers: {
                "Content-type": "application/json",
              },
            }).then((response) => {
              if (response.status === 200) {
                response.json().then(function (result) {
                  console.log(result);
                  sendEmail(result.token);
                });
              } else {
                console.log(response);
              }
            });

            setFirstName("");
            setLastName("");
            setGender("");
            setPassword("");
            setEmail("");
            setCity("");
            setPhoneNumber("");
            setIsActive(false);
            setUserType("");
          
            // Swal.fire("User Registered successfully! check Your inbox");
          });
          // sendEmail();
        } else if (response.status === 403) {
          console.log(response);
          response.json().then(function (result) {
            Swal.fire({
              icon: "error",
              title: "Not Registered",
              text: `${result.detail}`,
            });
          });
        } else {
          response.json().then(function (result) {
            const keys = Object.keys(result);
            keys.forEach((key) => {
              if (result.hasOwnProperty(key)) {
                Swal.fire({
                  icon: "success",
                  title: "Registered ",
                  html: `User Registered successfully!<br /> Reset password link sent`,
                });
              }
            });
          });
        }
      });

      const sendEmail = async (message) => {
        const serviceId = "service_x39w5wk";
        const templateId = "template_tn75w5s";
        try {
          await emailjs.send(serviceId, templateId, {
            name: `${"LMS"} ${"User"}`,
            recipient: email,
            token: message,
            sender: "LMS",
          });
          Swal.fire({
            icon: "success",
            text: "Reset link sent Successfully!",
          });
          setEmail("");
        } catch (error) {
          console.log(error);
        }
      };

      // const sendEmail = async () => {
      //   const serviceId = "service_x39w5wk";
      //   const templateId = "template_yakcx3c";
      //   try {
      //     await emailjs.send(serviceId, templateId, {
      //       name: `${firstName} ${lastName}`,
      //       recipient: email,
      //       message: "Verify Account",
      //       sender: "LMS",
      //     });
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };
    } else {
      const keys = Object.keys(errors);
      keys.forEach((key) => {
        if (errors.hasOwnProperty(key)) {
          Swal.fire({
            icon: "error",
            title: "Not Registered",
            text: `${errors[key]}`,
          });
        }
      });
      // Swal.fire({
      //   icon: "error",
      //   title: "Not Registered",
      //   text: `${errors.email}`,
      // });
    }
  };

  // Excel Import Functionality

  const handleExcelFile = (e) => {
    const reader = new FileReader();
    if(e.target.files[0]){
      setExcelUsers([])
      setShowErrorCol(false)
      setShowSuccess(false)
    }
    reader.readAsBinaryString(e.target.files[0]);
    console.log(reader);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet);
      const newObj = parseData.map(function (obj) {
        return obj;
      });
      console.log("new obj", newObj);
      setExcelObj(newObj);
      setExcelUsers(newObj);
    };
  };

  const handleEAddFromExcelFile = (e) => {
    setLoading(true);
    let counter = 0;
    const requestAPI = (user, last, error) => {
      console.log("this is counter", counter);
      fetch(`${"http://127.0.0.1:8000/register/"}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
        },
      }).then((response) => {
        if (response.status === 201) {
          response.json().then(function (result) {

            fetch(`${"http://127.0.0.1:8000/request_password_reset/"}`, {
              method: "POST",
              body: JSON.stringify({ email: result.email }),
              headers: {
                "Content-type": "application/json",
              },
            }).then((response) => {
              if (response.status === 200) {
                response.json().then(function (res) {
                  console.log(res);
                  sendEmail(res.token, result.email);
                });
              } else {
                console.log(response);
              }
            });

            setShowSuccess(true);
            if (last === "last" && counter === 0) {
              setLoading(false);
              console.log("Errors list length", error);
              Swal.fire({
                icon: "success",
                title: "Registeration Successful!",
                text: `All Users registered Successfully`,
              });
            } else if (last === "last" && counter > 0) {
              setLoading(false);
              Swal.fire({
                icon: "info",
                title: "Attention!",
                html: `${
                  excelObj.length - counter
                } users Registered.<br /> ${counter} Users Not Registered`,
              });
            }
          });
        } else {
          response.json().then(function (result) {
            const keys = Object.keys(result);
            keys.forEach((key) => {
              if (result.hasOwnProperty(key)) {
                setRegisteredErrors((pre) => [
                  ...pre,
                  [{ email: user.email, error: result[key], key }],
                ]);
              }
            });
            setShowErrorCol(true);
            setShowSuccess(true);
            counter++;
            // alert("User not registered")
            console.log(response, counter);
            if (counter === excelObj.length) {
              setLoading(false);
              Swal.fire({
                icon: "error",
                title: "Registeration Unsuccessful!",
                text: `All Users Not Registered Successfully`,
              });
            } else if (
              last === "last" &&
              counter > 0 &&
              counter !== excelObj.length
            ) {
              setLoading(false);
              Swal.fire({
                icon: "info",
                title: "Attention!",
                html: `${
                  excelObj.length - counter
                } users Registered.<br /> ${counter} Users Not Registered`,
              });
            }
          });
        }
      });

      const sendEmail = async (message, email) => {
        const serviceId = "service_x39w5wk";
        const templateId = "template_tn75w5s";
        try {
          await emailjs.send(serviceId, templateId, {
            name: `${"LMS"} ${"User"}`,
            recipient: email,
            token: message,
            sender: "LMS",
          });
          Swal.fire({
            icon: "success",
            text: "Reset link sent Successfully!",
          });
          setEmail("");
        } catch (error) {
          console.log(error);
        }
      };
      
    };

    // const reader = new FileReader();
    // reader.readAsBinaryString(e.target.files[0]);
    // console.log(reader);
    // reader.onload = (e) => {
    //   const data = e.target.result;
    //   const workbook = XLSX.read(data, { type: "binary" });
    //   const sheetName = workbook.SheetNames[0];
    //   const sheet = workbook.Sheets[sheetName];
    //   const parseData = XLSX.utils.sheet_to_json(sheet);
    //   const obj = { ...parseData };
    //   const keys = Object.keys(obj[0]);
    //   console.log(keys);
    //   const newObj = parseData.map(function (obj) {
    //     return obj;
    //   });
    //   console.log("new obj", newObj);
    //   setExcelUsers(obj);

    excelUsers.forEach((user, i) => {
      if (i + 1 === excelUsers.length) {
        requestAPI(user, "last", registeredErrors);
      } else {
        requestAPI(user, "", registeredErrors);
      }
    });
    // };
  };

  const addToTeamApiRequest = (userId) => {
    const addTeamApi = (obj) => {
      fetch("http://127.0.0.1:8000/add_users_to_team/", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          Authorization: `Token ${sessionStorage.getItem("user_token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => {
        if (response.status === 200) {
          response.json().then(function (result) {
            console.log("API result ", result);
          });
        }
      });
    };

    if (team.length !== 0) {
      team.forEach((team) => {
        addTeamApi({ team_name: team.value, user_ids: [userId] });
      });
    }
    // const obj = {
    //   team_name: team,
    //   user_ids: [userId],
    // };
  };
  const getUserRegisteredStatus = (email) => {
    const obj = registeredErrors.filter((element) => {
      return element[0].email === email;
    });
    if (obj.length !== 0) {
      return <span className="text-danger">Unsuccessful</span>;
    } else {
      return <span className="text-success">Successful</span>;
    }
  };

  const getErrorMessage = (email) => {
    const obj = registeredErrors.filter((element) => {
      return element[0].email === email;
    });
    const updatedList = obj[0];
    if (obj.length !== 0) {
      if (
        updatedList[0].key === "email" &&
        updatedList[0].error[0].includes("user")
      ) {
        return "User is already registered!";
      } else if (updatedList[0].key === "detail") {
        return "You don't have permission!";
      } else {
        return `${updatedList[0].key} is required!`;
      }
    } else {
      return "None";
    }
  };

  const handleFilterRegisteredUser = (value) => {
    if (value === "unsuccessful") {
      const filteredUSer = excelObj.filter((user) => {
        return registeredErrors.filter((element) => {
          console.log("this is element", element[0].email);
          return element[0].email === user.email;
        });
      });
      console.log("Filtered User unsuccess:", filteredUSer);
      setExcelUsers(filteredUSer);
    } else if (value === "successful") {
      const filteredUSer = excelObj.filter((user) => {
        return !registeredErrors.forEach((element) => {
          console.log("this is element", element[0], user.email);
          return element[0].email === user.email;
        });
      });
      console.log("Filtered User success:", filteredUSer);
      setExcelUsers(filteredUSer);
    } else {
      setExcelUsers(excelObj);
    }
  };

  return (
    <div className="">
      <div className={styles.container}>
        {/* <UploadPicture /> */}
        <form className={styles.form}>
          <div className="">
            <div className="">
              <h3 className="text-center">Register Single User</h3>
            </div>
            <div className={styles.firstlast}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={handleLastNameChnage}
              />
            </div>
            <div className={styles.passemail}>
              <select
                value={gender}
                onChange={handleGender}
                className={styles.roles}
              >
                <option value="" disabled>
                  ---Select Gender---
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <select
                value={userType}
                onChange={handleUserTypeChange}
                name="userType"
                className={styles.roles}
              >
                <option value="" disabled>
                  ---Select Role---
                </option>
                {/* <option value="admin">ADMIN</option> */}
                <option value="instructor">INSTRUCTOR</option>
                <option value="learner">LEARNER</option>
                {/* <option value="custom">CUSTOM ROLE</option> */}
              </select>
            </div>
            <div className={styles.phonecity}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className={styles.phonecity}>
              <input
                type="text"
                name="city"
                placeholder="City (optional)"
                value={city}
                onChange={handleCityChange}
              />
              <div className={styles.country}>
                <Select
                  options={options}
                  value={country}
                  onChange={changeHandler}
                  // defaultValue={
                  //   }
                />
              </div>
            </div>
            <div className={`${styles.addTeamSelector}`}>
              <span className={`w-50 ${styles.phoneNumberContainer}`}>
                <PhoneInput
                  defaultCountry="PK"
                  country="PK"
                  international={true}
                  placeholder="Phone Number (optional)"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                />
              </span>
              {/* <div className={`${styles.addTeamSelector}`}> */}
              <Select
                value={team}
                options={teamOptions}
                onChange={handleTeam}
                className={styles.team}
                isMulti={true}
              >
                {/* <option value="" disabled>
                  ---Add Team---
                </option>
                {teamData.length !== 0 &&
                  teamData.map((team) => {
                    return <option value={team.name}>{team.name}</option>;
                  })} */}
              </Select>
              {/* </div> */}
            </div>
            <div className={`form-check form-switch ps-3 ${styles.active}`}>
              <div className="">
                <label htmlFor="IsActive" className={`form-check-label`}>
                  Is Active
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  value={isActive}
                  onChange={handleIsActiveChange}
                  id="flexSwitchCheckDefault"
                />
              </div>

              <div className=""></div>
            </div>
          </div>
          <div className={styles.addBtnContainer}>
            <button
              className={styles.btn_add}
              onClick={(e) => handleFormSubmit(e)}
              type="button"
            >
              Add User
            </button>
          </div>
        </form>
        <div className={styles.excelFileSection}>
          <div className={styles.excelHeadingSection}>
            <h3 className="text-center">Register Multiple Users</h3>
          </div>
          <div
            className={`${styles.excelFile} ${
              excelObj.length !== 0
                ? styles.excelFileSelected
                : styles.excelFileNotSelected
            }`}
          >
            <label
              className={`${styles.downloadExcel} ${
                excelObj.length === 0
                  ? styles.fileNotSelected
                  : styles.fileSelected
              }`}
            >
              Download Excel File Template
              <ExportExcel
                excelData={ExcelExportData}
                fileName={"Excel Export"}
                className={styles.excelexport}
              />
            </label>
            <label
              className={`${
                excelObj.length === 0
                  ? styles.fileNotSelected
                  : styles.fileSelected
              }`}
            >
              Import From Excel file
              <input
                type="file"
                accept=".xlsx, xls"
                onChange={(e) => handleExcelFile(e)}
                ref={excelFile}
              />
            </label>
          </div>
          {loading ? (
            <div className="loading-container">
              <div class="spinner-border m-5" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <span class="">Loading...</span>
            </div>
          ) : (
            <>
              <div className={styles.excelUserList}>
                {/* <div className="filter-container mb-2">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleFilterRegisteredUser("all")}
              >
                All
              </button>
              <button
                className="btn btn-success"
                type="button"
                onClick={() => handleFilterRegisteredUser("successful")}
              >
                Successful
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => handleFilterRegisteredUser("unsuccessful")}
              >
                Unsuccessful
              </button>
            </div> */}
                <table className={`table ${styles.excelUserTable}`}>
                  <thead>
                    {excelUsers.length !== 0 ? (
                      <>
                        <tr className="sticky-top">
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">role</th>
                          {showSuccess && <th scope="col">Registration</th>}
                          {showErrorCol && <th scope="col">Error</th>}
                        </tr>
                      </>
                    ) : (
                      <tr>
                        {/* <th scope="col">No Excel file Selected</th> */}
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {excelUsers.length !== 0 &&
                      excelUsers.map((user, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{`${user.first_name ? user.first_name : ""} ${
                              user.last_name ? user.last_name : ""
                            }`}</td>
                            {/* <td>
                          {" "}
                          {nameEdit ? (
                            <input type="text" />
                          ) : (
                            `${user.first_name ? user.first_name : ""} ${
                              user.last_name ? user.last_name : ""
                            }`
                          )}
                          {showNameEditBtn && (
                            <i
                              className="bi bi-pencil ms-2 module-edit-btn"
                              onClick={() => setNameEdit(true)}
                            ></i>
                          )}
                        </td> */}

                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            {showSuccess && (
                              <td className="text-danger">
                                {getUserRegisteredStatus(user.email)}
                              </td>
                            )}
                            {showErrorCol && (
                              <td className="text-danger">
                                {getErrorMessage(user.email)}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {excelUsers.length !== 0 && (
                <div
                  className="me-2"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <button
                    className={styles.btn_add}
                    onClick={(e) => handleEAddFromExcelFile(e)}
                    type="button"
                  >
                    Add
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddUser;
