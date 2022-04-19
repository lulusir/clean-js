const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin =
//   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.ts',
  // plugins: [new BundleAnalyzerPlugin()],
  // mode: 'development',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
      }),
    ],
  },
  // target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: {
    vue: 'vue',
    '@clean-js/presenter': '@clean-js/presenter',
  },
  // devtool: 'source-map',
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    library: {
      name: '@clean-js/vue-presenter',
      type: 'umd',
    },
    // environment: { module: true },
    // library: {
    //   type: 'module',
    // },
  },
};
