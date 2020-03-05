/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors  : Please set LastEditors
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime : 2019-12-24 22:51:23
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  LabModel,
  LabEditModel,
  LabSearchProps,
  defaultLabSearchProps,
  defaultLabEditModel,
} from '@/interfaces/lab';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import { LabService } from '@/services/lab.service';
import SearchFilter from './SearchFilter';
import Loading from '@/components/Loading';
import { Divider, Modal } from 'antd';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import LabForm from './LabForm';
import { ButtonItem } from '@/interfaces/component';

export interface LabPageProps {
  labService: LabService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: LabSearchProps;
  setSearchProps: (searchProps: LabSearchProps) => void;

  lab: LabEditModel;
  setLab: (lab: LabEditModel) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

@inject('labService')
@observer
class LabPage extends React.Component<LabPageProps> {
  private columns = [
    { title: '实验室代码', dataIndex: 'labCode' },
    { title: '实验室名称', dataIndex: 'labName' },
    { title: '联系人', dataIndex: 'contact' },
    { title: '联系电话', dataIndex: 'contactPhone' },
    { title: '描述', dataIndex: 'description' },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '修改时间', dataIndex: 'updatedAt' },
    {
      title: '操作',
      render: (_: any, record: LabEditModel) => (
        <>
          <a
            onClick={() => {
              this.props.setLab({
                ...record,
              });
              this.props.setVisible(true);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              this.handleDelete([record.labCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.labService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, labService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = labService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'default',
        onClick: () => {
          this.props.setLab(defaultLabEditModel);
          this.props.setVisible(true);
        },
      },
      {
        text: '删除',
        icon: 'icon-xinzeng',
        disabled: this.props.selectedRowKeys.length === 0,
        type: 'primary',
        onClick: () => this.handleDelete(this.props.selectedRowKeys),
      },
    ];

    return (
      <>
        <CustomTable
          loading={loading}
          columns={this.columns}
          buttons={buttons}
          dataSource={list}
          current={page}
          total={total}
          genRowKey={(record: LabModel) => `${record.labCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            labService.fetchPageData(searchProps);
          }}
          onRow={(record: LabModel) => ({
            onClick: () => selectRow([`${record.labCode}`]),
          })}
          rowSelection={{
            columnTitle: '选择',
            selectedRowKeys,
            onChange: (keys: string[]) => selectRow(keys),
          }}
        >
          <SearchFilter
            searchProps={this.props.searchProps}
            changeSearchProps={props => {
              this.props.setSearchProps({
                ...this.props.setSearchProps,
                ...props,
              });
            }}
            onSearch={() => {
              labService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.lab ? '修改实验室' : '新增实验室'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <LabForm
              saving={loading}
              detailData={this.props.lab}
              onClose={() => this.props.setVisible(false)}
              onSubmit={this.handleSave}
              changeEditData={this.props.setLab}
            />
          </CommonModal>
        </React.Suspense>
      </>
    );
  }

  private handleDelete = (codeList: string[]) => {
    if (!codeList || codeList.length === 0) {
      return;
    }

    const modal = Modal.confirm({
      centered: true,
      title: `您确定要删除选定的${codeList.length}个实验室吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.labService.delete(codeList);
        if (result) {
          this.props.labService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
        }
      },
    });
  };

  private handleSave = (data: LabEditModel) => {
    let result: Promise<boolean>;
    if (this.props.lab) {
      result = this.props.labService.update({
        ...data,
        labCode: this.props.lab.labCode,
      });
    } else {
      result = this.props.labService.add(data);
    }

    result.then(() => {
      this.props.labService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}

export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultLabSearchProps),
  withState('lab', 'setLab', defaultLabEditModel),
  withState('visible', 'setVisible', false),
)(LabPage);
