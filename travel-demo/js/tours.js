const TOURS = [
  {
    id: 1, name: 'Bali Beach Escape', destination: 'Bali, Indonesia', category: 'Beach',
    duration: 6, price: 1290, priceSuffix: '/person', rating: 4.8, reviews: 214, groupSize: '2-12',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Six days across Bali\'s emerald rice terraces, hidden waterfalls and laid-back southern beaches. Stay in boutique villas, unwind with a private beach sunset dinner, and explore Ubud\'s temples with a local guide who knows every back road worth taking.',
    includes: ['5 nights boutique villa accommodation', 'Daily breakfast + 2 signature dinners', 'Private airport transfers', 'Guided Ubud temple & rice terrace tour', 'Sunset beach dinner in Seminyak'],
    itinerary: [
      { day: 1, title: 'Arrival & Seminyak Beach', desc: 'Land in Denpasar, private transfer to your villa, evening welcome dinner by the beach.' },
      { day: 2, title: 'Ubud Rice Terraces', desc: 'Guided walk through the Tegalalang terraces, traditional lunch and a Balinese art village stop.' },
      { day: 3, title: 'Waterfalls & Temples', desc: 'Sekumpul waterfall hike followed by a sunset visit to Tanah Lot temple.' },
      { day: 4, title: 'Free Beach Day', desc: 'Relax at your villa or optional surf lesson at Canggu.' },
      { day: 5, title: 'Nusa Penida Boat Trip', desc: 'Full-day island hopping with snorkeling at Crystal Bay.' },
      { day: 6, title: 'Departure', desc: 'Leisurely morning, private transfer to the airport.' }
    ],
    guide: { name: 'Wayan Surya', role: 'Bali Destination Expert', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 2, name: 'Swiss Alps Adventure', destination: 'Interlaken, Switzerland', category: 'Adventure',
    duration: 7, price: 2450, priceSuffix: '/person', rating: 4.9, reviews: 168, groupSize: '4-14',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Seven days chasing alpine views across the Bernese Oberland — cable cars up to Jungfraujoch, a via ferrata for the adventurous, and quiet lakeside evenings in Interlaken. Built for travellers who want their scenery earned, not just photographed.',
    includes: ['6 nights alpine lodge accommodation', 'Daily breakfast + 3 dinners', 'Jungfraujoch cogwheel railway pass', 'Guided via ferrata & hiking excursions', 'Lake Brienz boat cruise'],
    itinerary: [
      { day: 1, title: 'Arrival in Interlaken', desc: 'Check-in, welcome briefing and an easy lakeside walk to settle in.' },
      { day: 2, title: 'Jungfraujoch — Top of Europe', desc: 'Cogwheel railway to the highest railway station in Europe, glacier views included.' },
      { day: 3, title: 'Via Ferrata Grindelwald', desc: 'Guided climbing route above the valley for adventurous travellers, easier hikes available.' },
      { day: 4, title: 'Lake Brienz Cruise', desc: 'Scenic boat cruise and a stop in the village of Iseltwald.' },
      { day: 5, title: 'Schilthorn Panorama', desc: 'Cable car to the revolving Piz Gloria restaurant for 360° Alps views.' },
      { day: 6, title: 'Free Day / Optional Paragliding', desc: 'Explore Interlaken or book an optional tandem paragliding flight.' },
      { day: 7, title: 'Departure', desc: 'Morning at leisure before your transfer to Zurich or Geneva.' }
    ],
    guide: { name: 'Lena Fischer', role: 'Alpine Trek Leader', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 3, name: 'Kenya Safari Expedition', destination: 'Maasai Mara, Kenya', category: 'Wildlife',
    duration: 5, price: 2890, priceSuffix: '/person', rating: 5.0, reviews: 96, groupSize: '2-8',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Five days of dawn and dusk game drives across the Maasai Mara with a dedicated safari vehicle and spotter. Stay in a private tented camp on the reserve boundary, wake to the sound of the savanna, and end each day around a campfire under genuinely dark skies.',
    includes: ['4 nights private tented safari camp', 'All meals + sundowner drinks', 'Private 4x4 safari vehicle & spotter', 'Twice-daily game drives', 'Maasai village cultural visit'],
    itinerary: [
      { day: 1, title: 'Arrival & Sundowner Drive', desc: 'Fly into the Mara, check into camp, evening game drive as the light turns gold.' },
      { day: 2, title: 'Full-Day Game Drive', desc: 'Dawn departure tracking the Big Five, packed bush breakfast and lunch.' },
      { day: 3, title: 'Mara River & Maasai Village', desc: 'Morning at the river crossing point, afternoon cultural visit with a local Maasai community.' },
      { day: 4, title: 'Balloon Safari (Optional)', desc: 'Optional sunrise hot-air balloon flight followed by a bush breakfast, then an afternoon drive.' },
      { day: 5, title: 'Departure', desc: 'Final morning game drive before your flight out of the reserve.' }
    ],
    guide: { name: 'Amara Odhiambo', role: 'Safari Guide & Naturalist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 4, name: 'Santorini Island Getaway', destination: 'Santorini, Greece', category: 'Beach',
    duration: 5, price: 1690, priceSuffix: '/person', rating: 4.7, reviews: 302, groupSize: '2-10',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Five days on the caldera rim with whitewashed villages, volcanic beaches and one unforgettable sunset in Oia. Includes a private catamaran cruise around the island and a wine tasting at a family-run vineyard.',
    includes: ['4 nights caldera-view accommodation', 'Daily breakfast + 1 wine-tasting dinner', 'Private catamaran sunset cruise', 'Guided Oia & Fira walking tour', 'Akrotiri archaeological site entry'],
    itinerary: [
      { day: 1, title: 'Arrival in Fira', desc: 'Check-in with caldera views, evening orientation walk through Fira town.' },
      { day: 2, title: 'Oia & Sunset', desc: 'Guided walk through Oia\'s blue-domed churches, front-row seat for the famous sunset.' },
      { day: 3, title: 'Catamaran Cruise', desc: 'Sail past the volcano and hot springs with a swim stop and onboard barbecue.' },
      { day: 4, title: 'Wine & History', desc: 'Akrotiri ruins in the morning, vineyard wine tasting in the afternoon.' },
      { day: 5, title: 'Departure', desc: 'Free morning before transfer to the airport or port.' }
    ],
    guide: { name: 'Marcus Reed', role: 'Mediterranean Travel Specialist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 5, name: 'Kyoto Cultural Journey', destination: 'Kyoto, Japan', category: 'Culture',
    duration: 6, price: 2190, priceSuffix: '/person', rating: 4.9, reviews: 141, groupSize: '2-10',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Six days moving through Kyoto\'s temples, bamboo groves and geisha districts at an unhurried pace, with a private tea ceremony and a day trip to Nara\'s deer park. Stay in a traditional ryokan for at least one unforgettable night.',
    includes: ['5 nights hotel + 1 night traditional ryokan', 'Daily breakfast + traditional kaiseki dinner', 'Private tea ceremony experience', 'Fushimi Inari & Arashiyama guided tour', 'Nara day trip with deer park'],
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto', desc: 'Check-in and an easy evening stroll through Gion, the historic geisha district.' },
      { day: 2, title: 'Fushimi Inari & Arashiyama', desc: 'Thousand torii gates in the morning, bamboo grove and river views in the afternoon.' },
      { day: 3, title: 'Tea Ceremony & Kinkaku-ji', desc: 'Private tea ceremony with a tea master, visit to the Golden Pavilion.' },
      { day: 4, title: 'Nara Day Trip', desc: 'Meet the free-roaming deer and visit Todai-ji, home to Japan\'s largest bronze Buddha.' },
      { day: 5, title: 'Ryokan Night', desc: 'Check into a traditional ryokan, kaiseki dinner and an onsen soak.' },
      { day: 6, title: 'Departure', desc: 'Final morning market visit before your transfer to the airport.' }
    ],
    guide: { name: 'Sophia Turner', role: 'Asia Travel Specialist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 6, name: 'Machu Picchu Trek', destination: 'Cusco, Peru', category: 'Adventure',
    duration: 5, price: 1950, priceSuffix: '/person', rating: 4.8, reviews: 187, groupSize: '4-12',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Five days from Cusco\'s cobbled streets to the Sacred Valley and a sunrise arrival at Machu Picchu via the classic Inca Trail approach. Paced for real hikers, with a certified mountain guide and porter support throughout.',
    includes: ['4 nights hotel + trail camping', 'All meals during the trek', 'Certified mountain guide & porters', 'Sacred Valley guided tour', 'Machu Picchu entry with sunrise access'],
    itinerary: [
      { day: 1, title: 'Cusco Acclimatization', desc: 'Arrive in Cusco, gentle city walking tour to acclimatize to the altitude.' },
      { day: 2, title: 'Sacred Valley', desc: 'Guided tour of Pisac ruins and the Ollantaytambo fortress.' },
      { day: 3, title: 'Trailhead to Camp', desc: 'Begin the trek through the Andes with porter-supported camping en route.' },
      { day: 4, title: 'Sun Gate Sunrise', desc: 'Early trek to the Sun Gate for your first sunrise view of Machu Picchu.' },
      { day: 5, title: 'Machu Picchu & Departure', desc: 'Full guided exploration of the citadel before the train back to Cusco.' }
    ],
    guide: { name: 'Ava Bennett', role: 'Andes Trekking Guide', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 7, name: 'Maldives Overwater Retreat', destination: 'Malé Atoll, Maldives', category: 'Beach',
    duration: 5, price: 3450, priceSuffix: '/person', rating: 4.9, reviews: 129, groupSize: '2-6',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Five unhurried days in an overwater villa with direct lagoon access, a private sunset cruise and a guided snorkeling trip over a house reef known for reef sharks and turtles. Minimal itinerary, maximum ocean.',
    includes: ['4 nights overwater villa', 'All-inclusive meals & drinks', 'Private sunset dolphin cruise', 'Guided house reef snorkeling trip', 'Seaplane transfers included'],
    itinerary: [
      { day: 1, title: 'Arrival by Seaplane', desc: 'Scenic seaplane transfer to the resort, check into your overwater villa.' },
      { day: 2, title: 'House Reef Snorkeling', desc: 'Guided snorkeling trip over the house reef with reef sharks and turtles.' },
      { day: 3, title: 'Free Day at Leisure', desc: 'Spa treatments, paddleboarding or simply the villa\'s private deck.' },
      { day: 4, title: 'Sunset Dolphin Cruise', desc: 'Private boat cruise to spot spinner dolphins as the sun sets over the atoll.' },
      { day: 5, title: 'Departure', desc: 'Final morning swim before your seaplane transfer back to Malé.' }
    ],
    guide: { name: 'Wayan Surya', role: 'Island Escapes Specialist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  }
];
