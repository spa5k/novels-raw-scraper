import chardet from "chardet";
import { load } from "cheerio";
import got from "got";
import pkg from "iconv-lite";
import { isUrlOnline } from "is-url-online";

export const urlParser = async (url: string): Promise<cheerio.Root> => {
  const { decode } = pkg;
  const isUrlExist = await isUrlOnline(url);
  if (!isUrlExist) {
    throw new Error("No Such url");
  }
  let response: Buffer;
  try {
    response = (await got(url, {
      responseType: "buffer",
      resolveBodyOnly: true,
    })) as unknown as Buffer;
  } catch (error) {
    console.log("Something happened while getting the data");
    throw new Error(error as string);
  }

  const encodingType = chardet.detect(response);

  const decodedHtml = decode(response, encodingType as string);
  return load(decodedHtml);
};
