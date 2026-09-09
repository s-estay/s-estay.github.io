// smooth scrolling to top

var scrollToTopBtn = document.getElementById("scroll-to-top-button");
var tagBackBtn = document.getElementById("tag-back-button");
var rootElement = document.documentElement;

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

if (scrollToTopBtn) {
  scrollToTopBtn.addEventListener("click", scrollToTop);
}

// hide/show button when inside/outside visible viewport

function handleScrollButton() {
  if (rootElement.clientHeight < rootElement.scrollHeight) {
    if (scrollToTopBtn) scrollToTopBtn.style.display = "block";
    if (tagBackBtn) tagBackBtn.style.display = "block";
  } else {
    if (scrollToTopBtn) scrollToTopBtn.style.display = "none";
    if (tagBackBtn) tagBackBtn.style.display = "none";
  }
}

handleScrollButton();
