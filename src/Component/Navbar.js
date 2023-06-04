
import React from 'react';
import { Link, useLocation} from 'react-router-dom';

import Details from './Details';
const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg shadow fixed-top" style={{ background: '#f6bb00' }}>
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
            <Details/>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
