/**
 * Mayasabha Jail - Interactive Client Scripts
 */

document.addEventListener("DOMContentLoaded", () => {
  const btnCopy = document.getElementById("btnCopyEmail");
  const emailLink = document.getElementById("contactEmail");
  const toastStack = document.getElementById("toastStack");

  function showToast(message) {
    if (!toastStack) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
        <path d="M20 6 9 17l-5-5"></path>
      </svg>
      <span>${message}</span>
    `;

    toastStack.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  if (btnCopy && emailLink) {
    btnCopy.addEventListener("click", async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        const copyText = btnCopy.querySelector(".copy-text");
        if (copyText) copyText.textContent = "Copied!";
        showToast("Email copied to clipboard: " + email);

        setTimeout(() => {
          if (copyText) copyText.textContent = "Copy";
        }, 2000);
      } catch (err) {
        // Fallback for environments where clipboard API is restricted
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Email copied: " + email);
      }
    });
  }

  // Active navigation link tracking on scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});
