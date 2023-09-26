import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mdx from '@mdx-js/rollup';
var ASSET_URL = process.env.ASSET_URL || '';
// https://vitejs.dev/config/
export default defineConfig({
    base: ASSET_URL,
    plugins: [mdx(), react()],
});
