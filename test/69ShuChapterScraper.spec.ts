import puppeteer from "puppeteer";
import { snChapterScraper } from "../src";

const testsArray: {
  output: string;
  url: string;
}[] = [
  {
    output: "第1章 牢狱之灾",
    url: "https://www.69shu.com/txt/31477/22493555",
  },
  {
    output: "第915章 绝世武神",
    url: "https://www.69shu.com/txt/31477/26126399",
  },
  {
    output: "第4章 ，只因为在人群中多看了一眼",
    url: "https://www.69shu.com/txt/35345/24661030",
  },
];

jest.setTimeout(20_000);

describe("sixNineShuChapterScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      expect(await snChapterScraper(url, page).then((text) => text[0])).toBe(
        output
      );
      await browser.close();
    });
  });
});
