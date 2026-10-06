/* ==========================================================================
   SHAIK MOUSHIK - MAIN CONTROLLER JAVASCRIPT
   Handles Typewriter, Modals, Theme Toggle, Smooth Scroll, Form, and Toasts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. SCROLL PROGRESS BAR
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Back to top button visibility
    const bttBtn = document.getElementById('back-to-top');
    if (bttBtn) {
      if (window.scrollY > 400) {
        bttBtn.classList.add('show');
      } else {
        bttBtn.classList.remove('show');
      }
    }
  });

  // 2. BACK TO TOP
  const bttBtn = document.getElementById('back-to-top');
  if (bttBtn) {
    bttBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. THEME TOGGLE (DARK / LIGHT)
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateThemeIcon('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      if (activeTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
        showToast('Switched to Dark Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
        showToast('Switched to Light Mode');
      }
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
  }

  // 4. MOBILE NAVIGATION DRAWER
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      mobileToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // 5. TYPEWRITER EFFECT
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = [
    'Full Stack & Backend Developer',
    'Applied AI & Machine Learning Practitioner',
    'Spring Boot, React & Flask Engineer',
    'Cloud-Native Builder with AWS & SQL'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeEffect() {
    if (!typewriterText) return;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of text
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before typing new text
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // 6. PROJECTS FILTER TABS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 7. SKILL BARS ON SCROLL (INTERSECTION OBSERVER)
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width') || '85%';
        entry.target.style.width = width;
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // 8. TOAST NOTIFICATION UTILITY
  window.showToast = function (message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 9. COPY-TO-CLIPBOARD HELPER
  window.copyText = function (text, label) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${label} to clipboard!`);
  }

  // 10. MODAL HANDLING
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Run initial simulator update if relevant
      if (modalId === 'modal-crop') {
        if (typeof runCropPredictor === 'function') runCropPredictor();
      } else if (modalId === 'modal-sleep') {
        if (typeof runSleepClassifier === 'function') runSleepClassifier();
      }
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // Close modals on clicking overlay or pressing ESC
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(modal => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  // 11. PRINT RESUME
  window.printResume = function () {
    window.print();
  };

  // 12. CONTACT FORM SUBMISSION HANDLER
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value.trim();
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Provide instant feedback
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>⏳ Sending...</span>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>✔ Message Sent!</span>';
        showToast('Thank you! Your message was sent successfully.');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 900);
    });
  }

  // 13. ACTIVE NAVIGATION LINK ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  });
});
