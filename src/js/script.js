const mainNav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".main-nav__toggle");

const featuredNav = document.querySelector(".featured-nav");
const featuredNavToggle = document.querySelector(".featured-nav__toggle");

function toggle(nav, toggle, classNameNav) {
  toggle.addEventListener("click", function(event) {
    if (nav.classList.contains(classNameNav + "--closed")) {
      nav.classList.remove(classNameNav + "--closed");
      nav.classList.add(classNameNav + "--opened");
    } else if(nav.classList.contains(classNameNav + "--opened")) {
      nav.classList.add(classNameNav + "--closed");
      nav.classList.remove(classNameNav + "--opened");
    } else {
      nav.classList.add(classNameNav + "--opened");
    }
  });
}

toggle(mainNav, navToggle, "main-nav");
toggle(featuredNav, featuredNavToggle, "featured-nav");

