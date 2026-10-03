import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Una pagella per GANE: src/content/gani/<id>.md
// La foto va in src/assets/gani/<id>.jpg (o .jpeg/.png/.webp): viene trovata da sola.
const gani = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gani' }),
  schema: z.object({
    nome: z.string(),
    stato: z.enum(['in-arrivo', 'pubblicata']).default('in-arrivo'),
    voto: z.string().optional(),        // "7", "6.5", "8-", "s.v."
    titolo: z.string().optional(),      // occhiello di una riga
    autore: z.string().optional(),      // chi ha scritto la pagella
    clou: z
      .object({
        testo: z.string(),
        momento: z.string().optional(), // id di un momento del diario
      })
      .optional(),
  }),
});

// Un file per giorno: src/content/giorni/<data>.yaml
const media = z.object({
  foto: z.string().optional(),          // nome file in src/assets/diario/
  video: z.string().optional(),         // nome file in public/video/
  youtube: z.string().optional(),       // id video YouTube (non in elenco)
  didascalia: z.string().optional(),
});

const giorni = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/giorni' }),
  schema: z.object({
    data: z.coerce.date(),
    titolo: z.string(),
    sottotitolo: z.string().optional(),
    momenti: z.array(
      z.object({
        id: z.string(),
        ora: z.string().optional(),
        luogo: z.string().optional(),
        titolo: z.string(),
        testo: z.string(),
        citazione: z.object({ testo: z.string(), autore: z.string() }).optional(),
        protagonisti: z.array(z.string()).default([]),
        media: z.array(media).default([]),
      })
    ),
  }),
});

export const collections = { gani, giorni };
