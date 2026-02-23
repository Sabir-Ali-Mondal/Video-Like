# PROJECT OVERVIEW: VIDEO-LIKE

**Architecture Blueprint & Technical Specification**
*Self-Contained • AI-Powered • Code-Driven Video Engine*

**Philosophy:** Video-Like is a browser-based rendering engine designed for structured visual learning. It rejects hallucinated AI video in favor of real DOM manipulation, WebGL data visualization, and scripted logic, outputting deterministic, cinematic educational content.

---

## 1. Core Architecture & Powers

Video-Like's architecture is built on absolute portability and deterministic execution.

*   **Single-File Monolith:** The entire application (HTML structure, CSS styling, Javascript engine, AI prompt templates, default JSON data) is contained within one `.html` file. Zero build steps, zero server dependencies.
*   **JSON-Driven State:** The video is not a timeline of frames; it is a JSON object. This allows videos to be version-controlled, programmatically generated, and dynamically edited on the fly.
*   **Intelligent Renderer (RenderStudio):** Bypasses standard, messy screen recording. It uses CSS to shift the application safely away from browser UI (like the "Stop Sharing" bar), live-crops the viewport onto a hidden `<canvas>`, records a high-bitrate WebM, and simultaneously maps TTS events into a perfectly synced `.srt` subtitle file.
*   **Generative Code Visuals:** Natively injects `p5.js` (generative art/particles), `Chart.js` (data), and `Leaflet.js` (maps) directly into the DOM, resizing them dynamically based on container queries.
*   **Podcast TTS Engine:** Automatically alternates Text-To-Speech (TTS) voices, pitch, and speed between a "Host" and a "Guest" based on the step index, simulating conversation.

---

## 2. UI / UX Philosophy & Implementation

The interface is built for "stealth" operation and complete responsiveness, ensuring the recorded output is flawless.

*   **Container Query Fluidity (`cqw`, `cqh`, `cqmin`):** The application strictly forbids `vw`/`vh` units. Every scene uses Tailwind CSS container queries so that text, charts, and spacing scale perfectly whether the stage is in 16:9 Landscape or 9:16 Portrait mode.
*   **Glassmorphism & Auto-Hide:** The main UI controls (`.ui-layer`) use backdrop-blur and semi-transparent backgrounds. An idle tracker (`Engine.ui.trackIdle`) automatically hides all UI elements after 5 seconds of inactivity to ensure a clean video recording.
*   **Ghost Mode Rendering:** When the render pipeline starts, CSS injects `cursor: none !important;` globally and forcibly hides all control bars, side menus, and HTML subtitles, leaving only the pure scene content.
*   **Instant Context Switching:** The user can instantly transition between an IDE-like JSON editor, an AI prompting chat window, and the live rendering stage via modals (`.modal-overlay`).

---

## 3. The Prompting Engine

The application does not just use an LLM; it enforces strict architectural rules via heavily engineered prompt templates stored as JavaScript constants.

*   **`SCRIPT_PROMPT` (The Researcher):** Instructs the AI to act as a Vox-level documentary director. It outputs structured text (Analogies, Data Vaults, Visual Lexicons) rather than code, serving as a creative brief.
*   **`DIRECTOR_PROMPT_TEMPLATE` (The JSON Architect):** The core engine prompt. It enforces strict technical constraints:
    *   Must use Tailwind Container Queries.
    *   Must hide elements initially using `opacity-0 translate-y-4`.
    *   Must wrap canvas/WebGL in relative containers.
    *   Must return a `remove()` method in the JavaScript to prevent memory leaks when scenes change.
*   **`IMPROVE_PROMPT_TEMPLATE` (The Iterative Editor):** Accepts the user's current working JSON as context. It allows the AI to surgically update pacing, design, or data points without breaking the existing DOM/JS structure.

---

## 4. Scene Possibilities & DOM Execution

**Execution Flow:**
1. Engine injects the HTML string into the DOM.
2. Engine waits 50ms for the DOM to paint.
3. Engine executes the `script` property, passing a `ctx` (context) object containing `ctx.root`, `ctx.p5`, `ctx.chart`, and `ctx.map`.
4. The script returns an object with custom functions (e.g., `triggerExplosion()`).
5. Steps execute these functions via string evaluation: `Engine.state.activeScript.triggerExplosion()`.

**Demonstrated Scene Archetypes:**
*   **Data Vis:** 3D Doughnut Charts, Dynamic Line Crashes, Bar Races.
*   **Generative Art:** DNA Helixes, Swarm/Boid logic, Matrix Digital Rain, Liquid Sine Waveforms.
*   **Geospatial:** Leaflet maps flying to exact lat/long coordinates.
*   **Cinematic / Typography:** Glitch text overlays, Parallax zoom comparisons, Exploded 3D CSS views, Kinetic typography, Detective string-boards using SVG paths.

---

## 5. Comprehensive Function Reference Guide

Below is the technical mapping of the application's logic.

### `Engine` (Main Application Object)
Controls playback, state, and UI.

**Initialization & Loading**
*   `init()`: Sets up audio loops, maps TTS voices, handles mobile portrait logic, and attaches keyboard event listeners (Space, Arrows).
*   `load(json)`: Parses the project JSON, resets step/scene counters, configures podcast toggles, and fires the first render.
*   `loader.preload(nextIdx)`: Background-loads images for the upcoming two scenes into browser cache to prevent rendering flickers.

**Rendering & Playback**
*   `render(idx)`: Clears the previous scene, calls the `remove()` cleanup function of the active script, injects new HTML, dynamically applies film grain, and executes the scene's JS logic.
*   `playStep()`: Updates subtitle UI, parses step actions (reveals, CSS adjustments, custom JS functions), sets the correct TTS voice/pitch/speed (handling podcast switching), and triggers speech.
*   `nextStep()`: Evaluates if the scene has more steps. If yes, runs `playStep()`. If no, calls `next()` to change scenes.
*   `togglePlay()`: Pauses/Resumes TTS, background audio, and the render engine.
*   `triggerTransition(callback)`: Orchestrates a cinematic overlay transition (using random GIF assets), switching the DOM while obscured to hide loading frames.
*   `prev()` / `next()`: Increments/decrements the scene index and triggers the transition pipeline.

**AI Integration (`Engine.ai`)**
*   `callPuter(promptText, attachmentBase64)`: Centralized SDK call to Puter.js (Gemini 2.5 Pro).
*   `handleImage(input)` / `handleDrop(event)`: Converts user images to Base64 for multimodal AI context.
*   `getScript()`: Injects `SCRIPT_PROMPT` to generate a text-based documentary outline.
*   `generateNew()`: Combines `DIRECTOR_PROMPT_TEMPLATE`, user input, and the demo JSON structure to generate a full, playable project.
*   `improveCurrent()`: Attaches the active JSON project to `IMPROVE_PROMPT_TEMPLATE` for iterative refinement.

**Audio Management (`Engine.audio`)**
*   `populateVoices()`: Pulls `window.speechSynthesis` voices, filtering and assigning based on the JSON's language code (e.g., `en-US`).
*   `togglePodcast(enabled)`: Modifies the JSON meta object and exposes/hides the dual-speaker UI controls.
*   `updatePodcastSettings()`: Saves speed/pitch/voice index data for Speaker 1 and Speaker 2.

**Input / Output (`Engine.io`)**
*   `downloadJSON()`: Encodes `Engine.data` into a Blob and triggers a local `.json` download.
*   `uploadJSON(input)`: Parses a local file and drops it into the live editor.
*   `apply()`: Re-evaluates the live JSON editor string and forces `Engine.load()` to instantly reflect changes.

**User Interface (`Engine.ui`)**
*   `toggleSubtitles()`: Exposes or hides the `.subtitle-layer` DOM element.
*   `toggleRatio()`: Adds/removes the `.portrait` class to `#stage-content`, triggering container-query reflows.
*   `trackIdle()`: Sets a 5-second timeout on mouse/keyboard events to hide control elements during playback.

---

### `RenderStudio` (Capture & Export Object)
Handles the highly complex process of turning DOM elements into an MP4/WebM file without capturing browser UI.

*   `init()`: Injects specific recording CSS (hiding cursors, shifting margins to avoid sharing bars) and creates the Preflight modals.
*   `startCapture()`: Requests `getDisplayMedia` (forcing cursor off). Triggers fullscreen automatically.
*   `beginCountdown()`: Initiates a 10-second visual countdown to allow the user to hide system toolbars before the capture begins.
*   `setupCanvasPipeline()`: The core recording magic. Creates an invisible `<video>` element tied to the screen stream, and an invisible `<canvas>`. Initializes `MediaRecorder` at 12 Mbps (VP9).
*   `drawLoop(timestamp)`: A `requestAnimationFrame` loop that takes the messy screen video feed, calculates exact coordinate scaling, and draws *only* the `#stage-content` area onto the clean canvas.
*   `initSrtRecorder()` / `logSubtitle()`: Monitors the subtitle DOM element at 100ms intervals. Every time the text changes, it logs the start and end timestamps.
*   `generateSrtFile()`: Converts the logged array of subtitle timestamps into standard `.srt` formatting.
*   `stopCapture()`: Halts the `MediaRecorder`, kills the animation frames, and restores the UI to normal editing mode.
*   `finalizeVideo()`: Packages the WebM video chunks and the generated `.srt` text into Blobs, forcing an automatic download of both files to the user's local machine.
