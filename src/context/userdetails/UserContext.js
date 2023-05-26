import React, { createContext, useState, useEffect } from 'react';

// Create the user context
export const UserContext = createContext();

// Create a user provider component
export const UserProvider = ({ children }) => {
  const host = "http://localhost:5000";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        // API Call
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });

        const userData = await response.json();
        setUser(userData);
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getDetails();
  }, []);

  // const updateUser = (userData) => {
  //   setUser(userData);
    console.log(user);
  // };

  return (
    <UserContext.Provider value={{ user}}>
      {children}
    </UserContext.Provider>
  );
};
