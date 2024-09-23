import { Suspense } from "react";
import { getNotFound } from "../api/apiService";
import { getSession } from "../lib/session";
import CurrencyFetcher from "../components/CurrencyFetcher";

export default async function NotFound({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  await getSession();

  const columns =
    typeof searchParams.columns === "string"
      ? parseInt(searchParams.columns, 10)
      : 5; // default is 5

  return (
    <main>
      {/* Pass getCurrencies or getNotFound fetch functions */}
      <Suspense fallback={<div>Loading...</div>}>
        <CurrencyFetcher fetchCurrencies={getNotFound} columns={columns} />
      </Suspense>
    </main>
  );
}
