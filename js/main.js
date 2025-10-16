// DOM Elements
document.addEventListener('DOMContentLoaded', () => {

    // Initialize theme even if there's no toggle button
    if (localStorage.getItem('csTheme') === 'light') {
        document.body.classList.add('light-mode');
    }

    const topicCards = document.querySelectorAll('.topic-card');
    
    // Add click event listeners to topic cards
    topicCards.forEach(card => {
        card.addEventListener('click', () => {
            const page = card.getAttribute('data-page');
            window.location.href = `pages/${page}.html`;
        });
    });

    // Add hover effect for cards
    topicCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
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
                themeToggle.textContent = 'Dark Mode';
            } else {
                document.body.classList.remove('light-mode');
                themeToggle.textContent = 'Light Mode';
            }
        }
        // Load theme from localStorage
        setTheme(localStorage.getItem('csTheme') === 'light');
        themeToggle.addEventListener('click', () => {
            const isLight = !document.body.classList.contains('light-mode');
            setTheme(isLight);
            localStorage.setItem('csTheme', isLight ? 'light' : 'dark');
        });
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
});