let orderArr = ['zeroth hidden', 'first', 'second', 'third', 'fourth hidden', 'fifth hidden'];

const slideRight = () => {
  window.$projects.forEach((project) => {
    orderIdx = orderArr.findIndex((order) => order === project.className);
    project.className = orderArr[(orderIdx + 1) % orderArr.length];
  });
};

const slideLeft = () => {
  window.$projects.forEach((project) => {
    orderIdx = orderArr.findIndex((order) => order === project.className);
    let newIdx = orderIdx > 0 ? orderIdx - 1 : orderArr.length - 1;
    project.className = orderArr[newIdx];
  });
};

window.addEventListener('DOMContentLoaded', () => {
  window.$projects =
  Array.from(
    document.getElementById('projects').children
  ).slice(2);
  const leftButton = document.getElementById('left');
  const rightButton = document.getElementById('right');

  leftButton.addEventListener('click', slideLeft);
  rightButton.addEventListener('click', slideRight);
});
