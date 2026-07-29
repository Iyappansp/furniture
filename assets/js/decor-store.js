/* ============================================
   DECOR-STORE.JS — Luxury Decor Store Interactive Logic
============================================ */

(function () {
  "use strict";

  // Catalog of Decor Products
  const DECOR_PRODUCTS = [
    {
      id: "decor-1",
      title: "Riviera Dune Ceramic Table Lamp",
      category: "Lighting",
      price: 1999,
      originalPrice: null,
      rating: 4.8,
      reviews: 42,
      material: "Ceramic",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/riviera_dune_lamp.png",
      dimensions: "14\"W x 14\"D x 24\"H",
      description: "Handcrafted ceramic dune-textured table lamp featuring a warm natural linen drum shade. Brings soothing earthy elegance to living room side tables and bedside consoles."
    },
    {
      id: "decor-2",
      title: "Gardenia Mirage Set of 2 Floor Planters",
      category: "Planters",
      price: 2999,
      originalPrice: null,
      rating: 4.9,
      reviews: 58,
      material: "Metal",
      badge: "FRIENDSHIP DAY GIFT",
      badgeClass: "badge-gift",
      image: "assets/images/decor/gardenia_planters.png",
      dimensions: "Planter 1: 12\"Dia x 28\"H | Planter 2: 10\"Dia x 22\"H",
      description: "Set of 2 floor-standing planters with embossed geometric motif white pots supported on slender gold metal tripod bases."
    },
    {
      id: "decor-3",
      title: "Splendid Senorita Shizue Ceramic Floral Vase",
      category: "Vases & Ceramics",
      price: 1999,
      originalPrice: null,
      rating: 4.9,
      reviews: 35,
      material: "Ceramic",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/shizue_vase.png",
      dimensions: "9\"Dia x 15\"H",
      description: "Artisanal glazed white ceramic vase decorated with intricate hand-carved 3D cherry blossom floral accents."
    },
    {
      id: "decor-4",
      title: "Tokyo Derby Metal Floor Lamp",
      category: "Lighting",
      price: 1799,
      originalPrice: null,
      rating: 4.7,
      reviews: 29,
      material: "Iron",
      badge: "FREE SHIPPING",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/tokyo_derby_lamp.png",
      dimensions: "18\"W x 18\"D x 58\"H",
      description: "Sleek industrial black metal tripod floor lamp with warm ambient diffused illumination for contemporary living spaces."
    },
    {
      id: "decor-5",
      title: "Artistry Regalia Canvas Picture Frame ",
      category: "Wall Art",
      price: 3999,
      originalPrice: null,
      rating: 4.8,
      reviews: 64,
      material: "Canvas",
      badge: "FREE SHIPPING",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/artistry_canvas_frame.png",
      dimensions: "100cm x 60cm x 4cm",
      description: "Museum-quality gallery canvas painting featuring textured gold leaf and neutral sand palette in floating wood frame."
    },
    {
      id: "decor-6",
      title: "Cascade Beige Polyresin Buddha Fountain ",
      category: "Fountains & Sculptures",
      price: 25599,
      originalPrice: 31999,
      rating: 5.0,
      reviews: 89,
      material: "Polyresin",
      badge: "20% OFF",
      badgeClass: "badge-discount",
      image: "assets/images/decor/cascade_buddha_fountain.png",
      dimensions: "80cm x 55cm x 43cm",
      description: "Majestic indoor/outdoor water fountain with serene meditating Buddha figure, soft LED backlight, and cascading water channels."
    },
    {
      id: "decor-7",
      title: "Dhayana Polyresin Cow and Calf Figurine",
      category: "Figurines",
      price: 1099,
      originalPrice: null,
      rating: 4.8,
      reviews: 73,
      material: "Polyresin",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/dhayana_cow_figurine.png",
      dimensions: "12\"W x 6\"D x 8\"H",
      description: "Ornate traditional Kamadhenu mother cow and calf figurine with metallic gold detailing, perfect for home altars or mantel displays."
    },
    {
      id: "decor-8",
      title: "Tokyo Iron Floor Lamp with Movable Shade",
      category: "Lighting",
      price: 1299,
      originalPrice: null,
      rating: 4.6,
      reviews: 21,
      material: "Iron",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/tokyo_iron_lamp.png",
      dimensions: "14\"W x 14\"D x 56\"H",
      description: "Minimalist matte black iron reading floor lamp with 360-degree adjustable shade for targeted light directional control."
    },
    {
      id: "decor-9",
      title: "Alpine Polyresin Birds & Tiered Water Fountain",
      category: "Fountains & Sculptures",
      price: 799,
      originalPrice: 999,
      rating: 4.7,
      reviews: 45,
      material: "Polyresin",
      badge: "20% OFF",
      badgeClass: "badge-discount",
      image: "assets/images/decor/alpine_bird_fountain.png",
      dimensions: "45cm x 35cm x 65cm",
      description: "Artisanal polyresin tiered water fountain featuring detailed sculpted songbirds, soft water trickles, and serene stone finish."
    },
    {
      id: "decor-10",
      title: "Noor Serene Meditating Buddha Tea Light Holder",
      category: "Figurines",
      price: 4999,
      originalPrice: null,
      rating: 4.9,
      reviews: 52,
      material: "Polyresin",
      badge: "FREE SHIPPING",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/noor_buddha_tlight.png",
      dimensions: "18\"W x 12\"D x 24\"H",
      description: "Serene polyresin meditating Buddha statue featuring an integrated tea light candle holder to radiate warmth."
    },
    {
      id: "decor-11",
      title: "Alpine Polyresin Buddha and Lotus Fountain",
      category: "Fountains & Sculptures",
      price: 1499,
      originalPrice: 2999,
      rating: 4.9,
      reviews: 94,
      material: "Polyresin",
      badge: "50% OFF",
      badgeClass: "badge-discount",
      image: "assets/images/decor/alpine_buddha_lotus.png",
      dimensions: "25cm x 19cm",
      description: "Peaceful zen indoor water fountain with Buddha figure seated above glowing illuminated lotus bloom water basin."
    },
    {
      id: "decor-12",
      title: "Brighton Ceramic Golden Reindeer Figurine",
      category: "Figurines",
      price: 2499,
      originalPrice: null,
      rating: 4.8,
      reviews: 18,
      material: "Stoneware",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/brighton_reindeer.png",
      dimensions: "10\"W x 4\"D x 14\"H",
      description: "Handcrafted stoneware reindeer sculpture featuring metallic gold accents, ideal for console tables and holiday vignettes."
    },
    {
      id: "decor-13",
      title: "Corsica Meryl Polyresin Elephants On Ivory",
      category: "Figurines",
      price: 1799,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 81,
      material: "Polyresin",
      badge: "FREE SHIPPING • 10% OFF",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/corsica_elephants.png",
      dimensions: "16\"W x 5\"D x 9\"H",
      description: "Auspicious pair of royal elephants with raised trunks walking along ivory white pedestal, symbol of prosperity and harmony."
    },
    {
      id: "decor-14",
      title: "Alpine Lord Ganesha Polyresin Water Fountain",
      category: "Fountains & Sculptures",
      price: 2749,
      originalPrice: 5499,
      rating: 5.0,
      reviews: 112,
      material: "Polyresin",
      badge: "50% OFF",
      badgeClass: "badge-discount",
      image: "assets/images/decor/alpine_ganesha_fountain.png",
      dimensions: "30cm x 22cm x 48cm",
      description: "Divine Lord Ganesha indoor water fountain with warm LED halo illumination and soothing cascading water channels."
    },
    {
      id: "decor-15",
      title: "Enlighten Polyresin Sitting Buddha Sculpture",
      category: "Figurines",
      price: 5999,
      originalPrice: null,
      rating: 4.9,
      reviews: 40,
      material: "Polyresin",
      badge: "FREE SHIPPING",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/enlighten_sitting_buddha.png",
      dimensions: "14\"W x 10\"D x 20\"H",
      description: "Hand-painted polyresin sitting Buddha statue crafted with meditative posture to bring peace to entryway consoles."
    },
    {
      id: "decor-16",
      title: "Alpine Carnival Cascading Polyresin Fountain",
      category: "Fountains & Sculptures",
      price: 3999,
      originalPrice: 7999,
      rating: 4.9,
      reviews: 67,
      material: "Polyresin",
      badge: "50% OFF",
      badgeClass: "badge-discount",
      image: "assets/images/decor/alpine_carnival_fountain.png",
      dimensions: "35cm x 28cm x 55cm",
      description: "Multi-tiered polyresin indoor water fountain with rhythmic water flow and LED ambient lighting for relaxation."
    },
    {
      id: "decor-17",
      title: "Jessica Minimalist White Ceramic Table Lamp",
      category: "Lighting",
      price: 2999,
      originalPrice: null,
      rating: 4.7,
      reviews: 31,
      material: "Ceramic",
      badge: "FREE SHIPPING",
      badgeClass: "badge-shipping",
      image: "assets/images/decor/jessica_white_lamp.png",
      dimensions: "12\"W x 12\"D x 22\"H",
      description: "Minimalist white ceramic table lamp with sleek geometry and warm diffused linen lamp shade."
    },
    {
      id: "decor-18",
      title: "Brighton Ceramic Decorative Rabbit Figurine",
      category: "Figurines",
      price: 1299,
      originalPrice: null,
      rating: 4.8,
      reviews: 26,
      material: "Ceramic",
      badge: "",
      badgeClass: "",
      image: "assets/images/decor/brighton_rabbit.png",
      dimensions: "8\"W x 5\"D x 11\"H",
      description: "Elegant matte white ceramic bunny rabbit figurine with soft smooth glaze for modern mantel accents."
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
    "Lighting": {
      tag: "Ambient Luminescence",
      title: "Handcrafted Lamps & Pendants",
      desc: "Warm ceramic table lamps, industrial floor tripods, and alabaster desk illumination designed to cast soothing glow.",
      quote: "“Lighting shapes ambient emotion in every sanctuary room.”"
    },
    "Planters": {
      tag: "Botanical Sculptures",
      title: "Floor & Tabletop Planters",
      desc: "Metal tripod planters and embossed ceramic pots crafted to display luxury indoor greenery.",
      quote: "“Bring organic texture and natural oxygen into curated living rooms.”"
    },
    "Vases & Ceramics": {
      tag: "Artisanal Stoneware",
      title: "Hand-Glazed Ceramic Vessels",
      desc: "Intricately carved floral vases and raw stoneware vessels built for botanical arrangements.",
      quote: "“Artistic clay vessels interacting with light and florals.”"
    },
    "Wall Art": {
      tag: "Gallery Masterpieces",
      title: "Canvas Paintings & Wall Sculptures",
      desc: "Museum-quality textured gold leaf canvas paintings in solid timber floating frames.",
      quote: "“Transform plain walls into inspiring gallery accent focal points.”"
    },
    "Fountains & Sculptures": {
      tag: "Zen Hydro-Architecture",
      title: "Indoor Water Fountains & Waterfalls",
      desc: "LED-backlit polyresin water fountains with serene meditating Buddha figures and gentle cascades.",
      quote: "“Soothe senses with ambient trickling hydro-acoustics.”"
    },
    "Figurines": {
      tag: "Sacred Statuettes",
      title: "Artisanal Sculpted Statues & Figurines",
      desc: "Detailed polyresin cow-and-calf figurines, sitting Buddha statuettes, and tea light sculptures.",
      quote: "“Spiritual harmony embodied in hand-detailed sculptural accents.”"
    },
    "Rugs & Throws": {
      tag: "Tactile Soft Goods",
      title: "Hand-Woven Wool Rugs & Throws",
      desc: "Organic un-dyed wool rugs, plush linen cushion covers, and cashmere sofa throws.",
      quote: "“Layer tactile soft goods for deep sensory warmth.”"
    }
  };

  // State Variables
  let currentCategory = "All Decor";
  let searchQuery = "";
  let selectedMaterial = "All";
  let maxPrice = 35000;
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
        priceDisplay.textContent = `₹${maxPrice.toLocaleString('en-IN')}`;
        renderDecorShowcase();
      });
    }

    // Reset Button
    document.getElementById("decorResetDrawer")?.addEventListener("click", () => {
      currentCategory = "All Decor";
      searchQuery = "";
      selectedMaterial = "All";
      maxPrice = 35000;
      currentSort = "Featured";

      swatches.forEach((s) => s.classList.remove("active"));
      if (priceSlider) priceSlider.value = 35000;
      if (priceDisplay) priceDisplay.textContent = "₹35,000";
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

    container.querySelectorAll(".btn-wishlist, .wishlist-heart-btn").forEach((btn) => {
      btn.addEventListener("click", () => toggleWishlist(btn.dataset.id, btn));
    });

    container.querySelectorAll(".btn-add-bag").forEach((btn) => {
      btn.addEventListener("click", () => addToBag(btn.dataset.id));
    });
  }

  function renderGridCard(item) {
    const isWished = wishlist.has(item.id);
    const hasDiscount = item.originalPrice && item.originalPrice > item.price;
    return `
    <div class="decor-card revealed" style="opacity:1 !important; transform:none !important;" data-id="${item.id}">
      <div class="decor-card-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="decor-badge ${item.badgeClass || ''}">${item.badge}</span>` : ""}
        <button class="wishlist-heart-btn ${isWished ? "active" : ""}" data-id="${item.id}" aria-label="Add to wishlist" title="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWished ? "#E53E3E" : "none"}" stroke="${isWished ? "#E53E3E" : "currentColor"}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <div class="decor-actions-overlay">
          <button class="overlay-btn btn-quick-view" data-id="${item.id}" aria-label="Quick view item" title="Quick View">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </div>
      </div>
      <div class="decor-card-body">
        <div>
          <div class="decor-card-price-row">
            <span class="decor-price">₹${item.price.toLocaleString('en-IN')}</span>
            ${hasDiscount ? `<span class="decor-original-price">₹${item.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <h4 class="decor-card-title">${item.title}</h4>
        </div>
        <div class="decor-card-footer">
          <span class="decor-card-category">${item.category}</span>
          <button class="btn btn-primary btn-sm btn-add-bag" data-id="${item.id}">+ Add to Bag</button>
        </div>
      </div>
    </div>`;
  }

  function renderEditorialCard(item) {
    const isWished = wishlist.has(item.id);
    const hasDiscount = item.originalPrice && item.originalPrice > item.price;
    return `
    <div class="editorial-card revealed" style="opacity:1 !important; transform:none !important;" data-id="${item.id}">
      <div class="editorial-img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        ${item.badge ? `<span class="decor-badge ${item.badgeClass || ''}">${item.badge}</span>` : ""}
      </div>
      <div class="editorial-body">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <span class="decor-card-category">${item.category} • ${item.material}</span>
          <div>
            <span style="font-weight:700; font-size:1.3rem; color:var(--color-dark);">₹${item.price.toLocaleString('en-IN')}</span>
            ${hasDiscount ? `<span style="font-size:0.9rem; text-decoration:line-through; color:var(--color-text-muted); margin-left:0.4rem;">₹${item.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
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
      showToast("Added complete Riviera Dune Ensemble bundle (3 items) to your bag!");
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

    const hasDiscount = item.originalPrice && item.originalPrice > item.price;

    content.innerHTML = `
      <div class="modal-quickview-grid">
        <div>
          <img src="${item.image}" alt="${item.title}" class="quickview-img">
        </div>
        <div>
          <span style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--color-primary-dark); font-weight:600;">${item.category}</span>
          <h2 style="font-family:var(--font-display); font-size:1.6rem; margin:0.4rem 0 0.75rem 0;">${item.title}</h2>
          <div style="font-size:1.3rem; font-weight:700; color:var(--color-dark); margin-bottom:1rem;">
            ₹${item.price.toLocaleString('en-IN')}
            ${hasDiscount ? `<span style="font-size:0.95rem; text-decoration:line-through; color:var(--color-text-muted); margin-left:0.5rem;">₹${item.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
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
      if (btn.querySelector("svg")) btn.querySelector("svg").setAttribute("fill", "none");
      showToast(`Removed "${item ? item.title : "Item"}" from wishlist.`);
    } else {
      wishlist.add(id);
      btn.classList.add("active");
      if (btn.querySelector("svg")) btn.querySelector("svg").setAttribute("fill", "#E53E3E");
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
            <div style="color:var(--color-primary-dark); font-weight:700;">₹${item.price.toLocaleString('en-IN')}</div>
          </div>
          <button class="btn btn-primary btn-sm btn-add-bag" data-id="${item.id}">+ Add</button>
        </div>`).join("");

      resultContainer.querySelectorAll(".btn-add-bag").forEach((b) => {
        b.addEventListener("click", () => addToBag(b.dataset.id));
      });
    }
  }

})();
