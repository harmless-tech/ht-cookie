export class Cookie {
    public static async set(name: string, data: string, maxAge: number = -1, path: string = "/", sameSite: string = "Strict", secure: boolean = true): Promise<void> {
        return new Promise<void>(resolve => {
            let cStr: string = encodeURIComponent(name) + "=" + encodeURIComponent(data) + "; Path=" + path
                + "; SameSite=" + sameSite;
            if(maxAge > 0)
                cStr += "; Max-age=" + maxAge;
            if(secure)
                cStr += "; Secure";

            document.cookie = cStr;
            resolve();
        });
    }

    public static async get(name: string): Promise<string | null> {
        return new Promise<string | null>(resolve => {
            const cName: string = encodeURIComponent(name);
            let cookie: string | null = null;

            let position: number = document.cookie.search(cName + "=");
            if(position > -1) {
                let cStr: string = document.cookie.substring(position);

                position = cStr.search(";");
                if(position > -1)
                    cStr = cStr.substring(0, position);

                cookie = decodeURIComponent(cStr.split("=")[1]);
            }

            resolve(cookie);
        });
    }

    public static async remove(name: string): Promise<void> {
        return new Promise<void>(resolve => {
            const cName: string = encodeURIComponent(name);
            document.cookie = cName + "=; SameSite=None; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            resolve();
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
