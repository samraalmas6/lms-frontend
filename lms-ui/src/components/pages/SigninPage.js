import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
	const navigate = useNavigate();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

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
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateLogin({ email, password });
        setErrors(errors);
        // if (Object.keys(errors).length === 0) {
        // const data = {
        //   email,
        //   password
        // }
        // // API CALL
        // fetch(`${''}/auth/login`, {
        //   method: 'POST',
        //   body: JSON.stringify(data),
        //   headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        //   },
        // }).then((response) => {
        //   if (response.status == 200) {
        //     sessionStorage.clear();
        //     response.json().then(function (result) {

        //       // sessionStorage.setItem("user_id", result.id);
        //       // sessionStorage.setItem('user_email', result.email);
        //       // sessionStorage.setItem('user_firstname', result.first_name);
        //       // sessionStorage.setItem('user_lastname', result.last_name);
        //       // sessionStorage.setItem('user_roleid', result.role.id);
        //       // sessionStorage.setItem('user_rolename', result.role.name);
        //       navigate('/');

        //       setEmail('')
        //       setPassword('')
        //     });
        //   }
        //   });
        // }
        if(email==='admin@lms.com' && password === 'admin123'){
          navigate('/')
          // setShowLogin(false)
        }
        else {
          alert('Invalid userName And password. correct email: admin@lms.com and password: admin123')
        }

      }    

  return (
    <div className='sign-in-page'>
    <form className='sign-in-form'>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmail} placeholder='Email'/>
        {errors.email && <p className={`error m-0`}>{errors.email}</p>}
        <label>Password</label>
        <input type="password" value={password} onChange={handlePassword} placeholder='Password'/>
        {errors.password && <p className={`error m-0`}>{errors.password}</p>}
        <input type="button" onClick={handleSubmit} value="Login" className='button'/>
        <span className='forgot-password'>Forgot your <a href="#">password?</a></span>
    </form>
</div>
  )
}

export default SigninPage
