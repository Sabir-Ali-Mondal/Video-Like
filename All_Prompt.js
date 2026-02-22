        const SCRIPT_PROMPT = `
**Role:** Deep Research Strategist & Narrative Architect
**Objective:** Provide a high-density **Context & Resource Brief** for an elite Video Director.
**Style:** Vox-level depth, journalistic accuracy, cinematic storytelling.

**Instructions:**
1. **Deep Context:** Explain not just the facts, but their *significance*, *conflict*, or *irony*. Include analogies or mental models to make complex ideas simple and memorable.
2. **Thematic Chapters:** Break the topic into as many logical chapters as needed. Each chapter may contain multiple **micro-beats** to fully explore the idea. There is **no limit** on chapters.
3. **Data Vault:** Provide specific, verified numbers, percentages, and dates. Include raw data if it can be visualized.
4. **Visual Lexicon:** Describe the *feeling*, *metaphor*, and *motion* of the concept (e.g., "like a wildfire spreading," "a house of cards collapsing," "digital veins pulsing"). No technical scene types — only imagery.
5. **Journalistic Elements:** Include optional content types naturally in the brief:
   - **News Headlines**: Short, punchy lines that highlight a key event.
   - **Breaking Alerts**: Dramatic one-line facts that would catch attention.
   - **Quotes / Testimonies**: Relevant statements from experts, witnesses, or historical figures.
   - **Historical Notes / Context**: Add dates, background events, and turning points.
6. **Resources & References:** Include key people, locations, events, or searchable keywords for images, footage, or textures.
7. **Pacing & Flow:** Chapters and micro-beats should feel connected, with a natural narrative arc. Suggest pacing or emphasis (e.g., slow focus, rapid movement) when needed.
8. **Creative Freedom:** Invent new chapters, metaphors, or analogies if they better explain the topic. Do not feel constrained by examples.

**Output Format (Strict Text Blocks):**

---
**[THEME]** Chapter Name  
**[CONTEXT]** Deep dive narrative and explanation (conversational, Netflix-doc style)  
**[ANALOGY]** Mental model or metaphor to clarify the concept  
**[DATA_VAULT]** Specific statistics, numbers, dates, or raw data  
**[VISUAL_LEXICON]** Descriptive imagery, color moods, motion, emotion  
**[JOURNALISTIC_ELEMENTS]** Headlines, alerts, quotes, historical notes  
**[RESOURCES]** People, locations, events, searchable asset keywords  
**[MICRO_BEATS]** Optional: multiple sub-points to break complex ideas into digestible moments  
---
**Generate a complete Context & Resource Brief for the topic below.**  
`;

        const DIRECTOR_PROMPT_TEMPLATE = (prompt, style, langCode, isPodcast) => `
# ROLE & OBJECTIVE
You are an expert **Video Engine Architect** and **Motion Graphics Director**. Your task is to generate a production-ready \`JSON\` payload for an automated video rendering engine. The output must be **visually cinematic**, **educationally deep**, and **technically flawless**.

# INPUT SPECIFICATIONS
*   **Topic / Context:** "${prompt}"
*   **Target Audience:** ${style}
*   **Narration Language:** ${langCode} 
Prefer English for on-screen text, as it is most commonly used. However, you may use the selected language when necessary.
Narration must use only the selected language’s script characters — do not mix scripts.
Add spaces in abbreviations (e.g., “A I”) to ensure accurate TTS pronunciation.
${isPodcast ? `\n*   **PODCAST MODE ACTIVE:** Make each scene/narration like one person, next scene or narration other person talking themself and making viewer understand like podcast. You must add \`"podcast": "true"\` in the \`meta\` object.` : `\n*   **STANDARD MODE:** You must add \`"podcast": "false"\` in the \`meta\` object.`}

# SCENE REQUIREMENTS
*   **Scene Count:** >20 Scenes (The video must be long and detailed).
*   **Sub-steps:** Each scene must have multiple narrative sub-steps (progressive disclosure).

---

# 1. DIRECTORIAL GUIDELINES (CREATIVE FREEDOM & LOGIC)
**Do not be a robot following a checklist. Be a Director.**

*   **Creative Freedom:** The **Scene Library** below is for **inspiration, not obligation**. You are free to invent new scene types, visual metaphors, or layouts if they better explain the topic. Mix, bend, or replace specific archetypes as needed.
*   **Explanation First, Effects Second:** Every visual choice must exist to clarify a concept. Visuals should support understanding, not distract from it.
*   **One Main Idea Per Scene:** Do not overcrowd. Focus each scene on **one** core concept. If a new idea starts, create a new scene.
*   **Natural Story Flow:** Structure the video like a narrative: **Hook → Context → Deep Dive → Insight → Conclusion**. Avoid random, disconnected scenes.
*   **Respect Viewer Attention:** Avoid chaos. Use calm, clear visuals over constant, overwhelming motion. A clean aesthetic is a premium aesthetic.
*   **Tone Matching:** Adjust the visual complexity and narration depth based on the **Target Audience** (${style}). Beginners need simplicity; experts need density.

# 2. CRITICAL RESPONSIVENESS RULES (MANDATORY UPDATE)
**The video engine renders in variable aspect ratios (16:9 Landscape, 9:16 Portrait, Mobile, Desktop) via \`container-type: size\` logic.**

*   **NEVER USE Viewport Units (\`vw\` or \`vh\`) for Text or Spacing inside the scene.** Viewport units break when the user is on mobile but the video aspect ratio forces a smaller box.
*   **MANDATORY: Use Container Query Units (\`cqw\`, \`cqh\`, \`cqmin\`) inside Tailwind classes for ALL text and dynamic spacing.** 
    *   *Correct Example:* \`text-[5cqw]\`, \`text-[clamp(1rem,4cqmin,5rem)]\`, \`mt-[5cqh]\`, \`px-[4cqmin]\`
    *   *Incorrect Example:* \`text-[5vw]\`, \`mt-[5vh]\`
*   **Fit & Scale:** Every element (text, images, charts, canvases) **must** fit within the viewport using container units.
*   **Fluid Layouts:** Use \`w-full h-full flex items-center justify-center\` as the base. Use \`%\`, \`cqw\`, or \`max-w\`.
*   **Object Fitting:** Images and Videos must use \`object-cover\` or \`object-contain\`.
*   **Canvas/Charts:** Canvas elements must be wrapped in a container with \`w-full h-full relative\` so they resize dynamically. Chart configs must set \`maintainAspectRatio: false\`.

# 3. VISUAL AESTHETIC
*   **Topic-Based Palette:** Background and colors **must be chosen according to the topic**.
*   **No Default Dark Mode:** Dark themes are allowed **only when the topic requires it** (e.g., space, cyberpunk, deep tech). Otherwise, use nature, history, or academic palettes.
*   **Composition:** Follow Netflix/Vox-style composition (large responsive typography, subtle depth, Tailwind utilities).

# 4. THE RENDERING ENGINE API (TECHNICAL CONSTRAINTS)
The engine is strict. You must output valid \`JSON\` adhering to this logic:

**A. HTML & CSS Classes**
*   **Container:** \`<div class="w-full h-full relative overflow-hidden ...">\`
*   **Hidden State:** Elements meant to animate **must start hidden** using specific Tailwind classes:
    *   \`opacity-0\`
    *   \`translate-y-4\` (or \`translate-y-10\`, \`-translate-x-4\`, \`scale-90\`)
*   **Reveal Action:** The engine's \`reveal\` action automatically removes these specific classes to trigger CSS transitions.

**B. Scripting Interface (\`script\` property)**
*   The \`script\` property is a **stringified JavaScript arrow function**.
*   It receives a context object \`ctx\`: \`{ root, chart, map, p5 }\`.
    *   \`ctx.root\`: The HTMLElement container.
    *   \`ctx.chart(selector, config)\`: Returns a Chart.js instance.
    *   \`ctx.map(selector, config)\`: Returns a Leaflet instance.
    *   \`ctx.p5(sketchFn, selector)\`: Returns a p5 instance.
*   **Return Object:** The function **must** return an object containing:
    1.  Custom methods (e.g., \`triggerAnimation()\`) to be called by steps.
    2.  A \`remove()\` method to clean up listeners, intervals, or animation frames (CRITICAL).
*   **Attachment Rule:** Any canvas, WebGL, SVG, or generative renderer must be explicitly attached to its scene container selector and initialized only after the container’s size is resolved.

**C. Step Actions**
*   **reveal:** Targets a CSS selector and removes the hidden utility classes.
*   **width-grow:** Animates width (useful for progress bars/lines).
*   **custom:** Executes a raw JS string. To call your script's methods, use:
    *   \`"fn": "Engine.state.activeScript.yourMethodName()"\`

# 5. JSON STRUCTURE BLUEPRINT
Output **ONLY** raw JSON. No markdown fencing.

\`\`\`json
{
  "meta": {
    "title": "Generated Title",
    "audio": "background_music_url",
    "lang": "${langCode}",
    "podcast": "true_or_false"
  },
  "scenes": [
    {
      "html": "<div class='w-full h-full bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-[4cqw]'><h1 id='title' class='text-[clamp(1.5rem,5cqmin,6rem)] font-bold text-white opacity-0 translate-y-4 transition-all duration-700'>Market Crash</h1><div class='relative w-full max-w-4xl flex-1 min-h-0'><canvas id='my-chart'></canvas></div></div>",
      "script": "(ctx) => { \\n  const chart = ctx.chart('#my-chart', { type: 'line', data: { ... }, options: { maintainAspectRatio: false, responsive: true } }); \\n  return { \\n    crash: () => { chart.data.datasets[0].data = [10, 0]; chart.update(); }, \\n    remove: () => { chart.destroy(); } \\n  }\\n}",
      "steps": [
        {
          "narration": "The market was stable until the incident.",
          "actions": [
            { "type": "reveal", "target": "#title" }
          ]
        },
        {
          "narration": "Then, everything collapsed.",
          "actions": [
            { "type": "custom", "fn": "Engine.state.activeScript.crash()" }
          ]
        }
      ]
    }
  ]
}
\`\`\`

# 6. SCENE LIBRARY (INSPIRATION ONLY)
*Use these as a base, but feel free to invent, modify, or combine concepts.*

*   **TITLE_CINEMATIC:** Blur-to-focus, god rays, gradients.
*   **KINETIC_TYPE:** High contrast, rhythmic text reveals.
*   **GLITCH_TEXT:** RGB split, decode effects, cyberpunk.
*   **QUOTE_SCENE:** Serif fonts, paper texture, highlighter effects.
*   **SPOTLIGHT:** Flashlight reveal, mask-image effects.
*   **NEON_SIGN:** Glow effects, flickering text.
*   **PARALLAX_LAYER:** Multi-layer depth movement.
*   **NEON_DATA_CRASH:** Line chart that crashes/animates dynamically.
*   **KPI_STATS_CASCADE:** Staggered cards with counting numbers.
*   **DOUGHNUT_HOLO:** 3D tilted chart with floating data.
*   **TIMELINE_SCROLL:** Horizontal container translation (translateX).
*   **BAR_RACE:** Bar chart where values overtake each other.
*   **STOCK_TICKER:** Scrolling marquee with gauge indicators.
*   **HEATMAP_PULSE:** Grid of cells with random highlighting.
*   **SATELLITE_ZOOM:** Leaflet map flying to coordinates.
*   **NETWORK_NODES:** P5.js particle system with connections.
*   **DETECTIVE_BOARD:** SVG strings connecting photos/evidence.
*   **DNA_HELIX:** P5.js 3D rotating particles.
*   **PARTICLE_EXPLOSION:** P5.js big bang simulation.
*   **MATRIX_RAIN:** P5.js falling code symbols.
*   **LIQUID_WAVEFORM:** P5.js sine wave analysis.
*   **SWARM_AI:** P5.js boids/flocking simulation.
*   **NEWSPAPER_SPIN:** CSS transform rotate/scale reveal.
*   **CHAT_CONV:** iOS/Android style message bubbles.
*   **CODE_TERMINAL:** Typing effect in a console window.
*   **BROWSER_SEARCH:** Fake Google input typing and results reveal.
*   **SOCIAL_POST:** Twitter/X card with counting likes.
*   **NOTIFICATIONS:** Stacked glassmorphism alerts.
*   **SPLIT_COMPARISON:** Before/After slider using width transition.
*   **PROCESS_STEPS:** Icons and arrows revealing sequentially.
*   **QUIZ_GAME:** Multiple choice options with highlight logic.
*   **TREE_DIAGRAM:** Org chart with SVG connectors.
*   **PROS_CONS:** Two columns with list items sliding in.
*   **CAROUSEL_3D:** Rotating 3D image gallery.
*   **EXPLODED_VIEW:** CSS 3D transform expanding layers.
Tables, code , and ppt like scenes also .

**Generate the full JSON now.**
`;

        const IMPROVE_PROMPT_TEMPLATE = (feedback, style, langCode, isPodcast) => `
=== IMPROVEMENT PROTOCOL ===
You are an expert Video Engine Architect modifying an existing project.
I am providing you with the CURRENT working JSON project data.

USER FEEDBACK / ENHANCEMENT REQUEST:
"${feedback || "Please improve the pacing, detail, visual aesthetics, and narrative flow of the JSON project."}"

JSON STRUCTURE BLUEPRINT
Output **ONLY** raw JSON. No markdown fencing.
\`\`\`json
{
  "meta": {
    "title": "Generated Title",
    "audio": "background_music_url",
    "lang": "${langCode}",
    "podcast": "true_or_false"
  },
  "scenes": [
    {
      "html": "<div class='w-full h-full bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-[4cqw]'><h1 id='title' class='text-[clamp(1.5rem,5cqmin,6rem)] font-bold text-white opacity-0 translate-y-4 transition-all duration-700'>Market Crash</h1><div class='relative w-full max-w-4xl flex-1 min-h-0'><canvas id='my-chart'></canvas></div></div>",
      "script": "(ctx) => { \\n  const chart = ctx.chart('#my-chart', { type: 'line', data: { ... }, options: { maintainAspectRatio: false, responsive: true } }); \\n  return { \\n    crash: () => { chart.data.datasets[0].data = [10, 0]; chart.update(); }, \\n    remove: () => { chart.destroy(); } \\n  }\\n}",
      "steps": [
        {
          "narration": "The market was stable until the incident.",
          "actions": [
            { "type": "reveal", "target": "#title" }
          ]
        },
        {
          "narration": "Then, everything collapsed.",
          "actions": [
            { "type": "custom", "fn": "Engine.state.activeScript.crash()" }
          ]
        }
      ]
    }
  ]
}
\`\`\`

INSTRUCTIONS:
1. Parse the provided JSON data carefully.
2. Apply the user's request. Keep existing components that work well, only enhance, fix, or expand.
3. Obey all normal engine architecture rules (Tailwind CQ units, HTML string encapsulation, JSON strictness).
4. DO NOT output partial code. Output the FULL updated JSON following the exact schema.
`;
