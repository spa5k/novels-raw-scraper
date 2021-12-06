import { titleCleaner } from "../src/utils/titleCleaner";

const testsArray: {
  input: string;
  output: string;
}[] = [
  {
    input: "第915章 绝世武神",
    output: "绝世武神",
  },
  {
    input: "Chapter 1906 Mo Nian’s Power",
    output: "Mo Nian’s Power",
  },
  {
    input: "#494 Part 2 Build! In history strongest militia",
    output: "Part 2 Build! In history strongest militia",
  },
];

describe("ptwxzTocScraper", () => {
  testsArray.forEach(({ output, input }, index) => {
    test(`#${index + 1}: Testing ${input}`, async () => {
      expect(titleCleaner(input)).toBe(output);
    });
  });
});
