# Stickr UF

Hemsidan för Stickr UF. **Sticker Deluxe. Ett helt A4. En enda sticker.** Sajten säljer också Sticker Sheets (ett A4 fullt med små stickers) och Stickr Business till andra UF-företag.

Affärsplanen, droppen och säljmanuset finns i [`PLAN.md`](PLAN.md).

Sajten är byggd med ren HTML, CSS och JavaScript. Den behöver ingen installation och inget byggsteg, så det räcker att öppna `index.html` i webbläsaren.

## Sektioner

Loader → hero (Deluxe-kollage som lutar efter musen) → statement → användningsområden (skåp, dator, pärm, vägg, gym) → världar (Matchday, Glow, Grind, Mys, Din grej) → Sheets-process → butik (Deluxe/Sheets) → byggare → priser → Stickr Business → Drop 01 → FAQ → final → footer.

## Filer

| Fil | Vad den gör |
| --- | --- |
| `index.html` | Alla sektioner och texter, bland annat FAQ:n |
| `css/style.css` | Designen. Färger och typsnitt ligger överst under `:root` |
| `js/main.js` | `CONFIG`, kollage-motorn, världarna, användningsområdena, Business-paketen, butiken, korgen, byggaren och droppen |
| `js/motion.js` | Animationerna (GSAP, ScrollTrigger, SplitText) och mjuk scroll (Lenis) |
| `js/vendor/` | GSAP 3.15 och Lenis 1.3. De ligger lokalt så att sidan inte är beroende av någon annan server |
| `assets/foton/` | Foton till kollagen. `README.md` där har fotolistan och moodboarden |

## Ändra innehåll

Allt nedan finns i `js/main.js` om inget annat står.

- **Priser och drop:** `CONFIG` högst upp. Här finns Deluxe, Deluxe custom, Sheet, Sheet custom, utskärning, holo, porto, klass-deal, `dropDate`, `dropSize` och `orderEmail`.
- **Stickr Business:** `PACKAGES` (namn, pris, beskrivning, punktlista; `hero: true` får märkningen "Mest bokat").
- **Användningsområden:** `USES`. Varje rad har en scen (`locker`, `laptop`, `binder`, `wall`, `gym`) och vilken Deluxe-design som visas i den.
- **Världar:** `WORLDS`. Varje värld har färger, texter, sina små stickers till Sheet-versionen och `deluxe`, alltså vilken Deluxe-design den visar. En ny värld syns både i scroll-resan och i butiken.
- **Standardschemat:** `SCHEDULE` (dagar och lektioner) och `SUBJECT_COLORS` (färg per ämne).
- **Mejl och sociala medier:** `orderEmail` i `CONFIG`, och länkarna i `index.html`.

## Kollage-motorn

Varje Sticker Deluxe är en mall i `DELUXE` (`kollage`, `schema`, `matchday`, `glow`, `grind`, `mys`) och består av lager. `deluxeHTML(nyckel, opts)` bygger stickern och `layerHTML` ritar varje lager.

Alla lager har en position och storlek i procent av arket (`x`, `y`, `w`, `h`) samt en rotation `r`. Lagertyperna (`k`) är:

| Typ | Vad det är |
| --- | --- |
| `ph` | Foto-yta. `photo` är filnamnet i `assets/foton/`, och `g` är gradienten som visas tills fotot finns. `form`: `rect`, `circle` eller `arch`. `torn: true` ger rivna kanter och `dots: true` ger rasterprickar |
| `paper` | Papperslapp i en färg (`color`) eller ett mönster (`pat`) |
| `text` | Stor text. `font`: `serif`, `sans` eller `cond`. `size` anges i % av arkets bredd |
| `cut` | Urklippta bokstäver i olika papper, som ett lösenbrev |
| `tape` | Tejpbit |
| `sk` | En liten sticker ovanpå (`t`: `pill`, `tag`, `ticket`, `star` och så vidare, samma som på arken) |
| `icon` | Ritad symbol: `star`, `heart`, `bolt`, `ball`, `sparkle`, `arrow` eller `scribble` |
| `label` | Liten etikett-text |
| `schedule` | Veckoschema. I byggaren går det att redigera direkt på stickern |

De rivna kanterna och bokstäverna slumpas med ett fast frö, så kollagen ser likadana ut vid varje besök.

Det enklaste sättet att göra en ny design är att kopiera en befintlig mall i `DELUXE`, ändra lagren och koppla den till en värld eller ett användningsområde.

## Foton

Foto-ytorna har `data-photo="namn"`. Om filen `assets/foton/namn.jpg` finns laddas den automatiskt av `hydratePhotos`, annars visas gradienten. Inget annat behöver ändras.

- Filnamnen och vad varje bild ska föreställa står i [`assets/foton/README.md`](assets/foton/README.md).
- Använd JPG, cirka 1200 px på längsta sidan och under 300 kB.
- Använd bara egna foton eller foton med fri kommersiell licens (till exempel Unsplash eller Pexels), och skriv in fotografen i `assets/foton/CREDITS.md`. Pinterest är bara inspiration, så lägg aldrig in pins på sajten.

## Byggaren

Under "Skapa egen" väljer kunden format:

- **Deluxe** med mallen Kollage (kundens bilder fyller foto-ytorna i tur och ordning), Schema (kunden klickar på lektionerna och skriver, och färgen följer ämnet) eller Helbild (en bild över hela A4).
- **Sheet** med egna bilder i storlekarna liten, mellan eller stor.

Kunden kan sedan välja rak kant eller konturskärning (+20 kr), finish (matt, blank, holo) och antal.

## Beställningar och väntelista

Det finns ingen backend och ingen betalning på sajten.

- **Korgen:** när kunden trycker på **Skicka beställning** öppnas ett färdigt mejl till `CONFIG.orderEmail`. Ni svarar med Swish-info. Bilder till egen design bifogar kunden i mejlet.
- **Väntelistan till Drop 01:** formuläret öppnar också ett mejl med namn, kontakt och "Värvad av". Listan förs för hand.
- **Stickr Business:** knappen "Boka 10 minuter med oss" öppnar ett mejl.

`orderEmail` är just nu platshållaren `hej@stickr.se` och **måste bytas** innan lansering.

## Tillgänglighet

Om besökaren har slagit på "minska rörelse" i sitt system stängs animationerna av, och allt innehåll visas ändå. Samma sak gäller om animationsbiblioteken inte laddar.

## Publicera gratis med GitHub Pages

1. Gå till repot på GitHub och välj **Settings** och sedan **Pages**.
2. Välj branch och mappen `/ (root)`, och spara.
3. Efter någon minut ligger sidan på `https://<användarnamn>.github.io/stickruf/`.
