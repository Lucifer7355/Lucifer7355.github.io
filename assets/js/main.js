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

  /* ---------- Mobile menu toggle (full-screen overlay) ---------- */
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    function openMenu() {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
    }
    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) { closeMenu(); } else { openMenu(); }
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    // Escape closes it; also auto-close if a resize pushes us back to desktop width
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) { closeMenu(); }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720 && menu.classList.contains("is-open")) { closeMenu(); }
    });
  }

  /* ---------- Scroll reveal (with per-container stagger) ---------- */
  var staggerContainers = document.querySelectorAll(
    ".project-grid, .timeline, .skills-grid, .achievements-grid, .education-grid, .contact-grid"
  );
  staggerContainers.forEach(function (container) {
    var children = container.querySelectorAll(":scope > [data-reveal]");
    children.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i, 6) * 70 + "ms";
    });
  });

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

  /* ---------- Count-up stats ---------- */
  var countEls = document.querySelectorAll("[data-count-to]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1300;
    var startTime = null;
    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }
  if (countEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      countEls.forEach(function (el) {
        el.textContent = el.getAttribute("data-count-to") + (el.getAttribute("data-suffix") || "");
      });
    } else {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      countEls.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    function updateProgress() {
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* ---------- Hero cursor spotlight ---------- */
  var hero = document.querySelector(".hero");
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (hero && canHover && !prefersReducedMotion) {
    hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--spot-x", x + "%");
      hero.style.setProperty("--spot-y", y + "%");
    });
  }

  /* ---------- Hero role cycling ---------- */
  var roleCycleEl = document.getElementById("role-cycle");
  if (roleCycleEl && !prefersReducedMotion) {
    var roles = [
      "Java Backend & Distributed Systems",
      "Payments Infrastructure at Scale",
      "AI / RAG & Agentic Systems",
      "Kafka-Driven Microservices"
    ];
    var roleIndex = 0;
    setInterval(function () {
      roleIndex = (roleIndex + 1) % roles.length;
      roleCycleEl.style.opacity = "0";
      setTimeout(function () {
        roleCycleEl.textContent = roles[roleIndex];
        roleCycleEl.style.opacity = "1";
      }, 300);
    }, 2800);
  }

  /* ---------- Copy to clipboard ---------- */
  var toast = document.getElementById("toast");
  var toastTimeout;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2200);
  }
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var text = btn.getAttribute("data-copy");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(function () { showToast("Copied " + text); })
          .catch(function () { showToast(text); });
      } else {
        showToast(text);
      }
    });
  });

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
