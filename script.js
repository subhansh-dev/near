document.addEventListener('DOMContentLoaded', function() {
    setupVisitorCounter();
    setupSmoothScroll();
    setupScrollReveal();
    setupNavScroll();
    setupHobbyDrag();
});

function setupVisitorCounter() {
    var el = document.getElementById('visitor-count');
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

function setupSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
}

function setupScrollReveal() {
    var items = document.querySelectorAll('.about-image-frame, .about-desc, .about-stats, .hobby-window, .project-row, .music-window, .music-quote, .contact-link');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    items.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(12px)';
        item.style.transition = 'opacity 0.6s ease ' + (index % 5) * 0.08 + 's, transform 0.6s ease ' + (index % 5) * 0.08 + 's';
        observer.observe(item);
    });
}

function setupNavScroll() {
    var navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        }
    });
}

function setupHobbyDrag() {
    var windows = document.querySelectorAll('.hobby-window, .music-window');
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
