/* ============================================================
   script.js — Aditya Sharma Portfolio
   ============================================================ */

/* ─── EmailJS Setup ──────────────────────────────────────────
   STEP 1: Go to https://emailjs.com and create a free account
   STEP 2: Add a Gmail (or other) email service
   STEP 3: Create an email template with these variables:
           {{from_name}}, {{reply_to}}, {{subject}}, {{message}}
   STEP 4: Replace the three placeholder values below
   ──────────────────────────────────────────────────────────── */
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // ← Your Public Key from EmailJS dashboard

function sendEmail() {
    const btn     = document.getElementById("btnSubmit");
    const status  = document.getElementById("formStatus");
    const name    = document.getElementById("fname").value.trim();
    const email   = document.getElementById("femail").value.trim();
    const message = document.getElementById("fmessage").value.trim();

    // Basic validation
    if (!name || !email || !message) {
        status.textContent  = "Please fill in your name, email and message.";
        status.style.color  = "#ff6a3d";
        return;
    }

    btn.disabled    = true;
    btn.textContent = "SENDING...";
    status.textContent = "";

    const templateParams = {
        from_name : name,
        reply_to  : email,
        subject   : document.getElementById("fsubject").value || "Portfolio Contact",
        message   : message,
        to_name   : "Aditya"
    };

    // ← Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
        .then(() => {
            status.textContent = "✓ Message sent! I'll get back to you soon.";
            status.style.color = "var(--orange)";
            btn.textContent    = "SENT ✓";
            // Clear the form
            ["fname", "femail", "fsubject", "fmessage"].forEach(id => {
                document.getElementById(id).value = "";
            });
        })
        .catch(() => {
            status.textContent = "✕ Something went wrong. Email me at aadii052005@gmail.com";
            status.style.color = "#ff6a3d";
            btn.disabled       = false;
            btn.textContent    = "SEND MESSAGE ↗";
        });
}

/* ─── Loader ─────────────────────────────────────────────── */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const line   = loader?.querySelector(".loader-line");
    if (!loader || !line) return;
    requestAnimationFrame(() => { line.style.width = "100%"; });
    setTimeout(() => { loader.classList.add("done"); }, 1400);
});

/* ─── Custom Cursor ──────────────────────────────────────── */
const ring = document.getElementById("cursorRing");
const dot  = document.getElementById("cursorDot");

if (ring && dot) {
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener("mousemove", e => {
        mx = e.clientX;
        my = e.clientY;
    });

    // Smooth lagging ring animation
    (function animRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + "px";
        ring.style.top  = ry + "px";
        dot.style.left  = mx + "px";
        dot.style.top   = my + "px";
        requestAnimationFrame(animRing);
    })();

    // Expand ring on interactive elements
    document.querySelectorAll(
        "a, button, .project-row, .gallery-card, .nav-link, .achievement-card"
    ).forEach(el => {
        el.addEventListener("mouseenter", () => ring.classList.add("active"));
        el.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
}

/* ─── Header Scroll Effect ───────────────────────────────── */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 80);
}, { passive: true });

/* ─── Scroll Reveal (Intersection Observer) ─────────────── */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target); // fire once
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(
    ".section-header, .project-row, .gallery-card, " +
    ".exp-stat, .contact-top, .contact-email-link, .contact-bottom, " +
    ".marquee-header, .exp-right, .achievement-card, .contact-form-wrap"
).forEach((el, i) => {
    el.classList.add("reveal");
    if (i % 3 === 1) el.classList.add("reveal-delay-1");
    if (i % 3 === 2) el.classList.add("reveal-delay-2");
    revealObserver.observe(el);
});

/* ─── Smooth Scroll for Nav Links ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* ─── Animated Number Counters ──────────────────────────── */
document.querySelectorAll(".stat-big").forEach(el => {
    const target = parseInt(el.textContent);
    let started  = false;

    new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started) {
            started = true;
            let current = 0;
            const step  = target / 60;

            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = Math.floor(current);
                if (current < target) requestAnimationFrame(tick);
                else el.textContent = target; // land exactly on target
            };
            tick();
        }
    }, { threshold: 0.5 }).observe(el);
});

/* ─── Marquee Pause on Hover ─────────────────────────────── */
document.querySelectorAll(".marquee-track").forEach(track => {
    const wrap = track.closest(".marquee-track-wrap");
    wrap?.addEventListener("mouseenter", () => track.style.animationPlayState = "paused");
    wrap?.addEventListener("mouseleave", () => track.style.animationPlayState = "running");
});