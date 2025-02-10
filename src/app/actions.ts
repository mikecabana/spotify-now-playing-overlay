'use server';

import { cookies as nextCookies } from 'next/headers';

export async function setCookieConsent(consent: 'granted' | 'denied') {
    const cookies = await nextCookies();
    cookies.set({
        name: 'cookie_consent',
        value: consent,
        expires: Date.now() + 1000 * 60 * 60 * 24 * Math.floor(365.25 / 12), // approx every 1 month
        maxAge: Date.now() + 1000 * 60 * 60 * 24 * Math.floor(365.25 / 12),
    });
}

export async function getCookieConsent() {
    const cookies = await nextCookies();
    const consentCookie = cookies.get('cookie_consent');
    return consentCookie?.value as 'granted' | 'denied' | undefined;
}
