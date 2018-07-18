const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');
  
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/
        },
        {
          test:/\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }  
  };
};


//const path = require('path');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//
//module.exports = (env) => {
//  const isProduction = env === 'production';
//  
//  return {
//    entry: './src/app.js',
//    output: {
//      path: path.join(__dirname, 'public'),
//      filename: 'bundle.js'
//    },
//    module: {
//      rules: [{
//          loader: 'babel-loader',
//          test: /\.js$/,
//          exclude: /node_modules/
//        },
//        {
//          test:/\.s?css$/,
//          use: [
//            MiniCssExtractPlugin.loader,
//            'css-loader',
//            'sass-loader'
//          ]
//        }
//      ]
//    },
//    plugins: [
//      new MiniCssExtractPlugin({
//        filename: 'styles.css'
//      })
//    ],
//    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
//    devServer: {
//      contentBase: path.join(__dirname, 'public'),
//      historyApiFallback: true
//    }  
//  };
//};