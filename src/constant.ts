/*
 * @作者: 李洪文
 * @公司: 山东大学
 * @文件描述: file content
 * @LastEditors: 李洪文
 * @Date: 2019-09-13 07:27:24
 * @LastEditTime: 2019-10-08 11:55:23
 */

/**
 * 两列布局的表单layout
 */
export const TWO_COLUMNS_FORM_LAYOUT = Object.freeze({
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
});

/**
 * 筛选条件的layout
 */
export const FILTER_FORM_LAYOUT = Object.freeze({
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
});

export const DETAIL_ITEM_LAYOUT = Object.freeze({
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
});

/**
 * 单列布局的表单layout
 */
export const ONE_COLUMN_FORM_LAYOUT = Object.freeze({
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
});

export const  GITHUB_CONFIG = {
  "github":{
      'oauth_uri': 'https://github.com/login/oauth/authorize',
      'redirect_uri': 'http://localhost:8000/callback',
      'client_id': 'ce7fc00c2f94eb750aca',
      'client_secret': 'aa6030340e20920d6ecabfc3612f3d609bb028f4',
      'status':"1"
  }
};

export const SOME_CONSTANT = 1;
