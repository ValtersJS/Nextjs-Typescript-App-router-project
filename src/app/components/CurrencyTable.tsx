import { Currency } from "../types";
import { getCurrencyAbbreviation } from "../utils/currencyAbbreviations";

interface CurrencyTableProps {
  currencies: Currency[];
  columns: number;
}

export default function CurrencyTable({
  currencies,
  columns,
}: CurrencyTableProps) {
  const displayedCurrencies = currencies.slice(0, columns);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Balance</th>
        </tr>
      </thead>
      <tbody>
        {displayedCurrencies.map((currency, index) => (
          <tr key={index}>
            <td>{getCurrencyAbbreviation(currency.currencyId)}</td>
            <td>{currency.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
