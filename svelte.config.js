import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

export default {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // hydrate the <body> element in src/app.html
    target: `body`,

    package: {
      dir: `packages`,
    },

    vite: {
      experimental: {
        prebundleSvelteLibraries: true, // https://git.io/JX9nK
      },
    },
  },
}
