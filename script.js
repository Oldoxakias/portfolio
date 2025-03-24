// Cursor Trail Effect
document.addEventListener('DOMContentLoaded', () => {
    const cursorTrail = document.querySelector('.cursor-trail');
    const positions = [];
    
    document.addEventListener('mousemove', (e) => {
        positions.push({ x: e.clientX, y: e.clientY });
        if (positions.length > 20) positions.shift();
        
        positions.forEach((pos, index) => {
            setTimeout(() => {
                cursorTrail.style.left = `${pos.x}px`;
                cursorTrail.style.top = `${pos.y}px`;
            }, index * 10);
        });
    });

    // Uptime calculation
    const uptimeElement = document.getElementById('uptime');
    const startDate = new Date('2023-01-01');
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const uptime = 99.9 + (Math.random() * 0.09);
    uptimeElement.textContent = `${uptime.toFixed(2)}% (${diffDays} days)`;
});
// Smooth scroll for navigation links
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = document.querySelector('.portfolio-header').offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
    });
});
// Updated JavaScript
const sideNav = document.querySelector('.side-nav');
const navToggle = document.querySelector('.nav-toggle');

// Toggle visibility
navToggle.addEventListener('click', () => {
    sideNav.classList.toggle('user-hidden');
});

// Scroll handling
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1200) {
        const shouldShow = window.scrollY > 100 && !sideNav.classList.contains('user-hidden');
        sideNav.classList.toggle('visible', shouldShow);
    }
});

// Scroll behavior
window.addEventListener('scroll', () => {
    if (window.innerWidth > 1200) {
        const shouldBeVisible = window.scrollY > 100 && !isCollapsed;
        sideNav.classList.toggle('visible', shouldBeVisible);
    }
});

// Mobile navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 1200) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const headerHeight = document.querySelector('.portfolio-header').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            history.pushState(null, null, targetId);
            document.querySelector('.popup-nav').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
    mobileNav.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    mobileNav.style.display = 'none';
});

// Close when clicking outside
mobileNav.addEventListener('click', (e) => {
    if(e.target === mobileNav) {
        mobileNav.style.display = 'none';
    }
});