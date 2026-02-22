
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Increase limit for larger JSON scripts

// --- GEMINI API SETUP ---
let ai;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
} else {
    console.error("FATAL ERROR: API_KEY is not defined in the environment variables. Please create a .env file or set the environment variable in your hosting provider.");
}


// --- PROMPT TEMPLATES ---
const SCRIPT_GENERATION_PROMPT = (topic, template) => `
You are an expert content creator and data storyteller. Your task is to generate a complete, syntactically perfect JSON video script about the topic: "${topic}".

**INSTRUCTIONS:**
1.  **Strictly adhere to the provided JSON structure.** Do not add, remove, or rename any keys. The entire output must be a single raw JSON object, with no markdown, no explanations, and no surrounding text.
2.  **Scene Flexibility:** You are not required to use every scene type from the template. You can use any scene type multiple times if it helps tell a better story. The goal is a high-quality presentation on the topic, not just filling out a form.
3.  **Content:** Populate the JSON with compelling, accurate, and relevant content. Ensure every scene has a unique 'id'.
4.  **Visuals & Theme:**
    *   For any 'imageUrl', provide real, working, high-quality image URLs from a reliable source like unsplash.com or wikimedia.org.
    *   Be creative with the global 'theme' object. Choose a color palette that fits the topic.
    *   You can also specify a 'backgroundCss' property at the root level for a custom CSS background (e.g., "linear-gradient(to right, #000000, #434343)").
5.  **Narration:** The narration should be engaging, clear, and match the content of each scene.
6.  **Transitions:** You can add an optional 'transition' object to scenes with a 'type' ('fade', 'slide', 'zoom') and a 'duration' in milliseconds.

**JSON TEMPLATE TO FOLLOW (use as a guide for structure, not as a rigid list of scenes):**
${JSON.stringify(template, null, 2)}
`;

const SCRIPT_IMPROVEMENT_PROMPT = (userPrompt, currentJson) => `
You are an expert video script editor. A user wants to modify their video script based on the following request: "${userPrompt}"

**INSTRUCTIONS:**
1.  Read the user's request and the provided JSON script carefully.
2.  Modify the JSON script to fulfill the user's request. You can change text, add new scenes, remove scenes, update themes, or reorder scenes.
3.  **CRITICAL:** Your entire output must be ONLY the modified, complete, and syntactically perfect JSON object. Do not include any explanations, markdown, or surrounding text.
4.  Ensure all scene IDs remain unique. If you add a scene, create a new unique ID for it (e.g., scene_quiz_13).
5.  Feel free to add or modify 'transition' properties on scenes to improve the flow.

**CURRENT JSON SCRIPT TO MODIFY:**
${JSON.stringify(currentJson, null, 2)}
`;

/**
 * Extracts a JSON object from a string, even if it's embedded in markdown.
 * @param {string} text The text response from the AI.
 * @returns {object|null} The parsed JSON object or null if not found/invalid.
 */
function extractJson(text) {
    if (!text) return null;
    const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[0]);
        } catch (e) {
            console.error("Failed to parse extracted JSON:", e);
            console.error("Original text was:", text);
            return null;
        }
    }
    return null;
}

// --- API ENDPOINTS ---
app.post('/api/generate', async (req, res) => {
    if (!ai) {
        return res.status(500).json({ error: 'Server is not configured with an API key.' });
    }
    const { topic, template } = req.body;
    if (!topic || !template) {
        return res.status(400).json({ error: 'Missing topic or template in request body' });
    }

    try {
        const prompt = SCRIPT_GENERATION_PROMPT(topic, template);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        const parsedJson = extractJson(response.text);
        if (!parsedJson) throw new Error("AI response did not contain valid JSON.");
        res.json(parsedJson);
    } catch (error) {
        console.error('Error generating script:', error);
        res.status(500).json({ error: 'Failed to generate script from AI', details: error.message });
    }
});

app.post('/api/improve', async (req, res) => {
    if (!ai) {
        return res.status(500).json({ error: 'Server is not configured with an API key.' });
    }
    const { prompt: userPrompt, currentJson } = req.body;
    if (!userPrompt || !currentJson) {
        return res.status(400).json({ error: 'Missing prompt or currentJson in request body' });
    }

    try {
        const prompt = SCRIPT_IMPROVEMENT_PROMPT(userPrompt, currentJson);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { responseMimeType: 'application/json' }
        });
        const parsedJson = extractJson(response.text);
        if (!parsedJson) throw new Error("AI response did not contain valid JSON.");
        res.json(parsedJson);
    } catch (error) {
        console.error('Error improving script:', error);
        res.status(500).json({ error: 'Failed to improve script with AI', details: error.message });
    }
});

// --- EXPORT FOR SERVERLESS ENVIRONMENT ---
export default app;
