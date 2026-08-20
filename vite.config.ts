import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/',
    resolve: {
        tsconfigPaths: true // 내장 tsconfig paths 옵션 활성화
    },
    server: {
        proxy: {
            // '/OpenAPI3'로 시작하는 요청을 SGIS 서버로 우회 전달
            '/OpenAPI3': {
                target: 'https://sgisapi.mods.go.kr',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});