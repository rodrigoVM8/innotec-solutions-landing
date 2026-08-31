(function () {
  "use strict";

  var data = window.TURISMO_DEMO;
  if (!data) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
    var phone = data.company.phoneWa || "51973771415";
    return (
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(message || data.company.whatsappMessage)
    );
  }

  function consultUrl(name) {
    var prefix = data.company.whatsappConsultPrefix || "Hola, me interesa consultar: ";
    return waUrl(prefix + name);
  }

  function expIcon(name) {
    var icons = {
      day: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2"/>',
      adventure: '<path d="M3 20l9-16 9 16H3z" fill="none" stroke="currentColor" stroke-width="2"/>',
      food: '<path d="M8 3v8M16 3v8M4 11h16v2H4z" stroke="currentColor" stroke-width="2" fill="none"/>',
      culture: '<path d="M12 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" fill="none" stroke="currentColor" stroke-width="2"/>',
      weekend: '<rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" stroke-width="2"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || icons.day) + "</svg>";
  }

  function benefitIcon(name) {
    var icons = {
      care: '<path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="2"/>',
      guide: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="currentColor" stroke-width="2"/>',
      secure: '<rect x="3" y="11" width="18" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="currentColor" stroke-width="2"/>',
      authentic: '<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="none" stroke="currentColor" stroke-width="2"/>'
    };
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || icons.care) + "</svg>";
  }

  function initBranding() {
    var c = data.company;
    document.title = c.name + " | Hospedaje y tours en Perú";

    var logoText = document.getElementById("tv-logo-text");
    if (logoText) logoText.textContent = "Andes Soul";

    var heroTagline = document.getElementById("tv-hero-tagline");
    if (heroTagline) heroTagline.textContent = c.tagline;

    var heroImg = document.getElementById("tv-hero-img");
    if (heroImg) {
      heroImg.src = data.hero.image;
      heroImg.alt = data.hero.imageAlt;
    }

    var heroTitle = document.getElementById("tv-hero-title");
    if (heroTitle) heroTitle.textContent = data.hero.headline;

    var heroLead = document.getElementById("tv-hero-lead");
    if (heroLead) heroLead.textContent = data.hero.subtext;

    var waFab = document.getElementById("tv-fab-wa");
    if (waFab) waFab.href = waUrl();

    var heroWa = document.getElementById("tv-hero-wa");
    if (heroWa) heroWa.href = waUrl(c.whatsappReserveMessage);

    var contactWa = document.getElementById("tv-contact-wa");
    if (contactWa) contactWa.href = waUrl();

    var footerName = document.getElementById("tv-footer-name");
    if (footerName) footerName.textContent = c.name;

    var contactPhone = document.getElementById("tv-contact-phone");
    if (contactPhone) contactPhone.textContent = c.phone;

    var contactEmail = document.getElementById("tv-contact-email");
    if (contactEmail) {
      contactEmail.textContent = c.email;
      contactEmail.href = "mailto:" + c.email;
    }

    var contactAddress = document.getElementById("tv-contact-address");
    if (contactAddress) contactAddress.textContent = c.address;

    var contactHours = document.getElementById("tv-contact-hours");
    if (contactHours) contactHours.textContent = c.hours;

    var mapFrame = document.getElementById("tv-map");
    if (mapFrame) mapFrame.src = c.mapEmbed;

    renderSocial();
  }

  function renderSocial() {
    var el = document.getElementById("tv-social");
    if (!el || !data.company.social) return;
    var labels = { instagram: "Instagram", facebook: "Facebook", tripadvisor: "TripAdvisor" };
    el.innerHTML = Object.keys(data.company.social)
      .map(function (key) {
        return (
          '<a href="' +
          escapeHtml(data.company.social[key]) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(labels[key] || key) +
          "</a>"
        );
      })
      .join("");
  }

  function renderExperiences() {
    var el = document.getElementById("tv-exp-grid");
    if (!el) return;
    el.innerHTML = data.experiences
      .map(function (e, i) {
        return (
          '<article class="tv-exp-card tv-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="tv-exp-media">' +
          '<img src="' +
          escapeHtml(e.image) +
          '" alt="' +
          escapeHtml(e.title) +
          '" width="400" height="250" loading="lazy" />' +
          "</div>" +
          '<div class="tv-exp-body">' +
          '<div class="tv-exp-icon">' +
          expIcon(e.icon) +
          "</div>" +
          "<h3>" +
          escapeHtml(e.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(e.description) +
          "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".tv-reveal"));
  }

  function renderDestinations() {
    var el = document.getElementById("tv-dest-carousel");
    if (!el) return;
    el.innerHTML = data.destinations
      .map(function (d) {
        return (
          '<article class="tv-dest-card">' +
          '<img src="' +
          escapeHtml(d.image) +
          '" alt="' +
          escapeHtml(d.name) +
          '" width="280" height="373" loading="lazy" />' +
          '<div class="tv-dest-label">' +
          "<h4>" +
          escapeHtml(d.name) +
          "</h4>" +
          "<p>" +
          escapeHtml(d.region) +
          "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderRooms() {
    var el = document.getElementById("tv-rooms-grid");
    if (!el) return;
    el.innerHTML = data.rooms
      .map(function (r, i) {
        var tags = r.services
          .map(function (s) {
            return '<span class="tv-room-tag">' + escapeHtml(s) + "</span>";
          })
          .join("");
        return (
          '<article class="tv-room-card tv-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="tv-room-media">' +
          '<img src="' +
          escapeHtml(r.image) +
          '" alt="' +
          escapeHtml(r.name) +
          '" width="400" height="250" loading="lazy" />' +
          "</div>" +
          '<div class="tv-room-body">' +
          "<h3>" +
          escapeHtml(r.name) +
          "</h3>" +
          '<p class="tv-room-capacity">' +
          escapeHtml(r.capacity) +
          "</p>" +
          '<div class="tv-room-services">' +
          tags +
          "</div>" +
          '<p class="tv-price">' +
          escapeHtml(r.price) +
          "</p>" +
          '<a class="tv-btn tv-btn--primary tv-btn--sm" href="' +
          consultUrl(r.name) +
          '" target="_blank" rel="noopener noreferrer">Consultar disponibilidad</a>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".tv-reveal"));
  }

  function renderItineraries() {
    var el = document.getElementById("tv-itin-grid");
    if (!el) return;
    el.innerHTML = data.itineraries
      .map(function (it, i) {
        return (
          '<button type="button" class="tv-itin-card tv-reveal" data-itin="' +
          escapeHtml(it.id) +
          '" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="tv-itin-media">' +
          '<img src="' +
          escapeHtml(it.image) +
          '" alt="' +
          escapeHtml(it.title) +
          '" width="400" height="225" loading="lazy" />' +
          "</div>" +
          '<div class="tv-itin-body">' +
          '<div class="tv-itin-meta">' +
          '<span class="tv-itin-badge">' +
          escapeHtml(it.duration) +
          "</span>" +
          '<span class="tv-itin-badge tv-itin-badge--diff">' +
          escapeHtml(it.difficulty) +
          "</span>" +
          "</div>" +
          "<h3>" +
          escapeHtml(it.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(it.description) +
          "</p>" +
          '<p class="tv-price">' +
          escapeHtml(it.price) +
          "</p>" +
          '<span class="tv-btn tv-btn--ghost tv-btn--sm">Ver detalle →</span>' +
          "</div>" +
          "</button>"
        );
      })
      .join("");

    el.querySelectorAll(".tv-itin-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openItinModal(card.getAttribute("data-itin"));
      });
    });
    observeReveal(el.querySelectorAll(".tv-reveal"));
  }

  function openItinModal(id) {
    var it = data.itineraries.find(function (i) {
      return i.id === id;
    });
    if (!it) return;

    var modal = document.getElementById("tv-modal");
    var body = document.getElementById("tv-modal-body");
    if (!modal || !body) return;

    var includes = it.includes
      .map(function (x) {
        return "<li>" + escapeHtml(x) + "</li>";
      })
      .join("");
    var excludes = it.excludes
      .map(function (x) {
        return "<li>" + escapeHtml(x) + "</li>";
      })
      .join("");

    body.innerHTML =
      '<button type="button" class="tv-modal-close" aria-label="Cerrar">×</button>' +
      '<img class="tv-modal-img" src="' +
      escapeHtml(it.image) +
      '" alt="' +
      escapeHtml(it.title) +
      '" />' +
      '<div class="tv-modal-body">' +
      '<div class="tv-itin-meta">' +
      '<span class="tv-itin-badge">' +
      escapeHtml(it.duration) +
      "</span>" +
      '<span class="tv-itin-badge tv-itin-badge--diff">' +
      escapeHtml(it.difficulty) +
      "</span>" +
      "</div>" +
      "<h2>" +
      escapeHtml(it.title) +
      "</h2>" +
      "<p>" +
      escapeHtml(it.description) +
      "</p>" +
      '<p class="tv-price">' +
      escapeHtml(it.price) +
      "</p>" +
      '<div class="tv-modal-lists">' +
      "<div><h4>Incluye</h4><ul>" +
      includes +
      "</ul></div>" +
      "<div><h4>No incluye</h4><ul>" +
      excludes +
      "</ul></div>" +
      "</div>" +
      '<a class="tv-btn tv-btn--primary tv-btn--sm" href="' +
      consultUrl(it.title) +
      '" target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>' +
      "</div>";

    body.querySelector(".tv-modal-close").addEventListener("click", closeModal);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    body.querySelector(".tv-modal-close").focus();
  }

  function closeModal() {
    var modal = document.getElementById("tv-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModal() {
    var modal = document.getElementById("tv-modal");
    if (!modal) return;
    modal.querySelector(".tv-modal-overlay").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function renderBenefits() {
    var el = document.getElementById("tv-benefits-grid");
    if (!el) return;
    el.innerHTML = data.benefits
      .map(function (b, i) {
        return (
          '<article class="tv-benefit-card tv-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="tv-benefit-icon">' +
          benefitIcon(b.icon) +
          "</div>" +
          "<h3>" +
          escapeHtml(b.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(b.description) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".tv-reveal"));
  }

  function renderGallery() {
    var el = document.getElementById("tv-gallery");
    if (!el) return;
    el.innerHTML = data.gallery
      .map(function (g, i) {
        return (
          '<div class="tv-gallery-item tv-reveal" style="transition-delay:' +
          i * 0.04 +
          's">' +
          '<img src="' +
          escapeHtml(g.image) +
          '" alt="' +
          escapeHtml(g.alt) +
          '" width="400" height="400" loading="lazy" />' +
          "</div>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".tv-reveal"));
  }

  function renderTestimonials() {
    var track = document.getElementById("tv-testimonial-slides");
    var dots = document.getElementById("tv-testimonial-dots");
    if (!track || !dots) return;

    track.innerHTML = data.testimonials
      .map(function (t) {
        return (
          '<blockquote class="tv-testimonial-slide">' +
          '<p class="tv-testimonial-quote">' +
          escapeHtml(t.quote) +
          "</p>" +
          '<footer class="tv-testimonial-author">' +
          escapeHtml(t.name) +
          "</footer>" +
          '<p class="tv-testimonial-role">' +
          escapeHtml(t.role) +
          "</p>" +
          "</blockquote>"
        );
      })
      .join("");

    dots.innerHTML = data.testimonials
      .map(function (_, i) {
        return (
          '<button type="button" class="tv-testimonial-dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Testimonio ' +
          (i + 1) +
          '" data-index="' +
          i +
          '"></button>'
        );
      })
      .join("");

    dots.querySelectorAll(".tv-testimonial-dot").forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToTestimonial(parseInt(dot.getAttribute("data-index"), 10));
        resetTestimonialAutoplay();
      });
    });

    if (!reducedMotion) startTestimonialAutoplay();
  }

  function goToTestimonial(index) {
    var track = document.getElementById("tv-testimonial-slides");
    var dots = document.getElementById("tv-testimonial-dots");
    if (!track || !data.testimonials.length) return;
    testimonialIndex =
      ((index % data.testimonials.length) + data.testimonials.length) %
      data.testimonials.length;
    track.style.transform = "translateX(-" + testimonialIndex * 100 + "%)";
    if (dots) {
      dots.querySelectorAll(".tv-testimonial-dot").forEach(function (d, i) {
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

  function renderFaq() {
    var el = document.getElementById("tv-faq");
    if (!el) return;
    el.innerHTML = data.faq
      .map(function (item, i) {
        return (
          '<div class="tv-faq-item' +
          (i === 0 ? " is-open" : "") +
          '">' +
          '<button type="button" class="tv-faq-trigger" aria-expanded="' +
          (i === 0 ? "true" : "false") +
          '">' +
          escapeHtml(item.question) +
          "</button>" +
          '<div class="tv-faq-panel">' +
          '<div class="tv-faq-panel-inner">' +
          escapeHtml(item.answer) +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    el.querySelectorAll(".tv-faq-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = trigger.closest(".tv-faq-item");
        var panel = item.querySelector(".tv-faq-panel");
        var isOpen = item.classList.contains("is-open");

        el.querySelectorAll(".tv-faq-item").forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".tv-faq-trigger").setAttribute("aria-expanded", "false");
          other.querySelector(".tv-faq-panel").style.maxHeight = "0";
        });

        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    var firstItem = el.querySelector(".tv-faq-item.is-open");
    if (firstItem) {
      var firstPanel = firstItem.querySelector(".tv-faq-panel");
      if (firstPanel) firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
    }
  }

  function renderFormOptions() {
    var typeSelect = document.getElementById("tv-type-select");
    var dateSelect = document.getElementById("tv-date-select");
    if (typeSelect && data.form.types) {
      typeSelect.innerHTML =
        '<option value="">Tipo de consulta</option>' +
        data.form.types
          .map(function (t) {
            return '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + "</option>";
          })
          .join("");
    }
    if (dateSelect && data.form.dates) {
      dateSelect.innerHTML =
        '<option value="">Fechas preferidas</option>' +
        data.form.dates
          .map(function (d) {
            return '<option value="' + escapeHtml(d) + '">' + escapeHtml(d) + "</option>";
          })
          .join("");
    }
  }

  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (wrap) {
      var carousel = wrap.querySelector(".tv-carousel");
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
    var nav = document.getElementById("tv-nav");
    var toggle = document.getElementById("tv-nav-toggle");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".tv-nav-mobile a, .tv-nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initForm() {
    var form = document.getElementById("tv-contact-form");
    var success = document.getElementById("tv-form-success");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var valid = true;

      [name, phone].forEach(function (field) {
        if (!field || !field.value.trim()) {
          if (field) field.style.borderColor = "#ef4444";
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
    observeReveal(document.querySelectorAll(".tv-reveal"));
  }

  initBranding();
  renderExperiences();
  renderDestinations();
  renderRooms();
  renderItineraries();
  renderBenefits();
  renderGallery();
  renderTestimonials();
  renderFaq();
  renderFormOptions();
  initModal();
  initCarousels();
  initNav();
  initForm();
  initReveal();
})();
