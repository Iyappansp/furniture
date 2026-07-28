/* ============================================
   DECOR-STORE.JS — Luxury Decor Store Interactive Logic
============================================ */

(function () {
  "use strict";

  // Catalog of Decor Products
  const DECOR_PRODUCTS = [
    {
      id: "decor-1",
      title: "Aura Brushed Brass Abstract Sculpture",
      category: "Sculptures",
      price: 340,
      rating: 4.9,
      reviews: 38,
      material: "Brass",
      badge: "Artisan Made",
      badgeClass: "badge-artisan",
      image: "assets/images/product/chair_lounge.png",
      dimensions: "14\"W x 8\"D x 22\"H",
      description: "Hand-sculpted liquid brass form resting on a solid black Nero Marquina marble block. Each piece is individually cast and polished to a satin luster."
    },
    {
      id: "decor-2",
      title: "Lumina Alabaster & Brass Table Lamp",
      category: "Lighting",
      price: 580,
      rating: 5.0,
      reviews: 42,
      material: "Alabaster",
      badge: "Bestseller",
      badgeClass: "",
      image: "assets/images/product/lamp_desk.webp",
      dimensions: "12\"Dia x 18\"H",
      description: "Solid Spanish alabaster stone cylinder emitting a warm translucent glow, finished with hand-brushed brass hardware and dimmable LED warm filament bulb."
    },
    {
      id: "decor-3",
      title: "Serene Organic Ribbed Ceramic Vase",
      category: "Vases & Ceramics",
      price: 195,
      rating: 4.8,
      reviews: 29,
      material: "Ceramic",
      badge: "New Arrival",
      badgeClass: "badge-new",
      image: "assets/images/product/coffee_table_halden.png",
      dimensions: "10\"Dia x 16\"H",
      description: "Coarsely textured stoneware vase with matte sand reactive glaze. Perfect for grand pampas grass arrangements or as an architectural solitary piece."
    },
    {
      id: "decor-4",
      title: "Solstice Arched Gold Framed Mirror",
      category: "Mirrors",
      price: 720,
      rating: 4.9,
      reviews: 54,
      material: "Brass",
      badge: "Signature",
      badgeClass: "badge-artisan",
      image: "assets/images/product/mirror_oak.webp",
      dimensions: "32\"W x 2\"D x 48\"H",
      description: "Hand-hammered gold leaf brass profile encasing distortion-free floating bevel glass. Designed to double light and add majestic depth."
    },
    {
      id: "decor-5",
      title: "Obsidian Travertine Sculpted Centerpiece Bowl",
      category: "Travertine & Marble",
      price: 280,
      rating: 4.7,
      reviews: 19,
      material: "Marble",
      badge: "Limited Edition",
      badgeClass: "",
      image: "assets/images/product/island_kitchen.webp",
      dimensions: "15\"Dia x 5\"H",
      description: "Carved from a solid block of Italian Silver Travertine featuring distinctive natural vein striations and hand-honed matte touch."
    },
    {
      id: "decor-6",
      title: "Elysian Hand-Blown Fluted Glass Pendant",
      category: "Lighting",
      price: 440,
      rating: 4.9,
      reviews: 31,
      material: "Glass",
      badge: "Bestseller",
      badgeClass: "",
      image: "assets/images/product/light_pendant.png",
      dimensions: "16\"Dia x 24\"H",
      description: "Mouth-blown amber smoked glass canopy with delicate fluted detailing, suspended from braided silk cord and champagne gold ceiling rose."
    },
    {
      id: "decor-7",
      title: "Nordic Cashmere & Silk Woven Throw Blanket",
      category: "Textiles",
      price: 310,
      rating: 5.0,
      reviews: 67,
      material: "Linen",
      badge: "Eco Luxury",
      badgeClass: "badge-new",
      image: "assets/images/product/bed_linen.png",
      dimensions: "50\"W x 70\"L",
      description: "Ultra-soft Mongolian cashmere blended with Mulberry silk fringe. Woven in historic Italian mills with un-dyed organic cream tones."
    },
    {
      id: "decor-8",
      title: "Zenith Trio Travertine Candle Holders",
      category: "Travertine & Marble",
      price: 210,
      rating: 4.8,
      reviews: 23,
      material: "Marble",
      badge: "Set of 3",
      badgeClass: "",
      image: "assets/images/product/sofa_amara_detail1.png",
      dimensions: "Heights: 6\", 9\", 12\"",
      description: "Architectural geometric pillars crafted from honed beige travertine, accommodating standard taper candles for dramatic dining candlelight."
    },
    {
      id: "decor-9",
      title: "Gilded Horizon Textured Canvas Wall Art",
      category: "Sculptures",
      price: 890,
      rating: 4.9,
      reviews: 16,
      material: "Brass",
      badge: "Original Art",
      badgeClass: "badge-artisan",
      image: "assets/images/product/sofa_amara_detail3.png",
      dimensions: "40\"W x 2\"D x 50\"H",
      description: "Multi-layered plaster texture on gallery-wrapped linen canvas, detailed with 24k gold leaf foil and framed in floating walnut wood casing."
    },
    {
      id: "decor-10",
      title: "Minimalist Stoneware Matte Pitcher Vase",
      category: "Vases & Ceramics",
      price: 160,
      rating: 4.6,
      reviews: 14,
      material: "Ceramic",
      badge: "Artisan Made",
      badgeClass: "badge-artisan",
      image: "assets/images/product/cart_rolling.webp",
      dimensions: "8\"Dia x 14\"H",
      description: "Sculptural single-handle pitcher handcrafted by Danish master ceramicists with raw matte exterior and glazed waterproof interior."
    },
    {
      id: "decor-11",
      title: "Bouclé & Velvet Geometric Accent Cushion",
      category: "Textiles",
      price: 135,
      rating: 4.7,
      reviews: 41,
      material: "Linen",
      badge: "Popular",
      badgeClass: "",
      image: "assets/images/product/armchair_amara.webp",
      dimensions: "20\"W x 20\"H",
      description: "Plush tactile bouclé pillow featuring contrasting mocha velvet inset panels and premium hypoallergenic goose down filler insert."
    },
    {
      id: "decor-12",
      title: "Verona Fluted Marble Vanity & Coffee Tray",
      category: "Travertine & Marble",
      price: 245,
      rating: 4.9,
      reviews: 28,
      material: "Marble",
      badge: "New Arrival",
      badgeClass: "badge-new",
      image: "assets/images/product/media_console_amara.png",
      dimensions: "16\"W x 10\"D x 2\"H",
      description: "Hand-sculpted Carrara white marble catchall tray with fluted scalloped edges. Perfect for staging perfume bottles, keys, or crystal decanters."
    }
  ];

  // Collection Spotlight Definitions
  const COLLECTION_SPOTLIGHTS = {
    "All Decor": {
      tag: "Curated Masterpieces",
      title: "Handcrafted Statement Decor",
      desc: "Architectural objects, alabaster lighting, and textured ceramics engineered to bring museum-grade elegance to everyday surfaces.",
      quote: "“Decor is not filling space; it is sculpture interacting with light.” — VerdantWood Design Studio"
    },
    "Sculptures": {
      tag: "Architectural Metalwork",
      title: "Liquid Brass & Sculpted Forms",
      desc: "Individually cast liquid brass forms resting on solid Nero Marquina marble pedestals.",
      quote: "“Bold forms that command presence on coffee tables and entryway consoles.”"
    },
    "Vases & Ceramics": {
      tag: "Tactile Stoneware",
      title: "Organic Mineral Clay Vessels",
      desc: "Coarsely textured stoneware crafted by Danish master ceramicists using natural minerals.",
      quote: "“Raw matte exteriors paired with waterproof interior glazes for wild botanicals.”"
    },
    "Lighting": {
      tag: "Luminous Alabaster",
      title: "Ambient Stone & Glass Illumination",
      desc: "Spanish alabaster cylinders emitting a soft translucent warmth with dimmable LED filaments.",
      quote: "“Transforming evening light into a serene, meditative experience.”"
    },
    "Mirrors": {
      tag: "Reflections & Depth",
      title: "Gilded Leaf Floating Glass",
      desc: "Hand-hammered gold leaf brass profiles holding distortion-free floating bevel mirror glass.",
      quote: "“Doubling natural light while anchoring dining walls.”"
    },
    "Textiles": {
      tag: "Tactile Soft Goods",
      title: "Mongolian Cashmere & Silk",
      desc: "Ultra-soft un-dyed Mongolian cashmere blended with silk fringe and textured bouclé.",
      quote: "“Tactile warmth that transforms tailored sofas into inviting retreats.”"
    },
    "Travertine & Marble": {
      tag: "Natural Stone Carvings",
      title: "Italian Silver Travertine Objects",
      desc: "Honed from solid blocks of Italian Silver Travertine featuring unique natural vein striations.",
      quote: "“Timeless mineral elegance that outlasts generations.”"
    }
  };

  // State Variables
  let currentCategory = "All Decor";
  let searchQuery = "";
  let selectedMaterial = "All";
  let maxPrice = 1000;
  let currentSort = "Featured";
  let currentViewMode = "grid"; // 'grid', 'editorial', 'vignette'
  let wishlist = new Set();
  let cartCount = 0;

  // DOM Initialization
  function initDecorStore() {
    initCollectionTabs();
    initFilterDrawer();
    initViewModes();
    initSearchAndSort();
    initHotspots();
    initQuickViewModal();
    initStyleQuizModal();
    initVignetteBundle();
    renderDecorShowcase();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDecorStore);
  } else {
    initDecorStore();
  }

  // Aesthetic Collection Tabs
  function initCollectionTabs() {
    const tabsContainer = document.getElementById("decorCollectionTabs");
    if (!tabsContainer) return;

    tabsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn");
      if (!btn) return;

      tabsContainer.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category || "All Decor";

      updateSpotlightBanner(currentCategory);
      renderDecorShowcase();
    });
  }

  function updateSpotlightBanner(cat) {
    const data = COLLECTION_SPOTLIGHTS[cat] || COLLECTION_SPOTLIGHTS["All Decor"];
    const banner = document.getElementById("decorSpotlightBanner");
    if (!banner) return;

    banner.querySelector(".spotlight-badge").textContent = data.tag;
    banner.querySelector(".spotlight-title").textContent = data.title;
    banner.querySelector(".spotlight-desc").textContent = data.desc;
    banner.querySelector(".spotlight-quote").textContent = data.quote;
  }

  // Filter Drawer Toggle
  function initFilterDrawer() {
    const toggleBtn = document.getElementById("filterDrawerToggle");
    const drawer = document.getElementById("filterDrawerPanel");
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener("click", () => {
      drawer.classList.toggle("open");
      const isOpen = drawer.classList.contains("open");
      toggleBtn.querySelector(".drawer-status").textContent = isOpen ? "Close Filters ▲" : "Filters & Options ▼";
    });

    // Material Swatches in Drawer
    const swatches = document.querySelectorAll(".decor-material-swatch");
    swatches.forEach((s) => {
      s.addEventListener("click", () => {
        swatches.forEach((sw) => sw.classList.remove("active"));
        if (selectedMaterial === s.dataset.material) {
          selectedMaterial = "All";
        } else {
          s.classList.add("active");
          selectedMaterial = s.dataset.material;
        }
        renderDecorShowcase();
      });
    });

    // Price Slider
    const priceSlider = document.getElementById("decorPriceRange");
    const priceDisplay = document.getElementById("decorPriceValue");
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener("input", (e) => {
        maxPrice = parseInt(e.target.value, 10);
        priceDisplay.textContent = `$${maxPrice}`;
        renderDecorShowcase();
      });
    }

    // Reset Button
    document.getElementById("decorResetDrawer")?.addEventListener("click", () => {
      currentCategory = "All Decor";
      searchQuery = "";
      selectedMaterial = "All";
      maxPrice = 1000;
      currentSort = "Featured";

      swatches.forEach((s) => s.classList.remove("active"));
      if (priceSlider) priceSlider.value = 1000;
      if (priceDisplay) priceDisplay.textContent = "$1000";
      const searchInput = document.getElementById("decorSearchInput");
      if (searchInput) searchInput.value = "";

      syncTabs("All Decor");
      updateSpotlightBanner("All Decor");
      renderDecorShowcase();
    });
  }

  function syncTabs(cat) {
    const tabs = document.querySelectorAll("#decorCollectionTabs .tab-btn");
    tabs.forEach((t) => {
      t.classList.toggle("active", t.dataset.category === cat);
    });
  }

  // View Mode Switcher
  function initViewModes() {
    const viewGroup = document.getElementById("viewModeGroup");
    if (!viewGroup) return;

    viewGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".view-btn");
      if (!btn) return;

      viewGroup.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentViewMode = btn.dataset.view || "grid";
      renderDecorShowcase();
    });
  }

  // Search & Sort
  function initSearchAndSort() {
    const searchInput = document.getElementById("decorSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderDecorShowcase();
      });
    }

    const sortSelect = document.getElementById("decorSortSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        currentSort = e.target.value;
        renderDecorShowcase();
      });
    }
  }

  // Hotspot Interactivity
  function initHotspots() {
    const markers = document.querySelectorAll(".hotspot-marker");
    markers.forEach((m) => {
      const targetId = m.dataset.popover;
      const popover = document.getElementById(targetId);

      m.addEventListener("click", (e) => {
        e.stopPropagation();
        document.querySelectorAll(".hotspot-popover").forEach((p) => {
          if (p !== popover) p.classList.remove("active");
        });
        if (popover) popover.classList.toggle("active");
      });
    });

    document.querySelectorAll(".popover-close-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.closest(".hotspot-popover")?.classList.remove("active");
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".hotspot-popover") && !e.target.closest(".hotspot-marker")) {
        document.querySelectorAll(".hotspot-popover").forEach((p) => p.classList.remove("active"));
      }
    });
  }

  // Main Render Engine
  function renderDecorShowcase() {
    const container = document.getElementById("decorGridContainer");
    const countDisplay = document.getElementById("decorItemCount");
    if (!container) return;

    let filtered = DECOR_PRODUCTS.filter((item) => {
      // Category
      if (currentCategory !== "All Decor" && item.category !== currentCategory) return false;

      // Search Query
      if (searchQuery) {
        const matchesTitle = item.title.toLowerCase().includes(searchQuery);
        const matchesCat = item.category.toLowerCase().includes(searchQuery);
        const matchesMat = item.material.toLowerCase().includes(searchQuery);
        if (!matchesTitle && !matchesCat && !matchesMat) return false;
      }

      // Material Swatch
      if (selectedMaterial !== "All" && item.material !== selectedMaterial) return false;

      // Price Range
      if (item.price > maxPrice) return false;

      return true;
    });

    // Sorting
    if (currentSort === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "Best Rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "Newest Arrivals") {
      filtered.reverse();
    }

    if (countDisplay) countDisplay.textContent = filtered.length;

    if (filtered.length === 0) {
      container.className = "";
      container.innerHTML = `
        <div style="text-align:center; padding: 4rem 1rem;">
          <svg style="width:48px; height:48px; color:var(--color-text-muted); margin-bottom:1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
          <h3 style="font-family:var(--font-display); font-size:1.4rem; margin-bottom:0.5rem;">No Decor Masterpieces Match Your Filter</h3>
          <p style="color:var(--color-text-muted); max-width:420px; margin:0 auto 1.5rem auto;">Try resetting your search query or adjusting your material and price bounds.</p>
          <button id="resetFromEmptyBtn" class="btn btn-secondary btn-sm">Reset All Filters</button>
        </div>`;
      document.getElementById("resetFromEmptyBtn")?.addEventListener("click", () => {
        document.getElementById("decorResetDrawer")?.click();
      });
      return;
    }

    // Render by View Mode
    if (currentViewMode === "grid") {
      container.className = "grid grid-3 stagger";
      container.innerHTML = filtered.map((item) => renderGridCard(item)).join("");
    } else if (currentViewMode === "editorial") {
      container.className = "flex flex-column gap-md";
      container.innerHTML = filtered.map((item) => renderEditorialCard(item)).join("");
    } else if (currentViewMode === "vignette") {
      container.className = "grid grid-2 stagger";
      container.innerHTML = filtered.map((item) => renderGridCard(item)).join("");
    }

    // Force reveal on dynamically inserted cards
    container.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("revealed"));

    // Attach Event Handlers
    container.querySelectorAll(".btn-quick-view").forEach((btn) => {
      btn.addEventListener("click", () => openQuickView(btn.dataset.id));
    });

    container.querySelectorAll(".btn-wishlist").forEach((btn) => {
      btn.addEventListener("click", () => toggleWishlist(btn.dataset.id, btn));
    });

    container.querySelectorAll(".btn-add-bag").forEach((btn) => {
      btn.addEventListener("click", () => addToBag(btn.dataset.id));
    });
  }

  function renderGridCard(item) {
    const isWished = wishlist.has(item.id);
    return `
    <div class="decor-card revealed" data-reveal="fade" data-id="${item.id}">
      <div class="decor-card-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="decor-badge ${item.badgeClass}">${item.badge}</span>` : ""}
        <div class="decor-actions-overlay">
          <button class="overlay-btn btn-quick-view" data-id="${item.id}" aria-label="Quick view item" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="overlay-btn btn-wishlist ${isWished ? "active" : ""}" data-id="${item.id}" aria-label="Add to wishlist" title="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWished ? "var(--color-primary)" : "none"}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
      </div>
      <div class="decor-card-body">
        <span class="decor-card-category">${item.category} • ${item.material}</span>
        <h4 class="decor-card-title">${item.title}</h4>
        <div class="decor-card-rating">
          ★ ${item.rating.toFixed(1)} <span>(${item.reviews} reviews)</span>
        </div>
        <div class="decor-card-footer">
          <span class="decor-price">$${item.price}</span>
          <button class="btn btn-primary btn-sm btn-add-bag" data-id="${item.id}">+ Add to Bag</button>
        </div>
      </div>
    </div>`;
  }

  function renderEditorialCard(item) {
    const isWished = wishlist.has(item.id);
    return `
    <div class="editorial-card revealed" data-reveal="fade" data-id="${item.id}">
      <div class="editorial-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="decor-badge ${item.badgeClass}">${item.badge}</span>` : ""}
      </div>
      <div class="editorial-body">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span class="decor-card-category">${item.category} • ${item.material}</span>
          <span style="font-weight:700; font-size:1.25rem; color:var(--color-primary-dark);">$${item.price}</span>
        </div>
        <h3 style="font-family:var(--font-display); font-size:1.35rem; margin:0.3rem 0 0.5rem 0;">${item.title}</h3>
        <p style="font-size:0.9rem; color:var(--color-text-muted); line-height:1.6; margin-bottom:1rem;">${item.description}</p>
        <div style="font-size:0.82rem; color:var(--color-text-muted); margin-bottom:1.25rem;"><strong>Dimensions:</strong> ${item.dimensions}</div>
        <div style="display:flex; gap:0.75rem;">
          <button class="btn btn-primary btn-sm btn-add-bag" data-id="${item.id}">+ Add to Bag</button>
          <button class="btn btn-secondary btn-sm btn-quick-view" data-id="${item.id}">Quick Details</button>
        </div>
      </div>
    </div>`;
  }

  // Vignette 1-Click Purchase
  function initVignetteBundle() {
    const bundleBtn = document.getElementById("addVignetteBundleBtn");
    if (!bundleBtn) return;

    bundleBtn.addEventListener("click", () => {
      cartCount += 3;
      showToast("Added complete 'Neoclassical Coffee Table Vignette' bundle (3 items) to your bag!");
    });
  }

  // Quick View Modal
  function initQuickViewModal() {
    const modal = document.getElementById("decorQuickViewModal");
    const closeBtn = document.getElementById("closeQuickViewBtn");
    if (!modal) return;

    closeBtn && closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  function openQuickView(id) {
    const item = DECOR_PRODUCTS.find((p) => p.id === id);
    const modal = document.getElementById("decorQuickViewModal");
    const content = document.getElementById("quickViewContent");
    if (!item || !modal || !content) return;

    content.innerHTML = `
      <div class="modal-quickview-grid">
        <div>
          <img src="${item.image}" alt="${item.title}" class="quickview-img">
        </div>
        <div>
          <span style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-primary-dark); font-weight:600;">${item.category}</span>
          <h2 style="font-family:var(--font-display); font-size:1.6rem; margin:0.4rem 0 0.75rem 0;">${item.title}</h2>
          <div style="font-size:1.3rem; font-weight:700; color:var(--color-dark); margin-bottom:1rem;">$${item.price}</div>
          <p style="font-size:0.92rem; color:var(--color-text-muted); line-height:1.6; margin-bottom:1.25rem;">${item.description}</p>
          
          <div style="background:var(--surface-alt); padding:1rem; border-radius:var(--radius-sm); margin-bottom:1.5rem; font-size:0.85rem;">
            <div style="margin-bottom:0.3rem;"><strong>Material:</strong> ${item.material}</div>
            <div><strong>Dimensions:</strong> ${item.dimensions}</div>
          </div>

          <div style="display:flex; gap:1rem; align-items:center;">
            <div style="display:flex; align-items:center; border:1px solid var(--color-border); border-radius:var(--radius-sm); overflow:hidden;">
              <button style="padding:0.5rem 0.8rem; background:transparent; border:none; cursor:pointer;" id="modalQtyDec">-</button>
              <span style="padding:0.5rem 0.8rem; font-weight:600;" id="modalQtyVal">1</span>
              <button style="padding:0.5rem 0.8rem; background:transparent; border:none; cursor:pointer;" id="modalQtyInc">+</button>
            </div>
            <button class="btn btn-primary" style="flex:1" id="modalAddBagBtn">+ Add to Shopping Bag</button>
          </div>
        </div>
      </div>`;

    modal.classList.add("open");

    let qty = 1;
    const qtyVal = document.getElementById("modalQtyVal");
    document.getElementById("modalQtyDec")?.addEventListener("click", () => {
      if (qty > 1) { qty--; qtyVal.textContent = qty; }
    });
    document.getElementById("modalQtyInc")?.addEventListener("click", () => {
      qty++; qtyVal.textContent = qty;
    });
    document.getElementById("modalAddBagBtn")?.addEventListener("click", () => {
      addToBag(item.id, qty);
      modal.classList.remove("open");
    });
  }

  // Wishlist & Toast Notifications
  function toggleWishlist(id, btn) {
    const item = DECOR_PRODUCTS.find((p) => p.id === id);
    if (wishlist.has(id)) {
      wishlist.delete(id);
      btn.classList.remove("active");
      btn.querySelector("svg").setAttribute("fill", "none");
      showToast(`Removed "${item ? item.title : "Item"}" from wishlist.`);
    } else {
      wishlist.add(id);
      btn.classList.add("active");
      btn.querySelector("svg").setAttribute("fill", "var(--color-primary)");
      showToast(`Saved "${item ? item.title : "Item"}" to your wishlist!`);
    }
  }

  function addToBag(id, count = 1) {
    cartCount += count;
    const item = DECOR_PRODUCTS.find((p) => p.id === id);
    showToast(`Added ${count}x "${item ? item.title : "Item"}" to your shopping bag.`);
  }

  function showToast(message) {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Decor Style Quiz Modal
  function initStyleQuizModal() {
    const quizModal = document.getElementById("decorStyleQuizModal");
    const openBtn = document.getElementById("openStyleQuizBtn");
    const closeBtn = document.getElementById("closeQuizBtn");
    if (!quizModal) return;

    openBtn && openBtn.addEventListener("click", () => {
      quizModal.classList.add("open");
      resetQuiz();
    });
    closeBtn && closeBtn.addEventListener("click", () => quizModal.classList.remove("open"));

    const optionCards = quizModal.querySelectorAll(".quiz-option-card");
    optionCards.forEach((card) => {
      card.addEventListener("click", () => {
        const parent = card.closest(".quiz-options-grid");
        parent.querySelectorAll(".quiz-option-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
      });
    });

    document.getElementById("quizNext1")?.addEventListener("click", () => switchQuizStep(1, 2));
    document.getElementById("quizNext2")?.addEventListener("click", finishQuiz);
    document.getElementById("quizSubmit")?.addEventListener("click", finishQuiz);
  }

  function resetQuiz() {
    document.querySelectorAll(".quiz-step").forEach((step, idx) => {
      step.classList.toggle("active", idx === 0);
    });
  }

  function switchQuizStep(from, to) {
    document.getElementById(`quizStep${from}`)?.classList.remove("active");
    const target = document.getElementById(`quizStep${to}`);
    if (target) target.classList.add("active");
  }

  function finishQuiz() {
    document.getElementById("quizStep2")?.classList.remove("active");
    const resultStep = document.getElementById("quizResultStep");
    if (resultStep) resultStep.classList.add("active");

    const resultContainer = document.getElementById("quizRecommendations");
    if (resultContainer) {
      const topPicks = DECOR_PRODUCTS.slice(0, 3);
      resultContainer.innerHTML = topPicks.map((item) => `
        <div style="display:flex; align-items:center; gap:1rem; background:var(--surface-alt); padding:0.85rem; border-radius:var(--radius-md);">
          <img src="${item.image}" alt="${item.title}" style="width:60px; height:60px; object-fit:cover; border-radius:var(--radius-sm);">
          <div style="flex:1">
            <h5 style="margin:0 0 0.2rem 0; font-family:var(--font-display);">${item.title}</h5>
            <div style="color:var(--color-primary-dark); font-weight:700;">$${item.price}</div>
          </div>
          <button class="btn btn-primary btn-sm btn-add-bag" data-id="${item.id}">+ Add</button>
        </div>`).join("");

      resultContainer.querySelectorAll(".btn-add-bag").forEach((b) => {
        b.addEventListener("click", () => addToBag(b.dataset.id));
      });
    }
  }

})();
