(function () {
  // Prefill from the homepage's quick-quote form, if the visitor arrived via that link
  const params = new URLSearchParams(window.location.search);
  const fromField = document.getElementById('q-from');
  const toField = document.getElementById('q-to');
  const cargoField = document.getElementById('q-cargo-type');
  const phoneField = document.getElementById('q-phone');

  if (params.get('from') && fromField) fromField.value = params.get('from');
  if (params.get('to') && toField) toField.value = params.get('to');
  if (params.get('phone') && phoneField) phoneField.value = params.get('phone');
  if (params.get('cargo') && cargoField) {
    const match = Array.from(cargoField.options).find((opt) => opt.value === params.get('cargo'));
    if (match) cargoField.value = match.value;
  }

  // File upload label
  const fileInput = document.getElementById('q-file');
  const fileLabel = document.getElementById('fileLabel');
  if (fileInput) {
    fileInput.addEventListener('change', () => {
      fileLabel.textContent = fileInput.files.length ? fileInput.files[0].name : 'Choose a file — packing list, cargo photo, etc.';
    });
  }

  // Quote form submit — simulated, no backend
  const quoteForm = document.getElementById('quoteForm');
  const submitBtn = quoteForm.querySelector('.quote-submit');
  const successMsg = document.getElementById('quoteSuccess');

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!quoteForm.checkValidity()) {
      quoteForm.reportValidity();
      return;
    }
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      successMsg.hidden = false;
      quoteForm.reset();
      fileLabel.textContent = 'Choose a file — packing list, cargo photo, etc.';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });
})();
