// Indonesia in Numbers — the figures behind the site.
//
// Every number here comes from Statistics Indonesia (BPS, Badan Pusat
// Statistik) unless a line says otherwise. Years are the year the figure
// describes, not the year it was published. Figures are rounded for display;
// the site shows the rounded value and names the source and year beside it.
//
// Cross-checked 26 Nov 2026 against BPS releases as reported by BPS,
// the Ministry of Finance, the World Bank and Indonesia Investments.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  headlineYear: 2024,
};

// Headline indicators shown on the dashboard. Each carries its own source.
export const HEADLINES = [
  { id: 'population', label: 'Population', value: 281.6, unit: 'million', note: 'Mid-year estimate', source: 'BPS, 2024', format: 'one-decimal' },
  { id: 'gdp', label: 'GDP (nominal)', value: 22139, unit: 'Rp trillion', note: 'Current prices', source: 'BPS, 2024', format: 'thousands' },
  { id: 'growth', label: 'Economic growth', value: 5.03, unit: '% yoy', note: 'Real GDP, c-to-c', source: 'BPS, 2024', format: 'two-decimal' },
  { id: 'inflation', label: 'Inflation', value: 1.57, unit: '% yoy', note: 'CPI, December', source: 'BPS, 2024', format: 'two-decimal' },
  { id: 'unemployment', label: 'Unemployment', value: 4.91, unit: '%', note: 'Open unemployment, Aug', source: 'BPS Sakernas, Aug 2024', format: 'two-decimal' },
  { id: 'poverty', label: 'Poverty rate', value: 9.03, unit: '%', note: '25.22 million people', source: 'BPS, Mar 2024', format: 'two-decimal' },
];

// Population, mid-year, millions (BPS).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.4 }, { year: 2016, value: 258.9 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.7 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Age structure, 2024 (UN World Population Prospects 2024, via BPS-compatible
// projection; shares of the 281.6 million).
export const AGE_GROUPS = [
  { group: '0–14 years', share: 24.6, people: 69.3 },
  { group: '15–64 years', share: 68.1, people: 191.8 },
  { group: '65+ years', share: 7.3, people: 20.6 },
];

export const SEX_SPLIT = [
  { group: 'Male', people: 141.2 },
  { group: 'Female', people: 140.4 },
];

// Real GDP growth, % year on year (BPS).
export const GDP_GROWTH_SERIES = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.69 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// Nominal GDP, Rp trillion, current prices (BPS).
export const GDP_NOMINAL_SERIES = [
  { year: 2020, value: 15434 }, { year: 2021, value: 16977 },
  { year: 2022, value: 19588 }, { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

// GDP per capita, Rp million (BPS).
export const GDP_PER_CAPITA_SERIES = [
  { year: 2020, value: 57.0 }, { year: 2021, value: 62.2 },
  { year: 2022, value: 71.0 }, { year: 2023, value: 75.0 },
  { year: 2024, value: 78.6 },
];

// Largest sectors by share of GDP, 2024 (BPS).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Wholesale & retail trade', share: 12.9 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 9.9 },
  { sector: 'Mining & quarrying', share: 8.4 },
  { sector: 'Information & communication', share: 4.3 },
  { sector: 'Financial & insurance', share: 4.2 },
  { sector: 'All other sectors', share: 29.1 },
];

// Consumer-price inflation, December year on year, % (BPS).
export const INFLATION_SERIES = [
  { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
  { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
  { year: 2024, value: 1.57 },
];

export const TRADE_2024 = {
  exportsUsdBn: 264.7, importsUsdBn: 233.7, surplusUsdBn: 31.0,
  source: 'BPS, 2024',
};

// Open unemployment rate, August, % (BPS Sakernas).
export const UNEMPLOYMENT_SERIES = [
  { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];

export const LABOUR_2024 = {
  labourForceM: 153.0, employedM: 145.8, unemployedM: 7.5,
  source: 'BPS Sakernas, Aug 2024',
};

// Employment by broad sector, August 2024, % of the employed (BPS Sakernas,
// rounded).
export const EMPLOYMENT_SECTORS = [
  { sector: 'Services', share: 50 },
  { sector: 'Agriculture, forestry & fishing', share: 28 },
  { sector: 'Industry (incl. manufacturing)', share: 22 },
];

// Poverty rate, March, % of population (BPS).
export const POVERTY_SERIES = [
  { year: 2020, value: 9.78 }, { year: 2021, value: 10.14 },
  { year: 2022, value: 9.54 }, { year: 2023, value: 9.36 },
  { year: 2024, value: 9.03 },
];

export const POVERTY_2024 = {
  rate: 9.03, poorPeopleM: 25.22, urbanRate: 7.09, ruralRate: 11.79,
  gini: 0.379, extremePoverty: 0.83, source: 'BPS, Mar 2024',
};

// Human Development Index (Indeks Pembangunan Manusia), BPS.
export const HDI_SERIES = [
  { year: 2020, value: 71.94 }, { year: 2021, value: 72.29 },
  { year: 2022, value: 73.37 }, { year: 2023, value: 74.39 },
  { year: 2024, value: 75.02 },
];

// Twenty largest provinces, mid-year population 2024, millions (BPS).
// Share is of the national 281.6 million.
export const PROVINCES = [
  { name: 'West Java', island: 'Java', pop: 50.35 },
  { name: 'East Java', island: 'Java', pop: 41.81 },
  { name: 'Central Java', island: 'Java', pop: 37.89 },
  { name: 'North Sumatra', island: 'Sumatra', pop: 15.59 },
  { name: 'Banten', island: 'Java', pop: 12.43 },
  { name: 'Jakarta', island: 'Java', pop: 10.68 },
  { name: 'South Sulawesi', island: 'Sulawesi', pop: 9.53 },
  { name: 'Lampung', island: 'Sumatra', pop: 9.42 },
  { name: 'South Sumatra', island: 'Sumatra', pop: 8.84 },
  { name: 'Riau', island: 'Sumatra', pop: 6.70 },
  { name: 'West Sumatra', island: 'Sumatra', pop: 5.78 },
  { name: 'West Kalimantan', island: 'Kalimantan', pop: 5.72 },
  { name: 'West Nusa Tenggara', island: 'Bali & Nusa Tenggara', pop: 5.66 },
  { name: 'East Nusa Tenggara', island: 'Bali & Nusa Tenggara', pop: 5.61 },
  { name: 'Aceh', island: 'Sumatra', pop: 5.55 },
  { name: 'Bali', island: 'Bali & Nusa Tenggara', pop: 4.41 },
  { name: 'South Kalimantan', island: 'Kalimantan', pop: 4.29 },
  { name: 'East Kalimantan', island: 'Kalimantan', pop: 4.03 },
  { name: 'Yogyakarta', island: 'Java', pop: 3.78 },
  { name: 'Jambi', island: 'Sumatra', pop: 3.70 },
];

export const PROVINCE_NOTES = {
  totalProvinces: 38,
  javaShare: 55.7,
  javaPopM: 156.9,
  density: 148,
  landAreaKm2: 1904569,
};

// Sources page: what each BPS publication is and what it measures.
export const SOURCES = [
  {
    title: 'Population — mid-year estimates',
    publisher: 'BPS (Statistics Indonesia)',
    detail: 'Population projection 2020–2050, based on the 2020 Population Census. Mid-year 2024: 281.6 million.',
  },
  {
    title: 'National accounts — GDP',
    publisher: 'BPS, “Indonesia Economic Growth” release, 5 Feb 2025',
    detail: 'Nominal GDP 2024 Rp 22,139 trillion; real growth 5.03% (c-to-c); GDP per capita Rp 78.62 million (US$ 4,960).',
  },
  {
    title: 'Consumer prices — inflation',
    publisher: 'BPS, CPI releases 2020–2024',
    detail: 'December year-on-year CPI inflation: 1.68% (2020), 1.87% (2021), 5.51% (2022), 2.61% (2023), 1.57% (2024).',
  },
  {
    title: 'Labour — Sakernas',
    publisher: 'BPS, National Labour Force Survey (Sakernas), August 2024',
    detail: 'Open unemployment 4.91%; labour force about 153.0 million; employed about 145.8 million.',
  },
  {
    title: 'Poverty and inequality',
    publisher: 'BPS, poverty profile, March 2024',
    detail: 'Poverty rate 9.03% (25.22 million people); urban 7.09%, rural 11.79%; Gini ratio 0.379; extreme poverty 0.83%.',
  },
  {
    title: 'Human development',
    publisher: 'BPS, Human Development Index 2024',
    detail: 'HDI (Indeks Pembangunan Manusia) 75.02 in 2024, up from 74.39 in 2023.',
  },
  {
    title: 'Age structure',
    publisher: 'UN World Population Prospects 2024',
    detail: 'Age shares for 2024: 0–14 years 24.6%, 15–64 years 68.1%, 65+ years 7.3%. Used where BPS publishes no single-year split.',
  },
];
