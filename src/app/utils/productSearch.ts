/**
 * Multilingual product search. Product names are Norwegian, but the query may
 * be Norwegian, Swedish, Danish or English. Each group lists the same concept
 * in all four languages; a product matches when its name contains any term of
 * a group that the query points at.
 */

const GROUPS: string[][] = [
  ['spiker', 'spik', 'søm', 'sømme', 'nail', 'nails'],
  ['vindu', 'vindue', 'fönster', 'fonster', 'window', 'windows'],
  ['planke', 'planker', 'plank', 'plankor', 'planks', 'plankeverk', 'terrassebord', 'terrassebrædder', 'trall', 'decking'],
  ['skrue', 'skruer', 'skruv', 'skruvar', 'screw', 'screws'],
  ['gipsplate', 'gipsskive', 'gipsskiva', 'gipsplade', 'plasterboard', 'drywall', 'gips'],
  ['isolasjon', 'isolering', 'insulation', 'steinull', 'stenull', 'stenuld', 'mineral wool', 'rockwool', 'glava', 'eps', 'vindsperre', 'dampsperre'],
  ['maling', 'färg', 'farg', 'paint'],
  ['lim', 'glue', 'adhesive', 'lim'],
  ['dør', 'dor', 'dörr', 'dorr', 'door', 'innerdør', 'innerdør'],
  ['kabel', 'cable'],
  ['rør', 'ror', 'rör', 'pipe', 'tube'],
  ['sement', 'cement'],
  ['fliser', 'flis', 'kakel', 'tiles', 'tile', 'fliser'],
  ['tape', 'tejp'],
  ['silikon', 'silikone', 'silicone'],
  ['stikkontakt', 'stikkontakter', 'eluttag', 'stikkontakt', 'socket', 'outlet'],
  ['trelast', 'virke', 'tømmer', 'timber', 'lumber', 'wood'],
  ['sparkel', 'spackel', 'spartel', 'filler', 'putty'],
  ['panel', 'paneel', 'panelling'],
  ['tak', 'tag', 'roof', 'roofing', 'takstein', 'tegl', 'takrenne', 'takpapp', 'undertak', 'stalplatetak', 'takfoss', 'takvindu', 'takspiker'],
  ['plate', 'plater', 'skiva', 'skivor', 'plade', 'plader', 'board', 'boards', 'sheet', 'osb', 'kryssfiner', 'fiber', 'sponplate', 'mdf', 'fibersementplate', 'vatromsplate', 'gipsplate'],
  ['hammer', 'hammare', 'hammer', 'borhammer'],
  ['sag', 'saw', 'sav', 'sagblad'],
  ['skrutrekker', 'skruetrekker', 'skruvmejsel', 'screwdriver', 'skrumaskin', 'drill driver'],
  ['vater', 'vaterpas', 'vattenpass', 'spirit level', 'level'],
  ['malebond', 'malebånd', 'mattband', 'måttband', 'tape measure', 'measuring tape'],
  ['tang', 'tång', 'tank', 'pliers'],
  ['bor', 'borr', 'drill', 'drill bit', 'borhammer'],
  ['kniv', 'knife', 'kniv', 'stikkekniv'],
  ['sandpapir', 'slippapper', 'sandpapir', 'sandpaper'],
  ['hansker', 'handskar', 'handsker', 'gloves'],

  ['kabelkanal', 'kabelkanal', 'cable duct', 'trunking'],
  ['beslag', 'beslagsskrue', 'fittings', 'bracket'],
];

/** Lowercase and fold the Nordic letters so "fönster", "fonster" and "fønster" all meet. */
export function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/ø|ö/g, 'o')
    .replace(/å|ä/g, 'a')
    .replace(/æ/g, 'ae')
    .trim();
}

// Category word: typing it matches every hand/power tool by name, but the tool
// names themselves do not pull in the whole category.
const CATEGORIES: { query: string[]; names: string[] }[] = [
  {
    query: ['verktoy', 'verktyg', 'vaerktoj', 'tool', 'tools', 'diy'],
    names: ['hammer', 'sag', 'skrutrekker', 'skrumaskin', 'vater', 'malebond', 'tang', 'bor', 'borhammer', 'kniv', 'sandpapir', 'hansker'],
  },
];

const NORMALISED = [
  ...GROUPS.map(g => g.map(normalise)).map(g => ({ query: g, names: g })),
  ...CATEGORIES.map(c => ({ query: c.query.map(normalise), names: c.names.map(normalise) })),
];

export function matchesProductQuery(fields: string[], query: string): boolean {
  const q = normalise(query);
  if (q === '') return true;

  const haystack = fields.map(normalise);
  // Direct match. Very short queries must start a word ('tak' is not 'stikkontakt').
  const direct = (f: string) => (q.length <= 3 ? new RegExp('(^|[^a-z0-9])' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(f) : f.includes(q));
  if (haystack.some(direct)) return true;

  // Cross-language: the query points at a concept, and the product name contains it in any language.
  // Only the groups hit by the longest matching term count, so 'gipsskiva' means plasterboard, not every board.
  const name = haystack[0] ?? '';
  const hit = (term: string) => q.includes(term) || (q.length >= 4 && term.startsWith(q));
  const scored = NORMALISED.map(g => ({ g, score: Math.max(0, ...g.query.filter(hit).map(x => x.length)) })).filter(x => x.score > 0);
  const best = Math.max(0, ...scored.map(x => x.score));
  return scored
    .filter(x => x.score === best)
    .some(({ g }) => g.names.some(term => (term.length <= 3
      ? new RegExp('(^|[^a-z0-9])' + term).test(name)
      : name.includes(term))));
}
