(function () {
  const trackForm = document.getElementById('trackForm');
  const trackingInput = document.getElementById('trackingInput');
  const trackError = document.getElementById('trackError');
  const trackResult = document.getElementById('trackResult');

  function renderShipment(code) {
    const shipment = SHIPMENTS[code.toUpperCase().trim()];
    if (!shipment) {
      trackError.hidden = false;
      trackResult.hidden = true;
      return;
    }
    trackError.hidden = true;

    document.getElementById('resFrom').textContent = shipment.from;
    document.getElementById('resTo').textContent = shipment.to;
    document.getElementById('resStatus').textContent = shipment.status;
    document.getElementById('resLocation').textContent = shipment.currentLocation;
    document.getElementById('resPickup').textContent = shipment.pickupDate;
    document.getElementById('resEta').textContent = shipment.eta;
    document.getElementById('resVehicle').innerHTML = shipment.vehicle;
    document.getElementById('resCargo').innerHTML = shipment.cargo;
    document.getElementById('resDriver').textContent = shipment.driver;
    const driverPhoneLink = document.getElementById('resDriverPhone');
    driverPhoneLink.href = `tel:${shipment.driverPhone.replace(/\s+/g, '')}`;

    const timeline = document.getElementById('timeline');
    timeline.innerHTML = shipment.milestones.map((m) => `
      <li class="${m.done ? 'done' : ''} ${m.current ? 'current' : ''}">
        <div class="timeline-label">${m.label}</div>
        <div class="timeline-time">${m.time}</div>
      </li>
    `).join('');

    const podCard = document.getElementById('podCard');
    if (shipment.pod) {
      podCard.hidden = false;
      document.getElementById('podDetails').innerHTML = `Received by <strong>${shipment.pod.receivedBy}</strong> on ${shipment.pod.time}.`;
    } else {
      podCard.hidden = true;
    }

    trackResult.hidden = false;
    trackResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = trackingInput.value.trim();
    if (!code) return;
    renderShipment(code);
  });

  document.querySelectorAll('.hint-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      trackingInput.value = btn.dataset.code;
      renderShipment(btn.dataset.code);
    });
  });

  // Auto-track if a code is passed in the URL, e.g. track.html?code=RL10293847
  const params = new URLSearchParams(window.location.search);
  if (params.get('code')) {
    trackingInput.value = params.get('code');
    renderShipment(params.get('code'));
  }
})();
