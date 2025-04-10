// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Set theme on load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Form Validation
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    
    if (name === '' || email === '' || message === '') {
        alert('Please fill out all fields.');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    const response = document.getElementById('response');
    response.textContent = `Thanks, ${name}! We'll get back to you soon at ${email}.`;
    response.style.display = 'block';
    e.target.reset();
    
    setTimeout(() => {
        response.style.display = 'none';
    }, 5000);
});

// Fetch API Integration
document.getElementById('loadUsersBtn')?.addEventListener('click', async () => {
    try {
        const btn = document.getElementById('loadUsersBtn');
        btn.disabled = true;
        btn.textContent = 'Loading...';
        
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await res.json();
        const userList = document.getElementById('userList');
        
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            userList.appendChild(li);
        });
        
        btn.disabled = false;
        btn.textContent = 'Load Team Members';
    } catch (err) {
        console.error('Failed to load users:', err);
        alert('Failed to load team members. Please try again later.');
    }
});

// FAQ Component
document.querySelectorAll('.question').forEach((q) => {
    q.addEventListener('click', () => {
        const answer = q.nextElementSibling;
        answer.classList.toggle('visible');
        
        // Optional: rotate chevron icon if you add one
        if (q.querySelector('.chevron')) {
            q.querySelector('.chevron').classList.toggle('rotate');
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Real-time Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const clock = document.getElementById('clock');
    if (clock) {
        clock.textContent = timeString;
    }
}

setInterval(updateClock, 1000);
updateClock(); // Initial call

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Hero Slider Functionality
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll('.hero-slider .slide');
const totalHeroSlides = heroSlides.length;

function showHeroSlide(index) {
  heroSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextHeroSlide() {
  currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
  showHeroSlide(currentHeroSlide);
}

// Auto-slide every 3 seconds
setInterval(nextHeroSlide, 3000);

// Initialize first slide
showHeroSlide(0);
