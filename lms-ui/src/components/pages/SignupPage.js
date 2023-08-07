import React, { useState } from 'react'

const SignupPage = () => {

  const [firstName,setFistName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleFirstName = (e) => {
    setFistName(e.target.value)
  }
  const handleLastName = (e) => {
    setLastName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      firstName,
      lastName,
      email,
      password
    }
    console.log("Submitted", data);
    setFistName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }    
  

  return (
    <div className='sign-up-page'>
        <form className='sign-up-form'>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={handleFirstName} placeholder='First Name'/>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={handleLastName} placeholder='Last Name'/>
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmail} placeholder='Email'/>
            <label>Password</label>
            <input type="password" value={password} onChange={handlePassword} placeholder='Password'/>
            <input type="button" onClick={handleSubmit} value="Sign up" className='button'/>
        </form>
    </div>
  )
}

export default SignupPage
