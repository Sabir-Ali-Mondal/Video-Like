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
        },
      // 1. NEON DATA CRASH: Fixed memory leaks, organic fall, better styling
        {
            "html": `
            <div class="w-full h-full bg-[#050505] flex flex-col p-16 relative overflow-hidden font-mono">
                <div class="film-grain"></div>
                <!-- Dynamic Background -->
                <div id="crash-bg" class="absolute inset-0 bg-red-900/0 transition-colors duration-1000 z-0"></div>
                
                <div class="z-10 flex justify-between items-end mb-8 border-b border-white/10 pb-4">
                    <div>
                        <div class="flex items-center gap-2">
                            <div class="w-2 h-2 rounded-full bg-green-500 transition-colors duration-300" id="status-dot"></div>
                            <h2 class="text-gray-500 text-xs tracking-[0.3em] uppercase">Volatility Index</h2>
                        </div>
                        <h1 class="text-white text-6xl font-black italic tracking-tighter transition-all duration-300" id="market-status">STABLE</h1>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-gray-500 mb-1">VALUATION</div>
                        <div class="text-4xl text-green-500 font-bold tabular-nums transition-colors duration-300" id="price-tag">$4,291.00</div>
                    </div>
                </div>
                
                <div class="flex-1 relative bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden">
                    <canvas id="chart-crash"></canvas>
                </div>
            </div>`,
            "script": `(ctx) => {
                // Safer Chart init
                const canvas = ctx.root.querySelector('#chart-crash');
                if(!canvas) return;

                const chart = ctx.chart('#chart-crash', {
                    type: 'line',
                    data: { 
                        labels: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'], 
                        datasets: [{ 
                            data: [3800, 3950, 4100, 4050, 4291, 4350, 4400], 
                            borderColor: '#22c55e', 
                            backgroundColor: 'rgba(34, 197, 94, 0.1)',
                            fill: true, 
                            tension: 0.4, 
                            borderWidth: 4, 
                            pointRadius: 0 
                        }] 
                    },
                    options: { 
                        responsive: true, 
                        maintainAspectRatio: false, 
                        scales: { 
                            y: { display: false, min: 1000, max: 5000 }, 
                            x: { grid: { display: false }, ticks: { color: '#666' } } 
                        }, 
                        plugins: { legend: { display: false } },
                        animation: { duration: 800 }
                    }
                });

                // Inject global shake style safely (singleton pattern)
                if(!document.getElementById('anim-shake')) {
                    const s = document.createElement('style');
                    s.id = 'anim-shake';
                    s.innerHTML = \`@keyframes shake { 0%, 100% {transform:translateX(0);} 25% {transform:translateX(-5px);} 75% {transform:translateX(5px);} }\`;
                    document.head.appendChild(s);
                }

                return {
                    triggerCrash: () => {
                        // 1. Update Data (Simulate organic drop, not teleport)
                        const newData = [3800, 3950, 4100, 4050, 3200, 2100, 1100]; // Stepped drop
                        chart.data.datasets[0].data = newData;
                        chart.data.datasets[0].borderColor = '#ef4444';
                        chart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.2)';
                        chart.update();

                        // 2. DOM Updates
                        const els = {
                            bg: ctx.root.querySelector('#crash-bg'),
                            status: ctx.root.querySelector('#market-status'),
                            price: ctx.root.querySelector('#price-tag'),
                            dot: ctx.root.querySelector('#status-dot')
                        };

                        if(els.bg) els.bg.style.backgroundColor = 'rgba(220, 38, 38, 0.2)';
                        
                        if(els.status) {
                            els.status.innerText = 'CRITICAL FAILURE';
                            els.status.style.color = '#ef4444';
                            // Add shake
                            els.status.style.animation = 'shake 0.4s ease-in-out';
                        }
                        
                        if(els.price) {
                            els.price.innerText = '$1,100.00';
                            els.price.style.color = '#ef4444';
                        }
                        
                        if(els.dot) {
                            els.dot.classList.remove('bg-green-500');
                            els.dot.classList.add('bg-red-500', 'animate-pulse');
                        }
                    }
                };
            }`,
            "steps": [
                {
                    "narration": "Market stability was maintained for three consecutive quarters.",
                    "actions": []
                },
                {
                    "narration": "However, the algorithmic sell-off began instantaneously.",
                    "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.triggerCrash()" }]
                }
            ]
        },

        // 2. KPI CASCADE: Synced Counting & Easing
        {
            "html": `
            <div class="w-full h-full bg-[#0a0a0c] flex items-center justify-center p-12 relative overflow-hidden">
                <div class="film-grain"></div>
                <div class="grid grid-cols-3 gap-8 w-full max-w-6xl relative z-10">
                    <!-- KPI 1 -->
                    <div id="kpi-1" class="bg-white/5 border border-white/10 p-10 rounded-3xl opacity-0 translate-y-10 transition-all duration-700 ease-out">
                        <div class="text-blue-500 text-xs font-black tracking-[0.3em] mb-4 uppercase">User Retention</div>
                        <div class="text-7xl font-black text-white italic tracking-tighter mb-2"><span id="count-1">0</span>%</div>
                        <div class="w-full h-1 bg-white/10"><div class="h-full bg-blue-500 w-0 transition-all duration-[2000ms] ease-out" id="bar-1"></div></div>
                    </div>
                    <!-- KPI 2 -->
                    <div id="kpi-2" class="bg-white/5 border border-white/10 p-10 rounded-3xl opacity-0 translate-y-10 transition-all duration-700 delay-200 ease-out">
                        <div class="text-purple-500 text-xs font-black tracking-[0.3em] mb-4 uppercase">Server Uptime</div>
                        <div class="text-7xl font-black text-white italic tracking-tighter mb-2"><span id="count-2">0</span>%</div>
                        <div class="w-full h-1 bg-white/10"><div class="h-full bg-purple-500 w-0 transition-all duration-[2000ms] ease-out" id="bar-2"></div></div>
                    </div>
                    <!-- KPI 3 -->
                    <div id="kpi-3" class="bg-white/5 border border-white/10 p-10 rounded-3xl opacity-0 translate-y-10 transition-all duration-700 delay-400 ease-out">
                        <div class="text-amber-500 text-xs font-black tracking-[0.3em] mb-4 uppercase">Market Share</div>
                        <div class="text-7xl font-black text-white italic tracking-tighter mb-2"><span id="count-3">0</span>%</div>
                        <div class="w-full h-1 bg-white/10"><div class="h-full bg-amber-500 w-0 transition-all duration-[2000ms] ease-out" id="bar-3"></div></div>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                // Easing function for numbers (EaseOutCubic)
                const easeOut = (t) => 1 - Math.pow(1 - t, 3);
                
                const animateValue = (id, start, end, duration) => {
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const linearProgress = Math.min((timestamp - startTimestamp) / duration, 1);
                        const easedProgress = easeOut(linearProgress);
                        
                        const el = ctx.root.querySelector('#' + id);
                        if(el) el.innerHTML = Math.floor(easedProgress * (end - start) + start);
                        
                        if (linearProgress < 1) window.requestAnimationFrame(step);
                    };
                    window.requestAnimationFrame(step);
                };

                return {
                    runStats: () => {
                        // Reveal Cards
                        ['kpi-1', 'kpi-2', 'kpi-3'].forEach(id => {
                            const el = ctx.root.querySelector('#' + id);
                            if(el) el.classList.remove('opacity-0', 'translate-y-10');
                        });

                        // Start Counters & Bars
                        animateValue('count-1', 0, 94, 2000); 
                        const b1 = ctx.root.querySelector('#bar-1'); if(b1) b1.style.width = '94%';

                        animateValue('count-2', 0, 99, 2000); 
                        const b2 = ctx.root.querySelector('#bar-2'); if(b2) b2.style.width = '99%';

                        animateValue('count-3', 0, 42, 2000); 
                        const b3 = ctx.root.querySelector('#bar-3'); if(b3) b3.style.width = '42%';
                    }
                };
            }`,
            "steps": [{
                "narration": "The performance metrics exceeded all initial projections.",
                "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.runStats()" }]
            }]
        },

        // 3. DOUGHNUT HOLO: Improved rotation logic & animation frame cleanup
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center p-20 relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)]"></div>
                <div class="camera-drift absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
                
                <div class="relative w-[500px] h-[500px] z-10 perspective-[1000px]">
                    <div class="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                        <div class="text-gray-500 font-mono text-xs tracking-widest uppercase">Allocation</div>
                        <div class="text-white text-5xl font-black italic">88.5%</div>
                    </div>
                    <div id="holo-container" class="w-full h-full">
                        <canvas id="chart-doughnut"></canvas>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const chart = ctx.chart('#chart-doughnut', {
                    type: 'doughnut',
                    data: { labels: ['A', 'B'], datasets: [{ data: [0, 100], backgroundColor: ['#3b82f6', '#111'], borderWidth: 0, cutout: '85%' }] },
                    options: { responsive: true, plugins: { legend: { display: false } }, animation: { animateRotate: true, duration: 2000, easing: 'easeOutQuart' } }
                });

                const container = ctx.root.querySelector('#holo-container');
                let rotation = 0;
                let frameId;

                const spin = () => { 
                    rotation += 0.2; 
                    if(container) {
                        // Subtle 3D movement
                        container.style.transform = \`rotateX(20deg) rotateZ(\${rotation}deg)\`;
                    }
                    frameId = window.requestAnimationFrame(spin); 
                };
                spin();

                return { 
                    remove: () => window.cancelAnimationFrame(frameId),
                    fill: () => {
                        chart.data.datasets[0].data = [88.5, 11.5];
                        chart.update();
                    }
                };
            }`,
            "steps": [{
                "narration": "Nearly eighty-eight percent of all resources were allocated effectively.",
                "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.fill()" }]
            }]
        },

        // 4. TIMELINE SCROLL: Responsive % based transforms
        {
            "html": `
            <div class="w-full h-full bg-[#050505] flex flex-col justify-center relative overflow-hidden">
                <div class="film-grain"></div>
                <div class="absolute w-full h-[1px] bg-white/10 top-1/2 left-0 z-0"></div>
                
                <!-- Container is 300% width for 3 stops -->
                <div id="timeline-container" class="flex w-[300%] transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] relative z-10 translate-x-0">
                    
                    <!-- STOP 1 (0 to 33%) -->
                    <div class="w-1/3 flex flex-col items-center justify-center h-full">
                        <div class="text-white text-6xl font-black mb-4">2010</div>
                        <div class="w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6] mb-8 scale-125"></div>
                        <div class="text-gray-500 font-mono text-xs w-40 text-center uppercase tracking-widest">Genesis Protocol</div>
                    </div>
                    
                    <!-- STOP 2 (33 to 66%) -->
                    <div class="w-1/3 flex flex-col items-center justify-center h-full">
                        <div class="text-white text-6xl font-black mb-4">2015</div>
                        <div class="w-6 h-6 rounded-full bg-purple-500 shadow-[0_0_20px_#a855f7] mb-8 scale-125"></div>
                        <div class="text-gray-500 font-mono text-xs w-40 text-center uppercase tracking-widest">Decentralization</div>
                    </div>

                    <!-- STOP 3 (66 to 100%) -->
                    <div class="w-1/3 flex flex-col items-center justify-center h-full">
                        <div class="text-white text-6xl font-black mb-4">2026</div>
                        <div class="w-6 h-6 rounded-full bg-amber-500 shadow-[0_0_20px_#f59e0b] mb-8 scale-125"></div>
                        <div class="text-amber-500 font-mono text-xs w-40 text-center uppercase tracking-widest">Singularity Event</div>
                    </div>

                </div>
            </div>`,
            "steps": [
                {
                    "narration": "The roadmap began in 2010.",
                    "actions": []
                },
                {
                    "narration": "By 2015, the network had fully decentralized.",
                    "actions": [{ "type": "custom", "fn": "document.getElementById('timeline-container').style.transform = 'translateX(-33.33%)'" }]
                },
                {
                    "narration": "Leading us to the Singularity in 2026.",
                    "actions": [{ "type": "custom", "fn": "document.getElementById('timeline-container').style.transform = 'translateX(-66.66%)'" }]
                }
            ]
        },

        // 5. BAR RACE: Fixed color logic and update
        {
            "html": `
            <div class="w-full h-full bg-zinc-900 flex flex-col p-16 relative overflow-hidden">
                <div class="film-grain"></div>
                <h2 class="text-white text-4xl font-black italic mb-10 tracking-tighter">GLOBAL ADOPTION VELOCITY</h2>
                <div class="flex-1 relative bg-black/40 rounded-2xl border border-white/5 p-8">
                    <canvas id="chart-race"></canvas>
                </div>
            </div>`,
            "script": `(ctx) => {
                const chart = ctx.chart('#chart-race', {
                    type: 'bar',
                    data: { 
                        labels: ['REGION A', 'REGION B', 'REGION C'], 
                        datasets: [{ 
                            data: [10, 10, 10], 
                            backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899'], 
                            borderRadius: 10, 
                            barThickness: 50 
                        }] 
                    },
                    options: { 
                        indexAxis: 'y', 
                        responsive: true, 
                        maintainAspectRatio: false, 
                        scales: { 
                            x: { max: 100, grid: { color: '#333' }, ticks: { color: '#fff' } }, 
                            y: { ticks: { color: '#fff', font: { weight: 'bold' } } } 
                        }, 
                        plugins: { legend: { display: false } }, 
                        animation: {duration: 1500, easing: 'easeOutExpo'} 
                    }
                });
                return {
                    startRace: () => {
                        // Region C Overtakes
                        chart.data.datasets[0].data = [45, 60, 95];
                        chart.data.datasets[0].backgroundColor = ['#3b82f6', '#8b5cf6', '#22c55e']; // Winner turns green
                        chart.update();
                    }
                };
            }`,
            "steps": [
                {
                    "narration": "Initially, adoption was synchronized.",
                    "actions": []
                },
                {
                    "narration": "But Region C accelerated rapidly, outpacing the others.",
                    "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.startRace()" }]
                }
            ]
        },

        // 6. STOCK TICKER: Smooth random walk (Lerp) instead of jitter
        {
            "html": `
            <div class="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974717482-aa3820625390?q=80&w=2000')] bg-cover opacity-10 camera-drift"></div>
                
                <div class="z-10 flex flex-col items-center gap-4">
                    <div class="text-amber-500 font-mono text-sm tracking-[0.5em] uppercase">Market Sentiment</div>
                    
                    <!-- Gauge -->
                    <div class="relative w-64 h-32 overflow-hidden bg-white/5 border-t border-x border-white/20 rounded-t-full">
                        <div id="needle" class="absolute bottom-0 left-1/2 w-1 h-28 bg-red-500 origin-bottom transition-none" style="transform: translateX(-50%) rotate(-90deg)"></div>
                        <div class="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div class="text-white text-9xl font-black italic tracking-tighter">VOLATILE</div>
                </div>

                <div class="absolute bottom-0 w-full h-20 bg-blue-600 flex items-center overflow-hidden border-t-2 border-white/20">
                    <div class="whitespace-nowrap animate-[scroll_20s_linear_infinite] flex items-center gap-10 text-2xl font-mono p-4">
                        <span class="text-white font-bold">AAPL +2.4% ▲</span>
                        <span class="text-white font-bold">BTC $64K ▼</span>
                        <span class="text-white font-bold">TSLA -1.2% ▼</span>
                        <span class="text-white font-bold">NVDA +5.8% ▲</span>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                let frame;
                const needle = ctx.root.querySelector('#needle');
                let targetAngle = 0;
                let currentAngle = 0;
                
                // Linear Interpolation helper
                const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

                const loop = () => {
                    // Update target occasionally (random walk)
                    if(Math.random() < 0.05) {
                        targetAngle = (Math.random() * 180) - 90; // -90 to 90 degrees
                    }
                    
                    // Smoothly move towards target
                    currentAngle = lerp(currentAngle, targetAngle, 0.05);
                    
                    if(needle) needle.style.transform = \`translateX(-50%) rotate(\${currentAngle}deg)\`;
                    frame = window.requestAnimationFrame(loop);
                };
                loop();

                return { remove: () => cancelAnimationFrame(frame) };
            }`,
            "steps": [{
                "narration": "Beneath the surface, the pulse of the digital economy never stops beating.",
                "actions": []
            }]
        },

        // 7. HEATMAP: Correct cleanup and target styling
        {
            "html": `
            <div class="w-full h-full bg-[#050505] flex items-center justify-center p-20 relative overflow-hidden">
                <div class="film-grain"></div>
                <div id="crosshair-h" class="absolute w-full h-[1px] bg-red-500/50 top-1/2 left-0 z-20 transition-all duration-700 opacity-0"></div>
                <div id="crosshair-v" class="absolute h-full w-[1px] bg-red-500/50 top-0 left-1/2 z-20 transition-all duration-700 opacity-0"></div>
                <div class="grid grid-cols-10 grid-rows-10 w-[600px] h-[600px] gap-1 relative z-10" id="heatmap-grid"></div>
            </div>`,
            "script": `(ctx) => {
                const grid = ctx.root.querySelector('#heatmap-grid');
                let heatInterval;
                
                if(!grid.children.length) { 
                    for(let i=0; i<100; i++) {
                        const cell = document.createElement('div');
                        cell.className = 'bg-white/5 transition-colors duration-500';
                        cell.id = 'cell-' + i;
                        grid.appendChild(cell);
                    }
                }
                
                const runHeat = () => {
                    for(let i=0; i<100; i++) {
                        const cell = ctx.root.querySelector('#cell-'+i);
                        // Only color if not locked (focused)
                        if(cell && !cell.classList.contains('locked')) {
                            cell.style.backgroundColor = 'rgba(59, 130, 246, ' + Math.random() + ')';
                        }
                    }
                };
                heatInterval = setInterval(runHeat, 500);
                
                return {
                    focusTarget: (index, topPct, leftPct) => {
                        const cell = ctx.root.querySelector('#cell-'+index);
                        const ch_h = ctx.root.querySelector('#crosshair-h');
                        const ch_v = ctx.root.querySelector('#crosshair-v');
                        
                        if(cell && ch_h && ch_v) {
                            cell.classList.add('locked'); // Stop random colors
                            cell.style.backgroundColor = '#ef4444';
                            cell.style.boxShadow = '0 0 20px #ef4444';
                            
                            ch_h.style.top = topPct + '%';
                            ch_h.style.opacity = 1;
                            
                            ch_v.style.left = leftPct + '%';
                            ch_v.style.opacity = 1;
                        }
                    },
                    remove: () => clearInterval(heatInterval)
                }
            }`,
            "steps": [
                {
                    "narration": "We monitor every transaction in the network.",
                    "actions": []
                },
                {
                    "narration": "And right here... is where the anomaly begins.",
                    "actions": [{
                        "type": "custom",
                        "fn": "Engine.state.activeScript.focusTarget(45, 45, 55)"
                    }]
                }
            ]
        },
       // 1. SATELLITE ZOOM: Real Leaflet Logic & HUD Sync
        {
            "html": `
            <div class="w-full h-full bg-black relative overflow-hidden font-mono">
                <div id="map-world" class="w-full h-full z-0 grayscale contrast-[1.1] brightness-75"></div>
                <div class="absolute inset-0 z-10 pointer-events-none p-8 flex flex-col justify-between">
                    <div class="flex justify-between items-start">
                        <div class="bg-black/90 border border-white/20 p-4 rounded text-[10px] text-green-500 shadow-lg backdrop-blur-sm">
                            <div class="mb-2 text-white font-bold tracking-widest">SATELLITE LINK: <span class="text-green-500 animate-pulse">LIVE</span></div>
                            <div class="grid grid-cols-2 gap-x-8 gap-y-1 opacity-80">
                                <span>LAT:</span><span id="lat-disp" class="text-right text-white">20.0000</span>
                                <span>LON:</span><span id="lon-disp" class="text-right text-white">0.0000</span>
                                <span>ZOOM:</span><span id="zoom-disp" class="text-right text-white">2.0x</span>
                            </div>
                        </div>
                        <div class="text-white text-5xl font-black italic opacity-0 transition-all duration-700 translate-y-[-20px]" id="loc-name">TOKYO</div>
                    </div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-white/10 rounded-full flex items-center justify-center">
                        <div class="absolute inset-0 border-t border-b border-green-500/50 w-full h-full rounded-full animate-[spin_4s_linear_infinite]"></div>
                        <div class="w-1 h-1 bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                // FIX: Pass the string selector '#map-world' directly to ctx.map
                const map = ctx.map('#map-world', {
                    center: [20, 0],
                    zoom: 2,
                    zoomControl: false,
                    attributionControl: false,
                    scrollWheelZoom: false,
                    doubleClickZoom: false
                });

                L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                    maxZoom: 19,
                    subdomains: 'abcd'
                }).addTo(map);

                let interval;

                return {
                    remove: () => {
                        map.remove();
                        clearInterval(interval);
                    },
                    zoomToTarget: () => {
                        map.flyTo([35.6895, 139.6917], 12, { duration: 4, easeLinearity: 0.1 });
                        
                        const els = {
                            lat: ctx.root.querySelector('#lat-disp'),
                            lon: ctx.root.querySelector('#lon-disp'),
                            zoom: ctx.root.querySelector('#zoom-disp'),
                            name: ctx.root.querySelector('#loc-name')
                        };

                        let step = 0;
                        interval = setInterval(() => {
                            step++;
                            const progress = Math.min(1, step / 40);
                            if(els.lat) els.lat.innerText = (20 + (15.6895 * progress)).toFixed(4);
                            if(els.lon) els.lon.innerText = (0 + (139.6917 * progress)).toFixed(4);
                            if(els.zoom) els.zoom.innerText = (2 + (10 * progress)).toFixed(1) + 'x';
                            if(step >= 40) clearInterval(interval);
                        }, 100);

                        setTimeout(() => {
                            if(els.name) els.name.classList.remove('opacity-0', 'translate-y-[-20px]');
                        }, 3500);
                    }
                };
            }`,
            "steps": [
                { "narration": "Global surveillance systems initiated.", "actions": [] },
                { "narration": "Triangulating signal source... Locking onto Tokyo grid.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.zoomToTarget()" }] }
            ]
        },

        // 2. NETWORK NODES: High-DPI P5
        {
            "html": `
            <div class="w-full h-full bg-[#0b0b0f] relative overflow-hidden flex items-center justify-center">
                <div id="p5-container" class="absolute inset-0 z-0"></div>
                <div class="z-10 bg-black/80 backdrop-blur-md px-6 py-4 rounded-full border border-white/10 text-center pointer-events-none flex items-center gap-4">
                    <div class="w-2 h-2 rounded-full bg-gray-500" id="sync-dot"></div>
                    <div class="text-xs font-mono text-gray-400 tracking-widest uppercase">NEURAL STATUS: <span id="sync-text" class="text-white">IDLE</span></div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const sketch = (p) => {
                    let particles = [];
                    const num = 60;
                    let syncing = false;

                    p.setup = () => {
                        p.pixelDensity(window.devicePixelRatio || 1);
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        for(let i=0; i<num; i++) particles.push({ x: p.random(p.width), y: p.random(p.height), vx: p.random(-0.5, 0.5), vy: p.random(-0.5, 0.5) });
                    };

                    p.draw = () => {
                        p.clear();
                        particles.forEach((pt, i) => {
                            if(syncing) {
                                pt.x += (p.width/2 + Math.cos(i) * 200 - pt.x) * 0.05;
                                pt.y += (p.height/2 + Math.sin(i) * 200 - pt.y) * 0.05;
                            } else {
                                pt.x += pt.vx; pt.y += pt.vy;
                                if(pt.x < 0 || pt.x > p.width) pt.vx *= -1;
                                if(pt.y < 0 || pt.y > p.height) pt.vy *= -1;
                            }
                            p.noStroke(); p.fill(255, syncing ? 200 : 100); p.circle(pt.x, pt.y, syncing ? 4 : 3);
                            const reach = syncing ? 150 : 80;
                            for(let j=i+1; j<num; j++) {
                                const other = particles[j];
                                const d = p.dist(pt.x, pt.y, other.x, other.y);
                                if(d < reach) {
                                    p.stroke(59, 130, 246, p.map(d, 0, reach, 200, 0));
                                    p.strokeWeight(syncing ? 1.5 : 0.5);
                                    p.line(pt.x, pt.y, other.x, other.y);
                                }
                            }
                        });
                    };
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                    p.startSync = () => syncing = true;
                };
                
                // FIX: Pass the string selector '#p5-container' directly to ctx.p5
                const myP5 = ctx.p5(sketch, '#p5-container');

                return {
                    remove: () => myP5.remove(),
                    triggerSync: () => {
                        myP5.startSync();
                        const dot = ctx.root.querySelector('#sync-dot');
                        const text = ctx.root.querySelector('#sync-text');
                        if(dot) { dot.classList.remove('bg-gray-500'); dot.classList.add('bg-blue-500', 'animate-pulse'); }
                        if(text) { text.innerText = "SYNCHRONIZED"; text.classList.add('text-blue-400'); }
                    }
                };
            }`,
            "steps": [
                { "narration": "Nodes operating in isolation.", "actions": [] },
                { "narration": "Protocol activated. Synchronization achieved.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.triggerSync()" }] }
            ]
        },

        // 3. DETECTIVE BOARD: SVG Connections (No change needed, was already correct)
        {
            "html": `
            <div class="w-full h-full bg-[#1a1815] relative overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')]"></div>
                <div class="relative w-[80%] aspect-video bg-black/5 shadow-2xl border border-white/5">
                    <svg class="absolute inset-0 w-full h-full z-20 pointer-events-none" viewBox="0 0 1000 562">
                        <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#ef4444" /></marker></defs>
                        <path id="string-1" d="M 500 281 L 800 150" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400" marker-end="url(#arrow)" />
                        <path id="string-2" d="M 500 281 L 200 400" fill="none" stroke="#ef4444" stroke-width="3" stroke-dasharray="400" stroke-dashoffset="400" marker-end="url(#arrow)" />
                    </svg>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 shadow-xl rotate-[-2deg] w-[15%]">
                        <div class="bg-gray-200 aspect-square mb-1"></div><div class="font-mono text-[8px] text-center text-red-700 font-bold uppercase">PRIMARY</div>
                        <div class="w-3 h-3 rounded-full bg-red-600 absolute -top-1 left-1/2 -translate-x-1/2 shadow-sm border border-white"></div>
                    </div>
                    <div id="ev-1" class="absolute top-[26%] left-[80%] -translate-x-1/2 -translate-y-1/2 bg-white p-2 shadow-xl rotate-[3deg] w-[15%] opacity-0 transition-all duration-500 scale-90">
                        <div class="bg-gray-200 aspect-square mb-1"></div><div class="font-mono text-[8px] text-center text-red-700 font-bold uppercase">ACCOMPLICE</div>
                        <div class="w-3 h-3 rounded-full bg-red-600 absolute -top-1 left-1/2 -translate-x-1/2 shadow-sm border border-white"></div>
                    </div>
                    <div id="ev-2" class="absolute top-[71%] left-[20%] -translate-x-1/2 -translate-y-1/2 bg-white p-2 shadow-xl rotate-[-4deg] w-[15%] opacity-0 transition-all duration-500 scale-90">
                        <div class="bg-gray-200 aspect-square mb-1"></div><div class="font-mono text-[8px] text-center text-red-700 font-bold uppercase">LOCATION</div>
                        <div class="w-3 h-3 rounded-full bg-red-600 absolute -top-1 left-1/2 -translate-x-1/2 shadow-sm border border-white"></div>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                return {
                    connect: () => {
                        const targets = [ctx.root.querySelector('#ev-1'), ctx.root.querySelector('#ev-2')];
                        targets.forEach(t => { if(t) t.classList.remove('opacity-0', 'scale-90'); });
                        const p1 = ctx.root.querySelector('#string-1');
                        const p2 = ctx.root.querySelector('#string-2');
                        if(p1) { p1.style.transition = 'stroke-dashoffset 1s ease-in-out 0.5s'; p1.style.strokeDashoffset = '0'; }
                        if(p2) { p2.style.transition = 'stroke-dashoffset 1s ease-in-out 0.8s'; p2.style.strokeDashoffset = '0'; }
                    }
                };
            }`,
            "steps": [
                { "narration": "Primary suspect identified.", "actions": [] },
                { "narration": "Linking to known associates and locations.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.connect()" }] }
            ]
        },

        // All subsequent scenes are unchanged but included for completeness.
        { "html": `<div class="w-full h-full bg-[#050510] relative flex items-center justify-center overflow-hidden"><div class="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert contrast-150"></div><svg class="w-full h-full z-10" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice"><defs><filter id="glow"><feGaussianBlur stdDeviation="1.5"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><path class="cable-bg" d="M 290 160 Q 390 100 495 140" stroke="#1e293b" stroke-width="2" fill="none" /><path class="cable-active" id="c1" d="M 290 160 Q 390 100 495 140" stroke="#38bdf8" stroke-width="2" fill="none" stroke-dasharray="300" stroke-dashoffset="300" filter="url(#glow)" /><path class="cable-bg" d="M 495 140 Q 650 80 860 170" stroke="#1e293b" stroke-width="2" fill="none" /><path class="cable-active" id="c2" d="M 495 140 Q 650 80 860 170" stroke="#38bdf8" stroke-width="2" fill="none" stroke-dasharray="500" stroke-dashoffset="500" filter="url(#glow)" /><circle cx="290" cy="160" r="3" fill="#fff" /><circle cx="495" cy="140" r="3" fill="#fff" /><circle cx="860" cy="170" r="3" fill="#fff" /></svg></div>`, "script": `(ctx) => ({ transmit: () => { const c1 = ctx.root.querySelector('#c1'); const c2 = ctx.root.querySelector('#c2'); if(c1) { c1.style.transition = 'stroke-dashoffset 1.5s linear'; c1.style.strokeDashoffset = '0'; } setTimeout(() => { if(c2) { c2.style.transition = 'stroke-dashoffset 2s linear'; c2.style.strokeDashoffset = '0'; } }, 1500); } })`, "steps": [{ "narration": "Fiber optic trunks connect the major exchanges.", "actions": [] }, { "narration": "Transmitting across the Atlantic and Pacific.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.transmit()" }] }] },
        { "html": `<div class="w-full h-full bg-black relative flex items-center justify-center overflow-hidden font-mono"><div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2000')] bg-cover bg-center opacity-30"></div><div class="absolute top-8 right-8 text-right z-10"><div class="text-[10px] text-gray-500 tracking-widest uppercase">FACILITY STATUS</div><div class="text-green-500 font-bold">OPERATIONAL</div></div><div class="z-20 w-[60%] max-w-[600px] bg-black/80 backdrop-blur border border-white/10 p-8 rounded-lg shadow-2xl relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-[2px] bg-green-500/50"></div><div class="flex justify-between items-end mb-4"><div><div class="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Current Task</div><div class="text-white font-bold text-lg">ENCRYPTED_UPLOAD.tar.gz</div></div><div class="text-4xl font-light text-white" id="pct-display">0<span class="text-sm text-gray-500 ml-1">%</span></div></div><div class="w-full h-4 bg-gray-900 rounded overflow-hidden border border-white/5 relative"><div id="prog-fill" class="h-full bg-green-600 w-0 transition-all duration-[300ms] ease-out relative"></div></div><div class="mt-4 flex justify-between text-[10px] text-gray-500 font-mono"><span id="speed-disp">0 MB/s</span><span>ETA: <span id="eta-disp">--:--</span></span></div></div></div>`, "script": `(ctx) => { let interval; return { remove: () => clearInterval(interval), startUpload: () => { let pct = 0; const bar = ctx.root.querySelector('#prog-fill'); const disp = ctx.root.querySelector('#pct-display'); const speed = ctx.root.querySelector('#speed-disp'); interval = setInterval(() => { const remaining = 100 - pct; const step = Math.max(0.1, remaining * 0.1); pct += step; if(pct >= 99.9) { pct = 100; clearInterval(interval); if(speed) speed.innerText = "COMPLETE"; } if(bar) bar.style.width = pct + '%'; if(disp) disp.innerHTML = Math.floor(pct) + '<span class="text-sm text-gray-500 ml-1">%</span>'; if(speed && pct < 100) speed.innerText = (Math.random() * 50 + 800).toFixed(0) + " MB/s"; }, 100); } }; }`, "steps": [{ "narration": "Secure transfer protocols engaged.", "actions": [] }, { "narration": "Uploading assets to cold storage.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.startUpload()" }] }] },
        { "html": `<div class="w-full h-full bg-[#111] relative overflow-hidden flex items-center justify-center"><div class="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center invert opacity-40 contrast-125"></div><div class="relative w-[1000px] h-[500px]"><div id="pin-1" class="absolute top-[32%] left-[23%] flex flex-col items-center opacity-0 transition-opacity duration-300"><div class="w-2 h-2 bg-red-500 rounded-full relative z-10"></div><div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div><div class="mt-2 px-2 py-1 bg-black/80 text-red-500 border border-red-500/30 text-[9px] font-mono rounded uppercase tracking-wider backdrop-blur-sm transform translate-y-2">ORIGIN</div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border border-red-500/20 rounded-full scale-0 transition-transform duration-1000 ease-out delay-100" id="radar-1"></div></div><div id="pin-2" class="absolute top-[26%] left-[49%] flex flex-col items-center opacity-0 transition-opacity duration-300 delay-300"><div class="w-2 h-2 bg-amber-500 rounded-full relative z-10"></div><div class="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-75"></div><div class="mt-2 px-2 py-1 bg-black/80 text-amber-500 border border-amber-500/30 text-[9px] font-mono rounded uppercase tracking-wider backdrop-blur-sm transform translate-y-2">PROXY</div><div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border border-amber-500/20 rounded-full scale-0 transition-transform duration-1000 ease-out delay-500" id="radar-2"></div></div></div></div>`, "steps": [{ "narration": "Signal spikes detected.", "actions": [{ "type": "custom", "fn": "document.getElementById('pin-1').classList.remove('opacity-0'); document.getElementById('radar-1').classList.remove('scale-0');" }, { "type": "custom", "fn": "setTimeout(() => { document.getElementById('pin-2').classList.remove('opacity-0'); document.getElementById('radar-2').classList.remove('scale-0'); }, 500);" }] }] },
        { "html": `<div class="w-full h-full bg-black relative overflow-hidden font-mono"><div id="topo-map" class="w-full h-full z-0 opacity-80"></div><div class="absolute bottom-10 left-10 z-10 bg-black/90 p-4 border border-blue-500/30 rounded backdrop-blur"><h1 class="text-blue-500 font-bold tracking-widest mb-1 text-sm">GLOBAL TOPOLOGY</h1><div class="text-[10px] text-gray-400">NODES: <span class="text-white">5</span> | STATUS: <span class="text-green-500">CONNECTED</span></div></div></div>`, "script": `(ctx) => { const map = ctx.map('#topo-map', { center: [30, -40], zoom: 3, zoomControl: false, attributionControl: false }); L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map); const coords = [[40.7128, -74.0060], [51.5074, -0.1278], [-22.9068, -43.1729], [-33.9249, 18.4241], [35.6762, 139.6503]]; const icon = L.divIcon({ className: 'custom-pin', html: '<div class="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>', iconSize: [8, 8] }); coords.forEach(ll => L.marker(ll, {icon: icon}).addTo(map)); const lines = [[coords[0], coords[1]], [coords[0], coords[2]], [coords[2], coords[3]], [coords[1], coords[3]], [coords[3], coords[4]]]; const polyLines = lines.map(line => L.polyline(line, { color: '#3b82f6', weight: 1, opacity: 0, dashArray: '5, 10' }).addTo(map)); return { remove: () => map.remove(), connectAll: () => { polyLines.forEach((pl, i) => { setTimeout(() => { pl.setStyle({opacity: 0.6, weight: 2}); }, i * 300); }); map.flyTo([10, 0], 2, {duration: 3}); } }; }`, "steps": [{ "narration": "The network topology spans every continent.", "actions": [] }, { "narration": "Establishing a fully redundant global grid.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.connectAll()" }] }] },
      // 1. DNA_HELIX: Spinning 3D Particle Helix
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
                <div id="p5-dna" class="absolute inset-0 z-0"></div>
                <div class="z-10 text-center pointer-events-none">
                    <h1 class="text-white/80 font-black text-6xl italic tracking-tighter">GENETIC SEQUENCE</h1>
                    <p class="font-mono text-blue-400 text-sm tracking-[0.3em]">ANALYZING...</p>
                </div>
            </div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let angle = 0;
                    const particles = 200;
                    const radius = 150;
                    const length = 400;

                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight, p.WEBGL);
                    };

                    p.draw = () => {
                        p.clear();
                        p.orbitControl(0,0,0); // Allows mouse drag to rotate, but we auto-rotate
                        p.rotateY(angle);
                        
                        p.strokeWeight(3);
                        for(let i = 0; i < particles; i++) {
                            const y = p.map(i, 0, particles, -length, length);
                            const phase = p.map(y, -length, length, 0, p.TWO_PI * 4); // 4 full twists
                            
                            // Strand 1
                            p.stroke(59, 130, 246, 200); // Blue
                            p.point(radius * p.cos(phase), y, radius * p.sin(phase));
                            
                            // Strand 2
                            p.stroke(236, 72, 153, 200); // Pink
                            p.point(radius * p.cos(phase + p.PI), y, radius * p.sin(phase + p.PI));
                        }
                        angle += 0.005;
                    };
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-dna');
                return { remove: () => myP5.remove() };
            }`,
            "steps": [
                { "narration": "The building blocks of life are encoded in a delicate, complex structure.", "actions": [] }
            ]
        },

        // 2. PARTICLE_EXPLOSION: Big Bang Simulation
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center relative overflow-hidden">
                <div id="p5-explosion" class="absolute inset-0 z-0"></div>
                <div id="singularity-text" class="z-10 text-white font-black text-7xl italic transition-opacity duration-500">SINGULARITY</div>
            </div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let particles = [];
                    const numParticles = 300;
                    let exploded = false;

                    class Particle {
                        constructor() {
                            this.pos = p.createVector(p.width/2, p.height/2);
                            this.vel = p.createVector(0,0);
                            this.acc = p.createVector(0,0);
                            this.lifespan = 255;
                            this.color = [p.random(150,255), p.random(100,200), p.random(200,255)];
                        }
                        update() {
                            this.vel.add(this.acc);
                            this.pos.add(this.vel);
                            this.acc.mult(0);
                            if(exploded) this.lifespan -= 1.5;
                        }
                        show() {
                            p.noStroke();
                            p.fill(this.color[0], this.color[1], this.color[2], this.lifespan);
                            p.ellipse(this.pos.x, this.pos.y, 4, 4);
                        }
                    }
                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        for (let i = 0; i < numParticles; i++) particles.push(new Particle());
                    };
                    p.draw = () => {
                        p.clear();
                        for (let particle of particles) {
                            particle.update();
                            particle.show();
                        }
                    };
                    p.explode = () => {
                        exploded = true;
                        particles.forEach(pt => {
                            pt.vel = p5.Vector.random2D().mult(p.random(2, 10));
                        });
                    };
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-explosion');
                return {
                    remove: () => myP5.remove(),
                    triggerExplosion: () => {
                        myP5.explode();
                        const textEl = ctx.root.querySelector('#singularity-text');
                        if(textEl) textEl.style.opacity = '0';
                    }
                };
            }`,
            "steps": [
                { "narration": "All matter, all energy, contained within a single point.", "actions": [] },
                { "narration": "Until the moment of expansion.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.triggerExplosion()" }] }
            ]
        },

        // 3. MATRIX_RAIN: Classic Code Rain
        {
            "html": `<div class="w-full h-full bg-black"><div id="p5-matrix"></div></div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let streams = [];
                    const symbolSize = 14;
                    class Symbol {
                        constructor(x, y, speed, first) {
                            this.x = x; this.y = y; this.value;
                            this.speed = speed; this.first = first;
                            this.switchInterval = p.round(p.random(2, 20));
                        }
                        setToRandomSymbol() {
                            if (p.frameCount % this.switchInterval == 0) this.value = String.fromCharCode(0x30A0 + p.round(p.random(0, 96)));
                        }
                        rain() { this.y = (this.y >= p.height) ? 0 : this.y + this.speed; }
                    }
                    class Stream {
                        constructor() {
                            this.symbols = [];
                            this.totalSymbols = p.round(p.random(5, 30));
                            this.speed = p.random(2, 7);
                        }
                        generateSymbols(x, y) {
                            let first = p.round(p.random(0, 4)) == 1;
                            for (let i=0; i<=this.totalSymbols; i++) {
                                let symbol = new Symbol(x, y, this.speed, first);
                                symbol.setToRandomSymbol();
                                this.symbols.push(symbol);
                                y -= symbolSize;
                                first = false;
                            }
                        }
                        render() {
                            this.symbols.forEach(symbol => {
                                if (symbol.first) p.fill(180, 255, 180); else p.fill(0, 255, 70);
                                p.text(symbol.value, symbol.x, symbol.y);
                                symbol.rain(); symbol.setToRandomSymbol();
                            });
                        }
                    }
                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        let x = 0;
                        for (let i = 0; i <= p.width / symbolSize; i++) {
                            let stream = new Stream();
                            stream.generateSymbols(x, p.random(-1000, 0));
                            streams.push(stream);
                            x += symbolSize;
                        }
                        p.textFont('monospace'); p.textSize(symbolSize);
                    };
                    p.draw = () => {
                        p.background(0, 150);
                        streams.forEach(stream => stream.render());
                    };
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-matrix');
                return { remove: () => myP5.remove() };
            }`,
            "steps": [
                { "narration": "The digital world is a constant stream of data, flowing endlessly.", "actions": [] }
            ]
        },

        // 4. LIQUID_WAVEFORM: Abstract Sine Wave Visualization
        {
            "html": `
            <div class="w-full h-full bg-[#020617] flex items-center justify-center relative overflow-hidden">
                <div id="p5-wave" class="absolute inset-0 z-0"></div>
                <div class="z-10 font-mono text-center">
                    <div class="text-xs text-cyan-400 tracking-widest">WAVEFORM ANALYSIS</div>
                    <div id="amp-readout" class="text-5xl text-white font-black">1.00</div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let time = 0;
                    let amplitude = 1.0;
                    let targetAmplitude = 1.0;
                    const ampReadout = ctx.root.querySelector('#amp-readout');

                    p.setup = () => p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                    p.draw = () => {
                        p.clear();
                        p.stroke(56, 189, 248); p.strokeWeight(3); p.noFill();
                        
                        amplitude = p.lerp(amplitude, targetAmplitude, 0.1); // Smooth transition
                        if(p.abs(amplitude - targetAmplitude) < 0.01) targetAmplitude = 1.0; // Return to normal
                        
                        if(ampReadout) ampReadout.innerText = amplitude.toFixed(2);

                        p.beginShape();
                        for (let x = 0; x < p.width; x+=5) {
                            const angle = time + p.map(x, 0, p.width, 0, p.TWO_PI * 2);
                            const noiseFactor = p.noise(x * 0.01, time);
                            const y = p.height/2 + p.sin(angle) * 50 * amplitude * (noiseFactor * 0.5 + 0.5);
                            p.vertex(x, y);
                        }
                        p.endShape();
                        time += 0.03;
                    };
                    p.modulate = () => targetAmplitude = 3.0;
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-wave');
                return {
                    remove: () => myP5.remove(),
                    triggerModulation: () => myP5.modulate()
                };
            }`,
            "steps": [
                { "narration": "Monitoring baseline frequencies for any deviation.", "actions": [] },
                { "narration": "Anomaly detected. A massive energy spike.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.triggerModulation()" }] }
            ]
        },

        // 5. BLACK_HOLE: Particle Accretion Disk
        {
            "html": `<div class="w-full h-full bg-black"><div id="p5-blackhole"></div></div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let particles = [];
                    const numParticles = 500;
                    class Particle {
                        constructor() {
                            const r = p.random(100, 300); const a = p.random(p.TWO_PI);
                            this.pos = p.createVector(p.width/2 + r * p.cos(a), p.height/2 + r * p.sin(a));
                            this.vel = p.createVector(0,0);
                        }
                        update() {
                            let dir = p.createVector(p.width/2 - this.pos.x, p.height/2 - this.pos.y);
                            dir.setMag(0.1); // Gravity strength
                            this.vel.add(dir); this.vel.limit(5); this.pos.add(this.vel);
                            
                            // Reset if consumed
                            if(p.dist(this.pos.x, this.pos.y, p.width/2, p.height/2) < 50) this.reset();
                        }
                        reset() {
                            const r = p.random(p.width/2, p.width/2 + 100); const a = p.random(p.TWO_PI);
                            this.pos = p.createVector(p.width/2 + r * p.cos(a), p.height/2 + r * p.sin(a));
                            let tangent = p.createVector(this.pos.y - p.height/2, -(this.pos.x - p.width/2));
                            tangent.setMag(p.random(1,3)); this.vel = tangent;
                        }
                        show() {
                            const d = p.dist(this.pos.x, this.pos.y, p.width/2, p.height/2);
                            const heat = p.map(d, 50, 300, 255, 100);
                            p.stroke(255, heat, 0); p.strokeWeight(2); p.point(this.pos.x, this.pos.y);
                        }
                    }
                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        for(let i=0; i<numParticles; i++) particles.push(new Particle());
                        particles.forEach(pt => pt.reset());
                    };
                    p.draw = () => {
                        p.background(0, 20); // Trails
                        p.fill(0); p.noStroke(); p.circle(p.width/2, p.height/2, 100);
                        particles.forEach(pt => { pt.update(); pt.show(); });
                    };
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-blackhole');
                return { remove: () => myP5.remove() };
            }`,
            "steps": [
                { "narration": "At the center of gravity, even light cannot escape.", "actions": [] }
            ]
        },

        // 6. SWARM_AI: Flocking Boids
        {
            "html": `
            <div class="w-full h-full bg-[#0a0a0a] relative overflow-hidden">
                <div id="p5-swarm"></div>
            </div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let flock = [];
                    let target;
                    class Boid {
                        constructor() {
                            this.pos = p.createVector(p.random(p.width), p.random(p.height));
                            this.vel = p5.Vector.random2D(); this.vel.setMag(p.random(2, 4));
                            this.acc = p.createVector(); this.maxForce = 0.2; this.maxSpeed = 4;
                        }
                        edges() { if(this.pos.x > p.width) this.pos.x=0; else if (this.pos.x < 0) this.pos.x=p.width; if(this.pos.y > p.height) this.pos.y=0; else if(this.pos.y < 0) this.pos.y=p.height;}
                        flock(boids) {
                            let alignment = p.createVector(); let cohesion = p.createVector(); let separation = p.createVector();
                            let total = 0;
                            for (let other of boids) {
                                let d = p.dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                                if (other != this && d < 50) {
                                    alignment.add(other.vel); cohesion.add(other.pos);
                                    let diff = p5.Vector.sub(this.pos, other.pos); diff.div(d*d); separation.add(diff);
                                    total++;
                                }
                            }
                            if(total > 0) {
                                alignment.div(total).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
                                cohesion.div(total).sub(this.pos).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
                                separation.div(total).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce);
                            }
                            this.acc.add(alignment); this.acc.add(cohesion); this.acc.add(separation.mult(1.5));
                        }
                        update() { this.pos.add(this.vel); this.vel.add(this.acc); this.vel.limit(this.maxSpeed); this.acc.mult(0); }
                        show() { p.stroke(255, 150); p.strokeWeight(2); p.point(this.pos.x, this.pos.y); }
                        seek(target) { if(target){ let force = p5.Vector.sub(target, this.pos).setMag(this.maxSpeed).sub(this.vel).limit(this.maxForce*2); this.acc.add(force); }}
                    }
                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        for(let i=0; i<150; i++) flock.push(new Boid());
                    };
                    p.draw = () => {
                        p.clear();
                        for (let boid of flock) { boid.edges(); boid.flock(flock); boid.seek(target); boid.update(); boid.show(); }
                    };
                    p.setTarget = (x,y) => target = p.createVector(x,y);
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-swarm');
                return {
                    remove: () => myP5.remove(),
                    directSwarm: () => myP5.setTarget(ctx.root.clientWidth / 2, ctx.root.clientHeight / 2)
                };
            }`,
            "steps": [
                { "narration": "Individually, they are simple. Together, they exhibit emergent intelligence.", "actions": [] },
                { "narration": "A single directive is all it takes to unify their behavior.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.directSwarm()" }] }
            ]
        },

        // 7. CELL_MITOSIS: Simplified Blob Division
        {
            "html": `
            <div class="w-full h-full bg-[#111827] flex items-center justify-center relative">
                <div id="p5-mitosis"></div>
            </div>`,
            "script": `(ctx) => {
                const sketch = p => {
                    let cell1, cell2;
                    let splitting = false;
                    class Cell {
                        constructor(x, y) {
                            this.pos = p.createVector(x, y); this.target = p.createVector(x, y); this.vel = p.createVector();
                            this.radius = 80; this.vertices = [];
                            for(let i=0; i<30; i++) this.vertices.push(p.random(0.9, 1.1));
                        }
                        update() {
                            let force = p5.Vector.sub(this.target, this.pos);
                            force.mult(0.1); this.vel.add(force); this.vel.mult(0.9); this.pos.add(this.vel);
                        }
                        show() {
                            p.fill(236, 72, 153, 150); p.noStroke(); p.beginShape();
                            for (let i = 0; i < this.vertices.length; i++) {
                                let angle = p.map(i, 0, this.vertices.length, 0, p.TWO_PI);
                                let r = this.radius * this.vertices[i] * (1 + 0.1 * p.noise(i, p.frameCount * 0.01));
                                p.vertex(this.pos.x + r * p.cos(angle), this.pos.y + r * p.sin(angle));
                            }
                            p.endShape(p.CLOSE);
                        }
                    }
                    p.setup = () => {
                        p.createCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                        cell1 = new Cell(p.width / 2, p.height / 2);
                        cell2 = new Cell(p.width / 2, p.height / 2);
                    };
                    p.draw = () => {
                        p.clear();
                        if(splitting) {
                            cell1.target.x = p.width/2 - 100; cell2.target.x = p.width/2 + 100;
                        }
                        cell1.update(); cell2.update(); cell1.show(); cell2.show();
                    };
                    p.startSplit = () => splitting = true;
                    p.windowResized = () => p.resizeCanvas(ctx.root.clientWidth, ctx.root.clientHeight);
                };
                const myP5 = ctx.p5(sketch, '#p5-mitosis');
                return {
                    remove: () => myP5.remove(),
                    triggerSplit: () => myP5.startSplit()
                };
            }`,
            "steps": [
                { "narration": "The organism exists in a stable state.", "actions": [] },
                { "narration": "Until the moment it's instructed to divide and multiply.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.triggerSplit()" }] }
            ]
        },
      // 1. NEWSPAPER_SPIN: Headline Reveal
        {
            "html": `
            <div class="w-full h-full bg-[#333] flex items-center justify-center p-8 overflow-hidden" style="background-image: radial-gradient(#444 1px, transparent 1px); background-size: 20px 20px;">
                <div class="film-grain"></div>
                <div id="newspaper" class="w-full max-w-4xl bg-[#fdfaf1] p-10 shadow-2xl text-black scale-0 rotate-[-180deg] transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    <div class="text-center border-b-4 border-black pb-4 mb-6">
                        <h1 class="text-7xl font-['Playfair+Display'] font-bold tracking-tight">The Daily Chronicle</h1>
                        <p class="text-xs font-mono uppercase tracking-widest mt-2">ESTABLISHED 1888 - MONDAY, FEBRUARY 7, 2026</p>
                    </div>
                    <div class="text-center">
                        <h2 class="text-5xl font-black uppercase tracking-wider">
                            <span class="relative inline-block px-2">
                                <span id="hl-news" class="absolute inset-0 bg-yellow-300 mix-blend-multiply w-0 transition-all duration-700 ease-in-out delay-1000"></span>
                                <span class="relative z-10">MARKETS IN TURMOIL</span>
                            </span>
                        </h2>
                        <p class="mt-4 text-gray-600 max-w-lg mx-auto">A sudden and unexpected system-wide glitch sent shockwaves through the global financial network today, leading to widespread panic and automated trading halts.</p>
                    </div>
                </div>
            </div>`,
            "steps": [
                {
                    "narration": "The story broke in the early morning editions.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('newspaper').classList.remove('scale-0', 'rotate-[-180deg]')" }
                    ]
                },
                {
                    "narration": "A single headline that captured the world's attention.",
                    "actions": [
                        { "type": "custom", "fn": "document.getElementById('hl-news').style.width = '100%'" }
                    ]
                }
            ]
        },

        // 2. CHAT_CONV: iMessage/WhatsApp Style
        {
            "html": `
            <div class="w-full h-full bg-[#e5ddd5] flex items-center justify-center p-8">
                <div class="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg flex flex-col h-[70vh]">
                    <div class="bg-gray-100 p-3 rounded-t-3xl border-b flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div><p class="font-bold">System Admin</p><p class="text-xs text-green-600">online</p></div>
                    </div>
                    <div id="chat-window" class="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
                        <!-- Messages will be added here -->
                    </div>
                    <div class="p-3 bg-gray-100 rounded-b-3xl border-t flex items-center gap-3">
                        <div class="flex-1 bg-white rounded-full p-3 text-sm text-gray-500">Message...</div>
                        <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"><i class="bi bi-send-fill"></i></div>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const chatWindow = ctx.root.querySelector('#chat-window');
                const addMessage = (text, sender = 'me') => {
                    const bubble = document.createElement('div');
                    bubble.innerText = text;
                    bubble.className = sender === 'me' ?
                        'self-end bg-blue-500 text-white rounded-2xl rounded-br-none py-2 px-4 max-w-[80%] opacity-0 translate-y-4 transition-all' :
                        'self-start bg-gray-200 text-black rounded-2xl rounded-bl-none py-2 px-4 max-w-[80%] opacity-0 translate-y-4 transition-all';
                    chatWindow.appendChild(bubble);
                    setTimeout(() => bubble.classList.remove('opacity-0', 'translate-y-4'), 100);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                };

                return {
                    msg1: () => addMessage("Are the systems stable?", 'me'),
                    msg2: () => addMessage("Negative. We have a cascading failure.", 'other'),
                    msg3: () => addMessage("Initiate lockdown protocols. Now.", 'me'),
                }
            }`,
            "steps": [
                { "narration": "The first message was a simple status check.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.msg1()" }] },
                { "narration": "The reply confirmed the worst fears.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.msg2()" }] },
                { "narration": "The command was given without hesitation.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.msg3()" }] }
            ]
        },

        // 3. CODE_TERMINAL: Hacking Sequence
        {
            "html": `
            <div class="w-full h-full bg-black flex items-center justify-center font-mono text-green-500 text-sm p-4">
                <div class="w-full h-full bg-[#0d1117] rounded-lg shadow-2xl border border-white/10 p-4">
                    <div class="flex items-center gap-2 mb-4">
                        <div class="w-3 h-3 rounded-full bg-red-500"></div><div class="w-3 h-3 rounded-full bg-yellow-500"></div><div class="w-3 h-3 rounded-full bg-green-500"></div>
                        <div class="ml-auto text-gray-500 text-xs">/bin/bash</div>
                    </div>
                    <div id="terminal-content">
                        <span class="text-cyan-400">root@localhost</span>:<span class="text-yellow-400">~</span>$ <span id="command-line"></span>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const type = (el, text, callback, speed = 50) => {
                    let i = 0;
                    const interval = setInterval(() => {
                        if (el) el.innerHTML += text.charAt(i);
                        i++;
                        if (i > text.length) { clearInterval(interval); if(callback) callback(); }
                    }, speed);
                };
                const addLine = (text) => {
                    const content = ctx.root.querySelector('#terminal-content');
                    if(content) content.innerHTML += \`<br>\${text}\`;
                };

                return {
                    runSequence: () => {
                        const cmdEl = ctx.root.querySelector('#command-line');
                        type(cmdEl, "connect --host 192.168.1.1", () => {
                            addLine("CONNECTING...");
                            setTimeout(() => {
                                addLine("<span class='text-green-400'>[SUCCESS]</span> Secure shell established.");
                                addLine("<span class='text-yellow-400'>[WARNING]</span> Firewall active. Attempting bypass...");
                            }, 1000);
                            setTimeout(() => {
                                addLine("<span class='text-green-400'>[SUCCESS]</span> Root access granted.");
                            }, 2500);
                        });
                    }
                }
            }`,
            "steps": [
                { "narration": "Accessing the secure server required bypassing the main firewall.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.runSequence()" }] }
            ]
        },

        // 4. BROWSER_SEARCH: Fake Google Search
        {
            "html": `
            <div class="w-full h-full bg-[#f1f3f4] flex flex-col items-center justify-center p-8">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" class="w-48 mb-8">
                <div class="w-full max-w-2xl bg-white rounded-full shadow flex items-center p-3 mb-8 relative">
                    <i class="bi bi-search text-gray-400 mx-3"></i>
                    <div id="search-text" class="text-black text-lg"></div>
                    <i id="cursor" class="absolute top-1/2 -translate-y-1/2 left-10 text-xl bi bi-cursor-fill text-blue-600 transition-all duration-300 ease-out"></i>
                </div>
                <div id="results" class="w-full max-w-2xl opacity-0 translate-y-4 transition-all duration-500">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <p class="text-xs text-gray-500">www.example-news.com</p>
                        <h3 class="text-blue-800 text-xl hover:underline cursor-pointer">Global Markets Plunge After Unexplained...</h3>
                        <p class="text-gray-700 mt-1">Details are still emerging, but sources confirm a major technical event has disrupted financial institutions worldwide.</p>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                return {
                    performSearch: () => {
                        const searchTextEl = ctx.root.querySelector('#search-text');
                        const cursor = ctx.root.querySelector('#cursor');
                        const results = ctx.root.querySelector('#results');
                        const query = "Why is AI dangerous?";
                        let i = 0;
                        const interval = setInterval(() => {
                            if (searchTextEl) searchTextEl.innerText += query[i];
                            if (cursor) cursor.style.left = (searchTextEl.offsetWidth + 50) + 'px';
                            i++;
                            if (i >= query.length) {
                                clearInterval(interval);
                                setTimeout(() => { if(results) results.classList.remove('opacity-0', 'translate-y-4'); }, 500);
                            }
                        }, 100);
                    }
                }
            }`,
            "steps": [
                { "narration": "It started with a simple question.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.performSearch()" }] }
            ]
        },

        // 5. SOCIAL_POST: Twitter/X Style Card
        {
            "html": `
            <div class="w-full h-full bg-[#15202b] flex items-center justify-center p-8">
                <div class="bg-[#192734] w-full max-w-lg rounded-2xl border border-[#38444d] p-4 text-white">
                    <div class="flex items-start gap-3">
                        <div class="w-12 h-12 rounded-full bg-gray-500"></div>
                        <div>
                            <div class="flex items-center gap-2"><p class="font-bold">Global News</p><p class="text-gray-500">@GlobalNews · 1h</p></div>
                            <p class="mt-1">BREAKING: Unprecedented volatility hits global markets. Sources are citing a 'technical anomaly' of unknown origin. Trading has been halted on multiple exchanges.</p>
                            <div class="mt-4 flex justify-between text-gray-500 max-w-sm">
                                <div class="flex items-center gap-2"><i class="bi bi-chat"></i> 1.2K</div>
                                <div class="flex items-center gap-2"><i class="bi bi-arrow-repeat"></i> 8.9K</div>
                                <div class="flex items-center gap-2 text-red-500"><i id="like-icon" class="bi bi-heart transition-transform"></i> <span id="like-count">0</span></div>
                                <div class="flex items-center gap-2"><i class="bi bi-upload"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                const animateValue = (el, start, end, duration) => {
                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        if(el) el.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
                        if (progress < 1) window.requestAnimationFrame(step);
                    };
                    window.requestAnimationFrame(step);
                };
                return {
                    goViral: () => {
                        const count = ctx.root.querySelector('#like-count');
                        const icon = ctx.root.querySelector('#like-icon');
                        if(count) animateValue(count, 0, 10452, 1500);
                        if(icon) { icon.classList.add('bi-heart-fill'); icon.classList.remove('bi-heart'); icon.classList.add('scale-125'); }
                    }
                }
            }`,
            "steps": [
                { "narration": "The news spread across social media like wildfire.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.goViral()" }] }
            ]
        },

        // 6. NOTIFICATIONS: Glassmorphism Mobile UI
        {
            "html": `
            <div class="w-full h-full relative overflow-hidden bg-black">
                <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554141542-031f73b61429?q=80&w=2680')] bg-cover blur-md scale-110"></div>
                <div class="absolute inset-0 bg-black/30"></div>
                <div id="notif-container" class="relative z-10 w-full max-w-sm mx-auto pt-20 flex flex-col gap-3">
                    <!-- Notifications appear here -->
                </div>
            </div>`,
            "script": `(ctx) => {
                const container = ctx.root.querySelector('#notif-container');
                const addNotif = (icon, title, text, color) => {
                    const notif = document.createElement('div');
                    notif.className = \`bg-white/10 backdrop-blur-xl border border-white/20 p-3 rounded-2xl flex items-start gap-3 -translate-y-20 opacity-0 transition-all duration-500 ease-out\`;
                    notif.innerHTML = \`
                        <div class="w-8 h-8 rounded-full bg-\${color}-500/20 text-\${color}-400 flex items-center justify-center text-lg"><i class="bi \${icon}"></i></div>
                        <div>
                            <p class="font-bold text-white text-sm">\${title}</p>
                            <p class="text-gray-300 text-xs">\${text}</p>
                        </div>
                    \`;
                    container.prepend(notif);
                    setTimeout(() => notif.classList.remove('-translate-y-20', 'opacity-0'), 100);
                };
                return {
                    notif1: () => addNotif('bi-wifi-off', 'NETWORK OFFLINE', 'Multiple nodes are unresponsive.', 'yellow'),
                    notif2: () => addNotif('bi-shield-exclamation', 'SECURITY ALERT', 'Unusual activity detected in core systems.', 'red'),
                    notif3: () => addNotif('bi-power', 'SYSTEM HALT', 'Emergency shutdown initiated.', 'blue'),
                }
            }`,
            "steps": [
                { "narration": "First, the network alerts started.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.notif1()" }] },
                { "narration": "Then came the security warnings.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.notif2()" }] },
                { "narration": "Finally, the system began to shut itself down.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.notif3()" }] }
            ]
        },

        // 7. VIDEO_PLAYER: Fake YouTube Interface
        {
            "html": `
            <div class="w-full h-full bg-[#0f0f0f] flex items-center justify-center p-8">
                <div class="w-full max-w-5xl">
                    <div class="aspect-video bg-black relative flex items-center justify-center">
                        <div class="film-grain !opacity-50"></div>
                        <p class="text-white/20 font-mono text-xl">SIGNAL LOST...</p>
                        <div id="play-button" class="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
                            <i class="bi bi-play-circle-fill text-white text-7xl opacity-80 hover:opacity-100 transition"></i>
                        </div>
                        <div id="progress-bar" class="absolute bottom-0 left-0 h-1 bg-red-600 w-0"></div>
                    </div>
                    <div class="mt-4 text-white">
                        <h1 class="text-2xl font-bold">LIVE: Global Market Feed</h1>
                        <p class="text-gray-400 text-sm">1.2M watching</p>
                    </div>
                </div>
            </div>`,
            "script": `(ctx) => {
                return {
                    playVideo: () => {
                        const btn = ctx.root.querySelector('#play-button');
                        const bar = ctx.root.querySelector('#progress-bar');
                        if (btn) btn.style.display = 'none';
                        if (bar) {
                            bar.style.transition = 'width 30s linear'; // Simulate long video
                            bar.style.width = '100%';
                        }
                    }
                }
            }`,
            "steps": [
                { "narration": "The live feeds were the first to go dark.", "actions": [] },
                { "narration": "Leaving only the last recorded moments before the blackout.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.playVideo()" }] }
            ]
        },
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
