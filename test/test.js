import { Cookie, LocalStorage } from "../src/index.js";

Cookie.set("hello", "world");
console.log("Add cookie...");
setTimeout(() => {
    Cookie.remove("hello");
    console.log("Remove cookie...");
}, 5000);

LocalStorage.set("hello", "world");
console.log("Add storage...");
setTimeout(() => {
    LocalStorage.remove("hello");
    console.log("Remove storage...");
}, 5000);
