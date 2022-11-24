import { parseCookies, setCookie, destroyCookie } from 'nookies'


export function offerPercent(mrp, offer) {
    let off = Math.round(((mrp - offer) / mrp) * 100)
    return off;
}

export function authCookie(val) {
    if (val) {
        setCookie(null, "auth", true, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
        });
    }
    else {
        destroyCookie(null, 'auth')
    }
}