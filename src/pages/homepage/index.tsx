/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2019-10-06 10:31:24
 */
import * as React from 'react';
import { compose, withState } from 'recompose';

export interface HomepageProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

class Upload extends React.Component<HomepageProps> {
  public render() {
    return <div>Hello</div>;
  }
}

export default compose(withState('visible', 'setVisible', false))(Upload);
