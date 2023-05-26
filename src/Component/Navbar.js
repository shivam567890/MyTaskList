
import React, { useState, useEffect ,useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {UserContext} from '../context/userdetails/UserContext';

import logo from '../image/user (1).png'
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user}=useContext(UserContext);

  const [isDarkMode, setIsDarkMode] = useState(false);

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
  };

  return (
    <nav className="navbar navbar-expand-lg shadow" style={{ background: '#f6bb00' }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-white fw-bold" to="#">
          MyTaskList
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold text-white ${location.pathname === '/' ? 'active' : ''
                  }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link fw-semibold text-white ${location.pathname === '/about' ? 'active' : ''
                  }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? (
            <div className="d-flex mx-2">
              <Link type="button" className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link type="button" className="btn btn-primary mx-2" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              {/* <!-- Button trigger modal --> */}
              <div class="d-flex">
                <div className="dropdown dropstart me-1" >
                  <button type="button" className="border  rounded-circle " data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20" style={{ marginRight: "20px" }}>
                    <img src={logo} width="30" alt="imageLogo" />
                  </button>
                  <div className="dropdown-menu mt-5 " style={{ width: "350px" }}>
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
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
