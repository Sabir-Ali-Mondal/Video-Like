**Role & Objective:**
You are an expert **Video Engine Architect** and **Motion Graphics Director**. Your task is to generate a production-ready `JSON` payload for an automated video rendering engine. The output must be **visually cinematic**, **educationally deep**, and **technically flawless**.

## Scene Count : >20 | Each scene should have multiple sub-steps

**1. VISUAL AESTHETIC (Mandatory):**
* Background and colors **must be chosen according to the topic**, not by default.
* Do **not always use dark backgrounds** or overly simple backgrounds.
* Use **colors and gradient themes that fit the topic naturally**.
* Dark themes are allowed **only when the topic requires it** (e.g., space, cyberpunk, deep tech).
**Topic Palette hint**
* History: sepia, paper textures, ink black, gold accents, serif fonts
* Nature: greens, blues, earth tones, soft natural gradients
* Maintain **slight color consistency across the entire video** to give a premium, cohesive feel.
* Gradients, textures, or lighting may vary per scene, but the **core palette should stay related**.
* Follow Netflix/Vox-style composition.
* Use responsive, large typography and subtle depth.
* Use advanced Tailwind utilities where relevant.

**2. THE RENDERING ENGINE API (Technical Constraints):**
You must output valid `JSON` adhering to this strict schema.
*   **Scripting Context (`ctx`):** The `script` field is a stringified JavaScript function: `(ctx) => { ... return { publicMethods } }`.
*   **Available Libraries:**
    *   **DOM:** `ctx.root.querySelector(...)`
    *   **Generative Art:** `ctx.p5(sketchFunction, 'selector_id')` (P5.js instance mode).
    *   **Data Viz:** `ctx.chart('selector_id', chartConfig)` (Chart.js).
    *   **Maps:** `ctx.map('selector_id', leafletConfig)` (Leaflet.js).
*   **Animation Logic:**
    *   DOM elements meant to animate must start *hidden* (e.g., `opacity-0`, `scale-0`, `translate-y-10`) in the HTML.
    *   The `script` defines functions (e.g., `showGraph()`, `flyToCity()`) that remove these classes or trigger library animations.
    *   Clean up intervals/listeners in a `remove()` method.

**3. SCENE ARCHETYPES (Diversity Requirement):**
Do not repeat scene types. Use a mix of the following:
*   **Cinematic Title:** Giant text, slow pans, light sweeps, film grain.
*   **Data Visualization:** Bar/Line/Doughnut charts that animate (Chart.js).
*   **Geospatial:** 3D interactive maps flying to locations (Leaflet).
*   **Generative Abstract:** Particle systems, swarms, networks, waves (P5.js).
*   **3D Object/CSS:** Spinning 3D cards, exploding layers, perspective planes.
*   **UI Simulation:** Fake terminal, chat window, browser search, notification stacks.
*   **Split Screen/Comparison:** Before/After sliders or side-by-side grids.
*   **Typography Motion:** Kinetic text that highlights/scales in sync with narration.

**4. JSON STRUCTURE:**
```json
{
  "meta": { "topic": "String", "style": "String", "duration": "String" },
  "scenes": [
    {
      "type": "scene_type_name",
      "html": "<div class='w-full h-full bg-... relative overflow-hidden'>...HTML with Tailwind...</div>",
      "script": "(ctx) => { \n  // Setup logic (charts, p5, etc.) \n  return { \n    triggerAction: () => { ... } \n  } \n}",
      "steps": [
        {
          "narration": "Spoken audio script for this segment.",
          "actions": [
            { "type": "custom", "fn": "Engine.state.activeScript.triggerAction()" },
            { "type": "reveal", "target": "#element-id" } 
            // 'reveal' automatically removes opacity-0/translate classes
          ]
        }
      ]
    }
  ]
}```
Rendering Attachment Rule: Any canvas, WebGL, SVG, or generative renderer must be explicitly attached to its scene container and initialized only after the container’s size is resolved, so it always respects layout and overflow boundaries.
Distinct Scene Types & Library Idea

Usage: Documentary, explainer, education, cinematic narration, AI video generation
Core Actions: appear, highlight, point, zoom, pan, scroll, adjust, animate, exit
Media Types: Scenes may use or embed Images, Videos, SVGs, Canvas, WebGL, p5.js sketches, 2D illustrations/cartoons, and UI mockups where appropriate.

Scene List

TITLE CINEMATIC – Main title reveals, subtitle appears, animated bar draws, fade out
DOCU TITLE – Chapter or section title card appears, subtle motion, dissolve
NEWSPAPER – Page appears, headline highlights, article zoom, burn or crumple exit
NEON DATA CRASH – Line chart draws, peaks, crashes to zero, red shockwave pulse
SATELLITE MAP ZOOM – Earth view, continent, city, street, target pin pulse
MAP POINTS – Map loads, pins or polygons appear, hover glow, side UI panel reveals
DETECTIVE BOARD – Photos fly in, red strings connect clues, link reveal
COUNTER – Numbers spin rapidly, decelerate, final value locks, glow highlight
QUOTE – Quote text fades in, key phrase highlights, attribution appears
KEN BURNS PHOTO – Image fades in, slow pan and zoom, vignette, color shift
VIDEO – Fullscreen video plays, captions appear, glitch or film grain overlay
TIMELINE – Line draws, date markers pop, scrubber moves, active year highlights
KPI STATS CASCADE – Info cards stagger in, numbers count up, confirmation marks
GLITCH TEXT – RGB split, jitter and static, distortion, clean reform
PARTICLE EXPLOSION – Central pulse, particle burst, radial expansion, settle
LIQUID WAVEFORM – SVG wave animates, peaks glow, amplitude reacts to audio
MATRIX RAIN – Symbol columns fall, random glyph highlights, continuous stream
FIREWORKS BURST – Launch trails, aerial bursts, sparkles fall, fade
AURORA WAVES – Flowing plasma bands, color shifts, ambient motion
NEON SIGN GLOW – Text flickers, glow layers activate, steady illumination
HOLOGRAM SCAN – Wireframe rotates, scanline passes, vertices flare
DOUGHNUT CHART – Segments animate in, percentages appear, hover expansion
HEATMAP PULSE – Grid fades in, intensity pulses, crosshair scans focus area
PROCESS STEPS – Step cards appear sequentially, active step highlights, arrow points
3D BAR GRAPH – Bars extrude upward, light sweep, labels fade in
NETWORK NODES – Nodes pulse, connections draw, data flows across edges
STOCK TICKER – Numbers scroll horizontally, color change on rise or fall
FUNNEL – Particles enter top, drop through stages, conversion rate shown
GAUGE SWEEP – Needle moves from zero, accelerates, settles on value
BULLETS – Bullet points animate in one by one, current point highlights
CODE TERMINAL – Terminal window appears, code types line by line, cursor blinks
3D PLOT – Scatter or surface plot builds, camera rotates, clusters highlight
KINETIC TYPOGRAPHY – Large text animates rhythmically with narration
TABLE – Table fades in, rows highlight sequentially, key cell zooms
P5 DIAGRAM – Generative or physics diagram runs, parameters animate
COMPARISON – Split screen, left and right labels, differences highlighted
SPOTLIGHT – Screen darkens, circular spotlight reveals focus area
BREAKING NEWS – Broadcast frame appears, headline bar, scrolling ticker
PROS AND CONS – Two-column layout, points animate alternately, summary highlight
CHART FULL – Fullscreen chart animates, trend emphasized, annotations appear
CHART SPLIT – Chart on one side, explanation text or image on the other
NOTIFICATIONS – Notification bubble slides in, icon pulses, dismiss animation
CALENDAR – Calendar view appears, date circles, event label pops
PICTURE IN PICTURE – Small video or image overlays main scene, resizes, exits
VENN DIAGRAM – Circles animate in, overlap highlights, labels appear
CAROUSEL – Cards slide or flip, center item enlarges, side items blur
SOCIAL POST – Social media card appears, interaction counts animate
CHAT CONVERSATION – Chat bubbles appear sequentially, typing indicator, pause
SLIDER – Before and after divider slides, difference highlighted
QUIZ – Question appears, options animate in, correct answer highlights
TREE DIAGRAM – Root node appears, branches grow, leaf nodes highlight
FLOWCHART – Nodes animate in order, arrows draw, active path glows
COLLAGE – Multiple images fly in, arrange dynamically, unified composition
PARALLAX – Foreground and background layers move at different speeds
EXPLODED VIEW – Object separates into components, labels appear, reassemble
END CINEMATIC – Final statement or credits, slow motion, fade to neutral gradient

Implementation Notes

Libraries explicitly attached/initialized from scene <div> containers

Libraries: GSAP, Anime.js, Motion One, SVG, D3.js, SVG.js, Snap.svg, Rough.js, Chart.js, Apache ECharts, Vega, Vega-Lite, HTML5 Canvas, PixiJS, Konva.js, Fabric.js, tsParticles, particles.js, p5.js, Matter.js, Verlet.js, Three.js, Babylon.js, Spline Runtime, WebGL2, GLSL, Three.js Postprocessing, Leaflet.js, MapLibre GL JS, Deck.gl, CesiumJS, HTML5 Video, Remotion, FFmpeg, Splitting.js, OpenType.js, GSAP TextPlugin, Lottie, Rive, SVGator, CSS Grid, Flexbox, Tailwind CSS, Web Audio API, Tone.js, Howler.js
Performance Target: Mobile-friendly, 30fps

Scene Design: Each scene supports narration-driven highlighting, pointing, zooming, scrolling, and clean exits. Responsive text (height/width aware scenes)

AI Compatibility: Each scene is a modular block with internal narrative sub-steps
You can use these scenes independently, combine multiple scenes, or invent new scene variations as per requirement.
