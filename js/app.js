document.addEventListener('DOMContentLoaded', () => {
  const initializers = [
    window.initReveal,
    window.initNav,
    window.initSectionNavigation,
    window.initCounters,
    window.initFilters,
    window.initEditorialTimelineV2,
    window.initFilieraSlider
  ];

  initializers.forEach((initializer) => {
    if (typeof initializer === 'function') {
      initializer();
    }
  });
});
