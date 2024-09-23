import Link from "next/link";
import { AuthForm } from "./authForm";
import { Suspense } from "react";
import Spinner from "../utils/spinner";

export default async function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Log into your account</h1>
      </div>
      <div className="w-full max-w-md">
        <Suspense fallback={<Spinner />}>
          <AuthForm />
        </Suspense>
      </div>
      <div className="mt-4 text-center">
        <p>Dont have an account?</p>
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
