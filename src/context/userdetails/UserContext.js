import React, { createContext, useState} from 'react';

// Create the user context
export const UserContext = createContext();

// Create a user provider component
export const UserProvider = ({ children }) => {
  const host = "https://mytasklist-backend.onrender.com";
  const [user, setUser] = useState(null);

  
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


  return (
    <UserContext.Provider value={{ user,getDetails }}>
      {children}
    </UserContext.Provider>
  );
};
