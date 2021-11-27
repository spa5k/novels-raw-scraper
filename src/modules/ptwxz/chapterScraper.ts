import { load } from "cheerio";
import type { Page } from "puppeteer";
import { scraper } from "../../utils/scraper";

export const ptwxzChapterScraper = async (
  url: string,
  page: Page
): Promise<string[]> => {
  const content = await scraper(url, page);

  if (!content) {
    throw new Error("No content found for the page");
  }

  const $ = load(content);

  const chapterText = $("#content")
    .contents()
    .filter((_: number, element: { type: string }) => element.type === "text")
    .map((index: number, element) => $(element).text())
    .get();

  const chapterOutput: string[] = [];

  chapterText.forEach((str) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length > 0) {
      chapterOutput.push(trimmedStr);
    }
  });

  return chapterOutput;
};
