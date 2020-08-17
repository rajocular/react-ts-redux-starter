const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dev = 'development';
const devLogger = 'development-logger';
const prod = 'production';

const FILE_PATHS = {
  ASSET: process.env.ASSET_PATH || '/',
  ENTRY: path.join(__dirname, 'src', 'index.tsx'),
  INDEX: path.resolve(__dirname, 'public', 'index.html'),
  SRC: path.resolve(__dirname, 'src'),
  PUBLIC: path.resolve(__dirname, 'public'),
  MODULES: path.resolve(__dirname, 'node_modules'),
  BUILD: path.resolve(__dirname, 'build'),
  BUILD_PUBLIC: path.resolve(__dirname, 'build', 'public')
};

const ENV_PATHS = {
  DEV: path.resolve(__dirname, '.config', '.env.dev'),
  PROD: path.resolve(__dirname, '.config', '.env.production'),
};

const FILE_NAMES = {
  styles: 'style/[name].css',
  bundle: 'js/bundle.js',
  chunk: 'js/[id].js',
  assets: 'assets/[name].[ext]'
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => ([autoprefixer]),
  },
};

const JsModuleRules = {
  test: /\.(ts|js)x?$/,
  include: FILE_PATHS.SRC,
  exclude: FILE_PATHS.MODULES,
  loaders: ['babel-loader', 'ts-loader']
};

const CssModuleRules = (mode) => ({
  test: /\.(sa|sc|c)ss$/,
  use: (mode === 'development')
    ? ['style-loader', 'css-loader', PostCSSLoader, 'sass-loader']
    : ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', PostCSSLoader, 'sass-loader']
});

const FontModuleRules = {
  test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: FILE_NAMES.assets,
    },
  },
};

const getEnvs = (mode) => {
  const envPath = (mode === dev || mode === devLogger) ? ENV_PATHS.DEV : ENV_PATHS.PROD;
  const envPairs = dotenv.config({ path: envPath }).parsed;

  const getEnvPairs = () => Object.keys(envPairs).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(envPairs[next]);
    return prev;
  }, {});

  return {
    ...envPairs && getEnvPairs(),
    'process.env.NODE_ENV': JSON.stringify(mode)
  };
};

const commonConfig = {
  entry: {
    main: ['babel-polyfill', FILE_PATHS.ENTRY],
  },
  output: {
    path: FILE_PATHS.BUILD,
    filename: 'bundle.js',
    publicPath: FILE_PATHS.ASSET,
  },
  resolve: {
    alias: {
      src: FILE_PATHS.SRC
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: FILE_PATHS.INDEX,
    }),
  ],
  module: {
    rules: [
      // babel-loader to load the jsx and tsx files
      JsModuleRules,
      FontModuleRules,
    ]
  }
};

const devConfig = (env) => merge(commonConfig, {
  mode: dev,
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      CssModuleRules(dev),
    ]
  },
  plugins: [
    new webpack.DefinePlugin(getEnvs(env))
  ]
});

const prodConfig = (env) => merge(commonConfig, {
  mode: prod,
  output: {
    path: FILE_PATHS.BUILD,
    filename: 'bundle.js',
    publicPath: FILE_PATHS.ASSET,
    chunkFilename: FILE_NAMES.chunk,
    filename: FILE_NAMES.bundle,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
      },
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      test: /\.(ts|js)x?$/,
    })],
  },
  plugins: [
    new webpack.DefinePlugin(getEnvs(env)),
    new CleanWebpackPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({ filename: FILE_NAMES.styles }),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new CopyPlugin({
      patterns: [{
        from: FILE_PATHS.PUBLIC,
        to: FILE_PATHS.BUILD_PUBLIC,
        globOptions: {
          ignore: [FILE_PATHS.INDEX]
        }
      }],
      options: {
        concurrency: 100,
      },
    }),
    new OptimizeCSSAssetsPlugin({
      canPrint: false,
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
    })
  ],
  module: {
    rules: [
      CssModuleRules(prod),
    ]
  }
});

module.exports = (env) => (env === dev || env === devLogger) ? devConfig(env) : prodConfig(env);
