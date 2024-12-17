import PageTitle from '../../../../Components/PageTitle';
import { Button, Form, DatePicker, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import type { TableColumnsType, TableProps } from 'antd';
import ContentSection from '../../../../Components/ContentSection';
import { FileTypeList } from './helper';
import dayjs from 'dayjs';
import './style.css';
const { Option } = Select;

interface DataType {
  key: React.Key;
  transitionDate: string;
  pendingMails: number;
}
type TableRowSelection<T> = TableProps<T>['rowSelection'];

const PendingMails: React.FC = () => {
  const [form] = Form.useForm();


  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  // const onReset = () => {
  //   form.resetFields();
  // };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Transition Date',
      dataIndex: 'transitionDate',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Pending Mails',
      dataIndex: 'pendingMails',
    },
    
  ];

  const data: DataType[] = [
    {
      key: '1',
      transitionDate: '10-Jul-2024',
      pendingMails: 32,
    },
    {
      key: '2',
      transitionDate: '15-Jul-2024',
      pendingMails: 42,
    },
    
  ];


  return (<div className='error-report-page'>
    <PageTitle
      className="site-page-header"
      //onBack={() => null}
      title="Pending Mails"
      desc='All fields mentioned are manadatory'
    />
    {/* <ContentSection style={{ marginBottom: "20px" }}>
      <Form
        form={form}
        layout="vertical"
        name="error-download"
        onFinish={onFinish}
      >
        <Space className='form-group-item'>
          <Form.Item name="fromDate" label="From Date" rules={[{ required: true }]}>
            <DatePicker picker="month" />
          </Form.Item>
          <Form.Item name="reportType" label="Report type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              options={FileTypeList}
              allowClear
            />
          </Form.Item>
        </Space>
        <Space className='form-group-item form-btn'>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Get Data
              </Button>
            </Space>
          </Form.Item>
        </Space>


      </Form>
    </ContentSection> */}
    <ContentSection style={{ marginBottom: "20px" }}>
    <Form.Item name="fromDate" label="From Date">
            <DatePicker picker="month" defaultValue={dayjs()} />
          </Form.Item>
    <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
    <Space className='form-group-item form-btn' style={{marginTop: '20px'}}>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Move Mail
              </Button>
            </Space>
          </Form.Item>
        </Space>
    </ContentSection>

  </div>)

};

export default PendingMails;