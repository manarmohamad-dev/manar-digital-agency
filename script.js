const typingHeading = document.getElementById("typing");
const topButton = document.getElementById("topBtn");
const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("main section[id]");

function initTypingEffect() {
    if (!typingHeading) return;

    const text = typingHeading.textContent.trim();
    let index = 0;
    typingHeading.textContent = "";

    function typeNextLetter() {
        if (index >= text.length) return;
        typingHeading.textContent += text.charAt(index);
        index += 1;
        window.setTimeout(typeNextLetter, 45);
    }

    typeNextLetter();
}

function initBackToTop() {
    if (!topButton) return;

    window.addEventListener("scroll", () => {
        topButton.style.display = window.scrollY > 400 ? "block" : "none";
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initMobileMenu() {
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function initRevealOnScroll() {
    const revealItems = document.querySelectorAll(
        ".service-card, .portfolio-item, .process-card, .stat-box, .contact-box, .skills-list span"
    );

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("show"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach((item) => {
        item.classList.add("hidden");
        observer.observe(item);
    });
}

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
}

function initScrollEffects() {
    window.addEventListener("scroll", () => {
        updateActiveNavigation();

        if (header) {
            header.style.boxShadow = window.scrollY > 50
                ? "0 10px 30px rgba(0,0,0,.15)"
                : "none";
        }
    });

    updateActiveNavigation();
}

window.addEventListener("load", () => {
    initTypingEffect();
    initBackToTop();
    initMobileMenu();
    initRevealOnScroll();
    initScrollEffects();
});
