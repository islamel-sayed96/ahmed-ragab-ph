import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;
const rtl = root.dir === 'rtl';
const isDemo = (id = '') => id.startsWith('demo');

/* ---------- Mobile menu ---------- */
const menuBtn = $<HTMLButtonElement>('[data-menu]');
const nav = $('#nav');
const setMenu = (open: boolean) => { nav?.classList.toggle('open', open); menuBtn?.setAttribute('aria-expanded', String(open)); };
menuBtn?.addEventListener('click', () => setMenu(!nav!.classList.contains('open')));
nav?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setMenu(false); });

/* ---------- Header turns solid once you scroll past the top ---------- */
const header = $('.site-header');
const onScroll = () => header?.classList.toggle('solid', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Hero strip: the active photo grows and fills the background ---------- */
const stage = $('[data-stage]');
if (stage) {
  const items = $$<HTMLButtonElement>('[data-slide]', stage);
  const bgs = $$<HTMLImageElement>('.stage-bg img', stage);
  const track = $('[data-strip-track]', stage)!;
  const strip = $('[data-strip]', stage)!;
  const now = $('[data-count-now]', stage)!;
  const bar = $('[data-count-bar]', stage)!;
  const n = items.length;
  let active = 0;
  let timer = 0;
  const center = () => {
    // The strip is always 2.1 thumbnails tall, so it gives the base size even mid-animation.
    const h = strip.clientHeight / 2.1 || 120;
    const gap = 6;
    const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
    const left = pad + active * (h * 1.5 + gap) + (h * 1.35) / 2;
    const max = pad * 2 + (n - 1) * (h * 1.5 + gap) + h * 1.35 - strip.clientWidth;
    const shift = Math.max(0, Math.min(left - strip.clientWidth / 2, Math.max(0, max)));
    track.style.transform = `translateX(${rtl ? shift : -shift}px)`;
  };
  const go = (i: number) => {
    active = (i + n) % n;
    items.forEach((b, k) => { b.classList.toggle('on', k === active); b.setAttribute('aria-pressed', String(k === active)); });
    bgs.forEach((im, k) => im.classList.toggle('on', k === active));
    now.textContent = String(active + 1).padStart(2, '0');
    bar.style.insetInlineStart = `${(active * 100) / n}%`;
    center();
  };
  const play = () => { if (!reduce) { clearInterval(timer); timer = window.setInterval(() => go(active + 1), 4500); } };
  items.forEach((b, k) => b.addEventListener('click', () => { go(k); play(); }));
  stage.addEventListener('pointerenter', () => clearInterval(timer));
  stage.addEventListener('pointerleave', play);
  addEventListener('resize', center);
  // Keyboard focus would scroll the clipped strip natively; keep it still and let the transform do the moving.
  strip.addEventListener('scroll', () => { strip.scrollLeft = 0; });
  items.forEach((b, k) => b.addEventListener('focus', () => { if (k !== active) { go(k); clearInterval(timer); } }));
  center();
  play();
}

/* ---------- Drive images: retry through the thumbnail endpoint once ---------- */
function watchImage(img: HTMLImageElement) {
  const id = img.dataset.drive || img.dataset.driveVideo;
  if (!id || isDemo(id)) return;
  img.addEventListener('error', () => {
    if (img.dataset.retried) { img.style.visibility = 'hidden'; return; }
    img.dataset.retried = '1';
    img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
  });
}
$$<HTMLImageElement>('img[data-drive], img[data-drive-video]').forEach(watchImage);

/* ---------- Dialogs ---------- */
$$('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog')!.close()));
$$<HTMLDialogElement>('dialog').forEach((d) =>
  d.addEventListener('click', (e) => {
    const el = e.target as Element;
    if (el.classList.contains('lb') || el.classList.contains('lb-stage')) d.close();
  }),
);

/* ---------- Lightbox ---------- */
const lb = $<HTMLDialogElement>('#lightbox')!;
const lbStage = $('[data-lb-stage]', lb)!;
let lbItems: HTMLElement[] = [];
let lbIndex = 0;
function showLb() {
  const btn = lbItems[lbIndex];
  const id = btn.dataset.lightbox!;
  const im = new Image();
  im.alt = btn.getAttribute('aria-label') ?? '';
  im.dataset.drive = id;
  // Demo frames reuse the same drawing; real photos load a large Drive copy.
  im.src = isDemo(id) ? $<HTMLImageElement>('img', btn)!.src : `https://lh3.googleusercontent.com/d/${id}=w2200`;
  watchImage(im);
  lbStage.replaceChildren(im);
  $('[data-lb-cap]', lb)!.textContent = btn.dataset.caption ?? '';
  $('[data-lb-count]', lb)!.textContent = `${lbIndex + 1} / ${lbItems.length}`;
}
const stepLb = (d: number) => { lbIndex = (lbIndex + d + lbItems.length) % lbItems.length; showLb(); };
document.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest<HTMLElement>('[data-lightbox]');
  if (!btn) return;
  const sheet = btn.closest('[data-sheet]') ?? document;
  lbItems = $$<HTMLElement>('[data-lightbox]', sheet).filter((b) => !b.closest('.still')?.hasAttribute('hidden'));
  lbIndex = lbItems.indexOf(btn);
  showLb();
  lb.showModal();
});
$('[data-lb-prev]', lb)?.addEventListener('click', () => stepLb(-1));
$('[data-lb-next]', lb)?.addEventListener('click', () => stepLb(1));
lb.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') stepLb(rtl ? -1 : 1);
  if (e.key === 'ArrowLeft') stepLb(rtl ? 1 : -1);
});
let touchX = 0;
lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
lb.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) stepLb((dx < 0) !== rtl ? 1 : -1);
});

/* ---------- Filters (also reads ?c=weddings from the home page links) ---------- */
const filters = $('[data-filters]');
function applyFilter(cat: string) {
  if (!filters) return;
  const chip = $(`[data-cat="${cat}"]`, filters) ?? $('[data-cat="all"]', filters)!;
  const c = chip.dataset.cat!;
  $$('[data-cat]', filters).forEach((b) => b.setAttribute('aria-pressed', String(b === chip)));
  $$('.still').forEach((f) => f.toggleAttribute('hidden', !(c === 'all' || f.dataset.cat === c)));
  if (!reduce) ScrollTrigger.refresh();
}
filters?.addEventListener('click', (e) => {
  const chip = (e.target as Element).closest<HTMLElement>('[data-cat]');
  if (!chip) return;
  applyFilter(chip.dataset.cat!);
  const url = new URL(location.href);
  if (chip.dataset.cat === 'all') url.searchParams.delete('c'); else url.searchParams.set('c', chip.dataset.cat!);
  history.replaceState(null, '', url);
});
const startCat = new URLSearchParams(location.search).get('c');
if (startCat) applyFilter(startCat);

/* ---------- Video player ---------- */
const vp = $<HTMLDialogElement>('#player')!;
const vpStage = $('[data-vp-stage]', vp)!;
document.addEventListener('click', (e) => {
  const a = (e.target as Element).closest<HTMLAnchorElement>('[data-video]');
  if (!a || e.metaKey || e.ctrlKey) return;
  e.preventDefault();
  const id = a.dataset.video!;
  $('[data-vp-title]', vp)!.textContent = a.dataset.title ?? '';
  const link = $<HTMLAnchorElement>('[data-vp-link]', vp)!;
  if (isDemo(id)) {
    const note = document.createElement('p');
    note.className = 'demo-note';
    note.textContent = vpStage.dataset.demoText ?? '';
    vpStage.replaceChildren(note);
    link.hidden = true;
  } else {
    const fr = document.createElement('iframe');
    fr.src = `https://drive.google.com/file/d/${id}/preview`;
    fr.allow = 'autoplay; fullscreen; picture-in-picture';
    fr.allowFullscreen = true;
    fr.title = a.dataset.title ?? 'Video';
    vpStage.replaceChildren(fr);
    link.hidden = false;
    link.href = `https://drive.google.com/file/d/${id}/view`;
  }
  vp.showModal();
});
vp.addEventListener('close', () => vpStage.replaceChildren());

/* ---------- Copy buttons ---------- */
$$<HTMLButtonElement>('[data-copy]').forEach((b) => {
  const label = b.textContent;
  b.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(b.dataset.copy!); b.textContent = b.dataset.done!; } catch {}
    setTimeout(() => (b.textContent = label), 1600);
  });
});

/* ---------- Quick brief → WhatsApp ---------- */
const brief = $<HTMLFormElement>('[data-brief]');
brief?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(brief);
  const v = (k: string) => String(f.get(k) ?? '').trim();
  const [n, t, d, p] = [v('name'), v('type'), v('date'), v('place')];
  const msg = brief.dataset.lang === 'ar'
    ? `أهلاً أحمد، أنا ${n || '…'}. عايز أحجز تصوير ${t}${d ? ` يوم ${d}` : ''}${p ? ` في ${p}` : ''}.`
    : `Hi Ahmed, I'm ${n || '…'}. I'd like to book a ${t.toLowerCase()} shoot${d ? ` on ${d}` : ''}${p ? ` in ${p}` : ''}.`;
  window.open(`https://wa.me/${brief.dataset.wa}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

/* ---------- Motion ---------- */
if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero: the name rises out of its line masks, the strip slides in, the rest fades up.
  const nameParts = $$('[data-hero-name] .ln > span');
  if (nameParts.length) {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(nameParts, { yPercent: 110, duration: 1.4, stagger: 0.12 })
      .from('[data-strip-track] .strip-item', { y: 40, opacity: 0, duration: 1.1, stagger: 0.05 }, 0.2)
      .from('[data-hero-fade]', { y: 16, opacity: 0, duration: 1, stagger: 0.1 }, 0.5);
  }

  // Anything marked data-reveal drifts up when it enters.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.from(els, { y: 44, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity' }),
  });

  // Section titles fade up.
  $$('.title-block h2, .serif-h, .page-head h1, .pk-title, .quote-inner h2, .contact-head h2').forEach((h) => {
    gsap.from(h, { y: 30, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 90%' } });
  });

  // Slow drift on the big background photos.
  $$('.quote-band img').forEach((im) => {
    gsap.fromTo(im, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: im.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  gsap.to('.reel-band .reel img', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.reel-band', start: 'top bottom', end: 'bottom top', scrub: true } });

  // Numbers count up.
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.textContent!.replace(/[0-9]/g, '');
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end, duration: 1.6, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v) + suffix),
    });
  });
}
