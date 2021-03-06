const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const deps = require('./package.json').dependencies;

const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin;
const EnvironmentPlugin = webpack.EnvironmentPlugin;

module.exports = {
  entry: './src/index',
  cache: false,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [require.resolve('@babel/preset-react')],
        },
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: {
        app_02: 'app_02@https://app-02-blissful-knuth-69a806.netlify.app/remoteEntry.js',
        posts_react: 'posts_react@https://posts-react-romantic-mestorf-fd497b.netlify.app/remoteEntry.js',
        docs_svelte: 'docs_svelte@https://docs-svelte-determined-snyder-8dd385.netlify.app/remoteEntry.js',
        map_react: 'map_react@https://map-react-gifted-swanson-cc42fe.netlify.app/remoteEntry.js',
        app_05: 'app_05@https://app-05-gracious-mcnulty-004784.netlify.app/remoteEntry.js',
      },
      exposes: {
        './SideNav': './src/SideNav',
        './Page': './src/Page',
        './channels': './src/channels',
      },
      shared: {
        ...deps,
        '@material-ui/core': {
          singleton: true,
        },
        'react-router-dom': {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
        react: {
          singleton: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new EnvironmentPlugin(['MAPBOX_ACCESS_TOKEN']),
  ],
};
