/* KSA ROOTS MARKET 2026 — main.js */

document.addEventListener('DOMContentLoaded', () => {

  // ── Falling Leaves (requires leaf-data.js) ────────────────
  (function initLeaves() {
    const canvas = document.getElementById('leafCanvas');
    if (!canvas || typeof LEAF_DATA === 'undefined') return;
    const N = 20;
    for (let i = 0; i < N; i++) {
      const idx  = Math.floor(Math.random() * LEAF_DATA.length);
      const lf   = LEAF_DATA[idx];
      const size = 22 + Math.random() * 22;
      const left = Math.random() * 100;
      const dur  = 8 + Math.random() * 10;
      const delay = -(Math.random() * dur);
      const drift = (Math.random() - 0.5) * 160;

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', `${-size/2} ${-size/2} ${size} ${size}`);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('overflow', 'visible');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', lf.color);
      path.setAttribute('transform', `translate(${-lf.x0},${-lf.y0})`);
      path.setAttribute('d', lf.d);
      svg.appendChild(path);

      const wrapper = document.createElement('div');
      wrapper.className = 'falling-leaf';
      wrapper.style.cssText = [
        `left:${left.toFixed(1)}%`,
        `width:${size.toFixed(0)}px`,
        `height:${size.toFixed(0)}px`,
        `--drift:${drift.toFixed(0)}px`,
        `animation-duration:${dur.toFixed(1)}s`,
        `animation-delay:${delay.toFixed(1)}s`,
      ].join(';');
      wrapper.appendChild(svg);
      canvas.appendChild(wrapper);
    }
  })();

  // ── Light particles ───────────────────────────────────────
  (function initParticles() {
    const canvas = document.getElementById('leafCanvas');
    if (!canvas) return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%,100%{transform:translateY(0) scale(1);opacity:.4;}
        50%{transform:translateY(-20px) scale(1.4);opacity:.9;}
      }
    `;
    document.head.appendChild(style);
    for (let i = 0; i < 20; i++) {
      const d = document.createElement('div');
      const sz = (2 + Math.random() * 3).toFixed(1);
      d.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,240,200,0.65)',
        `width:${sz}px`,
        `height:${sz}px`,
        `left:${(Math.random() * 100).toFixed(1)}%`,
        `top:${(Math.random() * 70).toFixed(1)}%`,
        `animation:particleFloat ${(6 + Math.random() * 10).toFixed(1)}s ${(-Math.random() * 12).toFixed(1)}s ease-in-out infinite`,
      ].join(';');
      canvas.appendChild(d);
    }
  })();

  // ── Header scroll state ───────────────────────────────────
  const header  = document.getElementById('siteHeader');
  const fabCta  = document.getElementById('fabCta');
  const heroSec = document.getElementById('hero-top');

  function onScroll() {
    header && header.classList.toggle('scrolled', window.scrollY > 40);
    fabCta  && fabCta.classList.toggle('show', window.scrollY > (heroSec?.offsetHeight || 400) * 0.5);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Hamburger / Drawer ────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');

  function toggleDrawer(open) {
    hamburger && hamburger.classList.toggle('open', open);
    drawer    && drawer.classList.toggle('open', open);
    hamburger && hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () => toggleDrawer(!drawer?.classList.contains('open')));

  document.querySelectorAll('.drawer-link').forEach(a => {
    a.addEventListener('click', () => toggleDrawer(false));
  });

  document.addEventListener('click', e => {
    if (drawer?.classList.contains('open')
      && !drawer.contains(e.target)
      && !hamburger?.contains(e.target)) {
      toggleDrawer(false);
    }
  });

  // ── Smooth scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
    });
  });

  // ── Intersection Observer ─────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.promise-card, .flow-step').forEach(el => obs.observe(el));

  // ── FAQ accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

});
