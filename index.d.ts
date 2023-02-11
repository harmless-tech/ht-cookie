export declare class Cookie {
    public static async set(name: string, data: string, maxAge?: number, path?: string, sameSite?: string, secure?: boolean): Promise<void>;
    public static async get(name: string): Promise<string | null>;
    public static async remove(name: string): Promise<void>;
}
export declare class Storage {
    public static async set(name: string, data: string, maxAge?: number): Promise<void>;
    public static async get(name: string): Promise<string | null>;
    public static async remove(name: string): Promise<void>;
}
