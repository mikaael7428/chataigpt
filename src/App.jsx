import React, { useState } from "react";

export default function App() {

  const [messages, setMessages] = useState([]);

  async function sendMessage(text) {

    const newMessages = [...messages, { role: "user", text }];
    setMessages(newMessages);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", text: data.reply }
    ]);
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* Sidebar */}
      <div style={{ width: 250, background: "#111", color: "white", padding: 20 }}>
        <h2>chatAigpt</h2>
        <button style={{ width: "100%", padding: 10 }}>
          + Neuer Chat
        </button>
      </div>

      {/* Chat Bereich */}
      <div style={{ flex: 1, background: "#1e1e1e", color: "white", display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, padding: 20 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <b>{m.role === "user" ? "Du" : "AI"}:</b> {m.text}
            </div>
          ))}
        </div>

        <input
          placeholder="Nachricht senden..."
          style={{ padding: 15, border: "none" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />

      </div>
    </div>
  );
}
