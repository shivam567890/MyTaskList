import './App.css';
import Navbar from './Component/Navbar';
import { About } from './Component/About';
import { Home } from './Component/Home';
import {Login} from './Component/Login';
import {Signup} from './Component/Signup';
import {
  BrowserRouter as Router,
 Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './Component/Alert';
import AlertState from './context/alerts/AlertState';

function App() {
  return (
    <>
    <NoteState>
      <AlertState>
     <Router>
   <Navbar/>
   <Alert/>
   <div className="container">
   <Routes>
    <Route path='/'  element={<Home/>}/>
    <Route path='/about'  element={<About/>}/>
    <Route path='/login'  element={<Login/>}/>
    <Route path='/signup'  element={<Signup/>}/>
   </Routes>
   </div>
   </Router>
   </AlertState>
   </NoteState> 
  </>
  );
}

export default App;
