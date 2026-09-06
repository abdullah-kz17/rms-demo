const SHIPMENTS = {
  'RL10293847': {
    status: 'In Transit',
    from: 'Lahore', to: 'Karachi',
    pickupDate: 'Sept 2, 2026', eta: 'Sept 4, 2026',
    currentLocation: 'Multan, Punjab',
    vehicle: '22-Wheeler Trailer &middot; Plate LEA-4471',
    driver: 'Imran Baig', driverPhone: '+92 300 5551234',
    cargo: 'FMCG &middot; 18 Tons &middot; 240 Pieces',
    milestones: [
      { label: 'Order Confirmed', time: 'Sept 1, 2026 &middot; 10:12 AM', done: true },
      { label: 'Picked Up', time: 'Sept 2, 2026 &middot; 7:45 AM', done: true },
      { label: 'In Transit', time: 'Sept 3, 2026 &middot; 2:30 PM', done: true, current: true },
      { label: 'Out For Delivery', time: 'Expected Sept 4, 2026', done: false },
      { label: 'Delivered', time: 'Expected Sept 4, 2026', done: false }
    ],
    pod: null
  },
  'RL77410026': {
    status: 'Out For Delivery',
    from: 'Faisalabad', to: 'Islamabad',
    pickupDate: 'Sept 3, 2026', eta: 'Sept 4, 2026',
    currentLocation: 'I-9 Distribution Center, Islamabad',
    vehicle: 'Flatbed Truck &middot; Plate FSD-2290',
    driver: 'Waqas Khalid', driverPhone: '+92 300 5559876',
    cargo: 'Industrial Equipment &middot; 9 Tons &middot; 12 Pieces',
    milestones: [
      { label: 'Order Confirmed', time: 'Sept 2, 2026 &middot; 4:00 PM', done: true },
      { label: 'Picked Up', time: 'Sept 3, 2026 &middot; 8:15 AM', done: true },
      { label: 'In Transit', time: 'Sept 3, 2026 &middot; 6:40 PM', done: true },
      { label: 'Out For Delivery', time: 'Sept 4, 2026 &middot; 9:05 AM', done: true, current: true },
      { label: 'Delivered', time: 'Expected today by 5:00 PM', done: false }
    ],
    pod: null
  },
  'RL55821093': {
    status: 'Delivered',
    from: 'Karachi', to: 'Lahore',
    pickupDate: 'Aug 28, 2026', eta: 'Aug 30, 2026',
    currentLocation: 'Delivered &middot; Ferozepur Road, Lahore',
    vehicle: 'Container Carrier &middot; Plate KHI-8834',
    driver: 'Salman Raza', driverPhone: '+92 300 5552211',
    cargo: 'Import Container &middot; 24 Tons &middot; 1 Container',
    milestones: [
      { label: 'Order Confirmed', time: 'Aug 27, 2026 &middot; 11:20 AM', done: true },
      { label: 'Picked Up', time: 'Aug 28, 2026 &middot; 7:00 AM', done: true },
      { label: 'In Transit', time: 'Aug 29, 2026 &middot; 3:10 PM', done: true },
      { label: 'Out For Delivery', time: 'Aug 30, 2026 &middot; 8:30 AM', done: true },
      { label: 'Delivered', time: 'Aug 30, 2026 &middot; 1:45 PM', done: true, current: true }
    ],
    pod: { receivedBy: 'Farhan Iqbal (Warehouse Manager)', time: 'Aug 30, 2026 &middot; 1:45 PM' }
  }
};
