// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links > a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-links > a').forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    navLinks.classList.remove('open');
  });
});

// Nav dropdown (Categories)
const navDropdown = document.querySelector('.nav-dropdown');
const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
navDropdownToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = navDropdown.classList.toggle('open');
  navDropdownToggle.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (e) => {
  if (!navDropdown.contains(e.target)) {
    navDropdown.classList.remove('open');
    navDropdownToggle.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navDropdown.classList.remove('open');
    navDropdownToggle.setAttribute('aria-expanded', 'false');
  }
});

// Search panel toggle
const searchToggle = document.getElementById('searchToggle');
const searchClose = document.getElementById('searchClose');
const searchPanel = document.getElementById('searchPanel');
searchToggle.addEventListener('click', () => {
  searchPanel.classList.toggle('open');
  if (searchPanel.classList.contains('open')) searchPanel.querySelector('input').focus();
});
searchClose.addEventListener('click', () => searchPanel.classList.remove('open'));
document.getElementById('searchForm').addEventListener('submit', (e) => e.preventDefault());

// Back to top
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Sticky header + bounded parallax, batched into one rAF scroll handler
const header = document.getElementById('siteHeader');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

const footerEl = document.querySelector('.site-footer');
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
  header.classList.toggle('scrolled', window.scrollY > 40);
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

// Popular / Trending posts carousel
const trendingTrack = document.getElementById('trendingTrack');
if (trendingTrack) {
  const cards = Array.from(trendingTrack.children);
  const dotsWrap = document.getElementById('trendingDots');
  const prevBtn = document.querySelector('.trending-prev');
  const nextBtn = document.querySelector('.trending-next');
  const getPerView = () => (window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3);
  let index = 0;

  function maxIndex() { return Math.max(0, cards.length - getPerView()); }
  function render() {
    const gap = parseFloat(getComputedStyle(trendingTrack).columnGap || getComputedStyle(trendingTrack).gap || '0');
    const step = cards[0].getBoundingClientRect().width + gap;
    trendingTrack.style.transform = `translateX(-${index * step}px)`;
    dotsWrap.innerHTML = '';
    const dotCount = maxIndex() + 1;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === index) dot.classList.add('active');
      dot.addEventListener('click', () => { index = i; render(); });
      dotsWrap.appendChild(dot);
    }
  }
  function next() { index = index >= maxIndex() ? 0 : index + 1; render(); }
  function prev() { index = index <= 0 ? maxIndex() : index - 1; render(); }

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  window.addEventListener('resize', () => { index = Math.min(index, maxIndex()); render(); });
  render();
}

// Newsletter forms (sidebar + CTA banner) — simulated submit, no backend
function wireNewsletterForm(formId, { successEl } = {}) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Joining...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      form.reset();
      if (successEl) {
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  });
}
wireNewsletterForm('sidebarNewsletter');
wireNewsletterForm('ctaNewsletter', { successEl: document.getElementById('ctaSuccess') });

// Magnetic buttons + tilt cards — skipped for touch/coarse pointers and reduced-motion preference
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const magnetStrength = 14;
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-outline-light').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      btn.style.transform = `translate(${x * magnetStrength}px, ${y * magnetStrength}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  document.querySelectorAll('.post-card').forEach((card) => {
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
