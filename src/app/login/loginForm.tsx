"use client";

import { useEffect } from "react";
import { authenticate } from "../actions";
import { useFormState, useFormStatus } from "react-dom";
import { AuthButton } from "../components/AuthButton";

export function LoginForm({ onLoginSuccess }) {
  const [state, action] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  useEffect(() => {
    if (state?.success && typeof onLoginSuccess === "function") {
      onLoginSuccess();
      console.log("onLoginSuccess ran");
    }
  }, [state?.success, onLoginSuccess]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          name="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-300"
        />
        {state?.errors?.password && (
          <div className="text-red-500 text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <AuthButton text="Log in" pending={pending} />
    </form>
  );
}
