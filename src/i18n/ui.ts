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

// DEMO: the bio, experience, quote and package text are written to fit the layout.
// Replace them with Ahmed's own words once we have his CV and prices.
export const ui = {
  en: {
    dir: 'ltr',
    nav: { work: 'Photography', films: 'Films', about: 'About', packages: 'Packages', contact: "Let's talk" },
    menu: 'Menu', close: 'Close',
    langSwitch: 'العربية',
    skip: 'Skip to content',
    role: 'Photographer & Filmmaker',
    by: 'By', city: 'Dubai · UAE', from: 'From Alexandria',
    heroLede: 'Weddings, concerts, events, brands and aerial work across the UAE and Egypt. Shot and edited from the first frame to the final cut.',
    ctaBook: 'Book a shoot', ctaWork: 'See the work',
    exploreKicker: 'Explore the', exploreTitle: 'Work', view: 'View',
    reelKicker: 'Watch the', reelTitle: 'Showreel', reelPlay: 'Play showreel',
    aboutKicker: 'About me', aboutHi: ['Hi, I’m Ahmed.', 'I photograph moments.'],
    aboutText: [
      'A photographer and filmmaker from Alexandria, Egypt, now working from Dubai.',
      'Weddings, stages, brands and the sky above them: I shoot it, film it and edit it myself, so the person who saw the moment is the one who finishes it.',
    ],
    aboutMore: 'More about me',
    stats: { years: 'Years behind the camera', shoots: 'Shoots delivered', countries: 'Countries: UAE & Egypt' },
    skillsKicker: 'My skillset', skillsTitle: ['Behind the lens,', 'and after it.'],
    skills: [
      { icon: 'camera', title: 'Photography', text: 'Weddings, events, concerts, products, food and places.' },
      { icon: 'film', title: 'Film', text: 'Wedding films, brand spots, Reels and event coverage.' },
      { icon: 'drone', title: 'Aerial', text: 'Licensed drone photos and video from above.' },
      { icon: 'edit', title: 'Editing', text: 'Cut, colour grade, sound and retouching.' },
    ],
    filmsKicker: 'Selected', filmsTitle: 'Films', seeAllFilms: 'All films',
    stageKicker: 'Concert photography', stageTitle: 'On stage with', alsoOnStage: 'Also on stage with',
    quoteTitle: 'Memorable moments',
    quote: 'Ahmed made us feel like a friend had come to shoot our day. Guests kept asking how long we had known him. He was part of the day, not watching it from the side, and every photo feels like we remember it.',
    quoteBy: 'Client name · Wedding, Dubai',
    packagesKicker: 'Investment', packagesTitle: ['Wedding', 'Packages'],
    packagesText: [
      'However you picture your day, there’s a package to cover it: from getting ready to the last dance, so you can relax and live it.',
      'Celebrating outside the UAE? Destination weddings in Egypt and beyond are welcome. Ask about travel.',
    ],
    includedTitle: 'What’s included?',
    included: 'Getting-ready photos, the full ceremony, family portraits, reception and a sunset couple session. Optional engagement shoot and film.',
    packages: [
      { name: 'Half day · 6 hours', items: ['One photographer', '400+ edited photos', 'Online gallery', 'Delivery in 3 weeks'] },
      { name: 'Full day · 10 hours', items: ['Photographer + filmmaker', '700+ edited photos', '3–5 minute wedding film', 'Teaser Reel in 72 hours'] },
      { name: 'Events & brands', items: ['Hourly or daily rate', 'Photos and/or video', 'Vertical Reels for social', 'Same-day selects on request'] },
    ],
    priceNote: 'Prices on request',
    trustedKicker: 'I was working with',
    contactKicker: 'Interested in working together?', contactTitle: "Let's talk",
    contactLede: 'Tell me your date, place and what you need. I usually reply the same day.',
    brief: {
      title: 'Quick brief', type: 'What kind of shoot?', date: 'Date', place: 'Where?', placePh: 'Venue or city', name: 'Your name',
      send: 'Send on WhatsApp',
      types: ['Wedding', 'Event', 'Concert', 'Brand / product', 'Other'],
    },
    email: 'Email', whatsapp: 'WhatsApp', instagram: 'Instagram', phone: 'Phone', copy: 'Copy', copied: 'Copied',
    downloads: 'Documents', cv: 'Download CV', portfolioPdf: 'Portfolio PDF',
    photoPageKicker: 'Gallery', photoPageTitle: 'Photography', photoPageLede: 'Weddings, concerts, events, brands, food and places. Tap any photo to view it full size.', all: 'All',
    filmPageKicker: 'Moving pictures', filmPageTitle: 'Films', filmPageLede: 'Wedding films, brand videos, events and drone work. Filmed and edited by Ahmed.',
    aboutPageKicker: 'The person behind the camera', aboutTitle: 'About',
    bio: [
      'I’m Ahmed Ragab, a photographer and filmmaker from Alexandria, Egypt, now based in Dubai.',
      'I shoot weddings, concerts, events and brands, and I edit everything myself. I care about honest light, clean frames and stories that feel like the day did.',
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
    demoVideo: 'The video will appear here once the files are uploaded.',
    footerLine: 'Photography · Film · Editing',
    notFoundTitle: 'Out of frame', notFoundText: 'This page doesn’t exist. The work still does.', backHome: 'Back to home',
    meta: {
      home: { title: 'Ahmed Ragab · Photographer & Filmmaker in Dubai', description: 'Ahmed Ragab is a photographer and filmmaker from Alexandria, based in Dubai. Weddings, concerts, events, brands and drone work.' },
      photography: { title: 'Photography · Ahmed Ragab', description: 'Wedding, concert, event, brand, food and place photography by Ahmed Ragab in Dubai and Egypt.' },
      films: { title: 'Films · Ahmed Ragab', description: 'Wedding films, brand videos, events and drone footage filmed and edited by Ahmed Ragab.' },
      about: { title: 'About · Ahmed Ragab', description: 'Ahmed Ragab: experience, kit and story of a photographer and filmmaker from Alexandria, based in Dubai.' },
    },
  },
  ar: {
    dir: 'rtl',
    nav: { work: 'الصور', films: 'الفيديو', about: 'عنّي', packages: 'الباقات', contact: 'تواصل معايا' },
    menu: 'القائمة', close: 'إغلاق',
    langSwitch: 'English',
    skip: 'تخطَّ إلى المحتوى',
    role: 'مصوّر فوتوغرافي وصانع أفلام',
    by: 'بعدسة', city: 'دبي · الإمارات', from: 'من إسكندرية',
    heroLede: 'أفراح وحفلات وإيفنتات وبراندات وتصوير جوي في الإمارات ومصر. تصوير ومونتاج من أول لقطة لحد آخر مشهد.',
    ctaBook: 'احجز تصوير', ctaWork: 'شوف الشغل',
    exploreKicker: 'اكتشف', exploreTitle: 'الشغل', view: 'شوف',
    reelKicker: 'شاهد', reelTitle: 'الشوريل', reelPlay: 'شغّل الشوريل',
    aboutKicker: 'عنّي', aboutHi: ['أهلاً، أنا أحمد.', 'بصوّر اللحظات.'],
    aboutText: [
      'مصوّر فوتوغرافي وصانع أفلام من إسكندرية، ودلوقتي شغال من دبي.',
      'أفراح ومسارح وبراندات والسما اللي فوقهم: بصوّر وبعمل الفيديو والمونتاج بنفسي، عشان اللي شاف اللحظة هو اللي يخلّصها.',
    ],
    aboutMore: 'اعرف عني أكتر',
    stats: { years: 'سنة خلف الكاميرا', shoots: 'جلسة تصوير', countries: 'دولتين: الإمارات ومصر' },
    skillsKicker: 'بعمل إيه', skillsTitle: ['ورا العدسة،', 'وبعدها كمان.'],
    skills: [
      { icon: 'camera', title: 'تصوير فوتوغرافي', text: 'أفراح وإيفنتات وحفلات ومنتجات وأكل وأماكن.' },
      { icon: 'film', title: 'فيديو', text: 'أفلام أفراح وإعلانات براندات وريلز وتغطية إيفنتات.' },
      { icon: 'drone', title: 'تصوير جوي', text: 'صور وفيديو بالدرون من فوق.' },
      { icon: 'edit', title: 'مونتاج', text: 'مونتاج وتلوين وصوت وريتاتش.' },
    ],
    filmsKicker: 'مختارات', filmsTitle: 'الفيديو', seeAllFilms: 'كل الفيديوهات',
    stageKicker: 'تصوير حفلات', stageTitle: 'على المسرح مع', alsoOnStage: 'وكمان على المسرح مع',
    quoteTitle: 'لحظات متتنسيش',
    quote: 'أحمد خلّانا نحس إن صاحبنا هو اللي جاي يصوّر فرحنا. الناس فضلت تسألنا نعرفه من إمتى. كان جزء من اليوم مش بيتفرج عليه من بعيد، وكل صورة حاسين إنها زي ما فاكرينها.',
    quoteBy: 'اسم العميل · فرح، دبي',
    packagesKicker: 'الأسعار', packagesTitle: ['باقات', 'الأفراح'],
    packagesText: [
      'مهما كان تخيّلك ليومك، فيه باقة تغطيه: من التجهيز لحد آخر رقصة، عشان تبقى مرتاح وتعيش اليوم.',
      'الفرح برّه الإمارات؟ أفراح مصر وأي مكان تاني مرحّب بيها. اسأل عن مصاريف السفر.',
    ],
    includedTitle: 'الباقة فيها إيه؟',
    included: 'صور التجهيز، والكتب كامل، وصور العيلة، والقاعة، وجلسة العروسين وقت الغروب. وجلسة خطوبة وفيلم كإضافة.',
    packages: [
      { name: 'نص يوم · 6 ساعات', items: ['مصوّر واحد', 'أكتر من 400 صورة متعدّلة', 'جاليري أونلاين', 'تسليم خلال 3 أسابيع'] },
      { name: 'يوم كامل · 10 ساعات', items: ['مصوّر وصانع أفلام', 'أكتر من 700 صورة متعدّلة', 'فيلم فرح من 3 لـ 5 دقايق', 'ريل تشويقي خلال 72 ساعة'] },
      { name: 'إيفنتات وبراندات', items: ['بالساعة أو باليوم', 'صور و/أو فيديو', 'ريلز بالطول للسوشيال', 'صور مختارة في نفس اليوم عند الطلب'] },
    ],
    priceNote: 'الأسعار عند الطلب',
    trustedKicker: 'اشتغلت مع',
    contactKicker: 'حابب نشتغل سوا؟', contactTitle: 'يلا نتكلم',
    contactLede: 'قولّي على الميعاد والمكان واللي محتاجه. غالباً برد في نفس اليوم.',
    brief: {
      title: 'تفاصيل سريعة', type: 'نوع التصوير؟', date: 'التاريخ', place: 'فين؟', placePh: 'المكان أو المدينة', name: 'اسمك',
      send: 'ابعت على واتساب',
      types: ['فرح', 'إيفنت', 'حفلة', 'براند / منتج', 'حاجة تانية'],
    },
    email: 'الإيميل', whatsapp: 'واتساب', instagram: 'إنستجرام', phone: 'التليفون', copy: 'نسخ', copied: 'اتنسخ',
    downloads: 'ملفات', cv: 'تحميل السي في', portfolioPdf: 'البورتفوليو PDF',
    photoPageKicker: 'الجاليري', photoPageTitle: 'الصور', photoPageLede: 'أفراح وحفلات وإيفنتات وبراندات وأكل وأماكن. دوس على أي صورة عشان تشوفها كبيرة.', all: 'الكل',
    filmPageKicker: 'صور بتتحرك', filmPageTitle: 'الفيديو', filmPageLede: 'أفلام أفراح وإعلانات وإيفنتات وتصوير جوي. تصوير ومونتاج أحمد.',
    aboutPageKicker: 'اللي ورا الكاميرا', aboutTitle: 'عنّي',
    bio: [
      'أنا أحمد رجب، مصوّر فوتوغرافي وصانع أفلام من إسكندرية، ودلوقتي مقيم في دبي.',
      'بصوّر أفراح وحفلات وإيفنتات وبراندات، وبعمل المونتاج بنفسي. بهتم بالنور الصادق والكادر النضيف والحكاية اللي تحسسك باليوم زي ما كان.',
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
    notFoundTitle: 'خارج الكادر', notFoundText: 'الصفحة دي مش موجودة، بس الشغل لسه موجود.', backHome: 'ارجع للرئيسية',
    meta: {
      home: { title: 'أحمد رجب · مصوّر فوتوغرافي وصانع أفلام في دبي', description: 'أحمد رجب مصوّر فوتوغرافي وصانع أفلام من إسكندرية ومقيم في دبي. أفراح وحفلات وإيفنتات وبراندات وتصوير جوي.' },
      photography: { title: 'الصور · أحمد رجب', description: 'تصوير أفراح وحفلات وإيفنتات وبراندات وأكل وأماكن بعدسة أحمد رجب في دبي ومصر.' },
      films: { title: 'الفيديو · أحمد رجب', description: 'أفلام أفراح وإعلانات وإيفنتات وتصوير جوي، تصوير ومونتاج أحمد رجب.' },
      about: { title: 'عن أحمد رجب', description: 'خبرة ومعدات وحكاية أحمد رجب، مصوّر وصانع أفلام من إسكندرية ومقيم في دبي.' },
    },
  },
} as const;
