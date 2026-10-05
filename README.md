# Stickr UF

Hemsidan för Stickr UF: premium-stickers i A4, oskurna eller utskurna.

👉 Affärsplanen finns i [`PLAN.md`](PLAN.md).

Sidan är byggd med ren HTML, CSS och JavaScript. Ingen installation och inget byggsteg behövs – öppna `index.html` i webbläsaren.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | Alla sektioner och texter |
| `css/style.css` | Designen. Färger och typsnitt ligger överst under `:root` |
| `js/main.js` | **Världar, stickers, priser**, butik, custom-byggare och varukorg |
| `js/motion.js` | Alla animationer (laddning, scroll-resan, holo-kortet, cursor) |
| `js/vendor/` | GSAP, ScrollTrigger, SplitText och Lenis. Ligger lokalt så sidan inte är beroende av någon annan server |

## Ändra innehåll

- **Priser:** `CONFIG` högst upp i `js/main.js` (ark, custom, utskärning, holo, frakt, klass-deal).
- **Världarna och deras stickers:** `WORLDS` i `js/main.js`. Varje sticker har en typ (`pill`, `word`, `tag`, `ticket`, `seal`, `star`, `emoji`, `ghost`), en text, en position (`x`/`y` i %), en rotation (`r`), en storlek (`s`) och färger (`bg`/`fg`). Lägg till en ny värld så dyker den upp både i scroll-resan och i butiken.
- **Mejl:** `orderEmail` i `CONFIG`, och `hej@stickr.se` i `index.html`.
- **Sociala medier:** länkarna i footern i `index.html`.

## Beställningar

Kunden lägger saker i korgen och trycker på **Skicka beställning**. Då öppnas ett färdigt mejl till er, och ni svarar med Swish-info. Custom-bilder bifogar kunden i mejlet.

## Tillgänglighet

Om besökaren har slagit på "minska rörelse" i sitt system stängs animationerna av, och allt visas ändå.

## Publicera gratis med GitHub Pages

1. Gå till repot på GitHub → **Settings** → **Pages**.
2. Välj branch och mappen `/ (root)`, och spara.
3. Efter någon minut ligger sidan på `https://<användarnamn>.github.io/stickruf/`.
