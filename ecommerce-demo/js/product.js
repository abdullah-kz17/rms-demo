(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  const container = document.getElementById('productDetail');
  if (!container) return;

  document.title = `${product.name} — Nuvora`;
  document.getElementById('breadcrumbCategory').textContent = product.category;
  document.getElementById('breadcrumbName').textContent = product.name;

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;
  const images = product.images && product.images.length ? product.images : [product.image];

  container.innerHTML = `
    <div class="pd-gallery reveal-left">
      <div class="pd-gallery-main"><img id="pdMainImage" src="${images[0]}" alt="${product.name}"></div>
      <div class="pd-thumbs" id="pdThumbs">
        ${images.map((img, i) => `<button type="button" class="pd-thumb${i === 0 ? ' active' : ''}" data-img="${img}"><img src="${img}" alt="${product.name} view ${i + 1}"></button>`).join('')}
      </div>
    </div>
    <div class="pd-info reveal-right">
      <span class="pd-cat">${product.category}</span>
      <h1>${product.name}</h1>
      <div class="pd-rating-row">
        <span class="stars">${starsMarkup(product.rating)}</span>
        <span>${product.rating.toFixed(1)} (${product.reviews} reviews)</span>
      </div>
      <div class="pd-price-row">
        <span class="pd-price">$${product.price}</span>
        ${product.oldPrice ? `<span class="pd-price-old">$${product.oldPrice}</span><span class="pd-badge-save">Save ${discount}%</span>` : ''}
      </div>
      <p class="pd-desc">${product.description}</p>
      ${product.sizes ? `
      <div class="pd-option-group">
        <h4>Size</h4>
        <div class="pd-sizes" id="pdSizes">
          ${product.sizes.map((s, i) => `<button type="button" class="pd-size-btn${i === 0 ? ' active' : ''}" data-size="${s}">${s}</button>`).join('')}
        </div>
      </div>` : ''}
      <div class="pd-qty-row">
        <div class="pd-qty">
          <button type="button" id="pdQtyMinus" aria-label="Decrease quantity">-</button>
          <span id="pdQtyValue">1</span>
          <button type="button" id="pdQtyPlus" aria-label="Increase quantity">+</button>
        </div>
        <span class="pd-stock"><i class="fa-solid fa-circle-check"></i> In Stock</span>
      </div>
      <div class="pd-actions">
        <button type="button" class="btn btn-primary" id="pdAddToCart"><i class="fa-solid fa-bag-shopping"></i> Add To Cart</button>
        <button type="button" class="pd-wishlist-btn" id="pdWishlist" aria-label="Add to wishlist"><i class="fa-regular fa-heart"></i></button>
      </div>
      <div class="pd-trust-mini">
        <div><i class="fa-solid fa-truck-fast"></i> Free shipping on orders over $75</div>
        <div><i class="fa-solid fa-rotate-left"></i> 30-day easy returns</div>
        <div><i class="fa-solid fa-lock"></i> Secure checkout, every order</div>
      </div>
      <div class="pd-tabs">
        <div class="pd-tab-buttons">
          <button type="button" class="pd-tab-btn active" data-tab="features">Details</button>
          <button type="button" class="pd-tab-btn" data-tab="reviews">Reviews (${product.reviews})</button>
        </div>
        <div class="pd-tab-panel active" data-tab-panel="features">
          <ul>${(product.features || []).map((f) => `<li>${f}</li>`).join('')}</ul>
        </div>
        <div class="pd-tab-panel" data-tab-panel="reviews">
          <p>${product.rating.toFixed(1)} out of 5 based on ${product.reviews} verified reviews. Reviews load here in the full store build.</p>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll('.pd-gallery, .pd-info').forEach((el) => revealObserver.observe(el));

  // Gallery thumbnails
  const mainImage = document.getElementById('pdMainImage');
  document.querySelectorAll('.pd-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.img;
      document.querySelectorAll('.pd-thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Size selection
  document.querySelectorAll('.pd-size-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pd-size-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Quantity stepper
  let qty = 1;
  const qtyValue = document.getElementById('pdQtyValue');
  document.getElementById('pdQtyMinus').addEventListener('click', () => {
    qty = Math.max(1, qty - 1);
    qtyValue.textContent = qty;
  });
  document.getElementById('pdQtyPlus').addEventListener('click', () => {
    qty = Math.min(10, qty + 1);
    qtyValue.textContent = qty;
  });

  // Wishlist toggle
  const wishlistBtn = document.getElementById('pdWishlist');
  wishlistBtn.addEventListener('click', () => {
    wishlistBtn.classList.toggle('active');
    wishlistBtn.innerHTML = wishlistBtn.classList.contains('active')
      ? '<i class="fa-solid fa-heart"></i>'
      : '<i class="fa-regular fa-heart"></i>';
    showToast(wishlistBtn.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist');
  });

  // Add to cart
  document.getElementById('pdAddToCart').addEventListener('click', () => {
    cartCount += qty;
    updateCartCount();
    showToast(`${qty} × ${product.name} added to cart`);
  });

  // Tabs
  document.querySelectorAll('.pd-tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pd-tab-btn').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.pd-tab-panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.pd-tab-panel[data-tab-panel="${btn.dataset.tab}"]`).classList.add('active');
    });
  });

  // Related products — same category first, backfilled with other products
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
  const fillers = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  const relatedProducts = [...related, ...fillers].slice(0, 4);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) relatedProducts.forEach((p) => relatedGrid.appendChild(renderProductCard(p)));
})();
