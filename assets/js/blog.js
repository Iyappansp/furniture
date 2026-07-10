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

  document.addEventListener("DOMContentLoaded", () => {
    initBlogFilterAndPagination();
  });
})();
