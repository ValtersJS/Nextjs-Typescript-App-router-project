import { Currency } from "@/app/types";
import React from "react";

interface tbodyProps {
  getCurrencyAbbreviation: (id: string) => string;
  rows: Currency[]; // Array of Currency objects
}

export function Tbody({ getCurrencyAbbreviation, rows }: tbodyProps) {
  return (
    <>
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
    </>
  );
}
