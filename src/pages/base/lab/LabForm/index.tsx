/*
 * @作者: 李洪文
 * @公司: thundersdata
 * @文件描述: 实验室信息表单
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-10-05 22:46:43
 * @LastEditTime : 2019-12-25 01:23:55
 */
import * as React from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { FILTER_FORM_LAYOUT, ONE_COLUMN_FORM_LAYOUT } from '@/constant';
import { Input, Table, Select, Button, Divider, Modal } from 'antd';
import styles from './index.scss';

import { compose, withState } from 'recompose';
import { LabAssistantEditModel, LabEditModel } from '@/interfaces/lab';
import ModalButtons from '@/components/ModalButtons';

export interface UserFormProps extends FormComponentProps {
  saving: boolean;
  detailData: LabEditModel;
  onClose: () => void;
  changeEditData: (detailData?: LabEditModel) => void;
  onSubmit: () => void;
  teacherList: LabAssistantEditModel[];
  setTeacherList: (teacherList: LabAssistantEditModel[]) => void;
  teacherCode: string;
  setTeacherCode: (teacherCode: string) => void;
}

class LabForm extends React.PureComponent<UserFormProps> {
  private columns = [
    { title: '教师编码', dataIndex: 'teacherCode' },
    { title: '教师名称', dataIndex: 'teacherName' },
    { title: '教师工号', dataIndex: 'workCode' },
    {
      title: '操作',
      render: (_: any, __: any, index: number) => (
        <>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(index)}>删除</a>
        </>
      ),
    },
  ];

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal" className={styles.form}>
        <Form.Item label="实验室名称" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('labName', {
            rules: [
              {
                required: true,
                message: '请输入实验室',
              },
            ],
          })(<Input placeholder="请输入" />)}
        </Form.Item>

        <Form.Item label="负责人" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('director')(<Input placeholder="请输入负责人" />)}
        </Form.Item>

        <Form.Item label="实验室地址" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('address')(<Input placeholder="请输入实验室地址" />)}
        </Form.Item>

        <Form.Item label="容纳人数" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('capacity')(<Input placeholder="请输入容纳人数" />)}
        </Form.Item>

        <Form.Item label="联系电话" {...FILTER_FORM_LAYOUT}>
          {getFieldDecorator('contactPhone')(<Input placeholder="请输入联系电话" />)}
        </Form.Item>

        <Form.Item
          label="备注"
          style={{ width: '100%' }}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
        >
          {getFieldDecorator('description')(<Input placeholder="请输入备注" />)}
        </Form.Item>

        <Form.Item
          label="实验教师"
          {...ONE_COLUMN_FORM_LAYOUT}
          style={{ width: '100%', marginLeft: '22pt' }}
        >
          <Select
            style={{ flex: 1, width: '60%' }}
            showSearch={true}
            allowClear={true}
            placeholder="请输入实验教师名称"
            defaultActiveFirstOption={false}
            showArrow={true}
            value={this.props.teacherCode}
            onChange={(value: string) => this.props.setTeacherCode(value)}
            filterOption={false}
            notFoundContent={null}
            onSearch={(value: string) => this.fetchFilters(value)}
          >
            {this.props.teacherList.map((item: LabAssistantEditModel) => (
              <Select.Option key={item.teacherCode} value={item.teacherCode}>
                {item.teacherName}
              </Select.Option>
            ))}
          </Select>

          <Button type="primary" onClick={this.onAddTeacher} style={{ margin: '3pt' }}>
            添加
          </Button>

          <Table
            columns={this.columns}
            style={{ width: '100%' }}
            size="middle"
            dataSource={this.props.detailData.labAssistantList}
            pagination={false}
            rowKey={(record: LabAssistantEditModel) => record.teacherCode}
          />
        </Form.Item>

        <ModalButtons
          onCancel={this.props.onClose}
          onOk={this.handleSubmit}
          loading={this.props.saving}
        />
      </Form>
    );
  }

  private handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error: Error, values: LabEditModel) => {
      if (error) {
        return;
      }
      this.props.onSubmit();
    });
  };

  private handleDelete = (index: number) => {
    if (index === undefined || index >= this.props.detailData.labAssistantList.length) {
      return;
    }
    Modal.confirm({
      centered: true,
      title: '您确定要删除这条教师信息吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        const labAssistantList = [...this.props.detailData.labAssistantList];
        labAssistantList.splice(index, 1);
        this.props.changeEditData({
          ...this.props.detailData,
          labAssistantList,
        });
      },
    });
  };

  private async fetchFilters(name: string) {
    // const list = await this.props.spiderService.fetchCompaniesByName(name);
    const list: LabAssistantEditModel[] = [
      {
        teacherCode: '11',

        teacherName: '12',

        departmentName: 'ahfe',

        workCode: '001',
      },
      {
        teacherCode: '15',

        teacherName: '16',

        departmentName: 'ahfe',

        workCode: '002',
      },
    ];
    this.props.setTeacherList(list);
  }
  private onAddTeacher = () => {
    const teacher = this.props.teacherList.find(
      item => item.teacherCode === this.props.teacherCode,
    );
    if (!teacher) {
      return;
    }
    const labAssistantList = [...this.props.detailData.labAssistantList, teacher];

    this.props.changeEditData({
      ...this.props.detailData,
      labAssistantList,
    });
  };
}

export default compose<
  {},
  {
    saving: boolean;
    detailData: LabEditModel;
    onClose: () => void;
    changeEditData: (detailData?: LabEditModel) => void;
    onSubmit: (data: LabEditModel) => void;
  }
>(
  withState('teacherList', 'setTeacherList', []),
  withState('teacherCode', 'setTeacherCode', undefined),
)(Form.create()(LabForm));
