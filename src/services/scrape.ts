import cheerio from "cheerio";
import { fetchPageHtml } from "../utils/html";

const metaTagContent = (
  doc: cheerio.Root,
  type: string,
  attr: string
): string => {
  return doc(`meta[${attr}='${type}']`).attr(`content`);
};

const getTitle = (doc: cheerio.Root) => {
  const title =
    metaTagContent(doc, "og:title", "property") ||
    metaTagContent(doc, "og:title", "name");

  return title;
};

const getSiteName = (doc: cheerio.Root) => {
  const siteName =
    metaTagContent(doc, "og:site_name", "property") ||
    metaTagContent(doc, "og:site_name", "name");

  return siteName;
};

const getDescription = (doc: cheerio.Root) => {
  const description =
    metaTagContent(doc, "og:description", "property") ||
    metaTagContent(doc, "description", "name") ||
    metaTagContent(doc, "Description", "name");

  return description;
};

const getImage = (doc: cheerio.Root) => {
  const image =
    metaTagContent(doc, "og:image", "property") ||
    metaTagContent(doc, "og:image", "name");

  return image;
};

export const scrapePage = async (url: string) => {
  try {
    const html = await fetchPageHtml(url);
    const doc = cheerio.load(html);
    const title = getTitle(doc);
    const siteName = getSiteName(doc);
    const description = getDescription(doc);
    const image = getImage(doc);
    console.log({ title, siteName, description, image });
    return { title, siteName, description, image };
  } catch (error) {
    throw new Error(`Failed to extract meta data for ${url}`);
  }
};
