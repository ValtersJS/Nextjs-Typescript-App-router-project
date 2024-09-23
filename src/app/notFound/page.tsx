import { getNotFound } from "../api/apiService";
import ErrorMessage from "../components/ErrorMessage";
import { getSession } from "../lib/session";
import { Currency } from "../types";

export default async function Home() {
  await getSession();

  try {
    const { currencies, error } = await getNotFound();

    return (
      <main>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency, index) => {
              return (
                <tr key={index}>
                  <td>{currency.currencyId}</td>
                  <td>{currency.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch currencies:", error);

    if (error instanceof Response) {
      if (error.status === 404) {
        console.log("404");
        return <ErrorMessage message="The currency API route was not found." />;
      } else if (error.status === 500) {
        return (
          <ErrorMessage message="There was a server error. Please try again later." />
        );
      }
    } else if (error instanceof Error) {
      if (error.message.includes("Failed to fetch")) {
        return (
          <ErrorMessage message="Unable to connect to the currency API." />
        );
      }
    }

    return (
      <ErrorMessage message="An unexpected error occurred while fetching currency data." />
    );
  }
}
