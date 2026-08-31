/** Creates a cookie with the given value and expiration time */
export const setCookie = (
    name: string,
    value: string,
    maxAge: number,
): void => {
    document.cookie = [
        `${name}=${encodeURIComponent(value)}`,
        `Max-Age=${maxAge}`,
        'Path=/',
        'SameSite=Lax',
    ].join('; ');
};

/** Returns the stored value of a cookie by its name */
export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((cookieValue) =>
        cookieValue.startsWith(`${name}=`),
    );

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(cookie.substring(name.length + 1));
};

/** Removes a cookie by setting its maximum age to zero */
export const deleteCookie = (name: string): void => {
    document.cookie = [`${name}=`, 'Max-Age=0', 'Path=/', 'SameSite=Lax'].join(
        '; ',
    );
};
