const DEMO_DATA = {
    "meta": {
        "title": "Advanced Data Viz (Patched)",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763064765/study-music-181044_jbuwpq.mp3",
        "lang": "en-US"
    },
    "scenes": [
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
        }
    ]
};
