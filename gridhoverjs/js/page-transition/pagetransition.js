import { Overlay } from "./overlay.js";

// Select the overlay element from the DOM
const overlayEl = document.querySelector(".overlay");

// Instantiate an Overlay object using the selected overlay element
const overlay = new Overlay(overlayEl, {
  rows: 8,
  columns: 14,
});

let isAnimating = false;

function handlePageTransition(event, url) {

  event.preventDefault();
  if (isAnimating) return;

  isAnimating = true;

  overlay
    .show({
      transformOrigin: "50% 0%", // Start from top-center
      duration: 0.4,
      ease: "power3.inOut",
      stagger: (index) =>
        0.03 * (overlay.cells.flat()[index].row + gsap.utils.random(0, 5)),
    })
    .then(() => {
      window.location.href = url; // Navigate to the new page

      // Optionally, hide the overlay after the transition, if necessary
      overlay
        .hide({
          transformOrigin: "50% 100%",
          duration: 0.4,
          ease: "power2",
          stagger: (index) =>
            0.03 * (overlay.cells.flat()[index].row + gsap.utils.random(0, 5)),
        })
        .then(() => {
          isAnimating = false;
        });
    });
}

const links = document.querySelectorAll(
  'a[href="./index.html"], a[href="./about-us.html"], a[href="./contact.html"], a[href="./services.html"], a[href="./privacy.html"], a[href="./cookies.html"]'
);
links.forEach((link) => {
  link.addEventListener("click", function (event) {
    const url = link.getAttribute("href");
    handlePageTransition(event, url);
  });
});
