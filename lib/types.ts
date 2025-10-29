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

export interface AnalysisResultData {
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
