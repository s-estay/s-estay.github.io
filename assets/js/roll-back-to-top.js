// smooth scrolling to top

var scrollToTopBtn = document.getElementById("scroll-to-top-button");
var rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

scrollToTopBtn.addEventListener("click", scrollToTop);

// hide/show button when inside/outside visible viewport

function handleScrollButton() {
  if (rootElement.clientHeight < rootElement.scrollHeight) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

handleScrollButton();
