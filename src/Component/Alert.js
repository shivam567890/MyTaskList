import React, { useContext } from 'react'
import alertContext from '../context/alerts/AlertContext'

const Alert = () => {
  const {alert,show,setShow}=useContext(alertContext);
   
  setTimeout(() => {
    setShow(false);
  }, 1000);
  return (
    <div>
      <div className={`alert alert-${alert.type} d-${show?"block":"none"}`} role="alert">
  {alert.msg}
</div>
    </div>
  )
}
export default Alert

