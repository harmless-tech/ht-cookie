export declare interface CookieOptions {
    maxAge?: number,
    expires?: Date,
    domain?: string,
    path?: string,
    sameSite?: "strict" | "lax" | "none",
    secure?: boolean,
    partitioned?: boolean,
}

export declare class Cookie {
    public static set(name: string, data: string, options?: CookieOptions): void;
    public static get(name: string): string | null;
    public static remove(name: string): void;
    public static async aSet(name: string, data: string, options?: CookieOptions): Promise<void>;
    public static async aGet(name: string): Promise<string | null>;
    public static async aRemove(name: string): Promise<void>;
}

export declare class LocalStorage {
    public static set(name: string, data: string, maxAge?: number): void;
    public static get(name: string): string | null;
    public static remove(name: string): void;

    public static async aSet(name: string, data: string, maxAge?: number): Promise<void>;
    public static async aGet(name: string): Promise<string | null>;
    public static async aRemove(name: string): Promise<void>;
}
