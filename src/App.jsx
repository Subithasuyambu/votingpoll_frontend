import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import CreatePoll from "./CreatePoll";
import ViewPolls from "./ViewPllos"; // ✅ Fixed Import
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-poll" element={<CreatePoll />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-polls" element={<ViewPolls />} />
      </Routes>
    </Router>
  );
}

export default App;
