import * as React from 'react';
import { Input, Button } from 'antd';
import styles from './index.scss';
import { DepartmentSearchProps } from '@/interfaces/department';

interface SearchFilterProps {
  searchProps: DepartmentSearchProps;
  changeSearchProps: (searchProps: DepartmentSearchProps) => void;
  onSearch: () => void;
}

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { searchProps, onSearch, changeSearchProps } = this.props;
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>部门名称：</span>
          <Input
            allowClear={true}
            value={searchProps.departmentName}
            placeholder="请输入部门名称"
            onChange={e => changeSearchProps({ departmentName: e.target.value })}
          />
        </div>

        <Button type="primary" onClick={onSearch}>
          查询
        </Button>
      </div>
    );
  }
}
