/* ============================================
   FURNITURE-STORE.JS — Luxury Furniture Store Interactive Logic
============================================ */

(function () {
  "use strict";

  // Catalog of Furniture Products - Dedicated Dining & Kitchen Collection
  const FURNITURE_PRODUCTS = [
    {
      id: "dk-table-1",
      title: "Oakridge Handcrafted Solid Oak Dining Table",
      category: "Dining Tables & Chairs",
      price: 89999,
      originalPrice: 98000,
      rating: 5.0,
      reviews: 44,
      material: "Solid Oak",
      badge: "FEATURED",
      badgeClass: "badge-gift",
      image: "assets/images/product/dining_table_oakridge.png",
      dimensions: "84\"W x 38\"D x 30\"H",
      description: "Handcrafted solid oak dining table featuring eased soft edges, natural oil finish, and sturdy tapered timber legs."
    },
    {
      id: "dk-table-2",
      title: "Sora Solid Walnut 8-Seater Dining Table",
      category: "Dining Tables & Chairs",
      price: 115000,
      originalPrice: 130000,
      rating: 5.0,
      reviews: 31,
      material: "Walnut",
      badge: "NEW ARRIVAL",
      badgeClass: "",
      image: "assets/images/product/dining_table_walnut.png",
      dimensions: "96\"W x 40\"D x 30\"H",
      description: "Hand-finished American black walnut dining table featuring rounded bullnose edges and flared trestle legs."
    },
    {
      id: "dk-island-1",
      title: "Verdant Marble Top Kitchen Island",
      category: "Kitchen Islands",
      price: 112000,
      originalPrice: 125000,
      rating: 4.9,
      reviews: 32,
      material: "Marble",
      badge: "BESTSELLER",
      badgeClass: "badge-shipping",
      image: "assets/images/product/kitchen_island_marble.png",
      dimensions: "60\"W x 32\"D x 36\"H",
      description: "Freestanding kitchen island with Carrara marble countertop, slatted oak lower shelf, and brass towel racks."
    },
    {
      id: "dk-island-2",
      title: "Nordik Timber Prep Kitchen Island",
      category: "Kitchen Islands",
      price: 94000,
      originalPrice: 108000,
      rating: 4.8,
      reviews: 26,
      material: "Solid Oak",
      badge: "POPULAR",
      badgeClass: "",
      image: "assets/images/product/kitchen_island_timber.png",
      dimensions: "54\"W x 30\"D x 36\"H",
      description: "Solid European oak prep island with butcher block top, deep storage drawers, and brass utensil hooks."
    },
    {
      id: "dk-stool-1",
      title: "Artisan Leather & Walnut Bar Stool",
      category: "Bar Stools",
      price: 18500,
      originalPrice: 22000,
      rating: 4.8,
      reviews: 51,
      material: "Italian Leather",
      badge: "POPULAR",
      badgeClass: "",
      image: "assets/images/product/chair_woven.webp",
      dimensions: "18\"W x 18\"D x 30\"H",
      description: "Counter-height leather bar stool with solid walnut legs and hand-stitched saddle leather upholstery."
    },
    {
      id: "dk-stool-2",
      title: "Koto Counter-Height Timber Stool",
      category: "Bar Stools",
      price: 15500,
      originalPrice: null,
      rating: 4.9,
      reviews: 39,
      material: "Solid Oak",
      badge: "BESTSELLER",
      badgeClass: "badge-shipping",
      image: "assets/images/product/stool_counter.png",
      dimensions: "17\"W x 17\"D x 26\"H",
      description: "Sculptural solid oak counter stool with contoured seat and integrated footrest."
    },
    {
      id: "dk-sideboard-1",
      title: "Heritage Walnut 4-Door Sideboard",
      category: "Sideboards & Buffets",
      price: 56000,
      originalPrice: 62000,
      rating: 4.9,
      reviews: 29,
      material: "Walnut",
      badge: "NEW ARRIVAL",
      badgeClass: "",
      image: "assets/images/product/sideboard_walnut_4door.png",
      dimensions: "68\"W x 19\"D x 32\"H",
      description: "Architectural dining sideboard crafted from American walnut with fluted doors and soft-close brass hinges."
    },
    {
      id: "dk-sideboard-2",
      title: "Calacatta Gold Marble Sideboard Credenza",
      category: "Sideboards & Buffets",
      price: 128000,
      originalPrice: 145000,
      rating: 5.0,
      reviews: 28,
      material: "Marble",
      badge: "EXCLUSIVE",
      badgeClass: "badge-gift",
      image: "assets/images/product/sideboard_calacatta_marble.png",
      dimensions: "72\"W x 18\"D x 32\"H",
      description: "Luxury storage credenza featuring a top slab of polished Calacatta gold marble, fluted walnut doors, and soft-close brass hardware."
    },
    {
      id: "dk-chair-1",
      title: "Kobe Upholstered Dining Armchair",
      category: "Dining Tables & Chairs",
      price: 24500,
      originalPrice: 28000,
      rating: 4.9,
      reviews: 37,
      material: "Velvet",
      badge: "EXQUISITE",
      badgeClass: "badge-gift",
      image: "assets/images/product/armchair_kobe_dining.png",
      dimensions: "22\"W x 23\"D x 31\"H",
      description: "Ergonomic dining chair with curved back support, stain-resistant velvet fabric, and matte black steel legs."
    },
    // {
    //   id: "dk-chair-2",
    //   title: "Line Architectural Solid Timber Dining Chair",
    //   category: "Dining Tables & Chairs",
    //   price: 16500,
    //   originalPrice: null,
    //   rating: 4.9,
    //   reviews: 56,
    //   material: "Solid Oak",
    //   badge: "EASTERN EDITION",
    //   badgeClass: "badge-gift",
    //   image: "assets/images/product/chair_woven.webp",
    //   dimensions: "20\"W x 21\"D x 32\"H",
    //   description: "Architectural solid timber dining chair with black upholstered cushion seat and precision joinery."
    // },
    {
      id: "dk-bench-1",
      title: "Noom Upholstered Dining Bench",
      category: "Dining Tables & Chairs",
      price: 28000,
      originalPrice: 32000,
      rating: 4.8,
      reviews: 29,
      material: "Solid Oak",
      badge: "EASTERN EDITION",
      badgeClass: "badge-gift",
      image: "assets/images/product/bench_outdoor.webp",
      dimensions: "64\"W x 18\"D x 18\"H",
      description: "Minimalist upholstered dining bench with rounded solid timber cylinder legs and cushioned top."
    },
    {
      id: "dk-chair-3",
      title: "Eum Dark Wood T-Back Dining Chair",
      category: "Dining Tables & Chairs",
      price: 22500,
      originalPrice: null,
      rating: 4.9,
      reviews: 43,
      material: "Walnut",
      badge: "FEATURED",
      badgeClass: "badge-gift",
      image: "assets/images/product/eum_tback_chair.png",
      dimensions: "22\"W x 22\"D x 31\"H",
      description: "Sculptural dark wood dining chair featuring T-shaped backrest structure and padded cushion seat."
    },
    // {
    //   id: "dk-cart-1",
    //   title: "Nordik Brass & Smoked Glass Bar Cart",
    //   category: "Storage & Bar Carts",
    //   price: 32000,
    //   originalPrice: 36000,
    //   rating: 5.0,
    //   reviews: 18,
    //   material: "Brass",
    //   badge: "LIMITED",
    //   badgeClass: "badge-discount",
    //   image: "assets/images/product/cart_rolling.webp",
    //   dimensions: "34\"W x 18\"D x 33\"H",
    //   description: "2-tier mobile entertaining bar cart with brushed solid brass frame, tempered smoked glass shelves, and castor wheels."
    // },
    {
      id: "dk-cabinet-1",
      title: "Heritage Tall Pantry Cabinet & Wine Storage",
      category: "Storage & Bar Carts",
      price: 85000,
      originalPrice: 94000,
      rating: 4.9,
      reviews: 22,
      material: "Solid Oak",
      badge: "LUXURY",
      badgeClass: "badge-gift",
      image: "assets/images/product/cabinet_pantry.png",
      dimensions: "40\"W x 22\"D x 78\"H",
      description: "Tall kitchen and dining pantry cabinet with integrated wine rack, glass stemware holders, and soft-close oak drawers."
    }
  ];

  // State Management
  let currentCategory = "All Furniture";
  let searchQuery = "";
  let selectedMaterial = "";
  let maxPrice = 250000;
  let currentView = "grid";

  // DOM Initialization
  function initFurnitureStore() {
    initLookbookHotspots();
    initFilterDrawer();
    initCollectionTabs();
    initCategoryShowcaseCards();
    initSearchAndFilterInputs();
    initViewModeGroup();
    initModals();
    initVignetteBundle();
    renderProducts();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFurnitureStore);
  } else {
    initFurnitureStore();
  }

  // Hotspot Popovers
  function initLookbookHotspots() {
    const markers = document.querySelectorAll(".hotspot-marker");
    markers.forEach((marker) => {
      marker.addEventListener("click", (e) => {
        e.stopPropagation();
        const popoverId = marker.getAttribute("data-popover");
        const popover = document.getElementById(popoverId);

        // Close other popovers
        document.querySelectorAll(".hotspot-popover").forEach((p) => {
          if (p.id !== popoverId) p.classList.remove("active");
        });

        if (popover) {
          popover.classList.toggle("active");
        }
      });
    });

    document.querySelectorAll(".popover-close-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        btn.closest(".hotspot-popover").classList.remove("active");
      });
    });

    document.addEventListener("click", () => {
      document.querySelectorAll(".hotspot-popover").forEach((p) => p.classList.remove("active"));
    });
  }

  // Filter Drawer Accordion & Swatches
  function initFilterDrawer() {
    const toggleBtn = document.getElementById("filterDrawerToggle");
    const drawerPanel = document.getElementById("filterDrawerPanel");
    if (toggleBtn && drawerPanel) {
      toggleBtn.addEventListener("click", () => {
        drawerPanel.classList.toggle("active");
      });
    }

    const swatches = document.querySelectorAll(".furniture-material-swatch");
    swatches.forEach((swatch) => {
      swatch.addEventListener("click", () => {
        const material = swatch.getAttribute("data-material");
        if (selectedMaterial === material) {
          selectedMaterial = "";
          swatch.classList.remove("active");
        } else {
          swatches.forEach((s) => s.classList.remove("active"));
          selectedMaterial = material;
          swatch.classList.add("active");
        }
        renderProducts();
      });
    });

    const resetBtn = document.getElementById("furnitureResetDrawer");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        selectedMaterial = "";
        maxPrice = 250000;
        searchQuery = "";
        currentCategory = "All Furniture";

        swatches.forEach((s) => s.classList.remove("active"));
        const searchInput = document.getElementById("furnitureSearchInput");
        if (searchInput) searchInput.value = "";
        const priceSlider = document.getElementById("furniturePriceRange");
        if (priceSlider) priceSlider.value = 250000;
        const priceVal = document.getElementById("furniturePriceValue");
        if (priceVal) priceVal.textContent = "₹2,50,000";

        document.querySelectorAll(".furniture-collection-tabs .tab-btn").forEach((btn) => {
          btn.classList.toggle("active", btn.getAttribute("data-category") === "All Furniture");
        });

        renderProducts();
      });
    }
  }

  // Category Tabs
  function initCollectionTabs() {
    const tabs = document.querySelectorAll(".furniture-collection-tabs .tab-btn");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentCategory = tab.getAttribute("data-category");
        renderProducts();
      });
    });
  }

  // Category Showcase Cards Click Sync
  function initCategoryShowcaseCards() {
    const cards = document.querySelectorAll(".shop-cat-grid .category-showcase-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        cards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");
        const category = card.getAttribute("data-category-trigger");
        if (category) {
          currentCategory = category;
          const tabs = document.querySelectorAll(".furniture-collection-tabs .tab-btn");
          tabs.forEach((tab) => {
            if (tab.getAttribute("data-category") === category) {
              tab.classList.add("active");
            } else {
              tab.classList.remove("active");
            }
          });
          renderProducts();
          const target = document.getElementById("furnitureShowcaseSection");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  // Search & Slider Inputs
  function initSearchAndFilterInputs() {
    const searchInput = document.getElementById("furnitureSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
      });
    }

    const priceSlider = document.getElementById("furniturePriceRange");
    const priceValue = document.getElementById("furniturePriceValue");
    if (priceSlider && priceValue) {
      priceSlider.addEventListener("input", (e) => {
        maxPrice = parseInt(e.target.value, 10);
        priceValue.textContent = `₹${maxPrice.toLocaleString()}`;
        renderProducts();
      });
    }
  }

  // Grid vs Editorial View Switcher
  function initViewModeGroup() {
    const viewBtns = document.querySelectorAll("#viewModeGroup .view-btn");
    const container = document.getElementById("furnitureGridContainer");
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        viewBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentView = btn.getAttribute("data-view");

        if (container) {
          if (currentView === "editorial") {
            container.classList.add("editorial-view");
            container.classList.remove("grid-3");
          } else {
            container.classList.remove("editorial-view");
            container.classList.add("grid-3");
          }
        }
      });
    });
  }

  // Modals (Quick View & AR Spatial)
  function initModals() {
    const quickViewModal = document.getElementById("quickViewModal");
    const arPreviewModal = document.getElementById("arPreviewModal");

    document.querySelectorAll(".modal-close-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (quickViewModal) quickViewModal.classList.remove("active");
        if (arPreviewModal) arPreviewModal.classList.remove("active");
      });
    });

    if (quickViewModal) {
      quickViewModal.addEventListener("click", (e) => {
        if (e.target === quickViewModal) quickViewModal.classList.remove("active");
      });
    }
    if (arPreviewModal) {
      arPreviewModal.addEventListener("click", (e) => {
        if (e.target === arPreviewModal) arPreviewModal.classList.remove("active");
      });
    }
  }

  // Vignette Bundle
  function initVignetteBundle() {
    const bundleBtn = document.getElementById("addFurnitureBundleBtn");
    if (bundleBtn) {
      bundleBtn.addEventListener("click", () => {
        showToast("✨ The Nordik Living Suite bundle added to your cart with 20% savings!");
      });
    }
  }

  // Toast Helper
  function showToast(msg) {
    let toast = document.getElementById("decorToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "decorToast";
      toast.style.cssText = "position:fixed; bottom:24px; right:24px; background:#1C1A17; color:#FFFFFF; border:1px solid rgba(197,160,89,0.5); padding:12px 24px; border-radius:30px; box-shadow:0 12px 32px rgba(0,0,0,0.5); z-index:9999; font-size:0.9rem; font-family:var(--font-body); transition:all 0.3s ease; opacity:0; transform:translateY(20px); pointer-events:none;";
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
    }, 3500);
  }

  // Open Quick View Modal
  window.openFurnitureQuickView = function (productId) {
    const prod = FURNITURE_PRODUCTS.find((p) => p.id === productId);
    if (!prod) return;

    const modal = document.getElementById("quickViewModal");
    const body = document.getElementById("quickViewModalBody");
    if (!modal || !body) return;

    body.innerHTML = `
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem; padding:2rem;">
        <div style="border-radius:var(--radius-md); overflow:hidden; background:var(--surface-alt);">
          <img src="${prod.image}" alt="${prod.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <span style="font-size:0.8rem; text-transform:uppercase; font-weight:700; color:var(--color-primary-dark);">${prod.category}</span>
          <h2 style="font-family:var(--font-display); font-size:1.8rem; margin:0.4rem 0;">${prod.title}</h2>
          <div style="font-size:1.4rem; font-weight:700; color:var(--color-dark); margin-bottom:1rem;">
            ₹${prod.price.toLocaleString()} ${prod.originalPrice ? `<span style="font-size:0.9rem; color:var(--color-text-muted); text-decoration:line-through;">₹${prod.originalPrice.toLocaleString()}</span>` : ""}
          </div>
          <p style="color:var(--color-text-muted); font-size:0.92rem; line-height:1.6; margin-bottom:1.2rem;">${prod.description}</p>
          <div style="margin-bottom:1.5rem; font-size:0.88rem; color:var(--color-text);">
            <strong>Dimensions:</strong> ${prod.dimensions}<br>
            <strong>Primary Material:</strong> ${prod.material}<br>
            <strong>Rating:</strong> ⭐ ${prod.rating} (${prod.reviews} verified reviews)
          </div>
          <div class="quick-view-actions" style="display:flex; gap:1rem;">
            <button class="btn btn-primary" onclick="showFurnitureToast('Added ${prod.title} to Cart!')">Add to Cart</button>
            <button class="btn btn-secondary" onclick="openFurnitureAR('${prod.title}', '${prod.image}')">🥽 View in AR</button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("active");
  };

  // Open AR Modal
  window.openFurnitureAR = function (title, img) {
    const modal = document.getElementById("arPreviewModal");
    const container = document.getElementById("arPreviewBody");
    if (!modal || !container) return;

    container.innerHTML = `
      <div style="padding:2.5rem; text-align:center;">
        <div style="font-size:3rem; margin-bottom:0.5rem;">🥽</div>
        <h3 style="font-family:var(--font-display); margin-bottom:0.5rem;">3D Spatial AR View: ${title}</h3>
        <p style="color:var(--color-text-muted); max-width:480px; margin:0 auto 1.5rem;">Point your camera at a flat surface in your room to scale and place this piece in real-time AR.</p>
        <div style="max-width:360px; height:240px; margin:0 auto 1.5rem; border-radius:var(--radius-md); overflow:hidden; border:2px dashed var(--color-primary);">
          <img src="${img}" alt="${title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <button class="btn btn-primary" onclick="showFurnitureToast('AR Room Sensor initialized! Scan your room.')">Launch Camera AR Mode</button>
      </div>
    `;

    modal.classList.add("active");
  };

  window.showFurnitureToast = function (msg) {
    showToast(msg);
  };

  // Render Product Grid
  function renderProducts() {
    const container = document.getElementById("furnitureGridContainer");
    const countEl = document.getElementById("furnitureItemCount");
    if (!container) return;

    const filtered = FURNITURE_PRODUCTS.filter((item) => {
      // Category match
      if (currentCategory !== "All Furniture" && item.category !== currentCategory) {
        return false;
      }
      // Search match
      if (searchQuery) {
        const matchesTitle = item.title.toLowerCase().includes(searchQuery);
        const matchesCat = item.category.toLowerCase().includes(searchQuery);
        const matchesMat = item.material.toLowerCase().includes(searchQuery);
        if (!matchesTitle && !matchesCat && !matchesMat) return false;
      }
      // Material match
      if (selectedMaterial && item.material.toLowerCase() !== selectedMaterial.toLowerCase()) {
        return false;
      }
      // Price match
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    });

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛋️</div>
          <h3 style="font-family: var(--font-display);">No Furniture Pieces Found</h3>
          <p style="color: var(--color-text-muted);">Try resetting your filter parameters or search term.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map((prod) => `
      <div class="furniture-card revealed" style="opacity:1 !important; transform:none !important;">
        <div class="furniture-card-img-wrap">
          <img src="${prod.image}" alt="${prod.title}" loading="lazy">
          ${prod.badge ? `<span class="product-badge ${prod.badgeClass}" style="position:absolute; top:12px; left:12px; z-index:2;">${prod.badge}</span>` : ""}
          <div style="position:absolute; top:12px; right:12px; z-index:2; display:flex; flex-direction:column; gap:6px;">
            <button class="card-action-btn" onclick="openFurnitureQuickView('${prod.id}')" title="Quick View" aria-label="Quick View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <button class="card-action-btn" onclick="openFurnitureAR('${prod.title}', '${prod.image}')" title="AR Spatial View" aria-label="AR Spatial View">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </button>
          </div>
        </div>
        <div class="furniture-card-body">
          <span class="furniture-card-category">${prod.category}</span>
          <h3 class="furniture-card-title">${prod.title}</h3>
          <div class="furniture-card-footer">
            <div class="furniture-card-price">
              ₹${prod.price.toLocaleString()}
              ${prod.originalPrice ? `<span class="orig-price">₹${prod.originalPrice.toLocaleString()}</span>` : ""}
            </div>
            <button class="btn btn-primary btn-sm btn-add-cart" onclick="showFurnitureToast('Added ${prod.title} to Bag!')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> <span>Add Cart</span></button>
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("revealed"));
  }

})();
