// Sole responsibility: configure ticker strip behavior.
(function setupTicker() {
  const tickerTrack = document.querySelector(".ticker__track");
  if (!tickerTrack) return;

  tickerTrack.setAttribute("aria-live", "off");
})();
