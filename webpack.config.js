const nodeExternals = require('webpack-node-externals');

const sharedModuleRules = {
  rules: [
    {
      test: /\.?jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    },
  ]
}

module.exports = (env) => {
  if (env.client) {
    return {
      entry: './src/client/index.jsx',
      output: {
        filename: './client.js',
      },
      module: sharedModuleRules
    }
  }

  return {
    target: 'node',
    entry: './src/server.js',
    output: {
      filename: './server.js',
    },
    externals: nodeExternals(),
    module: sharedModuleRules
  }
}