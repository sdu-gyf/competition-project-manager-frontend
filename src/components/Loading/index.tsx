import * as React from 'react';
import { Spin } from 'antd';

export default function Loading() {
  return <Spin tip="页面加载中，请稍候..." />;
}
