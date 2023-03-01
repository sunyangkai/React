const path = require('path')
const glob = require('glob') // 文件匹配模式
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 打包后css js文件自动引入到html中
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次打包的时候，打包目录都会遗留上次打包的文件 自动清空打包目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 通过 CSS 文件的形式引入到页面上
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin') // 构建费时分析 配置好之后，运行打包命令的时候就可以看到每个loader 和插件执行耗时  注意mini-css-extract-plugin要降级为1.3.6
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin') // 压缩js
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // 清除不用的css

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 可以直观的看到打包结果中，文件的体积大小、各模块依赖关系、文件是够重复等问题，极大的方便我们在进行项目优化的时候，进行问题诊断
const speedMeasurePlugin = new SpeedMeasurePlugin({
  disable: false, // 默认值：false，表示该插件是否禁用
  outputFormat: 'human', // 默认值：human，表示为格式打印其测量值，可选human/json/humanVerbose,或者是Function
  outputTarget: console.log, // 默认值：console.log，表示输出到的文件的路径或者是调用输出
  // pluginNames:{             // 重新定义某个插件的名称
  //   myFavicons:faviconsWebpackPlugin
  // }
})

// 本地环境：

// 需要更快的构建速度
// 需要打印 debug 信息
// 需要 live reload 或 hot reload 功能
// 需要 sourcemap 方便定位问题
// ...

// 生产环境：

// 需要更小的包体积，代码压缩+tree-shaking
// 需要进行代码分割
// 需要压缩图片体积
// 路径处理方法
function resolve(dir) {
  return path.join(__dirname, dir)
}

const config = {
  entry: {
    app: path.join(__dirname, '/src/index.js'), // 入口文件
    page2: path.join(__dirname, '/page-2/index.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'), //打包后的文件存放的地方
    filename: '[name].[hash:8].js', //打包后输出文件的文件名
    publicPath: '',
  },
  mode: 'development',
  // ^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$
  // 1.本地开发首次打包慢点没关系，因为 eval 缓存的原因， rebuild 会很快
  // 2.开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 cheap
  // 3.我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 module
  // 生产环境推荐 none 不要让别人看见代码
  devtool: 'source-map', // 'eval-cheap-module-source-map',
  resolve: {
    // 优化
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // 引入模块时不带扩展名
    alias: {
      // 路径别名
      src: resolve('src'),
      public: resolve('src/public'),
      home: resolve('src/home'),
      page2: resolve('page-2'),

    },
    modules: [resolve('src'), 'node_modules'], // webpack 优先 src 目录下查找需要解析的文件，会大大节省查找时间
  },
  externals: {
    // value值应该是第三方依赖编译打包后生成的js文件，然后js文件执行后赋值给window的全局变量名称。
    // 怎么找全局变量 ？ js文件就是要用CDN引入的js文件。那么可以通过浏览器打开CDN链接。由于代码是压缩过，找个在线js格式化把代码处理一下，就可以阅读代码了
    jquery: '$',
  },
  resolveLoader: {
    // 先去 node_modules 项目下寻找 loader，如果找不到，会再去 ./webpack/loaders 目录下寻找。
    modules: ['node_modules', './webpack/loaders'],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    // usedExports: true, // 启动标记功能 Tree Shaking
    minimizer: [
      // 添加 css 压缩配置
      new CssMinimizerPlugin(),
      // 添加 js 压缩配置
      new TerserPlugin({}),
    ],
    splitChunks: {
      minSize: 30, // byte //提取出的chunk的最小大小
      cacheGroups: {
        default: {
          filename: 'common_[id]_[name].js',
          chunks: 'initial', // all 代表所有模块，async代表只管异步加载的, initial代表初始化时就能获取的模块
          minChunks: 2, //模块被引用2次以上的才抽离
          // 1. minChunks设置为n
          // 2. 假设有m个入口点，这m个入口点都直接引入了某个模块module（通过import或require直接或间接地引入了模块），也就是共享次数为m
          // 3. 当m至少等于n时，module才会被单独拆分成一个bundle
          priority: -20,
        },
        vendors: {
          //拆分第三方库（通过npm|yarn安装的库）
          test: /[\\/]node_modules[\\/]/,
          filename: '[id]_[hash:6]_vendor.js',
          chunks: 'initial',
          priority: -10,
        },
        locallib: {
          //拆分指定文件
          test: /(src\/common\/mine\.tsx)$/,
          filename: 'local_mine_[id].js',
          chunks: 'initial',
          priority: -9,
        },
      },
    },
  },
  module: {
    // 不需要解析依赖的第三方大型类库等 忽略的模块文件中不会解析 import、require 等语法
    noParse: /jquery/,
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'thread-loader', // 开启多进程打包
            options: {
              worker: 3,
            },
          },
          {
            // babel-loader 使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
            // @babel/core Babel 编译的核心包
            // @babel/preset-env Babel 编译的预设，可以理解为 Babel 插件的超集
            // 常见 Babel 预设还有：
            // @babel/preset-flow
            // @babel/preset-react
            // @babel/preset-typescript
            loader: 'babel-loader', // npm install babel-loader @babel/core @babel/preset-env -D
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true, // 启用缓存
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'thread-loader', // 开启多进程打包
            // 在工作池中运行的loader是有限制的：
            // Loaders 不能产生新的文件
            // Loaders 不能使用自定义的loader API（也就是说，通过插件）
            // Loaders 无法获取 webpack 的选项设置。
            options: {
              worker: 3,
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true, // 启用缓存
            },
          },
          {
            loader: 'cache-loader', //  // 获取前面 loader 转换的结果
          },
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true, // 必须开启 否则 tread-loader会报错
            },
          },
          {
            loader: 'my-loader',
            options: {
              flag: true,
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        exclude: /(node_modules)/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'cache-loader', //  // 获取前面 loader 转换的结果
          },
          // {
          //   loader: 'style-loader', // style-loader 就是将处理好的 css 通过 style 标签的形式添加到页面上
          // },
          {
            // 打包css
            loader: 'css-loader',
          },
          {
            // 打包less
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader', // 安装 npm install postcss postcss-loader postcss-preset-env -D
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
            // webpack 最终会将各个模块打包成一个文件，因此我们样式中的 url 路径是相对入口 html 页面的，而不是相对于原始 css 文件所在的路径。这就会导致图片引入失败。
            // 图片较多，会发很多 http 请求，会降低页面性能
            // file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。
            // url-loader 会将引入的图片编码，生成 dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了
            // 如果图片较大，编码会消耗性能。因此 url-loader 提供了一个 limit 参数，小于 limit 字节的文件会被转为 DataURl，大于 limit 的还会使用 file-loader 进行 copy。
            loader: 'url-loader', // url-loader 封装了 file-loader
            options: {
              // 小于8K的图片自动转成base64，并且不会存在实体图片
              limit: 8192,
              name: '[name][hash:8].[ext]',
              // 图片打包后存放的目录
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html', // html模版路径
      inject: 'body', // head | body 插入到html文档中的位置
      hash: true, // 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。这对于更新每次的缓存文件名称非常有用
      minify:  process.env.NODE_ENV === "development" ? false : {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, //去除属性引用
      }, // 设置静态资源的压缩情况
      chunks: ['app'],
      // favicon: string, 网页图标路径
      // mete: Object , 为生成的 html 文件注入一些 mete 信息， 例如： {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './page-2/index.html', // html模版路径
      inject: 'body', // head | body 插入到html文档中的位置
      hash: true, // 如果为真，则向所有包含的 js 和 CSS 文件附加一个惟一的 webpack 编译散列。这对于更新每次的缓存文件名称非常有用
      minify:  process.env.NODE_ENV === "development" ? false : {
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true, //去除属性引用
      },
      filename: 'page2.html',
      chunks: ['page2'],
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    new CleanWebpackPlugin(),
    // hash ：任何一个文件改动，整个项目的构建 hash 值都会改变；
    // chunkhash：文件的改动只会影响其所在 chunk 的 hash 值；
    // contenthash：每个文件都有单独的 hash 值，文件的改动只会影响自身的 hash 值；
    new MiniCssExtractPlugin({
      // 添加插件
      filename: '[name].[hash:8].css',
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve('src').src}/**/*`, { nodir: true }),
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',  // 不启动展示打包报告的http服务器
      // generateStatsFile: true, // 是否生成stats.json文件
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './src'), // ebpack 在进行打包的时候，对静态文件的处理，例如图片，都是直接 copy 到 dist 目录下面。但是对于本地开发来说，这个过程太费时，也没有必要，所以在设置 contentBase 之后，就直接到对应的静态目录下面去读取文件，而不需对文件做任何移动，节省了时间和性能开销
    },
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /^\/main\//, to: './src/index.html' },
    //     { from: /^\/page2\//, to: './page-2/index.html' },

    //   ],
    // },
    client: {
      logging: 'info',
      progress: true,
      reconnect: 5, // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。当设置为 false 时，它将不会尝试连接。
    },
  },
}

module.exports = (env, argv) => {
  console.log('argv.mode=', argv.mode) // 打印 mode(模式) 值
  // 这里可以通过不同的模式修改 config 配置
  return config;
  // speedMeasurePlugin.wrap(config)
}


// 如果你需要进行代码分割，或者你有很多的静态资源，再或者你做的东西深度依赖 CommonJS，毫无疑问 Webpack 是你的最佳选择。
// 如果你的代码基于 ES2015 模块编写，并且你做的东西是准备给他人使用的，你或许可以考虑使用 Rollup