import { ChapterOutput } from "..";
import { urlParser } from "../utils/urlParser";

/**
 * @param  {string} url
 * @returns Promise<String>
 * @description Returns the chapter text after scraping the chapter
 */
export const sixNineShuChapterScraper = async (
  url: string
): Promise<ChapterOutput> => {
  const $ = await urlParser(url);
  /** I don't want 10 lines of whitespace before and after chapter */

  const chapterText: string[] = $(".txtnav")
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
