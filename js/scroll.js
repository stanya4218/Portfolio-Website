// Sole responsibility: handle section reveals and nav theme transitions on scroll.
(function setupScrollBehaviors() {
  const reveals = document.querySelectorAll("[data-reveal]");
  const header = document.querySelector(".site-header");
  const navSections = document.querySelectorAll("section[data-nav]");

  if (header) {
    header.setAttribute("data-theme", "light");
  }

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  reveals.forEach((node) => revealObserver.observe(node));

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && header) {
          const theme = entry.target.getAttribute("data-nav") || "light";
          header.setAttribute("data-theme", theme);
        }
      });
    },
    { threshold: 0.45 }
  );

  navSections.forEach((section) => navObserver.observe(section));
})();
