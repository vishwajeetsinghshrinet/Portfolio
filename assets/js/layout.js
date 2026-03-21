function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.defer = true;
  document.body.appendChild(script);
}

async function loadComponent(id, file) {
  const res = await fetch(file);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
}

async function loadLayout() {
  // Load head
  if (document.getElementById("head")) {
    await loadComponent("head", "./assets/components/head.html");
  }

  // Page Title
  document.title =
    document.body.dataset.title || "Vishwajeet Singh | Web Developer Portfolio";

  // Load header
  if (document.getElementById("header")) {
    await loadComponent("header", "./assets/components/header.html");
  }

  // Load footer
  if (document.getElementById("footer")) {
    await loadComponent("footer", "./assets/components/footer.html");
  }

  // Load Bootstrap JS
  loadScript(
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  );
}

loadLayout();
