// Sole responsibility: animate contact sketch lines and pencil sounds on section entry.
(function setupContactAnimation() {
  const contactSection = document.getElementById("contact");
  const lines = Array.from(document.querySelectorAll(".draw-line"));
  const pencilAudio = document.getElementById("pencil-audio");

  if (!contactSection || lines.length === 0) return;

  const prepareLine = (line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = String(length);
    line.style.strokeDashoffset = String(length);
  };

  lines.forEach(prepareLine);

  const playPencil = () => {
    if (!pencilAudio) return;
    pencilAudio.volume = 0.2;
    pencilAudio.currentTime = 0;
    pencilAudio.play().catch(() => {
      // Browser may block until user interaction.
    });
  };

  const animateLines = () => {
    lines.forEach((line, index) => {
      window.setTimeout(() => {
        playPencil();
        line.style.transition = "stroke-dashoffset 850ms var(--ease-smooth)";
        line.style.strokeDashoffset = "0";
      }, index * 260);
    });
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateLines();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(contactSection);
})();
