// monbile

import { preloadImages, getMousePos, lerp } from './utils.js';

// Registers the Flip plugin with GSAP
gsap.registerPlugin(Flip);

const body = document.body;
const frame = document.querySelector('.frame');
const content = document.querySelector('.content');
const enterButton = document.querySelector('.enter');
const fullview = document.querySelector('.fullview');
const grid = document.querySelector('#custom-grid');
const intro = document.querySelector('.intro');
const gridRows = grid.querySelectorAll('.row');

// Detect if the device is mobile
const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Cache window size and update on resize
let winsize = { width: window.innerWidth, height: window.innerHeight };

window.addEventListener('resize', () => {
  winsize = { width: window.innerWidth, height: window.innerHeight };
});

// Initialize mouse position object
let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };
let isMouseInsideIntro = false;

// Configuration for enabling/disabling animations
const config = {
  translateX: true,
  skewX: false,
  contrast: true,
  scale: false,
  brightness: true,
};

// Randomized values for mobile devices
let mobileRandomValues = {
  translateX: 0,
  skewX: 0,
  contrast: 100,
  scale: 1,
  brightness: 100,
};

// Generate random values within a specific range
const generateRandomValue = (min, max) => Math.random() * (max - min) + min;

// Periodically update random values for mobile
// const updateRandomValuesForMobile = () => {
//   if (!isMobile) return;

//   mobileRandomValues = {
//     translateX: generateRandomValue(-200, 100),
//     skewX: generateRandomValue(-3, 3),
//     contrast: generateRandomValue(80, 120),
//     scale: generateRandomValue(0.95, 1.05),
//     brightness: generateRandomValue(80, 120),
//   };

//   setTimeout(updateRandomValuesForMobile, 2000);
// };

// // Start the randomization loop initially
// updateRandomValuesForMobile();

// Total number of rows
const numRows = gridRows.length;
const middleRowIndex = Math.floor(numRows / 2);

const baseAmt = 0.1;
const minAmt = 0.05;
const maxAmt = 0.1;

// Initialize rendered styles
let renderedStyles = Array.from({ length: numRows }, (v, index) => {
  const distanceFromMiddle = Math.abs(index - middleRowIndex);
  const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
  const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);

  let style = { amt, scaleAmt };

  if (config.translateX) style.translateX = { previous: 0, current: 0 };
  if (config.skewX) style.skewX = { previous: 0, current: 0 };
  if (config.contrast) style.contrast = { previous: 100, current: 100 };
  if (config.scale) style.scale = { previous: 1, current: 1 };
  if (config.brightness) style.brightness = { previous: 100, current: 100 };

  return style;
});

let requestId;

// Update mouse position
const updateMousePosition = (ev) => {
  if (!isMouseInsideIntro) return;
  const pos = getMousePos(ev);
  mousepos.x = pos.x;
  mousepos.y = pos.y;
};

// Check if mouse enters or leaves the intro section
intro.addEventListener('mouseenter', () => {
  isMouseInsideIntro = true;
});
intro.addEventListener('mouseleave', () => {
  isMouseInsideIntro = false;
});

// Map mouse position to animation values
const calculateMappedX = () =>
  (((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width) / 100;
const calculateMappedSkew = () => ((mousepos.x / winsize.width) * 2 - 1) * 3;
const calculateMappedContrast = () => {
  const centerContrast = 100;
  const edgeContrast = 330;
  const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
  const factor = Math.pow(t, 2);
  return centerContrast - factor * (centerContrast - edgeContrast);
};
const calculateMappedScale = () => {
  const centerScale = 1;
  const edgeScale = 0.95;
  return (
    centerScale -
    Math.abs((mousepos.x / winsize.width) * 2 - 1) * (centerScale - edgeScale)
  );
};
const calculateMappedBrightness = () => {
  const centerBrightness = 100;
  const edgeBrightness = 15;
  const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
  const factor = Math.pow(t, 2);
  return centerBrightness - factor * (centerBrightness - edgeBrightness);
};

// Render the current frame
const render = () => {
  const mappedValues = isMobile
    ? mobileRandomValues // Use random values for mobile
    : {
        translateX: calculateMappedX(),
        skewX: calculateMappedSkew(),
        contrast: calculateMappedContrast(),
        scale: calculateMappedScale(),
        brightness: calculateMappedBrightness(),
      };

  gridRows.forEach((row, index) => {
    const style = renderedStyles[index];
    for (let prop in config) {
      if (config[prop]) {
        style[prop].current = mappedValues[prop];
        const amt = prop === 'scale' ? style.scaleAmt : style.amt;
        style[prop].previous = lerp(
          style[prop].previous,
          style[prop].current,
          amt
        );
      }
    }

    let gsapSettings = {};
    if (config.translateX) gsapSettings.x = style.translateX.previous;
    if (config.skewX) gsapSettings.skewX = style.skewX.previous;
    if (config.scale) gsapSettings.scale = style.scale.previous;
    if (config.contrast)
      gsapSettings.filter = `contrast(${style.contrast.previous}%)`;
    if (config.brightness)
      gsapSettings.filter = `${
        gsapSettings.filter ? gsapSettings.filter + ' ' : ''
      }brightness(${style.brightness.previous}%)`;

    gsap.set(row, gsapSettings);
  });

  requestId = requestAnimationFrame(render);
};

// Start the render loop
const startRendering = () => {
  if (!requestId) {
    render();
  }
};

// Stop the render loop
const stopRendering = () => {
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
  }
};

// Initialize
const init = () => {
  startRendering();
};

preloadImages('.row__item-img').then(() => {
  document.body.classList.remove('loading');
  init();
});

// Event listeners for desktop and touch events
if (!isMobile) {
  window.addEventListener('mousemove', updateMousePosition);
} else {
  window.addEventListener('touchmove', (ev) => {
    const touch = ev.touches[0];
    updateMousePosition(touch);
  });
}
