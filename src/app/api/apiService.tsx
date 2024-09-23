const BASE_URL = "https://653fb0ea9e8bd3be29e10cd4.mockapi.io/api/v1";
import { Currency } from "../types";

// Generic fetch function with error handling
async function fetchData<T>(
  url: string
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(`${BASE_URL}${url}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      return { data: null, error: `Error ${response.status}: ${errorMessage}` }; // Return error
    }

    const data = await response.json();
    return { data, error: null }; // Return data with no error
  } catch (error) {
    console.log(error);
    return { data: null, error: "An unexpected error occurred." }; // Handle unexpected errors
  }
}

// Fetch currencies
export const getCurrencies = async (): Promise<{
  data: Currency[] | null;
  error: string | null;
}> => {
  return fetchData<Currency[]>("/currencies");
};

// Example for an endpoint that returns 404
export const getNotFound = async (): Promise<{
  data: Currency[] | null;
  error: string | null;
}> => {
  return fetchData<Currency[]>("/not-found");
};
