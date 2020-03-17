import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  TeamModel,
  TeamEditModel,
  TeamSearchProps,
  defaultTeamSearchProps,
} from '@/interfaces/team';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import SearchFilter from './SearchFilter';
import Loading from '@/components/Loading';
import {  Divider, Modal } from 'antd';
import TeamForm from './TeamForm';
import { ButtonItem } from '@/interfaces/component';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import { TeamService } from '@/services/team.service';


export interface TeamPageProps {
  teamService: TeamService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: TeamSearchProps;
  setSearchProps: (searchProps: TeamSearchProps) => void;

  team?: TeamEditModel;
  setTeam: (team?: TeamEditModel) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

@inject('teamService')
@observer
class TeamPage extends React.Component<TeamPageProps> {
  private columns = [
    { title: '队伍代码', dataIndex: 'teamCode' },
    { title: '队伍名称', dataIndex: 'teamName' },
    { title: '联系人', dataIndex: 'contact' },
    { title: '联系电话', dataIndex: 'phone' },
    { title: '描述', dataIndex: 'description' },
    { title: '所在省份', dataIndex: 'province' },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '修改时间', dataIndex: 'updatedAt' },
    {
      title: '操作',
      render: (_: any, record: TeamModel) => (
        <>
          <a
            onClick={() => {
              this.props.setTeam({
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
              this.handleDelete([record.teamCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.teamService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, teamService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = teamService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'default',
        onClick: () => {
          this.props.setTeam(undefined);
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
          genRowKey={(record: TeamModel) => `${record.teamCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            teamService.fetchPageData(searchProps);
          }}
          onRow={(record: TeamModel) => ({
            onClick: () => selectRow([`${record.teamCode}`]),
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
              teamService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.team ? '修改队伍' : '新增队伍'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <TeamForm
              saving={loading}
              detailData={this.props.team}
              onClose={() => this.props.setVisible(false)}
              onSubmit={this.handleSave}
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
      title: `您确定要删除选定的${codeList.length}个队伍吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.teamService.delete(codeList);
        if (result) {
          this.props.teamService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
          this.props.selectRow([])
        }
      },
    });
  };

  private handleSave = (data: TeamEditModel) => {
    let result: Promise<boolean>;
    if (this.props.team) {
      result = this.props.teamService.update({
        ...data,
        teamCode: this.props.team.teamCode,
      });
    } else {
      result = this.props.teamService.add(data);
    }

    result.then(() => {
      this.props.teamService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}

export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultTeamSearchProps),
  withState('team', 'setTeam', undefined),
  withState('visible', 'setVisible', false),
)(TeamPage);
