/* ========================================
   RYK!LE — ARTIST PORTFOLIO
   JavaScript
======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION

  const menuButton = document.querySelector(".menu-button");
  const navigation = document.querySelector(".nav");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "CLOSE −" : "MENU +";

  });

  // CLOSE MENU AFTER NAVIGATION

  navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navigation.classList.remove("is-open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "MENU +";

    });

  });

});
