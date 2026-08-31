(function () {
  "use strict";

  var data = window.DRYWALL_DEMO;
  if (!data) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var activeFilter = "all";
  var testimonialIndex = 0;
  var testimonialTimer = null;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function waUrl(message) {
    var phone = data.company.phoneWa || "51999123456";
    return (
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(message || data.company.whatsappMessage)
    );
  }

  function serviceIcon(name) {
    var icons = {
      wall: '<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>',
      ceiling: '<rect x="2" y="6" width="20" height="4" rx="1" fill="none" stroke="currentColor" stroke-width="2"/><line x1="6" y1="10" x2="6" y2="18" stroke="currentColor" stroke-width="2"/><line x1="12" y1="10" x2="12" y2="18" stroke="currentColor" stroke-width="2"/><line x1="18" y1="10" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>',
      frame: '<path d="M4 4h16v16H4z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 12h16M12 4v16" stroke="currentColor" stroke-width="2"/>',
      sound: '<path d="M11 5L6 9H3v6h3l5 4V5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 9a4 4 0 010 6M17 7a7 7 0 010 10" fill="none" stroke="currentColor" stroke-width="2"/>',
      remodel: '<path d="M3 21h18M5 21V7l7-4 7 4v14" fill="none" stroke="currentColor" stroke-width="2"/><rect x="9" y="13" width="6" height="8" fill="none" stroke="currentColor" stroke-width="2"/>',
      paint: '<path d="M14 3l7 7-9 9H5v-7l9-9z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 5l2 2" stroke="currentColor" stroke-width="2"/>',
      repair: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2 2" fill="none" stroke="currentColor" stroke-width="2"/>'
    };
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      (icons[name] || icons.wall) +
      "</svg>"
    );
  }

  function initBranding() {
    var c = data.company;
    document.title = c.name + " | Drywall y construcción en seco";

    var logoName = document.getElementById("dw-logo-name");
    if (logoName) logoName.textContent = c.name.split(" ")[0] || "Pro";

    var heroImg = document.getElementById("dw-hero-img");
    if (heroImg) {
      heroImg.src = data.hero.image;
      heroImg.alt = data.hero.imageAlt;
    }

    var heroTitle = document.getElementById("dw-hero-title");
    if (heroTitle) heroTitle.textContent = data.hero.headline;

    var heroLead = document.getElementById("dw-hero-lead");
    if (heroLead) heroLead.textContent = data.hero.subtext;

    var waFab = document.getElementById("dw-fab-wa");
    if (waFab) waFab.href = waUrl();

    var footerName = document.getElementById("dw-footer-name");
    if (footerName) footerName.textContent = c.name;

    var contactPhone = document.getElementById("dw-contact-phone");
    if (contactPhone) contactPhone.textContent = c.phone;

    var contactEmail = document.getElementById("dw-contact-email");
    if (contactEmail) {
      contactEmail.textContent = c.email;
      contactEmail.href = "mailto:" + c.email;
    }

    var contactAddress = document.getElementById("dw-contact-address");
    if (contactAddress) contactAddress.textContent = c.address;

    var contactHours = document.getElementById("dw-contact-hours");
    if (contactHours) contactHours.textContent = c.hours;

    var contactArea = document.getElementById("dw-contact-area");
    if (contactArea) contactArea.textContent = c.serviceArea;

    var mapFrame = document.getElementById("dw-map");
    if (mapFrame) mapFrame.src = c.mapEmbed;

    var ctaTitle = document.getElementById("dw-cta-title");
    if (ctaTitle) ctaTitle.textContent = data.cta.title;

    var ctaText = document.getElementById("dw-cta-text");
    if (ctaText) ctaText.textContent = data.cta.text;

    var ctaBtn = document.getElementById("dw-cta-btn");
    if (ctaBtn) {
      ctaBtn.textContent = data.cta.button;
      ctaBtn.href = "#contacto";
    }

    var heroQuote = document.getElementById("dw-hero-quote");
    if (heroQuote) heroQuote.href = "#contacto";

    var heroProjects = document.getElementById("dw-hero-projects");
    if (heroProjects) heroProjects.href = "#portafolio";
  }

  function renderServices() {
    var el = document.getElementById("dw-services-grid");
    if (!el) return;
    el.innerHTML = data.services
      .map(function (s, i) {
        return (
          '<article class="dw-service-card dw-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="dw-service-icon">' +
          serviceIcon(s.icon) +
          "</div>" +
          "<h3>" +
          escapeHtml(s.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(s.description) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".dw-reveal"));
  }

  function filteredProjects() {
    if (activeFilter === "all") return data.projects;
    return data.projects.filter(function (p) {
      return p.category === activeFilter;
    });
  }

  function renderFilters() {
    var el = document.getElementById("dw-portfolio-filters");
    if (!el) return;
    el.innerHTML = data.portfolioFilters
      .map(function (f) {
        var active = f.id === activeFilter ? " is-active" : "";
        var pressed = f.id === activeFilter ? "true" : "false";
        return (
          '<button type="button" class="dw-filter-btn' +
          active +
          '" data-filter="' +
          escapeHtml(f.id) +
          '" aria-pressed="' +
          pressed +
          '">' +
          escapeHtml(f.label) +
          "</button>"
        );
      })
      .join("");

    el.querySelectorAll(".dw-filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-filter") || "all";
        renderFilters();
        renderPortfolioGrid();
        renderCarousel();
      });
    });
  }

  function renderPortfolioGrid() {
    var el = document.getElementById("dw-portfolio-grid");
    if (!el) return;
    var projects = filteredProjects();
    el.innerHTML = projects
      .map(function (p, i) {
        return (
          '<button type="button" class="dw-project-card dw-reveal" data-project="' +
          escapeHtml(p.id) +
          '" style="transition-delay:' +
          i * 0.05 +
          's">' +
          '<div class="dw-project-card-media">' +
          '<img src="' +
          escapeHtml(p.image) +
          '" alt="' +
          escapeHtml(p.title) +
          '" width="800" height="500" loading="lazy" />' +
          "</div>" +
          '<div class="dw-project-card-body">' +
          '<p class="dw-project-category">' +
          escapeHtml(p.categoryLabel) +
          "</p>" +
          "<h3>" +
          escapeHtml(p.title) +
          "</h3>" +
          '<p class="dw-project-location">' +
          escapeHtml(p.location) +
          "</p>" +
          "</div>" +
          "</button>"
        );
      })
      .join("");

    el.querySelectorAll(".dw-project-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openModal(card.getAttribute("data-project"));
      });
    });
    observeReveal(el.querySelectorAll(".dw-reveal"));
  }

  function renderCarousel() {
    var el = document.getElementById("dw-carousel");
    if (!el) return;
    var projects = filteredProjects();
    el.innerHTML = projects
      .map(function (p) {
        return (
          '<article class="dw-carousel-slide">' +
          '<img src="' +
          escapeHtml(p.image) +
          '" alt="' +
          escapeHtml(p.title) +
          '" width="360" height="225" loading="lazy" />' +
          '<div class="dw-carousel-slide-body">' +
          "<h4>" +
          escapeHtml(p.title) +
          "</h4>" +
          "<p>" +
          escapeHtml(p.location) +
          "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function openModal(projectId) {
    var project = data.projects.find(function (p) {
      return p.id === projectId;
    });
    if (!project) return;

    var modal = document.getElementById("dw-modal");
    var body = document.getElementById("dw-modal-body");
    if (!modal || !body) return;

    body.innerHTML =
      '<figure class="dw-modal-images">' +
      '<img src="' +
      escapeHtml(project.beforeImage) +
      '" alt="Antes - ' +
      escapeHtml(project.title) +
      '" />' +
      '<img src="' +
      escapeHtml(project.afterImage) +
      '" alt="Después - ' +
      escapeHtml(project.title) +
      '" />' +
      "<figcaption><span>Antes</span><span>Después</span></figcaption>" +
      "</figure>" +
      '<div class="dw-modal-body">' +
      '<p class="dw-project-category">' +
      escapeHtml(project.categoryLabel) +
      "</p>" +
      "<h2>" +
      escapeHtml(project.title) +
      "</h2>" +
      "<p><strong>Ubicación:</strong> " +
      escapeHtml(project.location) +
      "</p>" +
      "<p>" +
      escapeHtml(project.description) +
      "</p>" +
      '<a class="dw-btn dw-btn--primary dw-btn--sm" href="' +
      waUrl("Hola, vi el proyecto " + project.title + " y quiero una cotización similar.") +
      '" target="_blank" rel="noopener noreferrer">Solicitar cotización similar</a>' +
      "</div>";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".dw-modal-close").focus();
  }

  function closeModal() {
    var modal = document.getElementById("dw-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModal() {
    var modal = document.getElementById("dw-modal");
    if (!modal) return;
    modal.querySelector(".dw-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".dw-modal-overlay").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function renderWhyUs() {
    var benefitsEl = document.getElementById("dw-benefits");
    if (benefitsEl) {
      benefitsEl.innerHTML = data.whyUs.benefits
        .map(function (b, i) {
          return (
            '<div class="dw-benefit dw-reveal" style="transition-delay:' +
            i * 0.05 +
            's">' +
            "<h3>" +
            escapeHtml(b.title) +
            "</h3>" +
            "<p>" +
            escapeHtml(b.description) +
            "</p>" +
            "</div>"
          );
        })
        .join("");
      observeReveal(benefitsEl.querySelectorAll(".dw-reveal"));
    }

    var statsEl = document.getElementById("dw-stats");
    if (statsEl) {
      statsEl.innerHTML = data.whyUs.stats
        .map(function (s) {
          return (
            '<div class="dw-stat dw-reveal">' +
            '<div class="dw-stat-value" data-count="' +
            s.value +
            '" data-suffix="' +
            escapeHtml(s.suffix) +
            '">0' +
            escapeHtml(s.suffix) +
            "</div>" +
            '<div class="dw-stat-label">' +
            escapeHtml(s.label) +
            "</div>" +
            "</div>"
          );
        })
        .join("");
      observeReveal(statsEl.querySelectorAll(".dw-reveal"));
      initCounters(statsEl.querySelectorAll("[data-count]"));
    }
  }

  function initCounters(nodes) {
    if (!nodes.length) return;
    if (reducedMotion) {
      nodes.forEach(function (el) {
        el.textContent = el.getAttribute("data-count") + el.getAttribute("data-suffix");
      });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    nodes.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var start = performance.now();

    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function renderProcess() {
    var el = document.getElementById("dw-process");
    if (!el) return;
    el.innerHTML = data.process
      .map(function (step, i) {
        return (
          '<div class="dw-process-step dw-reveal" style="transition-delay:' +
          i * 0.08 +
          's">' +
          '<div class="dw-process-num">' +
          step.step +
          "</div>" +
          "<div>" +
          "<h3>" +
          escapeHtml(step.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(step.description) +
          "</p>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".dw-reveal"));
  }

  function renderTestimonials() {
    var track = document.getElementById("dw-testimonial-slides");
    var dots = document.getElementById("dw-testimonial-dots");
    if (!track || !dots) return;

    track.innerHTML = data.testimonials
      .map(function (t) {
        return (
          '<blockquote class="dw-testimonial-slide">' +
          '<p class="dw-testimonial-quote">' +
          escapeHtml(t.quote) +
          "</p>" +
          '<footer class="dw-testimonial-author">' +
          escapeHtml(t.name) +
          "</footer>" +
          '<p class="dw-testimonial-role">' +
          escapeHtml(t.role) +
          " · " +
          escapeHtml(t.company) +
          "</p>" +
          "</blockquote>"
        );
      })
      .join("");

    dots.innerHTML = data.testimonials
      .map(function (_, i) {
        return (
          '<button type="button" class="dw-testimonial-dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Testimonio ' +
          (i + 1) +
          '" data-index="' +
          i +
          '"></button>'
        );
      })
      .join("");

    dots.querySelectorAll(".dw-testimonial-dot").forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToTestimonial(parseInt(dot.getAttribute("data-index"), 10));
        resetTestimonialAutoplay();
      });
    });

    if (!reducedMotion) startTestimonialAutoplay();
  }

  function goToTestimonial(index) {
    var track = document.getElementById("dw-testimonial-slides");
    var dots = document.getElementById("dw-testimonial-dots");
    if (!track || !data.testimonials.length) return;
    testimonialIndex = ((index % data.testimonials.length) + data.testimonials.length) % data.testimonials.length;
    track.style.transform = "translateX(-" + testimonialIndex * 100 + "%)";
    if (dots) {
      dots.querySelectorAll(".dw-testimonial-dot").forEach(function (d, i) {
        d.classList.toggle("is-active", i === testimonialIndex);
      });
    }
  }

  function startTestimonialAutoplay() {
    testimonialTimer = setInterval(function () {
      goToTestimonial(testimonialIndex + 1);
    }, 5500);
  }

  function resetTestimonialAutoplay() {
    if (testimonialTimer) clearInterval(testimonialTimer);
    if (!reducedMotion) startTestimonialAutoplay();
  }

  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (wrap) {
      var carousel = wrap.querySelector(".dw-carousel");
      if (!carousel) return;
      var prev = wrap.querySelector("[data-carousel-prev]");
      var next = wrap.querySelector("[data-carousel-next]");
      if (prev) {
        prev.addEventListener("click", function () {
          carousel.scrollBy({ left: -carousel.offsetWidth * 0.8, behavior: "smooth" });
        });
      }
      if (next) {
        next.addEventListener("click", function () {
          carousel.scrollBy({ left: carousel.offsetWidth * 0.8, behavior: "smooth" });
        });
      }
    });
  }

  function initNav() {
    var nav = document.getElementById("dw-nav");
    var toggle = document.getElementById("dw-nav-toggle");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".dw-nav-mobile a, .dw-nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initForm() {
    var form = document.getElementById("dw-contact-form");
    var success = document.getElementById("dw-form-success");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var email = form.querySelector('[name="email"]');
      var valid = true;

      [name, phone, email].forEach(function (field) {
        if (!field.value.trim()) {
          field.style.borderColor = "#ef4444";
          valid = false;
        } else {
          field.style.borderColor = "";
        }
      });

      if (!valid) return;

      form.reset();
      if (success) success.classList.add("is-visible");
      setTimeout(function () {
        if (success) success.classList.remove("is-visible");
      }, 5000);
    });
  }

  function observeReveal(nodes) {
    if (!nodes || !nodes.length) return;
    if (reducedMotion || !("IntersectionObserver" in window)) {
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
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    nodes.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initReveal() {
    observeReveal(document.querySelectorAll(".dw-reveal"));
  }

  initBranding();
  renderServices();
  renderFilters();
  renderPortfolioGrid();
  renderCarousel();
  renderWhyUs();
  renderProcess();
  renderTestimonials();
  initModal();
  initCarousels();
  initNav();
  initForm();
  initReveal();
})();
