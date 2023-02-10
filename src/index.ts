export class Cookie {
    private static IsDirty: boolean = true;
    private static Cache: string[] = [];

    public static async setCookie(name: string, data: string, maxAge: number = -1, path: string = "/"): Promise<void> {
        return new Promise<void>(resolve => {
            let cStr: string = encodeURIComponent(name) + "=" + encodeURIComponent(data) + "; Path=" + path + "; SameSite=Strict; Secure";
            if(maxAge > 0)
                cStr += "; Max-age=" + maxAge;

            document.cookie = cStr;
            this.IsDirty = true;

            resolve();
        });
    }

    public static async getCookie(name: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            const cName: string = encodeURIComponent(name);
            let cookie: string | null = null;

            // If there is a new cookie update the cache.
            if(this.IsDirty) {
                this.Cache = document.cookie.split(";");
                this.IsDirty = false;
            }

            // Find the cookie requested.
            this.Cache.forEach(val => {
                if(val.trimStart().startsWith(cName))
                    cookie = decodeURIComponent(val.split("=")[1]);
            });

            resolve(cookie);
        });
    }
}

export class Storage {
    public static async set(name: string, data: string, maxAge: number = -1): Promise<void> {
        return new Promise<void>(resolve => {
            let cStr: string = encodeURIComponent(data);
            if(maxAge > 0) {
                const date: Date = new Date();
                date.setHours(date.getHours() + maxAge);
                cStr += ";" + date;
            }

            localStorage.setItem(encodeURIComponent(name), encodeURIComponent(cStr));
            resolve();
        });
    }

    public static async get(name: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            const data: string | null = localStorage.getItem(encodeURIComponent(name));
            if(data != null) {
                const values: Array<string> = decodeURIComponent(data).split(";");
                if(values.length > 1 && new Date(values[1]) <= new Date()) {
                    localStorage.removeItem(encodeURIComponent(name));
                    resolve(null);
                }

                resolve(decodeURIComponent(values[0]));
            }

            resolve(null);
        });
    }

    public static async remove(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            localStorage.removeItem(encodeURIComponent(name));
            resolve();
        });
    }
}
