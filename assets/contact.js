(function () {
  "use strict";

  var config = window.INNOTEC_CONTACT;
  if (!config) return;

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el && text) el.textContent = text;
  }

  function setHref(id, href) {
    var el = document.getElementById(id);
    if (el && href) el.href = href;
  }

  function initContactInfo() {
    setText("contact-email", config.email);
    setText("contact-phone", config.phone);
    setText("contact-address", config.address);
    setText("contact-hours", config.hours);
    setText("footer-email", config.email);
    setText("footer-phone", config.phone);
    setText("footer-address", config.address);

    setHref("contact-email", "mailto:" + config.email);
    setHref("footer-email", "mailto:" + config.email);
    setHref("footer-phone", "tel:+" + String(config.phoneWa || "").replace(/\D/g, ""));

    var waContact = document.getElementById("contact-wa");
    if (waContact) {
      waContact.href =
        "https://wa.me/" +
        config.phoneWa +
        "?text=" +
        encodeURIComponent("Hola, quiero información sobre automatización para mi negocio.");
    }
  }

  function initSubjectOptions() {
    var select = document.getElementById("contact-subject");
    if (!select || !config.subjects) return;
    select.innerHTML =
      '<option value="">Asunto</option>' +
      config.subjects
        .map(function (s) {
          return '<option value="' + s.replace(/"/g, "&quot;") + '">' + s + "</option>";
        })
        .join("");
  }

  function initCountryOptions() {
    var select = document.getElementById("contact-country");
    if (!select || !config.countries) return;
    select.innerHTML = config.countries
      .map(function (c, i) {
        return (
          '<option value="' +
          c.replace(/"/g, "&quot;") +
          '"' +
          (i === 0 ? " selected" : "") +
          ">" +
          c +
          "</option>"
        );
      })
      .join("");
  }

  function initScheduleButtons() {
    if (config.scheduleUrl) {
      document.querySelectorAll("[data-schedule]").forEach(function (btn) {
        btn.href = config.scheduleUrl;
        btn.target = "_blank";
        btn.rel = "noopener noreferrer";
      });
      return;
    }

    document.querySelectorAll("[data-schedule]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var subject = document.getElementById("contact-subject");
        if (subject) {
          var meetingOption = Array.prototype.find.call(subject.options, function (opt) {
            return opt.value.indexOf("reunión") !== -1 || opt.value.indexOf("Diagnóstico") !== -1;
          });
          if (meetingOption) subject.value = meetingOption.value;
        }
        var form = document.getElementById("contact-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
          var nameField = form.querySelector('[name="name"]');
          if (nameField) nameField.focus();
        }
      });
    });
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    var success = document.getElementById("contact-success");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var required = form.querySelectorAll("[required]");
      var valid = true;

      required.forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add("is-invalid");
          valid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      });

      var emailField = form.querySelector('[name="email"]');
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        emailField.classList.add("is-invalid");
        valid = false;
      }

      if (!valid) return;

      var data = new FormData(form);
      var lines = [
        "Nombre: " + (data.get("name") || ""),
        "Empresa: " + (data.get("company") || "—"),
        "Cargo: " + (data.get("role") || "—"),
        "Teléfono: " + (data.get("phone") || ""),
        "País: " + (data.get("country") || ""),
        "Asunto: " + (data.get("subject") || ""),
        "",
        String(data.get("message") || "")
      ];

      var mailto =
        "mailto:" +
        config.email +
        "?subject=" +
        encodeURIComponent("[INNOTEC] " + (data.get("subject") || "Consulta web")) +
        "&body=" +
        encodeURIComponent(lines.join("\n"));

      form.reset();
      if (success) success.classList.add("is-visible");

      window.location.href = mailto;

      setTimeout(function () {
        if (success) success.classList.remove("is-visible");
      }, 8000);
    });

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("input", function () {
        field.classList.remove("is-invalid");
      });
      field.addEventListener("change", function () {
        field.classList.remove("is-invalid");
      });
    });
  }

  initContactInfo();
  initSubjectOptions();
  initCountryOptions();
  initScheduleButtons();
  initForm();
})();
