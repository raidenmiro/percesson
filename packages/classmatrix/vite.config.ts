import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths'

const config = defineConfig({
  plugins: [tsconfigPaths(), solidPlugin()],
  resolve: {
    conditions: ['browser'],
  },
})

// eslint-disable-next-line import/no-default-export
export default config
