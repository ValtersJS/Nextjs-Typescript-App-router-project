import { z } from 'zod';

export const SignupSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' })
        .regex(/^(?!.*incorrect@email\.com$)/, { message: 'Incorrect email' }),
    password: z.string().min(1, { message: 'Password field must not be empty.' })
        .regex(/^(?!.*incorrect-password$)/, { message: 'Incorrect password.' }),
});

export const OTPSchema = z.object({
    otp: z.string().regex(/\b\d{5}\b/g, { message: 'OTP code must be 5 digits long' }),
})

export type FormState =
    | {
        errors?: {
            email?: string[];
            password?: string[];
            otp?: string[];
        };
        success?: boolean;      // Indicates successful login
        otpRequired?: boolean;
        loading?: boolean;
        message?: string;
    }
    |
    undefined;

export type SessionPayload = {
    userId: string | number;
    expiresAt: Date;
};