const autoprefixer = require('autoprefixer')

// 优化css代码
module.exports = {
    plugins: [
        // 自动添加浏览器前缀
        autoprefixer()
    ]
}