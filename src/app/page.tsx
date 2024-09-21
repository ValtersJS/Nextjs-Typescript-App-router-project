import { useState } from "react";
import { getCurrency } from "./api/apiService";
import { Currency } from "./types";

export default async function Home() {
  const [columnCount, setColumnCount] = useState(5);

  const incrementColumn = () => {
    setColumnCount((prev) => Math.min(prev + 1, currencies.length));
  };

  const decrementColumn = () => {
    setColumnCount((prev) => Math.max(prev - 1, 1));
  };

  try {
    const currencies: Currency[] = await getCurrency();

    return (
      <main>
        <div className="mb-4">
          <button
            onClick={incrementColumn}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
          >
            Add Column
          </button>
          <button
            onClick={decrementColumn}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove Column
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currencies.slice(0, columnCount).map((currency, index) => {
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
