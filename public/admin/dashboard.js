(function () {
  "use strict";

  const authGate = document.getElementById("auth-gate");
  const workspace = document.getElementById("workspace");
  const loginButton = document.getElementById("login-button");
  const profileButton = document.getElementById("profile-button");
  const authStatus = document.getElementById("auth-status");
  let manifestLoaded = false;

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function relativeTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently published";
    const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (seconds < 60) return "Published just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Published ${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Published ${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `Published ${days}d ago`;
  }

  function setDateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const period = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
    const formatted = now.toLocaleDateString("en-NG", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    setText("day-period", period);
    setText("today-label", formatted);
  }

  function showAuth() {
    authGate.hidden = false;
    workspace.hidden = true;
    authStatus.textContent = "Sign in with your authorised Engrite account.";
    authStatus.classList.remove("is-error");
  }

  function showWorkspace(user) {
    const email = user?.email || "Secure account";
    const displayName =
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      email.split("@")[0] ||
      "Engrite team";

    authGate.hidden = true;
    workspace.hidden = false;
    setText("user-name", displayName);
    setText("user-email", email);
    setText("user-initial", displayName.charAt(0).toUpperCase());
    setDateGreeting();
    checkLiveSite();
    if (!manifestLoaded) loadManifest();
  }

  async function checkLiveSite() {
    try {
      const response = await fetch(`/?admin-health=${Date.now()}`, {
        cache: "no-store",
        headers: { Accept: "text/html" },
      });
      if (!response.ok) throw new Error("Site unavailable");
      setText("site-health", "Healthy");
    } catch {
      setText("site-health", "Check site");
    }
  }

  function calculateScore(property) {
    const checks = [
      property.name,
      property.location,
      property.statusLabel,
      property.completionDate,
      property.startingPrice > 0,
      property.galleryCount >= 3,
      property.unitCount > 0,
      property.hasMap,
    ];
    const complete = checks.filter(Boolean).length;
    return Math.round((complete / checks.length) * 100);
  }

  function renderProperties(properties) {
    const list = document.getElementById("property-list");
    if (!list) return;

    if (!properties.length) {
      list.innerHTML = '<div class="property-row"><strong>No properties found.</strong></div>';
      return;
    }

    list.innerHTML = properties
      .map((property) => {
        const score = calculateScore(property);
        const tourReady = Boolean(property.hasMatterport);
        return `
          <article class="property-row">
            <div class="property-row__top">
              <strong title="${escapeHtml(property.name)}">${escapeHtml(property.name)}</strong>
              <span>${escapeHtml(property.statusLabel || "Published")}</span>
            </div>
            <div class="property-row__meta">
              <span>${escapeHtml(property.location || "Location pending")}</span>
              <span>${property.galleryCount || 0} images</span>
              <span>${property.unitCount || 0} unit types</span>
            </div>
            <div class="score">
              <div class="score__label">
                <span>Content readiness</span>
                <strong>${score}%</strong>
              </div>
              <div class="score__track" aria-label="${score}% content readiness">
                <span style="width:${score}%"></span>
              </div>
            </div>
            <div class="property-row__footer">
              <span class="tour-state ${tourReady ? "is-ready" : ""}">
                <i></i>${tourReady ? "360 tour live" : "Matterport pending"}
              </span>
              <a href="/admin/studio.html#/collections/properties/entries/${encodeURIComponent(property.slug)}">
                Edit ↗
              </a>
            </div>
          </article>
        `;
      })
      .join("");
  }

  async function loadManifest() {
    manifestLoaded = true;
    try {
      const response = await fetch(`/admin/content-manifest.json?v=${Date.now()}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Manifest unavailable");
      const manifest = await response.json();

      setText("property-count", String(manifest.counts.properties ?? 0).padStart(2, "0"));
      setText("faq-count", String(manifest.counts.faqs ?? 0).padStart(2, "0"));
      setText("blog-count", String(manifest.counts.blog ?? 0).padStart(2, "0"));
      setText("story-count", String(manifest.counts.clientTestimonials ?? 0).padStart(2, "0"));
      setText(
        "story-note",
        manifest.counts.clientTestimonials
          ? "Approved testimonials"
          : "Add the first approved story",
      );
      setText("last-published", relativeTime(manifest.generatedAt));
      renderProperties(manifest.properties || []);
    } catch {
      setText("property-count", "03");
      setText("faq-count", "12");
      setText("blog-count", "03");
      setText("story-count", "00");
      setText("last-published", "Live version available");
      const list = document.getElementById("property-list");
      if (list) {
        list.innerHTML =
          '<div class="property-row"><strong>Content summary will refresh after the next publication.</strong></div>';
      }
    }
  }

  function initialiseIdentity() {
    if (!window.netlifyIdentity) {
      authStatus.textContent = "Secure sign-in could not load. Refresh the page and try again.";
      authStatus.classList.add("is-error");
      loginButton.disabled = true;
      return;
    }

    window.netlifyIdentity.on("init", (user) => {
      if (user) showWorkspace(user);
      else showAuth();
    });

    window.netlifyIdentity.on("login", (user) => {
      window.netlifyIdentity.close();
      showWorkspace(user);
      history.replaceState(null, "", "/admin/");
    });

    window.netlifyIdentity.on("logout", () => {
      showAuth();
    });

    window.netlifyIdentity.on("error", () => {
      authStatus.textContent = "We could not complete sign-in. Please try again.";
      authStatus.classList.add("is-error");
    });

    loginButton.addEventListener("click", () => {
      authStatus.textContent = "Opening secure sign-in…";
      window.netlifyIdentity.open("login");
    });

    profileButton.addEventListener("click", async () => {
      await window.netlifyIdentity.logout();
    });

    window.netlifyIdentity.init();
  }

  initialiseIdentity();
})();
