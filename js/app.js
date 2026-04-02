document.addEventListener('DOMContentLoaded', () => {
  const initializers = [
    window.initReveal,
    window.initNav,
    window.initSectionNavigation,
    window.initEditorialTimelineV2,
    window.initFilieraSlider,
    window.initPerformanceData,
    window.initCounters
  ];

  initializers.forEach((initializer) => {
    if (typeof initializer === 'function') {
      initializer();
    }
  });
});
