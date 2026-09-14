// Sole responsibility: run loader pencil-draw skyline animation with subtle sound hooks.
(function runLoaderAnimation() {
  const loader = document.getElementById("loader");
  const skylinePath = document.querySelector(".skyline-line");
  const pencil = document.querySelector(".loader-pencil");
  const name = document.querySelector(".loader__name");
  const tagline = document.querySelector(".loader__tagline");
  const brickAudio = document.getElementById("brick-audio");
  const year = document.getElementById("footer-year");
  const rootStyles = window.getComputedStyle(document.documentElement);

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  if (!loader || !skylinePath || !pencil || typeof window.gsap === "undefined") {
    return;
  }

  const readVar = (name, fallback) => rootStyles.getPropertyValue(name).trim() || fallback;
  const toSeconds = (value, fallback) => {
    if (!value) return fallback;
    if (value.endsWith("ms")) return Number(value.replace("ms", "")) / 1000;
    if (value.endsWith("s")) return Number(value.replace("s", ""));
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const readNumber = (name, fallback) => {
    const parsed = Number(readVar(name, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  const drawDuration = toSeconds(readVar("--loader-draw-duration", "2.4s"), 2.4);
  const drawSettle = toSeconds(readVar("--loader-draw-settle", "0.3s"), 0.3);
  const nameDuration = toSeconds(readVar("--loader-name-duration", "0.45s"), 0.45);
  const taglineDuration = toSeconds(readVar("--loader-tagline-duration", "0.45s"), 0.45);
  const exitDuration = toSeconds(readVar("--loader-exit-duration", "0.5s"), 0.5);
  const settleHold = toSeconds(readVar("--loader-settle-hold", "0.35s"), 0.35);
  const textOverlap = toSeconds(readVar("--loader-text-overlap", "0.1s"), 0.1);
  const taglineOverlap = toSeconds(readVar("--loader-tagline-overlap", "0.22s"), 0.22);
  const pathLength = skylinePath.getTotalLength();
  const drawState = { progress: 0 };
  const leadOffset = readNumber("--loader-pencil-lead-offset", 2.5);
  const angleSample = readNumber("--loader-pencil-angle-sample", 2);

  skylinePath.style.strokeDasharray = String(pathLength);
  skylinePath.style.strokeDashoffset = String(pathLength);
  pencil.style.opacity = String(readNumber("--opacity-1", 1));
  {
    const startPoint = skylinePath.getPointAtLength(0);
    pencil.setAttribute("transform", `translate(${startPoint.x}, ${startPoint.y}) rotate(0)`);
  }

  const playClick = () => {
    if (!brickAudio) return;
    brickAudio.volume = 0.2;
    brickAudio.currentTime = 0;
    brickAudio.play().catch(() => {
      // Browser may block until user interaction.
    });
  };

  const tl = window.gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: () => {
      window.gsap.to(loader, {
        opacity: 0,
        duration: exitDuration,
        onComplete: () => {
          loader.style.display = "none";
        }
      });
    }
  });

  tl.to(drawState, {
    progress: 1,
    duration: drawDuration,
    onStart: () => {
      playClick();
    },
    onUpdate: () => {
      const drawnLength = pathLength * drawState.progress;
      const safeLength = Math.max(0, Math.min(pathLength, drawnLength));
      const point = skylinePath.getPointAtLength(safeLength);
      const aheadLength = Math.max(0, Math.min(pathLength, safeLength + angleSample));
      const aheadPoint = skylinePath.getPointAtLength(aheadLength);
      const angleDeg = (Math.atan2(aheadPoint.y - point.y, aheadPoint.x - point.x) * 180) / Math.PI;
      const leadX = point.x + Math.cos((angleDeg * Math.PI) / 180) * leadOffset;
      const leadY = point.y + Math.sin((angleDeg * Math.PI) / 180) * leadOffset;
      skylinePath.style.strokeDashoffset = String(pathLength - safeLength);
      pencil.setAttribute("transform", `translate(${leadX}, ${leadY}) rotate(${angleDeg})`);
    }
  }).to({}, { duration: drawSettle });

  tl.to(name, { opacity: 1, duration: nameDuration }, `-=${textOverlap}`)
    .to(tagline, { opacity: 1, duration: taglineDuration }, `-=${taglineOverlap}`)
    .to({}, { duration: settleHold });
})();
