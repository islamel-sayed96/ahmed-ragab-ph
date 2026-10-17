import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;
const rtl = root.dir === 'rtl';
const isDemo = (id = '') => id.startsWith('demo');

/* ---------- Theme ---------- */
const themeBtn = $<HTMLButtonElement>('[data-theme-toggle]');
function syncTheme() {
  if (!themeBtn) return;
  const dark = root.dataset.theme === 'dark';
  themeBtn.setAttribute('aria-label', dark ? themeBtn.dataset.labelLight! : themeBtn.dataset.labelDark!);
  $('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111416' : '#f4efe6');
}
themeBtn?.addEventListener('click', () => {
  const dark = root.dataset.theme !== 'dark';
  if (dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  syncTheme();
});
syncTheme();

/* ---------- Mobile menu ---------- */
const menuBtn = $<HTMLButtonElement>('[data-menu]');
const nav = $('#nav');
const setMenu = (open: boolean) => { nav?.classList.toggle('open', open); menuBtn?.setAttribute('aria-expanded', String(open)); };
menuBtn?.addEventListener('click', () => setMenu(!nav!.classList.contains('open')));
nav?.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) setMenu(false); });

/* ---------- Masthead hides on the way down, returns on the way up ---------- */
const mast = $('.masthead');
let lastY = scrollY;
addEventListener('scroll', () => {
  const y = scrollY;
  if (mast && !nav?.classList.contains('open')) mast.classList.toggle('hide', y > 300 && y > lastY);
  lastY = y;
}, { passive: true });

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

/* ---------- Hover preview over the contents list and film rows (mouse only) ---------- */
const peek = $('.peek');
if (peek && fine && !reduce) {
  const peekImg = $<HTMLImageElement>('img', peek)!;
  const xTo = gsap.quickTo(peek, 'x', { duration: 0.5, ease: 'power3' });
  const yTo = gsap.quickTo(peek, 'y', { duration: 0.5, ease: 'power3' });
  addEventListener('pointermove', (e) => { xTo(e.clientX + 24); yTo(e.clientY); });
  $$('[data-peek]').forEach((el) => {
    el.addEventListener('pointerenter', () => {
      peekImg.src = el.dataset.peek!;
      peek.classList.toggle('wide', el.classList.contains('film-row'));
      peek.classList.add('on');
    });
    el.addEventListener('pointerleave', () => peek.classList.remove('on'));
  });
}

/* ---------- Motion ---------- */
if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  // Cover: name rises out of its line masks, the photo opens from the middle, side text fades in.
  const nameParts = $$('[data-cover-name] .ln > span, [data-cover-name] .ln > em > span');
  if (nameParts.length) {
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from(nameParts, { yPercent: 105, duration: 1.4, stagger: 0.14 })
      .from('[data-cover-photo] .frame', { clipPath: 'inset(18% 18% 18% 18%)', duration: 1.6, ease: 'expo.inOut' }, 0.1)
      .from('[data-cover-photo] img', { scale: 1.25, duration: 1.8, ease: 'expo.out' }, 0.1)
      .from('[data-fade]', { y: 16, opacity: 0, duration: 1, stagger: 0.1 }, 0.6);
    gsap.to('[data-cover-photo] img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '[data-cover-photo]', start: 'top top', end: 'bottom top', scrub: true } });
  }

  // Statement: words light up one by one as you scroll through it.
  const statement = $('[data-words]');
  if (statement) {
    const walker = document.createTreeWalker(statement, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walker.nextNode()) if (walker.currentNode.textContent!.trim()) texts.push(walker.currentNode as Text);
    texts.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.textContent!.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) { frag.append(part); return; }
        const s = document.createElement('span');
        s.className = 'w';
        s.textContent = part;
        frag.append(s);
      });
      node.replaceWith(frag);
    });
    gsap.to($$('.w', statement), {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: statement, start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
    gsap.from($$('.inl', statement), { width: 0, duration: 1, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: statement, start: 'top 75%' } });
  }

  // Anything marked data-reveal drifts up when it enters.
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.from(els, { y: 48, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity' }),
  });

  // Section titles: a light parallax.
  $$('.sec-head h2, .seas-h, .page-head h1').forEach((h) => {
    gsap.from(h, { yPercent: 30, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 92%' } });
  });

  // Line between the two cities draws itself.
  const line = $('.seas-line span');
  if (line) gsap.from(line, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: '.seas-grid', start: 'top 70%', end: 'bottom 70%', scrub: true } });

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

  // Films band: on wide screens with a mouse, the reel slides sideways while the section is pinned.
  const band = $('[data-hscroll]');
  const track = $('[data-hs-track]');
  const mm = gsap.matchMedia();
  if (band && track) {
    mm.add('(min-width: 861px) and (hover: hover)', () => {
      const viewport = track.parentElement!;
      viewport.style.overflow = 'hidden';
      const dist = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const tween = gsap.to(track, {
        x: () => (rtl ? dist() : -dist()), ease: 'none',
        scrollTrigger: { trigger: band, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true },
      });
      return () => { tween.kill(); viewport.style.overflow = ''; };
    });
  }
}
