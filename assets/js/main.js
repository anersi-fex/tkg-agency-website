/* The Koka Group — site behavior
   - Fills phone / email from assets/js/config.js (hides phone links until a number is set)
   - Mobile navigation toggle
   - Form submission via FormSubmit (AJAX with native-POST fallback)
   - Prefills the quote form from ?type= / ?ref= query strings
*/
(function () {
  "use strict";
  var cfg = window.KOKA_CONFIG || {};

  /* ---------- Contact details ---------- */
  var phone = (cfg.phone || "").trim();
  var telHref = "tel:" + phone.replace(/[^\d+]/g, "");
  var email = (cfg.email || "").trim();

  document.querySelectorAll("[data-phone]").forEach(function (el) {
    if (phone) {
      el.textContent = phone;
      if (el.tagName === "A") el.setAttribute("href", telHref);
    }
  });
  document.querySelectorAll("[data-phone-wrap]").forEach(function (el) {
    el.hidden = !phone;
  });
  document.querySelectorAll("[data-phone-fallback]").forEach(function (el) {
    el.hidden = !!phone;
  });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (email) {
      el.textContent = email;
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + email);
    }
  });
  document.querySelectorAll("[data-hours]").forEach(function (el) {
    if (cfg.hours) el.textContent = cfg.hours;
  });
  document.querySelectorAll("[data-location]").forEach(function (el) {
    if (cfg.location) el.textContent = cfg.location;
  });
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
        toggle.focus();
      }
    });
  }

  /* ---------- Query-string prefill (quote page) ---------- */
  var params = new URLSearchParams(window.location.search);
  var type = params.get("type");
  if (type) {
    var box = document.querySelector('input[name="coverage[]"][value="' + type + '"]');
    if (box) box.checked = true;
    var sel = document.querySelector('select[name="interested_in"] option[value="' + type + '"]');
    if (sel) sel.selected = true;
  }
  if (params.get("ref") === "partner") {
    var refField = document.querySelector('[name="referred_by"]');
    if (refField && !refField.value) refField.placeholder = "Loan officer / agent name and company";
    var partnerNote = document.querySelector("[data-partner-note]");
    if (partnerNote) partnerNote.hidden = false;
    var who = document.querySelector('select[name="i_am"] option[value="Referral partner"]');
    if (who) who.selected = true;
  }

  /* ---------- Forms ---------- */
  var forms = document.querySelectorAll("form[data-koka-form]");
  forms.forEach(function (form) {
    // Non-JS / fallback destination
    if (cfg.formFallback) form.setAttribute("action", cfg.formFallback);
    form.setAttribute("method", "POST");
    var next = form.querySelector('input[name="_next"]');
    if (next) {
      next.value = window.location.origin + window.location.pathname.replace(/[^/]*$/, "") + "thanks.html";
    }

    form.addEventListener("submit", function (e) {
      // Checkbox groups can't be marked required natively — enforce "pick at least one".
      var group = form.querySelectorAll('input[type="checkbox"][name="coverage[]"]');
      var groupError = form.querySelector("[data-coverage-error]");
      if (group.length) {
        var any = Array.prototype.some.call(group, function (c) { return c.checked; });
        if (groupError) groupError.hidden = any;
        if (!any) { e.preventDefault(); group[0].focus(); return; }
      }
      if (!form.checkValidity()) return; // let the browser show native messages
      var honey = form.querySelector('input[name="_honey"]');
      if (honey && honey.value) { e.preventDefault(); return; } // bot
      if (!cfg.formEndpoint || !window.fetch) return; // native POST fallback

      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var status = form.querySelector(".form-status");
      var original = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      if (status) { status.textContent = ""; status.classList.remove("form-status--error"); }

      var data = {};
      var fd = new FormData(form);
      fd.forEach(function (value, key) {
        if (key === "_honey" || key === "_next") return;
        if (data[key] !== undefined) {
          data[key] = (Array.isArray(data[key]) ? data[key] : [data[key]]).concat(value).join(", ");
        } else {
          data[key] = value;
        }
      });
      data.page = window.location.href;

      fetch(cfg.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
        .then(function () {
          var success = form.querySelector(".form-success") || document.querySelector("#" + form.id + "-success");
          if (success) {
            success.hidden = false;
            form.hidden = true;
            success.setAttribute("tabindex", "-1");
            success.focus();
          } else {
            window.location.href = next ? next.value : "thanks.html";
          }
        })
        .catch(function () {
          // Fall back to a normal POST so the message still gets through.
          if (btn) { btn.disabled = false; btn.textContent = original; }
          if (status) {
            status.textContent = "One moment — sending the old-fashioned way…";
          }
          // form.submit() does not re-fire the submit event, so no loop.
          HTMLFormElement.prototype.submit.call(form);
        });
    });
  });
})();
