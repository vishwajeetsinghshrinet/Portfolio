// Fade Effect

// Select all animation sections
const sections = document.querySelectorAll('[class*="fade-"]');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation when entering
        entry.target.classList.add("animate");
      } else {
        // Remove animation when leaving (for reverse effect)
        entry.target.classList.remove("animate");
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "0px 0px -80px 0px",
  },
);

// Observe all sections
sections.forEach((section) => {
  observer.observe(section);
});

// Typing animation for all labels

const labels = document.querySelectorAll("label");

labels.forEach((label) => {
  const originalText = label.textContent;
  label.dataset.text = originalText; // store original
  label.textContent = ""; // clear initially
});

function typeEffect(element) {
  const text = element.dataset.text;
  let index = 0;

  element.textContent = "";

  const typing = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;

    if (index === text.length) {
      clearInterval(typing);
    }
  }, 100); // typing speed
}

const labelObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        typeEffect(el);
      } else {
        // reset for reverse effect
        el.textContent = "";
      }
    });
  },
  {
    threshold: 0.6,
  },
);

labels.forEach((label) => {
  labelObserver.observe(label);
});
