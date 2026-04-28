/* GSAP-driven motion for the dossier.
   Runs once after React has mounted. Uses ScrollTrigger.
   Designed to layer on top of the existing IntersectionObserver `.reveal` fades —
   we disable those for elements we directly animate so they don't fight. */

(function () {
  const start = () => {
    if (!window.gsap || !window.ScrollTrigger) {
      // GSAP not loaded yet — wait one frame and retry.
      return setTimeout(start, 60);
    }
    if (!document.querySelector(".mast")) {
      return setTimeout(start, 60);
    }

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    // Disable the existing CSS-fade reveal on elements we'll animate directly,
    // so they don't double-animate or stay invisible.
    const noFade = (sel) => document.querySelectorAll(sel).forEach((el) => el.classList.remove("reveal"));

    /* ───────── 1. Hero — letter-by-letter title + stamp slam ───────── */
    const display = document.querySelector("h1.display");
    if (display) {
      // Split text manually (no SplitText plugin needed) — wrap each letter.
      const splitNode = (node) => {
        const out = [];
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split("").forEach((ch) => {
              const s = document.createElement("span");
              s.className = "g-letter";
              s.style.display = "inline-block";
              s.style.willChange = "transform, opacity";
              s.textContent = ch === " " ? "\u00a0" : ch;
              frag.appendChild(s);
              out.push(s);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.tagName === "BR") return;
            out.push(...splitNode(child));
          }
        });
        return out;
      };
      const letters = splitNode(display);

      gsap.from(letters, {
        yPercent: 110,
        opacity: 0,
        rotate: 4,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.025,
        delay: 0.15,
      });
    }

    // Eyebrow + lede + byline subtle entry
    gsap.from(".hero .eyebrow", { y: 14, opacity: 0, duration: 0.7, delay: 0.05, ease: "power2.out" });
    gsap.from(".hero .lede", { y: 12, opacity: 0, duration: 0.8, delay: 0.5, ease: "power2.out" });
    gsap.from(".hero .byline > div", { y: 10, opacity: 0, duration: 0.6, delay: 0.7, stagger: 0.06, ease: "power2.out" });
    gsap.from(".hero .id-card", { x: -24, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out" });

    // Stamp slam
    const stamp = document.querySelector(".stamp");
    if (stamp) {
      gsap.from(stamp, {
        scale: 3.2,
        rotate: 28,
        opacity: 0,
        duration: 0.55,
        delay: 1.1,
        ease: "back.out(2)",
      });
      // tiny shake after landing
      gsap.to(stamp, {
        rotate: "-=2",
        duration: 0.08,
        delay: 1.65,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
      });
    }

    /* ───────── 2. Masthead bar — counter & stagger ───────── */
    gsap.from(".mast-row > div", { y: -14, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" });
    gsap.from(".mast-bar > span", { opacity: 0, y: -6, duration: 0.5, stagger: 0.1, delay: 0.5, ease: "power2.out" });

    // Counter on the "20 weeks" line
    const counterEl = document.querySelector(".mast-bar > span:first-child");
    if (counterEl) {
      const obj = { weeks: 0, arts: 0, rfcs: 0 };
      ScrollTrigger.create({
        trigger: ".mast",
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            weeks: 20, arts: 5, rfcs: 2,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              counterEl.textContent =
                `${Math.round(obj.weeks)} weeks · ${Math.round(obj.arts)} artifacts · ${Math.round(obj.rfcs)} RFCs · 1 internship`;
            },
          });
        },
      });
    }

    /* ───────── 3. Section Roman numerals — parallax ───────── */
    noFade(".sec-head");
    document.querySelectorAll(".sec-head").forEach((head) => {
      const num = head.querySelector(".num");
      const ttl = head.querySelector(".ttl");
      const stub = head.querySelector(".stub");

      // Entry
      gsap.from(head, {
        scrollTrigger: { trigger: head, start: "top 85%", once: true },
        y: 24, opacity: 0, duration: 0.8, ease: "power2.out",
      });
      if (ttl) gsap.from(ttl.children, {
        scrollTrigger: { trigger: head, start: "top 85%", once: true },
        y: 14, opacity: 0, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "power2.out",
      });

      // Parallax the numeral
      if (num) {
        gsap.fromTo(num,
          { y: 30 },
          {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: head,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
      }
      if (stub) {
        gsap.fromTo(stub, { y: 0 }, {
          y: -16, ease: "none",
          scrollTrigger: { trigger: head, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    });

    /* ───────── 4. Crop marks — draw in on enter ───────── */
    document.querySelectorAll(".crop").forEach((sec) => {
      // Use pseudo-elements via CSS variables — animate clip-path-like via opacity + scale.
      // Easier: animate two real corner divs we inject.
      const tl = gsap.fromTo(sec, { "--crop-show": 0 }, {
        "--crop-show": 1,
        ease: "power2.out",
        duration: 0.6,
        scrollTrigger: { trigger: sec, start: "top 80%", once: true },
      });
    });

    /* ───────── 5. About cards — cascade ───────── */
    noFade(".about");
    gsap.from(".about article", {
      scrollTrigger: { trigger: ".about", start: "top 80%", once: true },
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });

    /* ───────── 6. KSA columns + bars ───────── */
    noFade(".ksa-wrap");
    gsap.from(".ksa-col", {
      scrollTrigger: { trigger: ".ksa-wrap", start: "top 80%", once: true },
      y: 24, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
    });
    // Pip bars roll on
    gsap.from(".k-item .lvl span.on", {
      scrollTrigger: { trigger: ".ksa-wrap", start: "top 75%", once: true },
      scaleX: 0, transformOrigin: "left center",
      duration: 0.5, stagger: 0.02, delay: 0.3, ease: "power2.out",
    });

    // TSC table rows
    noFade(".refs");
    gsap.from(".refs table tbody tr", {
      scrollTrigger: { trigger: ".refs", start: "top 80%", once: true },
      x: -16, opacity: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
    });

    /* ───────── 7. Artifacts — image + text from opposite sides + Ken Burns ───────── */
    noFade(".artifact-feat");
    document.querySelectorAll(".artifact-feat").forEach((piece, i) => {
      const img = piece.querySelector(".a-img");
      const body = piece.children[piece.children.length - 1]; // text column
      const fromLeftIsImg = i % 2 === 0;
      gsap.from(img, {
        scrollTrigger: { trigger: piece, start: "top 80%", once: true },
        x: fromLeftIsImg ? -50 : 50, opacity: 0, duration: 0.9, ease: "power3.out",
      });
      gsap.from(body, {
        scrollTrigger: { trigger: piece, start: "top 80%", once: true },
        x: fromLeftIsImg ? 50 : -50, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
      });
      // Ken Burns: subtle scale on image while in viewport
      if (img) {
        gsap.fromTo(img, { scale: 1.0 }, {
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: piece,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    /* ───────── 8. Timeline — axis line draws + dots pop ───────── */
    const axis = document.querySelector(".strip-axis");
    if (axis) {
      gsap.fromTo(axis, { scaleY: 0, transformOrigin: "top center" }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".strip",
          start: "top 80%",
          end: "bottom 50%",
          scrub: 0.6,
        },
      });
    }
    document.querySelectorAll(".frame").forEach((f) => {
      gsap.from(f, {
        scrollTrigger: { trigger: f, start: "top 85%", once: true },
        x: 30, opacity: 0, duration: 0.7, ease: "power3.out",
      });
      // pop the red dot (::before pseudo) — animate via CSS var
      gsap.fromTo(f, { "--dot-scale": 0 }, {
        "--dot-scale": 1, duration: 0.5, ease: "back.out(2)",
        scrollTrigger: { trigger: f, start: "top 85%", once: true },
      });
    });

    /* ───────── 9. Reflections — quote scale + acts cascade ───────── */
    noFade(".reflect-piece");
    document.querySelectorAll(".reflect-piece").forEach((piece) => {
      const quote = piece.querySelector(".quote");
      const num = piece.querySelector(".left .num");
      const acts = piece.querySelectorAll(".act");
      gsap.from(num, {
        scrollTrigger: { trigger: piece, start: "top 80%", once: true },
        y: 12, opacity: 0, duration: 0.5, ease: "power2.out",
      });
      if (quote) {
        gsap.from(quote, {
          scrollTrigger: { trigger: piece, start: "top 80%", once: true },
          y: 18, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        });
        // ::before quote mark — animate the entire quote's font-size scale via CSS var trick:
        gsap.fromTo(quote, { "--quote-scale": 0.4 }, {
          "--quote-scale": 1,
          duration: 0.9,
          ease: "back.out(2)",
          scrollTrigger: { trigger: piece, start: "top 80%", once: true },
        });
      }
      gsap.from(acts, {
        scrollTrigger: { trigger: piece, start: "top 75%", once: true },
        y: 24, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.2, ease: "power3.out",
      });
    });

    /* ───────── 10. Outlook ───────── */
    noFade(".outlook");
    gsap.from(".outlook article", {
      scrollTrigger: { trigger: ".outlook", start: "top 80%", once: true },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
    });
    gsap.from(".next-strip", {
      scrollTrigger: { trigger: ".next-strip", start: "top 85%", once: true },
      scale: 0.96, opacity: 0, duration: 0.7, ease: "power3.out",
    });

    /* ───────── 11. Colophon — letter reveal on "End of file." ───────── */
    const foot = document.querySelector(".colophon h2");
    if (foot) {
      // wrap each letter
      const wrap = (node) => {
        const out = [];
        node.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split("").forEach((ch) => {
              const s = document.createElement("span");
              s.className = "g-letter";
              s.style.display = "inline-block";
              s.textContent = ch === " " ? "\u00a0" : ch;
              frag.appendChild(s);
              out.push(s);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE) {
            out.push(...wrap(child));
          }
        });
        return out;
      };
      const letters = wrap(foot);
      gsap.from(letters, {
        scrollTrigger: { trigger: foot, start: "top 80%", once: true },
        yPercent: 110,
        opacity: 0,
        rotate: 3,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.03,
      });
    }
  };

  // Wait for React to render content first.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(start, 80));
  } else {
    setTimeout(start, 80);
  }
})();
