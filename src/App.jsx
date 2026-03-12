import React, { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  function sendMessage() {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "ai", text: "Demo Antwort: " + input }
    ]);

    setInput("");
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#212121", color: "white", fontFamily: "Arial" }}>
      
      <div style={{ width: "260px", background: "#171717", padding: "20px" }}>
        <h2>chatAigpt</h2>
        <button style={{ width: "100%", padding: "10px", marginTop: "10px" }}>
          + Neuer Chat
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, padding: "20px", overflow: "auto" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: "15px", textAlign: m.role === "user" ? "right" : "left" }}>
              <div style={{
                display: "inline-block",
                background: m.role === "user" ? "#303030" : "#2a2a2a",
                padding: "10px 15px",
                borderRadius: "10px"
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Nachricht senden..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "none"
            }}
          />
        </div>

      </div>
    </div>
  );
}
