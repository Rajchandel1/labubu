        document.addEventListener('DOMContentLoaded', () => {

            function select(data){
                return document.querySelector(`${data}`)
            }

            // --- DOM Elements ---
            const envelopeContainer = document.getElementById('envelope-container');
            const letterContainer = document.getElementById('letter-container');
            const typedText = document.getElementById('typed-text');
            const cursorSpan = document.querySelector('.cursor');
            const videoSection = document.getElementById('video-section');
            const surpriseSection = document.getElementById('surprise-section');
            const revealSurpriseBtn = document.getElementById('reveal-surprise-btn');
            const labubuToySection = document.getElementById('labubu-toy-section');
            const labubuToyImg = document.getElementById('labubu-toy');
            var heart = select(".heart-seal")

            // --- Config ---
            const LETTERS = [
                `Hello, my sweet friend!\n\nI sprinkled some magic dust on this letter just for you! You're like a little star that lights up my world. Let's dance under the moonlight soon, okay?\n\n`,
                `Dearest cutie,\n\nI found a tiny flower today and thought of you! You're so special, like a fluffy cloud on a sunny day. Sending you all my hugs and sparkles!\n\n`,
                `Hi, my lovely!\n\nThe fairies told me you're the sweetest ever, and I agree! I made a little wish for you to have the happiest day. You're the best!\n\n`,
                `Hey there, darling!\n\nI baked some magical cookies in my tiny forest kitchen, just thinking of you! You're my favorite person to share giggles with. Let's have a tea party soon!\n\n`
            ];

            const LABUBU_IMAGES = [
                'https://www.labubuindia.in/cdn/shop/files/1747485066_Untitled_design_34_1add11ffe0_webp.png?v=1748124968&width=533',
                'https://www.labubuindia.in/cdn/shop/files/1747485085_Untitled_design_36_6583a98d4a.webp-2.png?v=1748125045&width=533',
                'https://www.labubuindia.in/cdn/shop/files/LABUBU_Time_to_chill-Vinyl_Plush_Doll1_1_1_Background_Removed.png?v=1748122659&width=225',
                'https://www.labubuindia.in/cdn/shop/files/1747485008_Untitled_design_33_6d23c3eb8d_webp.png?v=1748125010&width=533',
                'https://www.labubuindia.in/cdn/shop/files/1747485052_Untitled_design_10_8140cdb215.webp-2.png?v=1748125059&width=533',
            ];

            let synth;

            // --- Step 1: Envelope Click to Show Letter ---
            envelopeContainer.addEventListener('click', () => {
                envelopeContainer.classList.add('open');
                envelopeContainer.style.animation = 'none';
                startMusic();

                setTimeout(() => {
                    envelopeContainer.style.display = 'none';
                    letterContainer.style.display = 'block';
                    const randomLetter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    typewriterEffect(randomLetter, showVideos);
                }, 800);

                heart.style.display = "none"
                
            });

            function typewriterEffect(text, callback) {
                let i = 0;
                typedText.innerHTML = '';
                cursorSpan.style.display = 'inline-block';
                
                function type() {
                    if (i < text.length) {
                        typedText.innerHTML += text.charAt(i);
                        i++;
                        setTimeout(type, 50);
                    } else {
                        cursorSpan.style.display = 'none';
                        if (callback) callback();
                    }
                }
                type();
            }

            // --- Step 2: Show Videos ---
            function showVideos() {
                letterContainer.style.display = 'none';
                videoSection.style.display = 'block';
                setTimeout(() => {
                    videoSection.style.animation = 'fade-out 1s forwards';
                    setTimeout(() => {
                        videoSection.style.display = 'none';
                        showSurpriseMessage();
                    }, 1000);
                }, 5000); // Show videos for 5 seconds
            }

            // --- Step 3: Show Surprise Message and Button ---
            function showSurpriseMessage() {
                surpriseSection.style.display = 'block';
            }

            revealSurpriseBtn.addEventListener('click', () => {
                surpriseSection.style.display = 'none';
                revealLabubuToy();
            });

            // --- Step 4: Reveal Labubu Toy ---
            function revealLabubuToy() {
                labubuToySection.style.display = 'block';
                const randomImg = LABUBU_IMAGES[Math.floor(Math.random() * LABUBU_IMAGES.length)];
                labubuToyImg.src = randomImg;
                createConfetti();
            }

            function createConfetti() {
                for (let i = 0; i < 50; i++) {
                    let confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    document.body.appendChild(confetti);
                    confetti.style.left = Math.random() * window.innerWidth + 'px';
                    confetti.style.top = Math.random() * -100 + 'px';
                    confetti.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`;
                    confetti.style.animationDelay = Math.random() * 0.5 + 's';
                    setTimeout(() => confetti.remove(), 2000);
                }
            }

            // --- Sparkle Effect on Mouse Move ---
            document.addEventListener('mousemove', (e) => {
                let sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                document.body.appendChild(sparkle);

                sparkle.style.left = e.pageX + 'px';
                sparkle.style.top = e.pageY + 'px';
                
                sparkle.style.left += (Math.random() - 0.5) * 20 + 'px';
                sparkle.style.top += (Math.random() - 0.5) * 20 + 'px';

                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            });
            
            // --- Background Music ---
            function startMusic() {
                console.log("music playing")
                if (Tone.context.state !== 'running') {
                    Tone.context.resume();
                }

                if (!synth) {
                    synth = new Tone.PolySynth(Tone.Synth, {
                        oscillator: { type: "sine" }, // Softer sine wave for a cuter sound
                        envelope: { attack: 0.05, decay: 0.3, sustain: 0.3, release: 0.5 }
                    }).toDestination();
                    
                    const melody = [
                        {'time': '0:0', 'note': 'E5', 'duration': '4n'},
                        {'time': '0:2', 'note': 'G5', 'duration': '4n'},
                        {'time': '1:0', 'note': 'A5', 'duration': '4n'},
                        {'time': '1:2', 'note': 'E5', 'duration': '4n'},
                        {'time': '2:0', 'note': 'F5', 'duration': '4n'},
                        {'time': '2:2', 'note': 'G5', 'duration': '4n'},
                        {'time': '3:0', 'note': 'E5', 'duration': '4n'},
                        {'time': '3:2', 'note': 'D5', 'duration': '4n'}
                    ];

                    const part = new Tone.Part((time, value) => {
                        synth.triggerAttackRelease(value.note, value.duration, time);
                    }, melody).start(0);
                    
                    part.loop = true;
                    part.loopEnd = '4m';
                    Tone.Transport.start();
                }
            }
        });
    