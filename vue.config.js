const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'VUEstagram',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, 'index.html'], // 캐싱 목록에서 제외
    }
  },
})
