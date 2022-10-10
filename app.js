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

/*

BUTTON FUNCTIONS

*/

const size = document.querySelector('#size');
const color = document.querySelector('#color');
const erase = document.querySelector('#erase');
const sidebar = document.querySelector('.customize');
const sizeSlider = document.getElementById('#size-slider');

size.addEventListener('click', () => {
  sidebar.innerHTML = `
    <div class="prompt">Choose your pen thickness:</div>
    <div class="slider-container">
      <img src="img/small.jpg" class="pen" width=20px height=20px>
      <input type="range" min="10" max="100" value="16" class="slider" id="size-slider">
      <img src="img/big.jpg" class="pen" width=20px height=20px>
    </div>
  `;
});



/*

INITIALIZE

*/


initialize();