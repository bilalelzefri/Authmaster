import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.user);
      } catch {
        navigate("/signin");
      }
    };
    fetchUser();
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <p>Joined on: {new Date(userData.createdAt).toLocaleDateString()}</p>
    </div>
  );
}

export default Dashboard;
