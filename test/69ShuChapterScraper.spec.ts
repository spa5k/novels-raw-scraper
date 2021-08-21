import { sixNineShuChapterScraper } from "../src";

const testsArray: {
  output: string;
  url: string;
}[] = [
  {
    output: "第1章 牢狱之灾",
    url: "https://www.69shu.com/txt/31477/22493555",
  },
  {
    output: "完本感言",
    url: "https://www.69shu.com/txt/31477/26126399",
  },
  {
    output: "第4章 ，只因为在人群中多看了一眼",
    url: "https://www.69shu.com/txt/35345/24661030",
  },
];

jest.setTimeout(10_000);

describe("sixNineShuChapterScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      expect(await sixNineShuChapterScraper(url).then((text) => text[0])).toBe(
        output
      );
    });
  });
});
