import axios from "axios";

export const fetchPageHtml = async (url: string): Promise<string> => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.log("Could not load page ", error.message);
  }

  return null;
};
