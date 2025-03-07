import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@com': path.resolve(__dirname, 'src/components'),
			'@constant': path.resolve(__dirname, 'src/constant'),
			'@assets': path.resolve(__dirname, 'src/assets'),
		},
	},
	plugins: [vue(), tailwindcss()],
});
