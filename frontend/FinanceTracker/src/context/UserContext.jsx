/**
 * USER CONTEXT - Global User State Management
 * ============================================
 *
 * This context eliminates the need to pass user data through every component
 * by creating a "global store" for authentication and user information.
 *
 * Think of it like WiFi: Instead of running cables (props) through every room
 * (component), we broadcast the signal (context) once, and any component can
 * connect directly to access user data.
 *
 * HOW IT WORKS IN THIS APP:
 * -------------------------
 * 1. Login Flow:
 *    - User logs in → receive user data from API
 *    - Call updateUser(userData) → stores in context
 *    - Now ALL components can access user info without prop drilling
 *
 * 2. Throughout the App:
 *    - Header: Shows user's name and profile image
 *    - Dashboard: Displays personalized financial data
 *    - Protected Routes: Check if user exists to allow access
 *    - Any Component: Can check login status with if(user)
 *
 * 3. Logout Flow:
 *    - Call clearUser() from any component
 *    - User data removed from context
 *    - All components update automatically
 *
 * USAGE EXAMPLE:
 * -------------
 * // In any component:
 * import { useContext } from 'react';
 * import { UserContext } from '../contexts/UserContext';
 *
 * const MyComponent = () => {
 *   const { user, updateUser, clearUser } = useContext(UserContext);
 *
 *   // Access user: user?.fullName, user?.email, etc.
 *   // Update user: updateUser(newUserData)
 *   // Logout: clearUser()
 * };
 *
 * SETUP:
 * ------
 * Wrap your App component with UserProvider:
 * <UserProvider>
 *   <App />
 * </UserProvider>
 *
 * BENEFITS:
 * ---------
 * • No prop drilling - access user data anywhere
 * • Single source of truth for authentication state
 * • Automatic updates - when user changes, all components re-render
 * • Clean logout - one function clears user everywhere
 * • Simplified auth checks - just check if(user) in any component
 */

import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (e.g. on logout)
  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
