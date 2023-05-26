import React, { useState, useContext,useEffect } from 'react'
import { useNavigate, Link, Form } from 'react-router-dom';
import alertContext from '../context/alerts/AlertContext';

// import Alert from './Alert';

export const Signup = (props) => {
  const [otp,setOpt]=useState();
    const [seconds, setSeconds] = useState(120); // initial value of 120 seconds (2 minutes)
    const [expired, setExpired] = useState(false); // initial value of timer not expired


    const startTimer = () => {
      setExpired(false);
      setSeconds(120);
      var x=120;

     var  myInterval= setInterval(() => {
        if(x>0){
          x-=1;
          setSeconds(x);
        }    
        else{
          clearInterval(myInterval);
          setOpt("abcd");
          setExpired(true);
        }
       }, 1000);
    };
  //  console.log(seconds);
    const formatTime = () => {
      const minutes = Math.floor(seconds / 60);
      const secondsLeft = seconds % 60;
      return `${minutes}:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
    };
  
  const { showAlert } = useContext(alertContext);
  const [checkotp,setCheckotp]=useState(true);
 
   const [userOtp,setUserOtp]=useState("");
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const Navigate = useNavigate();
  
    // checking if the email id is already exist or not !!
    const handleSubmit=async (e)=>{
    e.preventDefault();
    const result = await fetch("http://localhost:5000/userpres/fetchid", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email})
    });
    const js = await result.json();
    if(js.success){
      showAlert({ type: "danger", msg: "Enter unique email id" });
      return;
    }
    setCheckotp(false);
    // Generating random number 
     function getRandumNumber(length) {
      const min = Math.pow(10, (length-1));
      const max = Math.pow(10, (length));
      return Math.floor(Math.random() * (max - min) + min);
    }
    
    // Generating 4 digit otp.
    const num = getRandumNumber(4);
    setOpt(num);
   
    if (credentials.password !== credentials.cpassword) {
      showAlert({ type: "danger", msg: " Password doesn't matches with Confirm Password" });
      return;
    }
    console.log(num)
    const response = await fetch("http://localhost:5000/otp/verify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp:num , email: credentials.email})
    });
    // eslint-disable-next-line
    const json = await response.json();
    showAlert({ type: "danger", msg:`${json.msg}`});
    startTimer();
  }

  const OtpVerification = async (e) => {
    e.preventDefault();
    if(otp!=userOtp){
      console.log(otp,"and",userOtp)
      showAlert({ type: "danger", msg: "Incorrect Otp"});
      return ;
    }
    // const {name,email,password,cpassword}= credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})
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
  const onChangeOtp = (e) => {
    setUserOtp(e.target.value );
  
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  const st = {
    width: "285px",
  }


  const otpRegeneration=async()=>{
    function getRandumNumber(length) {
      const min = Math.pow(10, (length-1));
      const max = Math.pow(10, (length));
      return Math.floor(Math.random() * (max - min) + min);
    }
    // Generating 4 digit otp.
    const num = getRandumNumber(4);
    setOpt(num);
  
    
    const response = await fetch("http://localhost:5000/otp/verify", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({otp:num , email: credentials.email})
    });
    // eslint-disable-next-line
    const json = await response.json();
    showAlert({ type: "danger", msg:`${json.msg}`});
  }

 
  
  return (
    <div>
    { checkotp ? (
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
    ) : (
             <div className='d-flex flex-column justify-content-center align-items-center my-5 py-5 ' style={{ width: '40%', margin: 'auto', boxShadow: 'rgb(182 182 182) 1px 2px 9px', }}>
        <form onSubmit={OtpVerification}>
           <div className="mb-3 mt-5 d-flex justify-content-center align-items-center flex-column">
          <h3> Enter Otp here</h3>
             <input type="number" onChange={onChangeOtp} name='userOtp' />  
            <button type="submit" className="btn btn-primary mt-4" style={{}} >Submit</button> 
           <div>
            {expired?(
              <>
              <p>Otp Expired</p>
              <button onClick={()=>{otpRegeneration();startTimer()}}> Regenerate Otp</button>
              </>
              ):(
                <p>Time Remaining: {formatTime()}</p>
            )}
           </div>

            </div>
        </form>
    
             

      
      </div>
  
    )

    }
    </div>
  )
}
