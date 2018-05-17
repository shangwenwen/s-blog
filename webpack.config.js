const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// postcss
const postcssConfig = require('./postcss.config.js');

/* eslint-disable */

const TARGET = process.env.npm_lifecycle_event
const dirSrc = path.join(__dirname, './src')
const dirDist = path.resolve(__dirname, 'dist')
const htmlTemplate = path.join(__dirname, './src/index.html')
const outputPath = path.resolve(__dirname, 'dist', 'assets')

/* eslint-enable */

// COMMON
const common = {
  entry: './src/index.js',
  output: {
    filename: '[name]_[hash:8].js'
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
        include: dirSrc
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
        include: dirSrc
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: dirSrc
      },
      {
        test: /\.(htm|html)$/,
        use: {
          loader: 'html-loader?minimize=true'
        },
        include: dirSrc
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: htmlTemplate,
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

// BUILD
if(TARGET === 'production') {
  module.exports = merge(common, {
    output: {
      path: outputPath,
      publicPath: '/assets/'
    },
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
          include: dirSrc
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
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 0,
            chunks: 'all'
          }
        }
      }
    },
    devtool: 'cheap-module-source-map'
  });
}

// DEV
if(TARGET === 'start') {
  module.exports = merge(common, {
    output: {
      path: dirDist
    },
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
          include: dirSrc
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin()
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      port: 8080,
      host: '127.0.0.1',
      proxy: {
        '/api': 'http://localhost:4000'
      }
    }
  });
}
