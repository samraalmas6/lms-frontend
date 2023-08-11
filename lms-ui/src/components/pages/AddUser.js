import React, { useState, useMemo } from "react";
import styles from "../../components/styles/AddUser.module.css";
import UploadPicture from "../UploadPicture";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Select from "react-select";
import countryList from "react-select-country-list";

function AddUser() {
   
    const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }
   
    return (
        <>
            <UploadPicture/>
            <Navbar/>
            <Sidebar/>
        <div className={styles.container}>
            <form className={styles.form} >
                <div className={styles.firstlast}>
                    <label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            value=""
                            onChange={""}
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                        />

                    </label>
                </div>
                <div className={styles.passemail}>
                    <label>
                        <input
                            type="text"
                            name="password"
                            placeholder="Password"
                        />
                    </label>



                    <label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                        />
                    </label>
                </div>
          <div className={styles.phonecity}>
                <label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number (optional) "
                        
                    />
                </label>

                <label>
                    <input
                    type="text"
                    name="city"
                    placeholder="City (optional)"
                    />
                </label>
                </div>
            <div className={styles.active}>
                
            <input type="checkbox" id="vehicle1" name="IsActive" value="IsActive"/>
            <label for="IsActive">Is Active</label>
                
                <label>
                    <select
                        name="userType">
                        <option value="ADMIN">ADMIN</option>
                        <option value="INSTRUCTOR">INSTRUCTOR</option>
                        <option value="LEARNER">LEARNER</option>
                        <option value="CUSTOM">CUSTOM ROLE</option>
                    </select>
           </label>
           </div>
           <div>
           <Select options={options} value={value} onChange={changeHandler} />
           </div>


          
           <div>
          <button className={styles.btn_add} type="submit">Add User</button>
          
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
