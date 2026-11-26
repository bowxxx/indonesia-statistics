// Hand-rolled SVG charts. No library, no network: every chart is a string of
// SVG built from the numbers in data.js. Each builder returns an <svg> with a
// <title> for screen readers and visible value labels, so the chart is
// readable even without hovering.

const TEAL = '#0e7c7b';
const AMBER = '#e8a317';
const INK = '#0f2a3d';
const GRID = '#e3ddd0';
const MUTED = '#5c6b76';

function niceTicks(min, max, count) {
  const span = max - min || 1;
  const step = span / count;
  const mag = 10 ** Math.floor(Math.log10(step));
  const norm = step / mag;
  const nice = norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10;
  const s = nice * mag;
  const start = Math.floor(min / s) * s;
  const ticks = [];
  for (let v = start; v <= max + s * 0.001; v += s) ticks.push(v);
  return { ticks, step: s };
}

function fmtTick(v) {
  if (Math.abs(v) >= 1000) return String(Math.round(v / 1000) + 'k');
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// A line chart with points, value labels and a shaded area under the line.
export function lineChart(series, opts = {}) {
  const w = opts.width || 720;
  const h = opts.height || 300;
  const padL = 46, padR = 14, padT = 18, padB = 34;
  const vals = series.map((p) => p.value);
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  if (min > 0) min = Math.max(0, min - (max - min) * 0.25);
  else min = min - (max - min) * 0.1;
  max = max + (max - min) * 0.08;
  const { ticks } = niceTicks(min, max, 4);
  const x = (i) => padL + (i * (w - padL - padR)) / (series.length - 1);
  const y = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min);
  const grid = ticks.map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`).join('');
  const labels = series.map((p, i) => `<text x="${x(i)}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`).join('');
  const pts = series.map((p, i) => `${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${padL},${y(min)} ${pts} ${x(series.length - 1).toFixed(1)},${y(min)}`;
  const dots = series.map((p, i) => {
    const anchor = i === 0 ? 'start' : i === series.length - 1 ? 'end' : 'middle';
    const lx = i === 0 ? x(i) + 2 : i === series.length - 1 ? x(i) - 2 : x(i);
    return `<circle cx="${x(i)}" cy="${y(p.value)}" r="4" fill="${opts.color || TEAL}"><title>${p.year}: ${p.value}</title></circle><text x="${lx}" y="${y(p.value) - 10}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="${INK}">${p.value}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || 'Line chart'}" class="chart-svg">
<title>${opts.label || 'Line chart'}</title>${grid}<polygon points="${area}" fill="${opts.color || TEAL}" opacity="0.10"/><polyline points="${pts}" fill="none" stroke="${opts.color || TEAL}" stroke-width="2.5" stroke-linejoin="round"/>${dots}${labels}</svg>`;
}

// A vertical bar chart. Negative values grow downward from the zero line.
export function barChart(series, opts = {}) {
  const w = opts.width || 720;
  const h = opts.height || 300;
  const padL = 46, padR = 14, padT = 26, padB = 34;
  const vals = series.map((p) => p.value);
  const min = Math.min(0, ...vals);
  const max = Math.max(...vals);
  const top = max + (max - min) * 0.1;
  const bottom = min - (max - min) * 0.1;
  const { ticks } = niceTicks(bottom, top, 4);
  const y = (v) => padT + ((top - v) * (h - padT - padB)) / (top - bottom);
  const slot = (w - padL - padR) / series.length;
  const bw = Math.min(44, slot * 0.62);
  const grid = ticks.map((t) => `<line x1="${padL}" y1="${y(t)}" x2="${w - padR}" y2="${y(t)}" stroke="${GRID}" stroke-width="1"/><text x="${padL - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmtTick(t)}</text>`).join('');
  const bars = series.map((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const y0 = y(0);
    const yv = y(p.value);
    const color = p.value < 0 ? '#b4452f' : (opts.color || TEAL);
    const topY = Math.min(y0, yv);
    const height = Math.abs(yv - y0);
    const labelY = p.value < 0 ? yv + 16 : yv - 8;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${topY.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(height, 1).toFixed(1)}" rx="3" fill="${color}"><title>${p.year}: ${p.value}</title></rect><text x="${cx}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="600" fill="${INK}">${p.value}</text><text x="${cx}" y="${h - 10}" text-anchor="middle" font-size="11" fill="${MUTED}">${p.year}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || 'Bar chart'}" class="chart-svg">
<title>${opts.label || 'Bar chart'}</title>${grid}<line x1="${padL}" y1="${y(0)}" x2="${w - padR}" y2="${y(0)}" stroke="${INK}" stroke-width="1"/>${bars}</svg>`;
}

// Horizontal bars, used for ranked lists such as provinces and sectors.
export function hbarChart(items, opts = {}) {
  const rowH = opts.rowHeight || 30;
  const w = opts.width || 720;
  const h = rowH * items.length + 16;
  const labelW = opts.labelWidth || 190;
  const padR = 56;
  const max = Math.max(...items.map((d) => d.value));
  const rows = items.map((d, i) => {
    const y = 8 + i * rowH;
    const bw = ((w - labelW - padR) * d.value) / max;
    return `<text x="${labelW - 10}" y="${y + 15}" text-anchor="end" font-size="12" fill="${INK}">${d.label}</text><rect x="${labelW}" y="${y + 3}" width="${Math.max(bw, 2).toFixed(1)}" height="18" rx="3" fill="${opts.color || TEAL}"><title>${d.label}: ${d.display || d.value}</title></rect><text x="${labelW + bw + 8}" y="${y + 17}" font-size="12" font-weight="600" fill="${INK}">${d.display || d.value}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${opts.label || 'Ranked bar chart'}" class="chart-svg">
<title>${opts.label || 'Ranked bar chart'}</title>${rows}</svg>`;
}

// A simple donut: shares that add to 100.
export function donutChart(parts, opts = {}) {
  const size = opts.size || 240;
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, inner = r * 0.62;
  const colors = opts.colors || [TEAL, AMBER, '#3a6ea5', '#7fb069', '#b4452f', '#8a7ca8'];
  let acc = 0;
  const arcs = parts.map((p, i) => {
    const a0 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    acc += p.share;
    const a1 = (acc / 100) * Math.PI * 2 - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${colors[i % colors.length]}"><title>${p.label}: ${p.share}%</title></path>`;
  }).join('');
  const legend = parts.map((p, i) => `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span>${p.label} — <strong>${p.share}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${opts.label || 'Donut chart'}" class="donut-svg"><title>${opts.label || 'Donut chart'}</title>${arcs}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="22" font-weight="700" fill="${INK}">${opts.center || ''}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="${MUTED}">${opts.centerSub || ''}</text></svg><ul class="legend">${legend}</ul></div>`;
}
