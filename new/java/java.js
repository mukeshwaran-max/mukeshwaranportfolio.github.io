// Mobile Navigation
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.classList.add("active");
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.classList.remove("active");
}

// Typewriter Effect
const texts = [
    "DATA ANALYST",
    "WEB DEVELOPER",
    "SOFTWARE DEVELOPER"
];
let speed = 100;
const textElement = document.querySelector(".typewriter-text");
let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (characterIndex < texts[textIndex].length) {
        textElement.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElement.innerHTML.length > 0) {
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// Initialize Circular Progress Bars
function initCircularProgress() {
    const circularProgresses = document.querySelectorAll(".circular-progress");
    
    circularProgresses.forEach(progress => {
        const percent = parseInt(progress.getAttribute("data-percent"));
        const progressFill = progress.querySelector(".progress-fill");
        
        // Calculate dash offset (440 is the circumference of the circle)
        const dashOffset = 440 - (440 * percent) / 100;
        progressFill.style.setProperty("--dash-offset", dashOffset);
        
        // Set the progress text
        progress.querySelector(".progress-text").textContent = `${percent}%`;
    });
}

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = "0";
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                bar.style.width = width;
                observer.unobserve(bar.parentElement.parentElement);
            }
        });
        
        observer.observe(bar.parentElement.parentElement);
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link on Scroll
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-container .links a, .dropdown .links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
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
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();
    initCircularProgress();
    animateSkillBars();
    setActiveNavLink();
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.dropdown');
        const hamburger = document.querySelector('.hamburg');
        
        if (dropdown.classList.contains('active') && 
            !dropdown.contains(e.target) && 
            e.target !== hamburger) {
            cancel();
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}