export function minifyText(input: string): string {
  return input
    .replace(/\s+/g, " ") // zamienia wszystkie spacje, taby i nowe linie na pojedynczą spację
    .replace(/\s*([{}[\]:,])\s*/g, "$1") // usuwa spacje wokół znaków strukturalnych
    .trim(); // usuwa spacje z początku i końca
}
