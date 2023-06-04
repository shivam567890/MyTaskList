import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import NoteState from './context/notes/NoteState';
import AlertState from './context/alerts/AlertState';
import { UserProvider } from './context/userdetails/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <NoteState>
    <AlertState>
        <UserProvider>
          <App />
        </UserProvider>
    </AlertState>
      </NoteState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

