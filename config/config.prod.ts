import pageRoutes from './route.config';
import theme from './theme';

export default {
  routes: pageRoutes,
  targets: {
    ie: 11,
  },
  history: 'hash',
  outputPath: './build',
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
          // loadingComponent: '../src/components/Loading.tsx',
        },
        title: '实验室预约管理系统',
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        library: 'react',
        pwa: false,
        fastClick: true,
      },
    ],
  ],
  sass: {},
  define: {
    'process.env.PROD': JSON.stringify(true),
  },
  // 由于有动态路由，这个地方改成false
  exportStatic: false,
  // 配置antd的基础样式
  theme,
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  chainWebpack(config: any) {
    config.output
      .filename('[name].[chunkhash].bundle.js')
      .chunkFilename('[name].[chunkhash].bundle.js')
      .hashFunction('sha256')
      .hashDigest('hex')
      .hashDigestLength(20);
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 20000,
      minChunks: 4,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    });
  },
};
