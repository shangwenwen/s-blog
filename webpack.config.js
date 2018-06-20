const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// postcss
const postcssConfig = require('./postcss.config.js');

/* eslint-disable */

// CONFIG
const TARGET = process.env.npm_lifecycle_event
const SRCPATH = path.join(__dirname, './src')
const TEMPLATEPATH = path.join(__dirname, './src/index.html')
const OUTPUTPATH = path.resolve(__dirname, 'dist', 'assets')
const PUBLICPATH = '/assets/'

/* eslint-enable */

// COMMON
const common = {
  entry: './src/index.js',
  output: {
    filename: '[name]_[hash:8].js',
    path: OUTPUTPATH,
    publicPath: PUBLICPATH
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              outputPath: './img',
              name: '[name]_[hash:8].[ext]'
            }
          }
        ],
        include: SRCPATH
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
        include: SRCPATH
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: SRCPATH
      },
      {
        test: /\.(htm|html)$/,
        use: {
          loader: 'html-loader?minimize=true'
        },
        include: SRCPATH
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATEPATH,
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

// BUILD
if (TARGET === 'production') {
  module.exports = merge(common, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: postcssConfig(TARGET)
                }
              }
            ]
          }),
          include: SRCPATH
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name]_[chunkhash:8].css'
      })
    ],
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        chunks: 'initial', // 只对入口文件处理
        cacheGroups: {
          commons: {
            name: 'commons',
            priority: 0,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            priority: 0
          }
        }
      }
    },
    devtool: 'cheap-module-source-map'
  });
}

// DEV
if (TARGET === 'start') {
  module.exports = merge(common, {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: postcssConfig(TARGET)
              }
            }
          ],
          include: SRCPATH
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      // 刷新页面无 404
      historyApiFallback: {
        index: `${PUBLICPATH}index.html`
      },
      port: 8080,
      host: 'localhost',
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          secure: false,
          changeOrigin: true
        }
      }
    }
  });
}
