/**
 * Static country-level sanctions data for globe visualisation.
 * Covers comprehensively sanctioned countries/territories and major sectoral programmes.
 * Sources: OFSI, OFAC, EU Sanctions Map, UN Sanctions Committees (as of early 2026).
 */

export interface SanctionedCountry {
  name: string
  iso2: string
  lat: number
  lon: number
  /** Which bodies sanction this country */
  sanctions: ('UK' | 'US' | 'EU' | 'UN')[]
  /** Brief description of the sanctions programme */
  description: string
  /** Type: comprehensive = near-total embargo, sectoral = targeted sectors, targeted = individuals/entities only */
  type: 'comprehensive' | 'sectoral' | 'targeted'
}

export const sanctionedCountries: SanctionedCountry[] = [
  // --- Comprehensive ---
  {
    name: 'Russia',
    iso2: 'RU',
    lat: 61.52,
    lon: 105.32,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Comprehensive sanctions following the 2022 invasion of Ukraine. Covers energy, finance, technology, trade, and individuals.',
    type: 'comprehensive',
  },
  {
    name: 'Iran',
    iso2: 'IR',
    lat: 32.43,
    lon: 53.69,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Long-standing sanctions targeting nuclear programme, missile development, and human rights abuses.',
    type: 'comprehensive',
  },
  {
    name: 'North Korea',
    iso2: 'KP',
    lat: 40.34,
    lon: 127.51,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Among the most heavily sanctioned countries. Near-total embargo on trade, finance, and travel.',
    type: 'comprehensive',
  },
  {
    name: 'Syria',
    iso2: 'SY',
    lat: 34.80,
    lon: 38.99,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Sanctions related to the Assad regime, chemical weapons use, and civil war atrocities.',
    type: 'comprehensive',
  },
  {
    name: 'Cuba',
    iso2: 'CU',
    lat: 21.52,
    lon: -77.78,
    sanctions: ['US'],
    description: 'US comprehensive embargo since 1962. UK and EU have limited restrictions.',
    type: 'comprehensive',
  },
  {
    name: 'Belarus',
    iso2: 'BY',
    lat: 53.71,
    lon: 27.95,
    sanctions: ['UK', 'US', 'EU'],
    description: 'Sanctions for support of Russia\'s invasion of Ukraine and domestic repression.',
    type: 'comprehensive',
  },

  // --- Sectoral ---
  {
    name: 'Venezuela',
    iso2: 'VE',
    lat: 6.42,
    lon: -66.59,
    sanctions: ['UK', 'US', 'EU'],
    description: 'Sectoral sanctions targeting oil industry, gold, and individuals linked to the Maduro regime.',
    type: 'sectoral',
  },
  {
    name: 'Myanmar',
    iso2: 'MM',
    lat: 21.91,
    lon: 95.96,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Sanctions following the 2021 military coup and ongoing human rights violations.',
    type: 'sectoral',
  },
  {
    name: 'China',
    iso2: 'CN',
    lat: 35.86,
    lon: 104.20,
    sanctions: ['UK', 'US', 'EU'],
    description: 'Targeted sanctions related to Xinjiang human rights abuses. Technology export controls on semiconductors.',
    type: 'targeted',
  },

  // --- Targeted (individuals/entities, not country-wide) ---
  {
    name: 'Libya',
    iso2: 'LY',
    lat: 26.34,
    lon: 17.23,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'UN arms embargo and asset freezes on individuals obstructing the peace process.',
    type: 'targeted',
  },
  {
    name: 'Somalia',
    iso2: 'SO',
    lat: 5.15,
    lon: 46.20,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Arms embargo and sanctions targeting Al-Shabaab and spoilers to the peace process.',
    type: 'targeted',
  },
  {
    name: 'Yemen',
    iso2: 'YE',
    lat: 15.55,
    lon: 48.52,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Arms embargo and targeted sanctions on Houthi leaders and those threatening peace.',
    type: 'targeted',
  },
  {
    name: 'South Sudan',
    iso2: 'SS',
    lat: 6.88,
    lon: 31.31,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Arms embargo and sanctions on individuals obstructing the peace agreement.',
    type: 'targeted',
  },
  {
    name: 'Democratic Republic of the Congo',
    iso2: 'CD',
    lat: -4.04,
    lon: 21.76,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Arms embargo and targeted sanctions on armed groups and individuals.',
    type: 'targeted',
  },
  {
    name: 'Central African Republic',
    iso2: 'CF',
    lat: 6.61,
    lon: 20.94,
    sanctions: ['UK', 'EU', 'UN'],
    description: 'Arms embargo and targeted sanctions related to the ongoing conflict.',
    type: 'targeted',
  },
  {
    name: 'Mali',
    iso2: 'ML',
    lat: 17.57,
    lon: -3.99,
    sanctions: ['UK', 'EU', 'UN'],
    description: 'Sanctions targeting those threatening the peace process and territorial integrity.',
    type: 'targeted',
  },
  {
    name: 'Sudan',
    iso2: 'SD',
    lat: 12.86,
    lon: 30.22,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Darfur-related sanctions. Arms embargo and targeted measures on conflict actors.',
    type: 'targeted',
  },
  {
    name: 'Afghanistan',
    iso2: 'AF',
    lat: 33.94,
    lon: 67.71,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Sanctions targeting Taliban leadership and Al-Qaeda/ISIL-associated individuals.',
    type: 'targeted',
  },
  {
    name: 'Iraq',
    iso2: 'IQ',
    lat: 33.22,
    lon: 43.68,
    sanctions: ['UK', 'US', 'UN'],
    description: 'Legacy sanctions and targeted measures on former Ba\'ath regime members and militias.',
    type: 'targeted',
  },
  {
    name: 'Lebanon',
    iso2: 'LB',
    lat: 33.85,
    lon: 35.86,
    sanctions: ['UK', 'US', 'EU', 'UN'],
    description: 'Targeted sanctions on Hezbollah and individuals undermining sovereignty.',
    type: 'targeted',
  },
  {
    name: 'Nicaragua',
    iso2: 'NI',
    lat: 12.87,
    lon: -85.21,
    sanctions: ['UK', 'US', 'EU'],
    description: 'Sanctions targeting the Ortega regime for human rights abuses and democratic backsliding.',
    type: 'targeted',
  },
  {
    name: 'Zimbabwe',
    iso2: 'ZW',
    lat: -19.02,
    lon: 29.15,
    sanctions: ['UK', 'US', 'EU'],
    description: 'Targeted sanctions on individuals and entities linked to human rights abuses.',
    type: 'targeted',
  },
  {
    name: 'Eritrea',
    iso2: 'ER',
    lat: 15.18,
    lon: 39.78,
    sanctions: ['US', 'UN'],
    description: 'Arms embargo and targeted sanctions related to regional destabilisation.',
    type: 'targeted',
  },
  {
    name: 'Ethiopia',
    iso2: 'ET',
    lat: 9.15,
    lon: 40.49,
    sanctions: ['US'],
    description: 'Targeted sanctions related to the Tigray conflict and human rights violations.',
    type: 'targeted',
  },
  {
    name: 'Haiti',
    iso2: 'HT',
    lat: 18.97,
    lon: -72.29,
    sanctions: ['US', 'UN'],
    description: 'Targeted sanctions on gang leaders and those fuelling violence and instability.',
    type: 'targeted',
  },
]

/** Colour for each sanctioning body */
export const bodyColors: Record<string, string> = {
  UK: '#4a7c9b',
  US: '#c4956a',
  EU: '#5ba39e',
  UN: '#7b6fa0',
}

/** Colour by sanction type — high contrast against earth terrain */
export const typeColors: Record<string, string> = {
  comprehensive: '#e63946',  // strong red — unmissable
  sectoral: '#ff8c00',       // vivid orange
  targeted: '#d4a017',       // gold/amber — stands out against green
}

/** Label by sanction type */
export const typeLabels: Record<string, string> = {
  comprehensive: 'Comprehensive',
  sectoral: 'Sectoral',
  targeted: 'Targeted',
}
