// Photos. `id` is a Google Drive file id (shared as "Anyone with the link").
// DEMO: every `demo-…` id is a placeholder. Swap in real Drive ids when they arrive.
// `featured` photos appear on the home page. `shape` sets the frame on the page.
import type { Shape } from './media';

export type Category = 'weddings' | 'concerts' | 'events' | 'brands' | 'food' | 'places';

export interface Photo {
  id: string;
  cat: Category;
  shape: Shape;
  label?: string; // event, client or place
  featured?: boolean;
}

export const categories: Category[] = ['weddings', 'concerts', 'events', 'brands', 'food', 'places'];

const shapes: Shape[] = ['portrait', 'landscape', 'tall', 'square', 'landscape', 'portrait'];

// 36 demo photos, spread across the categories.
export const photos: Photo[] = Array.from({ length: 36 }, (_, i) => {
  const cat = categories[i % categories.length];
  return {
    id: `demo-${cat}-${i + 1}`,
    cat,
    shape: shapes[(i * 5 + Math.floor(i / 6)) % shapes.length],
    featured: i < 6,
  };
});

// One cover photo per category, used on the home page index and the "Two seas" section.
export const cover = (cat: Category) => photos.find((p) => p.cat === cat)!;

// The big photo on the home page cover.
export const heroPhoto: Photo = { id: 'demo-hero', cat: 'weddings', shape: 'portrait' };
export const portrait: Photo = { id: 'demo-portrait', cat: 'places', shape: 'tall' };
