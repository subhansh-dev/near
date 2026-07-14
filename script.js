document.addEventListener('DOMContentLoaded', function() {
    setupVisitorCounter();
    setupSmoothScroll();
    setupScrollReveal();
});

function setupVisitorCounter() {
    var countEl = document.getElementById('visitor-count');
    var stored = localStorage.getItem('subhansh-vc');
    var count;
    if (stored) {
        count = parseInt(stored) + 1;
    } else {
        count = Math.floor(Math.random() * 9000) + 1000;
    }
    localStorage.setItem('subhansh-vc', count.toString());
    countEl.textContent = count.toString().padStart(5, '0');
}

function setupSmoothScroll() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

function setupScrollReveal() {
    var cards = document.querySelectorAll('.about-card, .project-card, .contact-card, .gallery-item');
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}
