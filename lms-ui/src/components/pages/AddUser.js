import React, { useMemo, useState } from "react";
import countryList from 'react-select-country-list'
import Select from 'react-select'


const AddUser = () => {
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState('')
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
  }


  return (
    <div className="add-user-main-container">
      <div classNameName="add-user-img-container">
        <div className="img-div">
          <input type="image" />
        </div>
        {/* <div className="add-user-checkbox">
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Public Profile
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
        <div className="add-user-checkbox">
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Email verified
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
        <div className="add-user-checkbox">
          <label class="form-check-label" for="flexSwitchCheckChecked">
            Banned
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div> */}
      </div>
      <div classNameName="add-user-field-container">
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <input type="text" placeholder="Phone Number" />
         <textarea  id="" cols="30" rows="10" placeholder="About"></textarea>
         <label>country:</label>
          <Select options={options} value={value} onChange={changeHandler} />
         <button>Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
