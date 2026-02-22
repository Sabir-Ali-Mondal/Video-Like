const DEMO_DATA = {
    "meta": {
        "title": "Geo & Network (Batch 3 Fixed)",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763065409/study-110111_at7lye.mp3",
        "lang": "en-US"
    },
    "scenes": [
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
        { "html": `<div class="w-full h-full bg-black relative overflow-hidden font-mono"><div id="topo-map" class="w-full h-full z-0 opacity-80"></div><div class="absolute bottom-10 left-10 z-10 bg-black/90 p-4 border border-blue-500/30 rounded backdrop-blur"><h1 class="text-blue-500 font-bold tracking-widest mb-1 text-sm">GLOBAL TOPOLOGY</h1><div class="text-[10px] text-gray-400">NODES: <span class="text-white">5</span> | STATUS: <span class="text-green-500">CONNECTED</span></div></div></div>`, "script": `(ctx) => { const map = ctx.map('#topo-map', { center: [30, -40], zoom: 3, zoomControl: false, attributionControl: false }); L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map); const coords = [[40.7128, -74.0060], [51.5074, -0.1278], [-22.9068, -43.1729], [-33.9249, 18.4241], [35.6762, 139.6503]]; const icon = L.divIcon({ className: 'custom-pin', html: '<div class="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>', iconSize: [8, 8] }); coords.forEach(ll => L.marker(ll, {icon: icon}).addTo(map)); const lines = [[coords[0], coords[1]], [coords[0], coords[2]], [coords[2], coords[3]], [coords[1], coords[3]], [coords[3], coords[4]]]; const polyLines = lines.map(line => L.polyline(line, { color: '#3b82f6', weight: 1, opacity: 0, dashArray: '5, 10' }).addTo(map)); return { remove: () => map.remove(), connectAll: () => { polyLines.forEach((pl, i) => { setTimeout(() => { pl.setStyle({opacity: 0.6, weight: 2}); }, i * 300); }); map.flyTo([10, 0], 2, {duration: 3}); } }; }`, "steps": [{ "narration": "The network topology spans every continent.", "actions": [] }, { "narration": "Establishing a fully redundant global grid.", "actions": [{ "type": "custom", "fn": "Engine.state.activeScript.connectAll()" }] }] }
    ]
};
