import { toArabicString } from "chinese-numbers-to-arabic";
import type { Page } from "puppeteer";
import type { QuickScraperOutput } from "quick-scraper";
import { quickScraperHeadless } from "quick-scraper";
import { titleCleaner } from "../../utils/titleCleaner";
import type { TocItem } from "../../utils/types";

export const ptwxzTocScraper = async (
  url: string,
  page: Page
): Promise<TocItem[]> => {
  let data: QuickScraperOutput;

  try {
    data = await quickScraperHeadless({
      url,
      options: {
        chapters: {
          selector: ".centent > ul> li > a",
          listItem: true,
          href: true,
        },
      },
      page,
    });
  } catch (error) {
    throw new Error(`Error while scraping - ${error as string}`);
  }

  const chaptersArray = data.data.chapters.lists;

  const chaptersData = [];

  if (chaptersArray?.length === 0 || !chaptersArray) {
    throw new Error("Some error happened while scraping");
  }

  for (const chapter of chaptersArray) {
    const chapterNumberString = toArabicString(
      chapter.text?.split(" ")[0] as string
    );

    if (!chapterNumberString.startsWith("第")) {
      continue;
    }

    const chapterNumber = chapterNumberString.replace(/\D/gu, "");
    const chapterTitle = chapter.text?.split(" ")[1];
    const chapterUrl = chapter.href;

    if (chapterNumber && chapterTitle && chapterUrl) {
      chaptersData.push({
        number: Number.parseInt(chapterNumber),
        title: titleCleaner(chapterTitle),
        url: chapterUrl,
      });
    }
  }
  return chaptersData;
};
