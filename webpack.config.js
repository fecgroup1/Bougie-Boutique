// const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client/dist');
const APP_DIR = path.resolve(__dirname, 'client/src');

module.exports = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: [
          /node_modules/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  "regenerator": true
                }
              ], ["@babel/plugin-transform-react-jsx"],
              ["@babel/plugin-syntax-jsx"]
            ]
          }
        }
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    fallback: {
      "path": false,
      "url": false,
      "fs": false,
      "tls": false,
      "net": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
    }
  },
};


