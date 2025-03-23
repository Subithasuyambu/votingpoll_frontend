import React, { useEffect, useState } from "react";
import axios from "axios";


function ViewPolls() {
  const [polls, setPolls] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // Store user ID for authentication
  const username = localStorage.getItem("username");
  console.log(username);

  useEffect(() => {
    console.log("Fetching polls...");
    axios
      .get("http://localhost:5000/polls")
      .then((response) => {
        console.log("Polls fetched successfully:", response.data);
        setPolls(response.data);
      })
      .catch((err) => console.error("Error fetching polls:", err));
  }, []);

  const vote = async (pollId, optionId) => {
    if (!token) {
      alert("You need to log in to vote!");
      return;
    }
    console.log(`Casting vote for Poll ID: ${pollId}, Option ID: ${optionId}`);

    try {
      const response = await axios.post(
        "http://localhost:5000/vote",
        { optionId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Vote response:", response.data);
      
      setPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll.id === pollId
            ? {
                ...poll,
                options: poll.options.map((option) =>
                  option.id === optionId
                    ? { ...option, votes: option.votes + 1 }
                    : option
                ),
              }
            : poll
        )
      );
      alert("Vote successfully casted!");
    } catch (err) {
      console.error("Error casting vote:", err);
    }
  };
  

 
  const deletePoll = async (pollId, createdBy) => {
    console.log("Delete button clicked for poll:", pollId); // Debugging
    console.log("Logged-in user:", username);
    console.log("Stored username:", localStorage.getItem("username"));
console.log("State username:", username);


    if (createdBy !== username) {
    
      alert("You can only delete your own polls!");
      console.log("Delete blocked: Not your poll"); // Debugging
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:5000/polls/${pollId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", response); // Debugging

      alert("Poll deleted successfully!");
      ViewPolls(); // Refresh polls after deletion
    } catch (error) {
      console.error("Error deleting poll:", error);
      alert("Error deleting poll");
    }
  };







  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Available Polls</h2>
      {polls.length === 0 ? (
        <p style={styles.noPolls}>No polls available</p>
      ) : (
        <div style={styles.pollGrid}>
          {polls.map((poll) => {
            console.log("Rendering poll:", poll);
            const topVotedOption = poll.options.reduce((max, option) =>
              option.votes > max.votes ? option : max
            );

            return (
              <div key={poll.id} style={styles.pollCard}>
                <h3 style={styles.pollQuestion}>{poll.question}</h3>
                <p style={styles.pollInfo}>Created by: {poll.created_by}</p>
                <p style={styles.pollDates}>
                  🗓️ {poll.start_date} TO {poll.end_date}
                </p>
                {poll.options.map((option) => (
                  <div key={option.id} style={styles.optionContainer}>
                    <button
                      style={styles.voteButton}
                      onClick={() => vote(poll.id, option.id)}
                    >
                      {option.text}
                    </button>
                    <div style={styles.voteBox}>
                      {option.votes} <span>👍</span>
                    </div>
                  </div>
                ))}
                <div style={styles.topVoted}>
                  🏆 <strong>Top Voted:</strong> {topVotedOption.text} ({topVotedOption.votes} votes)
                </div>
                <br></br>

                <button onClick={(e) => { e.preventDefault(); deletePoll(poll.id, poll.created_by); }}>Delete</button>

            

                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
    textAlign: "center",
  },
  noPolls: {
    fontSize: "18px",
    color: "#888",
  },
  pollGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
    width: "100%",
    maxWidth: "900px",
  },
  pollCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  pollQuestion: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
  },
  pollInfo: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  pollDates: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "15px",
  },
  optionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "10px",
  },
  voteButton: {
    flexGrow: 1,
    padding: "12px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    fontWeight: "bold",
  },
  voteBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "55px",
    padding: "6px",
    borderRadius: "6px",
    backgroundColor: "#e0e0e0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  topVoted: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#ffeaa7",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: "15px",
    padding: "10px",
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ViewPolls;
