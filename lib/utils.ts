/**
 * Minifies a text string by removing unnecessary whitespace.
 *
 * This function performs the following operations:
 * 1. Replaces multiple consecutive whitespace characters with a single space
 * 2. Removes whitespace around special characters: {}[]:,
 * 3. Trims leading and trailing whitespace
 *
 * @param input - The text string to minify
 * @returns The minified text string with reduced whitespace
 *
 * @example
 * ```typescript
 * minifyText('  hello   world  ') // Returns: 'hello world'
 * minifyText('{ "key" : "value" }') // Returns: '{"key":"value"}'
 * ```
 */
export function minifyText(input: string): string {
  return input
    .replace(/\s+/g, " ")
    .replace(/\s*([{}[\]:,])\s*/g, "$1")
    .trim();
}

/**
 * Capitalizes the first character of a string.
 *
 * @param str - The string to capitalize
 * @returns The string with the first character capitalized, or the original string if empty
 *
 * @example
 * ```ts
 * capitalizeFirst("hello"); // returns "Hello"
 * capitalizeFirst(""); // returns ""
 * ```
 */
export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
