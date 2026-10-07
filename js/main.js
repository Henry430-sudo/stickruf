/* =========================================================
   Stickr UF – innehåll, kollage, butik, byggare och varukorg.
   Animationerna ligger i js/motion.js.

   Allt ni vill ändra (priser, drop-datum, världar, kollage)
   ligger i CONFIG, PRODUCTS, USES och DELUXE här nedanför.
   ========================================================= */

const CONFIG = {
  brand: "Stickr UF",
  orderEmail: "hej@stickr.se",      // BYT till er riktiga mejl innan lansering!
  deluxePrice: 79,                  // Sticker Deluxe, färdig design
  deluxeCustomPrice: 99,            // Sticker Deluxe, egen design (kollage/schema/helbild)
  sheetPrice: 49,                   // Sticker Sheet, färdigt
  sheetCustomPrice: 79,             // Sticker Sheet, egna bilder
  cutExtra: 20,                     // konturskärning / utskärning
  holoExtra: 20,                    // holo-finish
  shipping: 15,                     // porto
  dealMinSheets: 10,                // klass-deal från så här många...
  dealPercent: 10,                  // ...ger så här många procent
  maxUploads: 6,
  dropName: "Drop 01",
  dropDate: "2026-11-02T07:30:00+01:00", // när droppen öppnar (svensk tid)
  dropSize: 100,                    // antal numrerade Deluxe i droppen
};

/* =========================================================
   Kollage-motorn
   Varje Sticker Deluxe är ett A4 byggt av lager:
   ph     – foto-yta. Lägg en bild i assets/foton/<photo>.jpg så används den,
            annars visas gradienten g. form: rect | circle | arch, torn: rivna kanter
   paper  – papperslapp i en färg eller ett mönster (pat)
   text   – stor text (font: serif | sans | cond)
   cut    – "urklippta" bokstäver i olika papper
   tape   – tejpbit
   sk     – en liten sticker ovanpå (samma typer som på arken)
   icon   – ritad symbol (star, heart, bolt, ball, sparkle, arrow, scribble)
   label  – liten etikett-text
   schedule – veckoschema (redigerbart i byggaren)
   x/y/w/h i % av arket, r = rotation, size = textstorlek (% av arkets bredd)
   ========================================================= */

const G = { // "foton" som används tills riktiga bilder finns
  sunset:  "linear-gradient(170deg,#ff6a4d 0%,#ffa45c 45%,#ffd79a 100%)",
  satin:   "linear-gradient(135deg,#ffd1e1 0%,#ff9ec0 38%,#ffe6ef 52%,#ff83ad 78%,#ffc2d6 100%)",
  chrome:  "linear-gradient(180deg,#ffffff 0%,#9aa0aa 42%,#f4f6f8 50%,#4e535d 100%)",
  neon:    "radial-gradient(circle at 70% 30%,#e3ff6b 0%,#a6d10f 18%,transparent 46%),radial-gradient(circle at 20% 80%,#ff3b8a55,transparent 40%),#101010",
  stadium: "radial-gradient(ellipse at 25% 8%,#ffffffcc 0,transparent 22%),radial-gradient(ellipse at 78% 6%,#ffffffaa 0,transparent 20%),linear-gradient(180deg,#081428 0%,#16294a 48%,#1d6b3a 48%,#29894a 100%)",
  pitch:   "repeating-linear-gradient(90deg,#1f7a3f 0 12%,#278c4a 12% 24%)",
  warm:    "radial-gradient(circle at 50% 35%,#ffe2a8 0%,#f0a35a 35%,#9c4524 80%)",
  sky:     "linear-gradient(180deg,#6fa8ff 0%,#bcd9ff 70%,#fff3d6 100%)",
  night:   "radial-gradient(circle at 30% 30%,#c9a8ff 0,transparent 35%),radial-gradient(circle at 75% 70%,#ff4f8b88 0,transparent 40%),#16131a",
  ink:     "linear-gradient(160deg,#2a2530,#0b0a0c)",
};

const DELUXE = {
  kollage: {
    name: "Kollage", bg: "#f1ebe0",
    layers: [
      { k: "ph", photo: "kollage-1", g: G.sunset, x: 4, y: 4, w: 62, h: 40, r: -3, torn: true, dots: true },
      { k: "ph", photo: "kollage-2", g: G.satin, form: "circle", x: 52, y: 24, w: 44, h: 31, r: 0, dots: true },
      { k: "paper", color: "#0b0a0c", x: -6, y: 49, w: 74, h: 21, r: 3, torn: true },
      { k: "text", text: "Din grej.", font: "serif", size: 15, color: "#f4efe6", x: 4, y: 51, r: 3 },
      { k: "ph", photo: "kollage-3", g: G.neon, x: 56, y: 59, w: 40, h: 30, r: 5, torn: true },
      { k: "cut", text: "STICKR", size: 7.5, x: 6, y: 74, r: -4 },
      { k: "tape", x: 12, y: 1, w: 22, h: 5, r: -8 },
      { k: "tape", x: 68, y: 56, w: 18, h: 5, r: 22 },
      { k: "icon", icon: "star", color: "#e8ff59", x: 76, y: 5, w: 18, h: 13, r: 10 },
      { k: "icon", icon: "arrow", color: "#ff4f8b", x: 36, y: 40, w: 24, h: 13, r: 8 },
      { k: "label", text: "DELUXE Nº 001 · A4", x: 6, y: 92 },
    ],
  },
  schema: {
    name: "Schema", bg: "#fbf8f2",
    layers: [
      { k: "cut", text: "SCHEMA", size: 9, x: 5, y: 4, r: -2 },
      { k: "label", text: "VT 2027 · KLASS NA22B", x: 6, y: 15.5 },
      { k: "icon", icon: "star", color: "#ff4f8b", x: 78, y: 3, w: 16, h: 11, r: 12 },
      { k: "schedule", x: 5, y: 21, w: 90, h: 62 },
      { k: "sk", t: "tag", text: "LUNCH 11:40", bg: "#e8ff59", fg: "#0b0a0c", x: 6, y: 86, r: -4, size: 1.9 },
      { k: "ph", photo: "schema", g: G.satin, form: "circle", x: 74, y: 84, w: 18, h: 13, dots: true },
      { k: "tape", x: 40, y: -1, w: 20, h: 5, r: 3 },
    ],
  },
  matchday: {
    name: "Matchday", bg: "#0d3a29",
    layers: [
      { k: "ph", photo: "matchday-1", g: G.stadium, x: 0, y: 0, w: 100, h: 55, dots: true },
      { k: "sk", t: "star", text: "90+3'", bg: "#e8ff59", fg: "#0b0a0c", x: 6, y: 5, r: -10, size: 2.2 },
      { k: "sk", t: "ticket", text: "MATCHDAY", sub: "SEKTION B · RAD 12", bg: "#f4efe6", fg: "#0d3a29", x: 44, y: 9, r: 7, size: 1.9 },
      { k: "cut", text: "ALLEZ", size: 12, x: 5, y: 47, r: -3 },
      { k: "text", text: "Matchday", font: "serif", size: 16, color: "#f4efe6", x: 5, y: 63 },
      { k: "icon", icon: "ball", color: "#f4efe6", x: 70, y: 66, w: 24, h: 17, r: -10 },
      { k: "paper", pat: "scarf", x: -6, y: 84, w: 112, h: 8, r: -3 },
      { k: "label", text: "HELA VÄGEN · HELA TIDEN", x: 6, y: 94.5, color: "#f4efe6" },
    ],
  },
  glow: {
    name: "Glow", bg: "#f5c6d4",
    layers: [
      { k: "ph", photo: "glow-1", g: G.satin, form: "arch", x: 7, y: 5, w: 56, h: 47 },
      { k: "ph", photo: "glow-2", g: G.chrome, form: "circle", x: 56, y: 30, w: 38, h: 27, dots: true },
      { k: "tape", x: 26, y: 2, w: 20, h: 5, r: -6 },
      { k: "text", text: "Glow", font: "serif", size: 26, color: "#3a0d1f", x: 5, y: 53 },
      { k: "sk", t: "pill", text: "main character", bg: "#fff", fg: "#ff4f8b", x: 36, y: 77, r: -6, size: 2 },
      { k: "icon", icon: "heart", color: "#ff4f8b", x: 74, y: 5, w: 18, h: 13, r: 10 },
      { k: "icon", icon: "sparkle", color: "#fff", x: 8, y: 80, w: 13, h: 9 },
      { k: "label", text: "BESTIES 4 EVER", x: 6, y: 93, color: "#3a0d1f" },
    ],
  },
  grind: {
    name: "Grind", bg: "#0b0a0c",
    layers: [
      { k: "ph", photo: "grind-1", g: G.neon, x: 0, y: 0, w: 100, h: 46, dots: true },
      { k: "text", text: "NO DAYS<br>OFF", font: "cond", size: 21, color: "#d4ff3a", x: 5, y: 43 },
      { k: "icon", icon: "bolt", color: "#d4ff3a", x: 74, y: 5, w: 20, h: 16, r: 8 },
      { k: "sk", t: "pill", text: "05:30 CLUB", bg: "#f4efe6", fg: "#0b0a0c", x: 6, y: 80, r: -5, size: 2 },
      { k: "sk", t: "tag", text: "LOCKED IN", bg: "#ff3b30", fg: "#fff", x: 50, y: 85, r: 6, size: 1.9 },
      { k: "label", text: "1 % BÄTTRE · VARJE DAG", x: 6, y: 94, color: "#f4efe6" },
    ],
  },
  mys: {
    name: "Mys", bg: "#eedfc4",
    layers: [
      { k: "ph", photo: "mys-1", g: G.warm, form: "arch", x: 20, y: 5, w: 60, h: 47, dots: true },
      { k: "icon", icon: "sparkle", color: "#b5552b", x: 6, y: 6, w: 14, h: 10 },
      { k: "text", text: "Hemma<br>bäst.", font: "serif", size: 15, color: "#4a2e1a", x: 7, y: 54 },
      { k: "paper", pat: "checker", x: -5, y: 81, w: 62, h: 14, r: -3 },
      { k: "sk", t: "seal", text: "LITE MYS · SKADAR ALDRIG · ", icon: "♥", bg: "#4a2e1a", fg: "#eedfc4", x: 62, y: 64, size: 1.9 },
      { k: "label", text: "FIKA? ALLTID.", x: 62, y: 93, color: "#4a2e1a" },
    ],
  },
  business: {
    name: "Ert UF-företag", bg: "#fbf8f2",
    layers: [
      { k: "paper", color: "#0b0a0c", form: "circle", x: 24, y: 10, w: 52, h: 37, text: "ER<br>LOGGA" },
      { k: "icon", icon: "star", color: "#e8ff59", x: 66, y: 6, w: 20, h: 14, r: 14 },
      { k: "cut", text: "UF 2027", size: 8.5, x: 8, y: 53, r: -2 },
      { k: "text", text: "Ert företag.", font: "serif", size: 12, color: "#0b0a0c", x: 8, y: 66 },
      { k: "tape", x: 6, y: 3, w: 20, h: 5, r: -10 },
      { k: "label", text: "MÄSSPAKET · STICKR BUSINESS", x: 8, y: 92 },
    ],
  },
};

// Schemat som visas som standard (kan redigeras direkt i byggaren)
const SCHEDULE = {
  days: ["MÅN", "TIS", "ONS", "TOR", "FRE"],
  rows: [
    ["Matte", "Svenska", "Engelska", "Kemi", "Idrott"],
    ["Svenska", "Historia", "Matte", "Engelska", "Matte"],
    ["Lunch", "Lunch", "Lunch", "Lunch", "Lunch"],
    ["Kemi", "Idrott", "Biologi", "Matte", "Svenska"],
    ["Mentor", "Biologi", "Fysik", "Historia", "—"],
  ],
};
const SUBJECT_COLORS = {
  matte: "#e8ff59", svenska: "#ffc2d6", engelska: "#bcd9ff", kemi: "#c9a8ff", idrott: "#ffb36b",
  historia: "#f2d6a2", biologi: "#b9f0c8", fysik: "#a8f0ff", lunch: "#0b0a0c", mentor: "#e5e0d8",
};

/* ---------- Små sticker-set (används på Sheets-arket i processen) ---------- */
const WORLDS = [
  {
    id: "matchday", name: "Matchday", deluxe: "matchday",
    kicker: "För dig som lever för 90 minuter", line: "Halsduken på. Laptopen täckt.",
    bg: "#0d3a29", fg: "#f4efe6", accent: "#e8ff59",
    stickers: [
      { t: "ticket", text: "MATCHDAY", sub: "SEKTION B · RAD 12 · 19:00", x: 4, y: 12, r: -7, bg: "#f4efe6", fg: "#0d3a29" },
      { t: "pill", text: "90+3'", x: 40, y: 8, r: 8, bg: "#e8ff59", fg: "#0b0a0c", s: 1.2 },
      { t: "seal", text: "HELA VÄGEN · HELA TIDEN · ", icon: "♥", x: 4, y: 70, r: -10, bg: "#c8102e", fg: "#fff" },
      { t: "icon", icon: "ball", x: 40, y: 74, r: 0, bg: "#f4efe6", fg: "#0d3a29" },
      { t: "tag", text: "TIFO-KLAN", x: 84, y: 82, r: -9, bg: "#0b0a0c", fg: "#f4efe6" },
      { t: "word", text: "ALLEZ ALLEZ", x: 80, y: 6, r: 6, bg: "#f4efe6", fg: "#0d3a29" },
    ],
  },
  {
    id: "glow", name: "Glow", deluxe: "glow",
    kicker: "För main characters", line: "Mjukt, glittrigt och helt du.",
    bg: "#f5c6d4", fg: "#3a0d1f", accent: "#ff4f8b",
    stickers: [
      { t: "pill", text: "main character", x: 38, y: 9, r: 7, bg: "#fff", fg: "#ff4f8b", s: 1.1 },
      { t: "icon", icon: "heart", x: 6, y: 12, r: -12, bg: "#ff4f8b", fg: "#fff" },
      { t: "seal", text: "BESTIES · 4 · EVER · ", icon: "♡", x: 84, y: 68, r: 10, bg: "#ff4f8b", fg: "#fff" },
      { t: "word", text: "hot girl walk", x: 4, y: 78, r: -5, bg: "#3a0d1f", fg: "#f5c6d4" },
      { t: "star", text: "manifest", x: 84, y: 8, r: -8, bg: "#fff1a8", fg: "#3a0d1f" },
      { t: "tag", text: "THAT GIRL ERA", x: 42, y: 84, r: 6, bg: "#fff", fg: "#3a0d1f" },
    ],
  },
  {
    id: "grind", name: "Grind", deluxe: "grind",
    kicker: "För dig som aldrig skippar passet", line: "Disciplin slår motivation. Varje dag.",
    bg: "#0b0a0c", fg: "#f4efe6", accent: "#d4ff3a",
    stickers: [
      { t: "word", text: "NO DAYS OFF", x: 4, y: 10, r: -6, bg: "#d4ff3a", fg: "#0b0a0c" },
      { t: "pill", text: "05:30 CLUB", x: 42, y: 7, r: 9, bg: "#f4efe6", fg: "#0b0a0c" },
      { t: "seal", text: "1% BÄTTRE · VARJE DAG · ", icon: "⚡", x: 86, y: 10, r: 8, bg: "#d4ff3a", fg: "#0b0a0c" },
      { t: "ticket", text: "ENERGI", sub: "0 SOCKER · 100% FOKUS", x: 4, y: 72, r: 7, bg: "#f4efe6", fg: "#0b0a0c" },
      { t: "tag", text: "LOCKED IN", x: 82, y: 80, r: -8, bg: "#ff3b30", fg: "#fff" },
      { t: "icon", icon: "bolt", x: 42, y: 80, r: 10, bg: "#d4ff3a", fg: "#0b0a0c" },
    ],
  },
  {
    id: "mys", name: "Mys", deluxe: "mys",
    kicker: "För inredningsromantiker", line: "Levande ljus, lite pyssel och mycket kärlek.",
    bg: "#eedfc4", fg: "#4a2e1a", accent: "#b5552b",
    stickers: [
      { t: "word", text: "Hemma bäst", x: 4, y: 10, r: -6, bg: "#b5552b", fg: "#fff" },
      { t: "seal", text: "LITE MYS · SKADAR ALDRIG · ", icon: "☕", x: 4, y: 70, r: -6, bg: "#4a2e1a", fg: "#eedfc4" },
      { t: "pill", text: "fika?", x: 86, y: 12, r: 12, bg: "#fff", fg: "#b5552b", s: 1.2 },
      { t: "star", text: "Ljuvligt!", x: 84, y: 72, r: -10, bg: "#f2c14e", fg: "#4a2e1a" },
      { t: "tag", text: "PYSSEL-PROFFS", x: 40, y: 84, r: 4, bg: "#4a2e1a", fg: "#eedfc4" },
      { t: "icon", icon: "sparkle", x: 42, y: 6, r: -12, bg: "#b5552b", fg: "#eedfc4" },
    ],
  },
  {
    id: "custom", name: "Din grej", deluxe: "kollage", holo: true,
    kicker: "Allt annat", line: "Ditt lag, din katt, ditt schema. Vi gör det till en Deluxe.",
    bg: "#16131a", fg: "#f4efe6", accent: "#c9a8ff",
    stickers: [
      { t: "ghost", text: "din bild här", x: 4, y: 12, r: -8 },
      { t: "pill", text: "DITT LAG", x: 40, y: 8, r: 8, bg: "#c9a8ff", fg: "#16131a" },
      { t: "tag", text: "DITT BAND", x: 4, y: 78, r: 6, bg: "#ff4f8b", fg: "#fff" },
      { t: "seal", text: "DIN IDÉ · VÅRT TRYCK · ", icon: "✦", x: 86, y: 70, r: 10, bg: "#f4efe6", fg: "#16131a" },
      { t: "star", text: "NY!", x: 86, y: 8, r: -12, bg: "#e8ff59", fg: "#0b0a0c" },
      { t: "ghost", text: "insidesskämt", x: 40, y: 84, r: 6 },
    ],
  },
];

/* ---------- Användningsområden ---------- */
const USES = [
  { id: "skap", scene: "locker", deluxe: "schema", num: "01", title: "Skåpet", line: "Schemat där du faktiskt behöver det. Sluta leta i mobilen mellan lektionerna.", cta: "Gör ditt schema", template: "schema" },
  { id: "dator", scene: "laptop", deluxe: "rorinte", num: "02", title: "Datorn", line: "Baksidan av din laptop är den största reklamytan du äger. Säg något med den.", cta: "Se Hets", cat: "hets" },
  { id: "parm", scene: "binder", deluxe: "napoleon", num: "03", title: "Pärmen", line: "Ingen tar fel pärm när det sitter en kejsare på den.", cta: "Se Konst", cat: "konst" },
  { id: "vagg", scene: "wall", deluxe: "kollage", num: "04", title: "Väggen", line: "En poster som aldrig rullar ihop sig och aldrig behöver häftmassa.", cta: "Gör ditt kollage", template: "kollage" },
  { id: "gym", scene: "gym", deluxe: "skap", num: "05", title: "Gymskåpet", line: "Ditt skåp. Ditt revir. Alla andra kan läsa skylten.", cta: "Se Hets", cat: "hets" },
];

/* =========================================================
   Katalogen – alla färdiga Sticker Deluxe
   lines = rader i stor text, sub = liten rad under, pair = rivalen
   Lägg till en produkt här så finns den direkt i butiken.
   ========================================================= */
const CATEGORIES = [
  { id: "alla", name: "Alla" },
  { id: "hets", name: "Hets" },
  { id: "pilar", name: "Pilar" },
  { id: "konst", name: "Konst" },
  { id: "egen", name: "Egen design" },
];

const PRODUCTS = [
  // Hets – sätt upp, provocera, sälj till båda sidor
  { id: "na", cat: "hets", lines: ["NA > SA"], sub: "Bevisa motsatsen.", bg: "#e8ff59", fg: "#0b0a0c", accent: "#ff4f8b", pair: "sa", tag: "Rivalpar" },
  { id: "sa", cat: "hets", lines: ["SA > NA"], sub: "Vi har i alla fall vänner.", bg: "#ff4f8b", fg: "#0b0a0c", accent: "#f4efe6", pair: "na", tag: "Rivalpar" },
  { id: "te", cat: "hets", lines: ["TEKNIK", "> ALLT"], sub: "Vi bygger. Ni pratar.", bg: "#3dd6ff", fg: "#0b0a0c", accent: "#f4efe6" },
  { id: "ek", cat: "hets", lines: ["EK > ER"], sub: "Vi kommer anställa er.", bg: "#0b0a0c", fg: "#e8ff59", accent: "#f4efe6" },
  { id: "rorinte", cat: "hets", lines: ["RÖR INTE", "MIN LAPTOP"], sub: "Jag ser dig.", bg: "#ff3b30", fg: "#fff", accent: "#0b0a0c", tag: "Bästsäljare" },
  { id: "skap", cat: "hets", lines: ["MITT SKÅP.", "DINA", "PROBLEM."], sub: "Respektera zonen.", bg: "#0b0a0c", fg: "#f4efe6", accent: "#e8ff59" },
  { id: "ratt", cat: "hets", lines: ["JAG HADE", "RÄTT."], sub: "Som vanligt.", bg: "#c9a8ff", fg: "#0b0a0c", accent: "#f4efe6" },
  { id: "kebab", cat: "hets", lines: ["KEBAB", "> PIZZA"], sub: "Kom och bråka.", bg: "#f2c14e", fg: "#0b0a0c", accent: "#c8102e", pair: "pizza", tag: "Rivalpar" },
  { id: "pizza", cat: "hets", lines: ["PIZZA", "> KEBAB"], sub: "Diskussionen är över.", bg: "#ff8a3d", fg: "#0b0a0c", accent: "#f4efe6", pair: "kebab", tag: "Rivalpar" },
  // Pilar – pekar på dig, din grej eller ditt "andra jag"
  { id: "ceo", cat: "pilar", lines: ["↑ CEO", "↓ AVD. FÖR", "DÅLIGA", "BESLUT"], bg: "#f4efe6", fg: "#0b0a0c", accent: "#ff4f8b" },
  { id: "hjarna", cat: "pilar", lines: ["↑ HJÄRNA", "↓ DET SOM", "FAKTISKT", "STYR"], bg: "#ff4f8b", fg: "#0b0a0c", accent: "#f4efe6", tag: "Ny" },
  { id: "kaos", cat: "pilar", lines: ["HÄR BOR", "KAOS ↓"], sub: "Öppna på egen risk.", bg: "#0b0a0c", fg: "#e8ff59", accent: "#f4efe6" },
  // Konst – bildstickers. Bara bilder vi har rätt att trycka (egna eller fria från upphovsrätt)
  { id: "napoleon", cat: "konst", title: "Napoleon", img: "assets/produkter/napoleon.jpg", desc: "Oljemålning av Jacques-Louis David, 1801. Fri att använda.", bg: "#2b2a2e", fg: "#f4efe6", accent: "#c8102e", tag: "Drop 01" },
];

// Gör en Deluxe-design av en textprodukt (stora bokstäver, etiketter, tejp)
function textLayers(p) {
  const maxLen = Math.max(...p.lines.map((l) => [...l].length));
  const size = Math.min(30, 84 / (maxLen * 0.47));
  const blockH = (p.lines.length * size * 0.9) / 1.414; // höjd i % av arket
  const top = p.brand ? 20 : Math.max(16, 46 - blockH / 2 - (p.sub ? 5 : 0));
  const L = [
    { k: "label", text: p.brand ? "ORIGINAL FEELING DEPARTMENT" : `STICKR · ${CATEGORIES.find((c) => c.id === p.cat).name.toUpperCase()}`, x: 6, y: 5.5, color: p.fg },
    { k: "icon", icon: p.brand ? "sparkle" : "star", color: p.accent, x: 78, y: 3, w: 15, h: 10.5, r: 12 },
    { k: "text", text: p.lines.join("<br>"), font: "cond", size, color: p.fg, x: 6, y: top },
    { k: "tape", x: 58, y: -1, w: 20, h: 4.5, r: 4 },
    { k: "label", text: p.brand ? "QUALITY GOODS · SINCE 1997" : `DELUXE Nº ${String(PRODUCTS.indexOf(p) + 1).padStart(3, "0")} · A4`, x: 6, y: 93, color: p.fg },
  ];
  if (p.sub) L.push({ k: "text", text: p.sub, font: "serif", size: 8, color: p.accent, x: 6, y: top + blockH + 3 });
  if (p.brand && top + blockH < 78) L.push({ k: "icon", icon: "scribble", color: p.accent, x: 56, y: Math.max(76, top + blockH + 2), w: 34, h: 12, r: -6 });
  return L;
}

/* ---------- Stickr Business (B2B) ---------- */
const PACKAGES = [
  { name: "Mässpaketet", price: "449 kr", desc: "10 ark med er logga – utskurna. Dela ut i montern, sätt på kassan, sälj som merch.", list: ["10 A4-ark, utskurna", "Er logga i 3 storlekar", "Klart på 5 skoldagar"] },
  { name: "Monter-Deluxe", price: "349 kr", desc: "5 Sticker Deluxe som skylt, meny eller prislista. Klistra på bordet, laptopen eller väggen.", list: ["5 A4 Deluxe", "Vi hjälper till med layout", "Tål mässans alla händer"], hero: true },
  { name: "Merch-drop", price: "Offert", desc: "Egen sticker-kollektion att sälja vidare. Ni designar, vi trycker – ni tar marginalen.", list: ["Från 25 ark", "Vi fixar trycket", "Ni sätter priset"] },
];

const SIZE_COUNT = { s: 30, m: 12, l: 6 };
const SIZE_LABEL = { s: "Liten", m: "Mellan", l: "Stor" };
const FINISH_LABEL = { matt: "Matt", glossy: "Blank", holo: "Holo" };
const TEMPLATE_LABEL = { kollage: "Kollage", schema: "Schema", helbild: "Helbild" };

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const kr = (n) => `${Math.round(n)} kr`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const escBr = (s) => esc(s).replace(/&lt;br&gt;/g, "<br>");

// Bildsökvägar görs absoluta – annars tolkas url() i CSS-variabler relativt till css-mappen
const absUrl = (path) => new URL(path, document.baseURI).href;

// Förutsägbar "slump" så kollagen ser likadana ut vid varje besök
function rng(seed) {
  let s = 0;
  for (const c of String(seed)) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// Rivna papperskanter som clip-path
function torn(seed) {
  const r = rng(seed);
  const j = () => (r() * 2.6).toFixed(1);
  const pts = [];
  for (let i = 0; i <= 10; i++) pts.push(`${i * 10}% ${j()}%`);
  for (let i = 1; i <= 10; i++) pts.push(`${100 - j()}% ${i * 10}%`);
  for (let i = 9; i >= 0; i--) pts.push(`${i * 10}% ${100 - j()}%`);
  for (let i = 9; i >= 1; i--) pts.push(`${j()}% ${i * 10}%`);
  return `polygon(${pts.join(",")})`;
}

const ICONS = {
  star: '<path d="M50 2 61 35 96 30 68 52 84 86 50 66 16 86 32 52 4 30 39 35Z"/>',
  heart: '<path d="M50 88C20 66 4 50 4 30 4 15 16 4 30 4c9 0 16 5 20 12C54 9 61 4 70 4c14 0 26 11 26 26 0 20-16 36-46 58Z"/>',
  bolt: '<path d="M58 2 14 56h28l-8 42 52-60H56Z"/>',
  sparkle: '<path d="M50 0C54 34 66 46 100 50 66 54 54 66 50 100 46 66 34 54 0 50 34 46 46 34 50 0Z"/>',
  ball: '<circle cx="50" cy="50" r="46"/><path fill="var(--ic2,#0b0a0c)" d="M50 30 64 40 59 57H41L36 40ZM50 4v14l-10 7-14-4-6-10a46 46 0 0 1 30-7ZM90 32l-9 11 4 15 12 2a46 46 0 0 0-7-28ZM10 32a46 46 0 0 0-7 28l12-2 4-15ZM30 89l4-13 13-6h6l13 6 4 13a46 46 0 0 1-40 0Z"/>',
  arrow: '<path fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="M4 70C20 30 50 20 70 40c10 10 4 26-8 22-12-4-6-26 14-30 6-1 14 0 20 4M96 36l-12-14M96 36l-17 4"/>',
  scribble: '<path fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" d="M8 60c10-30 30-40 40-20s-20 30-10 40 40-50 50-30-10 30 10 30"/>',
};
const icon = (name, color, extra = "") =>
  `<svg viewBox="0 0 100 100" class="icon" style="color:${color};fill:${color}" ${extra} aria-hidden="true">${ICONS[name] || ""}</svg>`;

/* ---------- Små stickers (arken, världarna) ---------- */
let sealId = 0;
function stickerHTML(sp, { positioned = true, size } = {}) {
  const style = [
    positioned ? `left:${sp.x}%;top:${sp.y}%` : "",
    `--r:${sp.r || 0}deg`, `--s:${sp.s || 1}`,
    sp.bg ? `--bg:${sp.bg}` : "", sp.fg ? `--fg:${sp.fg}` : "",
    size ? `font-size:${size}cqw` : "",
  ].filter(Boolean).join(";");
  let body;
  switch (sp.t) {
    case "seal": {
      const id = `seal${sealId++}`;
      body = `<span class="sk-b sk-seal"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="${id}" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"/></defs><text><textPath href="#${id}">${esc(sp.text)}</textPath></text></svg><span class="sk-icon">${esc(sp.icon || "✦")}</span></span>`;
      break;
    }
    case "ticket":
      body = `<span class="sk-b sk-ticket"><span class="sk-ticket-in"><strong>${esc(sp.text)}</strong><small>${esc(sp.sub || "")}</small></span></span>`;
      break;
    case "star":
      body = `<span class="sk-b sk-star"><span class="sk-star-in">${esc(sp.text)}</span></span>`;
      break;
    case "icon":
      body = `<span class="sk-b sk-iconsticker">${icon(sp.icon, sp.fg || "#fff", `style="--ic2:${sp.bg}"`)}</span>`;
      break;
    default:
      body = `<span class="sk-b sk-${sp.t}">${esc(sp.text)}</span>`;
  }
  return `<div class="sk${positioned ? "" : " sk-static"}" style="${style}" ${sp.speed ? `data-speed="${sp.speed}"` : ""}>${body}</div>`;
}

/* ---------- Schema ---------- */
function scheduleHTML(data = SCHEDULE, editable = false) {
  const ce = editable ? ' contenteditable="true" spellcheck="false"' : "";
  const cell = (txt, ri, di) => {
    const c = SUBJECT_COLORS[txt.trim().toLowerCase()] || "#efe9df";
    const dark = c === "#0b0a0c";
    return `<span class="sch-cell${dark ? " is-dark" : ""}" style="--c:${c}" data-r="${ri}" data-d="${di}"${ce}>${esc(txt)}</span>`;
  };
  return `<div class="sch">
    <span class="sch-corner"></span>${data.days.map((d) => `<span class="sch-day">${d}</span>`).join("")}
    ${data.rows.map((row, ri) => `<span class="sch-time">${["08:15", "09:40", "11:40", "12:30", "14:00"][ri] || ""}</span>${row.map((t, di) => cell(t, ri, di)).join("")}`).join("")}
  </div>`;
}

/* ---------- Ett lager i kollaget ---------- */
function layerHTML(L, seed, opts) {
  const pos = `left:${L.x}%;top:${L.y}%;${L.w != null ? `width:${L.w}%;` : ""}${L.h != null ? `height:${L.h}%;` : ""}--r:${L.r || 0}deg`;
  const clip = L.torn ? `;clip-path:${torn(seed)}` : "";
  switch (L.k) {
    case "ph": {
      const user = opts.images?.length && L.slot != null ? opts.images[L.slot % opts.images.length] : null;
      const img = user || (L.img && absUrl(L.img));
      return `<div class="L L-ph form-${L.form || "rect"}${L.dots ? " has-dots" : ""}" ${img ? "" : `data-photo="${L.photo || ""}"`}
        style="${pos}${clip};--g:${L.g}${img ? `;--img:url('${img}')` : ""}"></div>`;
    }
    case "paper": {
      const bg = L.pat ? "" : `;background:${L.color}`;
      return `<div class="L L-paper form-${L.form || "rect"}${L.pat ? ` pat-${L.pat}` : ""}" style="${pos}${clip}${bg}">${L.text ? `<span>${escBr(L.text)}</span>` : ""}</div>`;
    }
    case "text":
      return `<div class="L L-text font-${L.font || "sans"}" style="${pos};font-size:${L.size}cqw;color:${L.color}">${escBr(L.text)}</div>`;
    case "cut": {
      const r = rng(seed + L.text);
      const papers = ["#f4efe6", "#0b0a0c", "#e8ff59", "#ff4f8b", "#c9a8ff", "#fff"];
      const fonts = ["serif", "sans", "cond"];
      const letters = [...L.text].map((ch) => {
        if (ch === " ") return '<span class="cut-sp"></span>';
        const p = papers[Math.floor(r() * papers.length)];
        const dark = p === "#0b0a0c";
        return `<span class="cut-l font-${fonts[Math.floor(r() * 3)]}" style="background:${p};color:${dark ? "#f4efe6" : "#0b0a0c"};--lr:${(r() * 14 - 7).toFixed(1)}deg">${esc(ch)}</span>`;
      }).join("");
      return `<div class="L L-cut" style="${pos};font-size:${L.size}cqw">${letters}</div>`;
    }
    case "tape":
      return `<div class="L L-tape" style="${pos}"></div>`;
    case "icon":
      return `<div class="L L-icon" style="${pos}">${icon(L.icon, L.color)}</div>`;
    case "label":
      return `<div class="L L-label" style="${pos};${L.color ? `color:${L.color}` : ""}">${esc(L.text)}</div>`;
    case "sk":
      return `<div class="L L-sk" style="${pos}">${stickerHTML({ ...L, x: 0, y: 0 }, { positioned: false, size: L.size || 2 })}</div>`;
    case "schedule":
      return `<div class="L L-schedule" style="${pos}">${scheduleHTML(opts.schedule || SCHEDULE, opts.editable)}</div>`;
    default:
      return "";
  }
}

// Bygger en hel Sticker Deluxe. opts: { images, schedule, editable, peel, className }
function deluxeHTML(key, opts = {}) {
  const d = DELUXE[key];
  // Kundens bilder fyller foto-ytorna i tur och ordning
  let slot = 0;
  const layers = d.layers.map((L, i) => layerHTML(L.k === "ph" ? { ...L, slot: slot++ } : L, `${key}-${i}`, opts)).join("");
  return `<div class="deluxe${opts.peel === false ? "" : " has-peel"} ${opts.className || ""}" data-deluxe="${key}" style="--dbg:${d.bg}">
    <div class="deluxe-card"><div class="deluxe-in">${layers}</div><span class="peel" aria-hidden="true"></span></div>
  </div>`;
}

// Krymper stor text som inte får plats på arket (t.ex. långa ord eller om typsnittet inte laddat)
function fitTexts(root = document) {
  $$(".deluxe .L-text", root).forEach((el) => {
    const box = el.closest(".deluxe-in");
    if (!box || !box.clientWidth) return;
    const base = parseFloat(el.dataset.size || el.style.fontSize);
    el.dataset.size = base;
    el.style.fontSize = `${base}cqw`;
    const avail = box.clientWidth * (1 - parseFloat(el.style.left) / 100) - box.clientWidth * 0.05;
    if (el.offsetWidth > avail) el.style.fontSize = `${(base * avail / el.offsetWidth).toFixed(2)}cqw`;
  });
}

// Riktiga foton: lägg assets/foton/<namn>.jpg så byts gradienten ut automatiskt
const photoCache = {};
function hydratePhotos(root = document) {
  $$("[data-photo]", root).forEach((el) => {
    const name = el.dataset.photo;
    if (!name) return;
    const apply = (ok) => { if (ok) el.style.setProperty("--img", `url('${absUrl(`assets/foton/${name}.jpg`)}')`); };
    if (name in photoCache) return photoCache[name].then(apply);
    photoCache[name] = new Promise((res) => {
      const img = new Image();
      img.onload = () => res(true);
      img.onerror = () => res(false);
      img.src = `assets/foton/${name}.jpg`;
    });
    photoCache[name].then(apply);
  });
}

/* =========================================================
   Sektioner
   ========================================================= */
function renderHero() {
  $("#heroDeluxe").innerHTML = deluxeHTML("kollage", { className: "deluxe--hero" });
  const around = [
    { t: "pill", text: "Nº 001 / 100", x: 2, y: 18, r: -8, bg: "#e8ff59", fg: "#0b0a0c", speed: 1.2 },
    { t: "seal", text: "STICKR DELUXE · A4 · DROP 01 · ", icon: "✦", x: 82, y: 6, r: 8, bg: "#f4efe6", fg: "#0b0a0c", speed: 0.7 },
    { t: "tag", text: "EN ENDA STICKER", x: 76, y: 78, r: 6, bg: "#ff4f8b", fg: "#fff", speed: 1.5 },
  ];
  $("#heroStickers").innerHTML = around.map((s) => stickerHTML(s)).join("");
  fitTexts($("#hero"));
}

function sceneHTML(u) {
  const dlx = deluxeHTML(u.deluxe, { className: "deluxe--scene" });
  switch (u.scene) {
    case "locker":
      return `<div class="scene scene-locker"><div class="locker"><span class="locker-vents"></span><span class="locker-num">214</span><span class="locker-handle"></span>${dlx}</div></div>`;
    case "laptop":
      return `<div class="scene scene-laptop"><div class="lid"><span class="lid-logo"></span>${dlx}</div><div class="lid-base"></div></div>`;
    case "binder":
      return `<div class="scene scene-binder"><div class="binder"><span class="binder-spine"><i></i><i></i></span>${dlx}</div></div>`;
    case "wall":
      return `<div class="scene scene-wall"><div class="wall">${dlx}<span class="wall-shelf"></span></div></div>`;
    case "gym":
      return `<div class="scene scene-gym"><div class="locker locker--dark"><span class="locker-vents"></span><span class="locker-num">07</span><span class="locker-handle"></span>${dlx}</div></div>`;
    default:
      return "";
  }
}

function renderUses() {
  $("#usesTrack").innerHTML = USES.map((u) => `
    <article class="use" data-use="${u.id}">
      <div class="use-visual">${sceneHTML(u)}</div>
      <div class="use-copy">
        <span class="use-num">${u.num} / ${String(USES.length).padStart(2, "0")}</span>
        <h3>${esc(u.title)}</h3>
        <p>${esc(u.line)}</p>
        <a href="${u.template ? "#bygg" : "#butik"}" class="use-link" ${u.template ? `data-template="${u.template}"` : `data-cat-link="${u.cat}"`}>${esc(u.cta)} →</a>
      </div>
    </article>`).join("");
  fitTexts($("#usesTrack"));
}

function renderProcess() {
  const picks = [
    WORLDS[0].stickers[1], WORLDS[1].stickers[1], WORLDS[2].stickers[2],
    WORLDS[3].stickers[0], WORLDS[0].stickers[3], WORLDS[1].stickers[0],
    WORLDS[2].stickers[4], WORLDS[3].stickers[5], WORLDS[4].stickers[3],
  ];
  // Skärlinjen ligger inuti stickern så den följer dess form
  $("#processGrid").innerHTML = picks.map((s) => {
    const html = stickerHTML({ ...s, s: 0.62, r: (s.r || 0) / 2 }, { positioned: false });
    const round = ["seal", "icon", "star"].includes(s.t);
    return `<div class="sheet-cell">${html.replace(/<\/div>$/, `<span class="cut-line${round ? " cut-line--round" : ""}"></span></div>`)}</div>`;
  }).join("");
}

function renderBusiness() {
  $("#bizDeluxe").innerHTML = deluxeHTML("business", { className: "deluxe--biz" });
  $("#bizGrid").innerHTML = PACKAGES.map((p) => `
    <article class="price-card${p.hero ? " price-card--hero" : ""}">
      ${p.hero ? '<span class="price-flag">Mest bokat</span>' : ""}
      <p class="price-kicker">${esc(p.name)}</p>
      <p class="price-num"><span>${esc(p.price.replace(" kr", ""))}</span>${p.price.endsWith("kr") ? " kr" : ""}</p>
      <p class="price-desc">${esc(p.desc)}</p>
      <ul>${p.list.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    </article>`).join("");
  const subject = encodeURIComponent("Stickr Business – vi vill boka ett möte");
  const body = encodeURIComponent("Hej Stickr!\n\nVi är UF-företaget: \nVi är intresserade av: Mässpaketet / Monter-Deluxe / Merch-drop\nBästa tid för ett snabbt möte: \n\n/");
  $("#bizCta").href = `mailto:${CONFIG.orderEmail}?subject=${subject}&body=${body}`;
}

/* ---------- Drop 01: nedräkning + väntelista ---------- */
function setupDrop() {
  const target = new Date(CONFIG.dropDate).getTime();
  const el = { d: $("#cdD"), h: $("#cdH"), m: $("#cdM"), s: $("#cdS") };
  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
  const tick = () => {
    const left = Math.max(0, target - Date.now());
    el.d.textContent = pad(Math.floor(left / 864e5));
    el.h.textContent = pad(Math.floor(left / 36e5) % 24);
    el.m.textContent = pad(Math.floor(left / 6e4) % 60);
    el.s.textContent = pad(Math.floor(left / 1e3) % 60);
    if (!left) $("#dropState").textContent = "Droppen är öppen";
  };
  tick();
  setInterval(tick, 1000);
  $("#dropSize").textContent = CONFIG.dropSize;
  $("#dropDate").textContent = new Date(CONFIG.dropDate).toLocaleDateString("sv-SE", { weekday: "long", day: "numeric", month: "long" });

  $("#waitForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const body = [
      "Hej Stickr!", "",
      `Jag vill stå på väntelistan till ${CONFIG.dropName}.`,
      `Namn: ${data.get("name")}`,
      `Kontakt: ${data.get("contact")}`,
      data.get("ref") ? `Värvad av: ${data.get("ref")}` : null,
    ].filter((x) => x !== null).join("\n");
    window.location.href = `mailto:${CONFIG.orderEmail}?subject=${encodeURIComponent(`Väntelista ${CONFIG.dropName}`)}&body=${encodeURIComponent(body)}`;
    toast("Mejlet öppnas – skicka så är du med på listan");
  });
}

/* =========================================================
   Toast + burst
   ========================================================= */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-show"), 2400);
}

function burst(x, y) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#e8ff59", "#ff4f8b", "#c9a8ff", "#f4efe6", "#3dd6ff"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "burst";
    s.innerHTML = icon(i % 2 ? "star" : "sparkle", colors[i % colors.length]);
    s.style.cssText = `left:${x}px;top:${y}px`;
    const a = Math.random() * Math.PI * 2;
    const d = 70 + Math.random() * 110;
    s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
    s.style.setProperty("--dy", `${Math.sin(a) * d - 50}px`);
    s.style.setProperty("--rot", `${Math.random() * 360 - 180}deg`);
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
}

/* =========================================================
   Butik / katalog
   ========================================================= */
let shopCat = "alla";
const productName = (p) => p.title || p.lines.join(" ").replace(/\s*([↑↓])\s*/g, " $1 ").trim();

function productCard(p) {
  const custom = p.cat === "egen";
  return `
    <article class="product" data-id="${p.id}" style="--wbg:${p.bg};--wfg:${p.fg}">
      <div class="product-visual" data-cursor="${custom ? "Skapa" : "Lägg till"}">
        ${p.tag ? `<span class="product-tag">${esc(p.tag)}</span>` : ""}
        <div class="product-deluxe">${deluxeHTML(p.id, { className: "deluxe--product" })}</div>
        <div class="mini-sheet" hidden>${p.img ? Array.from({ length: 6 }, () => `<div class="mini-cell"><img class="mini-img" src="${p.img}" alt=""></div>`).join("") : (p.lines || ["DIN", "GREJ"]).slice(0, 2).concat(p.sub ? [p.sub] : []).concat(["STICKR"]).flatMap((t, i) => [
          { t: ["pill", "tag", "star"][i % 3], text: t, bg: i % 2 ? p.fg : p.bg, fg: i % 2 ? p.bg : p.fg },
          { t: ["tag", "pill", "word"][i % 3], text: t, bg: p.accent, fg: p.fg === "#fff" ? "#0b0a0c" : p.fg },
        ]).slice(0, 6).map((sp) => `<div class="mini-cell">${stickerHTML({ ...sp, s: 0.5 }, { positioned: false })}</div>`).join("")}</div>
      </div>
      <div class="product-body">
        <div class="product-top"><h3>${esc(p.title || productName(p))}</h3><span class="product-price" data-price>${custom ? "från " : ""}${kr(custom ? CONFIG.deluxeCustomPrice : CONFIG.deluxePrice)}</span></div>
        ${p.pair ? `<p class="product-pair">Rivalpar med <button type="button" data-goto="${p.pair}">${esc(productName(PRODUCTS.find((x) => x.id === p.pair)))}</button> – köp båda sidor.</p>` : `<p>${esc(p.desc || p.sub || "Sticker Deluxe · ett helt A4")}</p>`}
        ${custom ? `<a href="#bygg" class="btn btn-light btn-block add-btn" data-template="${p.id}">Skapa din egen</a>` : `
        <div class="toggle" data-group="format" role="group" aria-label="Format">
          <button type="button" class="is-active" data-format="deluxe">Deluxe</button>
          <button type="button" data-format="sheet">Sheet</button>
        </div>
        <div class="toggle" data-group="cut" role="group" aria-label="Skärning">
          <button type="button" class="is-active" data-cut="no">Rak kant</button>
          <button type="button" data-cut="yes">Utskuren +${CONFIG.cutExtra}</button>
        </div>
        <button class="btn btn-light btn-block add-btn" data-add="${p.id}">Lägg i korgen</button>`}
      </div>
    </article>`;
}

const CUSTOM_PRODUCTS = [
  { id: "schema", cat: "egen", title: "Ditt schema", desc: "Skriv in lektionerna direkt på stickern.", bg: "#fbf8f2", fg: "#0b0a0c", accent: "#ff4f8b" },
  { id: "kollage", cat: "egen", title: "Ditt kollage", desc: "Ladda upp 1–6 bilder. Vi gör kollaget.", bg: "#f1ebe0", fg: "#0b0a0c", accent: "#ff4f8b" },
];

function renderShop() {
  const all = [...PRODUCTS, ...CUSTOM_PRODUCTS];
  const list = shopCat === "alla" ? all : all.filter((p) => p.cat === shopCat);
  $("#shopGrid").innerHTML = list.map(productCard).join("");
  fitTexts($("#shopGrid"));
  $$("#shopTabs button").forEach((b) => b.classList.toggle("is-active", b.dataset.cat === shopCat));
  hydratePhotos($("#shopGrid"));
}

function setShopCat(cat) {
  shopCat = cat;
  renderShop();
}

function cardState(card) {
  const sheet = $('[data-group="format"] .is-active', card)?.dataset.format === "sheet";
  const cut = $('[data-group="cut"] .is-active', card)?.dataset.cut === "yes";
  return { sheet, cut, price: (sheet ? CONFIG.sheetPrice : CONFIG.deluxePrice) + (cut ? CONFIG.cutExtra : 0) };
}

function setupShop() {
  $("#shopTabs").innerHTML = CATEGORIES.map((c) => `<button type="button" data-cat="${c.id}">${esc(c.name)}</button>`).join("");
  $("#shopTabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) setShopCat(b.dataset.cat);
  });

  // Länkar från "ställena" filtrerar katalogen
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-cat-link]");
    if (link) setShopCat(link.dataset.catLink);
  });

  $("#shopGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    if (!card) return;

    const go = e.target.closest("[data-goto]");
    if (go) {
      const target = $(`.product[data-id="${go.dataset.goto}"]`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.classList.add("is-flash");
      setTimeout(() => target?.classList.remove("is-flash"), 1200);
      return;
    }

    const tbtn = e.target.closest(".toggle button");
    if (tbtn) {
      $$("button", tbtn.parentElement).forEach((b) => b.classList.toggle("is-active", b === tbtn));
      const st = cardState(card);
      $("[data-price]", card).textContent = kr(st.price);
      $(".product-deluxe", card).hidden = st.sheet;
      $(".mini-sheet", card).hidden = !st.sheet;
      $('[data-group="cut"] [data-cut="no"]', card).textContent = st.sheet ? "Oskuret" : "Rak kant";
      fitTexts(card);
      return;
    }

    const add = e.target.closest("[data-add]") || (e.target.closest(".product-visual") && $("[data-add]", card));
    if (!add) {
      if (e.target.closest(".product-visual")) $("[data-template]", card)?.click();
      return;
    }
    const p = PRODUCTS.find((x) => x.id === card.dataset.id);
    const st = cardState(card);
    addToCart({
      key: `${p.id}-${st.sheet ? "sheet" : "deluxe"}-${st.cut ? "cut" : "uncut"}`,
      name: `${productName(p)} – ${st.sheet ? "Sheet" : "Deluxe"}`,
      detail: st.sheet ? (st.cut ? "Utskuret" : "Oskuret") : (st.cut ? "Konturskuren" : "Rak kant"),
      price: st.price, qty: 1, bg: p.bg,
    });
    const r = (e.target.closest(".product-visual") || add).getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    toast(`${productName(p)} ligger i korgen`);
  });
  renderShop();
}

/* =========================================================
   Varukorg (sparas i webbläsaren)
   ========================================================= */
const CART_KEY = "stickr-cart-v3";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* privat läge – korgen funkar ändå under besöket */ }
}
const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
const cartSubtotal = () => cart.reduce((n, l) => n + l.qty * l.price, 0);
const cartDiscount = () => (cartCount() >= CONFIG.dealMinSheets ? (cartSubtotal() * CONFIG.dealPercent) / 100 : 0);

function addToCart(line) {
  const existing = cart.find((l) => l.key === line.key);
  if (existing) existing.qty += line.qty;
  else cart.push(line);
  saveCart();
  renderCart();
  const c = $("#cartCount");
  c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
}

function renderCart() {
  $("#cartCount").textContent = cartCount();
  $("#cartItems").innerHTML = cart.length
    ? cart.map((l, i) => `
      <div class="line">
        <div class="line-thumb" style="--bg:${l.bg || "#c9a8ff"}">${l.thumb ? `<img src="${l.thumb}" alt="">` : icon("star", "#f4efe6")}</div>
        <div class="line-info"><strong>${esc(l.name)}</strong><small>${esc(l.detail || "")} · ${kr(l.price)}/st</small></div>
        <div class="line-qty"><button data-dec="${i}" aria-label="Minska">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="Öka">+</button></div>
      </div>`).join("")
    : `<div class="drawer-empty"><em>Tomt här.</em><span>Din Deluxe väntar.</span></div>`;
  const discount = cartDiscount();
  $("#cartTotal").textContent = kr(cartSubtotal() - discount);
  const left = CONFIG.dealMinSheets - cartCount();
  $("#dealHint").textContent = discount
    ? `Klass-deal aktiv: −${kr(discount)}`
    : cart.length && left > 0 ? `${left} st till ger ${CONFIG.dealPercent} % klass-rabatt` : "";
  $("#orderForm").hidden = !cart.length;
}

function setupCart() {
  const drawer = $("#drawer");
  const backdrop = $("#backdrop");
  const open = () => { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); backdrop.hidden = false; window.lenis?.stop(); };
  const close = () => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); backdrop.hidden = true; window.lenis?.start(); };
  $("#cartBtn").addEventListener("click", open);
  $("#closeCart").addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) close(); });

  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) cart[+inc.dataset.inc].qty++;
    if (dec) { const i = +dec.dataset.dec; if (--cart[i].qty <= 0) cart.splice(i, 1); }
    if (inc || dec) { saveCart(); renderCart(); }
  });

  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const delivery = data.get("delivery");
    const ship = delivery.startsWith("Post") ? CONFIG.shipping : 0;
    const discount = cartDiscount();
    const lines = cart.map((l) => `• ${l.qty} × ${l.name}${l.detail ? ` (${l.detail})` : ""} – ${kr(l.qty * l.price)}${l.extra ? `\n${l.extra}` : ""}`);
    const body = [
      "Hej Stickr!", "", "Jag vill beställa:", ...lines, "",
      discount ? `Klass-rabatt: −${kr(discount)}` : null,
      `Leverans: ${delivery}`,
      `Totalt: ${kr(cartSubtotal() - discount + ship)}`, "",
      `Namn: ${data.get("name")}`,
      `Kontakt: ${data.get("contact")}`,
      cart.some((l) => l.custom) ? "\n(Jag bifogar mina bilder i det här mejlet.)" : null,
    ].filter((x) => x !== null).join("\n");
    window.location.href = `mailto:${CONFIG.orderEmail}?subject=${encodeURIComponent(`Beställning – ${CONFIG.brand}`)}&body=${encodeURIComponent(body)}`;
    toast("Mejlet öppnas – tryck skicka så är det klart");
  });
  renderCart();
}

/* =========================================================
   Byggaren: Deluxe (kollage / schema / helbild) eller Sheet
   ========================================================= */
const builder = {
  format: "deluxe", template: "kollage", images: [], size: "m", cut: "no", finish: "matt", qty: 1,
  schedule: JSON.parse(JSON.stringify(SCHEDULE)),
};

const builderUnit = () =>
  (builder.format === "deluxe" ? CONFIG.deluxeCustomPrice : CONFIG.sheetCustomPrice)
  + (builder.cut === "yes" ? CONFIG.cutExtra : 0)
  + (builder.finish === "holo" ? CONFIG.holoExtra : 0);

function renderBuilder() {
  const prev = $("#builderPreview");
  const imgs = builder.images.map((i) => i.url);
  const deluxe = builder.format === "deluxe";
  $("#tplOpt").hidden = !deluxe;
  $("#sizeOpt").hidden = deluxe;
  $("#cutYesLabel").textContent = deluxe ? "Konturskuren" : "Utskuret";
  $("#cutNoLabel").textContent = deluxe ? "Rak kant" : "Oskuret";
  $("#cutNoSub").textContent = deluxe ? "Rak A4-kant" : "Du klipper själv";
  $("#schemaHint").hidden = !(deluxe && builder.template === "schema");

  let html;
  if (deluxe && builder.template !== "helbild") {
    html = deluxeHTML(builder.template, { images: imgs, schedule: builder.schedule, editable: true, className: "deluxe--builder" });
  } else if (deluxe) {
    html = `<div class="deluxe has-peel deluxe--builder deluxe--full"><div class="deluxe-card"><div class="deluxe-in">${imgs[0]
      ? `<div class="L L-ph form-rect" style="left:0;top:0;width:100%;height:100%;--img:url('${imgs[0]}')"></div>`
      : `<div class="full-ph"><span>Din bild.<br>Hela arket.</span></div>`}</div><span class="peel"></span></div></div>`;
  } else {
    const n = SIZE_COUNT[builder.size];
    html = `<div class="sheet sheet--builder"><div class="a4-grid size-${builder.size}${builder.cut === "yes" ? " is-cut" : ""}">${Array.from({ length: n }, (_, i) =>
      `<div class="a4-item" style="animation-delay:${i * 16}ms">${imgs.length ? `<img src="${imgs[i % imgs.length]}" alt="">` : `<span class="a4-ph">${icon(["star", "heart", "sparkle", "bolt"][i % 4], "#d8d0dc")}</span>`}</div>`).join("")}</div><span class="sheet-label">A4 · 210 × 297 mm</span></div>`;
  }
  prev.innerHTML = html;
  prev.className = `builder-preview finish-${builder.finish}${deluxe && builder.cut === "yes" ? " is-contour" : ""}`;
  hydratePhotos(prev);
  fitTexts(prev);

  $("#thumbs").innerHTML = builder.images.map((img, i) =>
    `<div class="thumb"><img src="${img.url}" alt="${esc(img.name)}"><button type="button" data-remove="${i}" aria-label="Ta bort ${esc(img.name)}">✕</button></div>`).join("");
  $("#customPrice").textContent = kr(builderUnit() * builder.qty);
  $("#qtyVal").textContent = builder.qty;
  const needsImage = !(deluxe && builder.template === "schema");
  $("#addCustom").disabled = needsImage && !builder.images.length;
  $("#customHint").textContent = needsImage && !builder.images.length
    ? "Ladda upp minst en bild för att fortsätta."
    : `${deluxe ? `Sticker Deluxe · ${TEMPLATE_LABEL[builder.template]}` : `Sticker Sheet · ${SIZE_COUNT[builder.size]} st`} · ${kr(builderUnit())}/st`;
}

function makeThumb(url, size = 96) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const k = Math.min(1, size / Math.max(img.width, img.height));
      c.width = Math.max(1, Math.round(img.width * k));
      c.height = Math.max(1, Math.round(img.height * k));
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function addFiles(files) {
  const imgs = [...files].filter((f) => f.type.startsWith("image/"));
  const room = CONFIG.maxUploads - builder.images.length;
  if (!imgs.length) return toast("Det där var ingen bild");
  if (room <= 0) return toast(`Max ${CONFIG.maxUploads} bilder`);
  imgs.slice(0, room).forEach((f) => builder.images.push({ url: URL.createObjectURL(f), name: f.name }));
  if (imgs.length > room) toast(`Bara ${CONFIG.maxUploads} bilder får plats – resten hoppades över`);
  renderBuilder();
}

function setBuilder(key, value) {
  builder[key] = value;
  const seg = { format: "#formatSeg", template: "#tplSeg" }[key];
  if (seg) $$("button", $(seg)).forEach((b) => b.classList.toggle("is-active", b.dataset[key] === value));
  renderBuilder();
}

function setupBuilder() {
  const dz = $("#dropzone");
  $("#fileInput").addEventListener("change", (e) => { addFiles(e.target.files); e.target.value = ""; });
  ["dragenter", "dragover"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("is-over"); }));
  ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("is-over"); }));
  dz.addEventListener("drop", (e) => addFiles(e.dataTransfer.files));

  $("#thumbs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-remove]");
    if (!b) return;
    const [removed] = builder.images.splice(+b.dataset.remove, 1);
    URL.revokeObjectURL(removed.url);
    renderBuilder();
  });

  const seg = (id, key) => $(id).addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("button", $(id)).forEach((x) => x.classList.toggle("is-active", x === b));
    builder[key] = b.dataset[key];
    renderBuilder();
  });
  seg("#formatSeg", "format");
  seg("#tplSeg", "template");
  seg("#sizeSeg", "size");
  seg("#cutSeg", "cut");
  seg("#finishSeg", "finish");

  // Schemat redigeras direkt på stickern
  $("#builderPreview").addEventListener("input", (e) => {
    const c = e.target.closest(".sch-cell");
    if (!c) return;
    builder.schedule.rows[+c.dataset.r][+c.dataset.d] = c.textContent.trim();
    const col = SUBJECT_COLORS[c.textContent.trim().toLowerCase()] || "#efe9df";
    c.style.setProperty("--c", col);
    c.classList.toggle("is-dark", col === "#0b0a0c");
  });

  // Länkar från användningsområdena väljer rätt mall
  document.addEventListener("click", (e) => {
    const link = e.target.closest("[data-template]");
    if (!link || !link.dataset.template) return;
    setBuilder("format", "deluxe");
    setBuilder("template", link.dataset.template);
  });

  $("#qtyMinus").addEventListener("click", () => { builder.qty = Math.max(1, builder.qty - 1); renderBuilder(); });
  $("#qtyPlus").addEventListener("click", () => { builder.qty = Math.min(99, builder.qty + 1); renderBuilder(); });

  $("#addCustom").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const deluxe = builder.format === "deluxe";
    const thumb = builder.images[0] ? await makeThumb(builder.images[0].url) : null;
    const schemaText = deluxe && builder.template === "schema"
      ? builder.schedule.days.map((d, di) => `   ${d}: ${builder.schedule.rows.map((r) => r[di]).join(", ")}`).join("\n")
      : "";
    addToCart({
      key: `custom-${Date.now()}`, custom: builder.images.length > 0,
      name: deluxe ? `Custom Deluxe – ${TEMPLATE_LABEL[builder.template]}` : "Custom Sheet",
      detail: [
        deluxe ? (builder.cut === "yes" ? "Konturskuren" : "Rak kant") : `${SIZE_LABEL[builder.size]}, ${builder.cut === "yes" ? "Utskuret" : "Oskuret"}`,
        FINISH_LABEL[builder.finish],
        builder.images.length ? `${builder.images.length} bilder` : null,
      ].filter(Boolean).join(", "),
      extra: schemaText,
      price: builderUnit(), qty: builder.qty, thumb, bg: "#c9a8ff",
    });
    const r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top);
    toast("Din custom ligger i korgen");
  });

  renderBuilder();
}

/* ---------- Start ---------- */
PRODUCTS.forEach((p) => {
  DELUXE[p.id] = p.img
    ? { name: p.title, bg: p.bg, layers: [{ k: "ph", img: p.img, g: p.bg, x: 0, y: 0, w: 100, h: 100 }] }
    : { name: p.lines.join(" "), bg: p.bg, layers: textLayers(p) };
});
renderHero();
renderUses();
renderProcess();
renderBusiness();
setupShop();
setupCart();
setupBuilder();
setupDrop();
hydratePhotos();
$("#year").textContent = new Date().getFullYear();
document.fonts?.ready.then(() => fitTexts());
