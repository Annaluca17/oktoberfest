// Ridimensiona le foto e toglie i metadati (GPS, modello del telefono).
// Uso: metti gli originali in foto-originali/gani o foto-originali/diario, poi `npm run foto`.
// Le foto pronte finiscono in src/assets/gani e src/assets/diario (stesso nome, .jpg).
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';

const LATO_MAX = 2000;
for (const cartella of ['gani', 'diario']) {
  const da = join('foto-originali', cartella);
  const a = join('src/assets', cartella);
  let file = [];
  try { file = await readdir(da); } catch { continue; }
  await mkdir(a, { recursive: true });
  for (const f of file.filter((x) => /\.(jpe?g|png|webp|heic)$/i.test(x))) {
    const out = join(a, parse(f).name.toLowerCase() + '.jpg');
    await sharp(join(da, f))
      .rotate() // applica l'orientamento EXIF prima di eliminarlo
      .resize({ width: LATO_MAX, height: LATO_MAX, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out); // sharp non copia i metadati se non richiesto
    console.log('✔', out);
  }
}
