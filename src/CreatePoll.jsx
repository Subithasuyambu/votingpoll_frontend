import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to log in!");
    if (!question.trim()) return alert("Poll question is required!");
    if (!startDate || !endDate) return alert("Start and end dates are required!");
    if (new Date(startDate) >= new Date(endDate)) return alert("End date must be after start date!");
    if (!createdBy.trim()) return alert("Creator name is required!");
    if (options.some((opt) => !opt.trim())) return alert("All options must be filled!");

    const pollData = {
      question,
      options,
      start_date: startDate,
      end_date: endDate,
      created_by: createdBy,
    };

    try {
      await axios.post("http://localhost:5000/create-poll", pollData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      alert("Poll Created Successfully!");
      navigate("/view-polls");
    } catch (error) {
      console.error("Error creating poll:", error.response?.data || error.message);
      alert("Error creating poll. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create a New Poll</h2>

        <input type="text" placeholder="Enter poll question..." value={question} onChange={(e) => setQuestion(e.target.value)} style={styles.input} />

        <input type="text" placeholder="Enter creator name..." value={createdBy} onChange={(e) => setCreatedBy(e.target.value)} style={styles.input} />

        <label>Poll Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />

        <label>Poll End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />

        {options.map((option, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} style={styles.input} />
        ))}

        <button style={styles.addButton} onClick={addOption}>➕ Add Option</button>
        <button style={styles.createButton} onClick={createPoll}>✅ Create Poll</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
    fontSize: "22px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  addButton: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  createButton: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default CreatePoll;
