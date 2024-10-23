  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  const TerserPlugin = require('terser-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const path = require('path');
  const CopyWebpackPlugin = require('copy-webpack-plugin');

  // Função para criar instâncias do HtmlWebpackPlugin
  const pages = [
    'index',
    'programa-mulheres',
    'programa-equipes',
    'para-mulheres',
    'para-equipes',
    'manifesto',
    'depoimentos',
    'blog'
  ];

  const htmlPlugins = pages.map(page => new HtmlWebpackPlugin({
    template: `./src/${page}.html`,
    filename: `${page}.html`,
    minify: {
      removeRedundantAttributes: false,
    },
  }));

  module.exports = {
    entry: './src/js/script.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|webp|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext][query]',
          }
        },
        // Regra para processar fontes
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]', // Salva as fontes na pasta 'fonts'
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      ...htmlPlugins,
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/img', to: 'img' },
          { from: 'src/programaEquipes.json', to: 'programaEquipes.json' },
          { from: 'src/programaMulheres.json', to: 'programaMulheres.json' }

        ]
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    mode: 'production',
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      compress: true,
      port: 9000,
      open: true,
      hot: true,
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:5005',
          secure: false,
          changeOrigin: true,
          timeout: 120000
        }
      ]
    }
  };
