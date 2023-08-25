import React, { useEffect, useState } from "react";
import styles from "../styles/Verification.module.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function VerificationPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search, [search]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // // Get a specific query parameter
  // const myParam = searchParams.get('email');
  // // Set a query parameter
  // // setSearchParams({ myParam: 'email' });
  // // Remove a query parameter
  // setSearchParams((params) => {
  // params.delete('email');
  // return params;
  // });// ...
  // console.log(searchParams);
  // console.log(myParam);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // useEffect(() => {
  //   const getUsers = () => {
  //   fetch('http://127.0.0.1:8000/list_all_users/',  {
  //     method: "GET",
  //     headers: {
  //       // "Authorization": `Token ${sessionStorage.getItem('user_token')}` ,
  //     },
  //   }).then((response) => {
  //     response.json().then(function (result) {
  //       console.log(result);
  //       const user = result.filter((users) => {
  //         return users.email == "mohsenali3366@gmail.com"
  //       })
  //       setUser(user)
  //     })
  //   })
  //   }
  //   getUsers()
  // },[])

  // console.log(process.env.REACT_APP_ADMIN_TOKEN);

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

          <input
            type="password"
            name="NewPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />

          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />


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
