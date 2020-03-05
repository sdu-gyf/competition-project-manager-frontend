import * as React from 'react';
import { Provider } from 'mobx-react';
import services from '@/services';
import { PageBasicPropsModel } from '@/interfaces/component';
import styles from './index.scss';

function BasicLayout(props: PageBasicPropsModel) {
  return (
    <Provider {...services}>
      <div className={styles.login}>{props.children}</div>
    </Provider>
  );
}

export default BasicLayout;
