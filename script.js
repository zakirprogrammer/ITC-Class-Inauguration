 /* ============================================
           AMBIENT PARTICLE SYSTEM
           ============================================ */
        const particleCanvas = document.getElementById('particle-canvas');
        const particleCtx = particleCanvas.getContext('2d');
        
        let particles = [];
        const particleCount = 60;
        
        function resizeParticleCanvas() {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * particleCanvas.width;
                this.y = Math.random() * particleCanvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = this.getRandomColor();
            }
            
            getRandomColor() {
                const colors = [
                    'rgba(212, 175, 55,',   // Gold
                    'rgba(244, 228, 188,',  // Gold Light
                    'rgba(27, 94, 32,',     // Green
                    'rgba(255, 255, 255,'   // White
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Wrap around edges
                if (this.x < 0) this.x = particleCanvas.width;
                if (this.x > particleCanvas.width) this.x = 0;
                if (this.y < 0) this.y = particleCanvas.height;
                if (this.y > particleCanvas.height) this.y = 0;
            }
            
            draw() {
                particleCtx.beginPath();
                particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                particleCtx.fillStyle = this.color + this.opacity + ')';
                particleCtx.fill();
            }
        }
        
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        
        function animateParticles() {
            particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Draw connections between nearby particles
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        particleCtx.beginPath();
                        particleCtx.moveTo(p1.x, p1.y);
                        particleCtx.lineTo(p2.x, p2.y);
                        particleCtx.strokeStyle = `rgba(212, 175, 55, ${0.1 * (1 - distance / 100)})`;
                        particleCtx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        resizeParticleCanvas();
        initParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            resizeParticleCanvas();
            initParticles();
        });

        /* ============================================
           CELEBRATION ANIMATION SYSTEM
           ============================================ */
        const celebrationCanvas = document.getElementById('celebration-canvas');
        const celebrationCtx = celebrationCanvas.getContext('2d');
        
        let celebrationItems = [];
        let isCelebrating = false;
        
        function resizeCelebrationCanvas() {
            celebrationCanvas.width = window.innerWidth;
            celebrationCanvas.height = window.innerHeight;
        }
        
        // Ribbon Class
        class Ribbon {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 25;
                this.vy = (Math.random() - 0.5) * 25;
                this.gravity = 0.3;
                this.friction = 0.98;
                this.size = Math.random() * 8 + 4;
                this.color = this.getRandomColor();
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.3;
                this.life = 1;
                this.decay = Math.random() * 0.008 + 0.005;
            }
            
            getRandomColor() {
                const colors = ['#6ca2f3', '#8906f3', '#81094f', '#2905ad', '#276dc9', '#FFFFFF'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                this.life -= this.decay;
            }
            
            draw() {
                celebrationCtx.save();
                celebrationCtx.translate(this.x, this.y);
                celebrationCtx.rotate(this.rotation);
                celebrationCtx.globalAlpha = this.life;
                celebrationCtx.fillStyle = this.color;
                celebrationCtx.fillRect(-this.size / 2, -this.size * 2, this.size, this.size * 4);
                celebrationCtx.restore();
            }
        }
        
        // Balloon Class
        class Balloon {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 3;
                this.vy = -Math.random() * 8 - 5;
                this.size = Math.random() * 20 + 15;
                this.color = this.getRandomColor();
                this.wobble = Math.random() * Math.PI * 2;
                this.wobbleSpeed = 0.05;
                this.life = 1;
                this.decay = 0.003;
            }
            
            getRandomColor() {
                const colors = ['#be2565', '#460cb3', '#e87cf1', '#1395e0', '#F4E4BC'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.wobble += this.wobbleSpeed;
                this.x += this.vx + Math.sin(this.wobble) * 2;
                this.y += this.vy;
                this.life -= this.decay;
            }
            
            draw() {
                celebrationCtx.save();
                celebrationCtx.globalAlpha = this.life;
                
                // Balloon body
                celebrationCtx.beginPath();
                celebrationCtx.ellipse(this.x, this.y, this.size, this.size * 1.2, 0, 0, Math.PI * 2);
                celebrationCtx.fillStyle = this.color;
                celebrationCtx.fill();
                
                // Highlight
                celebrationCtx.beginPath();
                celebrationCtx.ellipse(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, this.size * 0.3, -0.5, 0, Math.PI * 2);
                celebrationCtx.fillStyle = 'rgba(255, 255, 255, 0.4)';
                celebrationCtx.fill();
                
                // String
                celebrationCtx.beginPath();
                celebrationCtx.moveTo(this.x, this.y + this.size * 1.2);
                celebrationCtx.quadraticCurveTo(
                    this.x + Math.sin(this.wobble * 2) * 10, 
                    this.y + this.size * 1.2 + 30, 
                    this.x, 
                    this.y + this.size * 1.2 + 60
                );
                celebrationCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                celebrationCtx.lineWidth = 1;
                celebrationCtx.stroke();
                
                celebrationCtx.restore();
            }
        }
        
        // Petal Class
        class Petal {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 4;
                this.vy = Math.random() * 3 + 2;
                this.size = Math.random() * 8 + 5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.1;
                this.sway = Math.random() * Math.PI * 2;
                this.swaySpeed = 0.03;
                this.color = this.getRandomColor();
                this.life = 1;
                this.decay = 0.004;
            }
            
            getRandomColor() {
                const colors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#F4E4BC', '#FFD700', '#FFFFFF'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.sway += this.swaySpeed;
                this.x += this.vx + Math.sin(this.sway) * 2;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                this.life -= this.decay;
            }
            
            draw() {
                celebrationCtx.save();
                celebrationCtx.translate(this.x, this.y);
                celebrationCtx.rotate(this.rotation);
                celebrationCtx.globalAlpha = this.life;
                celebrationCtx.fillStyle = this.color;
                
                // Draw petal shape
                celebrationCtx.beginPath();
                celebrationCtx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                celebrationCtx.fill();
                
                celebrationCtx.restore();
            }
        }
        
        // Confetti Class
        class Confetti {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 20;
                this.vy = (Math.random() - 0.5) * 20;
                this.gravity = 0.4;
                this.friction = 0.96;
                this.size = Math.random() * 6 + 3;
                this.color = this.getRandomColor();
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.4;
                this.life = 1;
                this.decay = Math.random() * 0.01 + 0.005;
            }
            
            getRandomColor() {
                const colors = ['#D4AF37', '#F4E4BC', '#1B5E20', '#FFD700', '#C9A227', '#FFFFFF', '#FFB6C1'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.vx *= this.friction;
                this.vy *= this.friction;
                this.vy += this.gravity;
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotationSpeed;
                this.life -= this.decay;
            }
            
            draw() {
                celebrationCtx.save();
                celebrationCtx.translate(this.x, this.y);
                celebrationCtx.rotate(this.rotation);
                celebrationCtx.globalAlpha = this.life;
                celebrationCtx.fillStyle = this.color;
                celebrationCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                celebrationCtx.restore();
            }
        }
        
        function startCelebration() {
            const centerX = celebrationCanvas.width / 2;
            const centerY = celebrationCanvas.height / 2;
            
            // Create ribbons
            for (let i = 0; i < 200; i++) {
                celebrationItems.push(new Ribbon(centerX, centerY));
            }
            
            // Create balloons
            for (let i = 0; i < 150; i++) {
                setTimeout(() => {
                    celebrationItems.push(new Balloon(
                        centerX + (Math.random() - 0.5) * 200,
                        centerY + (Math.random() - 0.5) * 100
                    ));
                }, i * 50);
            }
            
            // Create petals
            for (let i = 0; i < 2000; i++) {
                setTimeout(() => {
                    celebrationItems.push(new Petal(
                        Math.random() * celebrationCanvas.width,
                        -20
                    ));
                }, i * 80);
            }
            
            // Create confetti
            for (let i = 0; i < 150; i++) {
                celebrationItems.push(new Confetti(centerX, centerY));
            }
            
            isCelebrating = true;
        }
        
        function animateCelebration() {
            if (!isCelebrating) return;
            
            celebrationCtx.clearRect(0, 0, celebrationCanvas.width, celebrationCanvas.height);
            
            celebrationItems = celebrationItems.filter(item => {
                item.update();
                item.draw();
                return item.life > 0 && item.y < celebrationCanvas.height + 100;
            });
            
            if (celebrationItems.length > 0) {
                requestAnimationFrame(animateCelebration);
            } else {
                isCelebrating = false;
            }
        }
        
        resizeCelebrationCanvas();
        window.addEventListener('resize', resizeCelebrationCanvas);

        /* ============================================
           SOUND EFFECT
           ============================================ */
        function playInaugurationSound() {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                
                // Create oscillator for a celebratory chord
                const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C major chord
                const gainNode = audioContext.createGain();
                gainNode.connect(audioContext.destination);
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                
                frequencies.forEach((freq, i) => {
                    const oscillator = audioContext.createOscillator();
                    oscillator.frequency.value = freq;
                    oscillator.type = i === 0 ? 'sine' : 'triangle';
                    oscillator.connect(gainNode);
                    oscillator.start(audioContext.currentTime + i * 0.05);
                    oscillator.stop(audioContext.currentTime + 2);
                });
                
                // Add a sparkle sound
                const sparkleOsc = audioContext.createOscillator();
                const sparkleGain = audioContext.createGain();
                sparkleOsc.frequency.setValueAtTime(2000, audioContext.currentTime);
                sparkleOsc.frequency.exponentialRampToValueAtTime(4000, audioContext.currentTime + 0.5);
                sparkleGain.gain.setValueAtTime(0.1, audioContext.currentTime);
                sparkleGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                sparkleOsc.connect(sparkleGain);
                sparkleGain.connect(audioContext.destination);
                sparkleOsc.start(audioContext.currentTime);
                sparkleOsc.stop(audioContext.currentTime + 0.5);
            } catch (e) {
                console.log('Audio not supported or blocked');
            }
        }

        /* ============================================
           INAUGURATE BUTTON HANDLER
           ============================================ */
        const inaugurateBtn = document.getElementById('inaugurateBtn');
        const mainContainer = document.getElementById('mainContainer');
        const videoSection = document.getElementById('videoSection');
        const fathiaVideo = document.getElementById('fathiaVideo');
        
        inaugurateBtn.addEventListener('click', function() {
            // Disable button
            this.disabled = true;
            this.textContent = 'Inaugurating...';
            
            // Play sound effect
            playInaugurationSound();
            
            // Start celebration animation
            startCelebration();
            animateCelebration();
            
            // After 5 seconds, transition to video
            setTimeout(() => {
                // Fade out main content
                mainContainer.classList.add('fade-out');
                
                // Show video section after fade out begins
                setTimeout(() => {
                    videoSection.classList.add('active');
                    
                    // Try to play video
                    fathiaVideo.play().catch(e => {
                        console.log('Video autoplay blocked:', e);
                        // Show a message or fallback
                    });
                }, 800);
            }, 5000);
        });

        /* ============================================
           VIDEO ERROR HANDLING
           ============================================ */
        fathiaVideo.addEventListener('error', function() {
            console.log('Video failed to load. Using fallback.');
            // Create a fallback message
            const fallbackDiv = document.createElement('div');
            fallbackDiv.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #D4AF37;
                font-family: 'Playfair Display', serif;
                padding: 40px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 20px;
                border: 2px solid #D4AF37;
            `;
            fallbackDiv.innerHTML = `
                <h2 style="font-size: 2rem; margin-bottom: 20px;">Fathia Surah</h2>
                <p style="font-size: 1.1rem; opacity: 0.8;">Please add your fathia.mp4 video file to the assets folder</p>
                <p style="font-size: 0.9rem; margin-top: 15px; opacity: 0.6;">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
            `;
            document.querySelector('.video-container').appendChild(fallbackDiv);
        });

        /* ============================================
           KEYBOARD ACCESSIBILITY
           ============================================ */
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (document.activeElement === inaugurateBtn) {
                    inaugurateBtn.click();
                }
            }
        });

        // Add focus styles for accessibility
        inaugurateBtn.addEventListener('focus', function() {
            this.style.outline = '3px solid rgba(212, 175, 55, 0.5)';
            this.style.outlineOffset = '3px';
        });

        inaugurateBtn.addEventListener('blur', function() {
            this.style.outline = 'none';
        });