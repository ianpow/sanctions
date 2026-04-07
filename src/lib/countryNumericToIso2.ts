/**
 * Mapping from ISO 3166-1 numeric codes (used in world-atlas TopoJSON)
 * to ISO 3166-1 alpha-2 codes (used in our sanctions data).
 * Only includes countries in our sanctioned list.
 */
export const numericToIso2: Record<string, string> = {
  '004': 'AF', // Afghanistan
  '112': 'BY', // Belarus
  '140': 'CF', // Central African Republic
  '156': 'CN', // China
  '170': 'CO', // Colombia
  '192': 'CU', // Cuba
  '180': 'CD', // DR Congo
  '232': 'ER', // Eritrea
  '231': 'ET', // Ethiopia
  '332': 'HT', // Haiti
  '364': 'IR', // Iran
  '368': 'IQ', // Iraq
  '408': 'KP', // North Korea
  '422': 'LB', // Lebanon
  '434': 'LY', // Libya
  '466': 'ML', // Mali
  '104': 'MM', // Myanmar
  '558': 'NI', // Nicaragua
  '643': 'RU', // Russia
  '706': 'SO', // Somalia
  '728': 'SS', // South Sudan
  '729': 'SD', // Sudan
  '760': 'SY', // Syria
  '862': 'VE', // Venezuela
  '887': 'YE', // Yemen
  '716': 'ZW', // Zimbabwe
}
