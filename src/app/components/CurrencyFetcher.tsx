import { Suspense } from "react";
import CurrencyTable from "./CurrencyTable";
import ErrorMessage from "./ErrorMessage";
import TableControls from "./TableControls";
import { Currency } from "../types";
import { LogOut } from "./LogOut";

interface CurrencyFetcherProps {
  fetchCurrencies: () => Promise<{
    data: Currency[] | null;
    error: string | null;
  }>;
  columns: number;
}

const CurrencyFetcher: React.FC<CurrencyFetcherProps> = async ({
  fetchCurrencies,
  columns,
}) => {
  const { data: currencies, error } = await fetchCurrencies();

  if (error) {
    console.error("Failed to fetch currencies:", error);
    return <ErrorMessage message={error} />;
  }

  if (currencies!.length === 0) {
    return <ErrorMessage message="No currency data available." />;
  }

  return (
    <>
      <Suspense fallback={<div>Loading table controls...</div>}>
        <LogOut />
        <TableControls
          totalColumns={currencies!.length}
          initialColumns={columns}
        />
      </Suspense>
      <Suspense fallback={<div>Loading currency table...</div>}>
        <CurrencyTable currencies={currencies!} columns={columns} />
      </Suspense>
    </>
  );
};

export default CurrencyFetcher;
