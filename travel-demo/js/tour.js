(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const tour = TOURS.find((t) => t.id === id) || TOURS[0];
  const pdMain = document.getElementById('pdMain');
  if (!pdMain) return;

  const fmt = (n) => n.toLocaleString('en-US');
  const images = tour.images && tour.images.length ? tour.images : [tour.image];

  document.title = `${tour.name} — Aventra Travel`;
  document.getElementById('breadcrumbName').textContent = tour.name;

  pdMain.innerHTML = `
    <div class="pd-gallery-main reveal">
      <img id="pdMainImage" src="${images[0]}" alt="${tour.name}">
      <span class="pd-gallery-badge">${tour.category}</span>
    </div>
    <div class="pd-thumbs" id="pdThumbs">
      ${images.map((img, i) => `<button type="button" class="pd-thumb${i === 0 ? ' active' : ''}" data-img="${img}"><img src="${img}" alt="${tour.name} view ${i + 1}"></button>`).join('')}
    </div>

    <div class="pd-header reveal">
      <div>
        <h1>${tour.name}</h1>
        <p><i class="fa-solid fa-location-dot"></i> ${tour.destination}</p>
      </div>
      <div class="pd-price-block">
        <div class="pd-price">$${fmt(tour.price)}<span>${tour.priceSuffix}</span></div>
        <div class="pd-rating"><i class="fa-solid fa-star"></i> ${tour.rating} (${tour.reviews} reviews)</div>
      </div>
    </div>

    <div class="pd-meta-row reveal">
      <div class="pd-meta-item"><i class="fa-solid fa-calendar-days"></i><div><strong>${tour.duration}</strong><span>Days</span></div></div>
      <div class="pd-meta-item"><i class="fa-solid fa-user-group"></i><div><strong>${tour.groupSize}</strong><span>Group Size</span></div></div>
      <div class="pd-meta-item"><i class="fa-solid fa-compass"></i><div><strong>${tour.category}</strong><span>Trip Type</span></div></div>
      <div class="pd-meta-item"><i class="fa-solid fa-star"></i><div><strong>${tour.rating}</strong><span>Rating</span></div></div>
    </div>

    <div class="pd-section reveal">
      <h3>Overview</h3>
      <p>${tour.description}</p>
    </div>

    <div class="pd-section reveal">
      <h3>What's Included</h3>
      <div class="pd-features-grid">
        ${tour.includes.map((f) => `<div class="pd-feature-item"><i class="fa-solid fa-check-circle"></i> ${f}</div>`).join('')}
      </div>
    </div>

    <div class="pd-section reveal">
      <h3>Day-By-Day Itinerary</h3>
      <div class="itinerary-list">
        ${tour.itinerary.map((day) => `<div class="itinerary-item"><h4><span>Day ${day.day}</span>${day.title}</h4><p>${day.desc}</p></div>`).join('')}
      </div>
    </div>

    <div class="pd-section reveal">
      <h3>Where You'll Be</h3>
      <div class="pd-map-embed">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=900&q=80" alt="Map of ${tour.destination}">
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

  // Guide card
  document.getElementById('guideImage').src = tour.guide.image;
  document.getElementById('guideImage').alt = tour.guide.name;
  document.getElementById('guideName').textContent = tour.guide.name;
  document.getElementById('guideRole').textContent = tour.guide.role;
  const guidePhone = document.getElementById('guidePhone');
  guidePhone.href = `tel:${tour.guide.phone.replace(/\s+/g, '')}`;
  guidePhone.innerHTML = `<i class="fa-solid fa-phone"></i> ${tour.guide.phone}`;

  // Related tours — same category first, backfilled with others
  const related = TOURS.filter((t) => t.id !== tour.id && t.category === tour.category);
  const fillers = TOURS.filter((t) => t.id !== tour.id && t.category !== tour.category);
  const relatedTours = [...related, ...fillers].slice(0, 3);
  const relatedGrid = document.getElementById('relatedGrid');
  if (relatedGrid) {
    relatedTours.forEach((t, i) => {
      const card = document.createElement('a');
      card.href = `tour.html?id=${t.id}`;
      card.className = `package-card reveal stagger-${i + 1}`;
      card.innerHTML = `
        <div class="package-media">
          <img src="${t.image}" alt="${t.name}">
          <span class="package-badge">${t.category}</span>
          <span class="package-duration">${t.duration} Days</span>
        </div>
        <div class="package-body">
          <div class="package-price">$${fmt(t.price)}<span>${t.priceSuffix}</span></div>
          <h3>${t.name}</h3>
          <p><i class="fa-solid fa-location-dot"></i> ${t.destination}</p>
          <div class="package-meta"><span><i class="fa-solid fa-star"></i> ${t.rating} (${t.reviews})</span><span><i class="fa-solid fa-user-group"></i> ${t.groupSize}</span></div>
        </div>
      `;
      relatedGrid.appendChild(card);
      revealObserver.observe(card);
      applyTiltEffect(card);
    });
  }

  // Trip cost estimator
  const ccTravelers = document.getElementById('ccTravelers');
  const ccExtras = document.getElementById('ccExtras');
  const ccResult = document.getElementById('ccResult');
  function calcCost() {
    const travelers = Math.max(1, parseInt(ccTravelers.value, 10) || 1);
    const extras = Math.max(0, parseFloat(ccExtras.value) || 0);
    const total = tour.price * travelers + extras;
    ccResult.textContent = `$${Math.round(total).toLocaleString('en-US')}`;
  }
  if (ccTravelers) {
    ccTravelers.value = 2;
    ccExtras.value = 0;
    [ccTravelers, ccExtras].forEach((el) => el.addEventListener('input', calcCost));
    calcCost();
  }

  // Booking form prefill with trip name
  const askMessage = document.getElementById('ask-message');
  if (askMessage) askMessage.placeholder = `I'm interested in the ${tour.name}...`;
})();
