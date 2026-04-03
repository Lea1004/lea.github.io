document.addEventListener('DOMContentLoaded', () => {
  // ---------- MULTILANGUAGE DATA ----------
  const translations = {
    sl: {
      nav: { home: "Domov", cv: "CV", contact: "Kontakt" },
      heroMain: "Hojla! Sem Lea Jazbinšek, oblikovalka vizualnih vsebin s socioantropološkim ozadjem in praktičnimi izkušnjami na področju grafičnega oblikovanja.",
      heroSub: "Poleg grafičnega oblikovanja obožujem vse veje umetnosti in izdelujem uporabne, personalizirane rešitve po meri ljudi.",
      heroBtn: "Kontakt",
      heroCvBtn: "Poglej CV",
      cvTitle: "Življenjepis",
      contactTitle: "Kontakt",
      contactText: "Veselim se sodelovanja!",
      contactEmail: "lea.jazbinsek01@gmail.com",
      contactPhone: "+386 51 836 776",
      submitBtn: "Pošlji sporočilo",
      footer: "© 2025 Lea Jazbinšek – Vse pravice pridržane.",
      formAlert: "Hvala! Sporočilo je bilo poslano (demo).",
      downloadCvBtn: "Prenesi CV",
      viewProjectBtn: "Ogled projekta →"
    },
    en: {
      nav: { home: "Home", cv: "Resume", contact: "Contact" },
      heroMain: "Hi! I'm Lea Jazbinšek, a visual designer with a socio-anthropological background and hands-on experience in graphic design.",
      heroSub: "Besides graphic design, I enjoy all branches of art and make useful, personalized solutions tailored to people.",
      heroBtn: "Let's connect",
      heroCvBtn: "View Resume",
      cvTitle: "Resume",
      contactTitle: "Contact",
      contactText: "I'm excited to collaborate!",
      contactEmail: "lea.jazbinsek01@gmail.com",
      contactPhone: "+386 51 836 776",
      submitBtn: "Send Message",
      footer: "© 2025 Lea Jazbinšek – All rights reserved.",
      formAlert: "Thank you! Your message has been sent (demo).",
      downloadCvBtn: "Download CV",
      viewProjectBtn: "View Project →"
    }
  };

  function getStoredLanguage() {
    return localStorage.getItem('lang') || 'sl';
  }

  let currentLang = getStoredLanguage();

  const floatingLangBtn = document.getElementById('floatingLangBtn');
  const sesame = document.getElementById('sesameBtn');
  const navMenu = document.getElementById('navMenu');

  function updateCV(lang) {
    const slBlock = document.getElementById('cv-sl');
    const enBlock = document.getElementById('cv-en');
    if (slBlock && enBlock) {
      slBlock.style.display = lang === 'sl' ? 'block' : 'none';
      enBlock.style.display = lang === 'en' ? 'block' : 'none';
    }
  }

  function updateUIByLanguage() {
    const t = translations[currentLang];

    const homeLink = document.querySelector('a[href="index.html"]');
    const cvLink = document.querySelector('a[href="cv.html"]');
    const contactLink = document.querySelector('a[href="contact.html"]');
    if (homeLink) homeLink.textContent = t.nav.home;
    if (cvLink) cvLink.textContent = t.nav.cv;
    if (contactLink) contactLink.textContent = t.nav.contact;

    const heroMain = document.getElementById('heroMain');
    if (heroMain) heroMain.textContent = t.heroMain;
    const heroSub = document.getElementById('heroSub');
    if (heroSub) heroSub.textContent = t.heroSub;

    const heroBtn = document.getElementById('heroBtn');
    if (heroBtn) heroBtn.textContent = t.heroBtn;
    const heroCvBtn = document.getElementById('heroCvBtn');
    if (heroCvBtn) heroCvBtn.textContent = t.heroCvBtn;

    const contactTitle = document.getElementById('contactTitle');
    if (contactTitle) contactTitle.textContent = t.contactTitle;
    const contactText = document.getElementById('contactText');
    if (contactText) contactText.textContent = t.contactText;
    const contactEmail = document.getElementById('contactEmail');
    if (contactEmail) contactEmail.textContent = t.contactEmail;
    const contactPhone = document.getElementById('contactPhone');
    if (contactPhone) contactPhone.textContent = t.contactPhone;
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) submitBtn.textContent = t.submitBtn;

    const cvTitle = document.getElementById('cvTitle');
    if (cvTitle) cvTitle.textContent = t.cvTitle;
    updateCV(currentLang);

    const footerText = document.getElementById('footerText');
    if (footerText) footerText.textContent = t.footer;

    if (floatingLangBtn) {
      floatingLangBtn.textContent = currentLang === 'sl' ? '🇬🇧 EN' : '🇸🇮 SL';
    }

    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn) {
      downloadCvBtn.textContent = t.downloadCvBtn;
    }
  }

  // ---------- RENDER ALL PROJECTS ----------
  function renderProjects() {
    const gridContainer = document.getElementById('allProjectsGrid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    const allProjects = [];
    for (const category of Object.values(projects)) {
      allProjects.push(...category);
    }

    allProjects.forEach(project => {
      const title = project.title[currentLang];
      const description = project.description[currentLang];

      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <img src="${project.thumbnail}" alt="${title}">
        <div class="card-content">
          <h3>${title}</h3>
          <p>${description}</p>
          <a href="project.html?slug=${project.slug}" class="card-link">${translations[currentLang].viewProjectBtn}</a>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }

  //  OVERLAP DETECTION (simple, immediate) 
  function checkOverlap() {
    const langBtn = document.getElementById('floatingLangBtn');
    const footer = document.querySelector('footer');
    if (!langBtn || !footer) return;

    const btnRect = langBtn.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const overlaps = btnRect.bottom > footerRect.top && btnRect.top < footerRect.bottom;

    if (overlaps) {
      langBtn.classList.add('over-footer');
    } else {
      langBtn.classList.remove('over-footer');
    }
  }

  // Attach scroll/resize listeners immediately
  window.addEventListener('scroll', checkOverlap);
  window.addEventListener('resize', checkOverlap);

  // ---------- LANGUAGE SWITCHING ----------
  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateUIByLanguage();
    renderProjects();
    document.documentElement.lang = currentLang === 'sl' ? 'sl' : 'en';
    checkOverlap();

    // Dispatch event so other pages (like project.html) can react
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));
  }

  function toggleLanguage() {
    const newLang = currentLang === 'sl' ? 'en' : 'sl';
    setLanguage(newLang);
  }

  // ---------- EVENT LISTENERS ----------
  if (floatingLangBtn) {
    floatingLangBtn.addEventListener('click', toggleLanguage);
  }

  // Mobile menu
  if (sesame && navMenu) {
    sesame.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !sesame.contains(e.target) && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.sidenav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active-nav');
    } else {
      link.classList.remove('active-nav');
    }
  });

  // Download CV
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      const pdfFile = currentLang === 'sl'
        ? 'Lea Jazbinšek_CV_SLO.pdf'
        : 'Lea Jazbinšek_CV_ENG.pdf';
      const link = document.createElement('a');
      link.href = pdfFile;
      link.download = pdfFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Initial UI and projects
  updateUIByLanguage();
  renderProjects();
  document.documentElement.lang = currentLang === 'sl' ? 'sl' : 'en';

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(translations[currentLang].formAlert);
      contactForm.reset();
    });
  }

  // --- Overlap checks: multiple attempts to ensure initial detection ---
  // First check immediately
  checkOverlap();
  // Then after a short delay (for any layout shifts)
  setTimeout(checkOverlap, 100);
  setTimeout(checkOverlap, 300);
  // Also after the page is fully loaded (images, fonts)
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    checkOverlap();
  });
});