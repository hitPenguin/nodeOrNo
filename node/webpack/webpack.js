
// webpack.config.js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }，
  module: {
    rules: [
      {
        test: /\.jsx?$/,         // 匹配原则
        exclude: /node_modules/, // 排除
        use: {                   // 加载 loader
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'] // babel-loader 的 预设插件
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]  // css-loader 读取 css 文件, style-loader 把 css 文件通过 js 文件的形式加载到 html 中 
        // app.js 文件中写入 require('./app.css')
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192        // js 文件通过 require('./big.png') 引入 image 标签, 小于 limit 则变成 base64 格式存在 js 文件里
            }
          }
        ]
      },
    ]
  }，
  plugins: [
    new UglifyJsPlugin() // 缩小 output 的 js 代码
  ]
}

// entry: 单文件 'path' | 多文件 { name:'path', ... }
// module: 在 webpack 构建之前 预加载 的 loader