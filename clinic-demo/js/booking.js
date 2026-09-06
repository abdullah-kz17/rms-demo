(function () {
  const DEPT_ICONS = {
    'Cardiology': 'fa-heart-pulse',
    'Dermatology': 'fa-hand-dots',
    'Pediatrics': 'fa-child-reaching',
    'Orthopedics': 'fa-bone',
    'Gynecology': 'fa-person-dress',
    'ENT': 'fa-ear-listen',
    'General Medicine': 'fa-stethoscope',
    'Dental': 'fa-tooth'
  };
  const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM'];
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const state = { dept: null, doctorId: null, date: null, time: null };

  const wizardSteps = document.querySelectorAll('.wizard-step');
  const indicators = document.querySelectorAll('.wizard-step-indicator');
  const backBtn = document.getElementById('wizardBack');
  const nextBtn = document.getElementById('wizardNext');
  const wizardNav = document.getElementById('wizardNav');
  let currentStep = 1;

  function goToStep(step) {
    currentStep = step;
    wizardSteps.forEach((s) => s.classList.toggle('active', s.dataset.stepPanel == step));
    indicators.forEach((ind) => {
      const n = parseInt(ind.dataset.step, 10);
      ind.classList.toggle('active', n === step);
      ind.classList.toggle('done', n < step);
    });
    backBtn.hidden = step === 1;
    nextBtn.textContent = step === 6 ? 'Confirm Appointment' : 'Continue';
    updateNextState();
    document.querySelector('.wizard-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateNextState() {
    let valid = false;
    if (currentStep === 1) valid = !!state.dept;
    else if (currentStep === 2) valid = !!state.doctorId;
    else if (currentStep === 3) valid = !!state.date;
    else if (currentStep === 4) valid = !!state.time;
    else if (currentStep === 5) valid = validatePatientForm(false);
    else if (currentStep === 6) valid = true;
    nextBtn.disabled = !valid;
  }

  function validatePatientForm(showErrors) {
    const name = document.getElementById('p-name');
    const phone = document.getElementById('p-phone');
    const email = document.getElementById('p-email');
    const valid = name.value.trim() && phone.value.trim() && /\S+@\S+\.\S+/.test(email.value);
    if (showErrors) document.getElementById('patientForm').reportValidity();
    return valid;
  }

  // Step 1: Departments
  const departments = [...new Set(DOCTORS.map((d) => d.department))];
  const deptOptions = document.getElementById('deptOptions');
  departments.forEach((dept) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'option-card';
    card.innerHTML = `<i class="fa-solid ${DEPT_ICONS[dept] || 'fa-notes-medical'}"></i><span>${dept}</span>`;
    card.addEventListener('click', () => {
      state.dept = dept;
      state.doctorId = null;
      document.querySelectorAll('#deptOptions .option-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      renderDoctorOptions(dept);
      updateNextState();
    });
    card.dataset.dept = dept;
    deptOptions.appendChild(card);
  });

  // Step 2: Doctors (filtered by chosen department)
  const doctorOptions = document.getElementById('doctorOptions');
  function renderDoctorOptions(dept) {
    doctorOptions.innerHTML = '';
    DOCTORS.filter((d) => d.department === dept).forEach((doctor) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'option-card doctor-option';
      card.innerHTML = `
        <img src="${doctor.image}" alt="${doctor.name}">
        <div>
          <h4>${doctor.name}</h4>
          <span>${doctor.qualifications}</span>
          <span class="doctor-option-fee">PKR ${doctor.fee.toLocaleString('en-US')}</span>
        </div>
      `;
      card.addEventListener('click', () => selectDoctor(doctor.id));
      card.dataset.doctorId = doctor.id;
      doctorOptions.appendChild(card);
    });
  }

  function selectDoctor(doctorId) {
    state.doctorId = doctorId;
    document.querySelectorAll('#doctorOptions .option-card').forEach((c) => c.classList.toggle('selected', Number(c.dataset.doctorId) === doctorId));
    updateNextState();
  }

  // Step 3: Dates — next matching days based on doctor's schedule
  const dateOptions = document.getElementById('dateOptions');
  const doctorDaysHint = document.getElementById('doctorDaysHint');
  function renderDateOptions() {
    const doctor = DOCTORS.find((d) => d.id === state.doctorId);
    doctorDaysHint.textContent = doctor ? `${doctor.name} is available: ${doctor.days.join(', ')}` : '';
    dateOptions.innerHTML = '';
    const today = new Date();
    let added = 0;
    let offset = 1;
    while (added < 6 && offset < 30) {
      const candidate = new Date(today);
      candidate.setDate(today.getDate() + offset);
      const dayName = DAY_NAMES[candidate.getDay()];
      if (!doctor || doctor.days.includes(dayName)) {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'date-card';
        const iso = candidate.toISOString().split('T')[0];
        card.innerHTML = `<strong>${candidate.getDate()}</strong><span>${dayName}, ${candidate.toLocaleString('en-US', { month: 'short' })}</span>`;
        card.dataset.date = iso;
        card.dataset.label = `${dayName}, ${candidate.toLocaleString('en-US', { month: 'short' })} ${candidate.getDate()}`;
        card.addEventListener('click', () => {
          state.date = iso;
          state.dateLabel = card.dataset.label;
          document.querySelectorAll('.date-card').forEach((c) => c.classList.remove('selected'));
          card.classList.add('selected');
          updateNextState();
        });
        dateOptions.appendChild(card);
        added += 1;
      }
      offset += 1;
    }
  }

  // Step 4: Times
  const timeOptions = document.getElementById('timeOptions');
  function renderTimeOptions() {
    timeOptions.innerHTML = '';
    TIME_SLOTS.forEach((slot) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'time-card';
      card.textContent = slot;
      card.addEventListener('click', () => {
        state.time = slot;
        document.querySelectorAll('.time-card').forEach((c) => c.classList.remove('selected'));
        card.classList.add('selected');
        updateNextState();
      });
      timeOptions.appendChild(card);
    });
  }
  renderTimeOptions();

  // Step 5: live-validate patient form as the visitor types
  ['p-name', 'p-phone', 'p-email'].forEach((id) => {
    document.getElementById(id).addEventListener('input', updateNextState);
  });

  // Step 6: summary
  function renderSummary() {
    const doctor = DOCTORS.find((d) => d.id === state.doctorId);
    const rows = [
      ['Department', state.dept],
      ['Doctor', doctor ? doctor.name : '—'],
      ['Date', state.dateLabel || '—'],
      ['Time', state.time || '—'],
      ['Patient Name', document.getElementById('p-name').value],
      ['Phone', document.getElementById('p-phone').value],
      ['Email', document.getElementById('p-email').value],
      ['Appointment Type', document.getElementById('p-type').value],
      ['Consultation Fee', doctor ? `PKR ${doctor.fee.toLocaleString('en-US')}` : '—']
    ];
    document.getElementById('summaryCard').innerHTML = rows.map(([label, value]) => `
      <div class="summary-row"><span>${label}</span><span>${value || '—'}</span></div>
    `).join('');
  }

  function showConfirmation() {
    const doctor = DOCTORS.find((d) => d.id === state.doctorId);
    const confirmationId = 'WMC-' + Math.floor(100000 + Math.random() * 900000);
    document.getElementById('confirmationCard').innerHTML = `
      <div class="summary-row"><span>Confirmation No.</span><span>${confirmationId}</span></div>
      <div class="summary-row"><span>Doctor</span><span>${doctor ? doctor.name : '—'}</span></div>
      <div class="summary-row"><span>Date &amp; Time</span><span>${state.dateLabel}, ${state.time}</span></div>
      <div class="summary-row"><span>Location</span><span>45-C Gulberg III, Lahore</span></div>
    `;
    wizardSteps.forEach((s) => s.classList.toggle('active', s.dataset.stepPanel === 'success'));
    indicators.forEach((ind) => ind.classList.add('done'));
    wizardNav.hidden = true;
  }

  // Navigation
  backBtn.addEventListener('click', () => { if (currentStep > 1) goToStep(currentStep - 1); });
  nextBtn.addEventListener('click', () => {
    if (currentStep === 2) renderDateOptions();
    if (currentStep === 3) { /* time options already rendered once */ }
    if (currentStep === 4) { /* moving into patient form */ }
    if (currentStep === 5 && !validatePatientForm(true)) return;
    if (currentStep === 5) renderSummary();
    if (currentStep === 6) { showConfirmation(); return; }
    if (currentStep < 6) goToStep(currentStep + 1);
  });

  // Deep link from a doctor profile: booking.html?doctor=3
  const params = new URLSearchParams(window.location.search);
  const preselectedDoctorId = parseInt(params.get('doctor'), 10);
  if (preselectedDoctorId) {
    const doctor = DOCTORS.find((d) => d.id === preselectedDoctorId);
    if (doctor) {
      state.dept = doctor.department;
      const deptCard = deptOptions.querySelector(`[data-dept="${doctor.department}"]`);
      if (deptCard) deptCard.classList.add('selected');
      renderDoctorOptions(doctor.department);
      selectDoctor(doctor.id);
      goToStep(2);
    }
  }

  updateNextState();
})();
