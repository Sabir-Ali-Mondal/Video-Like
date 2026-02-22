const DEMO_DATA = {
    "meta": {
        "title": "Abstract & Generative Science Batch (p5.js)",
        "audio": "https://res.cloudinary.com/dmttn34te/video/upload/v1763064765/study-music-181044_jbuwpq.mp3",
        "lang": "en-US"
    },
    "scenes": [
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
        }
    ]
};
