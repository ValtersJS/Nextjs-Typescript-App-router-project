import React from "react";
import { Currency } from "../types";
import { getCurrencyAbbreviation } from "../utils/currencyAbbreviations";
import { HeaderLogic } from "./CurrencyTable/header";
import { Tbody } from "./CurrencyTable/tbody";

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

  // prepare rows of three
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
            <HeaderLogic labels={headerLabels} />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <Tbody
            getCurrencyAbbreviation={getCurrencyAbbreviation}
            rows={rows}
          />
        </tbody>
      </table>
    </div>
  );
}
