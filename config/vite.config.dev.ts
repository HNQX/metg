import { mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConig from './vite.config.base'

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      host: '0.0.0.0',
      fs: {
        strict: true,
      },
      proxy: {
        '/mapServer': {
          target: 'https://52152121.xyz:8082',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/mapServer/, ''),
        },
        '/api_url': {
          target: 'https://url3.fun',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api_url/, ''),
        },
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConig
)
