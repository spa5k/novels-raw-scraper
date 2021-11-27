import puppeteer from "puppeteer";
import { ptwxzChapterScraper } from "../src";

const testsArray: {
  output: string;
  url: string;
}[] = [
  {
    output: "“我是谁？我是龙尘”",
    url: "https://www.ptwxz.com/html/7/7811/4678765.html",
  },
  {
    output: "药液融入腹中，龙尘急忙用意念引导，将药液散开，融入四肢百骸。",
    url: "https://www.ptwxz.com/html/7/7811/4678766.html",
  },
  {
    output:
      "祖安一愣，笑嘻嘻地说道：“那我多半是不会去死的，生活这么精彩，还有那么多红颜知己等着我去陪伴，我可还没活够呢。”",
    url: "https://www.ptwxz.com/html/11/11622/9427527.html",
  },
];
jest.setTimeout(20_000);

describe("ptwxzChapterScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      expect(await ptwxzChapterScraper(url, page).then((text) => text[0])).toBe(
        output
      );
      await browser.close();
    });
  });
});
