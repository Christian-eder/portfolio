// ========== PARTICLE BACKGROUND ==========
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0, mouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            color: `rgba(14, 165, 233, ${Math.random() * 0.3 + 0.1})`
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        let dx = mouseX - p.x;
        let dy = mouseY - p.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
            let angle = Math.atan2(dy, dx);
            let force = (100 - dist) / 100;
            p.x -= Math.cos(angle) * force * 1.8;
            p.y -= Math.sin(angle) * force * 1.8;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    }
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
});

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

resizeCanvas();
createParticles();
drawParticles();

// ========== TYPING ANIMATION ==========
const typingText = document.querySelector('.typing-text');
const roles = ['IoT Developer', 'System Builder', 'Network Security Specialist', 'Full-Stack Developer', 'Robotics Specialist'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ========== SCROLL PROGRESS BAR ==========
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) progressBar.style.width = scrolled + '%';
});

// ========== DARK/LIGHT MODE ==========
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// ========== PROFILE PICTURE UPLOAD ==========
const profileFrame = document.getElementById('profileFrame');
const photoUpload = document.getElementById('photoUpload');
const profileImage = document.getElementById('profileImage');

if (profileFrame) {
    profileFrame.addEventListener('click', () => {
        if (photoUpload) photoUpload.click();
    });
}

if (photoUpload) {
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && profileImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// ========== SKILL BARS ANIMATION ON SCROLL ==========
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ========== SCROLL REVEAL ANIMATION ==========
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
const mobileMenu = document.querySelector('.mobile-menu');
const navLinksContainer = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        if (navLinksContainer) navLinksContainer.classList.toggle('active');
    });
}

// ========== GRADUATION COUNTDOWN TIMER ==========
function updateCountdown() {
    const graduationDate = new Date('April 14, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = graduationDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const gradMessage = document.getElementById('gradMessage');
    
    if (daysElement) daysElement.innerText = days.toString().padStart(2, '0');
    if (hoursElement) hoursElement.innerText = hours.toString().padStart(2, '0');
    if (minutesElement) minutesElement.innerText = minutes.toString().padStart(2, '0');
    if (secondsElement) secondsElement.innerText = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        if (gradMessage) {
            gradMessage.innerHTML = '🎓 CONGRATULATIONS, GRADUATE! 🎓';
            gradMessage.style.color = 'var(--accent-green)';
        }
        if (daysElement) daysElement.innerText = '00';
        if (hoursElement) hoursElement.innerText = '00';
        if (minutesElement) minutesElement.innerText = '00';
        if (secondsElement) secondsElement.innerText = '00';
    } else {
        if (gradMessage) gradMessage.innerHTML = '🎓 Excited for Graduation Day! 🎓';
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('formName').value;
        const email = document.getElementById('formEmail').value;
        const message = document.getElementById('formMessage').value;
        
        window.location.href = `mailto:LChan121623@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${email}`;
        alert('Thank you for reaching out! Your message will open in your email client.');
        
        contactForm.reset();
    });
}

// ========== RESUME DOWNLOAD (UPDATED WITH YOUR ACTUAL FILE NAME) ==========
const downloadBtns = document.querySelectorAll('#downloadResume, #downloadResumeBottom');

// Your actual resume filename with spaces
const resumeFileName = 'Black Modern Professional Resume (2).pdf';

downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Encode the filename to handle spaces and parentheses
        const encodedFileName = encodeURIComponent(resumeFileName);
        
        // Create a link element and trigger download
        const link = document.createElement('a');
        link.href = resumeFileName;
        link.download = 'Ronald_Christian_Eder_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Fallback: if the above doesn't work, try direct window open
        setTimeout(() => {
            window.open(resumeFileName, '_blank');
        }, 100);
    });
});

// ========== FACEBOOK LINK UPDATE ==========
const facebookInput = document.getElementById('facebookLink');
const facebookFooterLink = document.getElementById('facebookFooterLink');

if (facebookInput) {
    facebookInput.addEventListener('change', () => {
        let url = facebookInput.value;
        if (url && !url.startsWith('http') && !url.startsWith('https')) {
            url = 'https://' + url;
        }
        if (facebookFooterLink) facebookFooterLink.href = url;
    });
}

// ========== SMOOTH SCROLLING FOR NAV LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navLinksContainer) navLinksContainer.classList.remove('active');
        }
    });
});