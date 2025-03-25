
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
let isMoving = false;

// Store last positions for smoothing
const posQueue = [];
const MAX_POSITIONS = 5;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    // Store positions for smoothing
    posQueue.push({ x: mouseX, y: mouseY });
    if(posQueue.length > MAX_POSITIONS) posQueue.shift();
});

// Smooth animation frame
const animate = () => {
    if(isMoving && posQueue.length > 0) {
        // Get averaged position
        const avgPos = posQueue.reduce((acc, pos) => {
            return { x: acc.x + pos.x, y: acc.y + pos.y };
        }, { x: 0, y: 0 });
        
        const targetX = avgPos.x / posQueue.length;
        const targetY = avgPos.y / posQueue.length;
        
        // Smooth interpolation
        trailX += (targetX - trailX) * 0.3;
        trailY += (targetY - trailY) * 0.3;
        
        cursorTrail.style.transform = `translate(${trailX}px, ${trailY}px)`;
        cursorTrail.style.opacity = '0.8';
    } else {
        cursorTrail.style.opacity = '0';
    }
    
    requestAnimationFrame(animate);
};

// Handle mouse leave
document.addEventListener('mouseleave', () => {
    isMoving = false;
});

// Start animation
animate();
    // Uptime calculation
    const uptimeElement = document.getElementById('uptime');
    const startDate = new Date('2023-01-01');
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const uptime = 99.9 + (Math.random() * 0.09);
    uptimeElement.textContent = `${uptime.toFixed(2)}% (${diffDays} days)`;

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
        
        history.pushState(null, null, targetId);
    });
});
// Active Section Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', 
                    link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop,
            behavior: 'smooth'
        });
    });
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