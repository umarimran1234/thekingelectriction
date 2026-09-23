/* The King's Electric — site interactions */

// ---- Form configuration -------------------------------------------------
// Paste a form endpoint (e.g. https://formspree.io/f/xxxxxx) to receive
// submissions by email. Until then, forms fall back to opening the visitor's
// email app addressed to FALLBACK_EMAIL (if set), or ask them to call.
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "";
const PHONE = "(817) 308-6444";
// -------------------------------------------------------------------------

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const nav = document.getElementById("site-nav");

  // Sticky header shadow
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const setNavHeight = () => {
    if (!header) return;
    const bottom = header.getBoundingClientRect().bottom;
    document.documentElement.style.setProperty("--nav-h", `${window.innerHeight - bottom}px`);
  };
  const closeNav = () => {
    burger?.setAttribute("aria-expanded", "false");
    burger?.setAttribute("aria-label", "Open menu");
    nav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };
  burger?.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    if (open) setNavHeight();
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
      document.querySelectorAll(".nav__toggle[aria-expanded='true']").forEach((b) => b.setAttribute("aria-expanded", "false"));
    }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 960) closeNav(); });

  // Services dropdown
  document.querySelectorAll(".nav__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true"));
    });
  });
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".nav__toggle[aria-expanded='true']").forEach((btn) => {
      if (!btn.parentElement.contains(e.target)) btn.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal on scroll (staggered within each parent)
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
        entry.target.style.setProperty("--d", `${Math.min(siblings.indexOf(entry.target), 6) * 0.08}s`);
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Count-up numbers
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll("[data-count]");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => co.observe(el));
  }

  // Pre-select service type / position from URL or apply buttons
  const params = new URLSearchParams(location.search);
  const type = params.get("type");
  if (type) {
    const radio = document.querySelector(`input[name="type"][value="${CSS.escape(type)}"]`);
    if (radio) radio.checked = true;
  }
  document.querySelectorAll("[data-position]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const select = document.querySelector('select[name="position"]');
      if (select) select.value = btn.dataset.position;
    });
  });

  // Forms
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const status = form.querySelector(".form__status");
    const setStatus = (msg, ok) => {
      status.textContent = msg;
      status.className = `form__status ${ok ? "is-ok" : "is-error"}`;
    };

    form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("is-invalid"));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll("input, select, textarea").forEach((el) => {
        const field = el.closest(".field");
        const invalid = !el.checkValidity();
        field?.classList.toggle("is-invalid", invalid);
        if (invalid && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        setStatus("Please fill in the highlighted fields.", false);
        firstInvalid.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      const subject = form.dataset.form === "careers"
        ? `Job application: ${data.position} — ${data.name}`
        : `Estimate request (${data.type}) — ${data.name}`;

      if (FORM_ENDPOINT) {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        try {
          const res = await fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({ _subject: subject, ...data }),
          });
          if (!res.ok) throw new Error(res.statusText);
          form.reset();
          setStatus("Thank you! We received your message and will be in touch soon.", true);
        } catch {
          setStatus(`Sorry, something went wrong. Please call us at ${PHONE}.`, false);
        } finally {
          btn.disabled = false;
        }
        return;
      }

      if (FALLBACK_EMAIL) {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
        location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setStatus("Opening your email app to send your message…", true);
        return;
      }

      setStatus(`Online requests are coming soon — please call us at ${PHONE}.`, false);
    });
  });
});
