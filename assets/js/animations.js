/* ============================================
   ANIMATIONS.JS — Scroll Reveal, Counters, Accordion, Tabs
============================================ */

(function () {
  "use strict";

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    // Immediately reveal all items in initial viewport
    items.forEach((el) => {
      el.classList.add("revealed");
    });

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "100px 0px 100px 0px" }
      );
      items.forEach((el) => io.observe(el));
    }

    // Safety fallback to guarantee visibility
    setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("revealed"));
    }, 400);
  }

  /* ---------- Stat Counters ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll(".accordion-item").forEach((item) => {
      const header = item.querySelector(".accordion-header");
      const body = item.querySelector(".accordion-body");
      if (!header || !body) return;
      header.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        item.closest(".accordion")?.querySelectorAll(".accordion-item.active").forEach((other) => {
          if (other !== item) {
            other.classList.remove("active");
            other.querySelector(".accordion-body").style.maxHeight = null;
          }
        });
        if (isActive) {
          item.classList.remove("active");
          body.style.maxHeight = null;
        } else {
          item.classList.add("active");
          body.style.maxHeight = body.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------- Tabs ---------- */
  function initTabs() {
    document.querySelectorAll("[data-tabs]").forEach((group) => {
      const buttons = group.querySelectorAll(".tab-btn");
      const panels = group.querySelectorAll(".tab-panel");
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const target = btn.dataset.tabTarget;
          buttons.forEach((b) => b.classList.remove("active"));
          panels.forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          group.querySelector(`[data-tab-panel="${target}"]`)?.classList.add("active");
        });
      });
    });
  }

  function initAllAnimations() {
    initScrollReveal();
    initCounters();
    initAccordion();
    initTabs();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAllAnimations);
  } else {
    initAllAnimations();
  }
})();
