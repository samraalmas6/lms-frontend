import React, { useState, useMemo } from "react";
import styles from "../../components/styles/AddUser.module.css";
import UploadPicture from "../UploadPicture";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Select from "react-select";
import countryList from "react-select-country-list";

function AddUser() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div className="col">
      <div className={styles.container}>
        <UploadPicture />
        <form className={styles.form}>
          <div className={styles.firstlast}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              required
              value=""
              onChange={""}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>
          <div className={styles.passemail}>
            <input type="text" name="email" placeholder="Email" required />

            <input type="text" name="password" placeholder="Password" />
          </div>
          <div className={styles.phonecity}>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number (optional) "
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
            <input type="text" name="city" placeholder="City (optional)" />
            <select name="userType" className={styles.roles}>
            <option value="" disabled>---User Type---</option>
              <option value="ADMIN">ADMIN</option>
              <option value="INSTRUCTOR">INSTRUCTOR</option>
              <option value="LEARNER">LEARNER</option>
              <option value="CUSTOM">CUSTOM ROLE</option>
            </select>
          </div>
          <div className={`${styles.active}`}>
          <label for="IsActive" className={`form-check-label`}>Is Active</label>
            <input
              type="checkbox"
              className={``}
              id="vehicle1"
              name="IsActive"
              value="IsActive"
            />

           
          </div>

          <div className={`${styles.btn_container}`}>
            <button className={styles.btn_add} type="submit">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
