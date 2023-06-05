import { Cookie, LocalStorage } from "../src/index.ts";

Cookie.set("hello", "world");
setTimeout(() => {
    Cookie.remove("hello");
}, 5000);

LocalStorage.set("hello", "world");
setTimeout(() => {
    LocalStorage.remove("hello");
}, 5000);
