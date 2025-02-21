// const webpack = require('webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');

// const pages = [
//   'index',
//   'solucoes',
//   'cases',
//   'case',
//   'vender-mais',
//   'se-posicionar',
//   'gerar-conteudo',
//   'metodologia',
//   'contato',
//   'obrigado',
//   'blog',
//   'post',
// ];

// const htmlPlugins = pages.map(page => new HtmlWebpackPlugin({
//   template: `./src/${page}.html`,
//   filename: `${page}.html`,
//   minify: {
//     removeRedundantAttributes: false,
//   },
// }));

// module.exports = {
//   entry: './src/js/script.js',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'main.js',
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ['@babel/plugin-transform-runtime'],
//           },
//         },
//       },
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader'],
//       },
//       {
//         test: /\.(png|svg|jpg|webp|jpeg|gif)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'img/[name][ext][query]',
//         },
//       },
//       {
//         test: /\.(woff|woff2|eot|ttf|otf)$/i,
//         type: 'asset/resource',
//         generator: {
//           filename: 'fonts/[name][ext]',
//         },
//       },
//     ],
//   },
//   optimization: {
//     minimize: true,
//     minimizer: [
//       new TerserPlugin({
//         terserOptions: {
//           format: {
//             comments: false,
//           },
//         },
//         extractComments: false,
//       }),
//       new CssMinimizerPlugin(),
//     ],
//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin({
//       filename: 'style.css',
//     }),
//     ...htmlPlugins,
//     new CopyWebpackPlugin({
//       patterns: [
//         { from: 'src/img', to: 'img' },
//         { from: 'src/cases.json', to: 'cases.json' },
//         { from: 'src/googlecbae4daf0a01a7b9.html', to: 'googlecbae4daf0a01a7b9.html' },
//         { from: 'src/legendas.vtt', to: 'legendas.vtt' }, 
//         { from: 'src/marketing-e-industria.pdf', to: 'marketing-e-industria.pdf' }, // Adiciona o PDF aqui
//       ],
//     }),
//     new webpack.DefinePlugin({
//       'process.env.CONTENTFUL_SPACE_ID': JSON.stringify('oputswbco4ug'),
//       'process.env.CONTENTFUL_ACCESS_TOKEN': JSON.stringify('t0k-RHn4eskADHT1Gdjr27xnkXu7WqPS3NOkQdTYlZs'),
//     }),   
//   ],
//   resolve: {
//     extensions: ['.js', '.jsx', '.json'],
//   },
//   mode: 'production',
//   devServer: {
//     static: {
//       directory: path.join(__dirname, 'dist'),
//     },
//     historyApiFallback: true,
//     compress: true,
//     port: 9000,
//     open: true,
//     hot: true,
//     proxy: [
//       {
//         context: ['/api'],
//         target: 'http://localhost:5005',
//         secure: false,
//         changeOrigin: true,
//         timeout: 120000,
//       },
//     ],
//   },
// };


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

// Configura entradas dinâmicas para cada página (ex: index.js, cases.js)
const entryPoints = pages.reduce((entries, page) => {
  entries[page] = `./src/js/pages/${page}.js`;
  return entries;
}, {});

// Gera instâncias do HtmlWebpackPlugin para cada página
const htmlPlugins = pages.map(page => new HtmlWebpackPlugin({
  template: `./src/${page}.html`,
  filename: `${page}.html`,
  chunks: [page], // Carrega apenas o JS específico de cada página
  minify: {
    removeRedundantAttributes: false,
  },
}));

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js', // Gera um arquivo JS para cada entrada (index.js, cases.js...)
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
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          test: /[\\/]src[\\/]js[\\/](modules|utils)[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const allChunksNames = chunks.map((chunk) => chunk.name).join('~');
            return `common~${allChunksNames}`;
          },
          minSize: 0,
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single', // Melhora cache ao separar o runtime
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // CSS separado por página, se necessário
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
