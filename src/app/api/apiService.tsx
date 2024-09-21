const BASE_URL = "https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1";
import { Currency } from "../types";

export const getCurrency = async (): Promise<Currency[]> => {
  try {
    const res = await fetch(`${BASE_URL}/currencies`);
    const data: Currency[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getNotFound = async (): Promise<Currency[]> => {
  try {
    const res = await fetch(`${BASE_URL}/not-found`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
