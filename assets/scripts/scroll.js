window.addEventListener('DOMContentLoaded', () => {
  const arrowIndicator = document.getElementById('arrow-indicator');

  arrowIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.screen.height,
      left: 0,
      behavior: 'smooth'
    });
  });
});
