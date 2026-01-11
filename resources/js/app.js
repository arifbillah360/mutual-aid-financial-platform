import './bootstrap';

import Alpine from 'alpinejs';
import QRCode from 'qrcode'; // Import QRCode library

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

// Alpine.js data for dashboard layout interactivity
Alpine.data('dashboardLayout', () => ({
    isSidebarOpen: window.innerWidth >= 768, // Open by default on desktop
    balance: 0, // Initial balance, will be updated via API or Blade
    notifications: [], // Placeholder

    init() {
        // Fetch balance from API or retrieve from initial Blade data
        this.fetchBalance();

        // Close sidebar on small screens initially
        if (window.innerWidth < 768) {
            this.isSidebarOpen = false;
        }

        // Listen for window resize to adjust sidebar state
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.isSidebarOpen = true; // Always open on desktop
            } else {
                // Don't force close on mobile if user manually opened it
            }
        });
    },

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    },

    async fetchBalance() {
        try {
            // Placeholder: Replace with actual API call if balance updates dynamically
            const response = await axios.get('/api/user/balance');
            this.balance = response.data.balance;
        } catch (error) {
            console.error('Error fetching balance:', error);
            this.balance = 'Error'; // Display error or default
        }
    },

    // Placeholder for real-time updates using WebSockets if implemented
    listenForBalanceUpdates() {
        // Echo.channel('users.' + userId)
        //     .listen('BalanceUpdated', (e) => {
        //         this.balance = e.newBalance;
        //     });
    }
}));


// Alpine.js data for Constellation Visualization (inside constellation-visualization.blade.php)
Alpine.data('constellationViz', (initialData) => ({
    alcyone: initialData.alcyone,
    members: initialData.members,
    svgWidth: 0,
    svgHeight: 0,
    center: { x: 0, y: 0 },
    orbitRadius: 100, // Base radius
    memberSize: 24, // Diameter of member circles
    alcyoneSize: 48, // Diameter of Alcyone circle
    hoveredMember: null,

    init() {
        this.$nextTick(() => {
            this.updateSVGDimensions();
            window.addEventListener('resize', () => this.updateSVGDimensions());
        });
    },

    updateSVGDimensions() {
        const container = this.$refs.svgContainer;
        if (container) {
            this.svgWidth = container.clientWidth;
            this.svgHeight = container.clientHeight;
            this.center = { x: this.svgWidth / 2, y: this.svgHeight / 2 };
            // Adjust orbit radius based on smaller dimension for better fitting
            this.orbitRadius = Math.min(this.svgWidth, this.svgHeight) * 0.35;
        }
    },

    getMemberPosition(index, totalMembers) {
        const angle = (360 / totalMembers) * index;
        const radians = angle * (Math.PI / 180);
        const x = this.center.x + this.orbitRadius * Math.cos(radians);
        const y = this.center.y + this.orbitRadius * Math.sin(radians);
        return { x, y };
    },

    getMemberTransform(index, totalMembers, rotationAngle) {
        const { x, y } = this.getMemberPosition(index, totalMembers);
        // Apply rotation around the center of the SVG
        return `translate(${x - this.memberSize / 2}, ${y - this.memberSize / 2}) rotate(${rotationAngle} ${this.memberSize / 2} ${this.memberSize / 2})`;
    },

    getLinePath(memberPos) {
        return `M${this.center.x} ${this.center.y} L${memberPos.x} ${memberPos.y}`;
    },

    setHoveredMember(member) {
        this.hoveredMember = member;
    },

    clearHoveredMember() {
        this.hoveredMember = null;
    }
}));


// Alpine.js data for tabbed interfaces (e.g., Settings page)
Alpine.data('tabs', (initialTab = 'personal-info') => ({
    activeTab: initialTab,
    setActiveTab(tab) {
        this.activeTab = tab;
    },
    isActive(tab) {
        return this.activeTab === tab;
    }
}));

// Alpine.js data for copy to clipboard functionality
Alpine.data('copyToClipboard', (textToCopy = '') => ({
    copied: false,
    text: textToCopy,
    copy() {
        navigator.clipboard.writeText(this.text).then(() => {
            this.copied = true;
            setTimeout(() => this.copied = false, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Optionally show an error toast
            window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'error', message: 'Failed to copy link!' } }));
        });
    }
}));

// Alpine.js data for QR code generation
Alpine.data('qrCodeGenerator', (text) => ({
    qrCodeDataUrl: null,
    async init() {
        if (text) {
            try {
                this.qrCodeDataUrl = await QRCode.toDataURL(text, { errorCorrectionLevel: 'H', width: 256 });
            } catch (err) {
                console.error('Error generating QR code:', err);
                this.qrCodeDataUrl = null;
            }
        }
    }
}));

// Alpine.js data for Toast notifications
Alpine.data('toastManager', () => ({
    toasts: [],
    init() {
        window.addEventListener('toast', (event) => {
            this.addToast(event.detail.message, event.detail.type || 'info');
        });
        // Example for showing a toast from a form submission
        // Check for session flash messages
        const successMessage = document.getElementById('session-success-message')?.dataset.message;
        const errorMessage = document.getElementById('session-error-message')?.dataset.message;

        if (successMessage) {
            this.addToast(successMessage, 'success');
        }
        if (errorMessage) {
            this.addToast(errorMessage, 'error');
        }
    },
    addToast(message, type = 'info', duration = 3000) {
        const id = Date.now() + Math.random();
        this.toasts.push({ id, message, type });
        setTimeout(() => this.removeToast(id), duration);
    },
    removeToast(id) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
    }
}));