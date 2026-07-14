document.addEventListener('DOMContentLoaded', function() {
    initLoader();
    initCursor();
    initVisitorCounter();
    initSmoothScroll();
    initNavScroll();
    initMobileMenu();
    initHeroCanvas();
    initTypewriter();
    initParallax();
    initScrollReveal();
    initStatCounters();
    initTiltEffect();
    initMagneticButtons();
    initScrollProgress();
    initTerminal();
    initPiano();
    initHobbyDrag();
});

function initLoader() {
    var loader = document.getElementById('loader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 800);
    });
    setTimeout(function() {
        loader.classList.add('hidden');
    }, 3000);
}

function initCursor() {
    var cursor = document.getElementById('cursor');
    var trail = document.getElementById('cursor-trail');
    if (!cursor || !trail) return;
    if (window.innerWidth <= 768) return;

    var mouseX = 0, mouseY = 0;
    var trailX = 0, trailY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    var hoverables = document.querySelectorAll('a, button, .piano-key, .hobby-window, .project-row, .contact-card, .gallery-item');
    hoverables.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hovering');
        });
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hovering');
        });
    });
}

function initVisitorCounter() {
    var el = document.getElementById('visitor-count');
    if (!el) return;
    var stored = localStorage.getItem('subhansh-vc');
    var count;
    if (stored) {
        count = parseInt(stored) + 1;
    } else {
        count = Math.floor(Math.random() * 9000) + 1000;
    }
    localStorage.setItem('subhansh-vc', count.toString());
    el.textContent = count.toString().padStart(5, '0');
}

function initSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                var mobileMenu = document.getElementById('mobile-menu');
                var navToggle = document.getElementById('nav-toggle');
                if (mobileMenu) mobileMenu.classList.remove('open');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    }
}

function initNavScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        }
    });
}

function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });
}

function initHeroCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = 60;

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(212, 212, 212, ' + p.opacity + ')';
            ctx.fill();

            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx = p.x - p2.x;
                var dy = p.y - p2.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(212, 212, 212, ' + (0.05 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

function initTypewriter() {
    var el = document.getElementById('hero-tag');
    if (!el) return;
    var text = 'pianist / flautist / builder';
    var i = 0;
    el.innerHTML = '<span class="typed-cursor"></span>';

    function type() {
        if (i < text.length) {
            el.innerHTML = text.substring(0, i + 1) + '<span class="typed-cursor"></span>';
            i++;
            setTimeout(type, 80 + Math.random() * 40);
        }
    }

    setTimeout(type, 1200);
}

function initParallax() {
    var floats = document.querySelectorAll('[data-depth]');
    if (!floats.length) return;

    window.addEventListener('mousemove', function(e) {
        var cx = (e.clientX / window.innerWidth - 0.5) * 2;
        var cy = (e.clientY / window.innerHeight - 0.5) * 2;
        floats.forEach(function(el) {
            var depth = parseFloat(el.getAttribute('data-depth'));
            var moveX = cx * depth * 100;
            var moveY = cy * depth * 100;
            el.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });
    });
}

function initScrollReveal() {
    var items = document.querySelectorAll('.about-image-frame, .about-desc, .about-stats, .hobby-window, .hobby-desc, .project-row, .music-window, .music-quote, .contact-card, .contact-terminal, .gallery-item, .music-visualizer, .mini-piano');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    items.forEach(function(item, index) {
        item.classList.add('reveal-item');
        item.style.transitionDelay = (index % 6) * 0.08 + 's';
        observer.observe(item);
    });
}

function initStatCounters() {
    var stats = document.querySelectorAll('.stat[data-count]');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseInt(el.getAttribute('data-count'));
                var numEl = el.querySelector('.stat-num');
                if (!numEl || numEl.dataset.counted) return;
                numEl.dataset.counted = 'true';
                var current = 0;
                var increment = target / 30;
                var interval = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(interval);
                    }
                    numEl.textContent = Math.floor(current);
                }, 40);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function(stat) {
        observer.observe(stat);
    });
}

function initTiltEffect() {
    var tiltEls = document.querySelectorAll('[data-tilt]');
    if (window.innerWidth <= 768) return;

    tiltEls.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = (y - centerY) / centerY * -5;
            var rotateY = (x - centerX) / centerX * 5;
            el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.02)';
            el.style.transition = 'transform 0.1s ease';
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
            el.style.transition = 'transform 0.4s ease';
        });
    });
}

function initMagneticButtons() {
    if (window.innerWidth <= 768) return;
    var magnetics = document.querySelectorAll('[data-magnetic]');

    magnetics.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
            el.style.transition = 'transform 0.2s ease';
        });
        el.addEventListener('mouseleave', function() {
            el.style.transform = 'translate(0, 0)';
            el.style.transition = 'transform 0.4s ease';
        });
    });
}

function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    });
}

function initTerminal() {
    var lines = [
        { el: document.getElementById('terminal-line-1'), text: '<span class="prompt">$</span> whoami', delay: 500 },
        { el: document.getElementById('terminal-line-2'), text: 'subhansh@dev <span class="path">~/projects</span>', delay: 1500 },
        { el: document.getElementById('terminal-line-3'), text: 'always shipping. always curious.', delay: 2800 }
    ];

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                lines.forEach(function(line) {
                    if (!line.el) return;
                    setTimeout(function() {
                        var i = 0;
                        var fullText = line.text;
                        var plainText = fullText.replace(/<[^>]+>/g, '');
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = fullText;

                        function typeChar() {
                            if (i < plainText.length) {
                                var displayed = fullText.substring(0, getOriginalIndex(fullText, i + 1));
                                line.el.innerHTML = displayed + '<span class="typed-cursor"></span>';
                                i++;
                                setTimeout(typeChar, 30 + Math.random() * 30);
                            } else {
                                line.el.innerHTML = fullText;
                            }
                        }

                        function getOriginalIndex(html, plainIndex) {
                            var count = 0;
                            var inTag = false;
                            for (var j = 0; j < html.length; j++) {
                                if (html[j] === '<') inTag = true;
                                if (!inTag) count++;
                                if (html[j] === '>') inTag = false;
                                if (count === plainIndex) return j + 1;
                            }
                            return html.length;
                        }

                        typeChar();
                    }, line.delay);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    var terminal = document.querySelector('.contact-terminal');
    if (terminal) observer.observe(terminal);
}

function initPiano() {
    var keys = document.querySelectorAll('.piano-key');
    if (!keys.length) return;

    var audioCtx = null;

    function playNote(note) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }

        var freqMap = {
            'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
            'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
            'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
            'C5': 523.25
        };

        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.type = 'triangle';
        osc.frequency.value = freqMap[note] || 440;
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.8);
    }

    keys.forEach(function(key) {
        key.addEventListener('mousedown', function(e) {
            e.preventDefault();
            var note = key.getAttribute('data-note');
            key.classList.add('active');
            playNote(note);
        });

        key.addEventListener('mouseup', function() {
            key.classList.remove('active');
        });

        key.addEventListener('mouseleave', function() {
            key.classList.remove('active');
        });
    });

    var keyMap = {
        'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
        'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
        'u': 'A#4', 'j': 'B4', 'k': 'C5'
    };

    document.addEventListener('keydown', function(e) {
        var note = keyMap[e.key.toLowerCase()];
        if (note) {
            var keyEl = document.querySelector('[data-note="' + note + '"]');
            if (keyEl && !keyEl.classList.contains('active')) {
                keyEl.classList.add('active');
                playNote(note);
            }
        }
    });

    document.addEventListener('keyup', function(e) {
        var note = keyMap[e.key.toLowerCase()];
        if (note) {
            var keyEl = document.querySelector('[data-note="' + note + '"]');
            if (keyEl) keyEl.classList.remove('active');
        }
    });
}

function initHobbyDrag() {
    var windows = document.querySelectorAll('.hobby-window, .music-window, .hero-float');
    windows.forEach(function(win) {
        var startX, startY, origX, origY, dragging = false;
        win.addEventListener('mousedown', function(e) {
            if (e.target.tagName === 'A') return;
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            var rect = win.getBoundingClientRect();
            var parentRect = win.parentElement.getBoundingClientRect();
            origX = rect.left - parentRect.left;
            origY = rect.top - parentRect.top;
            win.style.transition = 'none';
            win.style.zIndex = '20';
            e.preventDefault();
        });
        document.addEventListener('mousemove', function(e) {
            if (!dragging) return;
            var dx = e.clientX - startX;
            var dy = e.clientY - startY;
            win.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) scale(1.05)';
        });
        document.addEventListener('mouseup', function() {
            if (!dragging) return;
            dragging = false;
            win.style.transition = 'transform 0.4s ease';
            win.style.transform = 'translate(0, 0) scale(1)';
            setTimeout(function() {
                win.style.zIndex = '';
                win.style.transition = 'all 0.5s ease';
            }, 400);
        });
    });
}
