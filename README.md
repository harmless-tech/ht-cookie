# HT Cookie
A very simple cookie and local storage library with no deps.

Less than 1kb when gzipped.

## Add to project
Using npm:
```npm add ht-cookie```

Using yarn:
```yarn add ht-cookie```

## How to use

#### Cookies
```typescript
import { Cookie } from "ht-cookie";

function s() {
    Cookie.set(name: string, data: string, maxAge?: number, path?: string, sameSite?: string, secure?: boolean): void;
    Cookie.get(name: string): string | null;
    Cookie.remove(name: string): void;
}

async function a() {
    await Cookie.aSet(name: string, data: string, maxAge?: number, path?: string, sameSite?: string, secure?: boolean) : Promise<void>;
    await Cookie.aGet(name: string): Promise<string | null>;
    await Cookie.aRemove(name: string): Promise<void>;
}
```

#### Local Storage
```typescript
import { Storage } from "ht-cookie";

function s() {
    Storage.set(name: string, data: string, maxAge?: number): void;
    Storage.get(name: string): string | null;
    Storage.remove(name: string): void;
}

async function a() {
    await Storage.aSet(name: string, data: string, maxAge?: number) : Promise<void>;
    await Storage.aGet(name: string): Promise<string | null>;
    await Storage.aRemove(name: string): Promise<void>;
}
```
