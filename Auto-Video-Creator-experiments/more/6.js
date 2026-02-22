const DEMO_DATA = {
    "meta": {
        "title": "Advanced Layouts Batch",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763064765/study-music-181044_jbuwpq.mp3",
        "lang": "en-US"
    },
    "scenes": [
        // 1. SPLIT_COMPARISON: Interactive Slider
        {
            "html": `
            <div class="w-full h-full bg-gray-900 flex flex-col items-center justify-center relative font-black text-white uppercase text-7xl tracking-tighter overflow-hidden">
                <div class="film-grain"></div>
                <!-- Right Side: New Tech (Color) -->
                <div class="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670')] bg-cover">
                    <h1 class="mix-blend-difference">FUTURE</h1>
                </div>
                
                <!-- Left Side: Old Tech (Grayscale) -->
                <div id="compare-left" class="absolute inset-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670')] bg-cover grayscale overflow-hidden">
                     <h1 class="mix-blend-difference">FUTURE</h1>
                </div>

                <!-- Slider Handle -->
                <div id="slider-handle" class="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-white/50 backdrop-blur-sm cursor-col-resize flex items-center justify-center">
                    <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black text-lg"><i class="bi bi-grip-vertical"></i></div>
                </div>
            </div>`,
            "script": `(ctx) => {
                return {
                    animateSlider: () => {
                        const leftPanel = ctx.root.querySelector('#compare-left');
                        const handle = ctx.root.querySelector('#slider-handle');
                        if (leftPanel && handle) {
                            leftPanel.style.transition = 'width 2s ease-in-out';
                            handle.style.transition = 'left 2s ease-in-out';
                            leftPanel.style.width = '25%';
                            handle.style.left = '25%';
                        }
                    }
                }
            }`,
            "steps": [
                {
                    "narration": "The difference was stark, a clear line between the past and the future.",
                    "actions": []
                },
                {
                    "narration": "As new technology emerged, the old ways were quickly left behind.",
                    "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.animateSlider()" }]
                }
            ]
        },

        // 2. PROCESS_STEPS: Sequential Animation
        {
            "html": `
            <div class="w-full h-full bg-[#0a0a0c] flex flex-col items-center justify-center p-8">
                <div class="film-grain"></div>
                <h1 class="text-4xl font-black text-white mb-16 italic tracking-tighter">THE PROTOCOL</h1>
                <div class="grid grid-cols-7 items-center w-full max-w-4xl">
                    <!-- Step 1 -->
                    <div id="step-1" class="flex flex-col items-center gap-4 opacity-0 scale-90 transition-all duration-500">
                        <div id="icon-1" class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-gray-500 transition-colors duration-300"><i class="bi bi-box-arrow-in-down"></i></div>
                        <p class="text-xs text-gray-400 font-bold uppercase">INPUT</p>
                    </div>
                    <!-- Arrow 1 -->
                    <div id="arrow-1" class="h-1 bg-white/10 w-full scale-x-0 origin-left transition-transform duration-500"></div>
                    <!-- Step 2 -->
                    <div id="step-2" class="flex flex-col items-center gap-4 opacity-0 scale-90 transition-all duration-500">
                        <div id="icon-2" class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-gray-500 transition-colors duration-300"><i class="bi bi-gear-wide-connected"></i></div>
                        <p class="text-xs text-gray-400 font-bold uppercase">PROCESS</p>
                    </div>
                    <!-- Arrow 2 -->
                    <div id="arrow-2" class="h-1 bg-white/10 w-full scale-x-0 origin-left transition-transform duration-500"></div>
                    <!-- Step 3 -->
                    <div id="step-3" class="flex flex-col items-center gap-4 opacity-0 scale-90 transition-all duration-500">
                        <div id="icon-3" class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-gray-500 transition-colors duration-300"><i class="bi bi-bar-chart-line"></i></div>
                        <p class="text-xs text-gray-400 font-bold uppercase">ANALYZE</p>
                    </div>
                    <!-- Arrow 3 -->
                    <div id="arrow-3" class="h-1 bg-white/10 w-full scale-x-0 origin-left transition-transform duration-500"></div>
                    <!-- Step 4 -->
                    <div id="step-4" class="flex flex-col items-center gap-4 opacity-0 scale-90 transition-all duration-500">
                        <div id="icon-4" class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-3xl text-gray-500 transition-colors duration-300"><i class="bi bi-check2-circle"></i></div>
                        <p class="text-xs text-gray-400 font-bold uppercase">OUTPUT</p>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const activate = (step, arrow) => {
                    const stepEl = ctx.root.querySelector(\`#step-\${step}\`);
                    const iconEl = ctx.root.querySelector(\`#icon-\${step}\`);
                    const arrowEl = ctx.root.querySelector(\`#arrow-\${step}\`);
                    if(stepEl) stepEl.classList.remove('opacity-0', 'scale-90');
                    if(iconEl) { iconEl.classList.remove('text-gray-500'); iconEl.classList.add('text-amber-400', 'bg-amber-500/10', 'border-amber-500/20'); }
                    if(arrowEl) arrowEl.classList.remove('scale-x-0');
                }
                return {
                    s1: () => activate(1),
                    s2: () => activate(2, 1),
                    s3: () => activate(3, 2),
                    s4: () => activate(4, 3),
                }
            }`,
            "steps": [
                { "narration": "Every process begins with a single input.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.s1(); setTimeout(()=>Engine.state.activeScript.s2(), 500)" }] },
                { "narration": "The data is then analyzed and cross-referenced.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.s3()" }] },
                { "narration": "Resulting in a verified, final output.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.s4()" }] }
            ]
        },
        
        // 3. QUIZ_GAME: Interactive Choice
        {
            "html": `
            <div class="w-full h-full bg-[#1e1b4b] flex items-center justify-center p-8">
                <div class="w-full max-w-3xl text-center">
                    <p class="text-indigo-300 font-mono text-sm tracking-widest">KNOWLEDGE CHECK</p>
                    <h2 class="text-white text-4xl font-bold mt-2 mb-12">What is the primary cause of a cascading system failure?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="quiz-option" id="opt1">Single point of failure</div>
                        <div class="quiz-option" id="opt2">Resource exhaustion</div>
                        <div class="quiz-option" id="opt3">Interdependent system faults</div>
                        <div class="quiz-option" id="opt4">External security breach</div>
                    </div>
                </div>
                <style>.quiz-option { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 1rem; color: white; font-weight: 600; cursor: pointer; transition: all 0.3s; } .quiz-option:hover { background: rgba(255,255,255,0.1); transform: translateY(-4px); }</style>
            </div>`,
            "script": `(ctx) => {
                return {
                    revealAnswer: () => {
                        ctx.root.querySelector('#opt1').style.opacity = '0.2';
                        ctx.root.querySelector('#opt2').style.opacity = '0.2';
                        ctx.root.querySelector('#opt4').style.opacity = '0.2';

                        const correct = ctx.root.querySelector('#opt3');
                        if(correct) {
                            correct.style.background = '#16a34a'; // green-600
                            correct.style.borderColor = '#22c55e'; // green-500
                            correct.style.transform = 'scale(1.05)';
                        }
                    }
                }
            }`,
            "steps": [
                { "narration": "The system's stability was put to the test.", "actions": [] },
                { "narration": "The correct answer revealed the inherent vulnerability: the interconnectedness of all components.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.revealAnswer()" }] }
            ]
        },

        // 4. TREE_DIAGRAM: Organizational Chart
        {
            "html": `
            <div class="w-full h-full bg-[#111] flex items-center justify-center p-8 relative">
                <div class="film-grain"></div>
                <!-- SVG Lines -->
                <svg class="absolute inset-0 w-full h-full z-0" id="tree-svg"></svg>

                <div class="relative w-full max-w-4xl h-[60vh] text-center" id="tree-container">
                    <!-- Nodes will be added by script -->
                </div>
            </div>`,
            "script": `(ctx) => {
                const container = ctx.root.querySelector('#tree-container');
                const svg = ctx.root.querySelector('#tree-svg');
                const nodes = [
                    { id: 'n1', text: 'CORE AI', x: 50, y: 10 },
                    { id: 'n2', text: 'Data Analysis', x: 25, y: 50, parent: 'n1' },
                    { id: 'n3', text: 'Predictive Models', x: 75, y: 50, parent: 'n1' },
                    { id: 'n4', text: 'Market Data', x: 15, y: 90, parent: 'n2' },
                    { id: 'n5', text: 'Network Traffic', x: 35, y: 90, parent: 'n2' }
                ];

                const drawTree = () => {
                    nodes.forEach(node => {
                        const el = document.createElement('div');
                        el.id = node.id;
                        el.className = 'absolute p-3 bg-gray-900 border border-white/10 rounded-lg text-white text-xs font-bold opacity-0 scale-90 transition-all duration-500';
                        el.style.left = \`\${node.x}%\`; el.style.top = \`\${node.y}%\`;
                        el.style.transform = 'translate(-50%, -50%)';
                        el.innerText = node.text;
                        container.appendChild(el);
                    });
                };
                
                const drawLine = (p, c) => {
                    const parent = ctx.root.querySelector(\`#\${p.id}\`);
                    const child = ctx.root.querySelector(\`#\${c.id}\`);
                    if(parent && child && svg) {
                        const line = document.createElementNS('http://www.w3.org/2000/svg','path');
                        const x1 = parent.offsetLeft + parent.offsetWidth/2;
                        const y1 = parent.offsetTop + parent.offsetHeight;
                        const x2 = child.offsetLeft + child.offsetWidth/2;
                        const y2 = child.offsetTop;
                        const d = \`M\${x1},\${y1} C\${x1},\${y1 + 50} \${x2},\${y2 - 50} \${x2},\${y2}\`;
                        line.setAttribute('d', d);
                        line.setAttribute('stroke', 'rgba(255,255,255,0.2)');
                        line.setAttribute('stroke-width', '2');
                        line.setAttribute('fill', 'none');
                        line.style.strokeDasharray = 300;
                        line.style.strokeDashoffset = 300;
                        line.style.transition = 'stroke-dashoffset 1s ease-out';
                        svg.appendChild(line);
                        setTimeout(() => line.style.strokeDashoffset = 0, 100);
                    }
                };

                drawTree();

                return {
                    showTier1: () => ctx.root.querySelector('#n1').classList.remove('opacity-0', 'scale-90'),
                    showTier2: () => {
                        ['n2', 'n3'].forEach(id => ctx.root.querySelector(\`#\${id}\`).classList.remove('opacity-0', 'scale-90'));
                        drawLine(nodes[0], nodes[1]); drawLine(nodes[0], nodes[2]);
                    },
                    showTier3: () => {
                        ['n4', 'n5'].forEach(id => ctx.root.querySelector(\`#\${id}\`).classList.remove('opacity-0', 'scale-90'));
                        drawLine(nodes[1], nodes[3]); drawLine(nodes[1], nodes[4]);
                    }
                }
            }`,
            "steps": [
                { "narration": "The system was built around a central AI core.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.showTier1()" }] },
                { "narration": "Which branched into specialized analysis and modeling units.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.showTier2()" }] },
                { "narration": "These units drew from multiple, real-time data sources.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.showTier3()" }] }
            ]
        },

        // 5. PROS_CONS: Animated List
        {
            "html": `
            <div class="w-full h-full bg-gray-900 flex items-center justify-center p-8">
                <div class="grid grid-cols-2 gap-8 w-full max-w-4xl">
                    <!-- Pros -->
                    <div>
                        <div class="flex items-center gap-4 border-b-2 border-green-500 pb-4 mb-6">
                            <i class="bi bi-check-circle-fill text-3xl text-green-500"></i>
                            <h2 class="text-3xl text-white font-bold">PROS</h2>
                        </div>
                        <ul id="pro-list" class="space-y-3 text-gray-300">
                            <li><i class="bi bi-check text-green-500 mr-2"></i> Increased Efficiency</li>
                            <li><i class="bi bi-check text-green-500 mr-2"></i> Data-Driven Insights</li>
                            <li><i class="bi bi-check text-green-500 mr-2"></i> Scalable Architecture</li>
                        </ul>
                    </div>
                    <!-- Cons -->
                    <div>
                        <div class="flex items-center gap-4 border-b-2 border-red-500 pb-4 mb-6">
                            <i class="bi bi-x-circle-fill text-3xl text-red-500"></i>
                            <h2 class="text-3xl text-white font-bold">CONS</h2>
                        </div>
                        <ul id="con-list" class="space-y-3 text-gray-300">
                           <li><i class="bi bi-x text-red-500 mr-2"></i> High Complexity</li>
                           <li><i class="bi bi-x text-red-500 mr-2"></i> Potential for Bias</li>
                           <li><i class="bi bi-x text-red-500 mr-2"></i> Security Risks</li>
                        </ul>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const animateList = (listId) => {
                    const items = ctx.root.querySelectorAll(\`#\${listId} li\`);
                    items.forEach((item, index) => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(-20px)';
                        item.style.transition = \`all 0.5s ease-out \${index * 0.2}s\`;
                        setTimeout(() => {
                           item.style.opacity = '1';
                           item.style.transform = 'translateX(0)';
                        }, 100);
                    });
                };
                return {
                    showPros: () => animateList('pro-list'),
                    showCons: () => animateList('con-list')
                }
            }`,
            "steps": [
                { "narration": "The benefits were immediately obvious.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.showPros()" }] },
                { "narration": "But every advantage came with its own set of risks.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.showCons()" }] }
            ]
        },

        // 6. CAROUSEL_3D: Rotating Images
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center overflow-hidden" style="perspective: 1000px;">
                <div id="carousel" class="relative w-48 h-72" style="transform-style: preserve-3d; transition: transform 1s ease-in-out;">
                    <div class="carousel-item" style="transform: rotateY(0deg) translateZ(200px);"><img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2670" class="img-fit"></div>
                    <div class="carousel-item" style="transform: rotateY(120deg) translateZ(200px);"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2670" class="img-fit"></div>
                    <div class="carousel-item" style="transform: rotateY(240deg) translateZ(200px);"><img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2531" class="img-fit"></div>
                </div>
                <style>.carousel-item { position: absolute; inset: 0; border: 2px solid white; border-radius: 1rem; overflow: hidden; background: #333; } .img-fit { width: 100%; height: 100%; object-fit: cover; }</style>
            </div>`,
            "script": `(ctx) => {
                let angle = 0;
                const carousel = ctx.root.querySelector('#carousel');
                return {
                    rotateNext: () => {
                        angle -= 120;
                        if(carousel) carousel.style.transform = \`rotateY(\${angle}deg)\`;
                    }
                }
            }`,
            "steps": [
                { "narration": "Multiple data streams were being monitored in parallel.", "actions": [] },
                { "narration": "Each one providing a different piece of the puzzle.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.rotateNext()" }] },
                { "narration": "It was critical to see the full picture.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.rotateNext()" }] }
            ]
        },

        // 7. EXPLODED_VIEW: Device Layers
        {
            "html": `
            <div class="w-full h-full bg-[#050505] flex items-center justify-center" style="perspective: 1500px;">
                <div id="device-container" class="relative w-64 h-96" style="transform-style: preserve-3d; transform: rotateX(60deg) rotateZ(-45deg);">
                    <div class="device-layer" id="layer-screen" style="transform: translateZ(10px); background: #eee;">
                        <div class="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">UI LAYER</div>
                    </div>
                    <div class="device-layer" id="layer-battery" style="transform: translateZ(0px); background: #333;">
                        <div class="w-11/12 h-5/6 bg-yellow-400 m-auto flex items-center justify-center text-black text-xs">BATTERY</div>
                    </div>
                    <div class="device-layer" id="layer-chip" style="transform: translateZ(-10px); background: #222;">
                        <div class="w-1/2 h-1/2 bg-green-500 m-auto flex items-center justify-center text-white text-xs">CPU</div>
                    </div>
                    <div class="device-layer" id="layer-case" style="transform: translateZ(-20px); background: #111;"></div>
                </div>
                <style>.device-layer { position: absolute; inset: 0; border: 1px solid #555; border-radius: 1.5rem; transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1); }</style>
            </div>`,
            "script": `(ctx) => {
                return {
                    explode: () => {
                        ctx.root.querySelector('#layer-screen').style.transform = 'translateZ(100px)';
                        ctx.root.querySelector('#layer-battery').style.transform = 'translateZ(20px)';
                        ctx.root.querySelector('#layer-chip').style.transform = 'translateZ(-60px)';
                        ctx.root.querySelector('#layer-case').style.transform = 'translateZ(-100px)';
                    }
                }
            }`,
            "steps": [
                { "narration": "On the surface, the device appeared to be a single, solid unit.", "actions": [] },
                { "narration": "But internally, it was a complex assembly of interconnected layers.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.explode()" }] }
            ]
        }
    ]
};
