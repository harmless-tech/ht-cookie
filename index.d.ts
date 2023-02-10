export declare class Cookie {
    private static IsDirty;
    private static Cache;
    static setCookie(name: string, data: string, maxAge?: number, path?: string): Promise<void>;
    static getCookie(name: string): Promise<string | null>;
}
