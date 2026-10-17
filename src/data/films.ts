// Videos. `id` is a Google Drive file id; they play through Drive's player.
// DEMO: `demo-…` ids are placeholders and open a "coming soon" note instead of a video.

export type FilmType = 'wedding' | 'event' | 'brand' | 'drone';

export interface Film {
  id: string;
  title: string;
  type: FilmType;
  year: number;
  length: string; // e.g. '2:40'
  featured?: boolean;
}

export const showreel: Film = { id: 'demo-reel', title: 'Showreel', type: 'drone', year: 2026, length: '1:30' };

export const films: Film[] = [
  { id: 'demo-film-1', title: 'Project Title One', type: 'wedding', year: 2026, length: '3:12', featured: true },
  { id: 'demo-film-2', title: 'Project Title Two', type: 'brand', year: 2026, length: '0:45', featured: true },
  { id: 'demo-film-3', title: 'Project Title Three', type: 'event', year: 2025, length: '2:20', featured: true },
  { id: 'demo-film-4', title: 'Project Title Four', type: 'drone', year: 2025, length: '1:05', featured: true },
  { id: 'demo-film-5', title: 'Project Title Five', type: 'brand', year: 2025, length: '0:30', featured: true },
  { id: 'demo-film-6', title: 'Project Title Six', type: 'wedding', year: 2024, length: '4:01' },
  { id: 'demo-film-7', title: 'Project Title Seven', type: 'event', year: 2024, length: '1:48' },
  { id: 'demo-film-8', title: 'Project Title Eight', type: 'brand', year: 2023, length: '0:55' },
];

export const watchUrl = (id: string) => (id.startsWith('demo') ? '#' : `https://drive.google.com/file/d/${id}/view`);
