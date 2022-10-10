/*

CREATING GRIDS 

*/

const sketchpad = document.querySelector('.sketchpad');
const WIDTH = 500;

// create initial 16x16 grid
function initialize() {
  for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    sketchpad.appendChild(square);
    square.addEventListener('mouseover', () => {
      square.classList.add('written');
    });
  }
}

function createGrid(numSquares) {
  resetGrid();
  for (i = 0; i < numSquares*numSquares; i++) {
    const square = document.createElement('div');
    square.style.width = `${calcSide(numSquares)}px`;
    square.style.height = `${calcSide(numSquares)}px`;
    square.classList.add('square');
    sketchpad.appendChild(square);
    square.addEventListener('mouseover', () => {
      square.classList.add('written');
    });
  }
}

function calcSide(numSquares) {
  return WIDTH / numSquares;
}

function resetGrid() {
  const squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    sketchpad.removeChild(square);
  })
}

function count() {
  const squares = document.querySelectorAll('.square');
  return squares.length;
}

/*

BUTTON FUNCTIONS

*/

const size = document.querySelector('#size');
const color = document.querySelector('#color');
const erase = document.querySelector('#erase');
const sidebar = document.querySelector('.customize');
const sizeSlider = document.getElementById('#size-slider');

size.addEventListener('click', () => {
  let value = 16;
  let total = count();
  if (total !== 256) { value = Math.sqrt(total)};
  sidebar.innerHTML = `
    <div class="prompt">Choose your pen thickness:</div>
    <div class="slider-container">
      <img src="img/small.jpg" class="pen" width=20px height=20px>
      <input type="range" min="10" max="100" value="${value}" class="slider" id="size-slider">
      <img src="img/big.jpg" class="pen" width=20px height=20px>
    </div>
  `;
});

document.addEventListener('change', (e) => {
  if (e.target && e.target.id == 'size-slider') {
    createGrid(e.target.value);
  }
});

function clearSidebar() {
  sidebar.innerHTML = "";
}

erase.addEventListener('click', () => {
  clearSidebar();
  let total = count();
  createGrid(Math.sqrt(total));
});



/*

INITIALIZE

*/


initialize();