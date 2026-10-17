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

// Moody, warm tones that sit well on the dark background.
const palettes = [
  ['#6b5a46', '#1c1712'],
  ['#4f5f5c', '#121817'],
  ['#7a5442', '#1e1310'],
  ['#5c5850', '#151412'],
  ['#4c5868', '#11151b'],
  ['#7d6a45', '#1d180f'],
  ['#6e4c4a', '#1a1111'],
  ['#56603f', '#14170f'],
];

function hash(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

/** A soft gradient "photo" with a horizon and a glow, as an SVG data URI. */
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
<radialGradient id="s"><stop offset="0" stop-color="#f3dcb6" stop-opacity=".45"/><stop offset="1" stop-color="#f3dcb6" stop-opacity="0"/></radialGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/>
<circle cx="${sunX}%" cy="${sunY}%" r="${Math.round(w * 0.24)}" fill="url(#s)"/>
<rect y="${horizon}%" width="100%" height="${100 - horizon}%" fill="#000" opacity=".25"/>
<text x="48" y="${h - 48}" font-family="Georgia,serif" font-size="40" fill="#fff" opacity=".6">${label}</text>
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
