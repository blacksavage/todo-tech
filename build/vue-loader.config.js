module.exports = (isDev) => {
  return {
    // 阻止元素间生成空白内容
    preserveWhitepace: true,
    // 将vue文件内的css单独打包到一个文件
    extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
}
