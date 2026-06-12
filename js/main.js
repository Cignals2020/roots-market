/* KSA ROOTS MARKET 2026 — main.js  v2 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero: 落ち葉アニメーション ────────────────────────────
  (function initHeroLeaves() {
    const wrap = document.getElementById('heroLeaves');
    if (!wrap) return;

    // KVカラーから抽出した緑系の色
    const leafColors = [
      '#029044','#42ad73','#60ba8a','#4eb4ab',
      '#71c196','#5ab785','#81c8a2','#46af77'
    ];

    // 葉っぱ形状（SVGパス・原点中心の小さなパス）
    const leafShapes = [
      // 細長い葉
      'M0,-12 C4,-8 6,0 4,8 C2,14 -2,14 -4,8 C-6,0 -4,-8 0,-12 Z',
      // 丸みのある葉
      'M0,-10 C6,-6 8,2 5,9 C2,14 -2,14 -5,9 C-8,2 -6,-6 0,-10 Z',
      // 小さい葉
      'M0,-8 C3,-5 4,0 3,6 C1,10 -1,10 -3,6 C-4,0 -3,-5 0,-8 Z',
      // 逆向き
      'M0,10 C-5,6 -6,-2 -3,-8 C0,-13 3,-11 4,-6 C6,0 5,6 0,10 Z',
    ];

    const N = 22;
    for (let i = 0; i < N; i++) {
      const color = leafColors[Math.floor(Math.random() * leafColors.length)];
      const shape = leafShapes[Math.floor(Math.random() * leafShapes.length)];
      const size  = 18 + Math.random() * 20;
      const left  = Math.random() * 100;
      const dur   = 9 + Math.random() * 11;
      const delay = -(Math.random() * dur);
      const drift = (Math.random() - 0.5) * 180;

      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox',`-15 -15 30 30`);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('overflow','visible');

      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('fill', color);
      path.setAttribute('d', shape);
      svg.appendChild(path);

      const wrapper = document.createElement('div');
      wrapper.className = 'hero-leaf';
      wrapper.style.cssText = [
        `left:${left.toFixed(1)}%`,
        `width:${size.toFixed(0)}px`,
        `height:${size.toFixed(0)}px`,
        `--drift:${drift.toFixed(0)}px`,
        `animation-duration:${dur.toFixed(1)}s`,
        `animation-delay:${delay.toFixed(1)}s`,
      ].join(';');
      wrapper.appendChild(svg);
      wrap.appendChild(wrapper);
    }
  })();

  // ── Header scroll state ────────────────────────────────────
  const header  = document.getElementById('siteHeader');
  const fabCta  = document.getElementById('fabCta');
  const fabDual = document.getElementById('fabDual');
  const heroSec = document.getElementById('hero-top');

  function onScroll() {
    header && header.classList.toggle('scrolled', window.scrollY > 50);
    if (fabCta && heroSec) {
      fabCta.classList.toggle('show', window.scrollY > heroSec.offsetHeight * 0.55);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Hamburger / Drawer ─────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');

  function toggleDrawer(open) {
    hamburger && hamburger.classList.toggle('open', open);
    drawer    && drawer.classList.toggle('open', open);
    hamburger && hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger?.addEventListener('click', () =>
    toggleDrawer(!drawer?.classList.contains('open'))
  );
  document.querySelectorAll('.drawer-link').forEach(a =>
    a.addEventListener('click', () => toggleDrawer(false))
  );
  document.addEventListener('click', e => {
    if (drawer?.classList.contains('open')
      && !drawer.contains(e.target)
      && !hamburger?.contains(e.target)) {
      toggleDrawer(false);
    }
  });

  // ── Smooth scroll (offset for fixed header) ────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 56,
        behavior: 'smooth'
      });
    });
  });

  // ── Intersection Observer ──────────────────────────────────
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.promise-card, .flow-step').forEach(el => obs.observe(el));

  // ── FAQ accordion ──────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

});
