import React from "react";
import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);

  function sendMessage(text) {
    setMessages([...messages, { role: "user", text }]);
  }

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>ChatAigpt WebApp</h1>

      <input
        placeholder="Nachricht schreiben..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      />

      {messages.map((m, i) => (
        <div key={i}>{m.text}</div>
      ))}
    </div>
  );
}
