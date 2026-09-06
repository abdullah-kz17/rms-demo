(function () {
  const grid = document.getElementById('doctorDirectoryGrid');
  const noResults = document.getElementById('noResults');
  const chips = document.querySelectorAll('.dept-chip');

  function render(dept) {
    grid.innerHTML = '';
    const filtered = dept === 'all' ? DOCTORS : DOCTORS.filter((d) => d.department === dept);
    filtered.forEach((doctor) => grid.appendChild(renderDoctorCard(doctor)));
    noResults.hidden = filtered.length > 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      render(chip.dataset.dept);
    });
  });

  // Pre-filter from a homepage specialty link, e.g. doctors.html?dept=Cardiology
  const params = new URLSearchParams(window.location.search);
  const deptParam = params.get('dept');
  if (deptParam) {
    const matchingChip = Array.from(chips).find((c) => c.dataset.dept === deptParam);
    if (matchingChip) {
      chips.forEach((c) => c.classList.remove('active'));
      matchingChip.classList.add('active');
      render(deptParam);
      return;
    }
  }
  render('all');
})();
