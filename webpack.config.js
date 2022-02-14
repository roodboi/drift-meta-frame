const path = require('path');

const babelLoader = {
  loader: 'babel-loader',
};

const config = {};
config.mode = 'production';

config.entry = {
  main: { import: './src/index.js', filename: '../dist/index.js' },
  build: { import: './src/index.js', filename: '../test/_build.js' },
};

config.output = {
  globalObject: 'this',
  library: {
    type: 'umd',
    name: 'driftMetaFrame',
  },
};

config.resolve = {
  extensions: ['.jsx', '.js', '.json', '.css'],
};

config.module = {
  rules: [
    {
      test: /\.m?js/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: babelLoader,
    },
  ],
};

module.exports = config;
