import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/signup", form);
      alert("User created! Please sign in.");
      navigate("/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        style={{ display: "block", marginBottom: 10, width: "100%", padding: 8 }}
      />
      <button type="submit" style={{ padding: 10, width: "100%" }}>Sign Up</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default SignUp;
