const DEMO_DATA = {
    "meta": {
        "title": "UI & Simulation Batch",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763065409/study-110111_at7lye.mp3",
        "lang": "en-US"
    },
    "scenes": [
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
        }
    ]
};
