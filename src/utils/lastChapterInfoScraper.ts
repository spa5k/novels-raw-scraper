import { toArabicString } from "chinese-numbers-to-arabic";
import type { Page } from "playwright-chromium";
import type { TocItem } from "./types";

export const lastChapterInfoScraper = async (
  link: string,
  linkSelector: string,
  numberSelector: string,
  titleSelector: string,
  page: Page
): Promise<TocItem> => {
  await page.goto(link);

  const url = await page.$eval(linkSelector, (elm) => elm.getAttribute("href"));

  if (!url) {
    throw new Error("No link found");
  }

  const numberString = await page.$eval(
    numberSelector,
    (elm) => elm.textContent
  );

  if (!numberString) {
    throw new Error("No number found");
  }

  const title = await page.$eval(titleSelector, (elm) => elm.textContent);

  if (!title) {
    throw new Error("No title found");
  }

  const num = toArabicString(numberString);

  const number = Number.parseInt(num.replace(/^\D+/gu, ""));

  return {
    url,
    number,
    title: title.trim(),
  };
};
