# VIDEO-LIKE

**Create code-based videos for clear and structured learning. No fake AI graphics, just real code.**
VIDEO-LIKE: A Auto Video Creator uses **frontend and text generating AI**.

**VIDEO-LIKE** is a simple but powerful browser application. It takes structured JSON data and turns it into narrated videos. It runs entirely inside a single HTML file. 

This project bridges the gap between data and storytelling. It helps developers, teachers, marketers, and analysts make data-rich videos (with charts, maps, and coding art) without using heavy and complex video editing software.

**Developed By:** Sabir Ali Mondal

---

## Core Features

Video-Like is built on a custom JavaScript rendering engine that reads JSON scripts and plays them step-by-step.

### AI Architect (Powered by Puter.js & Gemini 2.5 Pro)
The built-in AI works like your personal video director. It writes the code and sets the timing.
*   **Research:** Takes (Topic + prompt) -> Outputs a detailed data and story brief.
*   **Generate New:** Takes (Topic + prompt) + Optional Image + Auto-Attaches demoJSON File -> Outputs a brand new video JSON project.
*   **Improve Current:** Takes (Feedback + prompt) + Optional Image + Auto-Attaches Current JSON File -> Outputs an updated and improved video JSON without breaking your current layout.

### Audio & Narration
*   **Text-to-Speech (TTS):** Reads your script using built-in browser voices. You can easily change the voice pitch and speed.
*   **Podcast Mode:** Switches between two different voices (Host and Guest) automatically to sound like a real conversation.
*   **Background Music:** Choose from built-in focus and study tracks, or upload your own MP3 file. You can adjust the volume live.

### Visuals & Rendering
*   **Responsive Design:** Uses Tailwind CSS container queries (cqw, cqh) so the video looks perfect on both desktop screens and mobile phones. You can switch to Portrait mode in one click.
*   **Effects:** Adds real-time film grain, smooth background gradients, and clean transitions between scenes.
*   **Built-in Libraries:** Supports Chart.js (for graphs), p5.js (for animations and particles), and Leaflet.js (for maps) directly inside the video scenes.

### Developer Tools
*   **Live JSON Editor:** Open the editor, change the JSON script, and click "Apply" to see changes immediately.
*   **Project Save/Load:** Download your project as a .json file or upload one to continue your work later.
*   **Subtitles:** Turn on YouTube-style captions that match the voice narration perfectly.

### SCENES

**Rendering Attachment Rule:** Any canvas, WebGL, SVG, or generative renderer must be explicitly attached to its scene container and initialized only after the container’s size is resolved, so it always respects layout and overflow boundaries.

**SCENE LIBRARY & INSPIRATION:**
*Usage: Documentary, explainer, education, cinematic narration, AI video generation.*
*Core Actions: appear, highlight, point, zoom, pan, scroll, adjust, animate, exit.*

*   TITLE CINEMATIC / DOCU TITLE / NEWSPAPER
*   NEON DATA CRASH / SATELLITE MAP ZOOM / MAP POINTS
*   DETECTIVE BOARD / COUNTER / QUOTE / KEN BURNS PHOTO
*   VIDEO / TIMELINE / KPI STATS CASCADE / GLITCH TEXT
*   PARTICLE EXPLOSION / LIQUID WAVEFORM / MATRIX RAIN
*   FIREWORKS BURST / AURORA WAVES / NEON SIGN GLOW
*   HOLOGRAM SCAN / DOUGHNUT CHART / HEATMAP PULSE
*   PROCESS STEPS / 3D BAR GRAPH / NETWORK NODES
*   STOCK TICKER / FUNNEL / GAUGE SWEEP / BULLETS
*   CODE TERMINAL / 3D PLOT / KINETIC TYPOGRAPHY / TABLE
*   P5 DIAGRAM / COMPARISON / SPOTLIGHT / BREAKING NEWS
*   PROS AND CONS / CHART FULL / CHART SPLIT / NOTIFICATIONS
*   CALENDAR / PICTURE IN PICTURE / VENN DIAGRAM / CAROUSEL
*   SOCIAL POST / CHAT CONVERSATION / SLIDER / QUIZ
*   TREE DIAGRAM / FLOWCHART / COLLAGE / PARALLAX
*   EXPLODED VIEW / END CINEMATIC

--- 

# Explanation for each function inside the Engine :

**Main Engine Functions**
*   **init:** Prepares the application, loads text-to-speech voices, and sets up keyboard controls.
*   **load:** Loads the project data and resets the video back to the first scene.
*   **triggerTransition:** Applies a quick visual effect when moving from one scene to another.
*   **render:** Creates the HTML layout and runs the Javascript code for the selected scene.
*   **playStep:** Speaks the narration text and triggers the HTML animations for the current step.
*   **nextStep:** Moves forward to the next line of text or changes to the next scene automatically.
*   **togglePlay:** Plays or pauses the entire video, voice, and background music.
*   **prev:** Jumps back to the previous scene.
*   **next:** Skips ahead to the next scene.

**Graphics & Loading (gfx / loader)**
*   **gfx.handleError:** Replaces broken images with a default fallback picture so the video does not look bad.
*   **loader.preload:** Loads upcoming images in the background to prevent loading delays.

**AI Architect (ai)**
*   **ai.callPuter:** Connects to the Puter AI to send text and images securely.
*   **ai.handleImage:** Converts an uploaded picture into a readable format for the AI to understand.
*   **ai.handleDrop:** Lets the user drag and drop a picture directly into the AI box.
*   **ai.clearImage:** Removes the currently selected picture from the AI tool.
*   **ai.getScript:** Asks the AI to research a topic and output a text brief.
*   **ai.generateNew:** Sends the topic to the AI to build a brand new video project from scratch.
*   **ai.improveCurrent:** Sends your current project to the AI so it can make your requested changes without breaking the file.

**Audio & Voices (audio)**
*   **audio.populateVoices:** Collects all system voices and updates the dropdown menus.
*   **audio.setVoice:** Sets the main narrator voice selected by the user.
*   **audio.setVolume:** Controls how loud the background music plays.
*   **audio.setTrack:** Loads a specific music track to play in the background.
*   **audio.upload:** Allows the user to select and play their own MP3 music file.
*   **audio.togglePodcast:** Turns on or off the mode where two different voices talk to each other.
*   **audio.updatePodcastSettings:** Saves the voice, speed, and pitch choices for the two podcast speakers.

**Input / Output (io)**
*   **io.downloadJSON:** Saves the current project file to the user's computer.
*   **io.uploadJSON:** Reads a saved project file and puts its code into the editor.
*   **io.apply:** Updates the live video instantly with the new code typed in the editor.

**User Interface (ui)**
*   **ui.toggleSubtitles:** Shows or hides the reading text at the bottom of the video.
*   **ui.toggleMenu:** Opens and closes the main navigation menu.
*   **ui.openModal:** Opens the requested settings window over the screen.
*   **ui.closeModal:** Closes any open settings window.
*   **ui.toggleRatio:** Switches the video view between wide desktop mode and tall mobile mode.
*   **ui.toggleFullscreen:** Expands the application to fill the whole screen.
*   **ui.notify:** Displays a short message alert like Success or Error to the user.
*   **ui.trackIdle:** Hides the video controls if the user stops moving their mouse.
*   **ui.update:** Changes the play and pause button icon based on the current state.
*   **ui.copyPrompt:** Copies the base AI instructions to the clipboard for manual use.
