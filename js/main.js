// (Removed) Interactive timeline modal and progress tracker logic
// DOM Elements
document.addEventListener('DOMContentLoaded', () => {

    // Initialize theme even if there's no toggle button
    if (localStorage.getItem('csTheme') === 'light') {
        document.body.classList.add('light-mode');
    }

    const topicCards = document.querySelectorAll('.topic-card');
    // Click to navigate: support data-link (absolute/relative) and data-page (auto-prefix pages/)
    topicCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('coming-soon')) return; // disabled
            const direct = card.getAttribute('data-link');
            const page = card.getAttribute('data-page');
            if (direct) {
                window.location.href = direct;
            } else if (page) {
                // If we're already in /pages, link sibling html; else prefix with pages/
                const inPages = window.location.pathname.toLowerCase().includes('/pages/');
                const path = inPages ? `${page}.html` : `pages/${page}.html`;
                window.location.href = path;
            }
        });
    });

    // Add hover effect for cards (skip coming-soon)
    topicCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('coming-soon')) return;
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

        // Theme toggle logic
        const themeToggle = document.getElementById('theme-toggle');
        function setTheme(light) {
            if (light) {
                document.body.classList.add('light-mode');
                if (themeToggle) themeToggle.textContent = 'Dark Mode';
            } else {
                document.body.classList.remove('light-mode');
                if (themeToggle) themeToggle.textContent = 'Light Mode';
            }
        }
        // Load theme from localStorage
        setTheme(localStorage.getItem('csTheme') === 'light');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isLight = !document.body.classList.contains('light-mode');
                setTheme(isLight);
                localStorage.setItem('csTheme', isLight ? 'light' : 'dark');
            });
        }

        // Animated background initializer (works on any page with #animated-bg)
        const canvas = document.getElementById('animated-bg');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let w = window.innerWidth;
            let h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
            let particles = [];
            const PARTICLE_COUNT = 60;
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    r: Math.random() * 2 + 1,
                    dx: (Math.random() - 0.5) * 0.7,
                    dy: (Math.random() - 0.5) * 0.7,
                    color: `rgba(100,255,218,${Math.random() * 0.7 + 0.3})`
                });
            }
            function drawParticles() {
                ctx.clearRect(0, 0, w, h);
                for (let p of particles) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    p.x += p.dx;
                    p.y += p.dy;
                    if (p.x < 0 || p.x > w) p.dx *= -1;
                    if (p.y < 0 || p.y > h) p.dy *= -1;
                }
                requestAnimationFrame(drawParticles);
            }
            drawParticles();
            window.addEventListener('resize', () => {
                w = window.innerWidth; h = window.innerHeight;
                canvas.width = w; canvas.height = h;
            });
        }
});

// Add animation class to elements when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all feature elements
document.querySelectorAll('.feature').forEach(feature => {
    observer.observe(feature);
    // Flashcard flip logic (click or Enter/Space)
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
            }
        });
    });
});