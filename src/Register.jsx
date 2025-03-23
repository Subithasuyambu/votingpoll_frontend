import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const register = () => {
    axios
      .post("http://localhost:5000/register", { username, email, password })
      .then(() => {
        setMessage("✅ User Registered Successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Registration failed. Please try again.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={register} style={styles.button}>
        Register
      </button>

      {message && <p style={styles.message}>{message}</p>}

      <p style={styles.loginText}>
        Already have an account?{" "}
        <button onClick={() => navigate("/login")} style={styles.loginButton}>
          Login
        </button>
      </p>
    </div>
  );
}

// 🔹 Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "250px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "270px",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#d9534f",
    fontWeight: "bold",
  },
  loginText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  loginButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Register;
