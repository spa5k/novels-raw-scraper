import { ChapterOutput } from "..";
import { urlParser } from "../utils/urlParser";

/**
 * @param  {string} url
 * @returns Promise<String>
 * @description Returns the chapter text after scraping the chapter
 */

export const ptwxzChapterScraper = async (
  url: string
): Promise<ChapterOutput> => {
  const $ = await urlParser(url);
  const chapterText: string[] = $("body")
    .contents()
    .filter(
      (_: number, element: { type: string }) => element.type === "text"
    ) /** Root level text nodes are chapter content */
    .map((_index: number, element) =>
      $(element).text()
    ) /** Get their text content here */
    .get(); /** Convert to JS Array */
  if (!chapterText) {
    throw new Error("Error in getting chapter text");
  }

  const chapterOutput: string[] = [];

  chapterText.forEach((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      chapterOutput.push(trimmedStr);
    }
  });
  return chapterOutput;
};
