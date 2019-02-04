let orderArr = ['zeroth hidden', 'first', 'second', 'third', 'fourth hidden', 'fifth hidden'];

const slideRight = () => {
  projects.forEach((project) => {
    let orderIdx = orderArr.findIndex((order) => order === project.className);
    project.className = orderArr[(orderIdx + 1) % orderArr.length];
  });
};

const slideLeft = () => {
  projects.forEach((project) => {
    let orderIdx = orderArr.findIndex((order) => order === project.className);
    let newIdx = orderIdx > 0 ? orderIdx - 1 : orderArr.length - 1;
    project.className = orderArr[newIdx];
  });
};

window.addEventListener('DOMContentLoaded', () => {
  projects =
  Array.from(
    document.getElementById('project-slideshow').children
  );
  const leftButton = document.getElementById('left');
  const rightButton = document.getElementById('right');

  leftButton.addEventListener('click', slideLeft);
  rightButton.addEventListener('click', slideRight);
});
