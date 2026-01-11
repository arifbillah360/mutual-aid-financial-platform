/**
 * 7 ENSEMBLE - Animations
 * Handles scroll-triggered animations and number counting
 * Optimized for performance
 */

// Throttle function to improve scroll performance
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        const timeSinceLastExec = currentTime - lastExecTime;

        clearTimeout(timeoutId);

        if (timeSinceLastExec > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - timeSinceLastExec);
        }
    };
}

// Animate numbers on scroll (optimized)
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .tour-card-amount');

    numbers.forEach(num => {
        // Skip if already animated
        if (num.classList.contains('animated')) return;

        const rect = num.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only animate when element is in viewport
        if (rect.top >= 0 && rect.top <= windowHeight * 0.85) {
            num.classList.add('animated');
            const finalValue = num.textContent.trim();
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));

            // Skip animation for very small numbers or if no numeric value
            if (!numericValue || numericValue < 10) {
                return;
            }

            num.textContent = '0€';
            let current = 0;
            const increment = numericValue / 30; // Reduced iterations for better performance
            const duration = 1000; // 1 second total
            const interval = duration / 30;

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    num.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const currentFormatted = Math.floor(current).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
                    num.textContent = currentFormatted + '€';
                }
            }, interval);
        }
    });
}

// Animate elements on scroll (optimized - uses CSS classes)
function animateOnScroll() {
    const elements = document.querySelectorAll('.impact-card, .goal-item, .tour-card');
    const windowHeight = window.innerHeight;

    elements.forEach((el, index) => {
        // Skip if already animated
        if (el.dataset.animated === 'true') return;

        const rect = el.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= windowHeight * 0.85) {
            // Add CSS class instead of inline styles to prevent layout thrashing
            setTimeout(() => {
                el.classList.add('scroll-fade-in');
                el.dataset.animated = 'true';
            }, index * 50); // Reduced delay for smoother animation
        }
    });
}

// Throttled scroll handlers for better performance
const throttledAnimateNumbers = throttle(animateNumbers, 200);
const throttledAnimateOnScroll = throttle(animateOnScroll, 200);

// Add scroll listener for animations
if (typeof window !== 'undefined') {
    // Use passive listeners for better scroll performance
    window.addEventListener('scroll', throttledAnimateNumbers, { passive: true });
    window.addEventListener('scroll', throttledAnimateOnScroll, { passive: true });

    // Trigger once on load
    document.addEventListener('DOMContentLoaded', () => {
        animateNumbers();
        animateOnScroll();
    });
}

// Create confetti for mission page (optimized)
function createConfetti() {
    // Limit max confetti elements
    const existingConfetti = document.querySelectorAll('.confetti');
    if (existingConfetti.length > 20) {
        return; // Don't create more if we already have too many
    }

    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.backgroundColor = [
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#f093fb'
    ][Math.floor(Math.random() * 5)];

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

// Start confetti animation if on mission page (optimized)
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Check if we're on the mission page
        if (document.querySelector('.hero-mission')) {
            setInterval(createConfetti, 800); // Further reduced frequency for performance
        }
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        animateNumbers,
        animateOnScroll,
        createConfetti,
        throttle
    };
}
