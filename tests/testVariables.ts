import { AnalysisResultData2 } from "@/lib/types";

export const exampleAnalysis: AnalysisResultData2 = {
  name: "Chicken Deluxe – mokra karma dla kota",
  producent: "NaturalPet Foods",
  species: "kot",
  type: "Mokra karma",
  purpose: "Dla dorosłych kotów",

  composition: {
    meal_and_offal: [
      { name: "mięso z kurczaka", percentage: 65 },
      { name: "wątroba z kurczaka", percentage: 10 },
    ],
    fruits_and_vegetables: [
      { name: "marchew", percentage: 4 },
      { name: "dynia", percentage: 3 },
    ],
    grains: null,
    other_additives: [
      { name: "olej z łososia", percentage: 1 },
      { name: "drożdże piwne", percentage: 0.5 },
    ],
    contains_grains: false,
    contains_sugar: false,
    contains_gmo: false,
    is_monoprotein: true,
  },

  analytical_components: {
    humidity: {
      name: "Wilgotność",
      value: 78,
      unit: "%",
      per: "na 100g",
      confidence: 0.95,
      method: "etykieta",
    },
    protein: {
      name: "Białko surowe",
      value: 10.5,
      unit: "%",
      per: "na 100g",
      confidence: 0.98,
      method: "etykieta",
    },
    fat: {
      name: "Tłuszcz surowy",
      value: 6,
      unit: "%",
      per: "na 100g",
      confidence: 0.96,
      method: "etykieta",
    },
    fiber: {
      name: "Włókno surowe",
      value: 0.4,
      unit: "%",
      per: "na 100g",
      confidence: 0.9,
      method: "etykieta",
    },
    ash: {
      name: "Popiół surowy",
      value: 2,
      unit: "%",
      per: "na 100g",
    },
    carbohydrates: {
      name: "Węglowodany",
      value: 3.1,
      unit: "%",
      per: "na 100g",
      method: "oszacowanie-ai",
      confidence: 0.8,
    },
    energy: {
      kcal_per_100g: {
        name: "Energia (kcal)",
        value: 90,
        unit: "kcal",
        per: "na 100g",
        confidence: 0.95,
        method: "oszacowanie-ai",
      },
      kJ_per_100g: {
        name: "Energia (kJ)",
        value: 376,
        unit: "kJ",
        per: "na 100g",
      },
    },
    protein_dry_matter: {
      name: "Białko (sucha masa)",
      value: 47.7,
      unit: "%",
      per: "na suchą masę",
      method: "obliczenia-ai",
    },
    fat_dry_matter: {
      name: "Tłuszcz (sucha masa)",
      value: 27.3,
      unit: "%",
      per: "na suchą masę",
    },
    ash_dry_matter: {
      name: "Popiół (sucha masa)",
      value: 9.1,
      unit: "%",
      per: "na suchą masę",
    },
  },

  minerals: [
    { name: "Wapń", value: 0.25, unit: "%", per: "na 100g" },
    { name: "Fosfor", value: 0.2, unit: "%", per: "na 100g" },
    { name: "Magnez", value: 0.02, unit: "%", per: "na 100g" },
  ],

  vitamins: [
    { name: "Witamina A", value: 2000, unit: "IU" },
    { name: "Witamina D3", value: 250, unit: "IU" },
    { name: "Witamina E", value: 30, unit: "mg" },
  ],

  microelements: [
    { name: "Cynk", value: 15, unit: "mg/kg" },
    { name: "Miedź", value: 1, unit: "mg/kg" },
    { name: "Mangan", value: 1.2, unit: "mg/kg" },
    { name: "Jod", value: 0.3, unit: "mg/kg" },
  ],

  oils: [
    {
      name: "Olej z łososia",
      value: 1,
      unit: "%",
      note: "bogaty w kwasy Omega-3",
    },
  ],

  other_functional_additives: [
    {
      name: "Prebiotyki (MOS/FOS)",
      value: 0.2,
      unit: "%",
      note: "wspiera florę jelitową",
    },
    {
      name: "Yucca Mojave",
      value: 0.1,
      unit: "%",
      note: "zmniejsza zapach odchodów",
    },
  ],

  taurine_mg_kg: {
    name: "Tauryna",
    value: 1500,
    unit: "mg/kg",
    confidence: 0.95,
  },

  allergens: {
    detected: [],
    potential: ["kurczak"],
    gluten_free: true,
    lactose_free: true,
  },

  rate: {
    meat_quality: {
      rate: 5,
      description: "Duży udział świeżego mięsa z kurczaka, najwyższa jakość.",
    },
    protein_content: {
      rate: 4,
      description:
        "Zawartość białka na poziomie optymalnym dla dorosłego kota.",
    },
    fat_content: {
      rate: 4,
      description: "Bilans tłuszczu odpowiedni dla zdrowego kota.",
    },
    calcium_phosphorus_ratio: {
      rate: 3,
      description: "Stosunek wapnia do fosforu lekko odbiega od optimum.",
    },
    vitamin_supplementation: {
      rate: 4,
      description: "Dobrze uzupełnione witaminy A, D3 i E.",
    },
    macro_balance: {
      rate: 4,
      description: "Makroelementy w zbilansowanej proporcji.",
    },
    overall_rating: {
      rate: 5,
      description: "Produkt premium, dobrze zbilansowany i wartościowy.",
    },
    risks: ["Możliwa alergia na białko drobiowe"],
    comment:
      "Karma wysokiej jakości z dużym udziałem mięsa. Dobrze zbilansowana, bez zbóż i cukrów. Idealna dla dorosłych kotów.",
    score_0_100: 88,
  },

  verdict: {
    suitable_for: {
      young: false,
      adults: true,
      seniors: true,
      allergy_sufferers: false,
    },
    advantages: [
      "Wysoki udział mięsa z kurczaka",
      "Bez zbóż i cukrów",
      "Dobrze zbilansowany skład",
      "Źródło kwasów Omega-3",
    ],
    uncertainties: ["Możliwość reakcji alergicznej u wrażliwych kotów"],
    disadvantages: ["Nieodpowiednia dla alergików na drób"],
    final_rating: "bardzo dobra",
  },

  meta: {
    result_confidence: 0.93,
  },
};
