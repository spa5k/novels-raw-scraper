import { ptwxzTocScraper } from "../src";

const testsArray: {
  output: string;
  url: string;
}[] = [
  {
    output: "键盘侠",
    url: "https://www.ptwxz.com/html/11/11622/",
  },
  {
    output: "田园惊变",
    url: "https://www.ptwxz.com/html/7/7811/",
  },
  {
    output: "孟川和云青萍",
    url: "https://www.ptwxz.com/html/10/10272/",
  },
];
jest.setTimeout(10_000);

describe("ptwxzTocScraper", () => {
  testsArray.forEach(({ output, url }, index) => {
    test(`#${index + 1}: Testing ${url}`, async () => {
      expect(await ptwxzTocScraper(url).then((text) => text[0].title)).toBe(
        output
      );
    });
  });
});
