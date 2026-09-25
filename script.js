// Mobile menu
const header = document.querySelector('.site-header');
const menuBtn = document.getElementById('menuBtn');
const menuIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>';
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
const navLinks = Array.from(document.querySelectorAll('.desktop-nav a')).map(a => [a.getAttribute('href'), a.textContent]);
function setMenu(open) {
  const existing = header.querySelector('.mobile-nav');
  if (existing) existing.remove();
  menuBtn.innerHTML = open ? closeIcon : menuIcon;
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (!open) return;
  const nav = document.createElement('nav');
  nav.className = 'mobile-nav';
  nav.setAttribute('aria-label', 'Mobile navigation');
  navLinks.forEach(([href, text]) => {
    const a = document.createElement('a');
    a.href = href; a.textContent = text;
    a.addEventListener('click', () => setMenu(false));
    nav.appendChild(a);
  });
  header.appendChild(nav);
}
menuBtn.addEventListener('click', () => setMenu(!header.querySelector('.mobile-nav')));

// Project filters
const buttons = document.querySelectorAll('#filters button');
const cards = document.querySelectorAll('.project-card');
buttons.forEach(btn => btn.addEventListener('click', () => {
  const f = btn.textContent.trim();
  buttons.forEach(b => b.classList.toggle('active', b === btn));
  cards.forEach(card => {
    const tags = card.dataset.tags.toLowerCase().split('|');
    const show = f === 'All' || (f === 'Ongoing' ? card.dataset.status === 'progress' : tags.some(t => t.includes(f.toLowerCase())));
    card.style.display = show ? '' : 'none';
  });
}));
