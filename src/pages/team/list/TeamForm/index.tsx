import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { TeamEditModel } from '@/interfaces/team';
import ModalButtons from '@/components/ModalButtons';

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: TeamEditModel;
  onClose: () => void;
  onSubmit: (data: TeamEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: TeamEditModel) => {
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
        <Form.Item label="代表队名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('teamName', {
            rules: [
              {
                required: true,
                message: '请输入代表队名称',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="联系人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('contact', {
            rules: [
              {
                required: true,
                message: '请输入联系人',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="联系电话" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: true,
                message: '请输入联系电话',
                
              },
              {
                pattern:/^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/,
                message:"请输入正确电话"
              }
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="所在省份" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('province', {
            rules: [
              {
                required: true,
                message: '请输入所在省份',
              }
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
    detailData?: TeamEditModel;
    onClose: () => void;
    onSubmit: (data: TeamEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
