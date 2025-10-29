import { AnalysisResultData2 } from "@/lib/types";

export const exampleAnalysis: AnalysisResultData2 = {
  name: "Carnilove Salmon & Turkey for Adult Cats",
  producent: "Vafo Praha",
  species: "kot",
  type: "Sucha karma",
  purpose: "Dla dorosłych kotów",

  composition: {
    meal_and_offal: [
      { name: "łosoś", percentage: 25 },
      { name: "indyk", percentage: 20 },
      { name: "wątroba z indyka", percentage: 5 },
    ],
    fruits_and_vegetables: [
      { name: "jabłka", percentage: 2 },
      { name: "marchew", percentage: 1.5 },
    ],
    grains: [
      { name: "ryż", percentage: 10 },
      { name: "jęczmień", percentage: 5 },
    ],
    other_additives: [
      { name: "olej z łososia", percentage: 2 },
      { name: "siemię lniane", percentage: 1 },
    ],
    contains_grains: true,
    contains_sugar: false,
    contains_gmo: false,
    is_monoprotein: false,
  },

  analytical_components: {
    humidity: {
      name: "Wilgotność",
      value: 8,
      unit: "%",
      per: "na 100g",
      confidence: 0.98,
      method: "etykieta",
      note: null,
    },
    protein: {
      name: "Białko surowe",
      value: 38,
      unit: "%",
      per: "na 100g",
      confidence: 0.97,
      method: "etykieta",
      note: "wysoka zawartość",
    },
    fat: {
      name: "Tłuszcz surowy",
      value: 18,
      unit: "%",
      per: "na 100g",
      confidence: 0.96,
      method: "etykieta",
      note: null,
    },
    fiber: {
      name: "Włókno surowe",
      value: 3,
      unit: "%",
      per: "na 100g",
      confidence: 0.9,
      method: "etykieta",
    },
    ash: {
      name: "Popiół surowy",
      value: 7.5,
      unit: "%",
      per: "na 100g",
      confidence: 0.95,
      method: "etykieta",
    },
    carbohydrates: {
      name: "Węglowodany",
      value: 25.5,
      unit: "%",
      per: "na 100g",
      confidence: 0.85,
      method: "oszacowanie-ai",
      note: "wartość szacunkowa",
    },
    energy: {
      kcal_per_100g: {
        name: "Energia",
        value: 380,
        unit: "kcal",
        per: "na 100g",
        confidence: 0.9,
        method: "oszacowanie-ai",
      },
      kJ_per_100g: {
        name: "Energia",
        value: 1590,
        unit: "kJ",
        per: "na 100g",
        confidence: 0.9,
        method: "oszacowanie-ai",
      },
    },
    protein_dry_matter: {
      name: "Białko na suchej masie",
      value: 41.3,
      unit: "%",
      per: "na suchej masie",
      confidence: 0.95,
      method: "obliczenie",
    },
    fat_dry_matter: {
      name: "Tłuszcz na suchej masie",
      value: 19.6,
      unit: "%",
      per: "na suchej masie",
      confidence: 0.95,
      method: "obliczenie",
    },
    ash_dry_matter: {
      name: "Popiół na suchej masie",
      value: 8.1,
      unit: "%",
      per: "na suchej masie",
      confidence: 0.95,
      method: "obliczenie",
    },
  },

  minerals: [
    {
      name: "Wapń",
      value: 1.2,
      unit: "%",
      confidence: 0.9,
      method: "etykieta",
    },
    {
      name: "Fosfor",
      value: 1.0,
      unit: "%",
      confidence: 0.9,
      method: "etykieta",
    },
    {
      name: "Magnez",
      value: 0.09,
      unit: "%",
      confidence: 0.85,
      method: "etykieta",
    },
  ],
  vitamins: [
    { name: "Witamina A", value: 18000, unit: "IU", confidence: 0.95 },
    { name: "Witamina D3", value: 1200, unit: "IU", confidence: 0.95 },
    { name: "Witamina E", value: 200, unit: "mg", confidence: 0.95 },
  ],
  microelements: [
    { name: "Cynk", value: 90, unit: "mg/kg", confidence: 0.9 },
    { name: "Miedź", value: 10, unit: "mg/kg", confidence: 0.9 },
    { name: "Selen", value: 0.3, unit: "mg/kg", confidence: 0.85 },
  ],
  oils: [
    { name: "Olej z łososia", value: 2, unit: "%", confidence: 0.9 },
    { name: "Olej lniany", value: 1, unit: "%", confidence: 0.9 },
  ],
  other_functional_additives: [
    { name: "Yucca schidigera", value: 200, unit: "mg/kg", confidence: 0.8 },
    { name: "Mannooligosacharydy", value: 500, unit: "mg/kg", confidence: 0.8 },
  ],
  taurine_mg_kg: {
    name: "Tauryna",
    value: 1500,
    unit: "mg/kg",
    confidence: 0.95,
    method: "etykieta",
  },

  allergens: {
    detected: ["kurczak (śladowe ilości)"],
    potential: ["ryby", "zboża"],
    gluten_free: false,
    lactose_free: true,
  },

  rate: {
    meat_quality: {
      rate: 5,
      description: "Mięso wysokiej jakości, bez produktów ubocznych",
    },
    protein_content: { rate: 5, description: "Bardzo wysoka zawartość białka" },
    fat_content: { rate: 4, description: "Dobry bilans tłuszczu" },
    calcium_phosphorus_ratio: {
      rate: 5,
      description: "Stosunek Ca:P optymalny (1.2:1)",
    },
    vitamin_supplementation: {
      rate: 4,
      description: "Dobre uzupełnienie witamin",
    },
    macro_balance: {
      rate: 4,
      description: "Zrównoważony skład makroelementów",
    },
    overall_rating: { rate: 5, description: "Świetny skład i jakość" },
    risks: ["zawartość zbóż (ryż, jęczmień)"],
    comment:
      "Jedna z najlepszych karm w tej półce cenowej. Dobrze zbilansowana i bogata w składniki odżywcze.",
    score_0_100: 92,
  },

  verdict: {
    suitable_for: {
      young: false,
      adults: true,
      seniors: true,
      allergy_sufferers: false,
    },
    advantages: [
      "wysoka zawartość mięsa",
      "brak cukrów i GMO",
      "dobre źródła tłuszczu (łosoś, siemię lniane)",
    ],
    uncertainties: ["obecność zbóż może być zbędna"],
    disadvantages: ["zawiera zboża (nie monoproteinowa)"],
    final_rating: "bardzo dobra",
  },

  meta: {
    result_confidence: 0.93,
  },
};
