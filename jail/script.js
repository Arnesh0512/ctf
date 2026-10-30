/**
 * Cellular Jail National Memorial - 404 Portal
 */

document.addEventListener("DOMContentLoaded", () => {
  // Navigation active state toggle
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
