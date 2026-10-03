# GANI · Wiesn 2026

Sito del resoconto: pagelle (home), diario, pagina "prima" congelata. Costruito con Astro, pubblicato su Vercel.

## Dove si scrive

| Cosa | File |
|---|---|
| Pagella di un GANE | `src/content/gani/<nome>.md` |
| Foto di un GANE | `src/assets/gani/<nome>.jpg` (stesso nome del file della pagella) |
| Foto di gruppo in copertina | `src/assets/copertina.jpg` |
| Diario, un file per giorno | `src/content/giorni/2026-09-26.yaml` ecc. |
| Foto del diario | `src/assets/diario/<nome indicato nel diario>` |
| Video brevi del diario | `public/video/<nome>.mp4` |
| Tabellino, extra-campo, Toto-Wiesn, numeri | `src/data/verdetti.json` |

Se una foto manca, al suo posto compare un riquadro "foto in arrivo".

### Pagella

```md
---
nome: Bubba
stato: pubblicata        # finché è "in-arrivo" non si vede il testo
voto: "8-"               # anche "6.5" o "s.v."
titolo: Una riga di sintesi
autore: Chi l'ha scritta
clou:
  testo: Sale sulla torre
  momento: la-torre      # id del momento nel diario
---
Giudizio, 3-5 righe.
```

## Comandi

```sh
npm install
npm run dev      # anteprima locale
npm run build    # verifica: se fallisce, Vercel non pubblica
npm run foto     # prepara le foto da foto-originali/ (resize + via GPS)
```
