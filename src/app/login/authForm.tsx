"use client";

import { useState } from "react";
import { LoginForm } from "./loginForm";
import { OTPForm } from "./otpForm";

export function AuthForm() {
  const [isOTPPhase, setIsOTPPhase] = useState(false); // State to toggle forms

  return (
    <div>
      {!isOTPPhase ? (
        <LoginForm onLoginSuccess={() => setIsOTPPhase(true)} />
      ) : (
        <OTPForm />
      )}
    </div>
  );
}
