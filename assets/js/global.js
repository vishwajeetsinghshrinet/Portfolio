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

// Typing animation for all labels (keep text visible on load)

const labels = document.querySelectorAll("label");

labels.forEach((label) => {
  const originalText = label.textContent;
  label.dataset.text = originalText || ""; // store original
  // Do NOT clear initial text so labels load correctly
});

function typeEffect(element) {
  const text = element.dataset.text || "";
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
        // Only type if label is currently empty
        if (!el.textContent || el.textContent.trim() === "") {
          typeEffect(el);
        }
      } else {
        // Do not clear label text on exit — preserve text to avoid flicker
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

// Contact Form Validation
const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  });

  if (response.ok) {
    status.innerHTML = "✅ Message sent successfully!";
    form.reset();
  } else {
    status.innerHTML = "❌ Something went wrong. Try again.";
  }
});

// Label & Placeholder Design

const fields = document.querySelectorAll(
  "#contact-form input, #contact-form textarea, #contact-form select",
);

fields.forEach((field) => {
  const group = field.closest(".form-group");

  if (!group) return;

  field.addEventListener("focus", () => {
    group.classList.add("active");
  });

  field.addEventListener("blur", () => {
    if (field.value.trim() !== "") {
      group.classList.add("active");
    } else {
      group.classList.remove("active");
    }
  });

  if (field.value.trim() !== "") {
    group.classList.add("active");
  }
});

// Phone Number Validation
// Allow only: 0-9, +, #, *

const phoneInput = document.querySelector("#phone");

phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/[^0-9+#*]/g, "");
});

// ========================================
// Contact Wrapper Floating Stars
// ========================================

const starsContainer = document.querySelector(".contact-stars");

if (starsContainer) {
  const starCount = 35;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");

    star.classList.add("contact-star");

    // Random size
    const sizes = ["small", "medium", "large"];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];

    star.classList.add(randomSize);

    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    // Random animation duration
    const duration = 5 + Math.random() * 7;
    const glowDuration = 2 + Math.random() * 4;

    star.style.setProperty("--duration", `${duration}s`);

    star.style.setProperty("--glow-duration", `${glowDuration}s`);

    // Random animation starting point
    star.style.animationDelay = `${Math.random() * -10}s`;

    starsContainer.appendChild(star);
  }
}
