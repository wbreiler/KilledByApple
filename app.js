import { selectProducts } from './catalog.js';
const $ = selector => document.querySelector(selector);
const icons = {
  ipod: '<rect x="18" y="7" width="28" height="50" rx="5"/><rect x="23" y="13" width="18" height="14" rx="1"/><circle cx="32" cy="42" r="10"/><circle cx="32" cy="42" r="3"/>',
  airport: '<path d="M22 18h20v38H22zM22 18l10-4 10 4M22 51h20"/><circle cx="32" cy="47" r="1"/><path d="M18 10a25 25 0 0 1 28 0M23 6a18 18 0 0 1 18 0"/>',
  hardware: '<rect x="10" y="10" width="44" height="32" rx="3"/><path d="M27 42v9M37 42v9M19 53h26M16 17h32v19H16"/>',
  software: '<rect x="9" y="10" width="46" height="44" rx="8"/><path d="M9 22h46M17 16h1M23 16h1M22 31l-7 7 7 7M42 31l7 7-7 7M35 29l-6 18"/>',
  service: '<path d="M18 46h30a11 11 0 0 0 1-22 17 17 0 0 0-33-3 13 13 0 0 0 2 25zM25 34h14M32 27v14"/>',
  photo: '<circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="10"/><path d="m32 10 11 18M51 21l-9 18M49 46H28M32 54 21 36M13 43l9-18M15 18h21"/>',
};
function icon(p) { return `<svg viewBox="0 0 64 64" aria-hidden="true">${icons[p.icon] || icons[p.type]}</svg>`; }
function element(tag, text, className) { const el = document.createElement(tag); el.textContent = text; if (className) el.className = className; return el; }
let products = [], type = 'all';
const dialog = $('#detail');
const historyLabels = { apple: 'Apple original', acquired: 'Acquired, then discontinued', sherlocked: 'Sherlocked' };
function openDetail(p) {
  const content = $('#detail-content'); content.replaceChildren();
  const mark = element('div', '', 'product-icon'); mark.innerHTML = icon(p); content.append(mark);
  content.append(element('p', `${p.start}–${p.end} · ${p.type} · ${historyLabels[p.history]}`, 'detail-meta'), element('h2', p.name), element('p', p.description), element('h3', p.history === 'sherlocked' ? 'The Sherlocking story' : 'The end of the line'), element('p', p.note));
  const link = element('a', 'Read the source ↗', 'source'); link.href = p.source; link.target = '_blank'; link.rel = 'noopener noreferrer'; content.append(link);
  for (const reference of p.references || []) {
    const extra = element('a', reference.label + ' ↗', 'source reference'); extra.href = reference.url; extra.target = '_blank'; extra.rel = 'noopener noreferrer'; content.append(extra);
  }
  if (!dialog.open) dialog.showModal();
}
function render() {
  const visible = selectProducts(products, { query: $('#search').value, type, sort: $('#sort').value, history: $('#history').value });
  $('#results').textContent = `${visible.length} of ${products.length} products`;
  $('#empty').hidden = visible.length > 0;
  $('#products').replaceChildren(...visible.map(p => {
    const card = element('article', '', 'card');
    const top = element('div', '', 'card-top'); const mark = element('div', '', 'product-icon'); mark.innerHTML = icon(p);
    top.append(mark, element('span', p.type === 'service' ? 'Service' : p.type === 'software' ? 'Software' : 'Hardware', 'tag ' + p.type));
    const story = element('p', p.history === 'acquired' ? `Acquired ${p.acquired}` : p.history === 'sherlocked' ? 'Sherlocked · Developer ended support' : 'Apple original', 'story ' + p.history);
    const heading = element('h3', ''); const link = element('a', p.name); link.href = '#' + p.id; heading.append(link);
    card.append(top, element('p', `${p.start}—${p.end}`, 'years'), heading, story, element('p', p.description, 'description'));
    const bottom = element('div', '', 'card-bottom'); bottom.append(element('span', `${p.end - p.start} ${p.end - p.start === 1 ? 'year' : 'years'} of history`));
    const detail = element('a', 'Remember it ↗'); detail.href = '#' + p.id; detail.setAttribute('aria-label', `Read about ${p.name}`); bottom.append(detail); card.append(bottom); return card;
  }));
}
function route() { const p = products.find(p => p.id === location.hash.slice(1)); if (p) openDetail(p); else if (dialog.open) dialog.close(); }
$('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { if (products.some(p => '#' + p.id === location.hash)) history.replaceState(null, '', location.pathname + location.search + '#archive'); });
window.addEventListener('hashchange', route);
$('#search').addEventListener('input', render); $('#sort').addEventListener('change', render); $('#history').addEventListener('change', render);
for (const button of document.querySelectorAll('[data-type]')) button.addEventListener('click', () => { type = button.dataset.type; document.querySelectorAll('[data-type]').forEach(b => b.setAttribute('aria-pressed', String(b === button))); render(); });
$('#reset').addEventListener('click', () => { $('#search').value = ''; $('#history').value = 'all'; $('[data-type="all"]').click(); $('#search').focus(); });
try {
  const response = await fetch('./graveyard.json'); if (!response.ok) throw new Error('Catalog unavailable'); products = await response.json();
  $('#total').textContent = products.length;
  for (const button of document.querySelectorAll('[data-type]')) button.querySelector('span').textContent = button.dataset.type === 'all' ? products.length : products.filter(p => p.type === button.dataset.type).length;
  render(); route();
} catch { $('#results').textContent = 'The catalog could not load. Refresh the page to try again.'; }
