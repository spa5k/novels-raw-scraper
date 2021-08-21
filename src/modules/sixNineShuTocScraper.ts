import { toArabicString } from "chinese-numbers-to-arabic";
import { quickScraper } from "quick-scraper";
import { TocOutput } from "../types/types";

/**
 * @param  {string} url
 * @returns Promise<{number: number; title: string; url: string}[]>
 * @description Scrapes the Table of content and returns the array.
 */

export const sixNineShuTocScraper = async (url: string): Promise<TocOutput> => {
  const data = await quickScraper({
    url,
    options: {
      chapters: {
        selector: "#catalog > ul> li > a",
        listItem: true,
        href: true,
      },
    },
  });
  const chaptersArray = data.data.chapters.lists;

  const chaptersData: TocOutput = [];

  if (!chaptersArray) {
    throw new Error("Some error happened while scraping the toc");
  }

  for (const chapter of chaptersArray) {
    let chapterNumberString = toArabicString(
      chapter.text?.split(" ")[0] as string
    );

    if (typeof Number.parseInt(chapterNumberString[0]) === "number") {
      chapterNumberString = chapterNumberString.split(".").pop() as string;
    }

    if (!chapterNumberString.startsWith("第")) {
      continue;
    }

    const chapterNumber = chapterNumberString.replace(/\D/gu, "");
    const chapterTitle = chapter.text?.split(" ")[1];

    const chapterUrl = chapter.href;
    if (chapterNumber && chapterTitle && chapterUrl) {
      chaptersData.push({
        number: Number.parseInt(chapterNumber),
        title: chapterTitle,
        url: chapterUrl,
      });
    }
  }
  return chaptersData;
};
