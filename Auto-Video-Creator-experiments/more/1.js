const DEMO_DATA = {
    "meta": {
        "title": "Cinematic Typography Batch",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763065409/study-110111_at7lye.mp3",
        "lang": "en-US"
    },
    "scenes": [
        // 1. TITLE_CINEMATIC: Blur-to-Focus with God Ray
        {
            "html": `
            <div class="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
                <div class="film-grain"></div>
                <!-- God Ray / Light Sweep -->
                <div id="light-sweep" class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full z-20 pointer-events-none mix-blend-overlay blur-xl transition-transform duration-[3s] ease-in-out"></div>
                
                <div class="z-10 text-center relative mix-blend-screen">
                    <p class="text-xs font-mono text-gray-500 tracking-[1em] uppercase mb-6 opacity-0 transition-opacity duration-1000 delay-500" id="sub-1">Presents</p>
                    <h1 id="main-title" class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-tighter scale-110 blur-xl opacity-0 transition-all duration-[2000ms] ease-out">
                        ORIGIN
                    </h1>
                    <div class="h-[1px] w-0 bg-white/50 mx-auto mt-8 transition-all duration-[1.5s] delay-1000" id="line-1"></div>
                </div>
            </div>`,
            "steps": [
                {
                    "narration": "In the beginning, there was only silence.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('main-title').classList.remove('scale-110', 'blur-xl', 'opacity-0')" },
                        { "type": "reveal", "target": "#sub-1" }
                    ]
                },
                {
                    "narration": "Then, a single moment changed everything.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('light-sweep').classList.remove('-translate-x-full'); document.getElementById('light-sweep').classList.add('translate-x-full')" },
                        { "type": "width-grow", "target": "#line-1", "value": "150px" }
                    ]
                }
            ]
        },

        // 2. KINETIC_TYPE: High Contrast Rhythmic
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center overflow-hidden font-black uppercase text-white tracking-tighter">
                <div class="film-grain"></div>
                <!-- Flash Effect Overlay -->
                <div id="flash-overlay" class="absolute inset-0 bg-white z-20 opacity-0 pointer-events-none"></div>
                
                <div class="text-[15vw] leading-none text-center">
                    <div id="word-1" class="opacity-0 translate-y-10 transition-all duration-300 ease-out">MAKE</div>
                    <div id="word-2" class="opacity-0 translate-y-10 transition-all duration-300 ease-out delay-100">IT</div>
                    <div id="word-3" class="opacity-0 translate-y-10 transition-all duration-300 ease-out delay-200">LOUD</div>
                </div>
            </div>`,
            "steps": [
                {
                    "narration": "Make.",
                    "actions": [
                        { "type": "reveal", "target": "#word-1" },
                        { "type": "custom", "fn": "document.getElementById('word-1').style.transform = 'scale(1.1)'; setTimeout(()=>document.getElementById('word-1').style.transform='scale(1)', 200);" }
                    ]
                },
                {
                    "narration": "It.",
                    "actions": [
                        { "type": "reveal", "target": "#word-2" },
                        { "type": "custom", "fn": "document.getElementById('word-2').style.transform = 'scale(1.1)'; setTimeout(()=>document.getElementById('word-2').style.transform='scale(1)', 200);" }
                    ]
                },
                {
                    "narration": "Loud.",
                    "actions": [
                        { "type": "reveal", "target": "#word-3" },
                        // This creates a camera-shake and full-screen white flash effect
                        { "type": "custom", "fn": `
                            const overlay = document.getElementById('flash-overlay');
                            const container = document.querySelector('.text-\\[15vw\\]');
                            overlay.style.transition = 'opacity 0.05s linear';
                            overlay.style.opacity = 1;
                            container.style.transform = 'translateX(-10px) rotate(-1deg)';
                            setTimeout(() => { 
                                overlay.style.opacity = 0; 
                                container.style.transform = 'none';
                            }, 100);
                        `}
                    ]
                }
            ]
        },
        
        // 3. GLITCH_TEXT: RGB Split Cyberpunk
        {
            "html": `
            <div class="w-full h-full bg-[#050505] flex items-center justify-center font-mono overflow-hidden">
                <div class="relative group">
                    <!-- Red Channel -->
                    <h1 class="text-8xl font-bold text-red-500 absolute top-0 left-0 -ml-1 opacity-70 mix-blend-screen animate-pulse" id="glitch-r">SYSTEM FAILURE</h1>
                    <!-- Blue Channel -->
                    <h1 class="text-8xl font-bold text-blue-500 absolute top-0 left-0 ml-1 opacity-70 mix-blend-screen animate-pulse" style="animation-duration: 0.2s" id="glitch-b">SYSTEM FAILURE</h1>
                    <!-- Main White -->
                    <h1 class="text-8xl font-bold text-white relative z-10" id="glitch-main">SYSTEM FAILURE</h1>
                </div>
                <div class="absolute bottom-10 left-10 text-green-500 text-xs font-mono">ERR_CODE: 0x8492</div>
            </div>`,
            "script": `(ctx) => {
                const main = ctx.root.querySelector('#glitch-main');
                const red = ctx.root.querySelector('#glitch-r');
                const blue = ctx.root.querySelector('#glitch-b');
                
                const final = "SYSTEM REBOOT";
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
                
                return {
                    decode: () => {
                        let i = 0;
                        main.innerText = ""; 
                        const interval = setInterval(() => {
                            main.innerText = final.split('').map((letter, index) => {
                                if(index < i) return final[index];
                                return chars[Math.floor(Math.random() * chars.length)];
                            }).join('');
                            
                            // Randomize glitch layers
                            red.innerText = main.innerText;
                            blue.innerText = main.innerText;
                            
                            if(i >= final.length) {
                                clearInterval(interval);
                                main.innerText = final;
                                red.style.display = 'none';
                                blue.style.display = 'none';
                            }
                            i += 1/3; 
                        }, 50);
                    }
                }
            }`,
            "steps": [
                {
                    "narration": "Critical error detected in the mainframe.",
                    "actions": []
                },
                {
                    "narration": "Initiating recovery protocols now.",
                    "actions": [
                        { "type": "custom", "fn": "Engine.state.activeScript.decode()" }
                    ]
                }
            ]
        },

        // 4. QUOTE_SCENE: Texture & Highlighter
        {
            "html": `
            <div class="w-full h-full bg-[#f3e9d2] flex items-center justify-center p-24 relative overflow-hidden">
                <!-- Simple CSS Pattern for Paper -->
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                <div class="film-grain"></div>
                
                <div class="relative z-10 max-w-5xl">
                    <i class="bi bi-quote text-6xl text-gray-400 absolute -top-10 -left-10 opacity-50"></i>
                    <p class="text-6xl font-serif text-[#1a1a1a] leading-tight tracking-tight">
                        We are drowning in 
                        <span class="relative inline-block px-2">
                            <span id="hl-info" class="absolute inset-0 bg-yellow-300 mix-blend-multiply w-0 transition-all duration-700 ease-in-out"></span>
                            <span class="relative z-10">information</span>
                        </span>
                        but starved for 
                        <span class="relative inline-block px-2">
                            <span id="hl-know" class="absolute inset-0 bg-blue-300 mix-blend-multiply w-0 transition-all duration-700 ease-in-out"></span>
                            <span class="relative z-10">knowledge</span>
                        </span>.
                    </p>
                    <div class="mt-12 flex items-center gap-4 opacity-0 translate-y-4 transition-all duration-700" id="author">
                        <div class="w-16 h-16 rounded-full bg-gray-400 grayscale overflow-hidden">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/John_Naisbitt.jpg" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <p class="font-bold text-black">John Naisbitt</p>
                            <p class="text-xs text-gray-500 uppercase tracking-widest">Megatrends, 1982</p>
                        </div>
                    </div>
                </div>
            </div>`,
            "steps": [
                {
                    "narration": "We are drowning in information.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('hl-info').style.width = '100%'" }
                    ]
                },
                {
                    "narration": "But we are starved for actual knowledge.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('hl-know').style.width = '100%'" },
                        { "type": "reveal", "target": "#author" }
                    ]
                }
            ]
        },

        // 5. SPOTLIGHT: Flashlight Reveal
        {
            "html": `
            <div class="w-full h-full bg-black relative flex items-center justify-center overflow-hidden">
                <!-- The Hidden Content (Visible only through mask) -->
                <div id="spotlight-content" class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069')] bg-cover grayscale contrast-125"
                     style="mask-image: radial-gradient(circle 150px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%); -webkit-mask-image: radial-gradient(circle 150px at var(--x, 50%) var(--y, 50%), black 100%, transparent 100%);">
                </div>
                
                <!-- Text Overlay (Always visible but dim) -->
                <div class="z-20 pointer-events-none">
                    <h1 class="text-white/20 text-9xl font-black uppercase tracking-tighter">SECRETS</h1>
                </div>
            </div>`,
            "script": `(ctx) => {
                let angle = 0;
                let animationFrameId;
                const el = ctx.root.querySelector('#spotlight-content');
                
                const updateLight = () => {
                    angle += 0.02;
                    const x = 50 + Math.cos(angle) * 30; // 30% radius
                    const y = 50 + Math.sin(angle * 1.5) * 20; // Lissajous figure
                    if(el) {
                        el.style.setProperty('--x', x + '%');
                        el.style.setProperty('--y', y + '%');
                    }
                    animationFrameId = requestAnimationFrame(updateLight);
                };
                animationFrameId = requestAnimationFrame(updateLight);
                
                return {
                    remove: () => cancelAnimationFrame(animationFrameId), // Cleanup
                    revealAll: () => {
                        cancelAnimationFrame(animationFrameId); // Stop the animation
                        if(el) {
                            el.style.transition = 'mask-size 1.5s ease-in-out, -webkit-mask-size 1.5s ease-in-out';
                            // Expand the mask to cover full screen
                            el.style.maskImage = 'radial-gradient(circle at 50% 50%, black 100%, transparent 100%)';
                            el.style.webkitMaskImage = 'radial-gradient(circle at 50% 50%, black 100%, transparent 100%)';
                            // CSS hack: increase size of the radial gradient via shorthand or just switch classes
                            // Simplest approach: Use Clip Path for full reveal
                            el.style.mask = 'none';
                            el.style.webkitMask = 'none';
                        }
                    }
                };
            }`,
            "steps": [
                {
                    "narration": "Some things are hidden in the dark.",
                    "actions": []
                },
                {
                    "narration": "Until you shine a light on them.",
                    "actions": [
                        { "type": "custom", "fn": "Engine.state.activeScript.revealAll()" }
                    ]
                }
            ]
        },

        // 6. NEON_SIGN: Flicker & Bloom
        {
            "html": `
            <div class="w-full h-full bg-[#080808] flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-brick-wall.png')] opacity-50"></div>
                <div class="z-10 text-center border-4 border-gray-800 p-12 rounded-3xl bg-black/50 backdrop-blur-sm shadow-2xl">
                    <h1 id="neon-text" class="text-8xl font-mono text-gray-800 transition-all duration-300">OPEN</h1>
                    <p class="text-gray-700 mt-4 font-bold tracking-widest uppercase" id="neon-sub">24 Hours</p>
                </div>
            </div>`,
            "steps": [
                {
                    "narration": "The lights are off.",
                    "actions": []
                },
                {
                    "narration": "But the city never sleeps.",
                    "actions": [
                        { "type": "custom", "fn": `
                            const t = document.getElementById('neon-text');
                            const s = document.getElementById('neon-sub');
                            // Add neon styles dynamically
                            t.style.color = '#fff';
                            t.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 40px #f0f, 0 0 80px #f0f';
                            s.style.color = '#fff';
                            s.style.textShadow = '0 0 5px #fff, 0 0 10px #0ff';
                            
                            // Flicker Effect
                            let flicker = 0;
                            const f = setInterval(() => {
                                t.style.opacity = Math.random() > 0.1 ? 1 : 0.2;
                                flicker++;
                                if(flicker > 10) {
                                    clearInterval(f);
                                    t.style.opacity = 1;
                                }
                            }, 50);
                        `}
                    ]
                }
            ]
        },

        // 7. PARALLAX_LAYER: Depth Movement
        {
            "html": `
            <div class="w-full h-full bg-[#0f172a] relative overflow-hidden flex items-center justify-center perspective-[1000px]">
                <!-- Layer 1: Background (Slow) -->
                <div id="para-1" class="absolute inset-[-100px] bg-[url('https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2672')] bg-cover opacity-60"></div>
                
                <!-- Layer 2: Middle (Text) -->
                <div id="para-2" class="relative z-10 text-center">
                    <h1 class="text-9xl font-black text-white tracking-tighter drop-shadow-2xl">DEPTH</h1>
                </div>

                <!-- Layer 3: Foreground (Dust/Fog - Fast) -->
                <div id="para-3" class="absolute inset-[-200px] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-80 mix-blend-screen pointer-events-none"></div>
            </div>`,
            "script": `(ctx) => {
                let time = 0;
                let animationFrameId;
                const loop = () => {
                    time += 0.005;
                    const l1 = ctx.root.querySelector('#para-1');
                    const l2 = ctx.root.querySelector('#para-2');
                    const l3 = ctx.root.querySelector('#para-3');
                    
                    const x = Math.sin(time) * 20; 
                    const y = Math.cos(time) * 10;

                    if(l1) l1.style.transform = \`translate(\${x * 0.5}px, \${y * 0.5}px) scale(1.1)\`;
                    if(l2) l2.style.transform = \`translate(\${x}px, \${y}px)\`;
                    if(l3) l3.style.transform = \`translate(\${x * 3}px, \${y * 3}px) scale(1.2)\`;
                    
                    animationFrameId = requestAnimationFrame(loop);
                };
                animationFrameId = requestAnimationFrame(loop);
                // Return a cleanup function
                return { remove: () => cancelAnimationFrame(animationFrameId) };
            }`,
            "steps": [
                {
                    "narration": "Perspective changes everything.",
                    "actions": []
                },
                {
                    "narration": "When you look deeper, the world moves around you.",
                    "actions": []
                }
            ]
        }
    ]
};
