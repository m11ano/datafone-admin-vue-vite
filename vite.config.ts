import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        build: {
            target: ['es6'],
        },
        plugins: [vue(), eslint()],
        resolve: {
            alias: {
                '~includes.less': path.resolve('./src/shared/styles/includes/index.less'),
                '@side_module': path.resolve('./src/modules/side'),
                '@core_module': path.resolve('./src/modules/core'),
                '@': path.resolve('./src/'),
            },
        },
        base: '/admin/',
        define: {
            __IS_DEV__: JSON.stringify(mode === 'development'),
            __APP_URL_PREFIX__: JSON.stringify(env.__APP_URL_PREFIX__),
            __API_URL__: JSON.stringify(env.__API_URL__),
            __LIMIT_FILESIZE_MB__: JSON.stringify(Number(env.__LIMIT_FILESIZE_MB__)),
            __RECAPTCHA_V2_PUBLIC__: JSON.stringify(env.__RECAPTCHA_V2_PUBLIC__),
            __VUE_OPTIONS_API__: JSON.stringify(true),
            __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        },
        server: {
            port: 3000,
            host: true,
        },
        css: {
            preprocessorOptions: {
                less: {
                    math: 'always',
                    relativeUrls: true,
                    javascriptEnabled: true,
                },
            },
        },
    };
});
