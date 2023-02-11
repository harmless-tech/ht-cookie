export declare class Cookie {
    public static set(name: string, data: string, maxAge?: number, path?: string, sameSite?: string, secure?: boolean): void;
    public static get(name: string): string | null;
    public static remove(name: string): void;
    public static async aSet(name: string, data: string, maxAge?: number, path?: string, sameSite?: string, secure?: boolean): Promise<void>;
    public static async aGet(name: string): Promise<string | null>;
    public static async aRemove(name: string): Promise<void>;
}
export declare class Storage {
    public static set(name: string, data: string, maxAge?: number): void;
    public static get(name: string): string | null;
    public static remove(name: string): void;

    public static async aSet(name: string, data: string, maxAge?: number): Promise<void>;
    public static async aGet(name: string): Promise<string | null>;
    public static async aRemove(name: string): Promise<void>;
}
