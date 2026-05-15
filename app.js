/* =========================================================
   FABRÍCIO TANAIA · Interactions
   ========================================================= */

(function () {
  'use strict';

  /* ---------- Custom cursor ---------- */
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    const dot = cursor.querySelector('.cursor__dot');
    const ring = cursor.querySelector('.cursor__ring');
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    }, { passive: true });

    function loop() {
      // Smooth ring follow
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    // Hover states from data-cursor
    const growEls = document.querySelectorAll('[data-cursor="grow"], a, button');
    growEls.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-grow'));
    });
    document.querySelectorAll('[data-cursor="play"]').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-play'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-play'));
    });

    // Hide on touch
    document.addEventListener('touchstart', () => cursor.style.display = 'none', { once: true });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ---------- Scroll progress ---------- */
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    const onScrollProgress = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop / total) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    document.addEventListener('scroll', onScrollProgress, { passive: true });
    onScrollProgress();
  }

  /* ---------- Smooth anchor scroll with offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal on scroll (with stagger via data-delay) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Top bar hide on scroll down, show on scroll up ---------- */
  const topbar = document.getElementById('topbar');
  if (topbar) {
    let lastY = 0;
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 200 && y > lastY) {
          topbar.style.top = '-80px';
        } else {
          topbar.style.top = '1rem';
        }
        lastY = y;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Pause case videos when out of view (perf) ---------- */
  const caseVideos = document.querySelectorAll('.case__media video');
  if ('IntersectionObserver' in window && caseVideos.length) {
    const vio = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    }, { threshold: 0.25 });
    caseVideos.forEach(v => vio.observe(v));
  }

  /* ---------- Marquee pause on hover ---------- */
  const marquee = document.querySelector('.marquee__track');
  if (marquee) {
    marquee.parentElement.addEventListener('mouseenter', () => {
      marquee.style.animationPlayState = 'paused';
    });
    marquee.parentElement.addEventListener('mouseleave', () => {
      marquee.style.animationPlayState = 'running';
    });
  }
})();

