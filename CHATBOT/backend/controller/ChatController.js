const fetch = require("node-fetch");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function handleChatRequest(req, res) {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }

  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is not set in .env file!");
    return res
      .status(500)
      .json({ message: "Server configuration error: API key missing." });
  }

  const instruction = `
You are an expert on the Constitution of Kenya (2010). Answer clearly and simply, like explaining to a student. Use ONLY information from the Constitution of Kenya.

Even if the question has limited details, give the best related answer from the Constitution.

Always include the relevant Chapter, Article, and Section numbers in your answer.

If the question is not about the Constitution of Kenya, reply politely:
"I'm here to help only with questions about the Constitution of Kenya (2010). Please ask a question related to it."
`;

  // Construct chat message according to Gemini chat API structure
  const chatHistory = [
    {
      role: "user",
      parts: [
        {
          text: `${instruction}\n\n${prompt}`,
        },
      ],
    },
  ];

  const payload = { contents: chatHistory };

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return res.status(response.status).json({
        message: `Failed to get response from AI: ${
          errorData.message || "Unknown API error"
        }`,
        details: errorData,
      });
    }

    const result = await response.json();

    // Check the structure and extract the text answer
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      const aiResponse = result.candidates[0].content.parts[0].text;
      return res.json({ response: aiResponse });
    } else {
      console.error("Unexpected Gemini API response structure:", result);
      return res
        .status(500)
        .json({ message: "AI response structure was unexpected." });
    }
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { handleChatRequest };
