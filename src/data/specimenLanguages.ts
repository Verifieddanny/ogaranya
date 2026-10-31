import continentData from './continentLanguages.json';

export interface LanguageSpecimen {
  id: string;
  name: string;
  text: string;
  defaultSize: number;
  defaultSpacing: number;
}

export const INITIAL_SHOWCASE_LANGUAGES: LanguageSpecimen[] = [
  {
    id: 'igbo',
    name: 'Igbo Language',
    text: 'Mma dị nkọ na obi anaghị atụ egwu.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'yoruba',
    name: 'Yoruba Language',
    text: 'Ọ̀nà àtijọ́ àti ohun tí a kọ sí ògiri.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'hausa',
    name: 'Hausa Language',
    text: 'Hanyar kakannī da abin da aka rubūta a bangō.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'swahili',
    name: 'Swahili Language',
    text: 'Njía ya mababú na yaliyoandíkwa ukútani.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'zulu',
    name: 'Zulu Language',
    text: 'Indlela yabokhokho nalokho okubhalwe odongeni.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'french',
    name: 'French Language',
    text: 'À travers l’ombre, le cœur s’élève.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
  {
    id: 'german',
    name: 'German Language',
    text: 'Über die Straße führt der Weg zurück.',
    defaultSize: 96,
    defaultSpacing: 0,
  },
];

export interface ContinentGroup {
  id: string;
  name: string;
  countLabel: string;
  languages: string[];
}

export const CONTINENT_GROUPS: ContinentGroup[] = [
  {
    id: 'africa',
    name: 'Africa',
    countLabel: '603 Languages',
    languages: continentData.Africa || [],
  },
  {
    id: 'americas',
    name: 'Americas',
    countLabel: '141 Languages',
    languages: continentData.Americas || [],
  },
  {
    id: 'asia',
    name: 'Asia',
    countLabel: '85 Languages',
    languages: continentData.Asia || [],
  },
  {
    id: 'europe',
    name: 'Europe',
    countLabel: '112 Languages',
    languages: continentData.Europe || [],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countLabel: '30 Languages',
    languages: continentData.Oceania || [],
  },
];

// Curated specimen phrases for notable languages
export const LANGUAGE_PHRASES: Record<string, string> = {
  German: 'Über die Straße führt der Weg zurück.',
  Yoruba: 'Ọ̀nà àtijọ́ àti ohun tí a kọ sí ògiri.',
  Igbo: 'Mma dị nkọ na obi anaghị atụ egwu.',
  Hausa: 'Hanyar kakannī da abin da aka rubūta a bangō.',
  Swahili: 'Njía ya mababú na yaliyoandíkwa ukútani.',
  Zulu: 'Indlela yabokhokho nalokho okubhalwe odongeni.',
  French: 'À travers l’ombre, le cœur s’élève.',
  Spanish: 'El río profundo canta en el silencio de la noche.',
  Portuguese: 'Nas asas da tempestade floresce a coragem ancestral.',
  Italian: 'Attraverso l’ombra antica, il cuore nobile si solleva.',
  Dutch: 'Over de brede rivier weerspiegelt het gouden licht der eeuwen.',
  Polish: 'W głębi pradawnego lasu rozbrzmiewa pieśń wolności.',
  Vietnamese: 'Dưới ánh trăng ngàn năm, con đường dẫn lối về nguồn cội.',
  Turkish: 'Eski taşların üzerinde zamanın silinmez izleri parlar.',
  Welsh: 'Trwy’r cysgodion dwfn, mae’r galon wrol yn codi’n uchel.',
  Quechua: 'Urqukunapi kawsayqa quri hinam lliphipin wiñaypaq.',
  Hawaiian: 'Ma lalo o nā hōkū kaulana, hānau hou ke koa me ka ikaika.',
  Afrikaans: 'Oor die wye vlaktes waai die wind van vryheid en krag.',
  Somali: 'Geelu markuu ciya waa calaamad muhiim ah oo nolosha ah.',
  Czech: 'Přes staré kamenné mosty kráčí duch vítězství.',
  Swedish: 'Genom nattens tystnad lyser det klara stjärnljuset.',
  Danish: 'Gennem de dybe skove vandrer fortidens stolte konger.',
  Finnish: 'Kautta aikojen kaikuu voiman ja rohkeuden laulu.',
  Hungarian: 'A hegyek csúcsán ragyog az ősi hatalom fénye.',
  Catalan: 'A través de la foscor antiga, el cor s’alça triomfant.',
  Basque: 'Mendietako haizeak indarra eta askatasuna dakar gurekin.',
  Romanian: 'Peste văile adânci răsună ecoul unui trecut măreț.',
  Tagalog: 'Sa ilalim ng araw, ang kapangyarihan at dangal ay magniningning.',
};

export function getSpecimenPhrase(languageName: string): string {
  if (LANGUAGE_PHRASES[languageName]) {
    return LANGUAGE_PHRASES[languageName];
  }
  // Generic Ogaranya diacritic specimen showing off character repertoire
  return `Õğàráñÿa sũppõrtș a bröad rånğë ǒf wòrds across ${languageName}.`;
}
