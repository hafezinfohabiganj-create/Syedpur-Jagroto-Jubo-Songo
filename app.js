const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

menuBtn?.addEventListener("click", () => {
  mainNav.style.display =
    mainNav.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll("#mainNav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 760) {
      mainNav.style.display = "none";
    }
  });
});

document.getElementById("memberForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = document.getElementById("formMessage");

  if (message) {
    message.textContent =
      "আবেদন ফর্ম প্রস্তুত হয়েছে। Firebase সংযোগের পর তথ্য সরাসরি ডাটাবেসে সংরক্ষণ হবে।";
  }
});
