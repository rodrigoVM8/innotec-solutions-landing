(function () {
  "use strict";

  var bar = document.getElementById("promo-bar");
  var closeBtn = document.getElementById("promo-close");
  var storageKey = "innotec-promo-dismissed";

  if (!bar) return;

  if (localStorage.getItem(storageKey) === "1") {
    document.body.classList.add("promo-dismissed");
    bar.hidden = true;
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      document.body.classList.add("promo-dismissed");
      bar.hidden = true;
      try {
        localStorage.setItem(storageKey, "1");
      } catch (e) {
        /* ignore */
      }
    });
  }
})();
