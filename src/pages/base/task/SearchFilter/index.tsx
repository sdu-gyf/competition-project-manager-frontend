import * as React from 'react';
import { Input, Button, Table, Select } from 'antd';
import styles from './index.scss';
import { TaskSearchProps, TaskEditModel } from '@/interfaces/task';


interface SearchFilterProps {
  searchProps: TaskSearchProps;
  taskList: TaskEditModel[];
  setTaskList: (taskList: TaskEditModel[]) => void;
  changeSearchProps: (searchProps: TaskSearchProps) => void;
  onSearch: () => void;
}

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { searchProps, onSearch, changeSearchProps } = this.props;
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>实验室名称：</span>
          <Select placeholder="请输入实验室名称" allowClear={true}>
              {this.props.taskList.map((item: TaskEditModel)=> (
                <Select.Option key={`${item.labCode}`} value={item.labCode}>
                  {item.labName}
                </Select.Option>
              ))}
          </Select>
        </div>
        <div className={styles.filterItem}>
          <span className={styles.label}>实验教师名称：</span>
          <Select placeholder="请输入实验教师名称" allowClear={true}>
              {this.props.taskList.map((item: TaskEditModel)=> (
                <Select.Option key={`${item.teacherCode}`} value={item.teacherCode}>
                  {item.teacherName}
                </Select.Option>
              ))}
          </Select>
        </div>

        <Button type="primary" onClick={onSearch}>
          查询
        </Button>
      </div>
    );
  }
}
