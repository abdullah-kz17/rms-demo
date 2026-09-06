// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
function openNav() { navLinks.classList.add('open'); navOverlay.classList.add('open'); }
function closeNav() { navLinks.classList.remove('open'); navOverlay.classList.remove('open'); }
navToggle.addEventListener('click', () => (navLinks.classList.contains('open') ? closeNav() : openNav()));
navOverlay.addEventListener('click', closeNav);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

// Back to top + footer docking, batched into one rAF scroll handler
const backToTop = document.getElementById('backToTop');
const footerEl = document.querySelector('.site-footer');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

function dockBackToTopAboveFooter() {
  if (!footerEl) return;
  const overlap = window.innerHeight - footerEl.getBoundingClientRect().top;
  if (overlap > -26) {
    backToTop.style.position = 'absolute';
    backToTop.style.top = `${footerEl.offsetTop - 74}px`;
    backToTop.style.bottom = 'auto';
  } else {
    backToTop.style.position = 'fixed';
    backToTop.style.top = 'auto';
    backToTop.style.bottom = '26px';
  }
}

function onScroll() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
  dockBackToTopAboveFooter();
  if (!prefersReducedMotion) {
    parallaxEls.forEach((el) => {
      const parent = el.parentElement;
      const rect = parent.getBoundingClientRect();
      const offset = rect.top * -0.15;
      el.style.transform = `translateY(${offset}px)`;
    });
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Scroll reveal animations
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
);
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => revealObserver.observe(el));

// Testimonial slider
const slider = document.querySelector('.testimonial-slider');
if (slider) {
  const track = slider.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsWrap = slider.querySelector('.slider-dots');
  let current = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAutoplay() { autoplayTimer = setInterval(next, 6000); }
  function stopAutoplay() { clearInterval(autoplayTimer); }

  nextBtn.addEventListener('click', () => { next(); stopAutoplay(); startAutoplay(); });
  prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); startAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? prev() : next();
      stopAutoplay();
      startAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((i) => {
      i.classList.remove('open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// Treatment selector (wow section)
const TREATMENT_RESULTS = {
  whiter: {
    icon: 'fa-sun',
    title: 'Teeth Whitening',
    desc: 'Professional in-office whitening lifts years of staining in a single visit — safe, effective and supervised by a dentist throughout.',
    cta: 'View Whitening Packages'
  },
  missing: {
    icon: 'fa-screwdriver-wrench',
    title: 'Dental Implants',
    desc: 'A permanent, natural-looking replacement for missing teeth that restores full chewing function and confidence in your smile.',
    cta: 'Book Implant Consultation'
  },
  straighten: {
    icon: 'fa-teeth',
    title: 'Braces & Invisalign',
    desc: 'Whether you prefer traditional braces or nearly invisible clear aligners, we\'ll build a straightening plan around your lifestyle.',
    cta: 'Book Orthodontic Consultation'
  },
  general: {
    icon: 'fa-tooth',
    title: 'General Dentistry',
    desc: 'Routine checkups, cleanings and fillings to catch issues early and keep your whole family\'s smile healthy year-round.',
    cta: 'Book A Checkup'
  }
};
const selectorChips = document.getElementById('selectorChips');
const selectorResult = document.getElementById('selectorResult');
function renderSelectorResult(goal) {
  const data = TREATMENT_RESULTS[goal];
  if (!selectorResult || !data) return;
  selectorResult.innerHTML = `
    <div class="selector-result-icon"><i class="fa-solid ${data.icon}"></i></div>
    <div>
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      <a href="#appointment" class="btn btn-primary">${data.cta} <i class="fa-solid fa-arrow-right"></i></a>
    </div>
  `;
}
if (selectorChips) {
  selectorChips.querySelectorAll('.selector-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      selectorChips.querySelectorAll('.selector-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderSelectorResult(chip.dataset.goal);
    });
  });
  renderSelectorResult('whiter');
}

// Before / after comparison slider (drag or touch to reveal)
const baSlider = document.getElementById('baSlider');
if (baSlider) {
  const baBefore = document.getElementById('baBefore');
  const baDivider = document.getElementById('baDivider');
  const baImg = baBefore.querySelector('img');
  let dragging = false;

  function setPosition(clientX) {
    const rect = baSlider.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    baBefore.style.width = `${pct}%`;
    baDivider.style.left = `${pct}%`;
    baImg.style.width = `${rect.width}px`;
  }

  function resizeBaImage() {
    const rect = baSlider.getBoundingClientRect();
    baImg.style.width = `${rect.width}px`;
  }
  resizeBaImage();
  window.addEventListener('resize', resizeBaImage);

  baSlider.addEventListener('mousedown', (e) => { dragging = true; setPosition(e.clientX); });
  window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });

  baSlider.addEventListener('touchstart', (e) => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
  baSlider.addEventListener('touchmove', (e) => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
  baSlider.addEventListener('touchend', () => { dragging = false; });
}

// Appointment form — simulated submit, no backend
const appointmentForm = document.getElementById('appointmentForm');
if (appointmentForm) {
  const submitBtn = appointmentForm.querySelector('.appointment-submit');
  const successMsg = document.getElementById('appointmentSuccess');
  appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!appointmentForm.checkValidity()) {
      appointmentForm.reportValidity();
      return;
    }
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successMsg.hidden = false;
      appointmentForm.reset();
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
}

// Magnetic buttons + tilt cards — skipped for touch/coarse pointers and reduced-motion preference
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const magnetStrength = 14;
  document.querySelectorAll('.btn-primary, .btn-outline').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      btn.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  document.querySelectorAll('.treatment-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = 'none';
      card.style.transform = `perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
      card.style.transform = '';
    });
  });
}
