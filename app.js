const container = document.querySelector('.container');
const WIDTH = 500;

// create initial 16x16 grid
function initialize() {
  for (i = 0; i < 256; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    container.appendChild(square);
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
    container.appendChild(square);
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
    container.removeChild(square);
  })
}

initialize();