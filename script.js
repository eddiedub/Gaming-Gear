// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Add parallax effect to mouse image
window.addEventListener('mousemove', (e) => {
    const mouseImage = document.querySelector('.floating-mouse');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    mouseImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Add parallax effect to bungee and sleeve images
window.addEventListener('mousemove', (e) => {
    const bungeeImage = document.querySelector('.floating-bungee');
    const sleeveImage = document.querySelector('.floating-sleeve');
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    if (bungeeImage) {
        bungeeImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    if (sleeveImage) {
        sleeveImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Price calculator functionality
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('.product-item input[type="checkbox"]');
    const totalAmount = document.querySelector('.total-amount');

    if (checkboxes && totalAmount) {
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });

        function calculateTotal() {
            let total = 0;
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += parseFloat(checkbox.dataset.price);
                }
            });
            
            // Animate the total number
            animateNumber(totalAmount, total);
        }

        function animateNumber(element, final) {
            const start = parseFloat(element.textContent.replace('$', ''));
            const duration = 500;
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = start + (final - start) * progress;
                element.textContent = '$' + current.toFixed(2);
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }
    }
});

// Loading animation functionality
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader-overlay');
    const body = document.body;

    if (loader) {
        body.classList.add('loading');
        
        // Wait for all images and resources to load
        window.addEventListener('load', () => {
            // Add minimum delay of 800ms for visual consistency
            setTimeout(() => {
                loader.classList.add('loader-hidden');
                body.classList.remove('loading');
                
                loader.addEventListener('transitionend', () => {
                    if (loader.parentElement) {
                        loader.parentElement.removeChild(loader);
                    }
                });
            }, 800);
        });
    }
});

// Add loader for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only add loader for internal links
        if (this.href.includes(window.location.origin)) {
            localStorage.setItem('showLoader', 'true');
            const loader = document.createElement('div');
            loader.className = 'loader-overlay';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">LOADING</div>
                </div>
            `;
            document.body.appendChild(loader);
        }
    });
});

// Check if we should show loader on page load
if (localStorage.getItem('showLoader')) {
    localStorage.removeItem('showLoader');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});