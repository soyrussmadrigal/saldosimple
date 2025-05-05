// /src/pages/api/summarize.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    const { content } = req.body;
  
    if (!content || typeof content !== "string") {
      return res.status(400).json({ error: "Contenido inválido" });
    }
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Eres un redactor experto. Resume el siguiente texto en un párrafo claro y profesional, en español. Máximo 100 palabras.",
            },
            {
              role: "user",
              content,
            },
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error("Error OpenAI:", data);
        return res.status(500).json({ error: "Error al generar resumen" });
      }
  
      const summary = data.choices?.[0]?.message?.content?.trim();
  
      res.status(200).json({ summary });
    } catch (err) {
      console.error("Error de red:", err);
      res.status(500).json({ error: "Error al conectar con OpenAI" });
    }
  }
  