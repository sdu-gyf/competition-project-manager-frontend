/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-20 18:53:36
 */
import lscache from 'lscache';
import { cookieUtil } from './cookie-utils';
import router from 'umi/router';
/**
 * 保存和操作用户登录信息
 * @class User
 */
class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  saveToken(accessToken: string) {
    cookieUtil.setItem('accessToken', accessToken, { path: '/', maxAge: 3600 * 12 });
  }

  /**
   * 保存登录接口返回的姓名和手机号
   * @param name
   * @param phone
   */
  saveUserInfo(username: string, nickName: string, avatar: string) {
    cookieUtil.setItem('userInfo', JSON.stringify({ username, nickName, avatar }), {
      path: '/',
      maxAge: 3600 * 12,
    });
  }

  /**
   * 从cookie中获取姓名
   */
  getUserInfo() {
    const userInfo = cookieUtil.getItem('userInfo');
    return userInfo
      ? JSON.parse(userInfo)
      : {
          username: '',
          nickName: '',
          avatar: '',
        };
  }

  /**
   * 判断用户是否登录
   *
   * @memberof User
   */
  isLogin() {
    return !!cookieUtil.getItem('accessToken');
  }

  /** 获取token */
  getToken() {
    return cookieUtil.getItem('accessToken');
  }
  /**
   * 用户退出登录
   *
   * @memberof User
   */
  logout() {
    lscache.remove('allResources');
    lscache.remove('user-resource-list');
    cookieUtil.removeItem('accessToken');
    cookieUtil.removeItem('userInfo');
    router.replace('/user/login');
  }
}
export default new User();
