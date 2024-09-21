import { getCurrency, getNotFound } from "../api/apiService";
import { Currency } from "../types";

export default async function Home() {
  try {
    const currencies: Currency[] = await getCurrencyy();

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
    return <div>Error loading currencies</div>;
  }
}
