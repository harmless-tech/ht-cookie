import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
    // Dev
    if(mode === "development") {
        return {
            root: "./test",
            build: {
                lib: {
                    entry: path.resolve(__dirname, "src/index.ts"),
                    name: "HTCookie",
                    fileName: "ht-cookie",
                },
                sourcemap: true
            }
        };
    }

    // Prod
    return {
        build: {
            lib: {
                entry: path.resolve(__dirname, "src/index.ts"),
                name: "HTCookie",
                fileName: "ht-cookie",
            },
            sourcemap: true
        }
    };
});
