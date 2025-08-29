const showElement = {
  duration: 500,
  opacity: 0,
};

const slideLeft = {
  ...showElement,
  origin: "left",
  distance: "1rem",
};

const slideTop = {
  ...showElement,
  origin: "top",
  distance: "1rem",
};

ScrollReveal().reveal(".show-element", {
  ...showElement,
  interval: 200,
});

ScrollReveal().reveal(".slide-left", {
  ...slideLeft,
});

ScrollReveal().reveal(".slide-left-list li", {
  ...slideLeft,
  delay: 100,
  interval: 200,
});

ScrollReveal().reveal(".slide-top", {
  ...slideTop,
});

ScrollReveal().reveal(".slide-top-elms", {
  ...slideTop,
  interval: 250,
});
