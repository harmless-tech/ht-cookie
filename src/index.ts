export interface CookieOptions {
    maxAge?: number,
    expires?: Date,
    domain?: string,
    path?: string,
    sameSite?: "strict" | "lax" | "none",
    secure?: boolean,
    partitioned?: boolean,
}

export class Cookie {
    public static set(name: string, data: string, options: CookieOptions = {}): void {
        let cStr: string = encodeURIComponent(name) + "=" + encodeURIComponent(data);

        if(options.maxAge)
            cStr += ";max-age=" + options.maxAge;
        if(options.expires)
            cStr += ";expires=" + options.expires.toUTCString();
        if(options.domain)
            cStr += ";domain=" + options.domain;
        if(options.path)
            cStr += ";path=" + options.path;
        if(options.secure === undefined || options.secure)
            cStr += ";secure";
        if(options.partitioned)
            cStr += ";partitioned";

        cStr += ";samesite=";
        if(options.sameSite)
            cStr += options.sameSite;
        else
            cStr += "lax";

        document.cookie = cStr;
    }

    public static get(name: string): string | null {
        const cName: string = encodeURIComponent(name);
        const store = document.cookie;
        let cookie: string | null = null;

        let position: number = store.search(cName + "=");
        if(position > -1) {
            let cStr: string = store.substring(position);

            position = cStr.search(";");
            if(position > -1)
                cStr = cStr.substring(0, position);

            cookie = decodeURIComponent(cStr.split("=")[1]);
        }

        return cookie;
    }

    public static remove(name: string): void {
        const cName: string = encodeURIComponent(name);
        document.cookie = cName + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }

    public static async aSet(name: string, data: string, options: CookieOptions = {}): Promise<void> {
        return new Promise<void>(resolve => {
            this.set(name, data, options);
            resolve();
        });
    }

    public static async aGet(name: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            resolve(this.get(name));
        });
    }

    public static async aRemove(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.remove(name);
            resolve();
        });
    }
}

export class LocalStorage {
    public static set(name: string, data: string, maxAge: number = -1): void {
        let cStr: string = encodeURIComponent(data);
        if(maxAge > 0) {
            const date: Date = new Date();
            date.setHours(date.getHours() + maxAge);
            cStr += ";" + date;
        }

        localStorage.setItem(encodeURIComponent(name), encodeURIComponent(cStr));
    }

    public static get(name: string): string | null {
        const data: string | null = localStorage.getItem(encodeURIComponent(name));
        if(data != null) {
            const values: Array<string> = decodeURIComponent(data).split(";");
            if(values.length > 1 && new Date(values[1]) <= new Date()) {
                localStorage.removeItem(encodeURIComponent(name));
                return null;
            }

            return decodeURIComponent(values[0]);
        }

        return null;
    }

    public static remove(name: string): void {
        localStorage.removeItem(encodeURIComponent(name));
    }

    public static async aSet(name: string, data: string, maxAge: number = -1): Promise<void> {
        return new Promise<void>(resolve => {
            this.set(name, data, maxAge);
            resolve();
        });
    }

    public static async aGet(name: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            resolve(this.get(name));
        });
    }

    public static async aRemove(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            this.remove(name);
            resolve();
        });
    }
}
