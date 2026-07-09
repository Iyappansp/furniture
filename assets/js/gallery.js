/* ============================================
   GALLERY.JS — Gallery Filtering, Before/After Slider
============================================ */

(function () {
  "use strict";

  /* ---------- Gallery Filter ---------- */
  function initGalleryFilter() {
    const tabs = document.querySelectorAll(".filter-tab");
    const items = document.querySelectorAll(".masonry-item");
    if (!tabs.length || !items.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.filter;
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        items.forEach((item) => {
          const match = filter === "all" || item.dataset.category === filter;
          if (match) {
            item.style.display = "";
            requestAnimationFrame(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            });
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.94)";
            setTimeout(() => {
              if (item.style.opacity === "0") item.style.display = "none";
            }, 300);
          }
        });
      });
    });

    items.forEach((item) => {
      item.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    });
  }

  /* ---------- Before/After Slider ---------- */
  function initBeforeAfter() {
    document.querySelectorAll(".before-after").forEach((container) => {
      const afterImg = container.querySelector(".ba-after");
      const handle = container.querySelector(".ba-handle");
      if (!afterImg || !handle) return;

      let dragging = false;

      function setPosition(clientX) {
        const rect = container.getBoundingClientRect();
        let x = ((clientX - rect.left) / rect.width) * 100;
        x = Math.max(0, Math.min(100, x));
        afterImg.style.clipPath = `inset(0 0 0 ${x}%)`;
        handle.style.left = `${x}%`;
      }

      container.addEventListener("mousedown", (e) => {
        dragging = true;
        setPosition(e.clientX);
      });
      window.addEventListener("mousemove", (e) => {
        if (dragging) setPosition(e.clientX);
      });
      window.addEventListener("mouseup", () => (dragging = false));

      container.addEventListener("touchstart", (e) => {
        dragging = true;
        setPosition(e.touches[0].clientX);
      });
      container.addEventListener("touchmove", (e) => {
        if (dragging) setPosition(e.touches[0].clientX);
      });
      window.addEventListener("touchend", () => (dragging = false));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initGalleryFilter();
    initBeforeAfter();
  });
})();
