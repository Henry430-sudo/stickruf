/* =========================================================
   Stickruf UF – animationer
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

  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(target, { duration: 1.6 });
  }));

  /* =========================================================
     Hero
     ========================================================= */
  const heroStickers = $$("#heroStickers .sk");
  const holo = $("#holo");

  gsap.set(".hero-title .split", { yPercent: 115 });
  gsap.set(holo, { opacity: 0, scale: 0.6, rotationY: -70, rotationZ: -12 });
  gsap.set(heroStickers, { scale: 0, rotation: -40 });
  gsap.set(".hero-foot > *, .scroll-cue", { y: 30, opacity: 0 });

  function heroIntro() {
    return gsap.timeline()
      .to(".hero-title .split", { yPercent: 0, duration: 1.3, stagger: 0.09, ease: "expo.out" })
      .to(holo, { opacity: 1, scale: 1, rotationY: 0, rotationZ: 0, duration: 1.6, ease: "expo.out" }, 0.15)
      .to(heroStickers, { scale: 1, rotation: 0, duration: 0.9, stagger: 0.07, ease: "back.out(2.4)" }, 0.5)
      .to(".hero-foot > *, .scroll-cue", { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" }, 0.6);
  }

  // Holo-kortet lutar och skimrar efter musen
  const tiltX = gsap.quickTo(holo, "rotationX", { duration: 0.9, ease: "power3" });
  const tiltY = gsap.quickTo(holo, "rotationY", { duration: 0.9, ease: "power3" });
  const setFoil = (px, py) => {
    holo.style.setProperty("--mx", `${50 + px * 60}%`);
    holo.style.setProperty("--my", `${50 + py * 60}%`);
  };
  if (finePointer) {
    $("#hero").addEventListener("pointermove", (e) => {
      const r = holo.getBoundingClientRect();
      const px = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2));
      const py = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2));
      tiltY(px * 24);
      tiltX(-py * 24);
      setFoil(px, py);
    });
    $("#hero").addEventListener("pointerleave", () => { tiltX(0); tiltY(0); setFoil(0, 0); });
  } else {
    // Touch: kortet vickar långsamt av sig självt
    const p = { v: -1 };
    gsap.to(p, {
      v: 1, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2,
      onUpdate: () => { gsap.set(holo, { rotationY: p.v * 16, rotationX: p.v * -6 }); setFoil(p.v, -p.v * 0.5); },
    });
  }

  // Parallax när man scrollar förbi hero
  const heroST = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true };
  gsap.to(".hero-title", { yPercent: 35, opacity: 0.15, ease: "none", scrollTrigger: heroST });
  gsap.to(".holo-wrap", { y: () => innerHeight * 0.35, rotation: 10, ease: "none", scrollTrigger: heroST });
  heroStickers.forEach((el) => {
    const speed = parseFloat(el.dataset.speed || 1);
    gsap.to(el, { y: -speed * innerHeight * 0.35, ease: "none", scrollTrigger: heroST });
  });

  /* ---------- Loader ---------- */
  let seen = false;
  try { seen = sessionStorage.getItem("stickruf-seen") === "1"; sessionStorage.setItem("stickruf-seen", "1"); } catch { /* ok */ }

  const done = () => { loader?.remove(); lenis?.start(); };
  if (seen || !loader) {
    done();
    heroIntro();
  } else {
    const num = $("#loaderNum");
    const count = { v: 0 };
    gsap.set(".loader-word span", { yPercent: 110 });
    gsap.timeline()
      .to(".loader-word span", { yPercent: 0, duration: 0.9, stagger: 0.05, ease: "expo.out" })
      .to(count, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { num.textContent = Math.round(count.v); } }, 0)
      .to(".loader-word span", { yPercent: -110, duration: 0.55, stagger: 0.03, ease: "expo.in" }, ">-0.05")
      .to(loader, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, ">-0.15")
      .add(heroIntro(), "<0.35")
      .add(done, "<0.5");
  }

  /* =========================================================
     Manifest – orden tänds när man scrollar
     ========================================================= */
  SplitText.create("#manifestText", {
    type: "words",
    autoSplit: true,
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
     Världar – pinnad scroll-resa
     ========================================================= */
  const worldsEl = $("#varldar");
  const worlds = $$(".world", worldsEl);
  worldsEl.classList.add("is-pinned");

  const parts = worlds.map((w) => {
    const split = SplitText.create($(".world-title", w), { type: "chars", charsClass: "char" });
    return { el: w, chars: split.chars, copy: [$(".world-kicker", w), $(".world-line", w)], stickers: $$(".sk", w) };
  });

  const slapIn = (stickers) => ({
    from: { scale: 2.6, opacity: 0, rotation: () => gsap.utils.random(-60, 60) },
    to: { scale: 1, opacity: 1, rotation: 0, stagger: 0.07, ease: "back.out(2.2)" },
  });

  // Första världen "smackas" på när sektionen kommer in i bild
  const first = parts[0];
  gsap.set(first.chars, { yPercent: 105, opacity: 0 });
  gsap.set(first.copy, { y: 24, opacity: 0 });
  gsap.set(first.stickers, slapIn().from);
  gsap.timeline({ scrollTrigger: { trigger: worldsEl, start: "top 55%", toggleActions: "play none none reverse" } })
    .to(first.chars, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.05, ease: "expo.out" })
    .to(first.copy, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 0.2)
    .to(first.stickers, { ...slapIn().to, duration: 0.6 }, 0.25);

  const STEP = 2.2;   // tidslinje-längd per värld
  const marks = [0];  // när varje värld "tar över"
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  tl.to({}, { duration: 0.6 });

  parts.slice(1).forEach((p, idx) => {
    const prev = parts[idx];
    const at = 0.6 + idx * STEP;
    marks.push(at + 0.5);

    gsap.set(p.el, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(p.chars, { yPercent: 105, opacity: 0 });
    gsap.set(p.copy, { y: 24, opacity: 0 });
    gsap.set(p.stickers, slapIn().from);

    tl.to(p.el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power3.inOut" }, at)
      .to(prev.el, { scale: 0.88, yPercent: -6, filter: "brightness(.45)", duration: 1, ease: "power3.inOut" }, at)
      .to(prev.stickers, {
        y: () => -innerHeight * gsap.utils.random(0.4, 0.9),
        rotation: () => gsap.utils.random(-90, 90),
        duration: 0.9, stagger: 0.02, ease: "power2.in",
      }, at)
      .to(p.chars, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.035, ease: "power4.out" }, at + 0.55)
      .to(p.copy, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: "power3.out" }, at + 0.75)
      .fromTo(p.stickers, slapIn().from, { ...slapIn().to, duration: 0.35 }, at + 0.8)
      .to({}, { duration: 0.6 });
  });

  const hudNum = $("#hudNum");
  const hudBar = $("#hudBar");
  ScrollTrigger.create({
    trigger: worldsEl,
    pin: true,
    start: "top top",
    end: () => `+=${innerHeight * (worlds.length - 1) * 1.15 + innerHeight * 0.4}`,
    scrub: 1,
    animation: tl,
    invalidateOnRefresh: true,
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
  ScrollTrigger.create({
    onUpdate: (self) => skewTo(gsap.utils.clamp(-10, 10, self.getVelocity() / -250)),
  });

  /* =========================================================
     Process – arket byggs upp medan man scrollar
     ========================================================= */
  const sheet = $("#processSheet");
  const cells = $$("#processGrid .sk");
  const cuts = $$("#processGrid .cut-line");
  const steps = $$(".pstep");
  const badge = $("#cutBadge");
  const hero = cells[4];
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
    .to(hero, { y: () => -sheet.offsetHeight * 0.12, x: () => sheet.offsetWidth * 0.32, scale: 2.1, rotation: -16, duration: 0.9, ease: "power2.out" }, stepAt[3])
    .to({}, { duration: 0.9 });

  ScrollTrigger.create({
    trigger: ".process",
    pin: true,
    start: "top top",
    end: () => `+=${innerHeight * 2.8}`,
    scrub: 1,
    animation: ptl,
    invalidateOnRefresh: true,
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
  rise(".price-card", ".price-grid");
  rise(".product", "#shopGrid");
  rise(".builder > *", ".builder");
  rise(".faq details", ".faq");

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
