// We make a URL regular expression for any base URL.
const URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+)(?:\.[a-zA-Z0-9-]+)+(?:\/.*)?$/;

export default class StringUtils {
  // This function is used to check if a string contains a URL.
  public static hasUrl(str: string): boolean {
    return URL_REGEX.test(str);
  }

  // This function is used to check if a string contains a bad phrase.
  public static hasBadPhrase(str: string): boolean {
    // We convert the string to lowercase.
    str = str.toLowerCase();

    // We convert a string of bad phrases to an array.
    const BAD_PHRASES = process.env.BAD_PHRASES.split(",");

    // We check if the string contains a bad phrase.
    return BAD_PHRASES.some((phrase) => str.includes(phrase));
  }
}
