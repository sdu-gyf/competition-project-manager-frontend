/**
 * 这个文件主要是定义组件内用到的各种props的数据模型
 */
import { GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { ColProps } from 'antd/lib/col';
import { ReactNode } from 'react';

export interface FieldDecorator {
  getFieldDecorator<T = {}>(
    id: keyof T,
    options?: GetFieldDecoratorOptions,
  ): (node: React.ReactNode) => React.ReactNode;
}

export interface ColumnProps<T> {
  title: string;
  dataIndex?: string;
  width?: number;
  editable?: boolean;
  validator?: (value: string | number, callback: (value?: string) => void, record: T) => any;
  render?: (_: any, record: T, index: any) => ReactNode;
}

export interface FormItemLayout {
  labelCol: ColProps;
  wrapperCol: ColProps;
}

export interface PageMatchModel {
  isExact: boolean;
  params: object;
  path: string;
  url: string;
}

export interface PageBasicPropsModel {
  history: History;
  location: CustomLocation;
  match: PageMatchModel;
  children: any;
}

export interface CustomLocation extends Location {
  query: {
    [x: string]: string;
  };
}

export interface OptionItem {
  label: string;
  value: string | number;
}

export interface ButtonItem {
  text: string;
  icon: string;
  disabled?: boolean;
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'danger';
  onClick: () => void;
}

export interface CustomFormPropsModel {
  // 需要用到的组件
  component: string;
  // 字段名
  label: string;
  // 变量名
  name: string;
  // 是否需要校验
  required?: boolean;
  // 异常信息
  message?: string;
  // 是否加载localStorageData
  getLocalStorageData?: boolean;
  // dictName
  dictName?: string;
  // 选择框内容
  options?: object[];
}
