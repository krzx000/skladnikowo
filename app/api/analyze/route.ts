import { minifyText } from "@/lib/utils";
import { generateText } from "ai";
import { z } from "zod";

export const runtime = "edge";

// Schema walidacji inputu
const AnalyzeInputSchema = z.object({
  value: z
    .string()
    .min(10, "Skład musi zawierać minimum 10 znaków")
    .max(5000, "Skład nie może przekraczać 5000 znaków")
    .trim()
    .refine(
      (val) => {
        // Sprawdź czy zawiera przynajmniej jedną literę (nie tylko cyfry/znaki specjalne)
        return /[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(val);
      },
      { message: "Skład musi zawierać tekst, nie tylko cyfry" }
    )
    .refine(
      (val) => {
        // Sprawdź czy nie zawiera niebezpiecznych znaków/tagów HTML/JS
        return !/<script|javascript:|onerror=|onclick=/i.test(val);
      },
      { message: "Wykryto potencjalnie niebezpieczną treść" }
    ),
});

export async function POST(req: Request) {
  try {
    // Parsuj body
    const body = await req.json();

    // Walidacja inputu
    const validationResult = AnalyzeInputSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return new Response(
        JSON.stringify({
          error: "Błąd walidacji",
          details: errors,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const { value } = validationResult.data;

    // Dodatkowe zabezpieczenie - usuń potencjalnie niebezpieczne znaki
    const sanitizedValue = value
      .replace(/<[^>]*>/g, "") // usuń tagi HTML
      .replace(/[<>]/g, ""); // usuń pozostałe < >

    const result = await generateText({
      model: "meituan/longcat-flash-chat",
      maxOutputTokens: 4096,

      //   model: "openai/gpt-5-nano",
      //   model: "amazon/nova-micro",
      prompt: minifyText(`
Jesteś ekspertem ds. żywienia zwierząt (psów i kotów). 
Twoim zadaniem jest przeanalizować skład karmy podany w cudzysłowie:
"${minifyText(sanitizedValue)}"

Zasady:
Zwracaj tylko dane w JSON wg interfejsu TypeScript, bez komentarzy i tekstu poza nim.
Braki = null.
Nie wiesz? — wywnioskuj (np. monobiałkowa, Ca/P, węgle).
Oblicz: Ca/P (2 miejsca), węglowodany = 100−(białko+tłuszcz+wilg+popiół), energię, inne zależne.
Zawsze dodaj zalety i wady.
Zaznacz niepożądane: cukier, zboża, GMO, barwniki, konserwanty.
Oceniaj wg norm AAFCO/FEDIAF: białko, tłuszcz, minerały, Ca/P, witaminy, błonnik, energia.
Dla junior/senior – odpowiednie normy.
Brak danych → typowe wartości (oznacz przybliżenie).
Oceń jakość składników, monobiałkowość, przejrzystość etykiety, bezpieczeństwo.
Ocena 0–100 (surowa): skład 35%, minerały/CaP 20%, jakość 20%, brak dodatków 15%, etykieta 10%.
Brak danych obniża ocenę.
JSON musi być poprawny (parsowalny).
Nie zmieniaj pól/typów, nie dodawaj nowych.
Minimalizuj białe znaki.
Bądź surowy, precyzyjny, obiektywny, opieraj się na wiedzy naukowej.

Zachowaj dokładnie poniższą strukturę (nie dodawaj, nie usuwaj, nie zmieniaj nazw pól):

export interface AnalysisResultData {
  nazwa: string;
  producent: string | null;
  gatunek: "kot" | "pies" | "inne";
  rodzaj: "mokra" | "sucha" | "przysmak";
  przeznaczenie: "kocię" | "dorosły" | "senior" | "uniwersalna" | "szczenię" | "inne";
  sklad: {
    mieso_i_podroby: { name: string; percentage: number | null }[] | null;
    warzywa_owoce: { name: string; percentage: number | null }[] | null;
    inne_dodatki: { name: string; percentage: number | null }[] | null;
    zboza: boolean | null;
    cukier: boolean | null;
    gmo: boolean | null;
    monobialkowa: boolean | null;
  };
  skladniki_analityczne: { name: string; value: number | null }[];
  mineralne: { name: string; value: number | null }[];
  dodatki_dietetyczne: {
    tauryna_mg_kg: number | null;
    witaminy: { name: string; value: number | null }[];
    mikroelementy: { name: string; value: number | null }[] | null;
    oleje: { name: string; value: number | null }[] | null;
    inne_dodatki_funkcjonalne: { name: string; value: number | null }[] | null;
  };
  energia: { kcal_na_100g: number | null; kJ_na_100g: number | null };
  ocena: {
    jakosc_miesa: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_bialka: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    zawartosc_tluszczu: "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    stosunek_Ca_P: "prawidłowy" | "zaburzony" | "brak danych" | null;
    uzupelnienie_witamin: "pełne" | "częściowe" | "brak danych" | null;
    bilans_makro: "dobry" | "średni" | "zły" | null;
    komentarz: string | null;
    ogolna_ocena: "wybitna" | "bardzo dobra" | "dobra" | "średnia" | "słaba" | null;
    ocena_0_100: number | null;
  };
  werdykt: {
    odpowiednia_dla: { kociat: boolean | null; doroslych: boolean | null; seniorow: boolean | null; alergikow: boolean | null; wybrednych: boolean | null };
    zalety: string[];
    wady: string[];
    ocena_koncowa: "wybitna" | "bardzo dobra" | "dobra" | "średnia" | "słaba" | "niezalecana" | null;
  };
  meta: { kraj_produkcji: string | null; typ_bialka: string | null; zrodlo_danych: string | null; data_analizy: string };
};
`),
    });

    console.log("AI Response:", result);

    try {
      // Parsuj JSON z odpowiedzi AI
      const parsed = JSON.parse(result.text);

      // Napraw strukturę jeśli meta jest w werdykt
      if (parsed.werdykt?.meta && !parsed.meta) {
        parsed.meta = parsed.werdykt.meta;
        delete parsed.werdykt.meta;
      }

      // Napraw datę jeśli jest w złym formacie
      if (parsed.meta?.data_analizy) {
        parsed.meta.data_analizy = new Date().toISOString();
      }

      console.log("Parsed and fixed:", parsed);

      return new Response(JSON.stringify(parsed), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("JSON Parse Error:", error);
      console.error("Raw text:", result.text);
      return new Response(
        JSON.stringify({
          error: "Invalid JSON from AI",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Request Error:", error);
    return new Response(
      JSON.stringify({
        error: "Błąd przetwarzania żądania",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
