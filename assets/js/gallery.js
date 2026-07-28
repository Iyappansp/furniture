/* ============================================
   GALLERY.JS — Before/After Split Sliders & Story Filtering
============================================ */

(function () {
  "use strict";

  /* ---------- Gallery / Story Filter ---------- */
  function initGalleryFilter() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".story-card, .masonry-item");
    if (!tabs.length || !cards.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.filter;
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        cards.forEach((card) => {
          const category = card.dataset.category || "all";
          const match = filter === "all" || category === filter;

          if (match) {
            card.style.display = "";
            requestAnimationFrame(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0) scale(1)";
            });
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(12px) scale(0.96)";
            setTimeout(() => {
              if (card.style.opacity === "0") card.style.display = "none";
            }, 300);
          }
        });
      });
    });

    cards.forEach((card) => {
      card.style.transition = "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  }

  /* ---------- Interactive Before/After Split Slider ---------- */
  function initBeforeAfter() {
    document.querySelectorAll(".before-after").forEach((container) => {
      const afterImg = container.querySelector(".ba-after");
      const handle = container.querySelector(".ba-handle");
      if (!afterImg || !handle) return;

      let dragging = false;
      let currentX = 50; // default 50% split

      function setPosition(clientX) {
        const rect = container.getBoundingClientRect();
        if (!rect.width) return;
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(0, Math.min(100, x));
        currentX = x;
        // Inset right edge by (100 - x)% so 0..x% shows After image, x..100% shows Before image
        afterImg.style.clipPath = `inset(0 ${100 - x}% 0 0)`;
        handle.style.left = `${x}%`;
      }

      // Initial position
      afterImg.style.clipPath = `inset(0 50% 0 0)`;
      handle.style.left = `50%`;

      // Mouse Events
      container.addEventListener("mousedown", (e) => {
        dragging = true;
        container.classList.add("is-dragging");
        setPosition(e.clientX);
      });

      window.addEventListener("mousemove", (e) => {
        if (dragging) {
          e.preventDefault();
          setPosition(e.clientX);
        }
      });

      window.addEventListener("mouseup", () => {
        if (dragging) {
          dragging = false;
          container.classList.remove("is-dragging");
        }
      });

      // Touch Events for Mobile / Tablet
      container.addEventListener("touchstart", (e) => {
        dragging = true;
        container.classList.add("is-dragging");
        if (e.touches && e.touches[0]) {
          setPosition(e.touches[0].clientX);
        }
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (dragging && e.touches && e.touches[0]) {
          setPosition(e.touches[0].clientX);
        }
      }, { passive: true });

      window.addEventListener("touchend", () => {
        if (dragging) {
          dragging = false;
          container.classList.remove("is-dragging");
        }
      });

      // Keyboard Accessibility
      handle.setAttribute("tabindex", "0");
      handle.setAttribute("role", "slider");
      handle.setAttribute("aria-valuenow", "50");
      handle.setAttribute("aria-valuemin", "0");
      handle.setAttribute("aria-valuemax", "100");
      handle.setAttribute("aria-label", "Before and After comparison slider");

      handle.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          currentX = Math.max(0, currentX - 5);
          afterImg.style.clipPath = `inset(0 ${100 - currentX}% 0 0)`;
          handle.style.left = `${currentX}%`;
          handle.setAttribute("aria-valuenow", Math.round(currentX));
        } else if (e.key === "ArrowRight") {
          currentX = Math.min(100, currentX + 5);
          afterImg.style.clipPath = `inset(0 ${100 - currentX}% 0 0)`;
          handle.style.left = `${currentX}%`;
          handle.setAttribute("aria-valuenow", Math.round(currentX));
        }
      });
    });
  }

  /* ---------- Expandable Story Accordion / Modal Details ---------- */
  function initStoryDetails() {
    document.querySelectorAll(".story-details-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const card = btn.closest(".story-card");
        if (!card) return;
        const details = card.querySelector(".story-expanded-details");
        if (!details) return;

        const isOpen = details.classList.contains("open");
        if (isOpen) {
          details.classList.remove("open");
          btn.innerHTML = `<span>View Project Details</span> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>`;
        } else {
          details.classList.add("open");
          btn.innerHTML = `<span>Hide Project Details</span> <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>`;
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initGalleryFilter();
    initBeforeAfter();
    initStoryDetails();
  });
})();
