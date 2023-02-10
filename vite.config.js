import path from "path";

/** @type {import("vite").UserConfig} */
const config = {
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "HTCookie",
            fileName: "ht-cookie",
        },
        sourcemap: true
    }
};

export default config;
