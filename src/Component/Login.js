import React, { useState,useContext} from 'react'
import { useNavigate,Link} from "react-router-dom";
import alertContext from '../context/alerts/AlertContext';
import "../Css/Login.css";
import noteContext from '../context/notes/NoteContext';
export const Login = () => {
  const {setProgress}= useContext(noteContext);
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);
    const response = await fetch("https://mytasklist-backend.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    setProgress(100);
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
  const st= {
   
    width: "285px",  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center w-full'>
      <div className='d-flex flex-column justify-content-center border  align-items-center my-5 py-5 'style={{width:"350px",boxShadow: 'rgb(182 182 182) 1px 2px 9px'}} >
      <h3>MyTaskList</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <label htmlFor="email" className="form-label h5" >Email Address</label>
          <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3 mt-3 ">
          <label htmlFor="password" className="form-label h5">Password</label>
          <input type="password" className="form-control" onChange={onChange} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary mt-4" style={st} >Login</button>
      </form>
      </div>
      <div className='d-flex flex-column border justify-content-center align-items-center my-2 py-2 ' style={{width:'350px', boxShadow: 'rgb(182 182 182) 1px 2px 9px'}}>
        <p className='p-2' style={{margin:"auto"}}>Don't have an account?  <Link to='/signup'>Signup</Link></p>
      </div>
    </div>

  
  )
}
