import routeConfig from './route.config';
import theme from './theme';

export default {
  routes: routeConfig,
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
          loadingComponent: './components/Loading',
        },
        title: '实验室预约管理系统',
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: true,
        },
        library: 'react',
        dll: true,
        pwa: false,
        hardSource: false,
        fastClick: true,
      },
    ],
  ],
  sass: {},
  // 配置antd的基础样式
  theme,
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
