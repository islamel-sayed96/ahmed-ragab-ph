// Photos. `id` is a Google Drive file id (shared as "Anyone with the link").
// DEMO: every `demo-…` id is a placeholder. Swap in real Drive ids when they arrive.
// `featured` photos appear in the home page hero strip. `shape` sets the frame.
import type { Shape } from './media';

export type Category = 'weddings' | 'concerts' | 'events' | 'brands' | 'food' | 'places';

export interface Photo {
  id: string;
  cat: Category;
  shape: Shape;
  label?: string; // event, client or artist
  featured?: boolean;
}

export const categories: Category[] = ['weddings', 'concerts', 'events', 'brands', 'food', 'places'];

const shapes: Shape[] = ['portrait', 'landscape', 'tall', 'square', 'landscape', 'portrait'];

// 36 demo photos spread across the categories. The first 9 are featured.
export const photos: Photo[] = Array.from({ length: 36 }, (_, i) => {
  const cat = categories[i % categories.length];
  return {
    id: `demo-${cat}-${i + 1}`,
    cat,
    shape: shapes[(i * 5 + Math.floor(i / 6)) % shapes.length],
    featured: i < 9,
  };
});

// One cover photo per category, used on the category cards.
export const cover = (cat: Category) => ({ ...photos.find((p) => p.cat === cat)!, shape: 'tall' as Shape });

// Concert photos for the "On stage with" cards. DEMO artist names.
export const onStage = [
  { artist: 'Artist Name', id: 'demo-stage-1' },
  { artist: 'Artist Name', id: 'demo-stage-2' },
  { artist: 'Artist Name', id: 'demo-stage-3' },
];

// Single photos used around the site.
export const portrait: Photo = { id: 'demo-portrait', cat: 'places', shape: 'tall' };
export const aboutA: Photo = { id: 'demo-about-a', cat: 'events', shape: 'portrait' };
export const aboutB: Photo = { id: 'demo-about-b', cat: 'places', shape: 'landscape' };
export const quotePhoto: Photo = { id: 'demo-quote', cat: 'weddings', shape: 'landscape' };
export const packagesPhoto: Photo = { id: 'demo-packages', cat: 'weddings', shape: 'portrait' };
