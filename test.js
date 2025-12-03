// Ensure this script is in a module context
(async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    const pointLight = new THREE.PointLight(0xffffff, 30, 100);
    pointLight.position.set(2, 4, 6);
    scene.add(pointLight);

    let geometry = new THREE.PlaneGeometry(10, 10, 254, 254);

    // Load shaders
    const vertexShader = await fetch('vertex.glsl').then(res => res.text());
    const fragmentShader = await fetch('fragment.glsl').then(res => res.text());

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTexture: { value: null },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) }
        },
        vertexShader,
        fragmentShader,
        flatShading: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    // Mouse movement handling
    window.addEventListener('mousemove', (event) => {
        material.uniforms.uMouse.value.x = (event.clientX / window.innerWidth);
        material.uniforms.uMouse.value.y = 1 - (event.clientY / window.innerHeight);
    });

    // Resize handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Convert DOM to texture
    async function convertDomToTexture() {
        const domElement = document.querySelector('.dom-element');
        const canvas = await html2canvas(domElement, { backgroundColor: null });
        material.uniforms.uTexture.value = new THREE.CanvasTexture(canvas);
    }

    // Initial texture creation
    await convertDomToTexture();

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
})();



  // document.querySelectorAll(".service-item").forEach((item) => {
  //   const startEvent = (e) => {
  //     const image = document.getElementById("hover-image");
  //     const imgSrc = item.getAttribute("data-image");

  //     const serviceText = item.querySelector('.service-text');
  //     const serviceTextRect = serviceText.getBoundingClientRect();

  //     const x = e.pageX || e.touches[0].pageX;
  //     const y = e.pageY || e.touches[0].pageY;

  //     // Show image only if cursor is not over the service text
  //     if (x < serviceTextRect.left || x > serviceTextRect.right || y < serviceTextRect.top || y > serviceTextRect.bottom) {
  //       image.style.backgroundImage = `url(${imgSrc})`;
  //       image.style.opacity = "1";
  //       image.style.transform = "scale(1)";
  //       image.style.clipPath = "polygon(0% 0%, 90% 0%, 100% 10%, 100% 100%, 10% 100%, 0% 90%)";
  //       moveEvent(e);
  //     }
  //   };

  //   const moveEvent = (e) => {
  //     const image = document.getElementById("hover-image");
  //     const x = e.pageX || e.touches[0].pageX;
  //     const y = e.pageY || e.touches[0].pageY;

  //     const container = document.querySelector(".col-lg-12");
  //     const containerRect = container.getBoundingClientRect();

  //     // Define boundaries
  //     const minX = containerRect.left + (containerRect.width * 0.4);
  //     const maxX = containerRect.right;

  //     if (x >= minX && x <= maxX) {
  //       image.style.left = `${x - 200}px`;
  //       image.style.top = `${y + 20}px`;
  //     }
  //   };

  //   const endEvent = () => {
  //     const image = document.getElementById("hover-image");
  //     image.style.opacity = "0";
  //     image.style.transform = "scale(0.4)";
  //   };

  //   // Mouse events
  //   item.addEventListener("mouseenter", startEvent);
  //   item.addEventListener("mousemove", moveEvent);
  //   item.addEventListener("mouseleave", endEvent);

  //   // Touch events
  //   item.addEventListener("touchstart", startEvent);
  //   item.addEventListener("touchmove", moveEvent);
  //   item.addEventListener("touchend", endEvent);
  // });



  // _____________
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("Initialized");

//   const sections = document.querySelectorAll(".content-section");
//   const indicators = document.querySelectorAll("#section-indicator li");

//   // Function to set the active indicator based on index
//   function setActiveIndicator(index) {
//     indicators.forEach((indicator, i) => {
//       indicator.classList.toggle("active", i === index);
//     });
//   }

//   // Function to scroll to the section if a hash exists in the URL
//   function scrollToSectionFromHash() {
//     const hash = window.location.hash;
//     if (hash) {
//       const section = document.querySelector(hash);
//       if (section) {
//         // Scroll smoothly to the section
//         section.scrollIntoView({ behavior: "smooth" });
//         // Find the corresponding indicator and set it as active
//         const sectionIndex = Array.from(sections).findIndex(sec => `#${sec.id}` === hash);
//         console.log("sectionIndex", sectionIndex)
//         if (sectionIndex >= 0) {
//           setActiveIndicator(sectionIndex);
//         }
//       }
//     }
//   }

//   // Initialize ScrollTrigger

//     sections.forEach((section, index) => {
//       ScrollTrigger.create({
//         trigger: section,
//         start: "top center",
//         end: "bottom center",
//         onEnter: () => setActiveIndicator(index),
//         onEnterBack: () => setActiveIndicator(index),
//         scrub: 4,
//         markers: true, // Optional, remove for production
//       });
//     });

//   // Scroll to section if a hash exists and reinitialize ScrollTrigger
//   scrollToSectionFromHash();

//   // Listen to hash change events (when clicking on anchor links)
//   window.addEventListener("hashchange", scrollToSectionFromHash);

//   // If the user clicks on a section number, manually update the active indicator
//   indicators.forEach((indicator, index) => {
//     indicator.querySelector('a').addEventListener('click', (e) => {
//       e.preventDefault(); // Prevent default anchor link behavior
//       const targetSection = document.querySelector(indicator.querySelector('a').getAttribute('href'));
//       if (targetSection) {
//         targetSection.scrollIntoView({ behavior: 'smooth' });
//         setActiveIndicator(index); // Set the clicked section as active
//       }
//     });
//   });
// });
