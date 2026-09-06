// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');
function openNav() { navLinks.classList.add('open'); navOverlay.classList.add('open'); }
function closeNav() { navLinks.classList.remove('open'); navOverlay.classList.remove('open'); }
navToggle.addEventListener('click', () => (navLinks.classList.contains('open') ? closeNav() : openNav()));
navOverlay.addEventListener('click', closeNav);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
document.querySelectorAll('.nav-links > a').forEach((link) => {
  link.addEventListener('click', closeNav);
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

// Back to top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Sticky header state + bounded parallax, batched into one rAF scroll handler
const header = document.getElementById('siteHeader');
const parallaxEls = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let ticking = false;

const footerEl = document.querySelector('.site-footer');
function dockBackToTopAboveFooter() {
  if (!backToTop || !footerEl) return;
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
  if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
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

// Cart state (in-memory, resets on reload — no backend in this demo)
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
function updateCartCount() {
  if (cartCountEl) cartCountEl.textContent = cartCount;
}

// Toast
let toastEl = document.querySelector('.toast');
if (!toastEl) {
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.innerHTML = '<i class="fa-solid fa-circle-check"></i><span></span>';
  document.body.appendChild(toastEl);
}
let toastTimer = null;
function showToast(message) {
  toastEl.querySelector('span').textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

// Star rating markup
function starsMarkup(rating) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  let html = '';
  for (let i = 0; i < full; i++) html += '<i class="fa-solid fa-star"></i>';
  if (half) html += '<i class="fa-solid fa-star-half-stroke"></i>';
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) html += '<i class="fa-regular fa-star"></i>';
  return html;
}

// Product card renderer — shared markup used across every grid on the page
// Tilt effect on hover — applied directly to cards as they're created, so it
// works regardless of whether a card exists at page load or is added later by
// another script (product detail page's related-products grid, etc.)
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function applyTiltEffect(card) {
  if (!canHover) return;
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
}

function renderProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card-wrap';
  card.innerHTML = `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-media">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <button type="button" class="product-wishlist" aria-label="Add to wishlist"><i class="fa-regular fa-heart"></i></button>
      </div>
      <div class="product-body">
        <span class="product-cat">${product.category}</span>
        <h3>${product.name}</h3>
        <div class="product-rating">${starsMarkup(product.rating)} <span>(${product.reviews})</span></div>
        <div class="product-price-row">
          <div><span class="product-price">$${product.price}</span>${product.oldPrice ? `<span class="product-price-old">$${product.oldPrice}</span>` : ''}</div>
          <button type="button" class="add-to-cart" aria-label="Add ${product.name} to cart"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </a>
  `;
  const wishlistBtn = card.querySelector('.product-wishlist');
  wishlistBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    wishlistBtn.classList.toggle('active');
    wishlistBtn.innerHTML = wishlistBtn.classList.contains('active')
      ? '<i class="fa-solid fa-heart"></i>'
      : '<i class="fa-regular fa-heart"></i>';
    showToast(wishlistBtn.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist');
  });
  const addBtn = card.querySelector('.add-to-cart');
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    cartCount += 1;
    updateCartCount();
    addBtn.classList.add('added');
    addBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    showToast(`${product.name} added to cart`);
    setTimeout(() => {
      addBtn.classList.remove('added');
      addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    }, 1200);
  });
  const productCard = card.firstElementChild;
  applyTiltEffect(productCard);
  return productCard;
}

function renderGrid(containerId, products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  products.forEach((product) => container.appendChild(renderProductCard(product)));
}

if (typeof PRODUCTS !== 'undefined') {
  renderGrid('featuredGrid', PRODUCTS.filter((p) => p.tags.includes('featured')).slice(0, 8));
  renderGrid('newArrivalsGrid', PRODUCTS.filter((p) => p.tags.includes('new')).slice(0, 4));
  renderGrid('bestSellersGrid', PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 4));
  renderGrid('dealsGrid', PRODUCTS.filter((p) => p.tags.includes('deal')).slice(0, 4));
}

// Flash sale countdown — resets to a fresh 2-day window each page load (demo only)
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const target = Date.now() + 1000 * 60 * 60 * 47 + 1000 * 60 * 32;
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');
  function tick() {
    const remaining = Math.max(0, target - Date.now());
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
}

// Newsletter form — simulated submit, no backend
const ctaNewsletter = document.getElementById('ctaNewsletter');
if (ctaNewsletter) {
  ctaNewsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!ctaNewsletter.checkValidity()) {
      ctaNewsletter.reportValidity();
      return;
    }
    const btn = ctaNewsletter.querySelector('button');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      ctaNewsletter.reset();
      const successEl = document.getElementById('ctaSuccess');
      if (successEl) {
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 800);
  });
}

// Magnetic buttons — skipped for touch/coarse pointers and reduced-motion preference
if (canHover) {
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
}
