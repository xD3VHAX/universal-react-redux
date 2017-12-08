import webpack from 'webpack';
import baseConfig from './base';
import CompressionPlugin from 'compression-webpack-plugin';

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: '[name].[hash].js',
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false
    },
    mangle: true,
    output: {
      comments: false,
    },
  }),
  new CompressionPlugin({
    asset: '[file].gz',
    algorithm: 'gzip',
    test: /\.css$|\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
];

const loaders = [];

export default {
  ...baseConfig,
  output: { ...baseConfig.output, ...{
    filename: '[name].[hash].js'
  }},
  plugins: [
    ...baseConfig.plugins,
    ...plugins
  ],
  module: { ...baseConfig.module, ...{
    rules: [
      ...baseConfig.module.rules,
      ...loaders
    ]
  }}
};
