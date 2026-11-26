# indonesia-statistics

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/bowxxx/indonesia-statistics/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/bowxxx/indonesia-statistics/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

Indonesia in Numbers — a national statistics site for Indonesia, built from real figures published by Statistics Indonesia (BPS). Dashboard, population, economy, employment, poverty, a searchable and sortable province table, and a full methodology & sources page. Every figure names its source and year; every chart is hand-rolled SVG; the site runs entirely from its own static files with no network requests, on desktop and on a phone.

Headline figures (2024, BPS): population 281.6 million · GDP Rp 22,139 trillion · real growth 5.03% · inflation 1.57% · unemployment 4.91% (Aug) · poverty 9.03% (Mar).

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 — or open `app/index.html` directly in a browser. No build step, no dependencies. Node 22 is enough for the local server; the site itself is plain HTML/CSS/JS.

To build the competition dossier locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=8bevpj6h&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
