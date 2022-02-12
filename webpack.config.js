const path = require('path');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    rootMode: 'upward',
  },
};

const config = {};

config.entry = {
  main: { import: './src/index.js', filename: '../dist/main.js' },
  build: { import: './src/index.js', filename: '../test/_build.js' },
};

config.output = {
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
