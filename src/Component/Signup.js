import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';

export const Signup = () => {
  const { showAlert } = useContext(alertContext);
  const [credentials, setCredentials] = useState({name:"", email: "", password: "" ,cpassword:""});
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password,cpassword}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email,password})
    });
    console.log(cpassword);
    console.log(password);
    if(password!=cpassword){
      showAlert({ type: "danger", msg: " Password doesn't matches with Confirm Password"});
    }else{
    const json = await response.json();
    console.log(json); 
    if(json.success){  
    showAlert({ type: "success", msg: "Signup Successfull"});
      localStorage.setItem('token', json.authtoken);
      Navigate("/");}
      else{
        showAlert({ type: "danger", msg: "Account Already Exist with this email id"});
      }
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  return (
    <div className='container my-3'>
        <form onSubmit={handleSubmit}>

        <div className="mb-3">
    <label htmlFor="text" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange}/>
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email'/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' onChange={onChange}minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name='cpassword'onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/> 
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
