/**
<script src="https://js.puter.com/v2/"></script>

 * Simple AI Request Handler (Puter.js based)
 * -----------------------------------------
 * This function takes user input (text/topic) and optionally an image,
 * sends it to the AI via Puter.js, and returns the parsed JSON response.
 * 
 * Features:
 * - Handles optional base64 image input
 * - Wraps user input with a system prompt
 * - Extracts JSON from AI response
 * - Throws errors if response invalid
 *
 * @param {string} userInput - The user's text prompt or topic
 * @param {string} [base64Image] - Optional base64 image string
 * @param {string} [systemPrompt] - Optional system instructions for AI
 * @returns {Promise<Object>} - Parsed JSON object from AI
 */
async function generateAIJson(userInput, base64Image = null, systemPrompt = "") {
    if (!userInput && !base64Image) {
        throw new Error("Provide either text input or image.");
    }

    const prompt = `
${systemPrompt}

=== USER REQUEST ===
${userInput || "Process image to JSON"}

OUTPUT: Only JSON, no extra text
`;

    const response = await puter.ai.chat(
        prompt,
        base64Image ? `data:image/jpeg;base64,${base64Image}` : undefined,
        { model: 'gemini-3-flash-preview' } // choose model as needed
    );

    // Extract JSON block from AI response
    const match = response.message.content.match(/```json\s*([\s\S]*?)\s*```/);
    if (!match) throw new Error("AI did not return JSON");

    const data = JSON.parse(match[1].trim());
    return data; // Returns parsed object for further use
}

/* Usage Example */
(async () => {
    try {
        const jsonData = await generateAIJson(
            "Explain Microbiology Unit 1 as a video plan",
            null,
            "You are a professional documentary director. Produce a cinematic video plan in JSON format."
        );
        console.log("AI JSON Output:", jsonData);
    } catch (err) {
        console.error("AI Error:", err.message);
    }
})();
