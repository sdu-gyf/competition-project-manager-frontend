/*
 * @作者: 李洪文
 * @公司: thundersdata
 * @文件描述: 部门信息表单
 * @LastEditors: 李洪文
 * @Date: 2019-10-05 22:46:43
 * @LastEditTime: 2019-11-14 14:29:10
 */
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { DepartmentEditModel } from '@/interfaces/department';
import ModalButtons from '@/components/ModalButtons';

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: DepartmentEditModel;
  onClose: () => void;
  onSubmit: (data: DepartmentEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: DepartmentEditModel) => {
      if (error) {
        return;
      }
      this.props.onSubmit(values);
    });
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="部门名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('departmentName', {
            rules: [
              {
                required: true,
                message: '请输入部门',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="联系人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('contact', {
            rules: [
              {
                required: false,
                message: '请输入联系人',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="联系电话" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('contactPhone', {
            rules: [
              {
                required: false,
                message: '请输入联系电话',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item
          label="备注"
          style={{ width: '100%' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('description')(<Input placeholder="请输入备注" />)}
        </Form.Item>
        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }
}

export default compose<
  {},
  {
    saving: boolean;
    detailData?: DepartmentEditModel;
    onClose: () => void;
    onSubmit: (data: DepartmentEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
