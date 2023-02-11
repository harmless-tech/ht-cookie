export class Cookie {
    public static set(name: string, data: string, maxAge: number = -1, path: string = "/", sameSite: string = "Strict", secure: boolean = true): void {
        let cStr: string = encodeURIComponent(name) + "=" + encodeURIComponent(data) + "; Path=" + path
            + "; SameSite=" + sameSite;
        if(maxAge > 0)
            cStr += "; Max-age=" + maxAge;
        if(secure)
            cStr += "; Secure";

        document.cookie = cStr;
    }

    public static get(name: string): string | null {
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

        return cookie;
    }

    public static remove(name: string): void {
        const cName: string = encodeURIComponent(name);
        document.cookie = cName + "=; SameSite=None; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }

    public static async aSet(name: string, data: string, maxAge: number = -1, path: string = "/", sameSite: string = "Strict", secure: boolean = true): Promise<void> {
        return new Promise<void>(resolve => {
            this.set(name, data, maxAge, path, sameSite, secure);
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

export class Storage {
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
