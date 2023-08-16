import React, { useState, useMemo } from "react";
import styles from "../../components/styles/AddUser.module.css";
import UploadPicture from "../UploadPicture";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Select from "react-select";
import countryList from "react-select-country-list";
import ExcelImport from "../ExcelImport";



function AddUser() {

    <ExcelImport/>
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [userType, setUserType] = useState('');



    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])



  

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

        const userData= {
            firstName,
            lastName,
            password,
            email,
            city,
            phoneNumber,
            isActive,
            userType
        };
        if (firstName === '' || lastName === '' || email === '') {
            alert('Fill in the required fields');
            return;
        }
        else {
            alert('user created successfully')

            setFirstName('')
            setLastName('')
            setPassword('')
            setEmail('')
            setCity('')
            setPhoneNumber('')
            setIsActive(false)
            setUserType('ADMIN')

        }


    }





    const changeHandler = value => {
        setValue(value)
    }

    return (
        <div className="col">
            <div className={styles.container}>
                <UploadPicture />
                <form className={styles.form} >
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
                            type="text"
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
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone Number (optional) "
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        <div className={styles.country}>
                            <Select options={options} value={value} onChange={changeHandler} />
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
                            <select value={userType} onChange={handleUserTypeChange}
                                name="userType" className={styles.roles}>
                                <option value="" disabled>---User Type---</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="INSTRUCTOR">INSTRUCTOR</option>
                                <option value="LEARNER">LEARNER</option>
                                <option value="CUSTOM">CUSTOM ROLE</option>
                            </select>
                    </div>
                    <div className={styles.active}>
                    <label htmlFor="IsActive" className="form-check-label">Is Active</label>
                    <input type="checkbox" id="vehicle1" name="IsActive" value={isActive} onChange={handleIsActiveChange} />
                    </div>


                    <div className={`${styles.btn_container}`}>
                        <button className={styles.btn_add} onClick={handleFormSubmit} type="submit">Add User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
