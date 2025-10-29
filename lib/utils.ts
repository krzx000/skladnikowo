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

/**
 * Sanitizes a text string by removing HTML tags and escaping special characters.
 *
 * This function performs the following operations:
 * 1. Removes all HTML tags from the input string
 * 2. Escapes special HTML characters to their entity equivalents:
 *    - & becomes &amp;
 *    - < becomes &lt;
 *    - > becomes &gt;
 *    - " becomes &quot;
 *    - ' becomes &#39;
 *
 * @param input - The text string to sanitize
 * @returns The sanitized text string with HTML tags removed and special characters escaped
 *
 * @example
 * ```typescript
 * sanitizeText('<script>alert("xss")</script>') // Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 * sanitizeText('Hello <b>World</b>') // Returns: 'Hello World'
 * sanitizeText('Tom & Jerry') // Returns: 'Tom &amp; Jerry'
 * ```
 */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // usuń tagi HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
