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
  const observedLinks = document.querySelectorAll('.main-nav a');
  const sections = document.querySelectorAll('main section[id]');

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

/* ---------- FILTERS ---------- */

window.initFilters = function initFilters() {
  const buttons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.kpi-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      buttons.forEach((item) => {
        item.classList.toggle('is-active', item === button);
      });

      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(' ').filter(Boolean);
        const visible = filter === 'all' || categories.includes(filter);
        card.classList.toggle('is-hidden', !visible);
      });
    });
  });
};
