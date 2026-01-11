import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

// Custom Alpine.js component for number counting animation
Alpine.data('numberCounter', (start = 0, end = 0, duration = 2000) => ({
    currentNumber: start,
    endNumber: end,
    duration: duration,
    init() {
        this.animateNumber();
    },
    animateNumber() {
        let startTime;
        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / this.duration;

            if (progress < 1) {
                this.currentNumber = Math.floor(start + (this.endNumber - start) * progress);
                requestAnimationFrame(animate);
            } else {
                this.currentNumber = this.endNumber;
            }
        };
        requestAnimationFrame(animate);
    }
}));

// Custom Alpine.js component for continuous confetti animation
Alpine.data('confettiMachine', (colors = [], count = 50) => ({
    confettiPieces: [],
    colors: colors,
    init() {
        this.generateConfetti(count);
    },
    generateConfetti(num) {
        for (let i = 0; i < num; i++) {
            this.confettiPieces.push({
                id: i,
                left: Math.random() * 100, // %
                size: Math.random() * 8 + 4, // px
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                delay: Math.random() * -3, // seconds
                duration: Math.random() * 3 + 2, // seconds
                rotation: Math.random() * 360, // deg
                rotationDuration: Math.random() * 5 + 3, // seconds for rotation
            });
        }
    }
}));

// Alpine.js data for password visibility toggle
Alpine.data('passwordToggle', () => ({
    showPassword: false,
    toggleVisibility() {
        this.showPassword = !this.showPassword;
    }
}));
