let IsDirty: boolean = true;
let CookieCache: string[] = [];

export async function setCookie(name: string, data: string, maxAge: number = -1, path: string = "/"): Promise<void> {
    return new Promise<void>(resolve => {
        let cStr: string = encodeURIComponent(name) + "=" + encodeURIComponent(data) + "; Path=" + path + "; SameSite=Strict; Secure";
        if(maxAge > 0)
            cStr += "; Max-age=" + maxAge;

        document.cookie = cStr;

        IsDirty = true;

        resolve();
    });
}

export async function getCookie(name: string): Promise<string | null> {
    return new Promise<string | null>(resolve => {
        const cookieName: string = encodeURIComponent(name);
        let cookie: string | null = null;

        // If there is a new cookie update the cache.
        if(IsDirty) {
            CookieCache = document.cookie.split(";");
            IsDirty = false;
        }

        // Find the cookie requested.
        CookieCache.forEach(val => {
            if(val.trimStart().startsWith(cookieName))
                cookie = decodeURIComponent(val.split("=")[1]);
        });

        resolve(cookie);
    });
}

