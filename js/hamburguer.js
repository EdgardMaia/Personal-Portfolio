document.addEventListener("DOMContentLoaded", () => {
  const hamburguerIcon = document.getElementById("hamburguer-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (hamburguerIcon && mobileMenu) {
    hamburguerIcon.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      hamburguerIcon.classList.toggle("active");
    });
  }
});
