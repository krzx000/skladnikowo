export type Unit =
  | "%"
  | "g"
  | "mg"
  | "µg"
  | "mg/kg"
  | "µg/kg"
  | "ppm"
  | "kcal"
  | "kJ"
  | "CFU/g"
  | "IU"
  | "liczba"
  | "dni"
  | "inne";

export type RatingValue = 1 | 2 | 3 | 4 | null;

export interface Measurement {
  name: string;
  value: number | null;
  unit: Unit;
  per?: string | null; // np. "na 100g", "na kg", "na porcję", itd.
  confidence?: number | null; // wartość od 0 do 1 określająca pewność pomiaru AI (jeśli dostępne)
  method?: string | null; // np. "etykieta", "analiza-lab HPLC", "oszacowanie-ai"
  note?: string | null; // dodatkowe uwagi dotyczące pomiaru
}
export interface IngredientPart {
  name: string;
  declaratePercentage?: number | null;
  estimatedPercentage?: number | null;
  role?: string | null; // np. "mięso", "warzywo", "dodatek funkcjonalny"
  alergen?: boolean | null;
  confidence?: number | null; // wartość od 0 do 1 określająca pewność pomiaru AI (jeśli dostępne)
  notes?: string | null; // dodatkowe uwagi dotyczące składnika
}

export interface AnalysisResultData2 {
  // Nazwa produktu
  name: string | null;

  // Producent
  producent: string | null;

  // Gatunek docelowy
  species: "kot" | "pies" | "inne";

  // Rodzaj produktu
  type: "mokra" | "sucha" | "półwilgotna" | "suszona" | "BARF" | "przysmak";
  // Przeznaczenie
  purpose:
    | "kocię"
    | "dorosły"
    | "senior"
    | "weterynaryjna"
    | "hypoalergiczna"
    | "sterylizowane"
    | "uniwersalna"
    | "szczenię"
    | "inne";

  // Skład
  composition: {
    meal_and_offal: { name: string; percentage: number | null }[] | null;
    fruits_and_vegetables: { name: string; percentage: number | null }[] | null;
    grains: { name: string; percentage: number | null }[] | null;
    other_additives: { name: string; percentage: number | null }[] | null;
    contains_grains: boolean | null;
    contains_sugar: boolean | null;
    contains_gmo: boolean | null;
    is_monoprotein: boolean | null;
  };

  // Składniki analityczne
  analyticalComponents: {
    humidity: Measurement | null; // Wilgotność
    protein: Measurement | null; // Białko surowe
    fat: Measurement | null; // Tłuszcz surowy
    fiber: Measurement | null; // Włókno surowe
    ash: Measurement | null; // Popiół surowy
    carbohydrates: Measurement | null; // Węglowodany
    energy: {
      kcal_per_100g: Measurement | null; // kcal na 100g
      kJ_per_100g: Measurement | null; // kJ na 100g
    };

    // wartości przeliczone na suchą masę (jeśli wilgotność znana)
    protein_dry_matter?: Measurement | null; // Białko na suchej masie
    fat_dry_matter?: Measurement | null; // Tłuszcz na suchej masie
    ash_dry_matter?: Measurement | null; // Popiół na suchej masie
  };
  // Minerały i mikroelementy
  minerals: Measurement[] | null; // Minerały
  vitamins: Measurement[] | null; // Witaminy
  microelements: Measurement[] | null; // Mikroelementy
  oils: Measurement[] | null; // Oleje
  other_functional_additives: Measurement[] | null; // Inne dodatki funkcjonalne
  taurine_mg_kg: Measurement | null; // Tauryna mg/kg

  // Alergeny
  allergens: {
    detected: string[] | null; // wykryte alergeny
    potential: string[] | null; // potencjalne alergeny
    glutenFree: boolean | null; // czy bezglutenowa
    lactoseFree: boolean | null; // czy bezlaktozowa
  };

  // Ocena
  rate: {
    meatQuality: RatingValue; // Jakość mięsa
    proteinContent: RatingValue; // Zawartość białka
    fatContent: RatingValue; // Bilanms tłuszczu
    calciumPhosphorusRatio: RatingValue; // Stosunek Ca/P
    vitaminSupplementation: RatingValue; // Uzupełnienie witamin
    macroBalance: RatingValue; // Bilans makro
    overallRating: RatingValue; // Ogólna ocena
    risks: string[] | null; // Ryzyka związane z produktem
    comment: string | null; // Komentarz
    score_0_100: number | null; // Ocena 0-100
  };

  // Werdykt końcowy
  verdict: {
    suitableFor: {
      kittens: boolean | null; // kociąt
      adults: boolean | null; // dorosłych
      seniors: boolean | null; // seniorów
      allergySufferers: boolean | null; // alergików
      pickyEaters: boolean | null; // wybrednych
      other: string[] | null; // inne grupy
    };
    advantages: string[] | null; // zalety
    disadvantages: string[] | null; // wady
    finalRating:
      | "wybitna"
      | "bardzo dobra"
      | "dobra"
      | "średnia"
      | "słaba"
      | "niezalecana"
      | null;
  };

  // Dodatkowe dane
  meta: {
    resultConfidence: number | null; // wartość od 0 do 1 określająca ogólną pewność analizy AI
  };
}

export interface AnalysisResultData {
  // Podstawowe dane
  nazwa: string;
  producent: string | null;
  gatunek: "kot" | "pies" | "inne";
  rodzaj: "mokra" | "sucha" | "przysmak";
  przeznaczenie:
    | "kocię"
    | "dorosły"
    | "senior"
    | "uniwersalna"
    | "szczenię"
    | "inne";

  // Skład
  sklad: {
    mieso_i_podroby: { name: string; percentage: number | null }[] | null; // np. [{ name: "wołowina", percentage: 60 }, { name: "wątroba", percentage: 10 }]
    warzywa_owoce: { name: string; percentage: number | null }[] | null; // np. [{ name: "marchew", percentage: 30 }, { name: "jabłko", percentage: 20 }]
    inne_dodatki: { name: string; percentage: number | null }[] | null; // np. [{ name: "drożdże piwne", percentage: 5 }, { name: "olej z łososia", percentage: 10 }]
    zboza: boolean | null;
    cukier: boolean | null;
    gmo: boolean | null;
    monobialkowa: boolean | null;
  };

  // Składniki analityczne
  skladniki_analityczne: {
    name: string;
    value: number | null;
  }[];

  // Minerały i mikroelementy
  mineralne: {
    name: string;
    value: number | null;
  }[]; // np. [{ name: "wapń", value: 1.2 }, { name: "fosfor", value: 1.0 }, { name: "magnez", value: null }]

  // Dodatki funkcjonalne i witaminy
  dodatki_dietetyczne: {
    tauryna_mg_kg: number | null;
    witaminy: {
      name: string;
      value: number | null;
    }[];
    mikroelementy:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "cynk", value: 25 }, { name: "mangan", value: 1.4 }]
    oleje:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "olej z łososia", value: null }]
    inne_dodatki_funkcjonalne:
      | {
          name: string;
          value: number | null;
        }[]
      | null; // np. [{ name: "Yucca Mojave", value: null }, { name: "prebiotyki", value: null }]
  };

  // Energia
  energia: {
    kcal_na_100g: number | null;
    kJ_na_100g: number | null;
  };

  // Ocena jakości (subiektywna na podstawie analizy)
  ocena: {
    jakosc_miesa: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_bialka: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_tluszczu: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    stosunek_Ca_P: "prawidłowy" | "zaburzony" | "brak danych" | null;
    uzupelnienie_witamin: "pełne" | "częściowe" | "brak danych" | null;
    bilans_makro: "dobry" | "średni" | "zły" | null;
    komentarz: string | null;
    ogolna_ocena:
      | "wybitna"
      | "bardzo dobra"
      | "dobra"
      | "średnia"
      | "słaba"
      | null;
    ocena_0_100: number | null;
  };

  // Werdykt końcowy
  werdykt: {
    odpowiednia_dla: {
      kociat: boolean | null;
      doroslych: boolean | null;
      seniorow: boolean | null;
      alergikow: boolean | null;
      wybrednych: boolean | null;
    };
    zalety: string[];
    wady: string[];
    ocena_koncowa:
      | "wybitna"
      | "bardzo dobra"
      | "dobra"
      | "średnia"
      | "słaba"
      | "niezalecana"
      | null;
  };

  // Dodatkowe dane
  meta: {
    kraj_produkcji: string | null;
    typ_bialka: string | null; // np. "drób", "ryba", "wołowina", "mieszane"
    zrodlo_danych: string | null; // np. "oficjalny opis", "Aukcja Allegro", "opakowanie"
    data_analizy: string; // ISO format
  };
}
