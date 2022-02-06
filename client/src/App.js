/** @format */

import "../style.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login/login-father";
import Register from "./pages/register/register";
import Profile from "./pages/profile/user-profile";
import Home from "./pages/home/home";
import PrivateRoute from "./utils/private-route";
import Explore from "./pages/explore/explore";
import Post from "./pages/post/post";
import Navbar from "./navbar/navbar";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Home />
                </>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            exact
            path="/profile/:id"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/post/:id"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/explore"
            element={
              <PrivateRoute>
                <Explore />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
