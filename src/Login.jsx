import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username); // Sto
     
        setUsername(response.data.username);
        console.log("login", response.data.username);
        setMessage("✅ Login Successful! Redirecting...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setMessage("❌ Login failed. Please check your credentials.");
      });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔐 Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={login} style={styles.button}>
        Login
      </button>

      {message && <p style={styles.message}>{message}</p>}

      <p style={styles.registerText}>
        Don't have an account?{" "}
        <button onClick={() => navigate("/register")} style={styles.registerButton}>
          Register
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#d9534f",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  registerButton: {
    background: "none",
    border: "none",
    color: "#007bff",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
