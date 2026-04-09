document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════
     1. NAVBAR — scroll shadow + mobile burger
  ═══════════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.innerHTML = navLinks.classList.contains('open')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.innerHTML = '<i class="fas fa-bars"></i>';
    })
  );

  /* ═══════════════════════════════════════════════
     2. HERO — Ken‑Burns + parallax
  ═══════════════════════════════════════════════ */
  const hero = document.getElementById('hero');
  const heroImg = document.getElementById('hero-img');
  hero.classList.add('loaded');            // triggers Ken‑Burns scale

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy < window.innerHeight && heroImg) {
      heroImg.style.transform = `translateY(${sy * 0.35}px)`;
    }
  });

  /* ═══════════════════════════════════════════════
     3. MAIN MENU SLIDER
  ═══════════════════════════════════════════════ */
  const mainSlides = [
    {
      img: 'https://images.unsplash.com/photo-1563805042-7684c8e9e533?w=600&q=85&auto=format&fit=crop',
      title: 'The Classics. -',
      desc: 'Rich, creamy vanilla and chocolate made fresh daily from locally sourced ingredients. Pure, timeless perfection.'
    },
    {
      img: 'https://images.unsplash.com/photo-1570197781417-0a82375893d1?w=600&q=85&auto=format&fit=crop',
      title: 'Waffle Cones. -',
      desc: 'Our crispy, golden waffle cones are baked fresh every morning. The perfect companion to any scoop.'
    },
    {
      img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&q=85&auto=format&fit=crop',
      title: 'Rainbow Edition. -',
      desc: 'Celebrate colour and flavour! Our vibrant rainbow scoops are as beautiful as they are delicious.'
    }
  ];

  let mainIdx = 0;
  const mainSlideImg   = document.getElementById('main-slide-img');
  const mainSlideTitle = document.getElementById('main-slide-title');
  const mainSlideDesc  = document.getElementById('main-slide-desc');
  const mainDotsEl     = document.getElementById('main-slide-dots');

  // Build dots
  mainSlides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'slide-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goMain(i));
    mainDotsEl.appendChild(d);
  });

  function goMain(idx) {
    mainIdx = (idx + mainSlides.length) % mainSlides.length;
    mainSlideImg.style.opacity = '0';
    setTimeout(() => {
      mainSlideImg.src = mainSlides[mainIdx].img;
      mainSlideTitle.textContent = mainSlides[mainIdx].title;
      mainSlideDesc.textContent  = mainSlides[mainIdx].desc;
      mainSlideImg.style.opacity = '1';
    }, 300);
    document.querySelectorAll('#main-slide-dots .slide-dot').forEach((d, i) =>
      d.classList.toggle('active', i === mainIdx)
    );
  }

  document.getElementById('main-prev').addEventListener('click', () => goMain(mainIdx - 1));
  document.getElementById('main-next').addEventListener('click', () => goMain(mainIdx + 1));

  // Auto‑advance
  setInterval(() => goMain(mainIdx + 1), 5000);

  /* ═══════════════════════════════════════════════
     4. SUNDAE SLIDER
  ═══════════════════════════════════════════════ */
  const sundaeSlides = [
    {
      img: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=85&auto=format&fit=crop',
      title: 'Classic Hot Fudge Sundae. -',
      desc: 'Vanilla ice cream smothered in hot fudge, whipped cream, crushed nuts and a maraschino cherry.'
    },
    {
      img: 'https://images.unsplash.com/photo-1558500661-840bf2b6bfea?w=600&q=85&auto=format&fit=crop',
      title: 'Berry Blast Sundae. -',
      desc: 'Mixed berry compote drizzled over creamy strawberry ice cream with fresh mint and granola crumble.'
    },
    {
      img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=85&auto=format&fit=crop',
      title: 'Pistachio Dream Sundae. -',
      desc: 'Our signature pistachio gelato topped with crushed pistachios, honey drizzle and rose petals.'
    }
  ];

  let sunIdx = 0;
  const sunImg   = document.getElementById('sundae-slide-img');
  const sunTitle = document.getElementById('sun-slide-title');
  const sunDesc  = document.getElementById('sun-slide-desc');

  function goSundae(idx) {
    sunIdx = (idx + sundaeSlides.length) % sundaeSlides.length;
    sunImg.style.opacity = '0';
    setTimeout(() => {
      sunImg.src = sundaeSlides[sunIdx].img;
      sunTitle.textContent = sundaeSlides[sunIdx].title;
      sunDesc.textContent  = sundaeSlides[sunIdx].desc;
      sunImg.style.opacity = '1';
    }, 300);
  }

  document.getElementById('sun-prev').addEventListener('click', () => goSundae(sunIdx - 1));
  document.getElementById('sun-next').addEventListener('click', () => goSundae(sunIdx + 1));
  setInterval(() => goSundae(sunIdx + 1), 6000);

  /* ═══════════════════════════════════════════════
     5. BRANCH SELECTOR
  ═══════════════════════════════════════════════ */
  const citySelect = document.getElementById('city-select');
  const bcName1    = document.getElementById('bc-name-1');

  if (citySelect) {
    citySelect.addEventListener('change', () => {
      const city = citySelect.value;
      bcName1.textContent = `IceCreamMan – ${city}`;
      const cards = document.querySelectorAll('.branch-card');
      cards.forEach(c => c.classList.remove('active-branch'));
      if (cards[0]) cards[0].classList.add('active-branch');
    });
  }

  document.querySelectorAll('.branch-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.branch-card').forEach(c => c.classList.remove('active-branch'));
      card.classList.add('active-branch');
    });
  });

  /* ═══════════════════════════════════════════════
     6. REVIEWS PAGINATION DOTS
  ═══════════════════════════════════════════════ */
  document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelector('.dot.active').classList.remove('active');
      dot.classList.add('active');
    });
  });

  /* ═══════════════════════════════════════════════
     6b. MENU TABS FILTER
  ═══════════════════════════════════════════════ */
  const menuTabs  = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-item-card');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      menuCards.forEach(card => {
        const matches = cat === 'all' || card.dataset.cat === cat;
        card.classList.toggle('hidden', !matches);
        // small stagger animation on show
        if (matches) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeUp 0.5s ease both';
        }
      });
    });
  });

  /* ═══════════════════════════════════════════════
     7. GALLERY LIGHTBOX
  ═══════════════════════════════════════════════ */
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentLbIdx = 0;

  function openLightbox(idx) {
    currentLbIdx = idx;
    lbImg.src = galleryItems[idx].dataset.src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function navLightbox(dir) {
    currentLbIdx = (currentLbIdx + dir + galleryItems.length) % galleryItems.length;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = galleryItems[currentLbIdx].dataset.src;
      lbImg.style.opacity = '1';
    }, 200);
  }

  galleryItems.forEach((item, idx) => item.addEventListener('click', () => openLightbox(idx)));
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbPrev.addEventListener('click', e => { e.stopPropagation(); navLightbox(-1); });
  lbNext.addEventListener('click', e => { e.stopPropagation(); navLightbox(1); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  /* ═══════════════════════════════════════════════
     8. SCROLL REVEAL
  ═══════════════════════════════════════════════ */
  const revealTargets = document.querySelectorAll(
    '.menu-card, .sig-card, .sundae-card, .flavor-card, .branch-card, .review-card, .gallery-item, .feature-item, .section-header'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ═══════════════════════════════════════════════
     9. SMS LINK BUTTON
  ═══════════════════════════════════════════════ */
  window.handleSMS = function () {
    const input = document.getElementById('sms-input');
    const val = input ? input.value.trim() : '';
    if (!val) { alert('Please enter a valid phone number.'); return; }
    alert(`✅ App download link sent to ${val}!`);
    if (input) input.value = '';
  };

  /* ═══════════════════════════════════════════════
     10. NEWSLETTER BUTTON
  ═══════════════════════════════════════════════ */
  window.handleNewsletter = function (btn) {
    const input = btn.previousElementSibling;
    const val = input ? input.value.trim() : '';
    if (!val || !val.includes('@')) { alert('Please enter a valid email address.'); return; }
    btn.textContent = '✓ SUBSCRIBED!';
    btn.style.background = '#2ecc71';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = 'SUBSCRIBE';
      btn.style.background = '';
      btn.style.color = '';
      if (input) input.value = '';
    }, 3000);
  };

});
