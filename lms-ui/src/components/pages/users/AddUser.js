import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "../../styles/AddUser.module.css";
import UploadPicture from "../../content/UploadPicture";
import Select from "react-select";
import countryList from "react-select-country-list";
import emailjs from "@emailjs/browser";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import ExcelExportData from "../../hooks/ExcelExportData";
import ExportExcel from "../../content/Excelexport";

function AddUser() {
  const excelFile = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [userType, setUserType] = useState("");

  const [country, setCountry] = useState("Pakistan");
  const options = useMemo(() => countryList().getData(), []);
  const [errors, setErros] = useState({});

  useEffect(() => emailjs.init("739xGz6oDs9E1tq_w"), []);

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
      console.log(userData);

      fetch(`${"http://127.0.0.1:8000/register/"}`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Token ${sessionStorage.getItem('user_token')}`,
        },
      }).then((response) => {
        if (response.status == 201) {

          response.json().then(function (result) {
            console.log(result);

            setFirstName("");
            setLastName("");
            setGender('')
            setPassword("");
            setEmail("");
            setCity("");
            setPhoneNumber("");
            setIsActive(false);
            setUserType("");
          });
          sendEmail()
        }
        
        // else if (response.status == 404) {
        //   response.json().then(function (res) {
        //     setInvalidUser(res)
        //   });
        // }
        else {
          console.log(response);
        }
      });
      const sendEmail = async () => {
        const serviceId = "service_x39w5wk";
        const templateId = "template_yakcx3c";
        try {
          await emailjs.send(serviceId, templateId, {
            name: `${firstName} ${lastName}`,
            recipient: email,
            message: "Verify Account",
            sender: "LMS",
          });
          alert("email successfully sent check inbox");
        } catch (error) {
          console.log(error);
        }
      }
     

    //   setFirstName("");
    //   setLastName("");
    //   setPassword("");
    //   setEmail("");
    //   setGender('')
    //   setCity("");
    //   setPhoneNumber("");
    //   setIsActive(false);
    //   setUserType("");
    }
    // if (firstName === "" || lastName === "" || email === "") {
    //   alert("Fill in the required fields");
    //   return;
    // } else {
    //   alert("user created successfully");
    // }
  };

  // Excel Import Functionality

  const handleExcelFile = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parseData = XLSX.utils.sheet_to_json(sheet);
      const obj = { ...parseData };
      const keys = Object.keys(obj[0]);
      console.log(keys);
      const newObj = parseData.map(function (obj) {
        obj["firstName"] = obj["first Name"];
        obj["lastName"] = obj["last Name"];
        obj["phoneNumber"] = obj["phone number"];
        obj["userType"] = obj["user type"];
        delete obj["first Name"];
        delete obj["last Name"];
        delete obj["phone number"];
        delete obj["user type"];
        return obj;
      });
      console.log(newObj);
      excelFile.current.value = null;
      alert("Users created");
    };
  };
  return (
    <div className="col">
      <div className={styles.container}>
        <UploadPicture />
        <form className={styles.form}>
          <div className={styles.excelFile}>
            <label className={styles.downloadExcel}>
              Download Excel File Template
              <ExportExcel
                excelData={ExcelExportData}
                fileName={"Excel Export"}
                className={styles.excelexport}
              />
            </label>
            <label>
              Import From Excel file
              <input
                type="file"
                accept=".xlsx, xls"
                onChange={handleExcelFile}
                ref={excelFile}
              />
            </label>
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
                ---User Type---
              </option>
              <option value="admin">ADMIN</option>
              <option value="instructor">INSTRUCTOR</option>
              <option value="learner">LEARNER</option>
              <option value="custom">CUSTOM ROLE</option>
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
              />
            </div>
          </div>
          <div className={`${styles.active} `}>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number (optional) "
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
        <div className="form-check form-switch">
        <label htmlFor="IsActive" className="form-check-label">
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

          </div>
          <div className={`${styles.btn_container}`}>
            <button
              className={styles.btn_add}
              onClick={(e) => handleFormSubmit(e)}
              type="button"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
