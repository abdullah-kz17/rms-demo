(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);
  const doctor = DOCTORS.find((d) => d.id === id) || DOCTORS[0];
  const grid = document.getElementById('profileGrid');
  if (!grid) return;

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  document.title = `${doctor.name} — Wellspring Medical Center`;
  document.getElementById('breadcrumbName').textContent = doctor.name;

  grid.innerHTML = `
    <div class="profile-card reveal-left">
      <div class="profile-photo"><img src="${doctor.image}" alt="${doctor.name}"></div>
      <div class="profile-card-body">
        <h1>${doctor.name}</h1>
        <span class="profile-specialty">${doctor.specialty}</span>
        <div class="profile-rating"><span class="stars">${starsMarkup(doctor.rating)}</span> ${doctor.rating} (${doctor.reviewCount} reviews)</div>
        <div class="profile-quick-list">
          <div><i class="fa-solid fa-graduation-cap"></i> ${doctor.qualifications}</div>
          <div><i class="fa-solid fa-briefcase-medical"></i> ${doctor.experience}+ Years Experience</div>
          <div><i class="fa-solid fa-language"></i> ${doctor.languages.join(', ')}</div>
          <div><i class="fa-solid fa-clock"></i> ${doctor.hours}</div>
        </div>
        <div class="profile-fee"><span>Consultation Fee</span><strong>PKR ${doctor.fee.toLocaleString('en-US')}</strong></div>
        <div class="profile-book-cta">
          <a href="booking.html?doctor=${doctor.id}" class="btn btn-primary btn-block">Book Appointment</a>
        </div>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section reveal-right">
        <h2>About ${doctor.name}</h2>
        <p>${doctor.bio}</p>
      </div>

      <div class="profile-section reveal-right">
        <h2>Areas Of Expertise</h2>
        <div class="tag-row">${doctor.expertise.map((e) => `<span class="tag-pill">${e}</span>`).join('')}</div>
      </div>

      <div class="profile-section reveal-right">
        <h2>Education &amp; Certifications</h2>
        <ul class="info-list">
          ${doctor.education.map((e) => `<li><i class="fa-solid fa-graduation-cap"></i> ${e}</li>`).join('')}
          ${doctor.certifications.map((c) => `<li><i class="fa-solid fa-certificate"></i> ${c}</li>`).join('')}
        </ul>
      </div>

      <div class="profile-section reveal-right">
        <h2>Availability</h2>
        <p>Consultations held ${doctor.hours}.</p>
        <div class="days-row">
          ${allDays.map((d) => `<span class="day-chip${doctor.days.includes(d) ? ' available' : ''}">${d}</span>`).join('')}
        </div>
      </div>

      <div class="profile-section reveal-right">
        <h2>Patient Reviews</h2>
        ${doctor.reviews.map((r) => `
          <div class="review-item">
            <div class="stars">${starsMarkup(r.rating)}</div>
            <p>"${r.text}"</p>
            <strong>${r.name}</strong>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.querySelectorAll('.profile-card, .profile-section').forEach((el) => revealObserver.observe(el));

  // Related doctors — same department first, backfilled with others
  const related = DOCTORS.filter((d) => d.id !== doctor.id && d.department === doctor.department);
  const fillers = DOCTORS.filter((d) => d.id !== doctor.id && d.department !== doctor.department);
  const relatedDoctors = [...related, ...fillers].slice(0, 4);
  const relatedGrid = document.getElementById('relatedDoctorsGrid');
  relatedDoctors.forEach((d) => relatedGrid.appendChild(renderDoctorCard(d)));
})();
