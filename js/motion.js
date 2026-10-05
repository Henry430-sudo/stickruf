/* =========================================================
   Stickr UF – animationer
   GSAP + ScrollTrigger + SplitText för rörelse, Lenis för mjuk scroll.
   Om användaren valt "minska rörelse" (eller biblioteken inte laddar)
   visas allt statiskt i stället.
   ========================================================= */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const loader = $("#loader");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !window.gsap || !window.ScrollTrigger || !window.SplitText) {
    loader?.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ---------- Mjuk scroll ---------- */
  let lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ lerp: 0.09 });
    window.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : id.length > 1 ? $(id) : null;
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.6 });
  });

  /* =========================================================
     Hero
     ========================================================= */
  const heroStickers = $$("#heroStickers .sk");
  const heroDeluxe = $("#heroDeluxe");

  gsap.set(".hero-title .split", { yPercent: 115 });
  gsap.set(heroDeluxe, { opacity: 0, scale: 0.7, rotationY: -60, rotationZ: -14, y: 60 });
  gsap.set(heroStickers, { scale: 0, rotation: -40 });
  gsap.set(".hero .eyebrow, .hero-lead, .hero-cta, .scroll-cue", { y: 30, opacity: 0 });

  function heroIntro() {
    return gsap.timeline()
      .to(".hero-title .split", { yPercent: 0, duration: 1.3, stagger: 0.12, ease: "expo.out" })
      .to(heroDeluxe, { opacity: 1, scale: 1, rotationY: 0, rotationZ: 4, y: 0, duration: 1.7, ease: "expo.out" }, 0.1)
      .to(heroStickers, { scale: 1, rotation: 0, duration: 0.9, stagger: 0.1, ease: "back.out(2.4)" }, 0.7)
      .to(".hero .eyebrow, .hero-lead, .hero-cta, .scroll-cue", { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.4);
  }

  // Arket lutar efter musen – laminatet glänser
  const tiltX = gsap.quickTo(heroDeluxe, "rotationX", { duration: 0.9, ease: "power3" });
  const tiltY = gsap.quickTo(heroDeluxe, "rotationY", { duration: 0.9, ease: "power3" });
  if (finePointer) {
    $("#hero").addEventListener("pointermove", (e) => {
      const r = heroDeluxe.getBoundingClientRect();
      const px = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2));
      const py = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2));
      tiltY(px * 20);
      tiltX(-py * 16);
    });
    $("#hero").addEventListener("pointerleave", () => { tiltX(0); tiltY(0); });
  } else {
    gsap.to(heroDeluxe, { rotationY: 12, rotationX: -4, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.5 });
  }

  const heroST = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero-copy", { yPercent: 25, opacity: 0.2, ease: "none", scrollTrigger: heroST });
  gsap.to(".hero-visual", { y: () => innerHeight * 0.2, rotation: 6, ease: "none", scrollTrigger: heroST });
  heroStickers.forEach((el) => {
    gsap.to(el, { y: -parseFloat(el.dataset.speed || 1) * innerHeight * 0.3, ease: "none", scrollTrigger: heroST });
  });

  /* ---------- Loader ---------- */
  let seen = false;
  try { seen = sessionStorage.getItem("stickr-seen") === "1"; sessionStorage.setItem("stickr-seen", "1"); } catch { /* ok */ }
  const done = () => { loader?.remove(); lenis?.start(); };
  if (seen || !loader) {
    done();
    heroIntro();
  } else {
    const num = $("#loaderNum");
    const count = { v: 0 };
    gsap.set(".loader-word span", { yPercent: 110 });
    gsap.timeline()
      .to(".loader-word span", { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" })
      .to(count, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { num.textContent = Math.round(count.v); } }, 0)
      .to(".loader-word span", { yPercent: -110, duration: 0.55, stagger: 0.03, ease: "expo.in" }, ">-0.05")
      .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, ">-0.15")
      .add(heroIntro(), "<0.35")
      .add(done, "<0.5");
  }

  /* ---------- Statement: orden tänds ---------- */
  SplitText.create("#manifestText", {
    type: "words", autoSplit: true,
    onSplit: (self) => gsap.fromTo(self.words, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "#manifestText", start: "top 78%", end: "bottom 45%", scrub: true },
    }),
  });

  /* ---------- Rubriker glider upp rad för rad ---------- */
  $$(".reveal-title").forEach((el) => SplitText.create(el, {
    type: "lines", mask: "lines", autoSplit: true,
    onSplit: (self) => gsap.from(self.lines, {
      yPercent: 110, duration: 1.2, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    }),
  }));

  /* =========================================================
     Användningsområden – horisontell scroll, stickern klistras på
     ========================================================= */
  const uses = $("#anvand");
  const track = $("#usesTrack");
  uses.classList.add("is-horizontal");
  const useEls = $$(".use", track);
  const slide = gsap.to(track, {
    x: () => -(track.scrollWidth - innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: uses, pin: true, start: "top top", scrub: 1, invalidateOnRefresh: true,
      end: () => `+=${track.scrollWidth - innerWidth}`,
    },
  });
  useEls.forEach((u, i) => {
    const d = $(".deluxe", u);
    const copy = $$(".use-copy > *", u);
    const tl = gsap.timeline({
      scrollTrigger: i === 0
        ? { trigger: uses, start: "top 60%", toggleActions: "play none none reverse" }
        : { trigger: u, containerAnimation: slide, start: "left 70%", toggleActions: "play none none reverse" },
    });
    tl.from(d, { scale: 1.5, rotation: -18, y: -40, opacity: 0, duration: 0.9, ease: "back.out(1.6)" })
      .from(copy, { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: "expo.out" }, 0.15);
  });

  /* =========================================================
     Världar – pinnad scroll-resa
     ========================================================= */
  const worldsEl = $("#varldar");
  const worlds = $$(".world", worldsEl);
  worldsEl.classList.add("is-pinned");

  const parts = worlds.map((w) => {
    const split = SplitText.create($(".world-title", w), { type: "chars", charsClass: "char" });
    return {
      el: w, chars: split.chars,
      copy: [$(".world-kicker", w), $(".world-line", w)],
      deluxe: $(".world-deluxe", w),
      stickers: $$(".world-stickers .sk", w),
    };
  });
  const slapFrom = { scale: 2.6, opacity: 0, rotation: () => gsap.utils.random(-60, 60) };
  const slapTo = { scale: 1, opacity: 1, rotation: 0, stagger: 0.07, ease: "back.out(2.2)" };
  const deluxeFrom = { yPercent: 60, rotation: -25, opacity: 0, scale: 0.8 };
  const deluxeTo = { yPercent: 0, rotation: 4, opacity: 1, scale: 1, ease: "back.out(1.4)" };

  const first = parts[0];
  gsap.set(first.chars, { yPercent: 105, opacity: 0 });
  gsap.set(first.copy, { y: 24, opacity: 0 });
  gsap.set(first.stickers, slapFrom);
  gsap.set(first.deluxe, deluxeFrom);
  gsap.timeline({ scrollTrigger: { trigger: worldsEl, start: "top 55%", toggleActions: "play none none reverse" } })
    .to(first.chars, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "expo.out" })
    .to(first.copy, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 0.2)
    .to(first.deluxe, { ...deluxeTo, duration: 1.1 }, 0.1)
    .to(first.stickers, { ...slapTo, duration: 0.6 }, 0.4);

  const STEP = 2.2;
  const marks = [0];
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  tl.to({}, { duration: 0.6 });

  parts.slice(1).forEach((p, idx) => {
    const prev = parts[idx];
    const at = 0.6 + idx * STEP;
    marks.push(at + 0.5);
    gsap.set(p.el, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(p.chars, { yPercent: 105, opacity: 0 });
    gsap.set(p.copy, { y: 24, opacity: 0 });
    gsap.set(p.stickers, slapFrom);
    gsap.set(p.deluxe, deluxeFrom);

    tl.to(p.el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" }, at)
      .to(prev.el, { scale: 0.88, yPercent: -6, filter: "brightness(.45)", duration: 1, ease: "power3.inOut" }, at)
      .to([...prev.stickers, prev.deluxe], {
        y: () => -innerHeight * gsap.utils.random(0.4, 0.9),
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.9, stagger: 0.02, ease: "power2.in",
      }, at)
      .to(p.chars, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.035, ease: "power4.out" }, at + 0.55)
      .to(p.copy, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }, at + 0.75)
      .to(p.deluxe, { ...deluxeTo, duration: 0.6 }, at + 0.6)
      .fromTo(p.stickers, slapFrom, { ...slapTo, duration: 0.35 }, at + 0.85)
      .to({}, { duration: 0.6 });
  });

  const hudNum = $("#hudNum");
  const hudBar = $("#hudBar");
  ScrollTrigger.create({
    trigger: worldsEl, pin: true, start: "top top", scrub: 1, animation: tl, invalidateOnRefresh: true,
    end: () => `+=${innerHeight * (worlds.length - 1) * 1.15 + innerHeight * 0.4}`,
    onUpdate: (self) => {
      // Läs av scroll-positionen (inte tidslinjen, som släpar pga scrub)
      const t = self.progress * tl.duration();
      let i = 0;
      marks.forEach((m, k) => { if (t >= m) i = k; });
      hudNum.textContent = String(i + 1).padStart(2, "0");
      hudBar.style.transform = `scaleX(${self.progress})`;
    },
  });

  /* ---------- Marquee lutar med scroll-farten ---------- */
  const skewTo = gsap.quickTo("#marquee", "skewX", { duration: 0.5, ease: "power3" });
  ScrollTrigger.create({ onUpdate: (self) => skewTo(gsap.utils.clamp(-10, 10, self.getVelocity() / -250)) });

  /* =========================================================
     Process (Sheets) – arket byggs upp
     ========================================================= */
  const sheet = $("#processSheet");
  const cells = $$("#processGrid .sk");
  const cuts = $$("#processGrid .cut-line");
  const steps = $$(".pstep");
  const badge = $("#cutBadge");
  const lift = cells[4];
  $(".process").classList.add("is-pinned");

  gsap.set(sheet, { rotationX: 35, rotationZ: -10, y: 80, scale: 0.85, transformPerspective: 1400 });
  gsap.set(".sheet-shine", { "--shine": "-100%" });
  gsap.set(cells, { scale: 0, opacity: 0, rotation: -50 });
  gsap.set(badge, { scale: 0.4 });

  const stepAt = [0, 1.7, 3.0, 4.3];
  const ptl = gsap.timeline({ defaults: { ease: "none" } })
    .to(sheet, { rotationX: 0, rotationZ: -3, y: 0, scale: 1, duration: 1.1, ease: "power3.out" }, 0)
    .to(cells, { scale: 1, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.08, ease: "back.out(2)" }, 0.25)
    .to(sheet, { rotationY: -14, rotationZ: 2, duration: 1.1, ease: "power2.inOut" }, stepAt[1])
    .to(".sheet-shine", { "--shine": "100%", duration: 1.1, ease: "power2.inOut" }, stepAt[1])
    .to(sheet, { rotationY: 0, rotationZ: -2, duration: 0.8, ease: "power2.inOut" }, stepAt[2])
    .fromTo(cuts, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "power3.out" }, stepAt[2])
    .to(badge, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, stepAt[2] + 0.4)
    .to(cuts[4], { opacity: 0, duration: 0.2 }, stepAt[3])
    .to(lift, { y: () => -sheet.offsetHeight * 0.12, x: () => sheet.offsetWidth * 0.32, scale: 2.1, rotation: -16, duration: 0.9, ease: "power2.out" }, stepAt[3])
    .to({}, { duration: 0.9 });

  ScrollTrigger.create({
    trigger: ".process", pin: true, start: "top top", scrub: 1, animation: ptl, invalidateOnRefresh: true,
    end: () => `+=${innerHeight * 2.8}`,
    onUpdate: (self) => {
      const t = self.progress * ptl.duration();
      let active = 0;
      stepAt.forEach((s, i) => { if (t >= s) active = i; });
      steps.forEach((el, i) => el.classList.toggle("is-active", i === active));
    },
  });

  /* ---------- Kort och listor glider in ---------- */
  const rise = (targets, trigger) => gsap.from(targets, {
    y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out",
    scrollTrigger: { trigger, start: "top 82%" },
  });
  rise(".pricing .price-card", ".pricing .price-grid");
  rise("#bizGrid .price-card", "#bizGrid");
  rise(".facts > div", ".facts");
  rise(".builder > *", ".builder");
  rise(".faq details", ".faq");
  rise(".countdown > div", ".countdown");
  gsap.from("#bizDeluxe", { yPercent: 40, rotation: -20, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#bizDeluxe", start: "top 85%" } });

  // Butiken renderas om när man byter flik – animera korten varje gång
  const animateShop = () => gsap.from("#shopGrid .product", { y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" });
  ScrollTrigger.create({ trigger: "#shopGrid", start: "top 82%", once: true, onEnter: animateShop });
  $("#shopTabs").addEventListener("click", () => requestAnimationFrame(animateShop));

  /* ---------- Drop-rubriken ---------- */
  const dropSplit = SplitText.create(".drop-title", { type: "chars", charsClass: "char" });
  gsap.from(dropSplit.chars, {
    yPercent: 100, opacity: 0, rotation: () => gsap.utils.random(-25, 25), stagger: 0.05, duration: 1.1, ease: "expo.out",
    scrollTrigger: { trigger: ".drop", start: "top 70%" },
  });

  /* ---------- Jättelogga i footern ---------- */
  const footerSplit = SplitText.create("#footerWord", { type: "chars", charsClass: "char" });
  gsap.from(footerSplit.chars, {
    yPercent: 80, rotation: () => gsap.utils.random(-20, 20), opacity: 0, stagger: 0.05, ease: "power3.out",
    scrollTrigger: { trigger: ".site-footer", start: "top 90%", end: "bottom bottom", scrub: 1 },
  });

  /* =========================================================
     Custom-cursor + magnetiska knappar (bara med mus)
     ========================================================= */
  if (finePointer) {
    document.documentElement.classList.add("has-cursor");
    const cursor = $("#cursor");
    const label = $("#cursorLabel");
    const cx = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });
    addEventListener("pointermove", (e) => { cx(e.clientX); cy(e.clientY); });
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor]");
      cursor.classList.toggle("is-big", !!t);
      if (t) label.textContent = t.dataset.cursor;
    });
    $$(".magnetic").forEach((el) => {
      const mx = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, .4)" });
      const my = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, .4)" });
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        mx((e.clientX - r.left - r.width / 2) * 0.3);
        my((e.clientY - r.top - r.height / 2) * 0.3);
      });
      el.addEventListener("pointerleave", () => { mx(0); my(0); });
    });
  }

  document.fonts?.ready.then(() => ScrollTrigger.refresh());
})();
