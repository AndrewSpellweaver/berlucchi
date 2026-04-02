/* ---------- REVEAL ---------- */

window.initReveal = function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  elements.forEach((element) => observer.observe(element));
};

/* ------------ NAV ------------ */

window.initNav = function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-menu a');
  const observedLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = observedLinks
	.map((link) => document.querySelector(link.getAttribute('href')))
	.filter(Boolean);

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileMenu.hidden = !isOpen;
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.hidden = true;
      }

      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    }, { passive: true });
  }

  if (!('IntersectionObserver' in window) || !sections.length || !observedLinks.length) {
    return;
  }

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      if (!id) return;

      observedLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', active);
      });
    });
  }, {
    rootMargin: '-30% 0px -55% 0px',
    threshold: 0
  });

  sections.forEach((section) => sectionObserver.observe(section));
};

/* -------- NAV SECTION -------- */

window.initSectionNavigation = function initSectionNavigation() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const upBtn = document.querySelector('.section-nav__btn--up');
  const downBtn = document.querySelector('.section-nav__btn--down');

  if (!sections.length || !upBtn || !downBtn) return;

  let currentIndex = 0;

  function updateCurrentSection() {
    let closestIndex = 0;
    let minOffset = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const offset = Math.abs(rect.top);

      if (offset < minOffset) {
        minOffset = offset;
        closestIndex = index;
      }
    });

    currentIndex = closestIndex;

    upBtn.classList.toggle('is-disabled', currentIndex === 0);
    downBtn.classList.toggle('is-disabled', currentIndex === sections.length - 1);
  }

  function scrollToIndex(index) {
    if (index < 0 || index >= sections.length) return;

    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  upBtn.addEventListener('click', () => {
    scrollToIndex(currentIndex - 1);
  });

  downBtn.addEventListener('click', () => {
    scrollToIndex(currentIndex + 1);
  });

  window.addEventListener('scroll', updateCurrentSection, { passive: true });
  updateCurrentSection();
};

/* --------- COUNTERS --------- */

function animateCounter(element) {
  const raw = element.dataset.counter;
  if (!raw) return;

  const normalized = raw.replace(',', '.').trim();
  const target = Number(normalized);
  if (Number.isNaN(target)) return;

  const isFloat = normalized.includes('.');
  const duration = 900;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = target * eased;

    if (isFloat) {
      element.textContent = value.toFixed(1).replace('.', ',');
    } else {
      element.textContent = Math.round(value).toLocaleString('it-IT');
    }

    if (progress < 1) {
      requestAnimationFrame(frame);
      return;
    }

    element.textContent = isFloat
      ? target.toFixed(1).replace('.', ',')
      : Math.round(target).toLocaleString('it-IT');
  }

  requestAnimationFrame(frame);
}

window.initCounters = function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach((counter) => animateCounter(counter));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
};

/* ---------- KPI PERFORMANCE ---------- */

window.initPerformanceData = function initPerformanceData() {
  const root = document.getElementById("kpi-grid");
  const yearSelector = document.getElementById("year-selector");
  const filterButtons = Array.from(document.querySelectorAll(".filter-chip"));
  const dataset = window.performanceData;

  if (!root || !yearSelector || !dataset || !dataset.data) return;

  let currentYear = root.dataset.defaultYear || dataset.years[0];
  let currentFilter = "all";

  function getYearData(year) {
    return Array.isArray(dataset.data[year]) ? dataset.data[year] : [];
  }

  function buildYearButtons() {
    yearSelector.innerHTML = dataset.years
      .map((year) => {
        const hasData = getYearData(year).length > 0;
        const isActive = year === currentYear;

        return `
          <button
            class="year-btn ${isActive ? "is-active" : ""}"
            type="button"
            aria-pressed="${isActive ? "true" : "false"}"
            data-year="${year}"
            ${hasData ? "" : `disabled title="KPI non disponibili"`}
          >
            ${year}
          </button>
        `;
      })
      .join("");
  }

  function formatCategories(categories) {
    return categories
      .map((category) => dataset.labels[category] || category)
      .join(" · ");
  }

  function renderKpis() {
    const items = getYearData(currentYear).filter((item) => {
      if (currentFilter === "all") return true;
      return Array.isArray(item.tags) && item.tags.includes(currentFilter);
    });

    root.innerHTML = items
      .map((item) => {

        return `
          <article class="kpi-card" data-category="${(item.tags || []).join(" ")}">
            <span class="kpi-card__label">${item.label}</span>

            <div class="kpi-card__value-row">
              <strong class="kpi-card__value" data-counter="${item.numericValue ?? ""}">${item.value}</strong>
              <span class="kpi-card__unit">${item.unit}</span>
            </div>

            <p class="kpi-card__text">${item.text}</p>
            <div class="kpi-card__meta">
              <span>${formatCategories(item.tags || [])}</span>
            </div>
          </article>
        `;
      })
      .join("");
	  
	  if (typeof window.initCounters === "function") {
        window.initCounters();
      }
  }

  function syncYearButtons() {
    yearSelector.querySelectorAll(".year-btn").forEach((button) => {
      const isActive = button.dataset.year === currentYear;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function syncFilterButtons() {
    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === currentFilter;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  yearSelector.addEventListener("click", (event) => {
    const button = event.target.closest(".year-btn");
    if (!button || button.disabled) return;

    currentYear = button.dataset.year;
    syncYearButtons();
    renderKpis();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter || "all";
      syncFilterButtons();
      renderKpis();
    });
  });

  buildYearButtons();
  syncFilterButtons();
  renderKpis();
}