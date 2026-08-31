(function () {
  "use strict";

  var data = window.RESTAURANTE_DEMO;
  if (!data) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var activeCategory = data.menuCategories[0] ? data.menuCategories[0].id : "";
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

  function orderUrl(dishName) {
    var prefix = data.company.whatsappOrderPrefix || "Hola, quiero pedir: ";
    return waUrl(prefix + dishName);
  }

  function initBranding() {
    var c = data.company;
    document.title = c.name + " | Restaurante peruano";

    var logoName = document.getElementById("rs-logo-name");
    if (logoName) logoName.textContent = c.name.split(" ")[0] || "Sabor";

    var heroTagline = document.getElementById("rs-hero-tagline");
    if (heroTagline) heroTagline.textContent = c.tagline;

    var heroImg = document.getElementById("rs-hero-img");
    if (heroImg) {
      heroImg.src = data.hero.image;
      heroImg.alt = data.hero.imageAlt;
    }

    var heroTitle = document.getElementById("rs-hero-title");
    if (heroTitle) heroTitle.textContent = data.hero.headline;

    var heroLead = document.getElementById("rs-hero-lead");
    if (heroLead) heroLead.textContent = data.hero.subtext;

    var waFab = document.getElementById("rs-fab-wa");
    if (waFab) waFab.href = waUrl();

    var heroWa = document.getElementById("rs-hero-wa");
    if (heroWa) heroWa.href = waUrl();

    var heroReserve = document.getElementById("rs-hero-reserve");
    if (heroReserve) heroReserve.href = waUrl(c.whatsappReserveMessage);

    var contactWa = document.getElementById("rs-contact-wa");
    if (contactWa) contactWa.href = waUrl();

    var footerName = document.getElementById("rs-footer-name");
    if (footerName) footerName.textContent = c.name;

    var contactPhone = document.getElementById("rs-contact-phone");
    if (contactPhone) contactPhone.textContent = c.phone;

    var contactEmail = document.getElementById("rs-contact-email");
    if (contactEmail) {
      contactEmail.textContent = c.email;
      contactEmail.href = "mailto:" + c.email;
    }

    var contactAddress = document.getElementById("rs-contact-address");
    if (contactAddress) contactAddress.textContent = c.address;

    var contactHours = document.getElementById("rs-contact-hours");
    if (contactHours) contactHours.textContent = c.hours;

    var mapFrame = document.getElementById("rs-map");
    if (mapFrame) mapFrame.src = c.mapEmbed;

    renderSocial();
    renderDelivery();
    renderMenuDelDia();
    renderPromotion();
    renderStory();
  }

  function renderSocial() {
    var el = document.getElementById("rs-social");
    if (!el || !data.company.social) return;
    var labels = { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" };
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

  function renderDelivery() {
    var el = document.getElementById("rs-delivery");
    if (!el || !data.company.delivery) return;
    el.innerHTML = data.company.delivery
      .map(function (d) {
        return (
          '<a href="' +
          escapeHtml(d.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          escapeHtml(d.name) +
          "</a>"
        );
      })
      .join("");
  }

  function renderFeatured() {
    var el = document.getElementById("rs-featured-carousel");
    if (!el || !data.featured) return;
    el.innerHTML = data.featured
      .map(function (d) {
        return (
          '<article class="rs-featured-card">' +
          '<div class="rs-featured-media">' +
          '<img src="' +
          escapeHtml(d.image) +
          '" alt="' +
          escapeHtml(d.name) +
          '" width="300" height="225" loading="lazy" />' +
          "</div>" +
          '<div class="rs-featured-body">' +
          "<h4>" +
          escapeHtml(d.name) +
          "</h4>" +
          "<p>" +
          escapeHtml(d.description) +
          "</p>" +
          '<div class="rs-price">' +
          escapeHtml(d.price) +
          "</div>" +
          '<a class="rs-btn rs-btn--primary rs-btn--sm" style="margin-top:0.65rem" href="' +
          orderUrl(d.name) +
          '" target="_blank" rel="noopener noreferrer">Pedir</a>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderMenuTabs() {
    var el = document.getElementById("rs-menu-tabs");
    if (!el) return;
    el.innerHTML = data.menuCategories
      .map(function (cat) {
        var active = cat.id === activeCategory ? " is-active" : "";
        var pressed = cat.id === activeCategory ? "true" : "false";
        return (
          '<button type="button" class="rs-menu-tab' +
          active +
          '" data-category="' +
          escapeHtml(cat.id) +
          '" aria-pressed="' +
          pressed +
          '">' +
          escapeHtml(cat.label) +
          "</button>"
        );
      })
      .join("");

    el.querySelectorAll(".rs-menu-tab").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-category") || "";
        renderMenuTabs();
        renderMenuGrid();
      });
    });
  }

  function renderMenuGrid() {
    var el = document.getElementById("rs-menu-grid");
    if (!el) return;
    var category = data.menuCategories.find(function (c) {
      return c.id === activeCategory;
    });
    var items = category ? category.items : [];
    el.innerHTML = items
      .map(function (item, i) {
        return (
          '<article class="rs-menu-item rs-reveal" style="transition-delay:' +
          i * 0.05 +
          's">' +
          '<div class="rs-menu-item-media">' +
          '<img src="' +
          escapeHtml(item.image) +
          '" alt="' +
          escapeHtml(item.name) +
          '" width="400" height="250" loading="lazy" />' +
          "</div>" +
          '<div class="rs-menu-item-body">' +
          '<div class="rs-menu-item-head">' +
          "<h3>" +
          escapeHtml(item.name) +
          "</h3>" +
          '<span class="rs-price">' +
          escapeHtml(item.price) +
          "</span>" +
          "</div>" +
          "<p>" +
          escapeHtml(item.description) +
          "</p>" +
          '<div class="rs-menu-item-actions">' +
          '<a class="rs-btn rs-btn--primary rs-btn--sm" href="' +
          orderUrl(item.name) +
          '" target="_blank" rel="noopener noreferrer">Pedir por WhatsApp</a>' +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".rs-reveal"));
  }

  function renderStory() {
    var s = data.story;
    if (!s) return;
    var title = document.getElementById("rs-story-title");
    if (title) title.textContent = s.title;

    var img = document.getElementById("rs-story-img");
    if (img) {
      img.src = s.image;
      img.alt = s.imageAlt || s.title;
    }

    var body = document.getElementById("rs-story-body");
    if (body && s.paragraphs) {
      body.innerHTML = s.paragraphs
        .map(function (p) {
          return "<p>" + escapeHtml(p) + "</p>";
        })
        .join("");
    }
  }

  function renderGallery() {
    var el = document.getElementById("rs-gallery");
    if (!el || !data.gallery) return;
    el.innerHTML = data.gallery
      .map(function (g, i) {
        return (
          '<div class="rs-gallery-item rs-reveal" style="transition-delay:' +
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
    observeReveal(el.querySelectorAll(".rs-reveal"));
  }

  function renderMenuDelDia() {
    var m = data.menuDelDia;
    if (!m) return;
    var el = document.getElementById("rs-menu-dia");
    if (!el) return;
    el.innerHTML =
      "<h3>" +
      escapeHtml(m.title) +
      "</h3>" +
      '<p class="rs-menu-dia-price">' +
      escapeHtml(m.price) +
      "</p>" +
      "<p>" +
      escapeHtml(m.includes) +
      "</p>" +
      "<p>" +
      escapeHtml(m.description) +
      "</p>" +
      '<p class="rs-menu-dia-meta">' +
      escapeHtml(m.validDays) +
      "</p>";
  }

  function renderPromotion() {
    var p = data.promotion;
    if (!p) return;
    var badge = document.getElementById("rs-promo-badge");
    if (badge) badge.textContent = p.badge;

    var title = document.getElementById("rs-promo-title");
    if (title) title.textContent = p.title;

    var desc = document.getElementById("rs-promo-desc");
    if (desc) desc.textContent = p.description;

    var img = document.getElementById("rs-promo-img");
    if (img) {
      img.src = p.image;
      img.alt = p.title;
    }

    var cta = document.getElementById("rs-promo-cta");
    if (cta) {
      cta.textContent = p.cta;
      cta.href = waUrl(data.company.whatsappReserveMessage);
    }
  }

  function renderTestimonials() {
    var track = document.getElementById("rs-testimonial-slides");
    var dots = document.getElementById("rs-testimonial-dots");
    if (!track || !dots) return;

    track.innerHTML = data.testimonials
      .map(function (t) {
        return (
          '<blockquote class="rs-testimonial-slide">' +
          '<p class="rs-testimonial-quote">' +
          escapeHtml(t.quote) +
          "</p>" +
          '<footer class="rs-testimonial-author">' +
          escapeHtml(t.name) +
          "</footer>" +
          '<p class="rs-testimonial-role">' +
          escapeHtml(t.role) +
          "</p>" +
          "</blockquote>"
        );
      })
      .join("");

    dots.innerHTML = data.testimonials
      .map(function (_, i) {
        return (
          '<button type="button" class="rs-testimonial-dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Testimonio ' +
          (i + 1) +
          '" data-index="' +
          i +
          '"></button>'
        );
      })
      .join("");

    dots.querySelectorAll(".rs-testimonial-dot").forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToTestimonial(parseInt(dot.getAttribute("data-index"), 10));
        resetTestimonialAutoplay();
      });
    });

    if (!reducedMotion) startTestimonialAutoplay();
  }

  function goToTestimonial(index) {
    var track = document.getElementById("rs-testimonial-slides");
    var dots = document.getElementById("rs-testimonial-dots");
    if (!track || !data.testimonials.length) return;
    testimonialIndex =
      ((index % data.testimonials.length) + data.testimonials.length) %
      data.testimonials.length;
    track.style.transform = "translateX(-" + testimonialIndex * 100 + "%)";
    if (dots) {
      dots.querySelectorAll(".rs-testimonial-dot").forEach(function (d, i) {
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
      var carousel = wrap.querySelector(".rs-carousel");
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
    var nav = document.getElementById("rs-nav");
    var toggle = document.getElementById("rs-nav-toggle");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".rs-nav-mobile a, .rs-nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
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
    observeReveal(document.querySelectorAll(".rs-reveal"));
  }

  initBranding();
  renderFeatured();
  renderMenuTabs();
  renderMenuGrid();
  renderGallery();
  renderTestimonials();
  initCarousels();
  initNav();
  initReveal();
})();
