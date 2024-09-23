'use server'

import { redirect } from "next/navigation"
import { FormState, LoginSchema, OTPSchema, SignupSchema } from "./validation/schemas"
import { createSession } from "./lib/session"

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const result = SignupSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    } else {
        redirect('/login');
    }
}

// OTP and login in same server action, can pass login form email to otp for session creation
export async function authenticate(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const otp = formData.get('otp')?.toString();


    if (otp) {
        const result = OTPSchema.safeParse({ otp });

        if (!result.success) {
            return {
                errors: result.error.flatten().fieldErrors,
            }
        }

        createSession(email!); // email is validated by schema, cant be null here

        redirect('/currencies');
    } else {
        const result = LoginSchema.safeParse({ email, password });
        if (!result.success) {
            return {
                errors: result.error.flatten().fieldErrors,
            }
        }

        return {
            success: true,
            otpRequired: true,
        };
    }
}