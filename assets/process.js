(function () {
  "use strict";

  var steps = window.INNOTEC_PROCESS_STEPS;
  var container = document.getElementById("process-flow");
  if (!steps || !steps.length || !container) return;

  var icons = {
    chat:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>',
    search:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>',
    document:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>',
    code:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>',
    check:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>'
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderIcon(name) {
    return icons[name] || icons.chat;
  }

  container.innerHTML = steps
    .map(function (step, index) {
      var connector =
        index < steps.length - 1
          ? '<span class="process-connector" aria-hidden="true"></span>'
          : "";
      return (
        '<li class="process-step reveal">' +
        '<div class="process-step-node">' +
        '<span class="process-number">' +
        escapeHtml(step.number) +
        "</span>" +
        '<div class="process-icon">' +
        renderIcon(step.icon) +
        "</div>" +
        "</div>" +
        "<h3>" +
        escapeHtml(step.title) +
        "</h3>" +
        "<p>" +
        escapeHtml(step.description) +
        "</p>" +
        connector +
        "</li>"
      );
    })
    .join("");
})();
