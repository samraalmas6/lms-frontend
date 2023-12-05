import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import finalLogo from '../content/Images/xloop-logo-2.png'
import '../styles/SigninPage.css'
import Swal from "sweetalert2";

const SigninPage = () => {
  const navigate = useNavigate();
  sessionStorage.clear();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [invalidUser, setInvalidUser] = useState({});
  const [eyeMode, setEyeMode] = useState("fa-eye-slash");
  const [passwordType, setPasswordType] = useState("password");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEyeMode = () => {
    if (eyeMode === "fa-eye-slash") {
      setEyeMode("fa-eye");
      setPasswordType("text");
    } else {
      setEyeMode("fa-eye-slash");
      setPasswordType("password");
    }
  };

  const validateLogin = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid";
    } else if (/^\d/.test(values.email)) {
      errors.email = "Email should not contain number in start";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleForgetPasswordBtn = () => {
    navigate("/auth/reset_password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLogin({ email, password });
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const data = {
        email,
        password,
      };
      console.log(data);
      // API CALL
      fetch(`${"http://127.0.0.1:8000/login/"}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((response) => {
        if (response.status === 200) {
          sessionStorage.clear();
          response.json().then(function (result) {
            console.log(result);
            sessionStorage.clear();
            if (result.is_active === true) {
              sessionStorage.setItem("user_id", result.id);
              sessionStorage.setItem("first_name", result.first_name);
              sessionStorage.setItem("last_name", result.last_name);
              sessionStorage.setItem("role", result.role);
              sessionStorage.setItem("user_token", result.token);
              console.log(sessionStorage);
              if (result.role === "learner") {
                navigate("/course/my-courses");
              } else {
                navigate("/");
              }
              setEmail("");
              setPassword("");
            } else {
              Swal.fire({
                icon: "warning",
                html: `<b>Your Account is not Active</b>`,
              });
            }
          });
        } else if (response.status === 404) {
          Swal.fire({
            icon: "error",
            html: `<b>Internal Server Error</b>`,
          });
        } else {
          const err = { message: "User is not Registered" };
          Swal.fire({
            icon: "error",
            html: `<b>${err.message}</b>`,
          });
          // setInvalidUser(err);
        }
      });
    }
    // if(email==='admin@lms.com' && password === 'admin123'){
    //   navigate('/')
    //   // setShowLogin(false)
    // }
    // else {
    //   alert('Invalid userName And password. correct email: admin@lms.com and password: admin123')
    // }
  };

  return (
    <div className="sign-in-page">
      <div className="lms-logo-main-container">
        <div className="lms-log-container">
          <img src={finalLogo} alt="LMS" width={350} />
        </div>
      </div>
      <form className="sign-in-form">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="Email"
        />
        {errors.email && <p className={`error m-0`}>{errors.email}</p>}
        <label>Password</label>
        <div className="password-field">
          <input
            type={passwordType}
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <i
            className={`eye_show fas fa-solid ${eyeMode}`}
            onClick={handleEyeMode}
          ></i>
        </div>

        {errors.password && <p className={`error m-0`}>{errors.password}</p>}
        <input
          type="submit"
          onClick={handleSubmit}
          value="Login"
          className="button"
        />
        <span className="forgot-password">
          Forgot your
          <a role="button" onClick={() => handleForgetPasswordBtn()}>
            <strong style={{ color: "red"}}>
            Password?
            </strong>
          </a>
        </span>
      </form>
    </div>
  );
};

export default SigninPage;
