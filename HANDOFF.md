# Överlämning till nästa session – Stickr UF

> Klistra in det här som första meddelande i nästa session:
> **"Läs HANDOFF.md i repot och fortsätt därifrån."**

## 1. Vilka vi är
- **Företag:** Stickr UF (inte "Stickruf"). Ett UF-företag (Ung Företagsamhet) som drivs av gymnasieelever.
- **Huvudprodukt:** **Sticker Deluxe** – ett helt A4 som en enda sticker. Den kan sitta som schema på skåpet, kollage på laptopens baksida, på pärmen, väggen eller gymskåpet.
- **Andra produkten:** **Sticker Sheet** – ett A4 fullt med små stickers.
- **B2B:** **Stickr Business** säljer logga-stickers, monterskyltar och merch till andra UF-företag.
- **Katalog:** kategorierna **Hets** (provocerande, rivalpar som NA > SA / SA > NA, KEBAB > PIZZA), **Pilar**, **Konst** (bildstickers, första: Napoleon av J-L David 1801 – public domain) och **Egen design**. Varje design finns som Deluxe eller Sheet. Teamet vill INTE ha Tröjengelska eller Peppa.
- **Logga:** `assets/logo/stickr-light.png` och `stickr-dark.png` (genomskinliga, gjorda från teamets logga). Används i header, laddningsskärm och footer.
- **Bilder från teamet (Pinterest):** av första batchen användes bara loggan och Napoleon. Avböjda pga upphovsrätt/varumärken: Guinness-"G spot"-affisch (varumärke), "Tutto passa"-gubben (fotografens bild + privatperson), Monaco- och ski-kollagen (andras foton, Porsche/Hermès/Burton/Arc'teryx), Pinterest-kollaget (kändisar, Marlboro, vattenstämpel), Baksmälla-stillbilden (filmbolag + skådespelare), tigrarna (okänd konstnär – ok om källan visar sig vara public domain). Föreslaget: gör egna versioner i samma stil.
- **Hype:** **Drop 01** – 100 numrerade Deluxe, nedräkning, väntelista och värvning (värva 3 kompisar = gratis Deluxe).

## 2. Önskemål från teamet (viktigt!)
- Allt på **svenska**, och de pratar avslappnat ("bror").
- **Inga "världar"** (Matchday/Glow osv.) på sajten – teamet tyckte det var tråkigt. Fokus: *ställen* man sätter stickern + en stor katalog.
- Teamet vill ha **stickers som hetsar/provocerar** (folk sätter upp dem för att reta = säljer). Rivalpar säljer till båda sidor. Snusk/skrevhumor och spel-memes har vi avrått från (skolförsäljning, UF-regler, kunder under 18) – teamet tycker det är roligt, så frågan kan komma tillbaka.
- Känslan ska vara **lyx, hype och kollage**. **Inga emojis** och inget "goofy". Riktiga bilder och kollage ska inspirera.
- **Kundfokus:** säg inte "gör stickers coola igen" till kunden, det är *vårt* jobb. Sälj in användningsområdena.
- Teamet vill tänka stort och säljigt ("wolf of wall street"). Håll det **ärligt**: begränsade upplagor ska vara riktigt begränsade, och sajten ska inte ha påhittade påståenden som "världens första".
- Utskärning kostar **+20 kr**.

## 3. Status
- **Branch:** `claude/inspiring-hamilton-ga1ola` (allt är pushat). Ingen PR är skapad.
- **Sajten:** statisk HTML/CSS/JS, utan byggsteg. Den är testad i Chromium/Playwright på dator (1440 px) och mobil (390 px) utan JS-fel.
- **Sektioner:** loader → hero (Deluxe-kollage som lutar efter musen) → statement + fakta → användningsområden (horisontell scroll: skåp, dator, pärm, vägg, gym) → Sheets-process → katalog (kategoriflikar, Deluxe/Sheet + skärning per kort) → byggare (Deluxe: kollage / schema som går att redigera direkt på stickern / helbild, eller Sheet) → priser → Stickr Business → Drop 01 → FAQ → final → footer.
- **Priser** (i `CONFIG` i `js/main.js`): Deluxe 79, Deluxe custom 99, Sheet 49, Sheet custom 79, utskärning +20, holo +20, klass-deal −10 % från 10 st, post 15 kr. Business: Mässpaket 449, Monter-Deluxe 349, Merch-drop offert.
- **Beställningar:** via mailto till `CONFIG.orderEmail` (just nu platshållaren `hej@stickr.se`, **måste bytas**). Ingen backend och ingen betalning. Swish sköts manuellt.

## 4. Filer
| Fil | Innehåll |
| --- | --- |
| `index.html` | Alla sektioner |
| `css/style.css` | Design. `:root` har färger och typsnitt (Instrument Serif, Inter Tight, Bricolage Grotesque, Anton) |
| `js/main.js` | `CONFIG`, kollage-motorn (`DELUXE`, `G`-gradienter, `layerHTML`, `deluxeHTML`, `fitTexts`), `PRODUCTS` + `CATEGORIES` (katalogen – textdesigner genereras av `textLayers`), `USES`, `PACKAGES`, butik, korg, byggare, drop. `WORLDS` finns kvar bara som sticker-set till Sheets-processen |
| `js/motion.js` | GSAP/ScrollTrigger/SplitText + Lenis. Har fallback för "minska rörelse" |
| `js/vendor/` | Biblioteken ligger lokalt (GSAP 3.15, Lenis 1.3) |
| `assets/fonts/` | Typsnitten ligger lokalt (fontsource, SIL OFL-licenser bredvid) – inget beroende av Google Fonts |
| `assets/foton/README.md` | Moodboard: Pinterest-sökord och fotolista per värld, med exakta filnamn |
| `PLAN.md` | **Inaktuell** – gamla planen, se att göra |
| `README.md` | **Delvis inaktuell** – nämner holo-kortet och emoji-stickers |

**Så fungerar foton:** kollagens foto-ytor har `data-photo="namn"`. Finns `assets/foton/namn.jpg` laddas bilden automatiskt (`hydratePhotos` i `main.js`), annars visas en gradient.

## 5. Att göra (i ordning)
1. **Bilder.** Kolla först nätverket:
   `curl -s -o /dev/null -w '%{http_code}' https://images.unsplash.com`
   - Är Unsplash eller Pexels öppet: hämta bilder med fri kommersiell licens till `assets/foton/` med filnamnen i `assets/foton/README.md`, och skriv in fotograferna i en `assets/foton/CREDITS.md`.
   - Är Pinterest öppet: använd det **bara som inspiration**. Lägg **aldrig** in pins på sajten, eftersom de är upphovsrättsskyddade. Det har teamet fått förklarat.
   - Är allt stängt: be dem lägga till domänerna under Network access → Custom (se https://code.claude.com/docs/en/cloud-environments#network-access) och starta en ny session.
2. **Skriv om `PLAN.md`** med hype- och säljstrategin:
   - positionering ("Sticker Deluxe. Ett helt A4. En enda sticker.") och användningsområden
   - Drop 01-planen: teaser, numrerad upplaga, väntelista, värvning
   - TikTok-plan där peel-videon är viktigast
   - säljmanus för korridoren och klasserna, i stil med "sell me this pen" men ärligt: "var är ditt schema just nu?"
   - Stickr Business: hur man säljer till andra UF-företag, till exempel på UF-mässan
   - kalkyl: material ≈ 15–25 kr per A4 (uppskattning, ska verifieras), skärmaskin med print-and-cut för A4
   - juridik: inga varumärken eller kändisar utan tillstånd, inga overifierbara "världens första"
   - roller, KPI:er och att göra-lista
3. **Uppdatera `README.md`** så den beskriver nya sajten (kollage-motorn, `DELUXE`, mallar, foton).
4. **Kolla påståenden med teamet** innan lansering: "5 dagar" leveranstid, att limmet går att ta bort, att Deluxe får plats på 13–16"-laptops, och drop-datumet (`CONFIG.dropDate` = 2026-11-02 07:30).
5. **Byt platshållare:** mejl, Instagram- och TikTok-länkar, teamnamn om de vill ha ett teamavsnitt.
6. **Möjliga nästa steg:** riktig väntelista (till exempel Formspree eller en Google-form i stället för mailto), Swish-betalning, fler världar (Gaming, Studenten), publicering via GitHub Pages.

## 6. Så testar du
```bash
# Playwright finns förinstallerat
node -e "require('/opt/node22/lib/node_modules/playwright')"
```
- Öppna `file:///home/user/stickruf/index.html`, vänta cirka 4,5 s (loadern) och scrolla med `window.lenis.scrollTo(y, {immediate: true})`.
- Typsnitten är lokala, så skärmbilder i testmiljön ser ut som på riktigt.
- I byggarens schema finns `.sch-cell` även i skåp-scenen, så använd `#builderPreview .sch-cell`.
