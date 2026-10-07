# Stickr UF

Hemsidan för Stickr UF: premium-stickers i A4, oskurna eller utskurna.

👉 Affärsplanen finns i [`PLAN.md`](PLAN.md).

Sidan är byggd med ren HTML, CSS och JavaScript. Ingen installation och inget byggsteg behövs – öppna `index.html` i webbläsaren.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | Alla sektioner och texter |
| `css/style.css` | Designen. Färger och typsnitt ligger överst under `:root` |
| `js/main.js` | **Produkter (`PRODUCTS`), kategorier, priser**, ställen (`USES`), kollage-motorn, butik, byggare och varukorg |
| `js/motion.js` | Alla animationer (laddning, hero, horisontell scroll genom ställena, cursor) |
| `js/vendor/` | GSAP, ScrollTrigger, SplitText och Lenis. Ligger lokalt så sidan inte är beroende av någon annan server |

## Ändra innehåll

- **Priser:** `CONFIG` högst upp i `js/main.js` (ark, custom, utskärning, holo, frakt, klass-deal).
- **Produkter:** `PRODUCTS` i `js/main.js`. Varje produkt har `lines` (raderna i stor text), `sub` (liten rad), färger (`bg`/`fg`/`accent`), kategori (`cat`) och ev. `pair` (rivalen) eller `tag` ("Bästsäljare"). Designen genereras automatiskt – lägg till en rad så finns den i butiken.
- **Foton i kollagen:** se `assets/foton/README.md`.
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
