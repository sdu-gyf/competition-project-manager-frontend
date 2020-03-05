/*
 * @文件描述: 承运商弹窗，承载新增、修改、详情三个表单
 * @公司: 山东大学
 * @作者: 陈杰
 * @Date: 2018-12-28 10:28:17
 * @LastEditors: 卢恒昌
 * @LastEditTime: 2019-02-07 11:01:54
 */
import * as React from 'react';
import { Modal } from 'antd';

interface CommonModalProps {
  title: string;
  width?: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: any;
}

const CommonModal: React.SFC<CommonModalProps> = ({
  title,
  width,
  visible,
  setVisible,
  children,
}) => {
  return (
    <Modal
      title={title}
      width={width === undefined ? 650 : width}
      visible={visible}
      centered={true}
      destroyOnClose={true}
      onCancel={() => setVisible(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
