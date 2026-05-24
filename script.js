'use strict';

/* ── DOM References ─────────────────────────────────────────── */
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mobileNavDrawer = document.getElementById('mobileNavDrawer');
const headerEl        = document.querySelector('header');
const backTopBtn      = document.getElementById('backTop');

/* ── Close Mobile Drawer ────────────────────────────────────── */
function closeDrawer() {
  if (!mobileNavDrawer) return;
  mobileNavDrawer.classList.remove('open');
  mobileNavToggle.classList.remove('open');
  mobileNavToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

/* ── Mobile Nav Toggle ──────────────────────────────────────── */
if (mobileNavToggle && mobileNavDrawer) {
  mobileNavToggle.addEventListener('click', () => {
    const isOpen = mobileNavDrawer.classList.toggle('open');
    mobileNavToggle.classList.toggle('open', isOpen);
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNavDrawer.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (
      mobileNavDrawer.classList.contains('open') &&
      !mobileNavDrawer.contains(e.target) &&
      !mobileNavToggle.contains(e.target)
    ) closeDrawer();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) closeDrawer();
  });
}

/* ── Smooth Scroll ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (hash && hash.length > 1) {
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        const offset = (headerEl ? headerEl.offsetHeight : 0) + 8;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    }
  });
});

/* ── Scroll to Location ─────────────────────────────────────── */
function scrollToLocation() {
  const loc = document.querySelector('.location-section');
  if (loc) {
    const offset = (headerEl ? headerEl.offsetHeight : 0) + 8;
    window.scrollTo({ top: loc.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  }
}

document.getElementById('visitarHeroBtn')?.addEventListener('click', scrollToLocation);

document.getElementById('visitarBtn')?.addEventListener('click', () => {
  closeDrawer();
  scrollToLocation();
});

/* ── Sticker Hover ──────────────────────────────────────────── */
const sticker = document.querySelector('.sticker');
if (sticker) {
  sticker.addEventListener('mouseenter', () => {
    sticker.style.transition = 'transform 0.4s ease';
    sticker.style.transform = 'rotate(-12deg) scale(1.08)';
  });
  sticker.addEventListener('mouseleave', () => {
    sticker.style.transform = 'rotate(12deg) scale(1)';
  });
}

/* ── Scroll: Header Shadow + Back-to-Top ────────────────────── */
window.addEventListener('scroll', () => {
  if (headerEl) {
    headerEl.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(26,0,101,0.25)'
      : '';
  }
  if (backTopBtn) {
    backTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
}, { passive: true });

/* ── Marquee: Pause on Hover ────────────────────────────────── */
const marqueeContent = document.querySelector('.marquee-content');
if (marqueeContent) {
  const marqueeEl = marqueeContent.closest('.marquee');
  if (marqueeEl) {
    marqueeEl.addEventListener('mouseenter', () => marqueeContent.style.animationPlayState = 'paused');
    marqueeEl.addEventListener('mouseleave', () => marqueeContent.style.animationPlayState = 'running');
  }
}

/* ── IntersectionObserver: Fade-in ─────────────────────────── */
const io = new IntersectionObserver(
  (entries) => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
