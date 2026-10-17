import type { Category } from '../data/photos';
import type { FilmType } from '../data/films';

export type Lang = 'en' | 'ar';
export const langs: Lang[] = ['en', 'ar'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Builds a site URL for a page key ('' = home) in a language. */
export function path(lang: Lang, page = '') {
  const p = page ? `${page}/` : '';
  return lang === 'en' ? `${base}/${p}` : `${base}/ar/${p}`;
}
export const asset = (file: string) => `${base}/${file}`;

// DEMO: the bio, experience and service text are written to fit the layout.
// Replace them with Ahmed's own words once we have his CV.
export const ui = {
  en: {
    dir: 'ltr',
    nav: { work: 'Photography', films: 'Films', about: 'About', contact: 'Book' },
    menu: 'Menu', close: 'Close',
    langSwitch: 'العربية', themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme',
    skip: 'Skip to content',
    issue: 'Portfolio', edition: 'Edition',
    role: 'Photographer & Filmmaker',
    route: ['Alexandria', 'Dubai'],
    coverLines: 'In this edition',
    heroLede: 'Weddings, stages, brands and the sky above them. Shot, filmed and edited by one person, from the first frame to the final cut.',
    ctaBook: 'Book a date', ctaWork: 'Open the portfolio',
    statement: ['I photograph', 'weddings,', 'stages', 'and', 'brands', '— and the quiet seconds between them. From the Mediterranean to the Gulf.'],
    indexTitle: 'Contents', indexLede: 'Six kinds of work. Pick a chapter.',
    photosCount: 'photos',
    selectedTitle: 'Selected frames', selectedLede: 'A few favourites from recent shoots.', seeAllPhotos: 'All photography',
    fig: 'Fig.',
    filmsTitle: 'Moving pictures', filmsLede: 'Wedding films, brand spots, events and drone work.', seeAllFilms: 'All films',
    dragHint: 'Scroll →',
    seasTitle: 'Between two seas',
    seas: [
      { city: 'Alexandria', sea: 'Mediterranean', text: 'Where it started: streets, weddings and the light over the Corniche.' },
      { city: 'Dubai', sea: 'Arabian Gulf', text: 'Where he works now, with brands, agencies, venues and private clients.' },
    ],
    stats: { years: 'Years of work', shoots: 'Shoots delivered', cities: 'Home cities' },
    servicesTitle: 'What I do',
    services: [
      { title: 'Photography', text: 'Weddings, engagements, concerts, events, products, food and places.', items: ['Lighting on location', 'Colour grading and retouching', 'Delivery in 7–10 days'] },
      { title: 'Film', text: 'Wedding films, brand spots, Reels, events and aerial footage.', items: ['Cinema camera and gimbal', 'Horizontal films and vertical Reels', 'Licensed music'] },
      { title: 'Editing', text: 'Already shot it? I can cut, grade and finish it.', items: ['Edit and sound design', 'Colour grading', 'Motion titles'] },
    ],
    clientsTitle: 'Worked with',
    quote: '“He was everywhere and nowhere at the same time. We got every moment and never once felt watched.”',
    quoteBy: 'Client name · Wedding, Dubai',
    contactTitle: ['Have a date?', 'Let’s hold it.'],
    contactLede: 'Tell me what you’re planning. I usually reply the same day.',
    brief: {
      title: 'Quick brief', type: 'What kind of shoot?', date: 'Date', place: 'Where?', placePh: 'Venue or city', name: 'Your name',
      send: 'Send on WhatsApp',
      types: ['Wedding', 'Event', 'Concert', 'Brand / product', 'Other'],
      message: (n: string, t: string, d: string, p: string) =>
        `Hi Ahmed, I'm ${n || '…'}. I'd like to book a ${t.toLowerCase()} shoot${d ? ` on ${d}` : ''}${p ? ` in ${p}` : ''}.`,
    },
    email: 'Email', whatsapp: 'WhatsApp', instagram: 'Instagram', phone: 'Phone', copy: 'Copy', copied: 'Copied',
    downloads: 'Documents', cv: 'Download CV', portfolioPdf: 'Portfolio PDF',
    photoPageTitle: 'Photography', photoPageLede: 'Every chapter of the work in one place. Tap a photo to see it full size.', all: 'All',
    filmPageTitle: 'Films', filmPageLede: 'Filmed and edited by Ahmed. Press any title to play.',
    aboutTitle: 'About', aboutKicker: 'The person behind the camera',
    bio: [
      'I’m Ahmed Ragab, a photographer and filmmaker from Alexandria, Egypt, now based in Dubai.',
      'I shoot weddings, concerts, events and brands, and I edit everything myself, so the person who saw the moment is the one who finishes it. I care about honest light, clean frames and stories that feel like the day did.',
    ],
    historyTitle: 'Experience',
    history: [
      { years: '2024 – now', role: 'Freelance photographer & filmmaker', place: 'Dubai, UAE' },
      { years: '2020 – 2024', role: 'Lead photographer', place: 'Studio name, Egypt' },
      { years: '2016 – 2020', role: 'Photographer & editor', place: 'Agency name, Egypt' },
      { years: '2012 – 2016', role: 'Photographer', place: 'Alexandria, Egypt' },
    ],
    kitTitle: 'Kit', kit: { camera: 'Camera', lens: 'Lenses', motion: 'Motion & audio', software: 'Software' },
    languagesTitle: 'Languages', languages: 'Arabic · English',
    cats: { weddings: 'Weddings', concerts: 'Concerts', events: 'Events', brands: 'Brands', food: 'Food', places: 'Places' } as Record<Category, string>,
    filmTypes: { wedding: 'Wedding', event: 'Event', brand: 'Brand', drone: 'Drone' } as Record<FilmType, string>,
    watch: 'Play', openDrive: 'Open on Google Drive ↗', prev: 'Previous', next: 'Next',
    demoVideo: 'The video will be here once the files are uploaded.',
    footerLine: 'Photography · Film · Editing',
    notFoundTitle: 'Missing page', notFoundText: 'This page isn’t in the edition. The work still is.', backHome: 'Back to the cover',
    meta: {
      home: { title: 'Ahmed Ragab · Photographer & Filmmaker in Dubai', description: 'Ahmed Ragab is a photographer and filmmaker from Alexandria, based in Dubai. Weddings, concerts, events, brands and drone work.' },
      photography: { title: 'Photography · Ahmed Ragab', description: 'Wedding, concert, event, brand, food and place photography by Ahmed Ragab in Dubai and Egypt.' },
      films: { title: 'Films · Ahmed Ragab', description: 'Wedding films, brand videos, events and drone footage filmed and edited by Ahmed Ragab.' },
      about: { title: 'About · Ahmed Ragab', description: 'Ahmed Ragab: experience, kit and story of a photographer and filmmaker from Alexandria, based in Dubai.' },
    },
  },
  ar: {
    dir: 'rtl',
    nav: { work: 'الصور', films: 'الفيديو', about: 'عنّي', contact: 'احجز' },
    menu: 'القائمة', close: 'إغلاق',
    langSwitch: 'English', themeDark: 'الوضع الداكن', themeLight: 'الوضع الفاتح',
    skip: 'تخطَّ إلى المحتوى',
    issue: 'بورتفوليو', edition: 'إصدار',
    role: 'مصوّر فوتوغرافي وصانع أفلام',
    route: ['إسكندرية', 'دبي'],
    coverLines: 'في العدد ده',
    heroLede: 'أفراح ومسارح وبراندات والسما اللي فوقهم. تصوير وفيديو ومونتاج بإيد واحدة، من أول لقطة لحد آخر مشهد.',
    ctaBook: 'احجز ميعاد', ctaWork: 'افتح البورتفوليو',
    statement: ['بصوّر', 'الأفراح،', 'والمسارح', 'و', 'البراندات', '— والثواني الهادية اللي بينهم. من البحر المتوسط للخليج.'],
    indexTitle: 'الفهرس', indexLede: 'ست أنواع من الشغل. اختار الفصل.',
    photosCount: 'صورة',
    selectedTitle: 'لقطات مختارة', selectedLede: 'شوية من أحب الصور من آخر جلسات التصوير.', seeAllPhotos: 'كل الصور',
    fig: 'شكل',
    filmsTitle: 'صور بتتحرك', filmsLede: 'أفلام أفراح وإعلانات براندات وإيفنتات وتصوير جوي.', seeAllFilms: 'كل الفيديوهات',
    dragHint: '← اسحب',
    seasTitle: 'بين بحرين',
    seas: [
      { city: 'إسكندرية', sea: 'البحر المتوسط', text: 'البداية: الشوارع والأفراح ونور الكورنيش.' },
      { city: 'دبي', sea: 'الخليج العربي', text: 'الشغل دلوقتي، مع براندات ووكالات وأماكن وعملاء أفراد.' },
    ],
    stats: { years: 'سنين شغل', shoots: 'جلسة تصوير', cities: 'مدينتين' },
    servicesTitle: 'بعمل إيه',
    services: [
      { title: 'تصوير فوتوغرافي', text: 'أفراح وخطوبات وحفلات وإيفنتات ومنتجات وأكل وأماكن.', items: ['إضاءة في الموقع', 'تلوين وريتاتش', 'تسليم خلال 7 لـ 10 أيام'] },
      { title: 'فيديو', text: 'أفلام أفراح وإعلانات وريلز وإيفنتات وتصوير جوي.', items: ['كاميرا سينما وجيمبال', 'فيديو بالعرض وريلز بالطول', 'موسيقى مرخّصة'] },
      { title: 'مونتاج', text: 'صوّرت خلاص؟ أقدر أمنتج وألوّن وأخلّص.', items: ['مونتاج وتصميم صوت', 'تلوين', 'عناوين متحركة'] },
    ],
    clientsTitle: 'اشتغلت مع',
    quote: '«كان موجود في كل حتة ومش حاسين بيه خالص. خدنا كل لحظة ومحسّيناش مرة إن حد بيراقبنا.»',
    quoteBy: 'اسم العميل · فرح، دبي',
    contactTitle: ['عندك ميعاد؟', 'يلا نحجزه.'],
    contactLede: 'قولّي بتخطط لإيه. غالباً برد في نفس اليوم.',
    brief: {
      title: 'تفاصيل سريعة', type: 'نوع التصوير؟', date: 'التاريخ', place: 'فين؟', placePh: 'المكان أو المدينة', name: 'اسمك',
      send: 'ابعت على واتساب',
      types: ['فرح', 'إيفنت', 'حفلة', 'براند / منتج', 'حاجة تانية'],
      message: (n: string, t: string, d: string, p: string) =>
        `أهلاً أحمد، أنا ${n || '…'}. عايز أحجز تصوير ${t}${d ? ` يوم ${d}` : ''}${p ? ` في ${p}` : ''}.`,
    },
    email: 'الإيميل', whatsapp: 'واتساب', instagram: 'إنستجرام', phone: 'التليفون', copy: 'نسخ', copied: 'اتنسخ',
    downloads: 'ملفات', cv: 'تحميل السي في', portfolioPdf: 'البورتفوليو PDF',
    photoPageTitle: 'الصور', photoPageLede: 'كل فصول الشغل في مكان واحد. دوس على أي صورة عشان تشوفها كبيرة.', all: 'الكل',
    filmPageTitle: 'الفيديو', filmPageLede: 'تصوير ومونتاج أحمد. دوس على أي عنوان عشان يشتغل.',
    aboutTitle: 'عنّي', aboutKicker: 'اللي ورا الكاميرا',
    bio: [
      'أنا أحمد رجب، مصوّر فوتوغرافي وصانع أفلام من إسكندرية، ودلوقتي مقيم في دبي.',
      'بصوّر أفراح وحفلات وإيفنتات وبراندات، وبعمل المونتاج بنفسي، عشان اللي شاف اللحظة هو اللي يخلّصها. بهتم بالنور الصادق والكادر النضيف والحكاية اللي تحسسك باليوم زي ما كان.',
    ],
    historyTitle: 'الخبرة',
    history: [
      { years: '2024 – الآن', role: 'مصوّر وصانع أفلام فري لانس', place: 'دبي، الإمارات' },
      { years: '2020 – 2024', role: 'مصوّر رئيسي', place: 'اسم الاستوديو، مصر' },
      { years: '2016 – 2020', role: 'مصوّر ومونتير', place: 'اسم الوكالة، مصر' },
      { years: '2012 – 2016', role: 'مصوّر', place: 'إسكندرية، مصر' },
    ],
    kitTitle: 'المعدات', kit: { camera: 'الكاميرا', lens: 'العدسات', motion: 'الحركة والصوت', software: 'البرامج' },
    languagesTitle: 'اللغات', languages: 'العربية · الإنجليزية',
    cats: { weddings: 'أفراح', concerts: 'حفلات', events: 'إيفنتات', brands: 'براندات', food: 'أكل', places: 'أماكن' } as Record<Category, string>,
    filmTypes: { wedding: 'فرح', event: 'إيفنت', brand: 'براند', drone: 'درون' } as Record<FilmType, string>,
    watch: 'شغّل', openDrive: 'افتح على جوجل درايف ↗', prev: 'السابق', next: 'التالي',
    demoVideo: 'الفيديو هيظهر هنا أول ما الملفات تترفع.',
    footerLine: 'تصوير · فيديو · مونتاج',
    notFoundTitle: 'صفحة ناقصة', notFoundText: 'الصفحة دي مش في العدد، بس الشغل لسه موجود.', backHome: 'ارجع للغلاف',
    meta: {
      home: { title: 'أحمد رجب · مصوّر فوتوغرافي وصانع أفلام في دبي', description: 'أحمد رجب مصوّر فوتوغرافي وصانع أفلام من إسكندرية ومقيم في دبي. أفراح وحفلات وإيفنتات وبراندات وتصوير جوي.' },
      photography: { title: 'الصور · أحمد رجب', description: 'تصوير أفراح وحفلات وإيفنتات وبراندات وأكل وأماكن بعدسة أحمد رجب في دبي ومصر.' },
      films: { title: 'الفيديو · أحمد رجب', description: 'أفلام أفراح وإعلانات وإيفنتات وتصوير جوي، تصوير ومونتاج أحمد رجب.' },
      about: { title: 'عن أحمد رجب', description: 'خبرة ومعدات وحكاية أحمد رجب، مصوّر وصانع أفلام من إسكندرية ومقيم في دبي.' },
    },
  },
} as const;
