You are an expert AI developer.

I will give you the full source code of my website/webapp. Your task is to **add a new feature** to it while **preserving all existing logic, layout, styling, and behavior**.

### Objective:
Transform the existing frontend into an **AI-powered interface**, inspired by a "Mission Control Panel (MCP)" concept.

### Key Features to Add:
1. **Function Reflection/Registry**:
   - Collect and list all available frontend functions (manually defined functions in the code).
   - Prepare them in a structured format (JSON or JS object) including:
     - `name`
     - `description` (from docstring or comment)
     - `parameters`
   - This function list will be sent to an AI model.

2. **AI Chat Interface**:
   - Add a minimal but functional chat interface on the UI.
   - User types commands/goals in natural language.
   - Send the message + function list to an AI model (e.g. via OpenAI API).
   - Receive step-by-step plan from AI (what functions to call, with what args).

3. **Action Executor**:
   - Parse the AI’s response.
   - Match it to real functions in the code.
   - Call them with the right parameters.
   - (Optional: Ask user for confirmation before execution.)

4. **Non-Intrusive Integration**:
   - Do NOT modify or break any existing features, styles, or pages.
   - Keep your added code modular and separated — use new files/components/hooks where needed.
   - Comment your additions clearly for easy removal or expansion.

5. **Fallback Behavior**:
   - If AI returns an invalid or unknown function, gracefully handle it and notify the user.

### Notes:
- Use React (or match the framework in the provided code).
- Use clean, readable code and descriptive names.
- Don’t remove or refactor any existing code unless required for integration.
- Add an `enableAIAssistant` flag so the feature can be toggled.

Once ready, wait for the full codebase or file input.
