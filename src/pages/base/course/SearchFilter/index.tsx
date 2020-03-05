import * as React from 'react';
import { Input, Button } from 'antd';
import styles from './index.scss';
import { CourseSearchProps } from '@/interfaces/course';

interface SearchFilterProps {
  searchProps: CourseSearchProps;
  changeSearchProps: (searchProps: CourseSearchProps) => void;
  onSearch: () => void;
}

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {
  render() {
    const { searchProps, onSearch, changeSearchProps } = this.props;
    return (
      <div className={styles.filterPanel}>
        <div className={styles.filterItem}>
          <span className={styles.label}>课程名称：</span>
          <Input
            allowClear={true}
            value={searchProps.courseName}
            placeholder="请输入课程名称"
            onChange={e => changeSearchProps({ courseName: e.target.value })}
          />
        </div>

        <div className={styles.filterItem}>
          <span className={styles.label}>课程负责人：</span>
          <Input
            allowClear={true}
            value={searchProps.director}
            placeholder="请输入课程负责人"
            onChange={e => changeSearchProps({ director: e.target.value })}
          />
        </div>

        <Button type="primary" onClick={onSearch}>
          查询
        </Button>
      </div>

    );
  }
}
