import React from "react";
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
  // selected column count
  const displayedCurrencies = currencies.slice(0, columns);

  const rows = [];
  for (let i = 0; i < displayedCurrencies.length; i += 3) {
    rows.push(displayedCurrencies.slice(i, i + 3));
  }

  const headerLabels = ["Name", "Balance"];

  return (
    <div className="p-4 bg-gray-50 shadow-md rounded-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {/* repeat labels three times */}
            {Array(3)
              .fill(headerLabels)
              .flat()
              .map((label, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {row.map((currency, index) => (
                <React.Fragment key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {getCurrencyAbbreviation(currency.currencyId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {currency.amount}
                  </td>
                </React.Fragment>
              ))}

              {/* Fill in empty cells */}
              {row.length < 3 &&
                Array(3 - row.length)
                  .fill(null)
                  .map((_, emptyIndex) => (
                    <React.Fragment key={emptyIndex}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                    </React.Fragment>
                  ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
