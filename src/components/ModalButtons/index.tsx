/*
 * @文件描述: 弹窗底部的按钮组：通常包含两个：取消和保存
 * @公司: 山东大学
 * @作者: 陈杰
 * @Date: 2018-12-28 11:25:48
 * @LastEditors: 陈杰
 * @LastEditTime: 2019-02-21 19:58:24
 */
import * as React from 'react';
import styles from './index.scss';
import { Button } from 'antd';
import { compose, defaultProps } from 'recompose';

interface ModalButtonsProps {
  okText?: string;
  cancelText?: string;
  onCancel: () => void;
  onOk?: () => void;
  loading?: boolean;
}

const ModalButtons: React.SFC<ModalButtonsProps> = ({
  okText,
  cancelText,
  onCancel,
  loading,
  onOk,
}) => {
  return (
    <div className={styles.modalBtnWrap}>
      <Button onClick={onCancel}>{cancelText}</Button>
      {onOk ? (
        <Button type="primary" onClick={onOk} className={styles.submitBtn} loading={loading}>
          {okText}
        </Button>
      ) : (
        <Button type="primary" htmlType="submit" className={styles.submitBtn} loading={loading}>
          {okText}
        </Button>
      )}
    </div>
  );
};
export default compose<
  {},
  {
    onCancel: () => void;
    onOk?: () => void;
    loading?: boolean;
    okText?: string;
    cancelText?: string;
    htmlType?: string;
  }
>(
  defaultProps({
    okText: '保存',
    cancelText: '取消',
    loading: false,
  }),
)(ModalButtons);
