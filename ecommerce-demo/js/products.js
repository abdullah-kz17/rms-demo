const PRODUCTS = [
  {
    id: 1, name: 'Merino Wool Crewneck', category: 'Men', price: 68, oldPrice: 88,
    rating: 4.6, reviews: 128, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A midweight crewneck spun from responsibly-sourced merino wool — soft against skin, breathable enough for all-day wear, and built to hold its shape wash after wash.',
    features: ['100% responsibly-sourced merino wool', 'Machine washable on wool cycle', 'Available in 5 colours', 'Runs true to size'],
    sizes: ['S', 'M', 'L', 'XL'], tags: ['featured', 'bestseller']
  },
  {
    id: 2, name: 'Everyday Oxford Shirt', category: 'Men', price: 58,
    rating: 4.5, reviews: 87,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Brushed cotton oxford with a relaxed collar roll — the one shirt that works equally well tucked into chinos or layered under a knit.',
    features: ['100% brushed cotton', 'Relaxed regular fit', 'Mother-of-pearl buttons', 'Pre-shrunk fabric'],
    sizes: ['S', 'M', 'L', 'XL'], tags: ['new']
  },
  {
    id: 3, name: 'Tailored Wide-Leg Trousers', category: 'Women', price: 96,
    rating: 4.8, reviews: 94,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cut from a fluid twill with just enough structure, these wide-leg trousers move from desk to dinner without missing a step. A hidden elastic waistband keeps them comfortable all day.',
    features: ['Fluid twill blend', 'Hidden elastic waistband', 'Dry clean recommended', 'Ankle-grazing wide leg'],
    sizes: ['XS', 'S', 'M', 'L'], tags: ['featured', 'new']
  },
  {
    id: 4, name: 'Silk-Blend Wrap Blouse', category: 'Women', price: 74, oldPrice: 94,
    rating: 4.4, reviews: 61, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A fluid wrap blouse in a silk-cotton blend that drapes rather than clings — finished with a self-tie waist that adjusts to your shape.',
    features: ['Silk-cotton blend', 'Adjustable self-tie waist', 'Hand wash cold', 'Lined bodice'],
    sizes: ['XS', 'S', 'M', 'L'], tags: ['deal']
  },
  {
    id: 5, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', price: 179, oldPrice: 229,
    rating: 4.7, reviews: 412, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    description: '30 hours of battery life, adaptive noise cancelling, and a fold-flat design that fits in the included travel case. Pairs instantly with two devices at once.',
    features: ['30-hour battery, 5-min fast charge for 3 hours', 'Adaptive active noise cancellation', 'Multipoint Bluetooth 5.3', 'Foldable with travel case included'],
    sizes: null, tags: ['featured', 'bestseller', 'deal']
  },
  {
    id: 6, name: 'True Wireless Earbuds', category: 'Electronics', price: 89,
    rating: 4.3, reviews: 203,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Compact true-wireless earbuds with a secure fit, punchy bass, and a pocket-sized charging case good for three extra full charges on the go.',
    features: ['24 hours total playtime with case', 'IPX4 sweat and splash resistant', 'Touch controls', 'USB-C fast charging case'],
    sizes: null, tags: ['new']
  },
  {
    id: 7, name: 'Smart Fitness Watch', category: 'Electronics', price: 149,
    rating: 4.5, reviews: 156,
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1542060748-10c28b62716f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Track workouts, sleep and heart rate with a battery that lasts a full week. The always-on display stays crisp in direct sunlight.',
    features: ['7-day battery life', 'Always-on AMOLED display', '20+ workout modes', 'Water resistant to 50m'],
    sizes: null, tags: ['featured', 'bestseller']
  },
  {
    id: 8, name: 'Hand-Thrown Stoneware Vase', category: 'Home', price: 42,
    rating: 4.7, reviews: 38,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Each vase is hand-thrown by a small studio potter, so glaze and shape vary slightly piece to piece — a small imperfection that makes it yours.',
    features: ['Hand-thrown stoneware', 'Food-safe glaze', 'Slight variation piece to piece', 'Wipe clean only'],
    sizes: null, tags: ['new']
  },
  {
    id: 9, name: 'Modern Accent Chair', category: 'Home', price: 340, oldPrice: 420,
    rating: 4.6, reviews: 52, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A boucle-upholstered accent chair on a solid oak frame — compact enough for a reading corner, comfortable enough to live in.',
    features: ['Boucle upholstery', 'Solid oak legs', 'Assembly required (15 min)', 'Weight capacity 300 lbs'],
    sizes: null, tags: ['deal']
  },
  {
    id: 10, name: 'Botanical Table Lamp', category: 'Home', price: 66,
    rating: 4.4, reviews: 29,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A linen-shaded table lamp with a warm dimmable bulb included — soft enough for evenings, bright enough for reading.',
    features: ['Dimmable LED bulb included', 'Linen shade', 'In-line dimmer switch', 'UL-listed cord'],
    sizes: null, tags: ['bestseller']
  },
  {
    id: 11, name: 'Vitamin C Brightening Serum', category: 'Beauty', price: 38,
    rating: 4.6, reviews: 267,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560457079-9a6532ccb118?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A lightweight serum with 15% stabilised vitamin C that brightens tone and softens the look of fine lines with consistent morning use.',
    features: ['15% stabilised vitamin C', 'Fragrance-free', 'Dermatologist tested', 'Cruelty-free'],
    sizes: null, tags: ['featured', 'new']
  },
  {
    id: 12, name: 'Restorative Night Cream', category: 'Beauty', price: 46, oldPrice: 58,
    rating: 4.5, reviews: 143, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560457079-9a6532ccb118?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A rich, ceramide-based night cream that replenishes moisture overnight, leaving skin visibly plumper by morning.',
    features: ['Ceramide + peptide complex', 'Non-comedogenic', 'Suitable for sensitive skin', '50ml jar'],
    sizes: null, tags: ['deal', 'bestseller']
  },
  {
    id: 13, name: 'Leather Weekender Bag', category: 'Accessories', price: 168,
    rating: 4.8, reviews: 71,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Full-grain leather that only gets better with age, sized to fit as a carry-on with room for a two-night trip.',
    features: ['Full-grain leather', 'Fits under most airline seats', 'Detachable shoulder strap', 'Brass hardware'],
    sizes: null, tags: ['featured']
  },
  {
    id: 14, name: 'Classic Leather Sneakers', category: 'Accessories', price: 118,
    rating: 4.5, reviews: 189,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A clean, minimal sneaker in soft full-grain leather with a cushioned insole built for all-day wear.',
    features: ['Full-grain leather upper', 'Cushioned removable insole', 'Rubber outsole', 'Runs true to size'],
    sizes: ['7', '8', '9', '10', '11'], tags: ['new', 'bestseller']
  }
];
