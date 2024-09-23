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

export async function login(state: FormState, formData: FormData): Promise<FormState> {

    const result = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

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

export async function OTP(state: FormState, formData: FormData): Promise<FormState> {

    const result = OTPSchema.safeParse({
        otp: formData.get('otp'),
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const id = formData.get('email')?.toString();
    await createSession(id);

    redirect('/currencies');
}

export async function authenticate(state: FormState, formData: FormData): Promise<FormState> {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const otp = formData.get('otp')?.toString();
    // const delay = (millis) => new Promise(resolve => setTimeout(resolve, millis));

    if (otp) {
        const result = OTPSchema.safeParse({ otp });

        if (!result.success) {
            return {
                errors: result.error.flatten().fieldErrors,
            }
        }

        createSession(email!);
        // await delay(5000);

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