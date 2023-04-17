import React, { useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import alertContext from '../context/alerts/AlertContext';
export const Login = () => {
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and  redirect    
      showAlert({ type: "success", msg: "Login Successful" });
      localStorage.setItem('token', json.authtoken);
      Navigate("/");
    } else {
      showAlert({ type: "danger", msg: "Invalid Credentials" });
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-3 mt-3'>
      <h3>Login to continue to iNotebook</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label htmlFor="email" className="form-label h5" >Email Address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="password" className="form-label h5">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}
