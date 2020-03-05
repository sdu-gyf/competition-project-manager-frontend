/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2019-10-06 10:31:24
 */
import * as React from 'react';
import { observer, inject } from 'mobx-react';
import {
  CourseModel,
  CourseEditModel,
  CourseSearchProps,
  defaultCourseSearchProps,
} from '@/interfaces/course';
import CustomTable from '@/components/CustomTable';
import { compose, withState } from 'recompose';
import { CourseService } from '@/services/course.service';
import SearchFilter from './SearchFilter';
import Loading from '@/components/Loading';
import { Divider, Modal } from 'antd';
const CommonModal = React.lazy(() => import('@/components/CommonModal'));
import CourseForm from './CourseForm';
import { ButtonItem } from '@/interfaces/component';

export interface CoursePageProps {
  courseService: CourseService;
  selectedRowKeys: string[];
  selectRow: (selectedRowKeys: string[]) => void;

  searchProps: CourseSearchProps;
  setSearchProps: (searchProps: CourseSearchProps) => void;

  course?: CourseEditModel;
  setCourse: (course?: CourseEditModel) => void;

  visible: boolean;
  setVisible: (visible: boolean) => void;
}

@inject('courseService')
@observer
class CoursePage extends React.Component<CoursePageProps> {
  private columns = [
    { title: '课程编码', dataIndex: 'courseCode' },
    { title: '课程号', dataIndex: 'courseNumber' },
    { title: '课程名称', dataIndex: 'courseName' },
    { title: '课程负责人', dataIndex: 'director' },
    { title: '联系电话', dataIndex: 'contactPhone' },
    { title: '描述', dataIndex: 'description' },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '修改时间', dataIndex: 'updatedAt' },
    {
      title: '操作',
      render: (_: any, record: CourseModel) => (
        <>
          <a
            onClick={() => {
              this.props.setCourse({
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
              this.handleDelete([record.courseCode]);
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  public componentDidMount() {
    this.props.courseService.fetchPageData(this.props.searchProps);
  }

  public render() {
    const { selectRow, selectedRowKeys, courseService } = this.props;
    const {
      pageData: { list, page, total },
      loading,
    } = courseService.store;

    const buttons: ButtonItem[] = [
      {
        text: '新增',
        icon: 'icon-xinzeng',
        type: 'default',
        onClick: () => {
          this.props.setCourse(undefined);
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
          genRowKey={(record: CourseModel) => `${record.courseCode}`}
          onPagination={(current: number) => {
            const searchProps = {
              ...this.props.searchProps,
              page: current,
            };
            courseService.fetchPageData(searchProps);
          }}
          onRow={(record: CourseModel) => ({
            onClick: () => selectRow([`${record.courseCode}`]),
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
              courseService.fetchPageData(this.props.searchProps);
            }}
          />
        </CustomTable>

        <React.Suspense fallback={<Loading />}>
          <CommonModal
            title={!!this.props.course ? '修改课程' : '新增课程'}
            visible={this.props.visible}
            setVisible={this.props.setVisible}
          >
            <CourseForm
              saving={loading}
              detailData={this.props.course}
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
      title: `您确定要删除选定的${codeList.length}个课程吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        modal.update({
          okButtonProps: {
            loading: true,
          },
        });
        const result = await this.props.courseService.delete(codeList);
        if (result) {
          this.props.courseService.fetchPageData({
            ...this.props.searchProps,
            page: 1,
          });
        }
      },
    });
  };

  private handleSave = (data: CourseEditModel) => {
    let result: Promise<boolean>;
    if (this.props.course) {
      result = this.props.courseService.update({
        ...data,
        courseCode: this.props.course.courseCode,
      });
    } else {
      result = this.props.courseService.add(data);
    }

    result.then(() => {
      this.props.courseService.fetchPageData(this.props.searchProps);
      this.props.setVisible(false);
    });
  };
}

export default compose(
  withState('selectedRowKeys', 'selectRow', []),
  withState('searchProps', 'setSearchProps', defaultCourseSearchProps),
  withState('course', 'setCourse', undefined),
  withState('visible', 'setVisible', false),
)(CoursePage);
