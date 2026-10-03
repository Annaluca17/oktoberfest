import type { ImageMetadata } from 'astro';

const fotoGani = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/gani/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);
const fotoDiario = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/diario/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true }
);

/** Foto di un GANE: src/assets/gani/<id>.<ext> */
export function fotoGane(id: string): ImageMetadata | undefined {
  const k = Object.keys(fotoGani).find((p) => p.split('/').pop()!.replace(/\.[^.]+$/, '').toLowerCase() === id);
  return k ? fotoGani[k].default : undefined;
}

/** Foto del diario: src/assets/diario/<nome file> */
export function fotoMomento(nome: string): ImageMetadata | undefined {
  const k = Object.keys(fotoDiario).find((p) => p.split('/').pop()!.toLowerCase() === nome.toLowerCase());
  return k ? fotoDiario[k].default : undefined;
}

export function iniziali(nome: string) {
  return nome.replace(/^Il\s+/i, '').slice(0, 2).toUpperCase();
}

export function classeVoto(voto?: string) {
  if (!voto) return 'voto nd';
  return /^s\.?\s?v\.?$/i.test(voto.trim()) ? 'voto sv' : 'voto';
}

/** Primo paragrafo del giudizio, accorciato, per le schede. */
export function estratto(body: string | undefined, max = 110) {
  const t = (body ?? '').trim().split(/\n\s*\n/)[0].replace(/\s+/g, ' ');
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, '') + '…' : t;
}
