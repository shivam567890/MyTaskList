import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const [alert,setAlert]=useState({type:"",msg:""});
  const [show,setShow]=useState(false);

    const showAlert=(alertData)=>{
        setAlert(alertData);
       setShow(true);
      
    }
    
  return (
    <AlertContext.Provider value={{alert,show,setShow,showAlert}}>
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
