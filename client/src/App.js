/** @format */

import "../style.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import PrivateRoute from "./utils/PrivateRoute";
import Explore from "./pages/explore/Explore";
import Post from "./pages/post/Post";
import Navbar from "./navbar/Navbar";

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
                <>
                  <Navbar />
                  <Profile />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/post/:id"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Post />
                </>
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/explore"
            element={
              <PrivateRoute>
                <>
                  <Navbar />
                  <Explore />
                </>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
