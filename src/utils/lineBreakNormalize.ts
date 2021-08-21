export function linebreakNormalize(string: string): string {
  return string.replace(/\n+/gu, "\n");
}
