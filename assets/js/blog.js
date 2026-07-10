/* ============================================
   BLOG.JS — Blog Category Filtering & Pagination
   ============================================ */

(function () {
  "use strict";

  const ITEMS_PER_PAGE = 6;
  let currentPage = 1;
  let activeFilter = "all";

  function initBlogFilterAndPagination() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll(".blog-card");
    const featuredSection = document.querySelector(".featured-post-section");
    const paginationContainer = document.querySelector(".pagination");

    if (!tabs.length || !cards.length) return;

    // Set transition styles on cards
    cards.forEach((card) => {
      card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    });

    if (featuredSection) {
      featuredSection.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    }

    function getFilteredCards() {
      if (activeFilter === "all") {
        return Array.from(cards);
      }
      return Array.from(cards).filter(
        (card) => card.dataset.category === activeFilter
      );
    }

    function render() {
      const filtered = getFilteredCards();
      const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

      // Adjust current page if needed
      if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
      }

      // Hide or show featured post section smoothly
      if (featuredSection) {
        if (activeFilter === "all" || activeFilter === "styling") {
          featuredSection.style.display = "";
          requestAnimationFrame(() => {
            featuredSection.style.opacity = "1";
            featuredSection.style.transform = "translateY(0)";
          });
        } else {
          featuredSection.style.opacity = "0";
          featuredSection.style.transform = "translateY(-15px)";
          setTimeout(() => {
            if (featuredSection.style.opacity === "0") {
              featuredSection.style.display = "none";
            }
          }, 400);
        }
      }

      // Hide or show cards with page chunks
      const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIdx = startIdx + ITEMS_PER_PAGE;

      cards.forEach((card) => {
        const isMatched = filtered.includes(card);
        const cardIndex = filtered.indexOf(card);
        const isInCurrentPage = cardIndex >= startIdx && cardIndex < endIdx;

        if (isMatched && isInCurrentPage) {
          card.style.display = "";
          requestAnimationFrame(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          });
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.94)";
          setTimeout(() => {
            if (card.style.opacity === "0") {
              card.style.display = "none";
            }
          }, 350);
        }
      });

      // Update Pagination Buttons
      updatePaginationButtons(totalPages);
    }

    function updatePaginationButtons(totalPages) {
      if (!paginationContainer) return;

      if (totalPages <= 1) {
        paginationContainer.style.display = "none";
        return;
      }

      paginationContainer.style.display = "flex";
      paginationContainer.innerHTML = "";

      // Prev Button
      const prevBtn = document.createElement("button");
      prevBtn.className = `page-btn ${currentPage === 1 ? "disabled" : ""}`;
      prevBtn.setAttribute("aria-label", "Previous page");
      prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>`;
      if (currentPage > 1) {
        prevBtn.addEventListener("click", () => {
          currentPage--;
          render();
          scrollToGrid();
        });
      }
      paginationContainer.appendChild(prevBtn);

      // Page Numbers
      for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.className = `page-btn ${i === currentPage ? "active" : ""}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener("click", () => {
          currentPage = i;
          render();
          scrollToGrid();
        });
        paginationContainer.appendChild(pageBtn);
      }

      // Next Button
      const nextBtn = document.createElement("button");
      nextBtn.className = `page-btn ${currentPage === totalPages ? "disabled" : ""}`;
      nextBtn.setAttribute("aria-label", "Next page");
      nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>`;
      if (currentPage < totalPages) {
        nextBtn.addEventListener("click", () => {
          currentPage++;
          render();
          scrollToGrid();
        });
      }
      paginationContainer.appendChild(nextBtn);
    }

    function scrollToGrid() {
      const sortBar = document.querySelector(".sort-bar");
      if (sortBar) {
        sortBar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Tab clicks
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const filter = tab.dataset.filter;
        if (!filter) return;

        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        activeFilter = filter;
        currentPage = 1;
        render();
      });
    });

    // Initial render
    render();
  }

  const ARTICLE_DB = {
    "styling-textures": {
      title: "How to Layer Textures in a Living Room Without Overdoing It",
      tag: "Styling Guide",
      readTime: "8 min read",
      date: "June 14, 2026",
      img: "assets/images/blog/blog_featured.png",
      content: `
        <p>Texture is the difference between a room that looks styled and one that looks staged. When every surface in a living room shares the same finish — all matte, all smooth, all one material — the space reads as flat, no matter how expensive the furniture is. The fix isn't more pieces. It's more contrast.</p>
        <h3>Start With Your Anchor Material</h3>
        <p>Every layered room needs one dominant material to anchor the palette — usually your largest piece of furniture. In most living rooms, that's the sofa frame or the coffee table. Walnut and oak both work well as anchors because their warmth reads as neutral, letting every other texture play off it rather than compete with it.</p>
        <h3>Add Two Contrasting Textures, Not Five</h3>
        <p>Once your anchor is set, choose exactly two additional textures to layer against it — one soft, one hard. A linen throw and a stone side table. A woven rug and a metal lamp base. Two is enough to create depth; five starts to look like a showroom that's trying too hard.</p>
        <h3>Let Negative Space Do Some of the Work</h3>
        <p>Texture needs room to read. A heavily layered corner surrounded by empty wall space will feel intentional. The same corner crowded by furniture on every side will feel cluttered, regardless of how good each individual piece is.</p>
        <h3>A Simple Three-Step Checklist</h3>
        <ul>
          <li>Pick one anchor material for your largest piece</li>
          <li>Add exactly two contrasting textures — one soft, one hard</li>
          <li>Leave visible breathing room around the layered area</li>
        </ul>
      `
    },
    "01": {
      title: "How to Care for Solid Wood Furniture Year-Round",
      tag: "Care Guide",
      readTime: "5 min read",
      date: "May 28, 2026",
      img: "assets/images/blog/blog_thumbnail_01.png",
      content: `
        <p>Solid wood is a living material. Unlike synthetic laminates or wood veneers on particle board, solid oak, walnut, or cherry expand and contract as temperature and humidity change. Understanding this natural cycle is the secret to ensuring your heirloom-quality furniture remains beautiful for generations.</p>
        <h3>Managing the Climate: Humidity is Everything</h3>
        <p>The greatest threat to solid wood furniture isn't spills or scratches — it's air dryness. During winter months, indoor heating dries out the air, causing wood to lose moisture and shrink. In the summer, high humidity causes wood to absorb moisture and swell. Keeping your indoor relative humidity between 35% and 45% is ideal for preventing warping.</p>
        <h3>Daily Cleaning: Simple, Safe and Gentle</h3>
        <p>Avoid commercial aerosol sprays, silicone cleaners, and ammonia-based formulas. Silicone can leave a sticky film that attracts dust, while ammonia strips natural finishes. For daily dusting, use a clean, dry, lint-free microfiber cloth. If a sticky spill occurs, use a soft cloth dampened with warm water and a tiny drop of mild soap, wiping in the direction of the grain.</p>
        <h3>Year-Round Solid Wood Care Checklist</h3>
        <ul>
          <li>Use a humidifier in winter and an air conditioner/dehumidifier in summer to balance relative humidity.</li>
          <li>Keep wood pieces out of direct sunlight to prevent UV bleaching and uneven drying.</li>
          <li>Never place wood furniture directly in front of heating vents, fireplaces, or radiators.</li>
          <li>Always use coasters, trivets, and felt pads under mugs and heavy decor items.</li>
        </ul>
      `
    },
    "02": {
      title: "Oak vs. Walnut: Which Wood Fits Your Home?",
      tag: "Materials",
      readTime: "6 min read",
      date: "May 19, 2026",
      img: "assets/images/blog/blog_thumbnail_02.png",
      content: `
        <p>When selecting luxury hardwood furniture, the choice often boils down to two heavyweight contenders: Oak and Walnut. Both represent top-tier durability and class, yet they convey completely different aesthetic feelings and fit different rooms in the house.</p>
        <h3>Oak: The Robust, Bright Anchor</h3>
        <p>Oak (specifically American White Oak, which we use extensively) is prized for its high density, heavy weight, and open grain pattern. With a Janka hardness rating of 1,360, oak is exceptionally resistant to scratches, dents, and daily wear. It features beautiful straight lines and natural highlights across the grain that feel grounded and airy. Oak works wonderfully in coastal, Scandinavian, and neoclassical spaces designed to capture natural light.</p>
        <h3>Walnut: The Rich, Artistic Showpiece</h3>
        <p>Black Walnut is the darling of mid-century modern and moody neoclassical designs. Slightly softer than oak (Janka rating around 1,010), it is still highly durable and offers supreme dimensional stability. What walnut lacks in sheer hardness, it more than makes up for in depth of color and character. Its wood grain is flowing, swirling, and filled with rich chocolate undertones, cream-colored sapwood streaks, and deep charcoal voids.</p>
        <h3>Quick Selection Guidelines</h3>
        <ul>
          <li><strong>Choose Oak</strong> if the furniture will face heavy duty use (like a family dining table or high-traffic hallway console) or if you want to keep the room feeling bright and spacious.</li>
          <li><strong>Choose Walnut</strong> if you are looking for an executive desk, library bookshelves, or a formal statement piece designed to add drama and warmth.</li>
        </ul>
      `
    },
    "03": {
      title: "5 Living Room Layouts That Work in Small Spaces",
      tag: "Styling",
      readTime: "7 min read",
      date: "May 6, 2026",
      img: "assets/images/blog/blog_thumbnail_03.png",
      content: `
        <p>Styling a compact living room doesn't mean purchasing miniature, uncomfortable furniture. Rather, it is about arranging premium, statement pieces in configurations that optimize walking paths and visual flow. Here are 5 layout concepts tested by our showroom stylists.</p>
        <h3>1. The Float & Breathe Layout</h3>
        <p>The natural instinct in a small room is to push all furniture flush against the walls. However, this highlights the room's limits. Instead, pull your sofa forward by just 6 to 12 inches. Pushing a slim wooden console behind it creates a shelf for lamps and books, while immediately making the walls feel further away.</p>
        <h3>2. The Soft-Curved Nest</h3>
        <p>Sharp corners restrict movement. Replacing a rectangular sofa and coffee table with soft, curved silhouettes (like our bouclé Amara collection) creates easier pathways. A round coffee table allows people to glide by without bumping knees, and the curved back of a sofa acts as an organic room divider.</p>
        <h3>3. The Diagonal Pivot</h3>
        <p>When you orient furniture diagonally (say at a 45-degree angle to the room's longest wall), the eye is guided across the longest distance of the room. This makes the space feel larger and creates interesting negative-space wedges behind chairs.</p>
      `
    },
    "04": {
      title: "The Interior Color Palettes Defining 2026",
      tag: "Trends",
      readTime: "4 min read",
      date: "April 22, 2026",
      img: "assets/images/blog/blog_thumbnail_04.png",
      content: `
        <p>For years, interior design was dominated by sterile whites, cool grays, and black steel accents. But 2026 marks a dramatic, permanent shift toward warmth, tactile comfort, and organic mineral pigments. The modern luxury home feels less like an art gallery and more like a warm sanctuary.</p>
        <h3>The Warm Earth Base</h3>
        <p>Sterile white walls are being repainted in soft parchment, raw linen, plaster pink, and light oatmeal. These neutral tones contain yellow and red undertones that capture sunbeams beautifully. To pair with this, designers are utilizing terracotta tiles, walnut wood tones, and sand-colored fabrics to anchor seating zones.</p>
        <h3>Mineral Accents Replace Solid Black</h3>
        <p>Instead of high-contrast black metal trim, we are seeing deep mineral hues: sage, muted olive green, slate gray, and dark navy. These colors feel soft on the eyes and establish a connection to natural landscapes. A single accent wall or an upholstered lounge chair in olive green adds depth without jarring the visual peace of the room.</p>
        <h3>Metallic Warmth: Champagne and Brass</h3>
        <p>Chrome and polished nickel are stepping aside for metals that glow: brushed brass, satin copper, and champagne gold. We integrate these metals directly into our furniture collections, from cabinet hinges to table leg tips and drawer pulls, catching the afternoon sun and introducing subtle luxury.</p>
      `
    },
    "05": {
      title: "What FSC Certification Actually Means for Your Furniture",
      tag: "Materials",
      readTime: "6 min read",
      date: "April 10, 2026",
      img: "assets/images/blog/blog_thumbnail_05.png",
      content: `
        <p>Sustainability is more than a marketing buzzword. In the furniture industry, forest sourcing directly impacts global carbon levels, forest communities, and the quality of the timber itself. FSC (Forest Stewardship Council) certification is the gold standard for verifying that wood is sourced responsibly.</p>
        <h3>What is FSC Certification?</h3>
        <p>The Forest Stewardship Council is an international non-profit that establishes standards for responsible forest management. When a piece of lumber bears the FSC stamp, it indicates that it has been harvested from a forest that is managed to preserve biological diversity, sustain the local economy, and protect the rights of indigenous populations and workers.</p>
        <h3>Why Sustainable Timber is Higher Quality</h3>
        <p>Irresponsible forestry focuses on speed — clear-cutting entire regions and growing fast, low-density woods. Responsible FSC forestry prioritizes selective cutting and allows trees to reach maturity. Slower growth rings result in denser, stronger timber with far superior grain structures, making the final wood much less prone to warping and cracking over time.</p>
      `
    },
    "06": {
      title: "The Complete Dining Table Sizing Guide",
      tag: "Styling",
      readTime: "5 min read",
      date: "March 30, 2026",
      img: "assets/images/blog/blog_thumbnail_06.png",
      content: `
        <p>A dining table is the heart of hosting. Choose a table that is too small, and guests will bump elbows; choose one that is too large, and the room will feel cramped and uncomfortable to navigate. Finding the golden ratio depends on simple spatial mathematics.</p>
        <h3>The Clearance Rule: 36 to 48 Inches</h3>
        <p>Before considering seating count, measure your dining room. To allow guests to pull out chairs and walk behind seated diners comfortably, leave a minimum of 36 inches of clearance between the table's edges and the walls or adjacent furniture. For a truly luxurious, open feeling, aim for 48 inches of clearance.</p>
        <h3>The Seating Space Rule: 24 Inches Per Person</h3>
        <p>To avoid elbow clashes, allow 24 inches of table width for each place setting. For formal dinners where larger plates and multiple glasses are used, increase this to 28 inches. Additionally, ensure there is at least 12 inches of table depth per person to prevent feet from knocking underneath.</p>
      `
    },
    "07": {
      title: "How to Maintain and Clean Luxury Leather Furniture",
      tag: "Care Guide",
      readTime: "5 min read",
      date: "March 15, 2026",
      img: "assets/images/blog/blog_thumbnail_07.png",
      content: `
        <p>Premium leather is one of the most durable materials available for home seating. High-grade aniline leather develops a gorgeous patina, deepening in character and molding to the sitter over the years. However, leather is porous and requires deliberate care to stay soft and avoid cracking.</p>
        <h3>Aniline vs. Semi-Aniline Leather</h3>
        <p>At VerdantWood, we source full-grain aniline and semi-aniline leathers. Pure aniline leather is dyed solely with soluble dyes, allowing the natural grain and blemishes of the hide to show through. It is exceptionally soft but highly porous. Semi-aniline leather features a thin protective layer of pigment, making it slightly more resistant to stains and fading, which is ideal for active households.</p>
        <h3>Avoid the Enemies: Sunlight and Heat</h3>
        <p>The quickest way to ruin a premium leather chair or sofa is to position it directly under a window facing the sun or right next to a radiator. Direct heat causes the natural oils in the leather hide to evaporate, making the fiber structure brittle. Once leather dries out and cracks, it is nearly impossible to restore.</p>
      `
    },
    "08": {
      title: "The Rise of Biophilic Design in Modern Showrooms",
      tag: "Trends",
      readTime: "6 min read",
      date: "February 28, 2026",
      img: "assets/images/blog/blog_thumbnail_08.png",
      content: `
        <p>Humans possess an innate, evolutionary connection to nature. Biophilic design is the practice of integrating natural elements — plants, daylight, organic ventilation, textured stone, and raw wood grains — directly into building interiors to reduce stress, improve air quality, and enhance cognitive function.</p>
        <h3>Why Showrooms and Homes are going Organic</h3>
        <p>A space that is entirely synthetic and enclosed triggers sub-conscious claustrophobia. Designers are combatting this by blurring the boundary between the outdoors and indoors. In high-end showrooms, this manifests as double-height glass windows, interior courtyard gardens, and water walls that generate relaxing white noise.</p>
        <h3>The Pillars of Biophilic Integration</h3>
        <p><strong>1. The Visual Connection:</strong> Placing living vegetation, such as miniature olive trees or structural fiddle-leaf figs, within the primary line of sight. <strong>2. Non-Visual Stimulation:</strong> Using textured natural materials that beg to be touched, such as raw timber grains, quarried marble, and woven linen. <strong>3. Dynamic Light:</strong> Positioning seating to capture moving shadows and sun patterns throughout the day.</p>
      `
    },
    "09": {
      title: "Sustainable Rattan and Bamboo: The New Luxury Materials",
      tag: "Materials",
      readTime: "7 min read",
      date: "February 12, 2026",
      img: "assets/images/blog/blog_thumbnail_09.png",
      content: `
        <p>For decades, rattan and bamboo were relegated to simple outdoor patio chairs and casual sunroom sets. However, the rise of conscious luxury and organic modernism has propelled these materials into premium indoor architectural design, valued for their warmth, weight, and sustainable speed.</p>
        <h3>Nature's High-Tech Grasses</h3>
        <p>Bamboo is not a wood; it is a grass. Yet, it possesses a tensile strength of 28,000 pounds per square inch, which is higher than structural steel. Rattan, a vine-like palm native to tropical regions, is solid-core and highly malleable under heat. When steamed, rattan can be bent into fluid, sculptural curves that traditional hardwoods cannot match without extensive jointing.</p>
        <h3>The Ultimate Renewable Materials</h3>
        <p>While oaks and walnuts can take 40 to 80 years to reach harvest maturity, bamboo grows to full height in just 3 to 5 years. Rattan vines grow quickly up trees and can be harvested every 5 to 7 years. When harvested, the root systems are left intact, meaning the plants immediately regenerate without soil degradation.</p>
      `
    }
  };

  function initInteractiveArticleDrawer() {
    const drawer = document.getElementById("articleDrawer");
    const overlay = document.getElementById("articleDrawerOverlay");
    const closeBtn = document.getElementById("drawerClose");
    
    if (!drawer || !overlay || !closeBtn) return;

    // Helper to open drawer
    window.openArticleDrawer = function(articleId) {
      const data = ARTICLE_DB[articleId];
      if (!data) return;

      // Populate elements
      document.getElementById("drawerTag").textContent = data.tag;
      document.getElementById("drawerImg").src = data.img;
      document.getElementById("drawerImg").alt = "Detailed view for " + data.title;
      
      const metaEl = document.getElementById("drawerMeta");
      metaEl.innerHTML = `
        <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> ${data.readTime}</span>
        <span style="margin-left:15px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;margin-right:4px;"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> ${data.date}</span>
      `;
      document.getElementById("drawerTitle").textContent = data.title;
      document.getElementById("drawerContent").innerHTML = data.content;

      // Trigger animations
      overlay.classList.add("active");
      drawer.classList.add("active");
      document.body.classList.add("no-scroll");
    };

    function closeDrawer() {
      overlay.classList.remove("active");
      drawer.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }

    closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    // Bind all clickable cards
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".clickable-article-card") || e.target.closest(".blog-card") || e.target.closest(".featured-post-section");
      if (card && card.dataset.articleId) {
        const link = e.target.closest("a");
        if (link && !link.classList.contains("blog-card-link")) {
          // Allow normal action for other random links in cards
          return;
        }
        e.preventDefault();
        window.openArticleDrawer(card.dataset.articleId);
      }
    });
  }

  function initStyleQuiz() {
    const steps = document.querySelectorAll(".quiz-step");
    const progress = document.getElementById("quizProgress");
    const restartBtn = document.getElementById("quizRestartBtn");
    const resultLinkBtn = document.getElementById("resultLinkBtn");

    if (!steps.length || !progress) return;

    let currentStepIndex = 0;
    const answers = { organic: 0, moody: 0, scandi: 0 };
    let recommendedArticleId = "styling-textures";

    function showStep(index) {
      steps.forEach((s, idx) => {
        if (idx === index) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
      // Progress calculation
      const percent = index === steps.length - 1 ? 100 : ((index + 1) / (steps.length - 1)) * 100;
      progress.style.width = percent + "%";
    }

    // Answers click
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("quiz-btn") && e.target.closest(".quiz-step")) {
        const ans = e.target.dataset.answer;
        if (ans) answers[ans]++;

        currentStepIndex++;
        if (currentStepIndex < steps.length - 1) {
          showStep(currentStepIndex);
        } else {
          // Process results
          calculateResults();
        }
      }
    });

    function calculateResults() {
      // Find max answer
      let matchedStyle = "organic";
      let maxVal = -1;
      for (const [key, value] of Object.entries(answers)) {
        if (value > maxVal) {
          maxVal = value;
          matchedStyle = key;
        }
      }

      const resultTitle = document.getElementById("resultTitle");
      const resultDesc = document.getElementById("resultDesc");

      if (matchedStyle === "organic") {
        resultTitle.textContent = "Organic Modernism";
        resultDesc.textContent = "You feel most aligned with natural, eco-friendly materials like oak, bamboo, and lots of living indoor greenery. Your spaces should blur the line between outdoors and indoors.";
        recommendedArticleId = "08"; // Biophilic Design
      } else if (matchedStyle === "moody") {
        resultTitle.textContent = "Sophisticated Drama";
        resultDesc.textContent = "You appreciate high-contrast luxury settings, dark wood grains like walnut, black marble tables, and glowing brass details. You favor warm, atmospheric evening lighting.";
        recommendedArticleId = "02"; // Oak vs. Walnut
      } else {
        resultTitle.textContent = "Warm Minimalist / Scandi";
        resultDesc.textContent = "You cherish functional layout balance, clean lines, and soft neutral palettes like parchment, white bouclé, and light oak. You value spaciousness and peace.";
        recommendedArticleId = "03"; // 5 layouts for small spaces
      }

      showStep(steps.length - 1);
    }

    if (resultLinkBtn) {
      resultLinkBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.openArticleDrawer(recommendedArticleId);
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        currentStepIndex = 0;
        answers.organic = 0;
        answers.moody = 0;
        answers.scandi = 0;
        showStep(0);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBlogFilterAndPagination();
    initInteractiveArticleDrawer();
    initStyleQuiz();
  });
})();

