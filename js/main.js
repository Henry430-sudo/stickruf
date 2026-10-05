/* =========================================================
   Stickruf UF – innehåll, butik, byggare och varukorg.
   Animationerna ligger i js/motion.js.

   Vill ni ändra priser, världar eller stickers? Allt finns
   i CONFIG och WORLDS här nedanför.
   ========================================================= */

const CONFIG = {
  orderEmail: "hej@stickruf.se", // Byt till er riktiga mejl
  sheetPrice: 49,                // färdigt ark, oskuret
  customPrice: 79,               // custom-ark, oskuret
  cutExtra: 20,                  // utskärning
  holoExtra: 20,                 // holo-finish
  shipping: 15,                  // porto
  dealMinSheets: 10,             // klass-deal från så här många ark...
  dealPercent: 10,               // ...ger så här många procent rabatt
  maxUploads: 6,
};

/* ---------------------------------------------------------
   Sticker-typer:
   pill   – rundad etikett          { text }
   word   – stort ord               { text }
   tag    – rektangulär etikett     { text }
   ticket – biljett                 { text, sub }
   seal   – rund med text i cirkel  { text, icon }
   star   – stjärnform              { text }
   emoji  – emoji med vit kant      { text }
   ghost  – streckad "din bild här" { text }
   x/y = position i %, r = rotation, s = storlek, bg/fg = färger
   --------------------------------------------------------- */
const WORLDS = [
  {
    id: "matchday",
    name: "Matchday",
    kicker: "För dig som lever för 90 minuter",
    line: "Halsduken på. Laptopen full.",
    bg: "#0d3a29", fg: "#f4efe6", accent: "#e8ff59",
    stickers: [
      { t: "ticket", text: "MATCHDAY", sub: "SEKTION B · RAD 12 · 19:00", x: 6,  y: 13, r: -7, bg: "#f4efe6", fg: "#0d3a29" },
      { t: "pill",   text: "90+3'",       x: 64, y: 12, r: 8,   bg: "#e8ff59", fg: "#0b0a0c", s: 1.2 },
      { t: "star",   text: "GOAL!",       x: 42, y: 4,  r: 12,  bg: "#e8ff59", fg: "#0b0a0c" },
      { t: "emoji",  text: "⚽",          x: 82, y: 30, r: 0,   s: 1.1 },
      { t: "seal",   text: "HELA VÄGEN · HELA TIDEN · ", icon: "♥", x: 7, y: 60, r: -10, bg: "#c8102e", fg: "#fff" },
      { t: "word",   text: "ALLEZ ALLEZ", x: 36, y: 74, r: -4,  bg: "#f4efe6", fg: "#0d3a29" },
      { t: "tag",    text: "TIFO-KLAN",   x: 68, y: 64, r: -9,  bg: "#0b0a0c", fg: "#f4efe6" },
      { t: "emoji",  text: "🧣",          x: 22, y: 34, r: 10,  s: 0.9 },
    ],
  },
  {
    id: "glow",
    name: "Glow",
    kicker: "För main characters",
    line: "Mjukt, glittrigt och helt du.",
    bg: "#f5c6d4", fg: "#3a0d1f", accent: "#ff4f8b",
    stickers: [
      { t: "emoji",  text: "🎀",                 x: 8,  y: 12, r: -12, s: 1.2 },
      { t: "pill",   text: "main character",     x: 60, y: 10, r: 7,   bg: "#fff", fg: "#ff4f8b", s: 1.1 },
      { t: "seal",   text: "BESTIES · 4 · EVER · ", icon: "♡", x: 78, y: 54, r: 10, bg: "#ff4f8b", fg: "#fff" },
      { t: "word",   text: "hot girl walk",      x: 8,  y: 70, r: -5,  bg: "#3a0d1f", fg: "#f5c6d4" },
      { t: "star",   text: "manifest",           x: 33, y: 5,  r: -8,  bg: "#fff1a8", fg: "#3a0d1f" },
      { t: "emoji",  text: "💅",                 x: 84, y: 28, r: 12 },
      { t: "emoji",  text: "🍒",                 x: 22, y: 38, r: -6,  s: 0.9 },
      { t: "tag",    text: "THAT GIRL ERA",      x: 52, y: 76, r: 6,   bg: "#fff", fg: "#3a0d1f" },
    ],
  },
  {
    id: "grind",
    name: "Grind",
    kicker: "För dig som aldrig skippar passet",
    line: "Disciplin slår motivation. Varje dag.",
    bg: "#0b0a0c", fg: "#f4efe6", accent: "#d4ff3a",
    stickers: [
      { t: "word",   text: "NO DAYS OFF",   x: 5,  y: 12, r: -6, bg: "#d4ff3a", fg: "#0b0a0c" },
      { t: "pill",   text: "05:30 CLUB",    x: 66, y: 8,  r: 9,  bg: "#f4efe6", fg: "#0b0a0c" },
      { t: "seal",   text: "1% BÄTTRE · VARJE DAG · ", icon: "⚡", x: 80, y: 30, r: 8, bg: "#d4ff3a", fg: "#0b0a0c" },
      { t: "ticket", text: "ENERGI",        sub: "0 SOCKER · 100% FOKUS", x: 8, y: 64, r: 7, bg: "#f4efe6", fg: "#0b0a0c" },
      { t: "tag",    text: "LOCKED IN",     x: 64, y: 72, r: -8, bg: "#ff3b30", fg: "#fff" },
      { t: "star",   text: "PR!",           x: 42, y: 78, r: 14, bg: "#d4ff3a", fg: "#0b0a0c" },
      { t: "emoji",  text: "💪",            x: 22, y: 36, r: -10 },
      { t: "emoji",  text: "⚡",            x: 44, y: 3,  r: 10, s: 0.9 },
    ],
  },
  {
    id: "mys",
    name: "Mys",
    kicker: "För inredningsromantiker",
    line: "Levande ljus, lite pyssel och mycket kärlek.",
    bg: "#eedfc4", fg: "#4a2e1a", accent: "#b5552b",
    stickers: [
      { t: "emoji",  text: "🕯️",            x: 10, y: 12, r: -8, s: 1.1 },
      { t: "word",   text: "Hemma bäst",    x: 56, y: 9,  r: 6,  bg: "#b5552b", fg: "#fff" },
      { t: "seal",   text: "LITE MYS · SKADAR ALDRIG · ", icon: "☕", x: 6, y: 58, r: -6, bg: "#4a2e1a", fg: "#eedfc4" },
      { t: "pill",   text: "fika?",         x: 80, y: 34, r: 12, bg: "#fff", fg: "#b5552b", s: 1.2 },
      { t: "star",   text: "Ljuvligt!",     x: 72, y: 62, r: -10, bg: "#f2c14e", fg: "#4a2e1a" },
      { t: "tag",    text: "PYSSEL-PROFFS", x: 36, y: 78, r: 4,  bg: "#4a2e1a", fg: "#eedfc4" },
      { t: "emoji",  text: "🪴",            x: 24, y: 36, r: 6 },
      { t: "emoji",  text: "🧶",            x: 40, y: 4,  r: -12, s: 0.9 },
    ],
  },
  {
    id: "custom",
    name: "Din grej",
    kicker: "Allt annat",
    line: "Ladda upp vad som helst. Vi gör det till en sticker.",
    bg: "#16131a", fg: "#f4efe6", accent: "#c9a8ff", holo: true,
    stickers: [
      { t: "ghost",  text: "din bild här", x: 8,  y: 14, r: -8 },
      { t: "pill",   text: "DITT LAG",     x: 64, y: 10, r: 8,  bg: "#c9a8ff", fg: "#16131a" },
      { t: "pill",   text: "DIN KATT",     x: 80, y: 40, r: -10, bg: "#f4efe6", fg: "#16131a" },
      { t: "tag",    text: "DITT BAND",    x: 10, y: 66, r: 6,  bg: "#ff4f8b", fg: "#fff" },
      { t: "seal",   text: "DIN IDÉ · VÅRT TRYCK · ", icon: "✦", x: 70, y: 66, r: 10, bg: "#f4efe6", fg: "#16131a" },
      { t: "star",   text: "NY!",          x: 40, y: 78, r: -12, bg: "#e8ff59", fg: "#0b0a0c" },
      { t: "ghost",  text: "insidesskämt", x: 36, y: 4,  r: 6 },
    ],
  },
];

// Stickers som svävar runt rubriken högst upp.
const HERO_STICKERS = [
  { t: "seal",  text: "STICKRUF · UF 2026 · COOLA IGEN · ", icon: "✦", x: 6, y: 20, r: -8, bg: "#f4efe6", fg: "#0b0a0c", speed: 0.6 },
  { t: "pill",  text: "från 49 kr",  x: 74, y: 16, r: 9,  bg: "#e8ff59", fg: "#0b0a0c", speed: 1.2 },
  { t: "star",  text: "NY!",         x: 84, y: 60, r: -12, bg: "#ff4f8b", fg: "#fff", speed: 0.9 },
  { t: "tag",   text: "UTSKURET",    x: 10, y: 68, r: 7,  bg: "#c9a8ff", fg: "#0b0a0c", speed: 1.4 },
  { t: "emoji", text: "⚽",          x: 64, y: 72, r: 0,  s: 0.8, speed: 1.8 },
  { t: "emoji", text: "🎀",          x: 26, y: 10, r: -10, s: 0.8, speed: 1.6 },
];

const SIZE_COUNT = { s: 30, m: 12, l: 6 };
const SIZE_LABEL = { s: "Liten", m: "Mellan", l: "Stor" };
const FINISH_LABEL = { matt: "Matt", glossy: "Blank", holo: "Holo" };

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const kr = (n) => `${Math.round(n)} kr`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* =========================================================
   Sticker-renderare
   ========================================================= */
let sealId = 0;
function stickerHTML(sp, { positioned = true } = {}) {
  const style = [
    positioned ? `left:${sp.x}%;top:${sp.y}%` : "",
    `--r:${sp.r || 0}deg`, `--s:${sp.s || 1}`,
    sp.bg ? `--bg:${sp.bg}` : "", sp.fg ? `--fg:${sp.fg}` : "",
  ].filter(Boolean).join(";");
  let body;
  switch (sp.t) {
    case "seal": {
      const id = `seal${sealId++}`;
      body = `<span class="sk-b sk-seal">
        <svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="${id}" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0"/></defs>
        <text><textPath href="#${id}">${esc(sp.text)}</textPath></text></svg>
        <span class="sk-icon">${esc(sp.icon || "✦")}</span></span>`;
      break;
    }
    case "ticket":
      body = `<span class="sk-b sk-ticket"><span class="sk-ticket-in"><strong>${esc(sp.text)}</strong><small>${esc(sp.sub || "")}</small></span></span>`;
      break;
    case "star":
      body = `<span class="sk-b sk-star"><span class="sk-star-in">${esc(sp.text)}</span></span>`;
      break;
    default:
      body = `<span class="sk-b sk-${sp.t}">${esc(sp.text)}</span>`;
  }
  return `<div class="sk${positioned ? "" : " sk-static"}" style="${style}" ${sp.speed ? `data-speed="${sp.speed}"` : ""}>${body}</div>`;
}

/* ---------- Hero ---------- */
function renderHero() {
  $("#heroStickers").innerHTML = HERO_STICKERS.map((s) => stickerHTML(s)).join("");
}

/* ---------- Världar ---------- */
function renderWorlds() {
  const html = WORLDS.map((w, i) => `
    <article class="world${w.holo ? " world--holo" : ""}" data-world="${w.id}"
      style="--wbg:${w.bg};--wfg:${w.fg};--wacc:${w.accent}">
      <div class="world-stickers">${w.stickers.map((s) => stickerHTML(s)).join("")}</div>
      <div class="world-copy">
        <p class="world-kicker"><span>${String(i + 1).padStart(2, "0")}</span> ${esc(w.kicker)}</p>
        <h2 class="world-title">${esc(w.name)}</h2>
        <p class="world-line">${esc(w.line)}</p>
      </div>
    </article>`).join("");
  $("#varldar").insertAdjacentHTML("afterbegin", html);
  $("#hudTotal").textContent = String(WORLDS.length).padStart(2, "0");
}

/* ---------- Process-arket ---------- */
function renderProcess() {
  const picks = [
    WORLDS[0].stickers[1], WORLDS[1].stickers[0], WORLDS[2].stickers[2],
    WORLDS[3].stickers[1], WORLDS[0].stickers[3], WORLDS[1].stickers[1],
    WORLDS[2].stickers[4], WORLDS[3].stickers[0], WORLDS[4].stickers[4],
  ];
  // Skärlinjen läggs inuti stickern så den följer dess form
  $("#processGrid").innerHTML = picks.map((s) => {
    const html = stickerHTML({ ...s, s: 0.62, r: (s.r || 0) / 2 }, { positioned: false });
    const round = s.t === "seal" || s.t === "emoji" || s.t === "star";
    return `<div class="sheet-cell">${html.replace(/<\/div>$/, `<span class="cut-line${round ? " cut-line--round" : ""}"></span></div>`)}</div>`;
  }).join("");
}

/* =========================================================
   Toast + konfetti
   ========================================================= */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-show"), 2400);
}

function burst(x, y, items = ["✦", "★", "♥", "✦", "●"]) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#e8ff59", "#ff4f8b", "#c9a8ff", "#f4efe6", "#3dd6ff"];
  for (let i = 0; i < 14; i++) {
    const s = document.createElement("span");
    s.className = "burst";
    s.textContent = items[i % items.length];
    s.style.cssText = `left:${x}px;top:${y}px;color:${colors[i % colors.length]}`;
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
   Butik
   ========================================================= */
function renderShop() {
  $("#shopGrid").innerHTML = WORLDS.filter((w) => !w.holo).map((w) => `
    <article class="product" data-id="${w.id}" style="--wbg:${w.bg};--wfg:${w.fg};--wacc:${w.accent}">
      <div class="product-visual" data-cursor="Lägg till">
        <div class="mini-sheet">
          ${w.stickers.slice(0, 6).map((s) => `<div class="mini-cell">${stickerHTML({ ...s, s: 0.5, r: (s.r || 0) / 2 }, { positioned: false })}</div>`).join("")}
        </div>
      </div>
      <div class="product-body">
        <div class="product-top">
          <h3>${esc(w.name)}</h3>
          <span class="product-price" data-price>${kr(CONFIG.sheetPrice)}</span>
        </div>
        <p>${esc(w.kicker)}</p>
        <div class="toggle" role="group" aria-label="Skärning">
          <button type="button" class="is-active" data-cut="no">Oskuret</button>
          <button type="button" data-cut="yes">Utskuret +${CONFIG.cutExtra}</button>
        </div>
        <button class="btn btn-light btn-block add-btn" data-add="${w.id}">Lägg i korgen</button>
      </div>
    </article>`).join("");

  $("#shopGrid").addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    if (!card) return;
    const tbtn = e.target.closest(".toggle button");
    if (tbtn) {
      $$(".toggle button", card).forEach((b) => b.classList.toggle("is-active", b === tbtn));
      const cut = tbtn.dataset.cut === "yes";
      $("[data-price]", card).textContent = kr(CONFIG.sheetPrice + (cut ? CONFIG.cutExtra : 0));
      return;
    }
    const add = e.target.closest("[data-add]") || e.target.closest(".product-visual");
    if (!add) return;
    const w = WORLDS.find((x) => x.id === card.dataset.id);
    const cut = $(".toggle .is-active", card).dataset.cut === "yes";
    addToCart({
      key: `${w.id}-${cut ? "cut" : "uncut"}`, name: w.name,
      detail: cut ? "Utskuret" : "Oskuret",
      price: CONFIG.sheetPrice + (cut ? CONFIG.cutExtra : 0),
      qty: 1, bg: w.bg, icon: w.stickers.find((s) => s.t === "emoji")?.text || "✦",
    });
    const r = add.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2);
    toast(`${w.name} ligger i korgen`);
  });
}

/* =========================================================
   Varukorg (sparas i webbläsaren)
   ========================================================= */
const CART_KEY = "stickruf-cart-v2";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }
function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* privat läge – korgen funkar ändå under besöket */ }
}
const cartSheets = () => cart.reduce((n, l) => n + l.qty, 0);
const cartSubtotal = () => cart.reduce((n, l) => n + l.qty * l.price, 0);
const cartDiscount = () => (cartSheets() >= CONFIG.dealMinSheets ? (cartSubtotal() * CONFIG.dealPercent) / 100 : 0);

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
  $("#cartCount").textContent = cartSheets();
  const body = $("#cartItems");
  body.innerHTML = cart.length
    ? cart.map((l, i) => `
      <div class="line">
        <div class="line-thumb" style="--bg:${l.bg || "#c9a8ff"}">${l.thumb ? `<img src="${l.thumb}" alt="">` : esc(l.icon)}</div>
        <div class="line-info"><strong>${esc(l.name)}</strong><small>${esc(l.detail || "")} · ${kr(l.price)}/ark</small></div>
        <div class="line-qty">
          <button data-dec="${i}" aria-label="Minska">−</button><span>${l.qty}</span><button data-inc="${i}" aria-label="Öka">+</button>
        </div>
      </div>`).join("")
    : `<div class="drawer-empty"><em>Tomt här.</em><span>Dags att hitta din värld.</span></div>`;

  const discount = cartDiscount();
  $("#cartTotal").textContent = kr(cartSubtotal() - discount);
  const left = CONFIG.dealMinSheets - cartSheets();
  $("#dealHint").textContent = discount
    ? `Klass-deal aktiv: −${kr(discount)}`
    : cart.length && left > 0 ? `${left} ark till ger ${CONFIG.dealPercent} % klass-rabatt` : "";
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
    const lines = cart.map((l) => `• ${l.qty} × ${l.name}${l.detail ? ` (${l.detail})` : ""} – ${kr(l.qty * l.price)}`);
    const body = [
      "Hej Stickruf!", "", "Jag vill beställa:", ...lines, "",
      discount ? `Klass-rabatt: −${kr(discount)}` : null,
      `Leverans: ${delivery}`,
      `Totalt: ${kr(cartSubtotal() - discount + ship)}`, "",
      `Namn: ${data.get("name")}`,
      `Kontakt: ${data.get("contact")}`,
      cart.some((l) => l.custom) ? "\n(Jag bifogar mina bilder till custom-arket i det här mejlet.)" : null,
    ].filter((x) => x !== null).join("\n");
    window.location.href = `mailto:${CONFIG.orderEmail}?subject=${encodeURIComponent("Beställning – Stickruf UF")}&body=${encodeURIComponent(body)}`;
    toast("Mejlet öppnas – tryck skicka så är det klart");
  });

  renderCart();
}

/* =========================================================
   Custom-byggaren
   ========================================================= */
const builder = { images: [], size: "m", cut: "no", finish: "matt", qty: 1 };
const builderUnit = () =>
  CONFIG.customPrice + (builder.cut === "yes" ? CONFIG.cutExtra : 0) + (builder.finish === "holo" ? CONFIG.holoExtra : 0);

function renderBuilder() {
  const grid = $("#a4Grid");
  grid.className = `a4-grid size-${builder.size}${builder.cut === "yes" ? " is-cut" : ""}`;
  $("#a4").className = `sheet sheet--builder finish-${builder.finish}`;
  const n = SIZE_COUNT[builder.size];
  const ph = ["✦", "★", "♥", "●", "✿", "☾"];
  grid.innerHTML = Array.from({ length: n }, (_, i) => {
    const d = `style="animation-delay:${i * 16}ms"`;
    if (!builder.images.length) return `<div class="a4-item" ${d}><span class="a4-ph">${ph[i % ph.length]}</span></div>`;
    return `<div class="a4-item" ${d}><img src="${builder.images[i % builder.images.length].url}" alt=""></div>`;
  }).join("");

  $("#thumbs").innerHTML = builder.images.map((img, i) =>
    `<div class="thumb"><img src="${img.url}" alt="${esc(img.name)}"><button type="button" data-remove="${i}" aria-label="Ta bort ${esc(img.name)}">✕</button></div>`).join("");
  $("#customPrice").textContent = kr(builderUnit() * builder.qty);
  $("#qtyVal").textContent = builder.qty;
  $("#addCustom").disabled = !builder.images.length;
  $("#customHint").textContent = builder.images.length
    ? `${n} stickers per ark · ${builder.images.length} motiv fördelas jämnt · ${kr(builderUnit())}/ark`
    : "Ladda upp minst en bild för att fortsätta.";
}

// Liten miniatyr till korgen så den får plats i localStorage.
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
  if (room <= 0) return toast(`Max ${CONFIG.maxUploads} motiv per ark`);
  imgs.slice(0, room).forEach((f) => builder.images.push({ url: URL.createObjectURL(f), name: f.name }));
  if (imgs.length > room) toast(`Bara ${CONFIG.maxUploads} motiv får plats – resten hoppades över`);
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
  seg("#sizeSeg", "size");
  seg("#cutSeg", "cut");
  seg("#finishSeg", "finish");

  $("#qtyMinus").addEventListener("click", () => { builder.qty = Math.max(1, builder.qty - 1); renderBuilder(); });
  $("#qtyPlus").addEventListener("click", () => { builder.qty = Math.min(99, builder.qty + 1); renderBuilder(); });

  $("#addCustom").addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const thumb = await makeThumb(builder.images[0].url);
    addToCart({
      key: `custom-${Date.now()}`, name: "Custom-ark", custom: true,
      detail: `${SIZE_LABEL[builder.size]}, ${builder.cut === "yes" ? "Utskuret" : "Oskuret"}, ${FINISH_LABEL[builder.finish]}, ${builder.images.length} motiv`,
      price: builderUnit(), qty: builder.qty, thumb, icon: "✦",
    });
    const r = btn.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top);
    toast("Ditt custom-ark ligger i korgen");
  });

  renderBuilder();
}

/* ---------- Start ---------- */
renderHero();
renderWorlds();
renderProcess();
renderShop();
setupCart();
setupBuilder();
$("#year").textContent = new Date().getFullYear();
