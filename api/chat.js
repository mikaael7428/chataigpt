export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: req.body.messages
      })
    });

    const data = await response.json();
    const reply =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "Keine Antwort erhalten.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ error: "Serverfehler" });
  }
}
