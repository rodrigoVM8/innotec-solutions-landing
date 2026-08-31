(function () {
  "use strict";

  var data = window.CLINICA_DEMO;
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
    var phone = data.company.phoneWa || "51999456789";
    return (
      "https://wa.me/" +
      phone +
      "?text=" +
      encodeURIComponent(message || data.company.whatsappMessage)
    );
  }

  function treatmentIcon(name) {
    var icons = {
      clean: '<path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" fill="none" stroke="currentColor" stroke-width="2"/>',
      align: '<rect x="4" y="8" width="16" height="8" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 12h8" stroke="currentColor" stroke-width="2"/>',
      implant: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" stroke-width="2"/>',
      smile: '<path d="M8 14s1.5 2 4 2 4-2 4-2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" fill="none" stroke="currentColor" stroke-width="2"/>',
      whiten: '<path d="M12 3v18M3 12h18" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>',
      face: '<circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="currentColor" stroke-width="2"/>'
    };
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      (icons[name] || icons.smile) +
      "</svg>"
    );
  }

  function benefitIcon(name) {
    var icons = {
      care: '<path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="2"/>',
      tech: '<rect x="2" y="3" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="2"/>',
      pay: '<rect x="2" y="5" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M2 10h20" stroke="currentColor" stroke-width="2"/>',
      cert: '<path d="M12 2l2.4 4.8 5.3.8-3.8 3.7 1 5.3L12 14.8 7.1 16.6l1-5.3L4.3 7.6l5.3-.8L12 2z" fill="none" stroke="currentColor" stroke-width="2"/>'
    };
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      (icons[name] || icons.care) +
      "</svg>"
    );
  }

  function initBranding() {
    var c = data.company;
    document.title = c.name + " | Clínica dental y estética";

    var logoText = document.getElementById("cl-logo-text");
    if (logoText) logoText.textContent = c.name.split(" ")[0] || "Sonrisa";

    var heroImg = document.getElementById("cl-hero-img");
    if (heroImg) {
      heroImg.src = data.hero.image;
      heroImg.alt = data.hero.imageAlt;
    }

    var heroTitle = document.getElementById("cl-hero-title");
    if (heroTitle) heroTitle.textContent = data.hero.headline;

    var heroLead = document.getElementById("cl-hero-lead");
    if (heroLead) heroLead.textContent = data.hero.subtext;

    var waFab = document.getElementById("cl-fab-wa");
    if (waFab) waFab.href = waUrl();

    var heroWa = document.getElementById("cl-hero-wa");
    if (heroWa) heroWa.href = waUrl();

    var contactWa = document.getElementById("cl-contact-wa");
    if (contactWa) contactWa.href = waUrl();

    var footerName = document.getElementById("cl-footer-name");
    if (footerName) footerName.textContent = c.name;

    var contactPhone = document.getElementById("cl-contact-phone");
    if (contactPhone) contactPhone.textContent = c.phone;

    var contactEmail = document.getElementById("cl-contact-email");
    if (contactEmail) {
      contactEmail.textContent = c.email;
      contactEmail.href = "mailto:" + c.email;
    }

    var contactAddress = document.getElementById("cl-contact-address");
    if (contactAddress) contactAddress.textContent = c.address;

    var contactHours = document.getElementById("cl-contact-hours");
    if (contactHours) contactHours.textContent = c.hours;

    var mapFrame = document.getElementById("cl-map");
    if (mapFrame) mapFrame.src = c.mapEmbed;
  }

  function renderTreatments() {
    var el = document.getElementById("cl-treatments-grid");
    if (!el) return;
    el.innerHTML = data.treatments
      .map(function (t, i) {
        return (
          '<article class="cl-treatment-card cl-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="cl-treatment-media">' +
          '<img src="' +
          escapeHtml(t.image) +
          '" alt="' +
          escapeHtml(t.title) +
          '" width="800" height="450" loading="lazy" />' +
          "</div>" +
          '<div class="cl-treatment-body">' +
          '<div class="cl-treatment-icon">' +
          treatmentIcon(t.icon) +
          "</div>" +
          "<h3>" +
          escapeHtml(t.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(t.description) +
          "</p>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".cl-reveal"));
  }

  function renderSpecialists() {
    var el = document.getElementById("cl-specialists-grid");
    if (!el) return;
    el.innerHTML = data.specialists
      .map(function (s, i) {
        return (
          '<article class="cl-specialist-card cl-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="cl-specialist-photo">' +
          '<img src="' +
          escapeHtml(s.image) +
          '" alt="' +
          escapeHtml(s.name) +
          '" width="200" height="200" loading="lazy" />' +
          "</div>" +
          "<h3>" +
          escapeHtml(s.name) +
          "</h3>" +
          '<p class="cl-specialist-role">' +
          escapeHtml(s.role) +
          "</p>" +
          '<p class="cl-specialist-specialty">' +
          escapeHtml(s.specialty) +
          "</p>" +
          '<p class="cl-specialist-exp">' +
          escapeHtml(s.experience) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".cl-reveal"));
  }

  function renderResults() {
    var el = document.getElementById("cl-results-grid");
    if (!el) return;
    el.innerHTML = data.results
      .map(function (r, i) {
        return (
          '<button type="button" class="cl-result-card cl-reveal" data-result="' +
          escapeHtml(r.id) +
          '" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="cl-result-images">' +
          '<div class="cl-result-img-wrap">' +
          '<img src="' +
          escapeHtml(r.beforeImage) +
          '" alt="Antes - ' +
          escapeHtml(r.title) +
          '" width="400" height="300" loading="lazy" />' +
          '<span class="cl-result-label">Antes</span>' +
          "</div>" +
          '<div class="cl-result-img-wrap">' +
          '<img src="' +
          escapeHtml(r.afterImage) +
          '" alt="Después - ' +
          escapeHtml(r.title) +
          '" width="400" height="300" loading="lazy" />' +
          '<span class="cl-result-label">Después</span>' +
          "</div>" +
          "</div>" +
          '<div class="cl-result-body">' +
          "<h3>" +
          escapeHtml(r.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(r.description) +
          "</p>" +
          "</div>" +
          "</button>"
        );
      })
      .join("");

    el.querySelectorAll(".cl-result-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openModal(card.getAttribute("data-result"));
      });
    });
    observeReveal(el.querySelectorAll(".cl-reveal"));
  }

  function openModal(resultId) {
    var result = data.results.find(function (r) {
      return r.id === resultId;
    });
    if (!result) return;

    var modal = document.getElementById("cl-modal");
    var body = document.getElementById("cl-modal-body");
    if (!modal || !body) return;

    body.innerHTML =
      '<button type="button" class="cl-modal-close" aria-label="Cerrar">×</button>' +
      '<figure class="cl-modal-images">' +
      '<img src="' +
      escapeHtml(result.beforeImage) +
      '" alt="Antes - ' +
      escapeHtml(result.title) +
      '" />' +
      '<img src="' +
      escapeHtml(result.afterImage) +
      '" alt="Después - ' +
      escapeHtml(result.title) +
      '" />' +
      "<figcaption><span>Antes</span><span>Después</span></figcaption>" +
      "</figure>" +
      '<div class="cl-modal-body">' +
      "<h2>" +
      escapeHtml(result.title) +
      "</h2>" +
      "<p>" +
      escapeHtml(result.description) +
      "</p>" +
      '<a class="cl-btn cl-btn--primary cl-btn--sm" href="' +
      waUrl("Hola, vi el caso de " + result.title + " y deseo agendar una evaluación.") +
      '" target="_blank" rel="noopener noreferrer">Agendar evaluación</a>' +
      "</div>";

    body.querySelector(".cl-modal-close").addEventListener("click", closeModal);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    body.querySelector(".cl-modal-close").focus();
  }

  function closeModal() {
    var modal = document.getElementById("cl-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModal() {
    var modal = document.getElementById("cl-modal");
    if (!modal) return;
    modal.querySelector(".cl-modal-overlay").addEventListener("click", closeModal);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  function renderBenefits() {
    var el = document.getElementById("cl-benefits-grid");
    if (!el) return;
    el.innerHTML = data.benefits
      .map(function (b, i) {
        return (
          '<article class="cl-benefit-card cl-reveal" style="transition-delay:' +
          i * 0.06 +
          's">' +
          '<div class="cl-benefit-icon">' +
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
    observeReveal(el.querySelectorAll(".cl-reveal"));
  }

  function renderProcess() {
    var el = document.getElementById("cl-process");
    if (!el) return;
    el.innerHTML = data.process
      .map(function (step, i) {
        return (
          '<div class="cl-process-step cl-reveal" style="transition-delay:' +
          i * 0.08 +
          's">' +
          '<div class="cl-process-num">' +
          step.step +
          "</div>" +
          "<h3>" +
          escapeHtml(step.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(step.description) +
          "</p>" +
          "</div>"
        );
      })
      .join("");
    observeReveal(el.querySelectorAll(".cl-reveal"));
  }

  function renderTestimonials() {
    var track = document.getElementById("cl-testimonial-slides");
    var dots = document.getElementById("cl-testimonial-dots");
    if (!track || !dots) return;

    track.innerHTML = data.testimonials
      .map(function (t) {
        return (
          '<blockquote class="cl-testimonial-slide">' +
          '<p class="cl-testimonial-quote">' +
          escapeHtml(t.quote) +
          "</p>" +
          '<footer class="cl-testimonial-author">' +
          escapeHtml(t.name) +
          "</footer>" +
          '<p class="cl-testimonial-role">' +
          escapeHtml(t.role) +
          "</p>" +
          "</blockquote>"
        );
      })
      .join("");

    dots.innerHTML = data.testimonials
      .map(function (_, i) {
        return (
          '<button type="button" class="cl-testimonial-dot' +
          (i === 0 ? " is-active" : "") +
          '" aria-label="Testimonio ' +
          (i + 1) +
          '" data-index="' +
          i +
          '"></button>'
        );
      })
      .join("");

    dots.querySelectorAll(".cl-testimonial-dot").forEach(function (dot) {
      dot.addEventListener("click", function () {
        goToTestimonial(parseInt(dot.getAttribute("data-index"), 10));
        resetTestimonialAutoplay();
      });
    });

    if (!reducedMotion) startTestimonialAutoplay();
  }

  function goToTestimonial(index) {
    var track = document.getElementById("cl-testimonial-slides");
    var dots = document.getElementById("cl-testimonial-dots");
    if (!track || !data.testimonials.length) return;
    testimonialIndex =
      ((index % data.testimonials.length) + data.testimonials.length) %
      data.testimonials.length;
    track.style.transform = "translateX(-" + testimonialIndex * 100 + "%)";
    if (dots) {
      dots.querySelectorAll(".cl-testimonial-dot").forEach(function (d, i) {
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
    var el = document.getElementById("cl-faq");
    if (!el) return;
    el.innerHTML = data.faq
      .map(function (item, i) {
        return (
          '<div class="cl-faq-item' +
          (i === 0 ? " is-open" : "") +
          '">' +
          '<button type="button" class="cl-faq-trigger" aria-expanded="' +
          (i === 0 ? "true" : "false") +
          '">' +
          escapeHtml(item.question) +
          "</button>" +
          '<div class="cl-faq-panel">' +
          '<div class="cl-faq-panel-inner">' +
          escapeHtml(item.answer) +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    el.querySelectorAll(".cl-faq-trigger").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var item = trigger.closest(".cl-faq-item");
        var panel = item.querySelector(".cl-faq-panel");
        var isOpen = item.classList.contains("is-open");

        el.querySelectorAll(".cl-faq-item").forEach(function (other) {
          other.classList.remove("is-open");
          other.querySelector(".cl-faq-trigger").setAttribute("aria-expanded", "false");
          other.querySelector(".cl-faq-panel").style.maxHeight = "0";
        });

        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    var firstItem = el.querySelector(".cl-faq-item.is-open");
    if (firstItem) {
      var firstPanel = firstItem.querySelector(".cl-faq-panel");
      if (firstPanel) firstPanel.style.maxHeight = firstPanel.scrollHeight + "px";
    }
  }

  function renderFormOptions() {
    var treatmentSelect = document.getElementById("cl-treatment-select");
    var scheduleSelect = document.getElementById("cl-schedule-select");
    if (treatmentSelect && data.form.treatments) {
      treatmentSelect.innerHTML =
        '<option value="">Selecciona un tratamiento</option>' +
        data.form.treatments
          .map(function (t) {
            return '<option value="' + escapeHtml(t) + '">' + escapeHtml(t) + "</option>";
          })
          .join("");
    }
    if (scheduleSelect && data.form.schedules) {
      scheduleSelect.innerHTML =
        '<option value="">Horario preferido</option>' +
        data.form.schedules
          .map(function (s) {
            return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + "</option>";
          })
          .join("");
    }
  }

  function initNav() {
    var nav = document.getElementById("cl-nav");
    var toggle = document.getElementById("cl-nav-toggle");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll(".cl-nav-mobile a, .cl-nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initForm() {
    var form = document.getElementById("cl-contact-form");
    var success = document.getElementById("cl-form-success");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      var treatment = form.querySelector('[name="treatment"]');
      var valid = true;

      [name, phone, treatment].forEach(function (field) {
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
    observeReveal(document.querySelectorAll(".cl-reveal"));
  }

  initBranding();
  renderTreatments();
  renderSpecialists();
  renderResults();
  renderBenefits();
  renderProcess();
  renderTestimonials();
  renderFaq();
  renderFormOptions();
  initModal();
  initNav();
  initForm();
  initReveal();
})();
