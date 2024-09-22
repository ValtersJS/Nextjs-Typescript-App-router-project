import { Suspense } from "react";
import { getCurrency } from "../api/apiService";
import { Currency } from "../types";
import CurrencyTable from "../components/CurrencyTable";
import ErrorMessage from "../components/ErrorMessage";
import TableControls from "../components/TableControls";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const columns =
    typeof searchParams.columns === "string"
      ? parseInt(searchParams.columns, 10)
      : 5; // default is 5

  try {
    const currencies: Currency[] = await getCurrency();

    if (currencies.length === 0) {
      return <ErrorMessage message="No currency data available." />;
    }

    return (
      <main>
        <Suspense fallback={<div>Loading table controls...</div>}>
          <TableControls
            totalColumns={currencies.length}
            initialColumns={columns}
          />
        </Suspense>
        <Suspense fallback={<div>Loading currency table...</div>}>
          <CurrencyTable currencies={currencies} columns={columns} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch currencies:", error);

    if (error instanceof Error) {
      if (error.message.includes("404")) {
        return <ErrorMessage message="The currency API route was not found." />;
      } else if (error.message.includes("Failed to fetch")) {
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
