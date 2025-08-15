import {  defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({mode}) => {
  //Загрузка переменных окружения
  const env = loadEnv(mode, process.cwd());
  const isLocalDev = (env.VITE_IS_LOCAL === 'true');

  return{
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@app': path.resolve(__dirname, './src/app'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@widgets': path.resolve(__dirname, './src/widgets'),
        '@features': path.resolve(__dirname, './src/features'),
        '@entities': path.resolve(__dirname, './src/entities'),
        '@shared': path.resolve(__dirname, './src/shared'),
      },
    },
    define: {
      'process.env': env
    },
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: !isLocalDev ? 'esbuild' : false,
      cssCodeSplit: false,
    }
  };
});