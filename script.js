import { GoogleGenerativeAI } from "./apigem.js";
import { CohereClientV2 } from "./cohere.js";
import { getGroqChatCompletion } from "./groq.js";

const genAI = new GoogleGenerativeAI("AIzaSyCjSp0n1XURr_VD-JbrVMs2DznikbB791s");
const cohere = new CohereClientV2({ token: "GIS1rGjUO3tCUOt6LCYpxEjTBggu3NgvTPEyqlCQ" });

document.getElementById("prompt-btn").addEventListener("click", () => {
  document.getElementById("output").textContent = "Prompting AI models...";
});

document.getElementById("submit-btn").addEventListener("click", async () => {
  const results = await Promise.all([
    genAI.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("hello"),
    cohere.chat({
      model: "command-r-plus",
      messages: [{ role: "user", content: "hello world!" }],
    }),
    getGroqChatCompletion(),
  ]);

  const consensus = results.map(res => res.message?.content || res.response.text());
  document.getElementById("output").textContent = `Consensus: ${consensus.join(", ")}`;
});
