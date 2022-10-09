const container = document.querySelector('.container');
const divs = document.querySelectorAll('div.container');

function createGrid() {
  for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    container.appendChild(square);
  }
}

divs.forEach((div) => {
  div.addEventListener('mouseover', () => {
    div.classList.add('written');
  });
});


createGrid();