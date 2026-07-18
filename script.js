// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===== Hero Stats Counter Animation =====
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.round(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };
    
    updateCounter();
  });
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (stats.length > 0) {
  statsObserver.observe(stats[0].closest('.hero-stats'));
}

// ===== Testimonial Slider =====
const wrapper = document.getElementById('testimonialWrapper');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

const goToSlide = (index) => {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  
  currentSlide = index;
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
};

const nextSlide = () => {
  goToSlide(currentSlide + 1);
};

const prevSlide = () => {
  goToSlide(currentSlide - 1);
};

// Event listeners
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    resetAutoSlide();
  });
});

// Auto-slide
const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 5000);
};

const resetAutoSlide = () => {
  clearInterval(autoSlideInterval);
  startAutoSlide();
};

startAutoSlide();

// ===== Form Validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const subjectInput = document.getElementById('subject');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

// Real-time validation
nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError'));
emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError'));
messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError'));

nameInput.addEventListener('input', () => validateField(nameInput, 'nameError'));
emailInput.addEventListener('input', () => validateField(emailInput, 'emailError'));
messageInput.addEventListener('input', () => validateField(messageInput, 'messageError'));

const validateField = (input, errorId) => {
  const errorElement = document.getElementById(errorId);
  if (input.value.trim() === '') {
    input.classList.add('error');
    errorElement.classList.add('show');
    return false;
  } else if (input.type === 'email' && !isValidEmail(input.value)) {
    input.classList.add('error');
    errorElement.classList.add('show');
    errorElement.textContent = 'Please enter a valid email address';
    return false;
  } else {
    input.classList.remove('error');
    errorElement.classList.remove('show');
    return true;
  }
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate all fields
  const isNameValid = validateField(nameInput, 'nameError');
  const isEmailValid = validateField(emailInput, 'emailError');
  const isMessageValid = validateField(messageInput, 'messageError');
  
  if (isNameValid && isEmailValid && isMessageValid) {
    // Simulate sending
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
      formStatus.className = 'form-status success';
      formStatus.textContent = '✓ Thank you for reaching out! I will get back to you soon.';
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      
      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 5000);
    }, 1500);
  }
});

// ===== Newsletter Form =====
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input');
  if (input.value.trim() !== '' && isValidEmail(input.value)) {
    alert('Thank you for subscribing!');
    newsletterForm.reset();
  } else {
    alert('Please enter a valid email address.');
  }
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Intersection Observer for Animations =====
const animatedElements = document.querySelectorAll('[data-aos]');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  animationObserver.observe(el);
});

// ===== Console Welcome =====
console.log('%c LifeCoach ', 'background: #304861; color: #fff; font-size: 20px; font-weight: bold; padding: 10px; border-radius: 5px;');
console.log('Transform your life through personalized coaching.');