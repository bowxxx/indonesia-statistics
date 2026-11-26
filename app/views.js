// HTML for each page of Indonesia in Numbers. Every figure comes from
// data.js; every value shown is escaped before it reaches the page. Charts
// are the SVG strings from charts.js. Interactive controls (toggles, the
// province search/sort/filter) are wired up by main.js after render.

import {
  HEADLINES, POPULATION_SERIES, AGE_GROUPS, SEX_SPLIT, GDP_GROWTH_SERIES,
  GDP_NOMINAL_SERIES, GDP_PER_CAPITA_SERIES, GDP_SECTORS, INFLATION_SERIES,
  TRADE_2024, UNEMPLOYMENT_SERIES, LABOUR_2024, EMPLOYMENT_SECTORS,
  POVERTY_SERIES, POVERTY_2024, HDI_SERIES, PROVINCES, PROVINCE_NOTES, SOURCES,
} from './data.js';
import { lineChart, barChart, hbarChart, donutChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text)}</p>`;
}

function kpiCards() {
  return HEADLINES.map((h) => {
    const shown = h.format === 'thousands'
      ? h.value.toLocaleString('en-US')
      : h.format === 'one-decimal' ? h.value.toFixed(1) : h.value.toFixed(2);
    return `<article class="kpi"><p class="kpi-label">${esc(h.label)}</p>
<p class="kpi-value">${shown}<span class="kpi-unit"> ${esc(h.unit)}</span></p>
<p class="kpi-note">${esc(h.note)} · ${esc(h.source)}</p></article>`;
  }).join('');
}

function pageHead(title, intro) {
  return `<h1>${esc(title)}</h1><p class="lede">${esc(intro)}</p>`;
}

export function home() {
  const topProvinces = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8)
    .map((p) => ({ label: p.name, value: p.pop, display: `${p.pop.toFixed(2)}m` }));
  return `${pageHead('Indonesia in Numbers', 'The country at a glance — population, economy, jobs and poverty, from Statistics Indonesia (BPS). Every figure names its source and year.')}
<section class="kpi-grid" aria-label="Headline indicators">${kpiCards()}</section>
<div class="grid-2">
<section class="card"><h2>Population, 2015–2024</h2>
<p class="card-sub">Mid-year population, millions. Indonesia passed 280 million people in 2024 and is the world’s fourth most populous country.</p>
${lineChart(POPULATION_SERIES, { label: 'Population of Indonesia, 2015 to 2024, millions' })}
${sourceLine('BPS, population projection 2020–2050.')}
<p><a class="btn" href="#/population">Explore population →</a></p></section>
<section class="card"><h2>Real GDP growth, 2015–2024</h2>
<p class="card-sub">Annual change in real GDP, %. Growth held near 5% after the 2020 pandemic contraction of 2.07%.</p>
${barChart(GDP_GROWTH_SERIES, { label: 'Real GDP growth of Indonesia, 2015 to 2024, percent' })}
${sourceLine('BPS, national accounts.')}
<p><a class="btn" href="#/economy">Explore the economy →</a></p></section>
</div>
<section class="card"><h2>Where Indonesians live</h2>
<p class="card-sub">Eight largest provinces by population, 2024. Java alone holds ${PROVINCE_NOTES.javaPopM} million people — ${PROVINCE_NOTES.javaShare}% of the country — on about 7% of its land.</p>
${hbarChart(topProvinces, { label: 'Largest provinces of Indonesia by population, 2024' })}
${sourceLine('BPS, mid-year provincial population 2024.')}
<p><a class="btn" href="#/provinces">All provinces →</a></p></section>
<section class="card"><h2>What changed in 2024</h2>
<ul class="facts">
<li><strong>Poverty fell to 9.03%</strong> in March 2024 — the lowest in a decade — with 25.22 million people below the poverty line. <a href="#/poverty">Poverty →</a></li>
<li><strong>Unemployment fell to 4.91%</strong> in August 2024, down from 5.32% a year earlier. <a href="#/employment">Jobs →</a></li>
<li><strong>Inflation ended the year at 1.57%</strong>, the lowest December reading in the series shown here. <a href="#/economy">Economy →</a></li>
<li><strong>Human development reached 75.02</strong> on the BPS index, up from 74.39 in 2023. <a href="#/sources">Sources →</a></li>
</ul></section>`;
}

export function population() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10)
    .map((p) => ({ label: p.name, value: p.pop, display: `${p.pop.toFixed(2)}m` }));
  return `${pageHead('Population', '281.6 million people at mid-year 2024 (BPS) — the fourth largest population in the world, growing by about 3 million people a year.')}
<div class="grid-2">
<section class="card"><h2>Population growth, 2015–2024</h2>
${lineChart(POPULATION_SERIES, { label: 'Population of Indonesia, 2015 to 2024, millions' })}
${sourceLine('BPS, population projection 2020–2050.')}</section>
<section class="card"><h2>Who Indonesians are</h2>
${donutChart(AGE_GROUPS.map((a) => ({ label: a.group, share: a.share })), { label: 'Age structure of Indonesia, 2024', center: '281.6m', centerSub: 'people, 2024' })}
<p class="card-sub">About two in three Indonesians are of working age (15–64). The median Indonesian is about 31 years old.</p>
${sourceLine('UN World Population Prospects 2024 for age shares; BPS for the total.')}
<p>Men: <strong>141.2 million</strong> · Women: <strong>140.4 million</strong> (BPS projection, 2024).</p></section>
</div>
<section class="card"><h2>Largest provinces, 2024</h2>
<p class="card-sub">Mid-year population, millions. West Java alone has more people than most European countries.</p>
${hbarChart(top10, { label: 'Ten largest provinces of Indonesia by population, 2024' })}
${sourceLine('BPS, mid-year provincial population 2024.')}
<p><a class="btn" href="#/provinces">See all 20 provinces in the table →</a></p></section>
<section class="card"><h2>Density and spread</h2>
<ul class="facts">
<li><strong>${PROVINCE_NOTES.density} people per km²</strong> on average across ${PROVINCE_NOTES.landAreaKm2.toLocaleString('en-US')} km² of land — but Java averages over 1,100 per km² while Papua averages under 10.</li>
<li><strong>${PROVINCE_NOTES.totalProvinces} provinces</strong> in total. The 20 largest listed on this site hold 251.77 million people — about 89% of the population.</li>
<li><strong>Java: ${PROVINCE_NOTES.javaPopM} million people (${PROVINCE_NOTES.javaShare}%)</strong> on one island; the other five major island groups share the rest.</li>
</ul>${sourceLine('BPS, 2024; land area from BPS Statistical Yearbook.')}</section>`;
}

export function economy() {
  return `${pageHead('Economy', 'Southeast Asia’s largest economy: GDP of Rp 22,139 trillion in 2024, growing 5.03% in real terms, with GDP per capita of Rp 78.62 million (US$ 4,960).')}
<div class="tabs" role="tablist" aria-label="Economy views">
<button class="tab active" data-econ-tab="gdp" role="tab" aria-selected="true">Output &amp; growth</button>
<button class="tab" data-econ-tab="prices" role="tab" aria-selected="false">Prices &amp; trade</button>
</div>
<div id="econ-gdp" class="tab-panel">
<div class="grid-2">
<section class="card"><h2>Nominal GDP, 2020–2024</h2>
<p class="card-sub">Rp trillion, current prices.</p>
${lineChart(GDP_NOMINAL_SERIES, { label: 'Nominal GDP of Indonesia, 2020 to 2024, rupiah trillion' })}
${sourceLine('BPS, national accounts.')}</section>
<section class="card"><h2>Real GDP growth, 2015–2024</h2>
<p class="card-sub">Annual change, %. The 2020 bar is negative: the pandemic contraction.</p>
${barChart(GDP_GROWTH_SERIES, { label: 'Real GDP growth of Indonesia, 2015 to 2024, percent' })}
${sourceLine('BPS, national accounts.')}</section>
</div>
<section class="card"><h2>GDP per capita, 2020–2024</h2>
<p class="card-sub">Rp million per person. It rose from Rp 57.0 million in 2020 to Rp 78.6 million in 2024 — about US$ 4,960 at the year’s average exchange rate.</p>
${lineChart(GDP_PER_CAPITA_SERIES, { label: 'GDP per capita of Indonesia, 2020 to 2024, rupiah million' })}
${sourceLine('BPS, 2024.')}</section>
<section class="card"><h2>What the economy makes</h2>
<p class="card-sub">Share of GDP by sector, 2024. Manufacturing is the largest single sector; agriculture still accounts for one rupiah in eight.</p>
${hbarChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share, display: `${s.share}%` })), { label: 'Share of GDP by sector, Indonesia 2024' })}
${sourceLine('BPS, national accounts 2024.')}</section>
</div>
<div id="econ-prices" class="tab-panel" hidden>
<div class="grid-2">
<section class="card"><h2>Inflation, 2020–2024</h2>
<p class="card-sub">Consumer-price inflation, December year on year, %. It peaked at 5.51% in 2022 and fell to 1.57% in 2024 — inside Bank Indonesia’s 1.5–3.5% target range.</p>
${lineChart(INFLATION_SERIES, { label: 'Inflation in Indonesia, December year on year, 2020 to 2024', color: '#b4452f' })}
${sourceLine('BPS, CPI releases.')}</section>
<section class="card"><h2>Trade in goods, 2024</h2>
<ul class="facts">
<li>Exports: <strong>US$ ${TRADE_2024.exportsUsdBn} billion</strong></li>
<li>Imports: <strong>US$ ${TRADE_2024.importsUsdBn} billion</strong></li>
<li>Surplus: <strong>US$ ${TRADE_2024.surplusUsdBn} billion</strong></li>
</ul>
<p class="card-sub">Indonesia has run a goods-trade surplus every year since 2020, carried mainly by coal, palm oil and nickel-related exports.</p>
${sourceLine('BPS, foreign trade statistics 2024.')}</section>
</div>
<p class="card-sub">Tip: switch back to “Output &amp; growth” above to see GDP, growth and sectors.</p>
</div>`;
}

export function employment() {
  return `${pageHead('Employment', 'About 145.8 million Indonesians were working in August 2024, out of a labour force of about 153.0 million. Open unemployment was 4.91% — the lowest August reading since before the pandemic.')}
<div class="grid-2">
<section class="card"><h2>Unemployment, 2020–2024</h2>
<p class="card-sub">Open unemployment rate, August, %. It jumped to 7.07% in the pandemic year 2020 and has fallen every year since.</p>
${lineChart(UNEMPLOYMENT_SERIES, { label: 'Unemployment rate of Indonesia, August 2020 to 2024, percent' })}
${sourceLine('BPS Sakernas, August surveys.')}</section>
<section class="card"><h2>Where people work</h2>
${donutChart(EMPLOYMENT_SECTORS.map((s) => ({ label: s.sector, share: s.share })), { label: 'Employment by broad sector, Indonesia August 2024', center: '145.8m', centerSub: 'people employed' })}
<p class="card-sub">Shares are rounded. Services — trade, transport, government, education and the rest — employ half of all workers; agriculture still employs more than one in four.</p>
${sourceLine('BPS Sakernas, Aug 2024.')}</section>
</div>
<section class="card"><h2>The labour market in August 2024</h2>
<ul class="facts">
<li><strong>Labour force:</strong> ${LABOUR_2024.labourForceM.toFixed(1)} million people</li>
<li><strong>Employed:</strong> ${LABOUR_2024.employedM.toFixed(1)} million people</li>
<li><strong>Unemployed:</strong> ${LABOUR_2024.unemployedM.toFixed(1)} million people (${UNEMPLOYMENT_SERIES[4].value}% of the labour force)</li>
<li><strong>Informal work:</strong> about 59% of the employed work informally — without a formal contract or registered business — which is why the unemployment rate alone understates job insecurity.</li>
</ul>${sourceLine('BPS Sakernas, Aug 2024. Informal share: BPS, Feb 2024.')}</section>`;
}

export function poverty() {
  return `${pageHead('Poverty', 'In March 2024, 9.03% of Indonesians — 25.22 million people — lived below the national poverty line, the lowest rate in a decade. Rural poverty (11.79%) runs well above urban poverty (7.09%).')}
<div class="grid-2">
<section class="card"><h2>Poverty rate, 2020–2024</h2>
<p class="card-sub">% of population below the national poverty line, March each year. The rate rose in the pandemic, then fell for three straight years.</p>
${lineChart(POVERTY_SERIES, { label: 'Poverty rate of Indonesia, March 2020 to 2024, percent' })}
${sourceLine('BPS, poverty profile, March releases.')}</section>
<section class="card"><h2>Urban vs rural, March 2024</h2>
${hbarChart([
    { label: 'Rural', value: POVERTY_2024.ruralRate, display: `${POVERTY_2024.ruralRate}%` },
    { label: 'Urban', value: POVERTY_2024.urbanRate, display: `${POVERTY_2024.urbanRate}%` },
    { label: 'National', value: POVERTY_2024.rate, display: `${POVERTY_2024.rate}%` },
  ], { label: 'Poverty rate by area, Indonesia March 2024', color: '#b4452f' })}
<p class="card-sub">The poverty line is the cost of 2,100 calories a day plus a small allowance for basic non-food needs, as defined by BPS.</p>
${sourceLine('BPS, Mar 2024.')}</section>
</div>
<div class="grid-2">
<section class="card"><h2>Inequality</h2>
<p class="big-stat">${POVERTY_2024.gini}</p>
<p class="card-sub">Gini ratio, March 2024 (0 = perfect equality, 1 = total inequality). Down from 0.388 in March 2023 and below its pre-pandemic level of 0.382.</p>
${sourceLine('BPS, Mar 2024.')}</section>
<section class="card"><h2>Extreme poverty</h2>
<p class="big-stat">${POVERTY_2024.extremePoverty}%</p>
<p class="card-sub">Share of the population in extreme poverty in 2024, down from 1.12% in 2023. The government’s target is to reach zero extreme poverty.</p>
${sourceLine('BPS / Ministry of Finance, 2024.')}</section>
</div>
<section class="card"><h2>Human development keeps rising</h2>
<p class="card-sub">BPS Human Development Index (Indeks Pembangunan Manusia), 0–100: health, education and living standards combined.</p>
${lineChart(HDI_SERIES, { label: 'Human Development Index of Indonesia, 2020 to 2024' })}
${sourceLine('BPS, Human Development Index 2024.')}</section>`;
}

export function provinces() {
  const islands = [...new Set(PROVINCES.map((p) => p.island))];
  const rows = [...PROVINCES].sort((a, b) => b.pop - a.pop).map((p, i) => {
    const share = ((p.pop / 281.6) * 100).toFixed(1);
    return `<tr><td>${i + 1}</td><td>${esc(p.name)}</td><td>${esc(p.island)}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${share}%</td></tr>`;
  }).join('');
  return `${pageHead('Provinces', 'The 20 largest of Indonesia’s 38 provinces, by mid-year population 2024 (BPS). Search, filter by island group, or sort the table — the totals update as you type.')}
<section class="card"><div class="controls">
<label>Search <input id="prov-search" type="search" placeholder="Type a province name…" aria-label="Search provinces"></label>
<label>Island <select id="prov-island" aria-label="Filter by island group"><option value="">All island groups</option>${islands.map((x) => `<option>${esc(x)}</option>`).join('')}</select></label>
<div class="sort-group" role="group" aria-label="Sort provinces">
<button class="btn small active" data-prov-sort="pop-desc">Largest first</button>
<button class="btn small" data-prov-sort="pop-asc">Smallest first</button>
<button class="btn small" data-prov-sort="name">A–Z</button>
</div></div>
<p id="prov-count" class="card-sub" aria-live="polite">Showing 20 of 20 provinces · combined population 251.77 million</p>
<div class="table-wrap"><table id="prov-table">
<thead><tr><th>#</th><th>Province</th><th>Island group</th><th class="num">Population (m)</th><th class="num">Share of Indonesia</th></tr></thead>
<tbody>${rows}</tbody></table></div>
${sourceLine('BPS, mid-year provincial population 2024. Shares are of the national 281.6 million. The 20 provinces shown hold 251.77 million people; the remaining 18 provinces hold the other 29.83 million.')}
</section>
<section class="card"><h2>Java dominates</h2>
<p class="card-sub">Five of the six largest provinces are on Java. The island’s 156.9 million people are 55.7% of Indonesia on about 7% of its land — the main reason national statistics always look different once Java is taken out.</p>
<p><a class="btn" href="#/population">Back to population →</a></p></section>`;
}

export function sources() {
  const items = SOURCES.map((s) => `<article class="source-item"><h2>${esc(s.title)}</h2><p class="source-pub">${esc(s.publisher)}</p><p>${esc(s.detail)}</p></article>`).join('');
  return `${pageHead('Methodology & sources', 'How this site is built, what each figure means, and exactly where it came from — so you can check every number yourself.')}
<section class="card"><h2>How the figures were chosen</h2>
<ul class="facts">
<li>Every headline figure is from <strong>Statistics Indonesia (BPS)</strong>, the country’s official statistics office, unless the page says otherwise (age shares use the UN World Population Prospects 2024).</li>
<li>Figures are the <strong>latest final release available in November 2026</strong> for each topic: mostly 2024, with March 2024 for poverty and August 2024 for labour.</li>
<li>Each page names its source and year next to the figure. Where BPS publishes a rounded headline (for example 281.6 million), this site shows that rounded headline rather than inventing extra precision.</li>
<li>Provincial populations are BPS mid-year 2024 estimates. Shares are computed from the national total of 281.6 million.</li>
</ul></section>
<section class="card"><h2>Definitions</h2>
<ul class="facts">
<li><strong>Open unemployment rate:</strong> unemployed people as a share of the labour force (employed + unemployed), BPS Sakernas.</li>
<li><strong>Poverty line:</strong> the rupiah cost of 2,100 kcal per person per day plus basic non-food needs, set by BPS.</li>
<li><strong>Gini ratio:</strong> 0 means everyone spends the same; 1 means one person spends everything.</li>
<li><strong>Real GDP growth:</strong> change in GDP at constant 2010 prices, cumulative (c-to-c) for the full year.</li>
<li><strong>CPI inflation:</strong> change in the consumer price index; the December figure compares December with the previous December.</li>
</ul></section>
<section class="card"><h2>Sources</h2>${items}</section>
<section class="card"><h2>What this site is not</h2>
<p class="card-sub">This is an independent presentation of public BPS figures, built for the make.fun “best national statistics site” competition. It is not affiliated with BPS or the Government of Indonesia, and it fetches nothing from the network at runtime: every figure is baked into its own files. Figures were last checked against BPS releases on 26 November 2026.</p></section>`;
}

export function missing() {
  return `<h1>Page not found</h1><p class="lede">There is no statistics page at this address. Try one of the sections below.</p>
<p><a class="btn" href="#/">Back to the dashboard →</a></p>`;
}
