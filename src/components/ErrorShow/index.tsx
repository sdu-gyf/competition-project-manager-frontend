import * as React from 'react';
import styles from './index.scss';

interface ErrorProps {
  error: any;
}

const ErrorShow: React.SFC<ErrorProps> = ({ error }) => {
  console.log(JSON.parse(JSON.stringify(error)));
  return (
    <div className={styles.errorWrap}>
      <div>错误信息：{error}</div> <div>错误代码: {error}</div>
    </div>
  );
};

export default ErrorShow;
