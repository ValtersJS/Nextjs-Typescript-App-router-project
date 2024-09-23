import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Currency Checker</h1>
      <p className="text-lg mb-4">
        Check the latest exchange rates and balances.
      </p>
      <Link
        href="/currencies"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
      >
        View Currency Table
      </Link>
    </div>
  );
}
