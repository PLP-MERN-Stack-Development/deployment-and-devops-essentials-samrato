// const path = require("path");
// const fs = require("fs").promises;
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// let constitutionText = "";
// let validModelName = null;

// // Load constitution file once
// const initializeGeminiContext = async () => {
//   try {
//     const filePath = path.join(__dirname, "..", "const", "The_Constitution_of_Kenya_2010.txt");
//     constitutionText = await fs.readFile(filePath, "utf-8");
//     console.log("Constitution loaded successfully.");
//   } catch (err) {
//     console.error("Failed to load constitution:", err);
//   }
// };
// const initializeModel = async () => {
//     try {
//       const models = await genAI.listModels();
//       console.log("Raw models list from API:", JSON.stringify(models, null, 2));
  
//       for (const model of models) {
//         console.log(`Model name: ${model.name}, supportedGenerationMethods: ${model.supportedGenerationMethods}`);
//         if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes("generateContent")) {
//           validModelName = model.name;
//           break;
//         }
//       }
  
//       if (!validModelName && models.length > 0) {
//         validModelName = models[0].name;
//       }
  
//       console.log("Selected model:", validModelName);
//     } catch (err) {
//       console.error("Failed to list models:", err);
//     }
//   };
  

// // Call initializers immediately
// initializeGeminiContext();
// initializeModel();

// exports.askQuestion = async (req, res) => {
//   const { question } = req.body;

//   if (!question) {
//     return res.status(400).json({ error: "Question is required." });
//   }

//   if (!validModelName) {
//     return res.status(500).json({ error: "No valid model available to process requests." });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: validModelName });

//     const prompt = `
// You are a legal expert trained strictly on the **Constitution of Kenya (2010)**. Answer the question below **only using information from the constitution**, referencing the **Chapter and Article** where appropriate.

// ### Constitution:
// ${constitutionText.slice(0, 20000)}

// ### Question:
// ${question}
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const answer = response.text();

//     res.json({ answer, modelUsed: validModelName });
//   } catch (err) {
//     console.error("Gemini error:", err);
//     res.status(500).json({ error: "Failed to get an answer from Gemini." });
//   }
// };
