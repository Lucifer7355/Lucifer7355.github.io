(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("is-open");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Back to top visibility ---------- */
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    function toggleBackToTop() {
      backToTop.style.opacity = window.scrollY > 500 ? "1" : "0.35";
    }
    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
})();
