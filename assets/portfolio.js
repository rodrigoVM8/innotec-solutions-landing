(function () {
  "use strict";

  var projects = window.INNOTEC_PROJECTS;
  var filters = window.INNOTEC_PORTFOLIO_FILTERS;
  if (!projects || !projects.length) return;

  var assetBase = document.documentElement.getAttribute("data-asset-base") || "";
  var activeFilter = "all";

  var featuredEl = document.getElementById("portfolio-featured");
  var gridEl = document.getElementById("portfolio-grid");
  var filtersEl = document.getElementById("portfolio-filters");
  if (!gridEl) return;

  function resolveAsset(path) {
    if (!path) return assetBase + "assets/projects/placeholder.svg";
    if (path.indexOf("http") === 0 || path.indexOf("/") === 0) return path;
    return assetBase + path;
  }

  function resolveDetail(url) {
    if (!url) return "#";
    if (url.indexOf("http") === 0) return url;
    if (assetBase) return url.replace(/^\/?proyectos\//, "");
    return url;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderTags(technologies, limit) {
    var tags = (technologies || []).slice(0, limit || 4);
    return tags
      .map(function (t) {
        return '<span class="tag">' + escapeHtml(t) + "</span>";
      })
      .join("");
  }

  function matchesFilter(project) {
    if (activeFilter === "all") return true;
    return (project.filters || []).indexOf(activeFilter) !== -1;
  }

  function renderFeatured(project) {
    if (!featuredEl || !project) {
      if (featuredEl) featuredEl.innerHTML = "";
      return;
    }
    featuredEl.innerHTML =
      '<a class="portfolio-featured reveal" href="' +
      escapeHtml(resolveDetail(project.detailUrl)) +
      '">' +
      '<div class="portfolio-featured-media">' +
      '<img src="' +
      escapeHtml(resolveAsset(project.image)) +
      '" alt="' +
      escapeHtml(project.imageAlt || project.title) +
      '" width="1200" height="675" loading="eager" />' +
      "</div>" +
      '<div class="portfolio-featured-body">' +
      '<span class="portfolio-featured-label">Proyecto destacado</span>' +
      '<p class="project-category">' +
      escapeHtml(project.category) +
      "</p>" +
      "<h2>" +
      escapeHtml(project.title) +
      "</h2>" +
      "<p>" +
      escapeHtml(project.shortDescription) +
      "</p>" +
      '<div class="project-tags">' +
      renderTags(project.technologies, 5) +
      "</div>" +
      '<span class="read-more">Ver proyecto →</span>' +
      "</div>" +
      "</a>";
  }

  function renderGrid() {
    var visible = projects.filter(function (p) {
      return !p.featured && matchesFilter(p);
    });

    if (!visible.length) {
      gridEl.innerHTML =
        '<p class="project-card-desc" style="grid-column:1/-1;padding:1rem 0">No hay proyectos en esta categoría.</p>';
      return;
    }

    gridEl.innerHTML = visible
      .map(function (project) {
        return (
          '<a class="project-card reveal" href="' +
          escapeHtml(resolveDetail(project.detailUrl)) +
          '" data-filters="' +
          escapeHtml((project.filters || []).join(" ")) +
          '">' +
          '<div class="project-card-media">' +
          '<img src="' +
          escapeHtml(resolveAsset(project.image)) +
          '" alt="' +
          escapeHtml(project.imageAlt || project.title) +
          '" width="800" height="500" loading="lazy" />' +
          "</div>" +
          '<div class="project-card-body">' +
          '<span class="project-category">' +
          escapeHtml(project.category) +
          "</span>" +
          "<h3>" +
          escapeHtml(project.title) +
          "</h3>" +
          '<p class="project-card-desc">' +
          escapeHtml(project.shortDescription) +
          "</p>" +
          '<div class="project-tags">' +
          renderTags(project.technologies, 4) +
          "</div>" +
          '<span class="read-more">Ver proyecto →</span>' +
          "</div>" +
          "</a>"
        );
      })
      .join("");

    observeReveal(gridEl.querySelectorAll(".reveal"));
  }

  function renderFilters() {
    if (!filtersEl || !filters) return;
    filtersEl.innerHTML = filters
      .map(function (f) {
        var pressed = f.id === activeFilter ? ' aria-pressed="true"' : ' aria-pressed="false"';
        var activeClass = f.id === activeFilter ? " is-active" : "";
        return (
          '<button type="button" class="filter-btn' +
          activeClass +
          '" data-filter="' +
          escapeHtml(f.id) +
          '"' +
          pressed +
          ">" +
          escapeHtml(f.label) +
          "</button>"
        );
      })
      .join("");

    filtersEl.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-filter") || "all";
        filtersEl.querySelectorAll(".filter-btn").forEach(function (b) {
          var isActive = b === btn;
          b.classList.toggle("is-active", isActive);
          b.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
        renderGrid();
      });
    });
  }

  function observeReveal(nodes) {
    if (!nodes || !nodes.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      observer.observe(el);
    });
  }

  var featuredProject =
    projects.find(function (p) {
      return p.featured;
    }) || projects[0];

  renderFeatured(featuredProject);
  renderFilters();
  renderGrid();
  observeReveal(document.querySelectorAll(".portfolio-hero .reveal, #portfolio-featured .reveal"));
})();
