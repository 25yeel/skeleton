import React, { useState, useEffect, createContext } from "react";
import { Outlet, Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);

import Navbar from "./modules/Navbar";
import Skeleton from "./pages/Skeleton";
import Profile from "./pages/Profile";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <UserContext.Provider value={authContextValue}>
      {/* <Navbar
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userId={userId}
      /> */}
      <Outlet />
    </UserContext.Provider>
    // <>
    // <Navbar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
    //   <div className="App-container">
    //     <Router>
    //       <Profile path="/profile/:userId"/>
    //     </Router>
    //   </div>
    // </>
  );
};

export default App;
