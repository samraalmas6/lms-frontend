import React, { useState } from 'react'

const SigninPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
          email,
          password
        }
        console.log("Submitted", data);
        setEmail('')
        setPassword('')
      }    

  return (
    <div className='sign-in-page'>
    <form className='sign-in-form'>
        <label>Email</label>
        <input type="email" value={email} onChange={handleEmail} placeholder='Email'/>
        <label>Password</label>
        <input type="password" value={password} onChange={handlePassword} placeholder='Password'/>
        <input type="button" onClick={handleSubmit} value="Login" className='button'/>
        <span className='forgot-password'>Forgot your <a href="#">password?</a></span>
    </form>
</div>
  )
}

export default SigninPage
