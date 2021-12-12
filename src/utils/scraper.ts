import type { Page } from "playwright-chromium";

export const scraper = async (url: string, page: Page): Promise<string> => {
  await page.goto(url);
  return page.content();
};
