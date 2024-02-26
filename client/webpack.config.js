const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html', // html temp
        filename: 'index.html', 
        chunks: ['main'], 
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: 'J.A.T.E',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#31a9e1',
        icons: [
          {
            src: path.resolve('src/assets/icons/icon_96x96.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // sw file
        swDest: 'service-worker.js', 
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/, // css file
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/, // babel
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        },
      ],
    },
  };
};