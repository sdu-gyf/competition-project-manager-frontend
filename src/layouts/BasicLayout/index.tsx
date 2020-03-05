import * as React from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Icon, Menu } from 'antd';
import styles from './index.scss';
import { PageBasicPropsModel } from '@/interfaces/component';
import NavMenu from './components/NavMenu';
import Link from 'umi/link';
import breadcrumbConfig, { excludePaths } from './components/breadcrumbConfig';
import user from '@/utils/user';
import services from '@/services';
import { Provider } from 'mobx-react';

const { Sider, Content, Header } = Layout;
function BasicLayout(props: PageBasicPropsModel) {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const path = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    // 如果path在exclude path里面，或者是最后一个，表示不可点击，否则可以点击跳转
    if (excludePaths.includes(path) || index === pathSnippets.length - 1) {
      return (
        <Breadcrumb.Item key={path}>
          <span>{breadcrumbConfig[path]}</span>
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item key={path}>
        <Link to={`${path}`}>{breadcrumbConfig[path]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="homepage">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const { username, nickName, avatar } = user.getUserInfo();
  return (
    <Provider {...services}>
      <Layout>
        <Sider collapsible={false} width={256}>
          <div className={styles.logo}>后台管理</div>
          <NavMenu location={props.location} match={props.match} />
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <div>实验室预约管理系统</div>
            <div>
              <Avatar
                src={avatar || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
              />
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item>
                      <a onClick={() => user.logout()}>退出系统</a>
                    </Menu.Item>
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" href="#">
                  <span style={{ padding: '0 5px' }}>{nickName || username || ''}</span>
                  <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          </Header>
          <Layout>
            {props.location.pathname !== '/homepage' && (
              <Header className={styles.nav}>
                <Breadcrumb>{breadcrumbItems}</Breadcrumb>
              </Header>
            )}
            <Content className={styles.content}>{props.children}</Content>
          </Layout>
        </Layout>
      </Layout>
    </Provider>
  );
}

export default BasicLayout;
