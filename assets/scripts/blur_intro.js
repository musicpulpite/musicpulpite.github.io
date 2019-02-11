document.addEventListener('DOMContentLoaded', () => {
  const introDiv = document.getElementById('intro');

  window.addEventListener('scroll', () => {
    const distToTop = window.pageYOffset;

    const blur = Math.min(
      4 * (distToTop / window.innerHeight),
      4
    );
    console.log(blur);
    introDiv.style.filter = `blur(${blur}px)`;
  })
});
