/*
 * @文件描述:
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-05-09 11:40:39
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2019-12-25 15:34:06
 */
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './login' },
    ],
  },
  {
    path: '/base',
    component: '../layouts/BasicLayout',
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/base/department', component: './base/department' },
      { path: '/base/lab', component: './base/lab' },
      { path: '/base/task', component: './base/task' },
    ],
  },
  {
    path: '/reservation',
    component: '../layouts/BasicLayout',
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [{ path: '/reservation/log', component: './reservation/reservationList' }],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/components/Authorized'], // 所有的子路径都会被这个拦截
    routes: [
      { path: '/', redirect: '/homepage' },
      { path: '/homepage', component: './homepage' },
    ],
  },
  {
    component: '404',
  },
];
