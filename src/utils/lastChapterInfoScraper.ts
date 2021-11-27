import type { Page } from "puppeteer";
import type { TocItem } from "./types";

export const lastChapterInfoScraper = async (
  link: string,
  linkSelector: string,
  numberSelector: string,
  titleSelector: string,
  page: Page
): Promise<TocItem> => {
  const navigationPromise = page.waitForNavigation();

  await page.goto(link, { waitUntil: "domcontentloaded" });

  await navigationPromise;

  await page.waitForSelector(linkSelector);

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
  const number = Number.parseInt(numberString.replace(/^\D+/gu, ""));

  return {
    url,
    number,
    title: title.trim(),
  };
};
