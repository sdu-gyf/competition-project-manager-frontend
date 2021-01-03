import * as React from 'react';
import { Input, Button, Form } from 'antd';
import styles from './index.scss';
import { TeamSearchProps } from '@/interfaces/team';

interface SearchFilterProps {
  searchProps: TeamSearchProps;
  changeSearchProps: (searchProps: TeamSearchProps) => void;
  onSearch: () => void;
}

const FormItem = Form.Item;

export default class SearchFilter extends React.PureComponent<SearchFilterProps> {

  render() {

    const { onSearch, changeSearchProps } = this.props;
    return (
      <Form layout="inline" className={styles.filterPanel}>
        <FormItem>
            <div className={styles.filterItem}>
              <span className={styles.label}>队伍名称：</span>
              <Input
                id = "teamName"
                allowClear={true}
                placeholder="请输入队伍名称"
                onChange={e => changeSearchProps({ teamName: e.target.value })}
              />
            </div>
        </FormItem>
        <FormItem>
          <div className={styles.filterItem}>
            <span className={styles.label}>联系人：</span>
            <Input
              id = "contact"　
              allowClear={true}
              placeholder="请输入联系人"
              onChange={e => changeSearchProps({ contact: e.target.value })}
            />
          </div>
        </FormItem>

        <FormItem>
          <div className={styles.filterItem}>
            <span className={styles.label}>所在省份：</span>
            <Input
              id = "province"
              allowClear={true}
              placeholder="所在省份"
              onChange={e => changeSearchProps({ province: e.target.value })}
            />
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary" onClick={onSearch}>
            查询
          </Button>
        </FormItem>
      </Form>
    );
  }
}
