// Troque estes dados pelos contatos reais do site.
const WHATSAPP_NUMBER = "5541997915187";
const INSTAGRAM_URL = "https://instagram.com/ecko.arquitetura";

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");

function handleScroll() {
  const shouldCompact = window.scrollY > 40;
  navbar.classList.toggle("scrolled", shouldCompact);
  backToTop.classList.toggle("show", window.scrollY > 560);
}

window.addEventListener("scroll", handleScroll);
handleScroll();

menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animações ao rolar a página
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Marcação do link ativo no menu
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

// Filtros da galeria
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !shouldShow);
    });
  });
});

// Lightbox simples da galeria
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(card) {
  lightboxImage.src = card.dataset.image;
  lightboxImage.alt = card.dataset.title;
  lightboxTitle.textContent = card.dataset.title;
  lightboxDescription.textContent = card.dataset.description;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

// Accordion do FAQ
const accordionButtons = document.querySelectorAll(".accordion-item");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const isOpen = button.classList.contains("active");

    accordionButtons.forEach((item) => {
      item.classList.remove("active");
      item.nextElementSibling.classList.remove("open");
    });

    if (!isOpen) {
      button.classList.add("active");
      content.classList.add("open");
    }
  });
});

// Formulário abrindo WhatsApp
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const nome = data.get("nome");
  const email = data.get("email");
  const servico = data.get("servico");
  const mensagem = data.get("mensagem");

  const text = `Olá, Écko Arquitetura!%0A%0A` +
    `Meu nome é ${encodeURIComponent(nome)}.%0A` +
    `E-mail: ${encodeURIComponent(email)}%0A` +
    `Serviço de interesse: ${encodeURIComponent(servico)}%0A%0A` +
    `Mensagem: ${encodeURIComponent(mensagem)}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
});

// Mantém os links de contato sincronizados com o número definido acima
const whatsappLinks = document.querySelectorAll("a[href^='https://wa.me/']");
whatsappLinks.forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

const instagramLinks = document.querySelectorAll("a[href*='instagram.com']");
instagramLinks.forEach((link) => {
  link.href = INSTAGRAM_URL;
});
