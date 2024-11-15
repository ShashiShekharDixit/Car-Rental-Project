// Elements
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const scrollLinks = document.querySelectorAll("a[href^='#']");
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const priceEl = document.getElementById("select-price");
const selectCards = document.querySelectorAll(".select__card");
const banner = document.querySelector(".banner__wrapper");

// Scroll Reveal Options
const scrollRevealOptions = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

// Theme Persistence and Toggle
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';

themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
  const newTheme = htmlElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  htmlElement.setAttribute('data-theme', newTheme);
  htmlElement.style.transition = 'background-color 0.3s, color 0.3s';
  localStorage.setItem('theme', newTheme);
  themeToggle.innerHTML = newTheme === 'dark' ? '<i class="ri-moon-line"></i>' : '<i class="ri-sun-line"></i>';
}

// Navigation Menu Toggle
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Smooth Scroll for Anchor Links
scrollLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(link.getAttribute("href").substring(1)).scrollIntoView({ behavior: "smooth" });
  });
});

// Scroll Reveal Animations
ScrollReveal().reveal(".header__container h1", { ...scrollRevealOptions });
ScrollReveal().reveal(".header__container form", { ...scrollRevealOptions, delay: 500 });
ScrollReveal().reveal(".header__container img", { ...scrollRevealOptions, delay: 1000 });
ScrollReveal().reveal(".range__card", { duration: 1000, interval: 500 });
ScrollReveal().reveal(".location__image img", { ...scrollRevealOptions, origin: "right" });
ScrollReveal().reveal(".location__content .section__header", { ...scrollRevealOptions, delay: 500 });
ScrollReveal().reveal(".location__content p", { ...scrollRevealOptions, delay: 1000 });
ScrollReveal().reveal(".location__content .location__btn", { ...scrollRevealOptions, delay: 1500 });
ScrollReveal().reveal(".story__card", { ...scrollRevealOptions, interval: 500 });
ScrollReveal().reveal(".download__image img", { ...scrollRevealOptions, origin: "right" });
ScrollReveal().reveal(".download__content .section__header", { ...scrollRevealOptions, delay: 500 });
ScrollReveal().reveal(".download__links", { ...scrollRevealOptions, delay: 1000 });

// Swiper Slider Setup
const price = ["225", "455", "275", "625", "395"];
selectCards[0].classList.add("show__info");

function updateSwiperImage(eventName, args) {
  if (eventName === "slideChangeTransitionStart") {
    const index = args?.[0]?.realIndex;
    priceEl.innerText = price[index];
    priceEl.style.transition = "color 0.5s ease, transform 0.5s ease";
    priceEl.style.transform = "scale(1.1)";
    setTimeout(() => priceEl.style.transform = "scale(1)", 500);

    selectCards.forEach((item, i) => {
      item.classList.toggle("show__info", i === index);
    });
  }
}

const swiper = new Swiper(".swiper", {
  loop: true,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    depth: 500,
    modifier: 1,
    scale: 0.75,
    slideShadows: false,
    stretch: -100,
  },
  onAny(event, ...args) {
    updateSwiperImage(event, args);
  },
});

// Banner Duplication for Animation
const bannerContent = Array.from(banner.children);
bannerContent.forEach(item => {
  const duplicateNode = item.cloneNode(true);
  duplicateNode.setAttribute("aria-hidden", true);
  banner.appendChild(duplicateNode);
});

// Sticky Header on Scroll
window.addEventListener("scroll", () => {
  document.querySelector(".header__container").classList.toggle("sticky", window.scrollY > 0);
});
