const DOCTORS = [
  {
    id: 1, name: 'Dr. Sarah Ahmed', specialty: 'Cardiology', department: 'Cardiology',
    qualifications: 'MBBS, FCPS (Cardiology)', experience: 15, languages: ['English', 'Urdu'],
    expertise: ['Coronary Artery Disease', 'Heart Failure Management', 'Echocardiography', 'Preventive Cardiology'],
    fee: 3000, days: ['Mon', 'Tue', 'Wed', 'Thu'], hours: '10:00 AM – 4:00 PM',
    rating: 4.9, reviewCount: 214,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Sarah Ahmed is a consultant cardiologist with over 15 years of experience diagnosing and managing complex cardiac conditions. She trained at Aga Khan University Hospital and has led the clinic\'s cardiology department since 2018.',
    education: ['MBBS — Aga Khan University', 'FCPS Cardiology — College of Physicians and Surgeons'],
    certifications: ['Board Certified Cardiologist', 'Advanced Cardiac Life Support (ACLS)'],
    reviews: [
      { name: 'Ahmed R.', rating: 5, text: 'Dr. Ahmed took the time to explain everything clearly and never rushed the appointment.' },
      { name: 'Fatima S.', rating: 5, text: 'Excellent bedside manner and very thorough with test results.' }
    ]
  },
  {
    id: 2, name: 'Dr. Imran Malik', specialty: 'Dermatology', department: 'Dermatology',
    qualifications: 'MBBS, FCPS (Dermatology)', experience: 11, languages: ['English', 'Urdu', 'Punjabi'],
    expertise: ['Acne & Scar Treatment', 'Skin Cancer Screening', 'Eczema & Psoriasis', 'Cosmetic Dermatology'],
    fee: 2500, days: ['Mon', 'Wed', 'Fri', 'Sat'], hours: '11:00 AM – 5:00 PM',
    rating: 4.8, reviewCount: 168,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Imran Malik specializes in both medical and cosmetic dermatology, with a particular interest in acne management and skin cancer prevention. He has treated over 10,000 patients across his career.',
    education: ['MBBS — King Edward Medical University', 'FCPS Dermatology — CPSP'],
    certifications: ['Board Certified Dermatologist', 'Certified in Dermatologic Laser Surgery'],
    reviews: [
      { name: 'Hassan T.', rating: 5, text: 'Cleared up a stubborn skin condition that two other doctors couldn\'t diagnose.' },
      { name: 'Zara M.', rating: 4, text: 'Professional clinic, slightly long wait but worth it.' }
    ]
  },
  {
    id: 3, name: 'Dr. Ayesha Khan', specialty: 'Pediatrics', department: 'Pediatrics',
    qualifications: 'MBBS, FCPS (Pediatrics)', experience: 9, languages: ['English', 'Urdu'],
    expertise: ['Newborn Care', 'Childhood Vaccinations', 'Growth & Development', 'Pediatric Asthma'],
    fee: 2200, days: ['Mon', 'Tue', 'Thu', 'Sat'], hours: '9:00 AM – 3:00 PM',
    rating: 4.9, reviewCount: 302,
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Ayesha Khan has dedicated her career to pediatric care, with special focus on early childhood development and vaccination programs. Parents consistently praise her calm, reassuring approach with young patients.',
    education: ['MBBS — Dow University of Health Sciences', 'FCPS Pediatrics — CPSP'],
    certifications: ['Board Certified Pediatrician', 'Pediatric Advanced Life Support (PALS)'],
    reviews: [
      { name: 'Sana W.', rating: 5, text: 'My kids actually look forward to their checkups now — she\'s wonderful with children.' },
      { name: 'Bilal K.', rating: 5, text: 'Caught an issue during a routine visit that made a real difference.' }
    ]
  },
  {
    id: 4, name: 'Dr. Bilal Chaudhry', specialty: 'Orthopedics', department: 'Orthopedics',
    qualifications: 'MBBS, FCPS (Orthopedic Surgery)', experience: 13, languages: ['English', 'Urdu'],
    expertise: ['Joint Replacement', 'Sports Injuries', 'Spine Disorders', 'Fracture Management'],
    fee: 3500, days: ['Tue', 'Wed', 'Fri'], hours: '10:00 AM – 2:00 PM',
    rating: 4.7, reviewCount: 145,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Bilal Chaudhry is an orthopedic surgeon specializing in joint replacement and sports medicine. He has performed over 2,000 surgical procedures and regularly treats athletes recovering from injury.',
    education: ['MBBS — University of Health Sciences Lahore', 'FCPS Orthopedic Surgery — CPSP'],
    certifications: ['Board Certified Orthopedic Surgeon', 'Fellowship in Joint Replacement Surgery'],
    reviews: [
      { name: 'Usman F.', rating: 5, text: 'Knee replacement went smoothly and recovery guidance was excellent.' },
      { name: 'Nadia I.', rating: 4, text: 'Very knowledgeable, appointments can run a little behind schedule.' }
    ]
  },
  {
    id: 5, name: 'Dr. Hina Raza', specialty: 'Gynecology', department: 'Gynecology',
    qualifications: 'MBBS, FCPS (Gynecology & Obstetrics)', experience: 12, languages: ['English', 'Urdu'],
    expertise: ['Prenatal Care', 'High-Risk Pregnancy', 'Menstrual Disorders', 'Minimally Invasive Surgery'],
    fee: 2800, days: ['Mon', 'Tue', 'Wed', 'Fri'], hours: '11:00 AM – 6:00 PM',
    rating: 4.9, reviewCount: 256,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Hina Raza has guided hundreds of patients through pregnancy and women\'s health concerns with a warm, patient-centered approach. She is especially known for her care of high-risk pregnancies.',
    education: ['MBBS — Fatima Jinnah Medical University', 'FCPS Gynecology & Obstetrics — CPSP'],
    certifications: ['Board Certified Gynecologist', 'Certified in Minimally Invasive Gynecologic Surgery'],
    reviews: [
      { name: 'Mahnoor A.', rating: 5, text: 'She made a high-risk pregnancy feel manageable — forever grateful.' },
      { name: 'Sara Q.', rating: 5, text: 'Compassionate, thorough, and always makes time for questions.' }
    ]
  },
  {
    id: 6, name: 'Dr. Farhan Siddiqui', specialty: 'ENT', department: 'ENT',
    qualifications: 'MBBS, FCPS (ENT)', experience: 10, languages: ['English', 'Urdu'],
    expertise: ['Sinus Disorders', 'Hearing Loss', 'Tonsillectomy', 'Voice & Throat Disorders'],
    fee: 2400, days: ['Mon', 'Thu', 'Sat'], hours: '9:00 AM – 1:00 PM',
    rating: 4.6, reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Farhan Siddiqui treats a full range of ear, nose and throat conditions, from chronic sinus issues to hearing loss, combining medical and minor surgical treatment options.',
    education: ['MBBS — Allama Iqbal Medical College', 'FCPS ENT — CPSP'],
    certifications: ['Board Certified ENT Surgeon'],
    reviews: [
      { name: 'Kamran S.', rating: 5, text: 'Finally resolved my chronic sinus issues after years of discomfort.' },
      { name: 'Iqra N.', rating: 4, text: 'Good doctor, clinic gets busy on Saturdays.' }
    ]
  },
  {
    id: 7, name: 'Dr. Sana Tariq', specialty: 'General Medicine', department: 'General Medicine',
    qualifications: 'MBBS, MRCP', experience: 8, languages: ['English', 'Urdu'],
    expertise: ['Preventive Health Checkups', 'Diabetes Management', 'Hypertension', 'Chronic Disease Care'],
    fee: 1800, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], hours: '9:00 AM – 5:00 PM',
    rating: 4.8, reviewCount: 189,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Sana Tariq is a general physician focused on preventive care and long-term chronic disease management, serving as many patients\' primary point of contact for everyday health concerns.',
    education: ['MBBS — Services Institute of Medical Sciences', 'MRCP — Royal College of Physicians, UK'],
    certifications: ['Board Certified General Physician'],
    reviews: [
      { name: 'Talha M.', rating: 5, text: 'My go-to doctor for anything — always available and gives honest advice.' },
      { name: 'Rabia H.', rating: 5, text: 'Helped me get my diabetes under control within a few months.' }
    ]
  },
  {
    id: 8, name: 'Dr. Omar Farooq', specialty: 'Dental', department: 'Dental',
    qualifications: 'BDS, RDS', experience: 14, languages: ['English', 'Urdu'],
    expertise: ['Root Canal Treatment', 'Cosmetic Dentistry', 'Dental Implants', 'Orthodontics'],
    fee: 2000, days: ['Mon', 'Wed', 'Thu', 'Sat'], hours: '10:00 AM – 6:00 PM',
    rating: 4.7, reviewCount: 176,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80',
    bio: 'Dr. Omar Farooq has built a reputation for gentle, precise dental care over 14 years of practice, from routine cleanings to complex restorative and cosmetic procedures.',
    education: ['BDS — de\'Montmorency College of Dentistry', 'RDS — Pakistan Medical Commission'],
    certifications: ['Registered Dental Surgeon', 'Certified in Dental Implantology'],
    reviews: [
      { name: 'Zainab L.', rating: 5, text: 'Painless root canal — I was shocked how comfortable the whole process was.' },
      { name: 'Adeel R.', rating: 4, text: 'Great dentist, a bit pricier than others but worth the quality.' }
    ]
  }
];
