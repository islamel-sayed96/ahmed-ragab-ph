// Everything about Ahmed that appears across the site. Edit here, not in the pages.
// DEMO: contact details, links and client names below are placeholders until we get his real info.

const drive = (id: string) => (id ? `https://drive.google.com/file/d/${id}/view` : '#');

export const site = {
  brand: 'Ahmed Ragab',
  fullName: 'Ahmed Ragab',
  handle: 'ahmedragab.visuals',
  email: 'hello@ahmedragab.com',
  phone: '+971 50 000 0000',
  phoneHref: '+971500000000',
  instagram: 'https://www.instagram.com/',
  whatsappNumber: '971500000000',
  since: 2012,
  cv: drive(''),
  portfolioPdf: drive(''),
  driveFolder: '#',
};

export const whatsapp = (text = '') =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const yearsActive = new Date().getFullYear() - site.since;

// Brands, agencies and events. DEMO names.
export const clients = [
  'Client One', 'Studio Two', 'Brand Three', 'Agency Four', 'Event Five', 'Hotel Six',
  'Festival Seven', 'Clinic Eight', 'Label Nine', 'Gallery Ten',
];

// Artists photographed on stage. DEMO names.
export const artists = ['Artist One', 'Artist Two', 'Artist Three', 'Artist Four', 'Artist Five', 'Artist Six'];

export const gear = {
  camera: 'Sony A7 IV · Sony FX3',
  lens: 'Sony 24–70 GM II · 85mm f/1.4',
  motion: 'DJI RS gimbal · DJI drone · Wireless audio',
  software: 'Premiere Pro · DaVinci Resolve · Lightroom · Photoshop',
};
