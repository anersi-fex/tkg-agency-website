/* Agent Portal — Google Workspace sign-in (Google Identity Services) and the tool grid.
   The gate runs in the browser: it keeps the hub tidy and team-only. Each app still
   enforces its own login, which is where real access control lives. */
(function () {
  "use strict";
  var cfg = window.KOKA_PORTAL || {};
  var KEY = "koka_portal_session";
  var $ = function (id) { return document.getElementById(id); };

  var views = {
    loading: $("portal-loading"),
    pending: $("portal-pending"),
    signin: $("portal-signin"),
    denied: $("portal-denied"),
    dash: $("portal-dash")
  };

  function show(name) {
    Object.keys(views).forEach(function (k) { if (views[k]) views[k].hidden = (k !== name); });
  }

  /* ---------- session ---------- */
  function readSession() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (s && s.exp && s.exp > Date.now() && s.email) return s;
    } catch (e) {}
    return null;
  }
  function writeSession(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  function clearSession() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function decodeJwt(token) {
    var part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    var json = decodeURIComponent(atob(part).split("").map(function (c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(json);
  }

  function allowed(p) {
    var domain = (cfg.allowedDomain || "").toLowerCase();
    var email = (p.email || "").toLowerCase();
    if (!p.email_verified) return false;
    if (p.hd && p.hd.toLowerCase() === domain) return true;
    return email.slice(-(domain.length + 1)) === "@" + domain;
  }

  /* ---------- icons ---------- */
  var ICONS = {
    headset: '<svg viewBox="0 0 24 24"><path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="13" width="4" height="7" rx="1.5"/><rect x="17" y="13" width="4" height="7" rx="1.5"/><path d="M19 20a3 3 0 0 1-3 3h-3"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/></svg>',
    users: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.5a5 5 0 0 1 6 5"/></svg>',
    refresh: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 0-14.5-4.5L3 9"/><path d="M3 4v5h5"/><path d="M4 13a8 8 0 0 0 14.5 4.5L21 15"/><path d="M21 20v-5h-5"/></svg>',
    link: '<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.5 1.5"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/></svg>'
  };

  /* ---------- dashboard ---------- */
  function tile(app) {
    var big = app.kind === "tool";
    return '<a class="tile' + (big ? " tile--tool" : " tile--site") + '" href="' + app.url + '" target="_blank" rel="noopener">' +
      '<span class="tile__icon" aria-hidden="true">' + (ICONS[app.icon] || ICONS.link) + '</span>' +
      '<span class="tile__body">' +
        '<span class="tile__top"><span class="tile__name">' + app.name + '</span>' +
        (app.status ? '<span class="tile__status">' + app.status + '</span>' : "") + '</span>' +
        '<span class="tile__tagline">' + app.tagline + '</span>' +
        (big ? '<span class="tile__desc">' + app.description + '</span>' : "") +
      '</span>' +
      '<span class="tile__cta">Open<span class="sr-only"> ' + app.name + '</span> →</span>' +
    '</a>';
  }

  function fmtDate(iso) {
    var d = new Date(iso + "T12:00:00");
    return isNaN(d) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function renderDash(session) {
    var apps = cfg.apps || [];
    $("tiles-tools").innerHTML = apps.filter(function (a) { return a.kind === "tool"; }).map(tile).join("");
    $("tiles-sites").innerHTML = apps.filter(function (a) { return a.kind !== "tool"; }).map(tile).join("");
    var ups = cfg.updates || [];
    $("portal-updates").innerHTML = ups.length ? ups.map(function (u) {
      return '<li class="update"><span class="update__date">' + fmtDate(u.date) + '</span>' +
        '<span class="update__body"><strong>' + u.title + '</strong>' + (u.body ? '<span>' + u.body + '</span>' : "") + '</span></li>';
    }).join("") : '<li class="update"><span class="update__body">No updates yet.</span></li>';
    $("user-name").textContent = session.name || session.email;
    $("user-email").textContent = session.email;
    var img = $("user-avatar");
    if (session.picture) { img.src = session.picture; img.hidden = false; } else { img.hidden = true; }
    var contact = $("access-contact");
    if (contact && cfg.accessContact) { contact.textContent = cfg.accessContact; contact.href = "mailto:" + cfg.accessContact; }
    show("dash");
  }

  /* ---------- google sign-in ---------- */
  function onCredential(res) {
    var p;
    try { p = decodeJwt(res.credential); } catch (e) { show("signin"); return; }
    if (!allowed(p)) {
      $("denied-email").textContent = p.email || "that account";
      show("denied");
      return;
    }
    var session = { name: p.name, email: p.email, picture: p.picture, exp: Date.now() + (cfg.sessionHours || 12) * 3600 * 1000 };
    writeSession(session);
    renderDash(session);
  }

  function renderButton() {
    var target = $("google-btn");
    if (!target || !window.google || !google.accounts) return;
    target.innerHTML = "";
    google.accounts.id.initialize({ client_id: cfg.googleClientId, callback: onCredential, ux_mode: "popup", auto_select: false, itp_support: true });
    google.accounts.id.renderButton(target, { theme: "filled_black", size: "large", shape: "pill", text: "signin_with", logo_alignment: "left", width: 300 });
  }

  function signOut() {
    clearSession();
    if (window.google && google.accounts) { try { google.accounts.id.disableAutoSelect(); } catch (e) {} }
    show("signin");
    renderButton();
    window.scrollTo(0, 0);
  }

  /* ---------- boot ---------- */
  function init() {
    var s = readSession();
    if (s) { renderDash(s); return; }
    if (!cfg.googleClientId) { show("pending"); return; }
    show("signin");
    if (window.google && google.accounts) renderButton();
    else window.onGoogleLibraryLoad = renderButton;
  }

  document.querySelectorAll("[data-signout]").forEach(function (b) { b.addEventListener("click", signOut); });
  document.querySelectorAll("[data-retry]").forEach(function (b) { b.addEventListener("click", signOut); });
  init();
})();
