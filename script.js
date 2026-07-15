document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations (fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Stagger grid cards
    document.querySelectorAll('.grid').forEach(grid => {
        const cards = grid.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.classList.add(`stagger-${(index % 4) + 1}`);
            observer.observe(card);
        });
    });

    // Update active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop() || 
           (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
