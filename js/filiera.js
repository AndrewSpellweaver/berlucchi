window.initFilieraSlider = function initFilieraSlider() {
  const slider = document.querySelector('.filiera-slider');
  const slideRow = document.getElementById('filiera-slide-row');
  const slides = slideRow ? Array.from(slideRow.querySelectorAll('.filiera-slide-col')) : [];
  const indicators = Array.from(document.querySelectorAll('.filiera-indicator__btn'));

  if (!slider || !slideRow || !slides.length || !indicators.length) return;

  let currentIndex = 0;
  let autoPlayId = null;

  function updateSlide() {
    const sliderWidth = slider.offsetWidth;
    const translateValue = currentIndex * -sliderWidth;
    slideRow.style.transform = `translateX(${translateValue}px)`;

    indicators.forEach((button, index) => {
      const isActive = index === currentIndex;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      button.setAttribute('tabindex', isActive ? '0' : '-1');
    });
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateSlide();
  }

  function stopAutoPlay() {
    if (autoPlayId) {
      window.clearInterval(autoPlayId);
      autoPlayId = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayId = window.setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);
  }

  indicators.forEach((button, index) => {
    button.addEventListener('click', () => {
      goToSlide(index);
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToSlide(currentIndex + 1);
        indicators[(currentIndex + 1) % indicators.length]?.focus();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToSlide(currentIndex - 1);
        indicators[(currentIndex - 1 + indicators.length) % indicators.length]?.focus();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        goToSlide(0);
        indicators[0]?.focus();
      }

      if (event.key === 'End') {
        event.preventDefault();
        goToSlide(slides.length - 1);
        indicators[slides.length - 1]?.focus();
      }
    });
  });

  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
  slider.addEventListener('focusin', stopAutoPlay);
  slider.addEventListener('focusout', startAutoPlay);
  window.addEventListener('resize', updateSlide);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
      return;
    }

    startAutoPlay();
  });

  updateSlide();
  startAutoPlay();
};
