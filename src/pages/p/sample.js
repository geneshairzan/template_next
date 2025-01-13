// pages/index.js
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

const Home = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:3000");

    socket.on("chat message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("users", (usersList) => {
      setUsers(usersList);
    });

    // Clean up the socket when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      console.log("sending");
      socket.emit("chat message", {
        data: message,
        from: "12221",
        ts: new Date(),
      });
      setMessage("");
    }
  };

  const setUser = () => {
    if (username.trim()) {
      socket.emit("new user", username);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Simple Chat with Socket.IO and Next.js</h1>
      {!username ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ padding: "8px" }}
          />
          <button onClick={setUser} style={{ padding: "8px" }}>
            Set Username
          </button>
        </div>
      ) : (
        <div>
          <h2>Hello, {username}</h2>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              style={{ padding: "8px" }}
            />
            <button onClick={sendMessage} style={{ padding: "8px" }}>
              Send
            </button>
          </div>

          <div>
            <h3>Online Users:</h3>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Messages:</h3>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>{msg.data}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
