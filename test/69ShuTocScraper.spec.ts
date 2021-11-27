import puppeteer from "puppeteer";
import { snTocScraper } from "../src";

const testsArray: {
  output: string;
  url: string;
}[] = [
  {
    output: "丹帝记忆",
    url: "https://www.69shu.com/22209/",
  },
  {
    output: "一切为了修炼",
    url: "https://www.69shu.com/35572/",
  },
];
jest.setTimeout(20_000);

describe("ptwxzTocScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      expect(await snTocScraper(url, page).then((text) => text[0].title)).toBe(
        output
      );
      await browser.close();
    });
  });
});
