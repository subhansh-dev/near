document.addEventListener('DOMContentLoaded', function() {
    setupVisitorCounter();
    setupSmoothScroll();
    setupScrollReveal();
    setupNavScroll();
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
    var items = document.querySelectorAll('.about-image-frame, .about-desc, .about-stats, .hobby-card, .project-row, .gallery-item, .contact-link');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function(item, index) {
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = 'opacity 0.7s ease ' + (index % 4) * 0.1 + 's, transform 0.7s ease ' + (index % 4) * 0.1 + 's';
        observer.observe(item);
    });

    var style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
}

function setupNavScroll() {
    var navbar = document.querySelector('.navbar');
    var lastScroll = 0;
    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
        }
        lastScroll = currentScroll;
    });
}
