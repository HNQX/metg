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
        '/url': {
          target: 'http://192.168.31.12:802',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/url/, ''),
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
