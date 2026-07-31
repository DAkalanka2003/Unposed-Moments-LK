(() => {
  "use strict";

  /* ---------------------------------------------------
     Header: stays fixed & visible at all times.
     Add border/shadow on scroll.
  --------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const backTop = document.getElementById("backTop");

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 30);
    if (backTop) backTop.classList.toggle("is-visible", y > 700);
  }, { passive: true });

  /* ---------------------------------------------------
     Mobile nav (Compact Menu)
  --------------------------------------------------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("mainNav");

  function closeAllDropdowns() {
    document.querySelectorAll(".nav-item-dropdown.dropdown-open").forEach(dd => {
      dd.classList.remove("dropdown-open");
      const btn = dd.querySelector(".caret-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  if (burger && nav) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) closeAllDropdowns();
    });

    /* Nav link එකක් click කල විට compact menu එක වැසීම */
    nav.querySelectorAll("a").forEach(link => {
      if (link.matches(".nav-item-dropdown .nav-parent-link")) return;
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        closeAllDropdowns();
      });
    });

    /* Click outside to close compact menu */
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("is-open") && !nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        closeAllDropdowns();
      }
    });
  }

  /* ---------------------------------------------------
     Featured Work Submenu Dropdown
  --------------------------------------------------- */
  function toggleDropdown(parent, btn) {
    if (!parent) return;
    const willOpen = !parent.classList.contains("dropdown-open");
    closeAllDropdowns();
    if (willOpen) {
      parent.classList.add("dropdown-open");
      if (btn) btn.setAttribute("aria-expanded", "true");
    }
  }

  document.querySelectorAll(".caret-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(btn.closest(".nav-item-dropdown"), btn);
    });
  });

  document.querySelectorAll(".nav-item-dropdown .nav-parent-link").forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width:860px)").matches) {
        e.preventDefault();
        const parent = link.closest(".nav-item-dropdown");
        toggleDropdown(parent, parent?.querySelector(".caret-btn"));
      }
    });
  });

  /* ---------------------------------------------------
     Scrollspy — highlights navigation on scroll
  --------------------------------------------------- */
  function setActiveNav(key) {
    document.querySelectorAll("[data-nav]").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".nav-item-dropdown").forEach(el => el.classList.remove("active"));

    const link = document.querySelector(`[data-nav="${key}"]`);
    if (link) link.classList.add("active");

    if (key === "featured") {
      const wrap = document.querySelector(".nav-item-dropdown");
      if (wrap) wrap.classList.add("active");
    }
  }

  const navSections = document.querySelectorAll("[data-nav-section]");
  if (navSections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.dataset.navSection);
        }
      });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

    navSections.forEach(sec => spy.observe(sec));
  }

  /* ---------------------------------------------------
     Hero slider
  --------------------------------------------------- */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  let heroIndex = 0;
  let heroTimer;

  function goToSlide(i) {
    if (!slides.length) return;
    slides[heroIndex].classList.remove("is-active");
    dots[heroIndex]?.classList.remove("is-active");
    heroIndex = i;
    slides[heroIndex].classList.add("is-active");
    dots[heroIndex]?.classList.add("is-active");
  }

  function nextSlide() {
    goToSlide((heroIndex + 1) % slides.length);
  }

  function startHero() {
    if (slides.length) heroTimer = setInterval(nextSlide, 5500);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(heroTimer);
      goToSlide(i);
      startHero();
    });
  });

  if (slides.length) startHero();

  /* ---------------------------------------------------
     Reveal elements on scroll
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal, .reveal-scale");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     Testimonials slider
  --------------------------------------------------- */
  const tSlides = document.querySelectorAll(".t-slide");
  const tProgress = document.getElementById("tProgress");
  let tIndex = 0;

  function showTestimonial(i) {
    if (!tSlides.length) return;
    tSlides[tIndex].classList.remove("is-active");
    tIndex = (i + tSlides.length) % tSlides.length;
    tSlides[tIndex].classList.add("is-active");
    if (tProgress) {
      tProgress.textContent = String(tIndex + 1).padStart(2, "0") + " / " + String(tSlides.length).padStart(2, "0");
    }
  }

  document.getElementById("tPrev")?.addEventListener("click", () => showTestimonial(tIndex - 1));
  document.getElementById("tNext")?.addEventListener("click", () => showTestimonial(tIndex + 1));

  if (tSlides.length) {
    setInterval(() => showTestimonial(tIndex + 1), 7000);
  }

  /* ---------------------------------------------------
     Back to top
  --------------------------------------------------- */
  backTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

})();
