/// <reference types='vitest' />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import path from "path";
import * as sass from "sass";

export default defineConfig({
    root: __dirname,
    cacheDir: "./node_modules/.vite/sentiment-analysis",
    server: {
        port: 4200,
        host: "localhost",
    },
    preview: {
        port: 4300,
        host: "localhost",
    },
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(["*.md"])],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: "./dist/sentiment-analysis",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    test: {
        watch: false,
        globals: true,
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        reporters: ["default"],
        coverage: {
            reportsDirectory: "./coverage/sentiment-analysis",
            provider: "v8",
        },
    },
    resolve: {
        alias: {
            "@const": path.resolve(__dirname, "src/app/const"),
            "@hooks": path.resolve(__dirname, "src/app/hooks"),
            "@services": path.resolve(__dirname, "src/app/services"),
            "@types": path.resolve(__dirname, "src/app/types"),
            "@ui": path.resolve(__dirname, "src/app/ui"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@assets": path.resolve(__dirname, "src/assets"),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "@styles/__settings/_init" as *;',
                includePaths: [path.resolve(__dirname, "src/styles")],
                implementation: sass,
                api: "modern-compiler",
                silenceDeprecations: ["legacy-js-api"],
            },
        },
    },
});
