import Link from "next/link";
import { SignupForm } from "./form";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create an Account</h1>
        <p className="text-gray-600">Enter your email and password</p>
      </div>
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
      <div className="mt-4 text-center">
        <p>Already have an account?</p>
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
