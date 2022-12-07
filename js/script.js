/* Hamburger menu */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".button").forEach(n => n.
  addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
  )

  /* Sticky Navbar */

window.onscroll = function() {stickyNavbar()};
var navbar = document.querySelector(".nav_top_front");

var sticky = navbar.offsetTop;

function stickyNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("stickyNavbar")
  } else {
    navbar.classList.remove("stickyNavbar");
  }
}