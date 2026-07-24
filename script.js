const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.getElementById("mobileNav");
const revealItems = document.querySelectorAll(".reveal");
const dropdowns = document.querySelectorAll(".topbar-dropdown");
const dropdownTriggers = document.querySelectorAll("[data-dropdown-trigger]");
const languageSearch = document.getElementById("languageSearch");
const languageItems = document.querySelectorAll(".language-item");

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function closeAllDropdowns(exceptId = null) {
  dropdowns.forEach((dropdown) => {
    const menu = dropdown.querySelector(".topbar-menu");
    const trigger = dropdown.querySelector(".topbar-trigger");

    if (!menu || !trigger) return;

    const keepOpen = exceptId && menu.id === exceptId;
    dropdown.classList.toggle("is-open", keepOpen);
    trigger.setAttribute("aria-expanded", String(keepOpen));
  });
}

dropdownTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();

    const targetId = trigger.getAttribute("data-dropdown-trigger");
    const parent = trigger.closest(".topbar-dropdown");
    const isOpen = parent && parent.classList.contains("is-open");

    closeAllDropdowns(isOpen ? null : targetId);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".topbar-dropdown")) {
    closeAllDropdowns();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllDropdowns();
  }
});

if (languageSearch && languageItems.length) {
  languageSearch.addEventListener("input", () => {
    const term = languageSearch.value.trim().toLowerCase();

    languageItems.forEach((item) => {
      const text = (item.dataset.lang || "").toLowerCase();
      item.style.display = text.includes(term) ? "inline-flex" : "none";
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}