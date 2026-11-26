// Indonesia in Numbers — routing and page interactions.
//
// Hash routes (every page is reached by a link in the header):
//   #/             dashboard      #/employment  jobs
//   #/population   population     #/poverty     poverty
//   #/economy      economy        #/provinces   province table
//   #/sources      methodology & sources
//
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

import { PROVINCES } from './data.js';
import { home, population, economy, employment, poverty, provinces, sources, missing } from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];

const ROUTES = {
  '/': home,
  '/population': population,
  '/economy': economy,
  '/employment': employment,
  '/poverty': poverty,
  '/provinces': provinces,
  '/sources': sources,
};

function currentRoute() {
  const hash = location.hash.replace(/^#/, '') || '/';
  return ROUTES[hash] ? hash : null;
}

// --- Economy tabs -------------------------------------------------------
function wireEconomyTabs() {
  const tabs = [...document.querySelectorAll('[data-econ-tab]')];
  if (!tabs.length) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.toggle('active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });
      document.getElementById('econ-gdp').hidden = tab.dataset.econTab !== 'gdp';
      document.getElementById('econ-prices').hidden = tab.dataset.econTab !== 'prices';
    });
  });
}

// --- Province table: search, island filter, sorting ----------------------
function provinceState() {
  return {
    query: '',
    island: '',
    sort: 'pop-desc',
  };
}

function applyProvinceFilter(state) {
  const rows = [...PROVINCES];
  const q = state.query.trim().toLowerCase();
  let list = rows.filter((p) => (!q || p.name.toLowerCase().includes(q))
    && (!state.island || p.island === state.island));
  if (state.sort === 'pop-asc') list.sort((a, b) => a.pop - b.pop);
  else if (state.sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => b.pop - a.pop);
  const tbody = document.querySelector('#prov-table tbody');
  const count = document.getElementById('prov-count');
  if (!tbody || !count) return;
  tbody.innerHTML = list.map((p, i) => {
    const share = ((p.pop / 281.6) * 100).toFixed(1);
    return `<tr><td>${i + 1}</td><td>${p.name}</td><td>${p.island}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${share}%</td></tr>`;
  }).join('') || '<tr><td colspan="5">No province matches that search.</td></tr>';
  const total = list.reduce((s, p) => s + p.pop, 0);
  count.textContent = `Showing ${list.length} of ${PROVINCES.length} provinces · combined population ${total.toFixed(2)} million`;
}

function wireProvinceTable() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const sortButtons = [...document.querySelectorAll('[data-prov-sort]')];
  if (!search || !island) return;
  const state = provinceState();
  search.addEventListener('input', () => { state.query = search.value; applyProvinceFilter(state); });
  island.addEventListener('change', () => { state.island = island.value; applyProvinceFilter(state); });
  sortButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.sort = btn.dataset.provSort;
      sortButtons.forEach((b) => b.classList.toggle('active', b === btn));
      applyProvinceFilter(state);
    });
  });
}

// --- Render --------------------------------------------------------------
function render() {
  window.__shotReady = false;
  const route = currentRoute();
  const view = route ? ROUTES[route] : missing;
  document.title = route === '/'
    ? 'Indonesia in Numbers — BPS statistics'
    : `${view === missing ? 'Not found' : route.slice(1)[0].toUpperCase() + route.slice(2)} | Indonesia in Numbers`;
  app.innerHTML = view();
  navLinks.forEach((a) => {
    const active = route !== null && a.getAttribute('href') === `#${route}`;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  wireEconomyTabs();
  wireProvinceTable();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
