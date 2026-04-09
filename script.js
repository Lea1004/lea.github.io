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
      viewProjectBtn: "Ogled projekta →",
      // Contact form placeholders
      contactNamePlaceholder: "Ime in priimek",
      contactEmailPlaceholder: "E-pošta",
      contactMessagePlaceholder: "Sporočilo..."
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
      viewProjectBtn: "View Project →",
      // Contact form placeholders
      contactNamePlaceholder: "Name and surname",
      contactEmailPlaceholder: "Email",
      contactMessagePlaceholder: "Message..."
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

    // Update contact form placeholders
    const nameInput = document.getElementById('nameInput');
    if (nameInput) nameInput.placeholder = t.contactNamePlaceholder;
    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.placeholder = t.contactEmailPlaceholder;
    const msgInput = document.getElementById('msgInput');
    if (msgInput) msgInput.placeholder = t.contactMessagePlaceholder;

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

      // Create clickable card as an <a> element
      const cardLink = document.createElement('a');
      cardLink.href = `project.html?slug=${project.slug}`;
      cardLink.className = 'project-card-link';

      // Image
      const img = document.createElement('img');
      img.src = project.thumbnail;
      img.alt = title;
      img.loading = 'lazy';

      // Text container
      const textDiv = document.createElement('div');
      textDiv.className = 'project-card-text';

      const titleElem = document.createElement('h3');
      titleElem.textContent = title;

      const descElem = document.createElement('p');
      descElem.textContent = description;

      textDiv.appendChild(titleElem);
      textDiv.appendChild(descElem);

      cardLink.appendChild(img);
      cardLink.appendChild(textDiv);

      gridContainer.appendChild(cardLink);
    });
  }

  //  OVERLAP DETECTION
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
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = currentLang === 'sl' ? 'Pošiljanje...' : 'Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        // The access_key is already in the form as a hidden input

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          const successMsg = currentLang === 'sl'
            ? '✅ Sporočilo uspešno poslano!'
            : '✅ Message sent successfully!';
          alert(successMsg);
          contactForm.reset();
        } else {
          const errorMsg = currentLang === 'sl'
            ? `Napaka: ${data.message || 'Nekaj je šlo narobe.'}`
            : `Error: ${data.message || 'Something went wrong.'}`;
          alert(errorMsg);
        }
      } catch (error) {
        console.error('Web3Forms error:', error);
        const failMsg = currentLang === 'sl'
          ? '❌ Napaka pri pošiljanju. Preverite internetno povezavo.'
          : '❌ Submission failed. Please check your internet connection.';
        alert(failMsg);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // OVERLAP CHECK
  // First check immediately
  checkOverlap();

  // After a short delay
  setTimeout(checkOverlap, 100);
  setTimeout(checkOverlap, 300);
  
  // After the page is fully loaded
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    checkOverlap();
  });
});
