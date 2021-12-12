import { isUrlString } from "is-url-online";
import type { Page } from "playwright-chromium";
import { lastChapterInfoScraper } from "../utils/lastChapterInfoScraper";
import { titleCleaner } from "../utils/titleCleaner";

type Selector = {
  sourceUrl: string;
  numberSelector: string;
  linkSelector: string;
  titleSelector: string;
  page: Page;
};

export const lastChapterInfo = async ({
  linkSelector,
  numberSelector,
  sourceUrl,
  titleSelector,
  page,
}: Selector): Promise<{
  link: string;
  number: number;
  title: string;
}> => {
  const content = await lastChapterInfoScraper(
    sourceUrl,
    linkSelector,
    numberSelector,
    titleSelector,
    page
  );

  if (content.url === "") {
    throw new Error("No link found");
  }

  if (!content.number || !content.title) {
    throw new Error("No number or title found");
  }
  const urlString = isUrlString(content.url);

  let { url } = content;
  if (!urlString) {
    const { href: absoluteUrl } = new URL(url, sourceUrl);

    url = absoluteUrl;
  }

  const { number, title } = content;

  return {
    link: url,
    number,
    title: titleCleaner(title.trim()),
  };
};
