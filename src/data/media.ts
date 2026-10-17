// Image URLs for photos and video posters.
// A real Google Drive file id loads from Drive. A `demo-…` id draws a placeholder
// frame so the design can be reviewed before Ahmed's work arrives.

export type Shape = 'portrait' | 'landscape' | 'square' | 'tall';

const ratios: Record<Shape, [number, number]> = {
  portrait: [4, 5],
  landscape: [3, 2],
  square: [1, 1],
  tall: [2, 3],
};

export const ratio = (s: Shape) => ratios[s];
export const isDemo = (id: string) => id.startsWith('demo');

// Warm, muted tones that sit well on the paper background.
const palettes = [
  ['#c9b49a', '#7d6a55'],
  ['#9fb3b0', '#4d6766'],
  ['#d3a98c', '#8a5a43'],
  ['#b9b2a6', '#5f5a52'],
  ['#a7b6c4', '#4f6175'],
  ['#d8c39d', '#9a7b46'],
  ['#c4a5a1', '#7a5754'],
  ['#aab59a', '#5d6a4c'],
];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** A soft gradient "photo" with a horizon and a sun, as an SVG data URI. */
export function placeholder(id: string, shape: Shape = 'portrait', label = '') {
  const [rw, rh] = ratios[shape];
  const w = 1200;
  const h = Math.round((w * rh) / rw);
  const n = hash(id);
  const [a, b] = palettes[n % palettes.length];
  const sunX = 20 + (n % 60);
  const sunY = 22 + ((n >> 3) % 30);
  const horizon = 55 + ((n >> 5) % 25);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
<radialGradient id="s"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<circle cx="${sunX}%" cy="${sunY}%" r="${Math.round(w * 0.22)}" fill="url(#s)"/>
<rect y="${horizon}%" width="100%" height="${100 - horizon}%" fill="#000" opacity=".12"/>
<text x="48" y="${h - 48}" font-family="Georgia,serif" font-style="italic" font-size="40" fill="#fff" opacity=".7">${label}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Photo URL at a given width. */
export function img(id: string, w: number, shape: Shape = 'portrait', label = '') {
  return isDemo(id) ? placeholder(id, shape, label) : `https://lh3.googleusercontent.com/d/${id}=w${w}`;
}

/** Video poster URL at a given width. */
export function poster(id: string, w = 1280, label = '') {
  return isDemo(id) ? placeholder(id, 'landscape', label) : `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
}
