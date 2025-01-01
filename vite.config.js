import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: 'build' // Make sure this is 'dist' or 'build' if you are not sure
	  },
});
