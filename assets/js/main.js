/* ============================================
   MAIN.JS — Header/Footer Injection, Theme, RTL, Mobile Nav
============================================ */

(function () {
  "use strict";

  const ICONS = {
    sun: `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`,
    moon: `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path></svg>`,
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"></path></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>`,
    menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"></path></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1"></circle></svg>`,
    pinterest: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-3.64 19.32c-.05-.82-.09-2.08.02-2.98.1-.8.66-5.1.66-5.1s-.17-.34-.17-.83c0-.78.45-1.36 1.02-1.36.48 0 .71.36.71.79 0 .48-.31 1.2-.47 1.87-.13.56.28 1.02.83 1.02.99 0 1.76-1.05 1.76-2.56 0-1.34-.96-2.27-2.34-2.27-1.6 0-2.53 1.2-2.53 2.44 0 .48.18.99.42 1.27a.17.17 0 0 1 .04.16c-.04.19-.15.6-.17.68-.03.11-.09.14-.2.08-.75-.35-1.22-1.44-1.22-2.32 0-1.89 1.37-3.63 3.96-3.63 2.08 0 3.7 1.48 3.7 3.46 0 2.06-1.3 3.72-3.1 3.72-.61 0-1.18-.32-1.38-.69l-.37 1.43c-.14.52-.51 1.18-.76 1.58A10 10 0 1 0 12 2z"></path></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.68.3-1.4.5-2.16.6a3.8 3.8 0 0 0 1.66-2.1c-.73.44-1.53.75-2.39.92A3.75 3.75 0 0 0 12.9 8.9c0 .3.03.58.1.85A10.66 10.66 0 0 1 5.1 6.14a3.75 3.75 0 0 0 1.16 5c-.6-.02-1.18-.19-1.68-.46v.05a3.76 3.76 0 0 0 3 3.68 3.8 3.8 0 0 1-1.69.06 3.76 3.76 0 0 0 3.51 2.6 7.53 7.53 0 0 1-4.66 1.6c-.3 0-.6-.02-.9-.05A10.63 10.63 0 0 0 9.6 20.5c6.9 0 10.68-5.72 10.68-10.68l-.01-.49A7.6 7.6 0 0 0 22 5.9z"></path></svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>`,
    subscribe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>`,
    calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>`,
    up: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"></path></svg>`
  };

  const NAV_LINKS = [
    { href: "index.html", label: "Home" },
    { href: "home-2.html", label: "Home 2" },
    { href: "about.html", label: "About" },
    { href: "blog.html", label: "Blog" },
    { href: "shop.html", label: "Shop" },
    { href: "services.html", label: "Services" },
    { href: "gallery.html", label: "Gallery" },
    { href: "contact.html", label: "Contact" }
  ];

  function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function isActivePage(linkHref, activePage) {
    if (linkHref === activePage) return true;
    if (linkHref === "shop.html" && (activePage === "product-detail.html" || activePage === "room-collections.html")) {
      return true;
    }
    if (linkHref === "blog.html" && activePage === "blog-post.html") {
      return true;
    }
    return false;
  }

  function isChildActive(children, active) {
    return children.some((c) => isActivePage(c.href, active));
  }

  function buildHeader() {
    const active = currentPage();
    const navHTML = NAV_LINKS.map((l) => {
      if (l.children) {
        const childActive = isChildActive(l.children, active);
        const childHTML = l.children
          .map((c) => `<a href="${c.href}" class="dropdown-link ${isActivePage(c.href, active) ? "active" : ""}">${c.label}</a>`)
          .join("");
        return `
        <div class="nav-dropdown">
          <button class="nav-dropdown-trigger ${childActive ? "active" : ""}" aria-haspopup="true" aria-expanded="false">
            ${l.label}
            <svg class="dd-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="nav-dropdown-menu">${childHTML}</div>
        </div>`;
      }
      return `<a href="${l.href}" class="${isActivePage(l.href, active) ? "active" : ""}">${l.label}</a>`;
    }).join("");

    return `
    <div class="container header-inner">
      <a href="index.html" class="logo"><img src="assets/logo1.png" alt="VerdantWood &amp; Co. Logo"></a>
      <nav class="main-nav" aria-label="Primary navigation">${navHTML}</nav>
      <div class="header-actions">
        <button class="icon-btn rtl-toggle" id="rtlToggle" aria-label="Toggle language direction" style="font-size: 0.78rem; font-weight: 700; font-family: var(--font-button); letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center;">RTL</button>
        <button class="icon-btn theme-toggle" id="themeToggle" aria-label="Toggle dark mode">${ICONS.sun}${ICONS.moon}</button>
        <a href="login.html" class="btn btn-primary btn-sm header-cta">Login</a>
        <button class="mobile-toggle" id="mobileToggle" aria-label="Open menu">${ICONS.menu}</button>
      </div>
    </div>`;
  }

  function buildMobileNav() {
    const active = currentPage();
    const navHTML = NAV_LINKS.map((l) => {
      if (l.children) {
        const childActive = isChildActive(l.children, active);
        const childHTML = l.children
          .map((c) => `<a href="${c.href}" class="mobile-sublink ${isActivePage(c.href, active) ? "active" : ""}">${c.label}</a>`)
          .join("");
        return `
        <div class="mobile-nav-group ${childActive ? "open" : ""}">
          <button class="mobile-nav-group-trigger">
            ${l.label}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="mobile-nav-submenu">${childHTML}</div>
        </div>`;
      }
      return `<a href="${l.href}" class="${isActivePage(l.href, active) ? "active" : ""}">${l.label}</a>`;
    }).join("");
    return `
    <div class="mobile-nav-head">
      <a href="index.html" class="logo"><img src="assets/logo1.png" alt="VerdantWood &amp; Co. Logo"></a>
      <button class="icon-btn" id="mobileClose" aria-label="Close menu">${ICONS.close}</button>
    </div>
    <nav aria-label="Mobile navigation">${navHTML}</nav>
    <div class="mobile-nav-options">
      <button class="icon-btn theme-toggle" aria-label="Toggle dark mode">
        ${ICONS.sun}${ICONS.moon}
      </button>
      <button class="icon-btn rtl-toggle" aria-label="Toggle language direction" style="font-size: 0.78rem; font-weight: 700; font-family: var(--font-button); letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center;">
        RTL
      </button>
    </div>
    <div class="mobile-nav-cta">
      <a href="login.html" class="btn btn-primary btn-block">Login</a>
    </div>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    return `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="logo"><img src="assets/logo1.png" alt="VerdantWood &amp; Co. Logo"></a>
          <p>Crafting beautiful spaces, one room at a time. A premium showroom for furniture and home decor built around timeless craftsmanship.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="#" aria-label="Pinterest">${ICONS.pinterest}</a>
            <a href="#" aria-label="Twitter">${ICONS.twitter}</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="shop.html">All Products</a></li>
            <li><a href="room-collections.html">Room Collections</a></li>
            <li><a href="home-2.html">Living Room</a></li>
            <li><a href="home-2.html">Bedroom</a></li>
            <li><a href="home-2.html">Dining Room</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="blog.html">Journal</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </div>
        <div class="footer-col footer-newsletter">
          <h4>Stay Inspired</h4>
          <p>Subscribe for interior tips, new collections, and showroom events.</p>
          <form id="newsletterForm">
            <input type="email" placeholder="Your email address" required aria-label="Email address">
            <button type="submit" aria-label="Subscribe">${ICONS.subscribe}</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${year} VerdantWood &amp; Co. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </div>`;
  }

  function injectHeaderFooter() {
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");
    if (headerEl) {
      headerEl.className = "site-header";
      headerEl.innerHTML = buildHeader();
    }
    if (footerEl) {
      footerEl.className = "site-footer";
      footerEl.innerHTML = buildFooter();
    }

    // Mobile nav drawer + overlay (appended once to body)
    if (!document.querySelector(".mobile-nav")) {
      const nav = document.createElement("div");
      nav.className = "mobile-nav";
      nav.innerHTML = buildMobileNav();
      document.body.appendChild(nav);

      const overlay = document.createElement("div");
      overlay.className = "nav-overlay";
      document.body.appendChild(overlay);

      const openBtn = document.getElementById("mobileToggle");
      const closeBtn = document.getElementById("mobileClose");
      function openNav() {
        nav.classList.add("open");
        overlay.classList.add("open");
        document.body.classList.add("no-scroll");
      }
      function closeNav() {
        nav.classList.remove("open");
        overlay.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
      openBtn && openBtn.addEventListener("click", openNav);
      closeBtn && closeBtn.addEventListener("click", closeNav);
      overlay.addEventListener("click", closeNav);

      nav.querySelectorAll(".mobile-nav-group-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => {
          trigger.closest(".mobile-nav-group").classList.toggle("open");
        });
      });
    }
  }

  /* ---------- Scroll header state ---------- */
  function initHeaderScroll() {
    const header = document.getElementById("main-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Theme (Dark/Light) ---------- */
  function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("vw-theme");
    if (saved === "dark") root.setAttribute("data-theme", "dark");

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".theme-toggle");
      if (!btn) return;
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("vw-theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("vw-theme", "dark");
      }
    });
  }

  /* ---------- RTL / LTR ---------- */
  function initRTL() {
    const root = document.documentElement;
    const saved = localStorage.getItem("vw-dir");
    if (saved === "rtl") {
      root.setAttribute("dir", "rtl");
    }
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".rtl-toggle");
      if (!btn) return;
      const isRTL = root.getAttribute("dir") === "rtl";
      if (isRTL) {
        root.setAttribute("dir", "ltr");
        localStorage.setItem("vw-dir", "ltr");
      } else {
        root.setAttribute("dir", "rtl");
        localStorage.setItem("vw-dir", "rtl");
      }
    });
  }

  /* ---------- Newsletter (demo) ---------- */
  function initNewsletter() {
    document.addEventListener("submit", (e) => {
      const form = e.target.closest("#newsletterForm");
      if (!form) return;
      e.preventDefault();
      const input = form.querySelector("input");
      const btn = form.querySelector("button");
      const original = btn.innerHTML;
      btn.innerHTML = "✓";
      input.value = "";
      setTimeout(() => (btn.innerHTML = original), 2000);
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = ICONS.up;
    document.body.appendChild(btn);
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 600) btn.classList.add("show");
        else btn.classList.remove("show");
      },
      { passive: true }
    );
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const pre = document.querySelector(".preloader");
    if (!pre) return;
    window.addEventListener("load", () => {
      setTimeout(() => pre.classList.add("hidden"), 300);
    });
  }

  /* ---------- Custom cursor (desktop only) ---------- */
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 1024) return;
    const dot = document.createElement("div");
    dot.className = "custom-cursor";
    const ring = document.createElement("div");
    ring.className = "custom-cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .card-hover, [data-magnetic], .masonry-item, .img-zoom, .swatch-studio-card, .thumb-item, .hotspot-trigger")) {
        dot.classList.add("hovering");
        ring.classList.add("hovering");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .card-hover, [data-magnetic], .masonry-item, .img-zoom, .swatch-studio-card, .thumb-item, .hotspot-trigger")) {
        dot.classList.remove("hovering");
        ring.classList.remove("hovering");
      }
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (window.matchMedia("(hover: none)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectHeaderFooter();
    initHeaderScroll();
    initTheme();
    initRTL();
    initNewsletter();
    initBackToTop();
    initPreloader();
    // initCursor();
    initMagnetic();
  });
})();
