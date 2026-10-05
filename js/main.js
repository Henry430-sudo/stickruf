/* =========================================================
   Stickruf UF – all interaktivitet
   Ändra produkter, priser och mejladress i CONFIG nedan.
   ========================================================= */

const CONFIG = {
  orderEmail: "hej@stickruf.se",   // Byt till er riktiga mejl
  customBasePrice: 79,             // kr per custom A4-ark
  holoExtra: 20,                   // tillägg för holo-finish
  shipping: 15,                    // portokostnad
  dealMinSheets: 10,               // klass-deal: antal ark...
  dealPercent: 10,                 // ...ger så här många % rabatt
  maxUploads: 6,
};

// Färdiga ark – lägg till/ta bort fritt.
const PRODUCTS = [
  { id: "kawaii",   name: "Kawaii Chaos",     price: 49, cat: "gulligt", bg: "#ffb3d1", tag: "Bästsäljare", desc: "Söta djur, mat med ansikten och massor av hjärtan.", stickers: ["🐱","🍓","🌸","🐰","🧁","💖","🐻","🍡","🌈","🦄","🍑","⭐"] },
  { id: "pixel",    name: "Pixel Pack",       price: 49, cat: "gaming",  bg: "#8b5cff", tag: "Ny",          desc: "Retrospel, kontroller och boss-energi.",              stickers: ["👾","🎮","🕹️","💾","🏆","⚔️","🛡️","💎","🔥","👑","🎯","⚡"] },
  { id: "plugg",    name: "Plugg-mode",       price: 49, cat: "skola",   bg: "#ffd23d",                     desc: "För skåpet och kollegieblocket. Överlev provveckan.", stickers: ["📚","✏️","☕","🧠","📐","💯","⏰","🎒","📝","🤓","🧪","🚀"] },
  { id: "svamp",    name: "Svampskogen",      price: 49, cat: "natur",   bg: "#7cff6b",                     desc: "Cottagecore-vibbar med svampar, grodor och mossa.",   stickers: ["🍄","🐸","🌿","🐌","🌻","🦋","🍃","🌙","🐞","🌲","🪴","🌼"] },
  { id: "space",    name: "Space Cadet",      price: 49, cat: "natur",   bg: "#3dd6ff",                     desc: "Planeter, raketer och en och annan alien.",           stickers: ["🚀","🪐","👽","🌙","⭐","☄️","🛸","🌍","🌌","👨‍🚀","🔭","✨"] },
  { id: "meme",     name: "Meme Lord",        price: 59, cat: "gaming",  bg: "#ff8a3d", tag: "Limited",     desc: "Klassiska reaktioner för alla tillfällen.",           stickers: ["💀","😭","🗿","🤡","😎","🫠","👀","🤌","💅","🙃","😤","🧢"] },
  { id: "snacks",   name: "Fika Time",        price: 49, cat: "gulligt", bg: "#ffe8c2",                     desc: "Kanelbullar, kaffe och allt som är gott.",            stickers: ["🥐","☕","🍩","🧇","🍪","🥨","🍰","🧋","🍫","🥞","🍦","🍒"] },
  { id: "sport",    name: "Lagkänsla",        price: 49, cat: "skola",   bg: "#ff3d7f",                     desc: "Bollar, pokaler och peppande energi för laget.",      stickers: ["⚽","🏀","🏐","🏒","🥇","🏆","🎽","👟","💪","🔥","📣","🏃"] },
];

const SIZE_COUNT = { s: 30, m: 12, l: 6 };
const SIZE_LABEL = { s: "Liten", m: "Mellan", l: "Stor" };
const SHAPE_LABEL = { diecut: "Konturskuren", round: "Rund", square: "Fyrkant" };
const FINISH_LABEL = { matt: "Matt", glossy: "Blank", holo: "Holo" };

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const kr = (n) => `${Math.round(n)} kr`;

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("is-show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-show"), 2200);
}

/* ---------- Konfetti av stickers ---------- */
function confetti(x, y, emojis = ["✨","⭐","💖","🌈","⚡"]) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.className = "confetti";
    s.textContent = emojis[i % emojis.length];
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    const a = Math.random() * Math.PI * 2;
    const d = 60 + Math.random() * 90;
    s.style.setProperty("--dx", `${Math.cos(a) * d}px`);
    s.style.setProperty("--dy", `${Math.sin(a) * d - 40}px`);
    s.style.setProperty("--rot", `${Math.random() * 360 - 180}deg`);
    document.body.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
}

/* =========================================================
   Produkter
   ========================================================= */
function renderProducts() {
  $("#productGrid").innerHTML = PRODUCTS.map((p) => `
    <article class="card reveal" data-cat="${p.cat}">
      <div class="card-sheet" style="--bg:${p.bg}">
        ${p.tag ? `<span class="card-tag">${p.tag}</span>` : ""}
        ${p.stickers.map((s) => `<span>${s}</span>`).join("")}
      </div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="card-foot">
          <span class="price">${kr(p.price)}</span>
          <button class="add-btn" data-add="${p.id}">+ Lägg till</button>
        </div>
      </div>
    </article>`).join("");
}

function setupFilters() {
  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $$(".chip").forEach((c) => { c.classList.remove("is-active"); c.setAttribute("aria-selected", "false"); });
    chip.classList.add("is-active");
    chip.setAttribute("aria-selected", "true");
    const f = chip.dataset.filter;
    $$(".card").forEach((card) => card.classList.toggle("is-hidden", f !== "alla" && card.dataset.cat !== f));
  }));
}

/* =========================================================
   Varukorg (sparas i webbläsaren)
   ========================================================= */
const CART_KEY = "stickruf-cart";
let cart = [];
try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }

function saveCart() {
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  catch { /* t.ex. privat läge eller fullt – korgen funkar ändå under besöket */ }
}

function cartSheets() { return cart.reduce((n, l) => n + l.qty, 0); }
function cartSubtotal() { return cart.reduce((n, l) => n + l.qty * l.price, 0); }
function cartDiscount() {
  return cartSheets() >= CONFIG.dealMinSheets ? cartSubtotal() * CONFIG.dealPercent / 100 : 0;
}

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
  if (!cart.length) {
    body.innerHTML = `<div class="drawer-empty"><span>🫙</span>Korgen är tom. Dags att klistra?</div>`;
  } else {
    body.innerHTML = cart.map((l, i) => `
      <div class="line">
        <div class="line-thumb" style="--bg:${l.bg || "var(--yellow)"}">
          ${l.thumb ? `<img src="${l.thumb}" alt="">` : l.icon}
        </div>
        <div class="line-info">
          <strong>${l.name}</strong>
          <small>${l.detail ? l.detail + " · " : ""}${kr(l.price)}/ark</small>
        </div>
        <div class="line-qty">
          <button data-dec="${i}" aria-label="Minska">−</button>
          <span>${l.qty}</span>
          <button data-inc="${i}" aria-label="Öka">+</button>
        </div>
      </div>`).join("");
  }
  const discount = cartDiscount();
  $("#cartTotal").textContent = kr(cartSubtotal() - discount);
  const left = CONFIG.dealMinSheets - cartSheets();
  $("#dealHint").textContent = discount
    ? `🎉 Klass-deal! −${kr(discount)} (${CONFIG.dealPercent}%)`
    : cart.length && left > 0 ? `Lägg till ${left} ark till för ${CONFIG.dealPercent}% klass-rabatt` : "";
  $("#orderForm").hidden = !cart.length;
}

function setupCart() {
  const drawer = $("#drawer");
  const backdrop = $("#backdrop");
  const open = () => { drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false"); backdrop.hidden = false; };
  const close = () => { drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true"); backdrop.hidden = true; };

  $("#cartBtn").addEventListener("click", open);
  $("#closeCart").addEventListener("click", close);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

  $("#cartItems").addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) cart[+inc.dataset.inc].qty++;
    if (dec) {
      const i = +dec.dataset.dec;
      if (--cart[i].qty <= 0) cart.splice(i, 1);
    }
    if (inc || dec) { saveCart(); renderCart(); }
  });

  $("#productGrid").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const p = PRODUCTS.find((x) => x.id === btn.dataset.add);
    addToCart({ key: p.id, name: p.name, price: p.price, qty: 1, icon: p.stickers[0], bg: p.bg });
    const r = btn.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top, p.stickers.slice(0, 5));
    toast(`${p.name} ligger i korgen ✓`);
  });

  $("#orderForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const delivery = data.get("delivery");
    const ship = delivery.startsWith("Post") ? CONFIG.shipping : 0;
    const lines = cart.map((l) => `• ${l.qty} × ${l.name}${l.detail ? ` (${l.detail})` : ""} – ${kr(l.qty * l.price)}`);
    const discount = cartDiscount();
    const total = cartSubtotal() - discount + ship;
    const hasCustom = cart.some((l) => l.custom);
    const body = [
      `Hej Stickruf!`, ``, `Jag vill beställa:`, ...lines, ``,
      discount ? `Klass-rabatt: −${kr(discount)}` : null,
      `Leverans: ${delivery}`,
      `Totalt: ${kr(total)}`, ``,
      `Namn: ${data.get("name")}`,
      `Kontakt: ${data.get("contact")}`,
      hasCustom ? `\n(Jag bifogar mina bilder till custom-arket i det här mejlet.)` : null,
    ].filter((x) => x !== null).join("\n");

    window.location.href =
      `mailto:${CONFIG.orderEmail}?subject=${encodeURIComponent("Beställning – Stickruf UF")}&body=${encodeURIComponent(body)}`;
    toast("Mejlet öppnas – tryck skicka så är det klart! 💌");
  });

  renderCart();
}

/* =========================================================
   Custom-byggaren
   ========================================================= */
const builder = { images: [], size: "m", shape: "diecut", finish: "matt", qty: 1 };

function customPrice() {
  return CONFIG.customBasePrice + (builder.finish === "holo" ? CONFIG.holoExtra : 0);
}

function renderPreview() {
  const grid = $("#a4Grid");
  grid.className = `a4-grid size-${builder.size} shape-${builder.shape}`;
  $("#a4").className = `a4 finish-${builder.finish}`;

  const n = SIZE_COUNT[builder.size];
  const placeholders = ["🐱", "⭐", "🍕", "🌈", "👾", "🍄"];
  grid.innerHTML = Array.from({ length: n }, (_, i) => {
    const delay = `style="animation-delay:${i * 18}ms"`;
    if (!builder.images.length) {
      return `<div class="a4-item" ${delay}><span class="a4-placeholder">${placeholders[i % placeholders.length]}</span></div>`;
    }
    const img = builder.images[i % builder.images.length];
    return `<div class="a4-item" ${delay}><img src="${img.url}" alt=""></div>`;
  }).join("");

  $("#thumbs").innerHTML = builder.images.map((img, i) => `
    <div class="thumb"><img src="${img.url}" alt="${img.name}"><button type="button" data-remove="${i}" aria-label="Ta bort ${img.name}">✕</button></div>
  `).join("");

  $("#customPrice").textContent = kr(customPrice() * builder.qty);
  $("#qtyVal").textContent = builder.qty;
  $("#addCustom").disabled = !builder.images.length;
  $("#customHint").textContent = builder.images.length
    ? `${n} stickers per ark · ${builder.images.length} motiv fördelas jämnt.`
    : "Ladda upp minst en bild för att fortsätta.";
}

// Skalar ner en bild till en liten miniatyr så korgen får plats i localStorage.
function makeThumb(url, size = 96) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      const s = Math.min(1, size / Math.max(img.width, img.height));
      c.width = Math.max(1, Math.round(img.width * s));
      c.height = Math.max(1, Math.round(img.height * s));
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
  if (!imgs.length) return toast("Det där var ingen bild 🤔");
  if (room <= 0) return toast(`Max ${CONFIG.maxUploads} bilder per ark`);
  imgs.slice(0, room).forEach((f) => builder.images.push({ url: URL.createObjectURL(f), name: f.name }));
  if (imgs.length > room) toast(`Bara ${CONFIG.maxUploads} bilder får plats – resten hoppades över`);
  renderPreview();
}

function setupBuilder() {
  const dz = $("#dropzone");
  $("#fileInput").addEventListener("change", (e) => { addFiles(e.target.files); e.target.value = ""; });
  ["dragenter", "dragover"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.add("is-over"); }));
  ["dragleave", "drop"].forEach((ev) => dz.addEventListener(ev, (e) => { e.preventDefault(); dz.classList.remove("is-over"); }));
  dz.addEventListener("drop", (e) => addFiles(e.dataTransfer.files));

  $("#thumbs").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const [removed] = builder.images.splice(+btn.dataset.remove, 1);
    URL.revokeObjectURL(removed.url);
    renderPreview();
  });

  const seg = (id, key) => $(id).addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    $$("button", $(id)).forEach((b) => b.classList.toggle("is-active", b === btn));
    builder[key] = btn.dataset[key];
    renderPreview();
  });
  seg("#sizeSeg", "size");
  seg("#shapeSeg", "shape");
  seg("#finishSeg", "finish");

  $("#qtyMinus").addEventListener("click", () => { builder.qty = Math.max(1, builder.qty - 1); renderPreview(); });
  $("#qtyPlus").addEventListener("click", () => { builder.qty = Math.min(99, builder.qty + 1); renderPreview(); });

  $("#addCustom").addEventListener("click", async (e) => {
    const thumb = await makeThumb(builder.images[0].url);
    const detail = `${SIZE_LABEL[builder.size]}, ${SHAPE_LABEL[builder.shape]}, ${FINISH_LABEL[builder.finish]}, ${builder.images.length} motiv`;
    addToCart({
      key: `custom-${Date.now()}`, name: "Custom-ark", detail, custom: true,
      price: customPrice(), qty: builder.qty, thumb, icon: "🖼️",
    });
    const r = e.target.getBoundingClientRect();
    confetti(r.left + r.width / 2, r.top);
    toast("Ditt custom-ark ligger i korgen ✓");
  });

  renderPreview();
}

/* =========================================================
   Dra runt stickers på laptopen i hero-delen
   ========================================================= */
function setupDraggableStickers() {
  const lid = $(".laptop-lid");
  $$(".stk", lid).forEach((el) => {
    el.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      el.classList.add("dragging");
      const box = lid.getBoundingClientRect();
      const start = el.getBoundingClientRect();
      const offX = e.clientX - start.left;
      const offY = e.clientY - start.top;
      const move = (ev) => {
        const x = ((ev.clientX - box.left - offX) / box.width) * 100;
        const y = ((ev.clientY - box.top - offY) / box.height) * 100;
        el.style.left = `${Math.min(90, Math.max(-5, x))}%`;
        el.style.top = `${Math.min(85, Math.max(-5, y))}%`;
      };
      const up = () => {
        el.classList.remove("dragging");
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up);
    });
  });
}

/* ---------- Scroll-animationer ---------- */
function setupReveal() {
  $$(".section-head, .step, .why-list li, .member, .faq details").forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

/* ---------- Start ---------- */
renderProducts();
setupFilters();
setupCart();
setupBuilder();
setupDraggableStickers();
setupReveal();
$("#year").textContent = new Date().getFullYear();
