/*
 * @文件描述: 左侧菜单导航
 * @公司: thundersdata
 * @作者: 李洪文
 * @Date: 2019-05-22 11:41:42
 * @LastEditTime: 2019-05-31 16:04:33
 * @LastEditors: 李洪文
 */
import * as React from 'react';
import Link from 'umi/link';
import { Menu } from 'antd';
import { isEmpty } from 'lodash';
import { compose } from 'recompose';
import { PageMatchModel, CustomLocation } from '@/interfaces/component';
import Iconfont from '@/components/Iconfont';
import styles from '../index.scss';
import { MenuResourceModel } from '@/interfaces/home';
import { PublicService } from '@/services/public.service';
import { observer, inject } from 'mobx-react';
import { getUserResourceList } from './menuData';
import router from 'umi/router';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
export interface NavMenuProps {
  location: CustomLocation;
  match: PageMatchModel;
  publicService: PublicService;
  write: (variables: object) => void;
}

/**
 * 管理系统左侧菜单栏
 */
@inject('publicService')
@observer
class NavMenu extends React.Component<NavMenuProps> {
  private timerId: NodeJS.Timeout | null = null;

  public componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  /**
   * @功能描述: 根据location的地址，自动选中和打开对应的菜单
   * @参数:
   * @返回值:
   */
  componentDidMount() {
    const { path } = this.props.match;
    const { pathname } = this.props.location;
    if (path === '/') {
      this.props.publicService.setMenuKeys([pathname.replace('/', '')], []);
    } else {
      const key = pathname.replace(path + '/', '');
      const selectedKey = key.includes('/') ? key.split('/')[0] : key;
      const selectedKeys = [selectedKey];
      const openKeys = [path.slice(1, path.length)];
      this.props.publicService.setMenuKeys(selectedKeys, openKeys);
    }

    this.timerId = setInterval(this.onTimer, 30000);
    this.props.publicService.ping().then(success => {
      if (!success) {
        router.push(`/user/login`);
      }
    });
  }

  public render() {
    const resourceList: MenuResourceModel[] = getUserResourceList();
    const { store } = this.props.publicService;
    return (
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={store.selectedKeys}
        openKeys={store.openKeys}
        onSelect={this.handleSelect}
        onOpenChange={this.handleOpenChange}
      >
        {resourceList.map(item => {
          if (item.children && !isEmpty(item.children)) {
            return (
              <SubMenu
                key={item.resourceKey}
                title={
                  <span className={styles.title}>
                    <Iconfont name={item.icon} />
                    {item.description}
                  </span>
                }
              >
                {item.children.map(ele => (
                  <MenuItem key={ele.resourceKey}>
                    {ele.apiUrl ? (
                      <Link to={ele.apiUrl}>
                        <span className={styles.title}>
                          <Iconfont name={ele.icon} />
                          {ele.description}
                        </span>
                      </Link>
                    ) : (
                      <span className={styles.title}>
                        <Iconfont name={ele.icon} />
                        {ele.description}
                      </span>
                    )}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          }
          return (
            <MenuItem key={item.resourceKey}>
              {item.apiUrl ? (
                <Link to={item.apiUrl}>
                  <span className={styles.title}>
                    <Iconfont name={item.icon} />
                    {item.description}
                  </span>
                </Link>
              ) : (
                <span className={styles.title}>
                  <Iconfont name={item.icon} />
                  {item.description}
                </span>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    );
  }
  private onTimer = () => {
    this.props.publicService.ping();
  };
  /**
   * 确定已选择菜单（只有一个）
   */
  private handleSelect = ({ key }: { key: string }) => {
    this.props.publicService.setMenuKeys([key], undefined);
  };
  /**
   * 确定已展开的子菜单（默认同时只展开一个）
   */
  private handleOpenChange = (openKeys: string[]) => {
    this.props.publicService.setMenuKeys(undefined, [openKeys.pop()]);
  };
}

export default compose<{}, { location: CustomLocation; match: PageMatchModel }>()(NavMenu);
