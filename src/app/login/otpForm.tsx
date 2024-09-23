"use client";

import { authenticate } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import Spinner from "../utils/spinner";
import { useState } from "react";
import { AuthButton } from "../components/AuthButton";

export function OTPForm() {
  const [state, action] = useFormState(authenticate, undefined);

  const { pending } = useFormStatus();

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      action(formData); // "Resume" form action after timeout
    }, 4000);
  };

  return (
    <div>
      {!loading ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700"
            >
              OTP
            </label>
            <input
              name="otp"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
              placeholder="Enter your OTP"
            />
          </div>
          {state?.errors?.otp && (
            <p className="text-red-500 text-sm">{state.errors.otp}</p>
          )}
          <AuthButton text="Log in" pending={pending} />
        </form>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      )}
    </div>
  );
}
