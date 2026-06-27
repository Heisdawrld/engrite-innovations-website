// Custom cursor — only on desktop fine pointers, respecting reduced-motion
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.innerWidth >= 1024;
if (hasFinePointer && !reducedMotion && isDesktop) {
  const c = document.getElementById('c'), cr = document.getElementById('cr');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; c.style.left = mx + 'px'; c.style.top = my + 'px'; }, { passive: true });
  (function loop() { rx += (mx - rx) * .13; ry += (my - ry) * .13; cr.style.left = rx + 'px'; cr.style.top = ry + 'px'; requestAnimationFrame(loop); })();
  document.querySelectorAll('a,button,input,select,textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { c.style.transform = 'translate(-50%,-50%) scale(2.8)'; cr.style.transform = 'translate(-50%,-50%) scale(1.6)'; });
    el.addEventListener('mouseleave', () => { c.style.transform = 'translate(-50%,-50%) scale(1)'; cr.style.transform = 'translate(-50%,-50%) scale(1)'; });
  });
}

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('shadow', scrollY > 40), { passive: true });

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileBackdrop = document.getElementById('mobile-backdrop');
function setMenu(open) {
  navToggle.classList.toggle('open', open);
  mobileMenu.classList.toggle('open', open);
  mobileBackdrop.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}
navToggle.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileBackdrop.addEventListener('click', () => setMenu(false));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Scroll reveal
const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .1 });
document.querySelectorAll('.fu').forEach(el => obs.observe(el));

// Dynamic Property Loading
async function loadProperties() {
  const grid = document.getElementById('property-grid');
  if (!grid) return;

  try {
    const res = await fetch('assets/js/properties.json');
    if (!res.ok) throw new Error('Failed to fetch properties');
    const props = await res.json();

    grid.innerHTML = props.map(p => `
      <div class="pcard fu">
        <div class="pcard-imgwrap">
          <img src="${p.image}" alt="${p.name} building" class="pcard-img" loading="lazy" decoding="async">
          <div class="pbadge ${p.badgeClass}">${p.badge}</div>
        </div>
        <div class="pinfo">
          <div class="ptags">
            ${p.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
          </div>
          <a href="#contact" class="pcta" data-property="${p.name}">Enquire About ${p.name}
            <svg width="18" height="10" viewBox="0 0 24 14" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M1 7h22M17 1l6 6-6 6"/></svg>
          </a>
        </div>
      </div>
    `).join('');

    // Observe newly added elements
    grid.querySelectorAll('.fu').forEach(el => obs.observe(el));
  } catch (err) {
    console.error('Error loading properties:', err);
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#6b7280;">Unable to load property listings. Please contact us directly.</p>';
  }
}
loadProperties();

// Per-property CTA prefill — event delegation for dynamic items
document.addEventListener('click', e => {
  const a = e.target.closest('a.pcta[data-property]');
  if (!a) return;

  const property = a.getAttribute('data-property');
  const sel = document.getElementById('interest-select');
  if (sel) {
    for (const opt of sel.options) {
      if (opt.textContent.trim() === property) {
        sel.value = opt.value || opt.textContent;
        break;
      }
    }
    // Flash the form so the user sees it activated
    const form = document.querySelector('form.cform');
    if (form) {
      form.style.transition = 'box-shadow .4s';
      form.style.boxShadow = '0 0 0 3px rgba(43,168,74,.35)';
      setTimeout(() => { form.style.boxShadow = ''; }, 1400);
    }
  }
});

// ─────────────────────────────────────────────────────────────────
// FORMS — Netlify Forms via AJAX submission
// Posts to / with form-name in body. Netlify intercepts and saves
// the submission without any page navigation or redirect.
// ─────────────────────────────────────────────────────────────────

const successModal = document.getElementById('form-success');
const successTitle = document.getElementById('fs-title');
const successMsg = document.getElementById('fs-msg');
const successClose = document.getElementById('fs-close');

function showSuccess(title, msg) {
  successTitle.textContent = title;
  successMsg.textContent = msg;
  successModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function hideSuccess() {
  successModal.style.display = 'none';
  document.body.style.overflow = '';
}
successClose.addEventListener('click', hideSuccess);
successModal.addEventListener('click', e => { if (e.target === successModal) hideSuccess(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && successModal.style.display === 'flex') hideSuccess(); });

function encode(data) {
  return Object.keys(data).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])).join('&');
}

function wireForm(form, opts) {
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    // Collect form data
    const fd = new FormData(form);
    const data = {};
    fd.forEach((v, k) => { data[k] = v; });
    // Ensure form-name is present for Netlify
    if (!data['form-name']) data['form-name'] = form.getAttribute('name');

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      });
      if (res.ok || res.status === 200 || res.status === 303) {
        form.reset();
        showSuccess(opts.successTitle, opts.successMsg);
      } else {
        throw new Error('Server returned ' + res.status);
      }
    } catch (err) {
      console.error('Form submission failed:', err);
      showSuccess(
        'Something went wrong',
        'We couldn\'t send your message right now. Please reach us directly: engriteinnovations@gmail.com or +234 813 066 5862.'
      );
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
}

wireForm(document.getElementById('contact-form'), {
  successTitle: 'Message Received',
  successMsg: 'Thank you for reaching out. The Engrite team will be in touch within 24 hours.'
});
wireForm(document.getElementById('newsletter-form'), {
  successTitle: 'You\'re On The List',
  successMsg: 'Watch your inbox for new launches, investment opportunities, and exclusive property updates.'
});
