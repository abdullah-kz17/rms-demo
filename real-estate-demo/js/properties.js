const PROPERTIES = [
  {
    id: 1, name: 'Fort View Villa', location: 'Hampstead, London', status: 'For Sale',
    price: 4999000, priceSuffix: '', beds: 6, baths: 5, sqft: 5400, garages: 3,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A private hilltop estate framed by mature gardens, Fort View Villa pairs grand entertaining spaces with quiet family corners. The great room opens onto a heated terrace overlooking the valley, while the lower level houses a home cinema and wine cellar.',
    features: ['Heated outdoor pool and terrace', 'Home cinema and wine cellar', 'Smart-home climate and security system', 'Triple garage with EV charging', 'Landscaped gardens on 2 private acres'],
    agent: { name: 'Marcus Reed', role: 'Senior Agent', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 2, name: 'Hill View Home', location: 'Camden, London', status: 'For Sale',
    price: 680000, priceSuffix: '', beds: 4, baths: 3, sqft: 2400,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A bright, bay-windowed family home on a quiet Camden square, recently refurbished throughout. The open-plan kitchen extends into a south-facing garden, with three further bedrooms and a loft conversion upstairs.',
    features: ['Recently refurbished throughout', 'South-facing garden', 'Loft conversion with en-suite', 'Off-street parking for 2 cars', 'Walking distance to Camden Town station'],
    agent: { name: 'Sophia Turner', role: 'Listing Agent', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 3, name: 'Luxury House', location: 'Kensington, London', status: 'For Sale',
    price: 1250000, priceSuffix: '', beds: 5, baths: 4, sqft: 3600,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A statement Kensington townhouse with sweeping open-plan interiors, floor-to-ceiling glazing and a private landscaped garden. Every room has been finished with the same considered attention, from the marble kitchen island to the primary suite\'s dressing room.',
    features: ['Floor-to-ceiling glazing throughout', 'Marble kitchen island', 'Primary suite with dressing room', 'Private landscaped garden', 'Underfloor heating on all levels'],
    agent: { name: 'Ava Bennett', role: 'Rentals Specialist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 4, name: 'Harvest Villa', location: 'Richmond, London', status: 'For Rent',
    price: 3200, priceSuffix: '/mo', beds: 3, baths: 2, sqft: 1950,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Moments from Richmond Park, Harvest Villa offers relaxed family living with a large kitchen-diner opening onto a private lawn — available furnished or unfurnished on a flexible tenancy.',
    features: ['Furnished or unfurnished available', 'Private lawned garden', 'Kitchen-diner with bi-fold doors', 'Flexible tenancy length', 'Moments from Richmond Park'],
    agent: { name: 'Marcus Reed', role: 'Senior Agent', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 5, name: 'Royal House', location: 'Countryside Estate, Surrey', status: 'For Rent',
    price: 7999, priceSuffix: '/mo', beds: 6, baths: 5, sqft: 5400, garages: 3,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An architectural masterpiece set on 3 private acres, featuring a heated pool, home cinema and panoramic countryside views — designed for those who expect nothing less than extraordinary.',
    features: ['Heated outdoor pool', 'Home cinema room', 'Panoramic countryside views', 'Triple garage', '3 private acres of grounds'],
    agent: { name: 'Sophia Turner', role: 'Listing Agent', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 6, name: 'Grand Luxury Estate', location: 'Belgravia, London', status: 'For Sale',
    price: 2450000, priceSuffix: '', beds: 5, baths: 4, sqft: 4100,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A statement home with sweeping open-plan interiors, floor-to-ceiling glass and a private landscaped garden — a rare offering in one of London\'s most sought-after postcodes.',
    features: ['Sweeping open-plan interiors', 'Floor-to-ceiling glass throughout', 'Private landscaped garden', 'Bespoke Italian kitchen', 'Walking distance to Belgravia Square'],
    agent: { name: 'Ava Bennett', role: 'Rentals Specialist', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80' }
  },
  {
    id: 7, name: 'Country House', location: 'Cotswolds, Gloucestershire', status: 'For Sale',
    price: 1680000, priceSuffix: '', beds: 4, baths: 3, sqft: 3100,
    image: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592595896616-c37162298647?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nestled in the countryside, this charming estate blends rustic character with modern comfort across two acres of grounds — exposed beams and an inglenook fireplace sit alongside a newly fitted kitchen.',
    features: ['Exposed beams and inglenook fireplace', 'Newly fitted kitchen', 'Two acres of private grounds', 'Detached double garage', 'Original period features throughout'],
    agent: { name: 'Marcus Reed', role: 'Senior Agent', phone: '+1 987 654 3210', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=200&q=80' }
  }
];
