# Stickr UF

Hemsidan för Stickr UF. Huvudprodukten är **Sticker Deluxe**: ett helt A4 som en enda sticker. Vi säljer också **Sticker Sheet** (ett A4 fullt med små stickers) och **Stickr Business** (stickers och monterskyltar till andra UF-företag).

Affärsplanen, Drop 01 och säljmanuset finns i [`PLAN.md`](PLAN.md).

Sidan är ren HTML, CSS och JavaScript. Det behövs ingen installation och inget byggsteg: öppna `index.html` i webbläsaren.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | Alla sektioner och texter |
| `css/style.css` | Designen. Färger och typsnitt ligger överst under `:root` |
| `js/main.js` | `CONFIG` (priser, mejl, drop), kollage-motorn, världar, användningsområden, butik, korg, byggare och nedräkning |
| `js/motion.js` | Animationerna: loader, scroll-resan, mus-lutningen på hero-kollaget |
| `js/vendor/` | GSAP, ScrollTrigger, SplitText och Lenis. De ligger lokalt så sidan inte beror på någon annan server |
| `assets/foton/` | Foton till kollagen. Se `assets/foton/README.md` för vilka bilder som behövs |

## Sektionerna

Loader → hero (Deluxe-kollaget) → varför Deluxe → användningsområden (skåp, dator, pärm, vägg, gym) → världarna (Matchday, Glow, Grind, Mys, Din grej) → Sheets → butik → byggaren → priser → Stickr Business → Drop 01 → FAQ → slut.

## Ändra innehåll

Allt nedan ligger i `js/main.js`.

- **Priser, mejl och drop:** `CONFIG` högst upp. Där finns Deluxe- och Sheet-priser, utskärning, holo, porto, klass-deal, `orderEmail`, `dropDate` och `dropSize`.
- **Användningsområden:** `USES`. Varje rad har en scen (`locker`, `laptop`, `binder`, `wall`, `gym`), vilken Deluxe som visas och texten.
- **Världarna:** `WORLDS`. Varje värld har färger, text, sina små stickers (för Sheet) och vilken Deluxe-mall den använder (`deluxe`). En ny värld dyker upp både i scroll-resan och i butiken.
- **Stickr Business-paketen:** `PACKAGES`.
- **Schemat:** `SCHEDULE` (standardschemat) och `SUBJECT_COLORS` (färg per ämne).

### Kollage-motorn (`DELUXE`)

Varje Sticker Deluxe är ett A4 som byggs av lager. `DELUXE` innehåller mallarna `kollage`, `schema`, `matchday`, `glow`, `grind`, `mys` och `business`. Ett lager ser ut så här:

```js
{ k: "ph", photo: "kollage-1", g: G.sunset, x: 4, y: 4, w: 62, h: 40, r: -3, torn: true, dots: true }
```

| `k` | Lager |
| --- | --- |
| `ph` | Foto-yta. `photo` är filnamnet i `assets/foton/`, `g` är gradienten som visas tills fotot finns. `form`: `rect`, `circle` eller `arch`. `torn` ger rivna kanter, `dots` rasterprickar |
| `paper` | En papperslapp i en färg eller ett mönster (`pat`) |
| `text` | Stor text. `font`: `serif`, `sans` eller `cond` |
| `cut` | "Urklippta" bokstäver i olika papper |
| `tape` | En tejpbit |
| `sk` | En liten sticker ovanpå |
| `icon` | En ritad symbol: `star`, `heart`, `bolt`, `ball`, `sparkle`, `arrow`, `scribble` |
| `label` | En liten etikett-text |
| `schedule` | Veckoschemat (går att redigera i byggaren) |

`x`, `y`, `w` och `h` är i procent av arket, `r` är rotation och `size` är textstorlek i procent av arkets bredd. `G` innehåller gradienterna.

`deluxeHTML("namn")` ritar en mall, och i byggaren fyller kundens uppladdade bilder foto-ytorna i tur och ordning.

### Foton

Foto-ytorna har `data-photo="namn"`. Om `assets/foton/namn.jpg` finns laddas bilden automatiskt (`hydratePhotos`), annars visas gradienten. Bilden ska vara en JPG på cirka 1200 px och under 300 kB.

Använd bara egna bilder eller bilder med fri kommersiell licens, och skriv fotografen i `assets/foton/CREDITS.md`. Pinterest är bara inspiration.

## Beställningar

Det finns ingen backend och ingen betalning på sajten. Kunden lägger saker i korgen och trycker på **Skicka beställning**. Då öppnas ett färdigt mejl till `CONFIG.orderEmail`, och vi svarar med Swish-info. Egna bilder bifogar kunden i mejlet. Väntelistan till Drop 01 fungerar på samma sätt.

**Innan lansering:** byt `hej@stickr.se` (i `CONFIG` och i `index.html`) och länkarna till Instagram och TikTok i footern.

## Tillgänglighet

Om besökaren har slagit på "minska rörelse" stängs animationerna av, och allt visas ändå.

## Publicera gratis med GitHub Pages

1. Gå till repot på GitHub → **Settings** → **Pages**.
2. Välj branch och mappen `/ (root)`, och spara.
3. Efter någon minut ligger sidan på `https://<användarnamn>.github.io/stickruf/`.
