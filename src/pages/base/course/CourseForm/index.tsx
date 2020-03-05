
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT } from '@/constant';
import { Input } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { CourseEditModel } from '@/interfaces/course';
import ModalButtons from '@/components/ModalButtons';

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData?: CourseEditModel;
  onClose: () => void;
  onSubmit: (data: CourseEditModel) => void;
}

class UserForm extends React.PureComponent<UserFormProps> {
  public componentDidMount() {
    const { detailData } = this.props;
    if (detailData) {
      this.props.form.setFieldsValue(detailData);
    }
  }

  public handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: CourseEditModel) => {
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

        <Form.Item label="课程号" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('courseNumber')(<Input placeholder="请输入" />)}
        </Form.Item>
        
        <Form.Item label="课程名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('courseName')(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="课程负责人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('director')(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="联系电话" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('contactPhone')(<Input placeholder="请输入" />)}
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
    detailData?: CourseEditModel;
    onClose: () => void;
    onSubmit: (data: CourseEditModel) => void;
  }
>(withState('vehicleList', 'changeVehicleList', []))(Form.create()(UserForm));
