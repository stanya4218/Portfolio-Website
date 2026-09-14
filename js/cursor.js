// Sole responsibility: run custom cursor dot interactions.
(function setupCursor() {
  const cursor = document.querySelector(".cursor-dot");
  if (!cursor) return;

  let pointerVisible = false;

  window.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;

    if (!pointerVisible) {
      pointerVisible = true;
      cursor.classList.add("is-active");
    }
  });

  const hoverTargets = document.querySelectorAll("a, .project-card, .interest-photo");
  hoverTargets.forEach((node) => {
    node.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
    node.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
  });
})();
