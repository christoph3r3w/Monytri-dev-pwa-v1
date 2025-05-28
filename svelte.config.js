// import adapter from '@sveltejs/adapter-auto';
// adapter  for static sites or conversion to native apps
// import adapter from '@sveltejs/adapter-static';
// adapter for vercel
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: 'build',
            assets: 'build',
            fallback: null,
            precompress: false,
            strict: true
        }),
		files: {
			appTemplate: 'src/index.html', 
		  },
	}
};

export default config;
