const PRODUCTS = [
  {
    id: 1, name: 'Rosewater Glow Serum', category: 'Skincare', price: 42, oldPrice: 54,
    rating: 4.7, reviews: 231, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A lightweight, fast-absorbing serum infused with rosewater and hyaluronic acid that leaves skin dewy, plump and visibly brighter after just one use.',
    features: ['With Bulgarian rosewater extract', 'Hyaluronic acid for deep hydration', 'Fragrance-free, dermatologist tested', 'Cruelty-free & vegan formula'],
    sizes: null, tags: ['featured', 'bestseller']
  },
  {
    id: 2, name: 'Hydra Bloom Night Cream', category: 'Skincare', price: 48,
    rating: 4.6, reviews: 154,
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A rich, ceramide-based night cream that works while you sleep, replenishing moisture overnight so skin wakes up visibly softer and more even.',
    features: ['Ceramide + peptide complex', 'Non-comedogenic', 'Suitable for sensitive skin', '50ml glass jar'],
    sizes: null, tags: ['new']
  },
  {
    id: 3, name: 'Vitamin C Brightening Drops', category: 'Skincare', price: 36,
    rating: 4.5, reviews: 98,
    image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A concentrated 15% stabilised vitamin C serum that brightens uneven tone and softens fine lines with consistent morning use.',
    features: ['15% stabilised vitamin C', 'Antioxidant-rich formula', 'Paraben-free', 'Cruelty-free'],
    sizes: null, tags: ['featured', 'new']
  },
  {
    id: 4, name: 'Velvet Matte Lipstick', category: 'Makeup', price: 24, oldPrice: 30,
    rating: 4.8, reviews: 312, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A weightless matte lipstick that glides on smooth and stays put for hours without drying out or settling into fine lines.',
    features: ['12-hour long wear', 'Transfer-resistant matte finish', 'Enriched with vitamin E', 'Available in 10 shades'],
    sizes: ['Rosewood', 'Terracotta', 'Berry Nude', 'Classic Red'], tags: ['featured', 'bestseller']
  },
  {
    id: 5, name: 'Silk Foundation Fluid', category: 'Makeup', price: 34,
    rating: 4.5, reviews: 176,
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A buildable, second-skin foundation with a natural satin finish that evens out tone without ever looking cakey.',
    features: ['Buildable medium coverage', 'SPF 20 protection', '24 shade range', 'Non-comedogenic'],
    sizes: ['Fair', 'Light', 'Medium', 'Tan', 'Deep'], tags: ['new']
  },
  {
    id: 6, name: 'Rose Gold Highlighter Palette', category: 'Makeup', price: 29,
    rating: 4.7, reviews: 141,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A four-shade highlighter palette with a silky, blendable texture that gives skin a lit-from-within glow without any glitter fallout.',
    features: ['4 complementary rose-gold shades', 'Finely milled, no glitter fallout', 'Buildable from subtle to full glow', 'Talc-free formula'],
    sizes: null, tags: ['deal', 'bestseller']
  },
  {
    id: 7, name: 'Argan Repair Hair Oil', category: 'Haircare', price: 26,
    rating: 4.6, reviews: 205,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A few drops of this lightweight argan oil tame frizz, add shine and protect against heat damage without ever leaving hair greasy.',
    features: ['Cold-pressed argan oil', 'Heat protectant up to 450°F', 'Lightweight, non-greasy formula', 'Safe for colour-treated hair'],
    sizes: null, tags: ['featured']
  },
  {
    id: 8, name: 'Silk Shine Shampoo', category: 'Haircare', price: 22,
    rating: 4.4, reviews: 89,
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A sulfate-free shampoo that cleanses gently while smoothing the hair cuticle for a soft, glossy shine wash after wash.',
    features: ['Sulfate & paraben-free', 'Smooths hair cuticle for shine', 'Safe for colour-treated hair', 'Vegan formula'],
    sizes: null, tags: ['new', 'bestseller']
  },
  {
    id: 9, name: 'Blush Bloom Eau de Parfum', category: 'Fragrance', price: 68, oldPrice: 85,
    rating: 4.8, reviews: 187, badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A soft floral fragrance built around notes of peony and blush rose, layered over warm musk for a scent that lingers gently all day.',
    features: ['Top notes: peony, bergamot', 'Heart notes: blush rose, jasmine', 'Base notes: warm musk, amber', '50ml eau de parfum'],
    sizes: null, tags: ['featured', 'deal']
  },
  {
    id: 10, name: 'Midnight Orchid Perfume', category: 'Fragrance', price: 74,
    rating: 4.6, reviews: 103,
    image: 'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1631730359585-38a4935cbec4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A deep, sensual fragrance with dark orchid at its heart, wrapped in vanilla and sandalwood for evenings that call for something bolder.',
    features: ['Top notes: black currant, pink pepper', 'Heart notes: dark orchid', 'Base notes: vanilla, sandalwood', '50ml eau de parfum'],
    sizes: null, tags: ['new']
  },
  {
    id: 11, name: 'Whipped Shea Body Butter', category: 'Bath & Body', price: 28,
    rating: 4.7, reviews: 164,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A whipped, cloud-light body butter packed with raw shea and cocoa butter that melts into skin instantly, leaving it soft without any greasy residue.',
    features: ['Raw shea & cocoa butter base', 'Melts in without greasy residue', '48-hour hydration', 'Free from mineral oil'],
    sizes: null, tags: ['featured', 'bestseller']
  },
  {
    id: 12, name: 'Rose Petal Bath Soak', category: 'Bath & Body', price: 19,
    rating: 4.5, reviews: 77,
    image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A mineral-rich Epsom salt soak scattered with real dried rose petals, designed to ease tired muscles and turn bath time into a ritual.',
    features: ['Epsom salt + real rose petals', 'Eases tension & tired muscles', 'Lightly scented, not overpowering', 'Resealable pouch, 12 uses'],
    sizes: null, tags: ['deal']
  },
  {
    id: 13, name: 'Crystal Clear Lip Gloss', category: 'Makeup', price: 16,
    rating: 4.3, reviews: 92,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A high-shine, non-sticky gloss with a plumping hint of peptides — wear it alone or over your favourite lipstick for extra dimension.',
    features: ['Non-sticky, high-shine finish', 'Peptide-infused for a plumping effect', 'Sheer, buildable tint', 'Vanilla-mint scent'],
    sizes: null, tags: ['new', 'deal']
  },
  {
    id: 14, name: 'Dewy Finish Setting Spray', category: 'Makeup', price: 25,
    rating: 4.6, reviews: 118,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'A fine, cooling mist that locks makeup in place for up to 16 hours while leaving skin looking fresh and dewy, never cakey.',
    features: ['Up to 16-hour wear', 'Cooling, hydrating mist', 'Dewy finish, no white cast', 'Alcohol-free formula'],
    sizes: null, tags: ['bestseller']
  }
];
