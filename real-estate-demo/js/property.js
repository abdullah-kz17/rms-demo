(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const property = PROPERTIES.find((p) => p.id === id) || PROPERTIES[0];
  const pdMain = document.getElementById('pdMain');
  if (!pdMain) return;

  const fmt = (n) => n.toLocaleString('en-US');
  const isRent = property.status === 'For Rent';
  const images = property.images && property.images.length ? property.images : [property.image];

  document.title = `${property.name} — Estoria Realty`;
  document.getElementById('breadcrumbName').textContent = property.name;

  pdMain.innerHTML = `
    <div class="pd-gallery-main reveal">
      <img id="pdMainImage" src="${images[0]}" alt="${property.name}">
      <span class="pd-gallery-badge${isRent ? ' rent' : ''}">${property.status}</span>
    </div>
    <div class="pd-thumbs" id="pdThumbs">
      ${images.map((img, i) => `<button type="button" class="pd-thumb${i === 0 ? ' active' : ''}" data-img="${img}"><img src="${img}" alt="${property.name} view ${i + 1}"></button>`).join('')}
    </div>

    <div class="pd-header reveal">
      <div>
        <h1>${property.name}</h1>
        <p><i class="fa-solid fa-location-dot"></i> ${property.location}</p>
      </div>
      <div class="pd-price-block">
        <div class="pd-price">$${fmt(property.price)}${property.priceSuffix ? `<span>${property.priceSuffix}</span>` : ''}</div>
      </div>
    </div>

    <div class="pd-meta-row reveal">
      <div class="pd-meta-item"><i class="fa-solid fa-bed"></i><div><strong>${property.beds}</strong><span>Bedrooms</span></div></div>
      <div class="pd-meta-item"><i class="fa-solid fa-bath"></i><div><strong>${property.baths}</strong><span>Bathrooms</span></div></div>
      <div class="pd-meta-item"><i class="fa-solid fa-ruler-combined"></i><div><strong>${fmt(property.sqft)}</strong><span>Sqft</span></div></div>
      ${property.garages ? `<div class="pd-meta-item"><i class="fa-solid fa-car"></i><div><strong>${property.garages}</strong><span>Garages</span></div></div>` : ''}
    </div>

    <div class="pd-section reveal">
      <h3>Overview</h3>
      <p>${property.description}</p>
    </div>

    <div class="pd-section reveal">
      <h3>Features &amp; Amenities</h3>
      <div class="pd-features-grid">
        ${property.features.map((f) => `<div class="pd-feature-item"><i class="fa-solid fa-check-circle"></i> ${f}</div>`).join('')}
      </div>
    </div>

    <div class="pd-section reveal">
      <h3>Location</h3>
      <div class="pd-map-embed">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80" alt="Map of ${property.location}">
        <span class="map-pin-center"><i class="fa-solid fa-location-dot"></i></span>
      </div>
    </div>
  `;

  document.querySelectorAll('#pdMain .reveal').forEach((el) => revealObserver.observe(el));

  // Gallery thumbnails
  const mainImage = document.getElementById('pdMainImage');
  document.querySelectorAll('.pd-thumb').forEach((thumb) => {
    thumb.addEventListener('click', () => {
      mainImage.src = thumb.dataset.img;
      document.querySelectorAll('.pd-thumb').forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // Agent card
  document.getElementById('agentImage').src = property.agent.image;
  document.getElementById('agentImage').alt = property.agent.name;
  document.getElementById('agentName').textContent = property.agent.name;
  document.getElementById('agentRole').textContent = property.agent.role;
  const agentPhone = document.getElementById('agentPhone');
  agentPhone.href = `tel:${property.agent.phone.replace(/\s+/g, '')}`;
  agentPhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${property.agent.phone}`;

  // Related listings — same status first, backfilled with others
  const related = PROPERTIES.filter((p) => p.id !== property.id && p.status === property.status);
  const fillers = PROPERTIES.filter((p) => p.id !== property.id && p.status !== property.status);
  const relatedProperties = [...related, ...fillers].slice(0, 3);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    relatedProperties.forEach((p, i) => {
      const card = document.createElement('a');
      card.href = `property.html?id=${p.id}`;
      card.className = `property-card reveal stagger-${i + 1}`;
      card.innerHTML = `
        <div class="property-media">
          <img src="${p.image}" alt="${p.name}">
          <span class="property-badge${p.status === 'For Rent' ? ' property-badge-rent' : ''}">${p.status}</span>
        </div>
        <div class="property-body">
          <div class="property-price">$${fmt(p.price)}${p.priceSuffix ? `<span>${p.priceSuffix}</span>` : ''}</div>
          <h3>${p.name}</h3>
          <p><i class="fa-solid fa-location-dot"></i> ${p.location}</p>
          <div class="property-meta"><span><i class="fa-solid fa-bed"></i> ${p.beds} Beds</span><span><i class="fa-solid fa-bath"></i> ${p.baths} Baths</span><span><i class="fa-solid fa-ruler-combined"></i> ${fmt(p.sqft)} sqft</span></div>
        </div>
      `;
      relatedGrid.appendChild(card);
      revealObserver.observe(card);
      applyTiltEffect(card);
    });
  }

  // Mortgage calculator
  const mcPrice = document.getElementById('mcPrice');
  const mcDown = document.getElementById('mcDown');
  const mcRate = document.getElementById('mcRate');
  const mcTerm = document.getElementById('mcTerm');
  const mcResult = document.getElementById('mcResult');
  function calcMortgage() {
    const principal = Math.max(0, (parseFloat(mcPrice.value) || 0) - (parseFloat(mcDown.value) || 0));
    const monthlyRate = (parseFloat(mcRate.value) || 0) / 100 / 12;
    const numPayments = (parseFloat(mcTerm.value) || 0) * 12;
    if (principal <= 0 || numPayments <= 0) { mcResult.textContent = '$0'; return; }
    const payment = monthlyRate === 0
      ? principal / numPayments
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    mcResult.textContent = `$${Math.round(payment).toLocaleString('en-US')}`;
  }
  if (mcPrice) {
    mcPrice.value = property.price > 100000 ? property.price : 500000;
    mcDown.value = Math.round((mcPrice.value * 0.2) / 1000) * 1000;
    [mcPrice, mcDown, mcRate, mcTerm].forEach((el) => el.addEventListener('input', calcMortgage));
    calcMortgage();
  }
})();
