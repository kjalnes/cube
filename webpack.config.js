const webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      'three/CanvasRenderer': path.join(__dirname, 'node_modules/three/examples/js/renderers/CanvasRenderer.js'),
      'three/Projector': path.join(__dirname, 'node_modules/three/examples/js/renderers/Projector.js'),
      'three/CSS3DRenderer': path.join(__dirname, 'node_modules/three/examples/js/renderers/CSS3DRenderer.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      'THREE': 'three/build/three'
    })
  ]
};
