/* ========================================
   RYK!LE — OFFICIAL WEBSITE
   Main JavaScript
======================================== */

(() => {

  /* --------------------------------------
     01. LANGUAGE SWITCHING
  -------------------------------------- */

  let lang = "ja";

  const button = document.getElementById("lang");

  const nodes = document.querySelectorAll(
    "[data-ja][data-en]"
  );


  function setLang(next) {

    lang = next;

    document.documentElement.lang = next;

    nodes.forEach((el) => {

      el.innerHTML = el.dataset[next];

    });

    button.textContent =
      next === "ja" ? "EN / JP" : "JP / EN";

    button.setAttribute(
      "aria-label",
      next === "ja"
        ? "Switch to English"
        : "日本語に切り替え"
    );

  }


  button.addEventListener("click", () => {

    setLang(lang === "ja" ? "en" : "ja");

  });


  // Initial language
  setLang("ja");


  /* --------------------------------------
     02. SCROLL REVEAL ANIMATION
  -------------------------------------- */

  const items = document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    const observer = new IntersectionObserver(

      (entries, obs) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            obs.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );


    items.forEach((item) => {

      observer.observe(item);

    });

  } else {

    items.forEach((item) => {

      item.classList.add("visible");

    });

  }


})();
