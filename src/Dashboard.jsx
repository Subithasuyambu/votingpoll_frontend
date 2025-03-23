import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    return <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>You need to log in first!</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to Polls Dashboard</h2>
        <button style={styles.button} onClick={() => navigate("/create-poll")}>Create Poll</button>
        <button style={styles.button} onClick={() => navigate("/view-polls")}>View Polls</button>
      </div>
    </div>
  );
}

// 🔹 Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    width: "300px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Dashboard;
