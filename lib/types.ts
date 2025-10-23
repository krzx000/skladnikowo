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

export interface RatingValue {
  rate: 1 | 2 | 3 | 4 | 5 | null;
  description: string | null;
}

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
  declarate_percentage?: number | null;
  estimated_percentage?: number | null;
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
  type:
    | "Mokra karma"
    | "Sucha karma"
    | "Półwilgotna karma"
    | "Suszona karma"
    | "BARF"
    | "Przysmak";
  // Przeznaczenie
  purpose:
    | "Dla kociąt"
    | "Dla dorosłych kotów"
    | "Dla seniorów kotów"
    | "Dla sterylizowanych kotów"
    //
    | "Dla szczeniąt"
    | "Dla dorosłych psów"
    | "Dla seniorów psów"
    | "Dla sterylizowanych psów"
    //
    | "Uniwersalna"
    | "Weterynaryjna"
    | "Hypoalergiczna"
    | "Dla innych";

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
  analytical_components: {
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
    gluten_free: boolean | null; // czy bezglutenowa
    lactose_free: boolean | null; // czy bezlaktozowa
  };

  // Ocena
  rate: {
    meat_quality: RatingValue; // Jakość mięsa
    protein_content: RatingValue; // Zawartość białka
    fat_content: RatingValue; // Bilanms tłuszczu
    calcium_phosphorus_ratio: RatingValue; // Stosunek Ca/P
    vitamin_supplementation: RatingValue; // Uzupełnienie witamin
    macro_balance: RatingValue; // Bilans makro
    overall_rating: RatingValue; // Ogólna ocena
    risks: string[] | null; // Ryzyka związane z produktem
    comment: string | null; // Komentarz
    score_0_100: number | null; // Ocena 0-100
  };

  // Werdykt końcowy
  verdict: {
    suitable_for: {
      young: boolean | null; // kociąt/szczeniąt
      adults: boolean | null; // dorosłych
      seniors: boolean | null; // seniorów
      allergy_sufferers: boolean | null; // alergików
    };
    advantages: string[] | null; // zalety
    // wątpliwości
    uncertainties: string[] | null; // wątpliwości
    disadvantages: string[] | null; // wady
    final_rating:
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
    result_confidence: number | null; // wartość od 0 do 1 określająca ogólną pewność analizy AI
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
