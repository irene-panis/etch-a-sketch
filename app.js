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
  sketchpad.innerHTML = "";
}

function count() {
  const squares = document.querySelectorAll('.square');
  return squares.length;
}

/*

ELEMENTS AND VARIABLES

*/

const size = document.querySelector('#size');
const rainbow = document.querySelector('#rainbow');
const erase = document.querySelector('#erase');
const sidebar = document.querySelector('.sidebar');
const customize = document.querySelector('.customize');
let storedValue = 16; // for detecting slider changes
let newValue = 16; // for detecting slider changes
let currentMode = 0; // 0 for default, 1 for rgb
let buttonActive = 'default'; // stores which button is highlighted

/*

SIDEBAR WINDOW (MISC.)

*/

function makeWindow() {
  sidebar.innerHTML = `
  <div class="window">
    <div class="title-bar">
      <div class="left">
        <div class="window-title">ALERT!</div>
      </div>
      <div class="right">
        <div id="x">X</div>
      </div>
    </div>
    <div class="customize" style="background-color: oldlace;"></div>
  </div>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'x') {
    clearSidebar();
  }
});

function clearSidebar() {
  sidebar.innerHTML = "";
}

/*

SIZE BUTTON

*/

size.addEventListener('click', () => {
  makeWindow();
  customizeSize();
});

function customizeSize() {
  let total = count();
  let value = Math.sqrt(total);
  const customize = document.querySelector('.customize');
  customize.innerHTML = `
  <div class="prompt">Choose your pen thickness (this will clear your drawing!):</div>
  <div class="slider-container">
    <img src="img/small.jpg" class="pen" width=20px height=20px>
    <input type="range" min="10" max="100" value="${value}" class="slider" id="size-slider">
    <img src="img/big.jpg" class="pen" width=20px height=20px>
  </div>
  <button class="window-button" id="select-size">Select</button>
`;
}

document.addEventListener('change', (e) => {
  if (e.target && e.target.id == 'size-slider') {
    newValue = e.target.value;
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'select-size') {
    if (newValue !== storedValue) { // checks if slider value has been changed
      createGrid(newValue); // if new slider value present, clear the grid
      storedValue = newValue; // then store new slider value
    } // otherwise, if slider value has stayed the same,
    clearSidebar(); // simply clear the sidebar w/o clearing grid
    if (currentMode == 0) {
      chooseDefault();
    } else {
      chooseRGB();
    }
  }
});

/*

ERASE BUTTON

*/

erase.addEventListener('click', () => {
  makeWindow();
  confirmErase();
});

function confirmErase() {
  const customize = document.querySelector('.customize');
  customize.innerHTML = `
    <div class="prompt">Are you sure you want to clear your sketchpad?</div>
    <div class="button-container">
      <button class="window-button" id="yes">Yes</button>
      <button class="window-button" id="no">No</button>
    </div>
  `;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'yes') {
    clearSidebar();
    let total = count();
    createGrid(Math.sqrt(total));
  }
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'no') {
    clearSidebar();
  }
})

/*

RGB BUTTON

*/

function chooseMode() {
  const customize = document.querySelector('.customize');
  if (buttonActive == 'default') {
    customize.innerHTML = `
      <div class="prompt">Choose your drawing mode!</div>
      <div class="button-container">
        <button class="window-button chosen" id="default">Default</button>
        <button class="window-button" id="rgb">RGB</button>
      </div>
    `;
  } else {
    customize.innerHTML = `
      <div class="prompt">Choose your drawing mode!</div>
      <div class="button-container">
        <button class="window-button" id="default">Default</button>
        <button class="window-button chosen" id="rgb">RGB</button>
      </div>
    `;
  }
}

function chooseRGB() {
  currentMode = 1;
  buttonActive = 'rgb';
  const squares = document.querySelectorAll('.square');
  let i = 0;
  squares.forEach((square) => {
    i++;
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = makeRainbow();
    });
  });
}

function chooseDefault() {
  currentMode = 0;
  buttonActive = 'default';
  const squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    square.addEventListener('mouseover', () => {
      square.style.backgroundColor = 'dimgrey';
    });
  });
}

rainbow.addEventListener('click', () => {
  makeWindow();
  chooseMode();
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'rgb') {
    e.target.classList.add('chosen');
    const defaultDraw = document.querySelector('#default');
    defaultDraw.classList.remove('chosen');
    chooseRGB();
  };
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id == 'default') {
    e.target.classList.add('chosen');
    const rgbDraw = document.querySelector('#rgb');
    rgbDraw.classList.remove('chosen');
    chooseDefault();
  };
});

function makeRainbow() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let result = `rgb(${r}, ${g}, ${b})`;
  return result;
}


/*

INITIALIZE

*/


initialize();