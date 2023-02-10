export declare class Cookie {
    private static IsDirty;
    private static Cache;
    static setCookie(name: string, data: string, maxAge?: number, path?: string): Promise<void>;
    static getCookie(name: string): Promise<string | null>;
}
export declare class Storage {
    static set(name: string, data: string, maxAge?: number): Promise<void>;
    static get(name: string): Promise<string | null>;
    static remove(name: string): Promise<void>;
}
