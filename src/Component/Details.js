import React, { useState, useEffect ,useContext} from 'react';
import {UserContext} from '../context/userdetails/UserContext';
import { useNavigate } from 'react-router-dom';

import logo from '../image/user (1).png'
import noteContext from '../context/notes/NoteContext';
const Details = () => {
    const {user,getDetails}=useContext(UserContext);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();
  const {setProgress}=useContext(noteContext);

    useEffect(() => {
      const body = document.body;
      if (isDarkMode) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }, [isDarkMode]);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };
  
    const handleLogout = () => {

      localStorage.removeItem('token');
      navigate('/login');
      setProgress(100);
    };
    useEffect(() => {
      // eslint-disable-next-line
      if(localStorage.getItem('token')){
      getDetails();}
      else{
     navigate("/login");
      }
    }, []);
  
  return (
    <div>
          <div className="d-flex align-items-center">
             

             <div className="d-flex">
               <div className="dropdown  me-1 " >
                 <button type="button" className="border  rounded-circle " data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" style={{ marginRight: "20px" }}>
                   <img src={logo} width="30" alt="imageLogo" />
                 </button>
                 <div className="dropdown-menu mt-3 dropdown-menu-lg-end " style={{ width: "350px" }}>
                   <div className="d-flex flex-column justify-content-center align-items-center">
                     <img src={logo} alt="profile" />
                     <div className="d-flex flex-column mt-4 justify-content-center align-items-center">
                       <h4>{user && user.name}</h4>
                       <h6>{user &&user.email}</h6>
                    
                       <h6>Joined By: {user && new Date(user.date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</h6>
                     </div>
                     <div className="myBtn d-flex my-4 flex-column gap-2  justify-content-center align-items-center">
                       {/* <button type='button' className='btn btn-info'>Change Mood</button> */}
                       <button onClick={toggleDarkMode} style={{ backgroundColor: "rgb(108,117,125)", color: "white", border: "0px", padding: "4px" }} className="rounded">

                         <div className="d-flex form-check form-switch p-0">

                           <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                           <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" style={{ marginLeft: "12px" }} />
                         </div>
                       </button>

                       <button onClick={handleLogout} className="btn btn-secondary" style={{ marginLeft: "20px" }}>
                         Logout
                       </button>
                     </div>
                   </div>

                 </div>
               </div>

             </div>
             {/* <button onClick={handleLogout} className="btn btn-secondary" style={{marginLeft:"20px"}}>
               Logout
             </button> */}
           </div>
    </div>
  )
}

export default Details
