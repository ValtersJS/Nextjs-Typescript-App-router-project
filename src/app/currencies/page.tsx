import { Suspense } from "react";
import { getCurrencies } from "../api/apiService";
import { getSession } from "../lib/session";

import Spinner from "../utils/spinner";
import CurrencyFetcher from "../components/CurrencyFetcher";

export default async function Currencies({
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
      <Suspense
        fallback={
          <div>
            Loading... <Spinner />
          </div>
        }
      >
        <CurrencyFetcher fetchCurrencies={getCurrencies} columns={columns} />
      </Suspense>
    </main>
  );
}
