const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const pages = [
  'index',
  'solucoes',
  'cases',
  'case',
  'vender-mais',
  'se-posicionar',
  'gerar-conteudo',
  'metodologia',
  'contato',
  'obrigado',
  'blog',
  'post',
];

// Entradas dinâmicas
const entryPoints = pages.reduce((entries, page) => {
  entries[page] = `./src/js/pages/${page}.js`;
  return entries;
}, {});

// HTMLPlugins para cada página
const htmlPlugins = pages.map((page) => new HtmlWebpackPlugin({
  template: `./src/${page}.html`,
  filename: `${page}.html`,
  chunks: ['runtime', 'vendors', 'common', page], // Define a ordem de carregamento
  scriptLoading: 'defer', // Adia o carregamento do JS
  minify: {
    removeRedundantAttributes: false,
    collapseWhitespace: true, // Remove espaços em branco
    removeComments: true, // Remove comentários
    removeEmptyAttributes: true,
    useShortDoctype: true,
  },
}));

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js', // Cache busting com contenthash
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true, // Apenas navegadores modernos
                  },
                  useBuiltIns: false, // Sem polyfills desnecessários
                  modules: false, // Mantém módulos ES6 para melhor tree-shaking
                },
              ],
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              {
                corejs: 3, // Defina a versão do core-js se necessário (3 é recomendada)
              },
            ],
          },
        },
      },
    ],
  },
  
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console.log
            drop_debugger: true,
            pure_funcs: ['console.log'],
            passes: 3,
          },
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
          enforce: true,
        },
        gsap: {
          test: /[\\/]node_modules[\\/]gsap[\\/]/,
          name: 'gsap',
          chunks: 'async',
        },
        swiper: {
          test: /[\\/]node_modules[\\/]swiper[\\/]/,
          name: 'swiper',
          chunks: 'async',
        },
      },
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
    }),
    ...htmlPlugins,
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/cases.json', to: 'cases.json' },
        { from: 'src/googlecbae4daf0a01a7b9.html', to: 'googlecbae4daf0a01a7b9.html' },
        { from: 'src/legendas.vtt', to: 'legendas.vtt' },
        { from: 'src/marketing-e-industria.pdf', to: 'marketing-e-industria.pdf' },
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.CONTENTFUL_SPACE_ID': JSON.stringify('oputswbco4ug'),
      'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify('t0k-RHn4eskADHT1Gdjr27xnkXu7WqPS3NOkQdTYlZs'),
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
        timeout: 120000,
      },
    ],
  },
};