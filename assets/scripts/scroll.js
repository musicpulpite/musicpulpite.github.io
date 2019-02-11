window.addEventListener('DOMContentLoaded', () => {
  const arrowIndicator = document.getElementById('arrow-indicator');

  arrowIndicator.addEventListener('click', () => {
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  });
});
