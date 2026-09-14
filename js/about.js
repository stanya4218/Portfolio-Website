/* Sole responsibility: flickering image + caption sync
   and cycling data table in the about section */
(function setupAboutSectionInteractions() {
  const imageNodes = Array.from(document.querySelectorAll(".about__image"));
  const captionNodes = Array.from(document.querySelectorAll(".about__image-caption"));

  // Ensure missing files never show broken icons; keep grey img fallback.
  imageNodes.forEach((img) => {
    img.addEventListener("error", () => {
      img.classList.add("is-missing");
      img.removeAttribute("src");
    });
  });

  if (imageNodes.length === 2 && captionNodes.length === 2) {
    let activeImageIndex = 0;
    window.setInterval(() => {
      activeImageIndex = activeImageIndex === 0 ? 1 : 0;
      imageNodes.forEach((img, index) => {
        img.classList.toggle("is-visible", index === activeImageIndex);
      });
      captionNodes.forEach((caption, index) => {
        caption.classList.toggle("is-visible", index === activeImageIndex);
      });
    }, 5000);
  }

  const cyclingRow = document.querySelector(".about__cycling-row");
  if (!cyclingRow) return;

  const valueNode = cyclingRow.querySelector(".about__cycling-value");
  const labelNode = cyclingRow.querySelector(".about__cycling-label");
  if (!valueNode || !labelNode) return;

  const cyclingRows = [
    { value: "Arch + AEC-M", label: "Education" },
    { value: "3+ Years", label: "On-Site Experience" },
    { value: "7 Projects", label: "Shaped" },
    { value: "Americas", label: "Based In" }
  ];

  let activeRowIndex = 0;
  const fadeDurationMs = 600;
  const holdDurationMs = 3500;

  const rotateRow = () => {
    cyclingRow.classList.remove("is-visible");
    window.setTimeout(() => {
      activeRowIndex = (activeRowIndex + 1) % cyclingRows.length;
      valueNode.textContent = cyclingRows[activeRowIndex].value;
      labelNode.textContent = cyclingRows[activeRowIndex].label;
      cyclingRow.classList.add("is-visible");
    }, fadeDurationMs);
  };

  window.setInterval(rotateRow, holdDurationMs + fadeDurationMs);
})();
