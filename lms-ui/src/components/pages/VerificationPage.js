import React, {useState} from 'react'
import styles from "../../components/styles/Verfication.module.css";

function VerificationPage() {

  const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleOldPasswordChange = (e) => {
      setOldPassword(e.target.value);
  };

  const handleNewPasswordChange =(e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  

    const userData= {
        oldPassword,
        newPassword,
        confirmPassword
       
    };

    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
        alert('Fill in the required fields');
        return;
    }
    else {
        alert('Password updated successfully')

        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
      
    }
  }
  


  return (
    <>
    <div className="col">
            <div className={styles.contain}>
              <form className={styles.form}>
              <div>
                <label>
                    <input
                    type="password"
                    name="OldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                   />
                </label>

                <label>
                    <input
                    type="password"
                    name="NewPassword"
                    placeholder='New Password'
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    />
                </label>
                </div>
             
             <div>
                <label>
                    <input
                    type='password'
                    name="ConfirmPassword"
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    
                    />

                </label>
                </div>

                <div>
                  <button className={styles.btn_add} onClick={handleFormSubmit}>submit</button>
                </div>
                </form>
    </div>
    </div>
    </>
  )
}

export default VerificationPage
