import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/signup" style={{ marginRight: 10 }}>Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
