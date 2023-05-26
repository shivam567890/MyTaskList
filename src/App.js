import './App.css';
import Navbar from './Component/Navbar';
import { About } from './Component/About';
import { Home } from './Component/Home';
import { Login } from './Component/Login';
import { Signup } from './Component/Signup';
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Component/Alert';
import AlertState from './context/alerts/AlertState';
import {UserProvider} from './context/userdetails/UserContext';
function App() {
const [progress, setProgress] = useState(100)

  const st={
    display: 'flex',
    flexDirection : 'column',
    alignItems: "center",
   justifyContent: 'center',
    margin:' 30px'
  }
  return (
    <div className="my-bg " >
      <NoteState>
        <AlertState>
         <UserProvider>
          <Router>
          <LoadingBar
        color='#0C6EFD'
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
                     />
            <Navbar />
            <Alert />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
              </Routes>
            </div>
            
            <div style={st} className=''>
              <hr  style={{width:'80%'}}/>
              <span style={{color:"white"}}>&copy; All rights reserved </span>
              <span style={{color:"white"}}>Created By:Shivam Khandewal</span>
            </div>
          </Router>
          </UserProvider>
        </AlertState>
      </NoteState>
    </div>
  );
}

export default App;
