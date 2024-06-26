import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
// vant ui / element按需引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    devServer: {
        proxy: {
            '/api': {
                target: 'http://121.229.202.55:5080', // 目标服务器地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 将 /api 路径前缀替换为空
                }
            }
        }
    },
  plugins: [
      vue(),
      AutoImport({
        resolvers: [
            VantResolver(),
            ElementPlusResolver(),
        ],
      }),
      Components({
        resolvers: [
            VantResolver(),
            ElementPlusResolver(),],
      })
  ],
  resolve: {
    alias: {
      // @ 替代为 src
      '@': resolve(__dirname, 'src')
    },
  }
})
