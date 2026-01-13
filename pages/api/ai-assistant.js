import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { txId } = req.body;

  try {
    // FIX: Update model name to Gemini 3 Flash
    // This is the fastest and most stable model for 2026
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
      You are a helpful crypto assistant. 
      Explain this transaction to a user: ${txId}. 
      Context: This was a successful 0.1 USDC transfer on the Arc Network. 
      Keep it to 2 short, friendly sentences.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ summary: text });

  } catch (error) {
    console.error("GEMINI API ERROR:", error);
    
    // Fallback message so the UI doesn't break if the AI is busy
    res.status(500).json({ 
      error: "AI failed to respond.",
      summary: "Your 0.1 USDC transfer on Arc was successful! (AI Summary temporarily unavailable)" 
    });
  }
}