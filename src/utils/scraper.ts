import type { Page } from "puppeteer";

export const scraper = async (url: string, page: Page): Promise<string> => {
  const navigationPromise = page.waitForNavigation();

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await navigationPromise;

  return page.content();
};
