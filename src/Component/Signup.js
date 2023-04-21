import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';
// import "../Css/Signup.css";
export const Signup = () => {
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.cpassword) {
      showAlert({ type: "danger", msg: " Password doesn't matches with Confirm Password" });

      return;
    }
    // const {name,email,password,cpassword}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });


    const json = await response.json();
    console.log(json);
    if (json.success) {
      showAlert({ type: "success", msg: "Signup Successfull" });
      localStorage.setItem('token', json.authtoken);
      Navigate("/");
    }
    else {
      showAlert({ type: "danger", msg: "Account Already Exist with this email id" });
    }

  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const st = {
    width: "285px",
  }
  return (
    <div>

      <div className='d-flex flex-column justify-content-center align-items-center my-5 py-5 ' style={{ width: '40%', margin: 'auto', boxShadow: 'rgb(182 182 182) 1px 2px 9px', }}>
        <h3>MyTaskList</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-5">
            <label htmlFor="name" className="form-label h5" >Full Name</label>
            <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />

          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label h5" >Email Address</label>
            <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3 mt-3 ">
            <label htmlFor="password" className="form-label h5">Password</label>
            <input type="password" className="form-control" onChange={onChange} id="password" name="password" minLength={5} required />
          </div>
          <div className="mb-3 mt-3 ">
            <label htmlFor="cpassword" className="form-label h5">Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange} id="cpassword" name="cpassword" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary mt-4" style={st} >Signup</button>
        </form>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center my-2 py-2 ' style={{ width: '40%', margin: 'auto', boxShadow: 'rgb(182 182 182) 1px 2px 9px' }}>
        <p className='p-2' style={{ margin: "auto" }}>Have an account?  <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}
