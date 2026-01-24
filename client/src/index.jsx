import React, {useContext} from "react";
import { UserContext } from "./components/App";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import Skeleton from "./components/pages/Skeleton";
import NotFound from "./components/pages/NotFound";

import Profile from "./components/pages/Profile";
import Game from "./components/pages/Game";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { GoogleOAuthProvider } from '@react-oauth/google';

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "406378486796-rpb1mha7rjuhh0h32vhjngoothur4vl8.apps.googleusercontent.com";

// const { userId, handleLogin, handleLogout } = useContext(UserContext);

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<Skeleton />}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/game" element={<Game />} />

      {/* <Route path={`/profile/${userId}`} element={<Profile />} /> */}
      {/* <Route path="/maze" element={<Maze />} /> */}
    </Route>

  )
)

// renders React Component "Root" into the DOM element with ID "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
