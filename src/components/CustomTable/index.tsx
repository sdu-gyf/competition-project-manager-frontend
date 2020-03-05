/*
 * @文件描述: 公共的Table组件，包含查询（可自定义）、列表（column和dataSource为参数）、分页、按钮栏
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-06-02 11:28:39
 * @LastEditors: 李洪文
 * @LastEditTime: 2019-07-11 17:54:42
 */
import * as React from 'react';
import { Table, Button, Pagination } from 'antd';
import { PAGE_SIZE } from '@/interfaces/common';
import styles from './index.scss';
import Iconfont from '../Iconfont';
import { ButtonItem } from '@/interfaces/component';

export interface CustomTableProps {
  loading?: boolean;
  total?: number;
  current?: number;
  columns: object[];
  dataSource: object[];
  rowSelection?: object;
  expandedRowKeys?: string[];
  onRow?: (record: any, index?: number) => void;
  onPagination?: (current: number) => void;
  genRowKey: (record: any) => string;
  expandedRowRender?: (record: any) => React.ReactNode;
  buttons?: ButtonItem[];
  components?: any;
  onExpand?: (expanded: any, record: any) => void;
}

const CustomTable: React.SFC<CustomTableProps> = ({
  loading,
  children,
  columns,
  dataSource,
  current,
  total,
  rowSelection,
  onPagination,
  onRow,
  genRowKey,
  buttons,
  components,
  expandedRowRender,
  onExpand,
  expandedRowKeys,
}) => (
  <div className={styles.customTable}>
    <div className={styles.filterWrap}>{children}</div>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey={genRowKey}
      components={components}
      size="middle"
      loading={loading}
      expandedRowRender={expandedRowRender}
      onExpand={onExpand}
      expandedRowKeys={expandedRowKeys !== undefined ? expandedRowKeys : []}
      rowSelection={rowSelection}
      onRow={onRow}
    />
    <div className={styles.pagination}>
      {buttons !== undefined && (
        <div className={styles.btnWrap}>
          {buttons.map(button => (
            <Button
              key={button.text}
              type={button.type}
              onClick={button.onClick}
              disabled={button.disabled}
              className={`${styles.btn} ${button.type !== 'primary' && styles.secondary}`}
            >
              <Iconfont name={button.icon} />
              <span>{button.text}</span>
            </Button>
          ))}
        </div>
      )}
      {onPagination !== undefined && (
        <Pagination
          showQuickJumper={true}
          size="middle"
          total={total}
          pageSize={PAGE_SIZE}
          current={current}
          onChange={onPagination}
        />
      )}
    </div>
  </div>
);
CustomTable.defaultProps = {
  buttons: [],
  loading: false,
};
export default CustomTable;
