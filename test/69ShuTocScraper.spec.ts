import { sixNineShuTocScraper } from "../src";

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
  {
    output: "牢狱之灾",
    url: "https://www.69shu.com/31477/",
  },
];
jest.setTimeout(10_000);

describe("ptwxzTocScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      expect(
        await sixNineShuTocScraper(url).then((text) => text[0].title)
      ).toBe(output);
    });
  });
});
