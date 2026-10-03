// Dopo la build: in produzione, finché "pubblico" è false in sito.config.json,
// il sito viene sostituito da una sola pagina "lavori in corso".
// Le anteprime Vercel (branch diversi da main) restano complete.
import { readFile, rm, mkdir, writeFile } from 'node:fs/promises';

const { pubblico } = JSON.parse(await readFile('sito.config.json', 'utf8'));
if (process.env.VERCEL_ENV !== 'production' || pubblico) {
  console.log('[attesa] sito completo');
  process.exit(0);
}

const pagina = `<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex, nofollow">
<title>GANI · Wiesn 2026 · Lavori in corso</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍺</text></svg>">
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fraunces:opsz,wght@9..144,400;9..144,600&display=swap" rel="stylesheet">
<style>
  :root{--blu:#2b6cb0;--oro:#e0a423;--crema:#f5efe0;--schiuma:#fff8e7;--legno:#241606;--legno-2:#150d03}
  *{margin:0;padding:0;box-sizing:border-box}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;text-align:center;
    font-family:'Fraunces',Georgia,serif;color:var(--crema);background:var(--legno-2);position:relative;overflow-x:hidden}
  body::before{content:"";position:fixed;inset:0;opacity:.10;background-color:var(--blu);
    background-image:linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%),linear-gradient(45deg,#fff 25%,transparent 25%,transparent 75%,#fff 75%);
    background-size:64px 64px;background-position:0 0,32px 32px}
  main{position:relative;max-width:560px}
  .krug{font-size:64px}
  h1{font-family:'Alfa Slab One',serif;color:var(--schiuma);font-size:clamp(34px,8vw,64px);line-height:1;margin:14px 0;text-shadow:0 4px 0 var(--legno)}
  h1 span{color:var(--oro)}
  p{font-size:18px;line-height:1.5;opacity:.9}
  small{display:block;margin-top:22px;color:var(--oro);letter-spacing:3px;text-transform:uppercase;font-size:12px}
</style>
</head>
<body>
<main>
  <div class="krug">🍺</div>
  <h1>Lavori in <span>corso</span></h1>
  <p>Il resoconto della Wiesn 2026 è in preparazione: pagelle, diario e verdetti. Si riapre a breve.</p>
  <small>GANI · München 2026</small>
</main>
</body>
</html>
`;

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await writeFile('dist/index.html', pagina);
await writeFile('dist/404.html', pagina);
console.log('[attesa] produzione: pubblicata solo la pagina "lavori in corso"');
