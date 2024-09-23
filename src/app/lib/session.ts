import 'server-only'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = JSON.stringify({ userId, expiresAt });

    cookies().set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export function getSession() {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const session = JSON.parse(sessionCookie.value);
        if (new Date(session.expiresAt) < new Date()) { // check if cookie has expired again
            clearSession();
        }
        return session;
    } catch (error) {
        console.error('Error parsing session:', error);
        return null;
    }
}

export async function clearSession() {
    cookies().delete('session');
    redirect('/login');
}
