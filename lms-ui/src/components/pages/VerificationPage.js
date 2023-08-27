import React, { useEffect, useState } from "react";
import styles from "../styles/Verification.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function VerificationPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search, [search]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [eyeMode, setEyeMode] = useState("fa-eye-slash");
  const [eyeModeConfirm, setEyeModeConfirm] = useState("fa-eye-slash");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirmType, setConfirmPasswordType] = useState("password");



  const handleEyeMode1 = () => {
    if (eyeMode === "fa-eye-slash") {
      setEyeMode("fa-eye");
      setPasswordType("text");
    } else {
      setEyeMode("fa-eye-slash");
      setPasswordType("password");
    }
  };
  const handleEyeMode2 = () => {
    if (eyeModeConfirm === "fa-eye-slash") {
      setEyeModeConfirm("fa-eye");
      setConfirmPasswordType("text");
    } else {
      setEyeModeConfirm("fa-eye-slash");
      setConfirmPasswordType("password");
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: query.get("email"),
      password: confirmPassword,
      is_active: true,
    };
    console.log(userData);
    fetch("http://localhost:8000/update_user/", {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: process.env.REACT_APP_ADMIN_TOKEN,
      },
    }).then((response) => {
      if (response.status == 200) {
        console.log("User record updated!");
        navigate("/auth/login");
      }
      // response.json().then(function (result) {
      //   console.log(result);
      // })
    });

    if (newPassword === "" || confirmPassword === "") {
      alert("Fill in the required fields");
      return;
    } else {
      alert("Password updated successfully");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      {/* <div className="col"> */}
      <div className={styles.contain}>
        <form className={styles.form}>
          <h2 className={styles.activateHeading}>Activate Account</h2>
          {/* <label>
                    <input
                    type="password"
                    name="OldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                   />
                </label> */}
          <div className="password-field">
            <input
              type={passwordType}
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="New Password"
            />
            <i
              className={`eye_show fas fa-solid ${eyeMode}`}
              onClick={handleEyeMode1}
            ></i>
          </div>
          <div className="password-field">
            <input
              type={passwordConfirmType}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            />
            <i
              className={`eye_show fas fa-solid ${eyeModeConfirm}`}
              onClick={handleEyeMode2}
            ></i>
          </div>

          <input
            type="submit"
            onClick={handleFormSubmit}
            value="Update"
            className={styles.btn_add}
          />
        </form>
      </div>
      {/* </div> */}
    </>
  );
}

export default VerificationPage;
