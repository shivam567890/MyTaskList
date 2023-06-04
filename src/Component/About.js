import React, { useContext, useState } from 'react';
import Developer from '../image/Developer.jpeg';
import alertContext from '../context/alerts/AlertContext';

export const About = () => {
  const { showAlert } = useContext(alertContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      showAlert({ type: 'danger', msg: 'Please fill in all the fields' });
    } else {
      setTimeout(() => {
        showAlert({ type: 'success', msg: 'Your Feedback has been sent successfully' });
      }, 1500);
    }
  };

  return (
    <div className="container mt-4" style={{ paddingTop: '70px' }}>
      <div className="row">
        <div className="col-lg-6">
          <img src={Developer} alt="MERN Stack Developer | Software Engineer" className="img-fluid rounded-circle shadow-sm" style={{ width: '200px', height: '200px' }} />
          <div className="">
            <h3>Shivam Khandelwal</h3>
            <h6>MERN Stack Developer | Software Engineer</h6>
            <h6>shivam.kh007@gmail.com</h6>
            <h6>+91-9670388764</h6>
          </div>
        </div>
        <div className="col-lg-6 mt-3">
          <h2>About Task Management</h2>
          <p>
            Welcome to our Task Management Website!
            <br />
            <br />
            At [MyTaskList], we believe that staying organized and productive is the key to success. Our task management website provides you with a user-friendly platform to help you effectively manage your tasks and stay on top of your commitments.
            <br />
            <br />
            With our intuitive interface and powerful features, you can easily create, update, and delete your tasks, ensuring that nothing falls through the cracks. Whether you're a student, professional, or a busy individual, our website is designed to streamline your workflow and enhance your productivity.
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-12">
          <h2>Give Feedback</h2>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="3" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};
