# HT Cookie
[![Build](https://github.com/harmless-tech/ht-cookie/actions/workflows/build.yml/badge.svg)](https://github.com/harmless-tech/ht-cookie/actions/workflows/build.yml)
[![Publish](https://github.com/harmless-tech/ht-cookie/actions/workflows/publish.yml/badge.svg)](https://github.com/harmless-tech/ht-cookie/actions/workflows/publish.yml)

A very simple cookie and local storage library with no dependencies.

[JSR](https://jsr.io/@harmless/ht-cookie)

[NPM](https://www.npmjs.com/package/ht-cookie)

## Add to project

Using pnpm:

```pnpm add jsr:@harmless/ht-cookie```

```pnpm add ht-cookie```

Using deno:

```deno add jsr:@harmless/ht-cookie```

```deno add ht-cookie```

Using npm:

```npx jsr add @harmless/ht-cookie```

```npm add ht-cookie```

Using yarn:

```yarn add jsr:@harmless/ht-cookie```

```yarn add ht-cookie```

## How to use

#### Cookies
```typescript
import { Cookie } from "ht-cookie";

function syncExample() {
    Cookie.set(name: string, data: string, options?: CookieOptions): void;
    Cookie.get(name: string): string | null;
    Cookie.remove(name: string): void;
}

async function asyncExample() {
    await Cookie.aSet(name: string, data: string, options?: CookieOptions) : Promise<void>;
    await Cookie.aGet(name: string): Promise<string | null>;
    await Cookie.aRemove(name: string): Promise<void>;
}
```
```typescript
interface CookieOptions {
    maxAge?: number,
    expires?: Date,
    domain?: string,
    path?: string,
    sameSite?: "strict" | "lax" | "none",
    secure?: boolean,
    partitioned?: boolean,
}
```

#### Local Storage
```typescript
import { LocalStorage } from "ht-cookie";

function syncExample() {
    LocalStorage.set(name: string, data: string, maxAge?: number): void;
    LocalStorage.get(name: string): string | null;
    LocalStorage.remove(name: string): void;
}

async function asyncExample() {
    await LocalStorage.aSet(name: string, data: string, maxAge?: number) : Promise<void>;
    await LocalStorage.aGet(name: string): Promise<string | null>;
    await LocalStorage.aRemove(name: string): Promise<void>;
}
```
