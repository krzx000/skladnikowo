import { minifyText } from "@/lib/utils";
import { generateText } from "ai";
import { z } from "zod";

// export const runtime = "edge";

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
      system: `
      Zwracaj tylko dane w JSON wg interfejsu TypeScript, bez komentarzy i tekstu poza nim.
      Braki = null.
      Nie wiesz? — wywnioskuj logicznie ze składu (np. monobiałkowa, Ca/P, węgle, źródło białka).
      Oblicz: Ca/P (2 miejsca), węglowodany = 100-(białko+tłuszcz+wilg+popiół), energię, błonnik, inne zależne.
      Uwzględnij energię metaboliczną (kcal/kg) – oszacuj jeśli brak danych.
      Zawsze dodaj zalety i wady, nawet przy dobrym produkcie.
      Zaznacz niepożądane: cukier, zboża, GMO, barwniki, konserwanty, sztuczne aromaty, polepszacze smaku, produkty uboczne niskiej jakości.
      Oceniaj wg norm AAFCO/FEDIAF (lub najbliższych dostępnych): białko, tłuszcz, minerały, Ca/P, witaminy, błonnik, energia, wilgotność.
      Dla junior/senior – odpowiednie normy.
      Brak danych → przyjmij typowe wartości (oznacz przybliżenie i wpływ na wynik).
      Uwzględnij jakość i pochodzenie składników: mięso świeże > suszone > produkty pochodne > mączki.
      Analizuj udział składników roślinnych – im więcej wypełniaczy (kukurydza, pszenica, ryż, groch) tym gorzej.
      Oceń transparentność etykiety – brak szczegółów = niższa ocena.
      Uwzględnij stosunek tłuszczu do białka i równowagę kwasów omega-3/6 (jeśli dane).
      Zwróć uwagę na zawartość soli, popiołu, fosforu, magnezu – nadmiar = obniżenie punktacji.
      Analizuj ryzyko dla zdrowia: otyłość, kamienie moczowe, alergie, nadmiar fosforu, zły Ca/P, dodatki chemiczne.
      Zaznacz, jeśli produkt zawiera marketingowe określenia typu „premium”, „naturalna”, bez podania źródeł.
      Uwzględnij obecność składników funkcjonalnych (olej z łososia, drożdże, tauryna, glukozamina, prebiotyki, L-karnityna, witaminy naturalne).
      Sprawdź kompletność diety – czy produkt pełnoporcjowy czy uzupełniający.
      Analizuj, czy proporcje składników zapewniają prawidłowe trawienie i równowagę mikroelementów.
      Oceń proces produkcji, jeśli możliwe (prasowana na zimno > ekstrudowana).
      Uwzględnij zapach, teksturę i praktyczność karmienia (jeśli dane).
      Ocena 0–100 (surowa): skład 35%, minerały/CaP 20%, jakość 20%, brak dodatków 15%, etykieta 10%.
      75 tylko dla karm wysokiej jakości z czystym składem.
      Brak danych, niejasne opisy lub nieprecyzyjne źródła składników = kara punktowa.
      Oceniaj całość obiektywnie, bez pobłażania, bazując na wiedzy naukowej i fizjologii zwierząt.
      Podaj w werdykcie jasny, rzeczowy opis – bez marketingu.
      JSON musi być poprawny (parsowalny przez JSON.parse w JavaScript). To jest bardzo ważne, żeby JSON był poprawny.
      Nie zmieniaj nazw pól ani typów, nie dodawaj nowych.
      Minimalizuj białe znaki i nowe linie.
      Bądź surowy, dokładny, logiczny, transparentny i spójny w ocenach.
      Wyniki muszą być możliwe do powtórzenia przy tych samych danych.
      Jeśli skład jest bardzo niekompletny lub podejrzany, zaznacz to w komentarzu i obniż ocenę.
      Jeśli produkt jest całkowicie nieanalizowalny, zwróć odpowiedni błąd.
      Jeśli skład jest w innym języku niż polski lub angielski, przetłumacz go najpierw na polski i wtedy analizuj.
      Jeśli skład zawiera jednostki miary w innych systemach (imperialne itp.), przelicz je na metryczne przed analizą.
      `,
      //   model: "openai/gpt-5-nano",
      //   model: "amazon/nova-micro",
      prompt: minifyText(`
      "${sanitizedValue}"
      Zasady:
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

      console.log("Parsed and fixed:", JSON.stringify(parsed));

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
