import React, { useState, useMemo, useRef } from "react";
import styles from "../../components/styles/AddUser.module.css";
import UploadPicture from "./UploadPicture";
import Select from "react-select";
import countryList from "react-select-country-list";
import * as XLSX from "xlsx";

function AddUser() {
    const excelFile = useRef()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [userType, setUserType] = useState("");

  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChnage = (e) => {
    setLastName(e.target.value);
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

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      password,
      email,
      city,
      phoneNumber,
      isActive,
      userType,
    };
    if (firstName === "" || lastName === "" || email === "") {
      alert("Fill in the required fields");
      return;
    } else {
      alert("user created successfully");

      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");
      setCity("");
      setPhoneNumber("");
      setIsActive(false);
      setUserType("");
    }
  };

  const changeHandler = (value) => {
    setValue(value);
  };
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
      excelFile.current.value = null
      alert("Users created")
    };
  };
  return (
    <div className="col">
      <div className={styles.container}>
        <UploadPicture />
        <form className={styles.form}>
          <div className={styles.excelFile}>
            <label>
              Import excel file
              <input type="file" accept=".xlsx, xls" onChange={handleExcelFile} ref={excelFile} />
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
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className={styles.phonecity}>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number (optional) "
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            <div className={styles.country}>
              <Select
                options={options}
                value={value}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className={styles.phonecity}>
            <input
              type="text"
              name="city"
              placeholder="City (optional)"
              value={city}
              onChange={handleCityChange}
            />
            <select
              value={userType}
              onChange={handleUserTypeChange}
              name="userType"
              className={styles.roles}
            >
              <option value="" disabled>
                ---User Type---
              </option>
              <option value="ADMIN">ADMIN</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
              <option value="LEARNER">LEARNER</option>
              <option value="CUSTOM">CUSTOM ROLE</option>
            </select>
          </div>
          <div className={styles.active}>
            <label htmlFor="IsActive" className="form-check-label">
              Is Active
            </label>
            <input
              type="checkbox"
              id="vehicle1"
              name="IsActive"
              value={isActive}
              onChange={handleIsActiveChange}
            />
          </div>
          <div className={`${styles.btn_container}`}>
            <button
              className={styles.btn_add}
              onClick={handleFormSubmit}
              type="submit"
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
