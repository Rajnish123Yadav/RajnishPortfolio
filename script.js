// ============================================================
// 1. PRELOADER
// ============================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }, 1000);
});

// ============================================================
// 2. CUSTOM CURSOR - Only for desktop
// ============================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

// Check if device is touch capable
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (cursorDot && cursorRing && !isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
} else if (cursorDot && cursorRing) {
  cursorDot.style.display = 'none';
  cursorRing.style.display = 'none';
}

// ============================================================
// 3. TYPING EFFECT
// ============================================================
const typedText = document.getElementById('typedText');
const roles = [
  'Java Developer',
  'Spring Boot Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'Flutter Developer'
];

if (typedText) {
  let roleIndex = 0, charIndex = 0, isDeleting = false, isWaiting = false;

  function typeEffect() {
    if (isWaiting) {
      setTimeout(typeEffect, 2000);
      return;
    }
    const current = roles[roleIndex];
    if (isDeleting) {
      typedText.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        isWaiting = true;
        setTimeout(() => {
          isWaiting = false;
          typeEffect();
        }, 500);
        return;
      }
      setTimeout(typeEffect, 30);
    } else {
      typedText.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
      setTimeout(typeEffect, 60);
    }
  }
  typeEffect();
}

// ============================================================
// 4. NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  
  if (scrollProgress) {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (scrollTop / docHeight * 100) + '%';
  }
  
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }
  
  document.querySelectorAll('section').forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', window.scrollY >= top && window.scrollY < bottom);
    }
  });
});

// ============================================================
// 5. SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar ? navbar.offsetHeight : 70;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================================
// 6. HAMBURGER MENU
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
    });
  });
}

// ============================================================
// 7. SKILLS TABS
// ============================================================
const tabBtns = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.skills-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    panels.forEach(p => p.classList.remove('active'));
    const target = document.getElementById(btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

// ============================================================
// 8. COUNTER ANIMATION (with + support)
// ============================================================
function animateCounters() {
  document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const showPlus = counter.dataset.plus === 'true';
    
    if (isNaN(target) || target === 0) {
      counter.textContent = '0';
      return;
    }
    
    const duration = 1500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      
      if (current >= target) {
        counter.textContent = target + (showPlus ? '+' : '');
        return;
      }
      
      counter.textContent = current;
      requestAnimationFrame(updateCounter);
    }
    
    requestAnimationFrame(updateCounter);
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
});

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  counterObserver.observe(statsSection);
}

// ============================================================
// 9. SKILL BAR ANIMATION
// ============================================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress-fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.skill-group').forEach(group => {
  skillObserver.observe(group);
});

// ============================================================
// 10. CONTACT FORM
// ============================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = '⚠️ Please fill all fields';
        formStatus.style.color = '#ef4444';
      }
      return;
    }
    
    const nameVal = name.value.trim();
    const emailVal = email.value.trim();
    const messageVal = message.value.trim();
    
    if (!nameVal || !emailVal || !messageVal) {
      if (formStatus) {
        formStatus.textContent = '⚠️ Please fill all fields';
        formStatus.style.color = '#ef4444';
      }
      return;
    }
    
    if (formStatus) {
      formStatus.textContent = '⏳ Sending...';
      formStatus.style.color = 'var(--accent-1)';
    }
    
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '⏳ Sending...';
    }
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'd782f8df-ec8c-4e17-bfdc-35496cba177e',
          name: nameVal,
          email: emailVal,
          message: messageVal
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (formStatus) {
          formStatus.textContent = '✅ Message sent successfully!';
          formStatus.style.color = '#22c55e';
        }
        contactForm.reset();
      } else {
        if (formStatus) {
          formStatus.textContent = '❌ Failed to send. Please try again.';
          formStatus.style.color = '#ef4444';
        }
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = '❌ Network error. Please check your connection.';
        formStatus.style.color = '#ef4444';
      }
    }
    
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = 'Send Message';
    }
  });
}

// ============================================================
// 11. BACK TO TOP
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 12. LIVE DEMO
// ============================================================
function showLiveDemo() {
  alert('🚀 This project is currently in development. Live demo coming soon!');
}

// ============================================================
// 13. FOOTER YEAR
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// 14. REVEAL ANIMATIONS
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .timeline-item, .stat-card, .skill-item, .badge-card, .testimonial-card, .coding-stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  revealObserver.observe(el);
});

// ============================================================
// 15. KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (navLinks) {
      navLinks.classList.remove('show');
    }
    if (hamburger) {
      hamburger.classList.remove('active');
    }
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  }
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const searchOverlay = document.getElementById('searchOverlay');
    if (searchOverlay) {
      searchOverlay.classList.toggle('active');
      const searchInput = document.getElementById('searchInput');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  }
});

// ============================================================
// 16. SEARCH FUNCTIONALITY
// ============================================================
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClose = document.getElementById('searchClose');

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.toggle('active');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  });
}

if (searchClose && searchOverlay) {
  searchClose.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });
}

if (searchOverlay) {
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove('active');
    }
  });
}

const searchData = {
  projects: ['Appointment Booking SaaS', 'Payment Gateway Simulation', 'Library Management System', 'Patient Appointment System'],
  skills: ['Java', 'Spring Boot', 'Spring Security', 'Hibernate', 'JPA', 'REST APIs', 'Microservices', 'Docker', 'Kafka'],
  technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'Flutter', 'Dart', 'HTML', 'CSS', 'JavaScript']
};

if (searchInput && searchResults) {
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    let matches = [];
    Object.entries(searchData).forEach(([category, items]) => {
      items.forEach(item => {
        if (item.toLowerCase().includes(query)) {
          matches.push({
            name: item,
            category: category.charAt(0).toUpperCase() + category.slice(1)
          });
        }
      });
    });
    
    if (matches.length) {
      searchResults.innerHTML = matches.map(m =>
        `<div class="search-result"><span>${m.name}</span><small>${m.category}</small></div>`
      ).join('');
    } else {
      searchResults.innerHTML = '<div class="search-result no-result">No results found</div>';
    }
  });
}

// ============================================================
// 17. THEME TOGGLE (Dark/Light)
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ============================================================
// 18. PROJECT FILTERS
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all') {
        card.style.display = 'block';
      } else {
        const categories = card.dataset.category || '';
        card.style.display = categories.includes(filter) ? 'block' : 'none';
      }
    });
  });
});

// ============================================================
// 19. TESTIMONIALS SLIDER
// ============================================================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');

if (testimonialCards.length > 0) {
  const prevBtn = document.querySelector('.testimonial-nav.prev');
  const nextBtn = document.querySelector('.testimonial-nav.next');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      testimonialCards[currentTestimonial].classList.remove('active');
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      testimonialCards[currentTestimonial].classList.add('active');
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      testimonialCards[currentTestimonial].classList.remove('active');
      currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      testimonialCards[currentTestimonial].classList.add('active');
    });
  }
  
  // Auto slide
  setInterval(() => {
    if (document.querySelector('.testimonials-grid')) {
      testimonialCards[currentTestimonial].classList.remove('active');
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      testimonialCards[currentTestimonial].classList.add('active');
    }
  }, 5000);
}

// ============================================================
// 20. GITHUB LIVE CODING STATS
// ============================================================
async function fetchGitHubStats() {
  try {
    const response = await fetch('https://api.github.com/users/Rajnish123Yadav');
    const data = await response.json();
    
    const totalRepos = document.getElementById('totalRepos');
    const totalFollowers = document.getElementById('totalFollowers');
    
    if (totalRepos) totalRepos.textContent = data.public_repos || 0;
    if (totalFollowers) totalFollowers.textContent = data.followers || 0;
    
    const starRes = await fetch('https://api.github.com/users/Rajnish123Yadav/repos');
    const repos = await starRes.json();
    let totalStars = 0, totalForks = 0;
    repos.forEach(repo => {
      totalStars += repo.stargazers_count || 0;
      totalForks += repo.forks_count || 0;
    });
    
    const totalStarsEl = document.getElementById('totalStars');
    const totalForksEl = document.getElementById('totalForks');
    
    if (totalStarsEl) totalStarsEl.textContent = totalStars;
    if (totalForksEl) totalForksEl.textContent = totalForks;
  } catch (error) {
    console.log('GitHub stats error:', error);
  }
}
fetchGitHubStats();

// ============================================================
// 21. NEWSLETTER SUBSCRIPTION
// ============================================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newsletterEmail = document.getElementById('newsletterEmail');
    const newsletterStatus = document.getElementById('newsletterStatus');
    
    if (!newsletterEmail || !newsletterStatus) return;
    
    const email = newsletterEmail.value.trim();
    if (!email) {
      newsletterStatus.textContent = '⚠️ Please enter your email';
      newsletterStatus.style.color = '#ef4444';
      return;
    }
    
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    if (subscribers.includes(email)) {
      newsletterStatus.textContent = '⚠️ Already subscribed!';
      newsletterStatus.style.color = '#f59e0b';
    } else {
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      newsletterStatus.textContent = '✅ Subscribed successfully! 🎉';
      newsletterStatus.style.color = '#22c55e';
      newsletterEmail.value = '';
    }
    setTimeout(() => {
      newsletterStatus.textContent = '';
    }, 3000);
  });
}

// ============================================================
// 22. SHARE PORTFOLIO
// ============================================================
function sharePortfolio() {
  if (navigator.share) {
    navigator.share({
      title: 'Rajnish Yadav | Java Full Stack Developer',
      text: 'Check out my portfolio!',
      url: window.location.href
    }).catch(() => {});
  } else {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  }
}

// ============================================================
// 23. PARTICLE BACKGROUND
// ============================================================
(function createParticles() {
  const container = document.querySelector('.hero-visual');
  if (!container) return;
  
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
  container.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  let width, height, particles = [];
  
  function resize() {
    const rect = container.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }
  
  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(width * height / 20000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${0.2 + Math.random() * 0.1})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  
  resize();
  initParticles();
  draw();
  
  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();

// ============================================================
// 24. RESUME UPLOAD & DOWNLOAD FUNCTIONALITY
// ============================================================

// --- Admin Access ---
const ADMIN_PASSWORD = 'admin123';

let isAdmin = localStorage.getItem('isAdmin') === 'true';

if (isAdmin) {
  const adminSection = document.getElementById('adminUploadSection');
  if (adminSection) adminSection.style.display = 'block';
}

// --- Toggle Upload Area ---
const toggleUploadBtn = document.getElementById('toggleUploadBtn');
const uploadArea = document.getElementById('uploadArea');

if (toggleUploadBtn && uploadArea) {
  toggleUploadBtn.addEventListener('click', function() {
    if (!isAdmin) {
      const password = prompt('Enter admin password to upload resume:');
      if (password === ADMIN_PASSWORD) {
        isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        document.getElementById('adminUploadSection').style.display = 'block';
        uploadArea.style.display = uploadArea.style.display === 'none' ? 'block' : 'none';
        this.textContent = uploadArea.style.display === 'none' ? '📤 Upload New Resume' : '❌ Close Upload';
      } else if (password !== null) {
        alert('Incorrect password!');
      }
    } else {
      uploadArea.style.display = uploadArea.style.display === 'none' ? 'block' : 'none';
      this.textContent = uploadArea.style.display === 'none' ? '📤 Upload New Resume' : '❌ Close Upload';
    }
  });
}

// --- File Upload with Drag & Drop ---
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('resumeFileInput');
const uploadStatus = document.getElementById('uploadStatus');

if (dropZone && fileInput) {
  dropZone.addEventListener('click', function(e) {
    if (e.target === this || e.target.closest('.upload-icon') || e.target.closest('p')) {
      fileInput.click();
    }
  });

  dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.classList.add('dragover');
  });

  dropZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
  });

  dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    this.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleResumeUpload(files[0]);
    }
  });

  fileInput.addEventListener('change', function() {
    if (this.files.length > 0) {
      handleResumeUpload(this.files[0]);
    }
  });
}

function handleResumeUpload(file) {
  const uploadStatus = document.getElementById('uploadStatus');
  if (!uploadStatus) return;

  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!validTypes.includes(file.type)) {
    uploadStatus.textContent = '❌ Please upload PDF, DOC, or DOCX file only!';
    uploadStatus.className = 'upload-status error';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    uploadStatus.textContent = '❌ File size must be less than 5MB!';
    uploadStatus.className = 'upload-status error';
    return;
  }

  uploadStatus.textContent = '⏳ Uploading...';
  uploadStatus.className = 'upload-status loading';

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const resumeData = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        data: e.target.result
      };
      
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      
      uploadStatus.textContent = '✅ Resume uploaded successfully! 🎉';
      uploadStatus.className = 'upload-status success';
      
      updateResumeInfo(resumeData);
      updateDownloadLink(resumeData);
      
      if (fileInput) fileInput.value = '';
      
      setTimeout(() => {
        uploadStatus.textContent = '';
        uploadStatus.className = 'upload-status';
      }, 4000);
      
    } catch (error) {
      uploadStatus.textContent = '❌ Failed to upload. Please try again.';
      uploadStatus.className = 'upload-status error';
      console.error('Upload error:', error);
    }
  };
  
  reader.onerror = function() {
    uploadStatus.textContent = '❌ Failed to read file. Please try again.';
    uploadStatus.className = 'upload-status error';
  };
  
  reader.readAsDataURL(file);
}

function updateResumeInfo(resumeData) {
  const fileNameEl = document.getElementById('resumeFileName');
  const fileSizeEl = document.getElementById('resumeFileSize');
  const currentResumeInfo = document.getElementById('currentResumeInfo');
  
  if (fileNameEl) {
    fileNameEl.textContent = resumeData.name || 'Resume.pdf';
  }
  
  if (fileSizeEl) {
    const size = resumeData.size || 0;
    if (size > 0) {
      const sizeStr = size > 1024 * 1024 
        ? (size / (1024 * 1024)).toFixed(2) + ' MB'
        : (size / 1024).toFixed(2) + ' KB';
      fileSizeEl.textContent = `📅 Uploaded: ${new Date().toLocaleDateString()} | 📦 Size: ${sizeStr}`;
    } else {
      fileSizeEl.textContent = 'Uploaded: Not available';
    }
  }
  
  if (currentResumeInfo) {
    currentResumeInfo.style.display = 'flex';
  }
}

function updateDownloadLink(resumeData) {
  const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #downloadUploadedBtn');
  if (downloadBtns.length > 0) {
    try {
      const byteCharacters = atob(resumeData.data.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: resumeData.type || 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);
      
      downloadBtns.forEach(btn => {
        btn.href = blobUrl;
        btn.download = resumeData.name || 'Resume.pdf';
      });
    } catch (error) {
      console.error('Error creating blob URL:', error);
    }
  }
}

function loadSavedResume() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    try {
      const resumeData = JSON.parse(savedData);
      updateResumeInfo(resumeData);
      updateDownloadLink(resumeData);
    } catch (error) {
      console.error('Error loading saved resume:', error);
    }
  }
}

const deleteResumeBtn = document.getElementById('deleteResumeBtn');
if (deleteResumeBtn) {
  deleteResumeBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to delete the uploaded resume?')) {
      localStorage.removeItem('resumeData');
      
      const fileNameEl = document.getElementById('resumeFileName');
      const fileSizeEl = document.getElementById('resumeFileSize');
      const currentResumeInfo = document.getElementById('currentResumeInfo');
      
      if (fileNameEl) fileNameEl.textContent = 'Resume.pdf';
      if (fileSizeEl) fileSizeEl.textContent = 'Uploaded: Not available';
      if (currentResumeInfo) currentResumeInfo.style.display = 'none';
      
      const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #downloadUploadedBtn');
      downloadBtns.forEach(btn => {
        btn.href = 'Resume.pdf';
        btn.download = 'Resume.pdf';
      });
      
      const status = document.getElementById('uploadStatus');
      if (status) {
        status.textContent = '🗑️ Resume deleted successfully!';
        status.className = 'upload-status success';
        setTimeout(() => {
          status.textContent = '';
          status.className = 'upload-status';
        }, 3000);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  loadSavedResume();
  
  const savedData = localStorage.getItem('resumeData');
  const currentResumeInfo = document.getElementById('currentResumeInfo');
  if (!savedData && currentResumeInfo) {
    currentResumeInfo.style.display = 'none';
  }
});

// ============================================================
// 25. CONSOLE GREETING
// ============================================================
console.log('%c🚀 Rajnish Yadav Portfolio', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c👨‍💻 Built with ❤️ using HTML, CSS & Vanilla JS', 'font-size: 14px; color: #94a3b8;');
console.log('%c🔍 Press Ctrl+K to search', 'font-size: 12px; color: #64748b;');
console.log('%c📄 Resume Upload: Click "Upload New Resume" (Password: admin123)', 'font-size: 12px; color: #22c55e;');
console.log('%c📱 Fully Responsive on Mobile, Tablet & Desktop', 'font-size: 12px; color: #f59e0b;');
console.log('%c📧 Contact: rajnishyadav1242@gmail.com', 'font-size: 12px; color: #64748b;');
console.log('✅ All features loaded successfully!');
